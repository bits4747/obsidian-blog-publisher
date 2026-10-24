import { App, Modal, Notice, requestUrl } from 'obsidian'

/**
 * 把「是否公开」直接做进 Obsidian 原生文件浏览器。
 *
 * 为什么不用插件自己的文件夹网格：Obsidian 左侧本来就是文件树，再摆一套
 * 网格等于让用户在两个地方看同一批文件，而且两边折叠状态、排序、搜索都不同步。
 * 这里把公开状态贴到原生树的行上，用户在自己的文件树上就能直接点。
 *
 * 状态来源是发布管理器的 /api/state（它扫库读 frontmatter），点击调 /api/toggle。
 * 所以插件界面（iframe）与这里的开关永远是同一份数据。
 *
 * 为什么用 requestUrl 而不是 fetch：Obsidian 的渲染进程跑在 app://obsidian.md 下，
 * 浏览器 fetch 到 http://127.0.0.1 属跨源，管理器的响应没有 CORS 头，会被拦掉
 * （实测 TypeError: Failed to fetch）。requestUrl 走 Electron 的 net 模块，不受同源限制，
 * 也就不需要为了这个功能去给管理器开 CORS —— 那等于让任意网页都能读你的库路径。
 */

/** 单篇的公开状态，来自 /api/state 的 notes[] */
interface NoteState {
  path: string
  isPublic: boolean
}

const MARK_FILE = 'data-blog-pub'
const MARK_FOLDER = 'data-blog-pub-folder'
const MARK_NAV = 'data-blog-pub-nav'

export class ExplorerBadges {
  private app: App
  private getPort: () => Promise<number>
  /** rel 路径（正斜杠）→ 是否公开 */
  private notes = new Map<string, boolean>()
  /**
   * 刚点过的结果，防止 8 秒轮询用「点击之前」的响应把界面改回去。
   * 实测踩过：点一下变私密，紧接着一次在途的 /api/state 响应把它又刷成公开，
   * 用户看到的就是「点了没反应 / 自己跳回去」。
   */
  private overrides = new Map<string, { pub: boolean; at: number }>()
  private observer: MutationObserver | null = null
  private watched: Element | null = null
  private debounce: number | null = null
  private poll: number | null = null
  private revPoll: number | null = null
  private hookTimer: number | null = null
  private busy = false
  private enabled = true
  private warnedVault = false
  /** 上次见到的状态版本号。只有它变了才去拉全量 /api/state（那份要扫 117 个文件） */
  private lastRev = 0
  /**
   * 写操作的串行队列。
   *
   * 为什么需要：改一篇的 public 会触发管理器的自动同步（git commit + push 整个库，
   * 117 篇要 1~2 秒）。如果在这期间再点一次，旧代码 `if (this.busy) return`
   * 会把第二次操作**静默丢掉**，用户看到的就是「点了没反应，得等一会儿再点」。
   * 排队能保证每次操作都被执行，而且按用户点的顺序。
   */
  private queue: Promise<void> = Promise.resolve()
  /** 回到前台时立刻对一次状态（隐藏期间定时器被冻结） */
  private onWake: (() => void) | null = null

  private enqueue(job: () => Promise<void>): Promise<void> {
    const run = this.queue.then(job, job)
    // 队列本身不能因为某次失败而断掉
    this.queue = run.catch(() => undefined)
    return run
  }

  /** 正在被拖动的批量滑块。拖动期间 8 秒轮询的 decorate() 不许把它的位置改回去。 */
  private dragSw: HTMLElement | null = null
  /** 每个滑块自己的「把钮放到某个位置」函数，供 decorate() 刷新状态用 */
  private sliderPlace = new WeakMap<HTMLElement, (v: number) => void>()

  constructor(app: App, getPort: () => Promise<number>) {
    this.app = app
    this.getPort = getPort
  }

  start(): void {
    // 文件浏览器不随插件卸载而重建，所以上一次实例注入的按钮可能还留在 DOM 里，
    // 而它们的监听器绑的是已经 stop() 的旧实例（点了没反应）。先清一遍再挂。
    this.stripAll()
    this.hook()
    // 文件浏览器可能被关掉再打开（换布局、切工作区），容器会换新的，
    // 所以定期检查一次容器是不是同一个，不是就重新挂观察器。
    this.hookTimer = window.setInterval(() => this.hook(), 2000)
    // 每 600 毫秒问一次极轻的 /api/rev（只回一个数字，实测 2~30ms、9 字节，不扫库）。
    // 版本号一变才去拉全量 /api/state —— 这样在管理器界面里点了开关，
    // 文件树这边 1 秒内就会跟着变，而不是等原来的 8 秒。
    this.revPoll = window.setInterval(() => void this.checkRev(), 600)
    // 兜底：库被外部改动（同步、别的编辑器）时版本号不会变，仍然每 8 秒全量对一次
    this.poll = window.setInterval(() => void this.refresh(), 8000)
    // 窗口被遮挡 / 最小化时 Chromium 会冻结定时器，回到前台时可能已经过了很久。
    // 这时候立刻对一次，别让用户看到「切回来还是旧的」。
    this.onWake = () => { void this.checkRev() }
    window.addEventListener('focus', this.onWake)
    document.addEventListener('visibilitychange', this.onWake)
    void this.refresh()
  }

  stop(): void {
    this.observer?.disconnect()
    this.observer = null
    this.watched = null
    if (this.hookTimer !== null) window.clearInterval(this.hookTimer)
    if (this.poll !== null) window.clearInterval(this.poll)
    if (this.revPoll !== null) window.clearInterval(this.revPoll)
    if (this.debounce !== null) window.clearTimeout(this.debounce)
    this.hookTimer = this.poll = this.revPoll = this.debounce = null
    if (this.onWake) {
      window.removeEventListener('focus', this.onWake)
      document.removeEventListener('visibilitychange', this.onWake)
      this.onWake = null
    }
    this.stripAll()
  }

  /** 只拉版本号；变了才去拉那份很重的全量状态 */
  private async checkRev(): Promise<void> {
    if (!this.enabled) return
    try {
      const port = await this.getPort()
      const r = await requestUrl({ url: `http://127.0.0.1:${port}/api/rev`, method: 'GET' })
      if (r.status !== 200) return
      const rev = Number((r.json as { rev?: number })?.rev || 0)
      if (!rev || rev === this.lastRev) return
      this.lastRev = rev
      await this.refresh()
    } catch {
      /* 服务没起来就下次再试 */
    }
  }

  /** 找文件浏览器里真正装树节点的容器 */
  private container(): Element | null {
    const leaf = this.app.workspace.getLeavesOfType('file-explorer')[0]
    if (!leaf) return null
    const root = leaf.view.containerEl
    return root.querySelector('.nav-files-container') || root
  }

  private hook(): void {
    const el = this.container()
    if (!el || el === this.watched) return
    this.observer?.disconnect()
    this.watched = el
    this.observer = new MutationObserver(() => this.schedule())
    this.observer.observe(el, { childList: true, subtree: true })
    this.schedule()
  }

  private schedule(): void {
    if (this.debounce !== null) window.clearTimeout(this.debounce)
    this.debounce = window.setTimeout(() => {
      this.debounce = null
      this.decorate()
    }, 120)
  }

  private async refresh(): Promise<void> {
    if (!this.enabled) return
    try {
      const port = await this.getPort()
      const r = await requestUrl({ url: `http://127.0.0.1:${port}/api/state`, method: 'GET' })
      if (r.status !== 200) return
      const j = r.json as { notes?: NoteState[]; vaultPath?: string; vaultOk?: boolean }
      // 管理器配的库必须就是当前打开的库，否则点了开关改的是别的库
      const base = (this.app.vault.adapter as unknown as { basePath?: string }).basePath || ''
      if (j.vaultPath && base && normalize(j.vaultPath) !== normalize(base)) {
        if (!this.warnedVault) {
          this.warnedVault = true
          new Notice('博客发布器：管理器配置的库不是当前库，文件树上的公开开关已停用。\n管理器：' + j.vaultPath + '\n当前：' + base, 12000)
        }
        this.enabled = false
        this.stripAll()
        return
      }
      this.notes.clear()
      for (const n of j.notes || []) this.notes.set(n.path.replace(/\\/g, '/'), !!n.isPublic)
      // 把点击后还没被服务端确认的结果盖回去（30 秒内的覆盖仍以本地为准）
      const now = Date.now()
      for (const [p, o] of Array.from(this.overrides)) {
        if (now - o.at > 30000) {
          this.overrides.delete(p)
          continue
        }
        if (this.notes.get(p) === o.pub) this.overrides.delete(p)
        else this.notes.set(p, o.pub)
      }
      this.decorate()
    } catch {
      /* 服务还没起来，下次轮询再试 */
    }
  }

  private async toggle(path: string, pub: boolean): Promise<void> {
    // 串行执行，但**不丢**请求。
    // 之前是 `if (this.busy) return` —— setPublic 写完 frontmatter 会触发一次
    // 自动同步（117 篇的 git commit+push，1~2 秒），期间 busy 恒为 true，
    // 用户第二次操作就被静默丢掉，表现为「拖完没反应，得等一会儿再拖」。
    // 这里改成排队：后来的动作排到当前这次后面，按顺序跑完。
    return this.enqueue(() => this.doToggle(path, pub))
  }

  private async doToggle(path: string, pub: boolean): Promise<void> {
    this.busy = true
    // 先乐观更新：磁盘写入 + 管理器重扫要一会儿，不先改界面的话用户会觉得点空了
    this.overrides.set(path, { pub, at: Date.now() })
    this.notes.set(path, pub)
    this.decorate()
    try {
      const port = await this.getPort()
      const r = await requestUrl({
        url: `http://127.0.0.1:${port}/api/toggle`,
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({ path, pub }),
        throw: false,
      })
      if (r.status !== 200) {
        const j = (r.json || {}) as { error?: string }
        new Notice('设置失败：' + (j.error || 'HTTP ' + r.status), 6000)
        // 回滚
        this.overrides.delete(path)
        this.notes.set(path, !pub)
        this.decorate()
        return
      }
      this.notes.set(path, pub)
      this.decorate()
      // 自己点的这一下已经把版本号推进了，重置一下免得下一轮 /api/rev 白拉一次全量
      this.lastRev = 0
    } catch (e) {
      new Notice('设置失败：' + String((e as Error)?.message || e), 6000)
      this.overrides.delete(path)
      this.notes.set(path, !pub)
      this.decorate()
    } finally {
      this.busy = false
    }
  }

  private async toggleMany(paths: string[], pub: boolean, scope = ''): Promise<void> {
    if (paths.length === 0) return
    // 同 toggle()：排队而不是丢弃
    return this.enqueue(() => this.doToggleMany(paths, pub, scope))
  }

  private async doToggleMany(paths: string[], pub: boolean, scope = ''): Promise<void> {
    this.busy = true
    let done = 0
    // 乐观更新，理由同 toggle()
    const at = Date.now()
    for (const p of paths) {
      this.overrides.set(p, { pub, at })
      this.notes.set(p, pub)
    }
    this.decorate()
    try {
      const port = await this.getPort()
      for (const p of paths) {
        try {
          const r = await requestUrl({
            url: `http://127.0.0.1:${port}/api/toggle`,
            method: 'POST',
            contentType: 'application/json',
            body: JSON.stringify({ path: p, pub }),
            throw: false,
          })
          if (r.status === 200) {
            this.overrides.set(p, { pub, at: Date.now() })
            this.notes.set(p, pub)
            done++
          }
        } catch {
          /* 单篇失败不影响其余 */
        }
      }
      new Notice(`${scope ? scope + '：' : ''}已${pub ? '公开' : '设为私密'} ${done} 篇`, 4000)
      this.decorate()
      this.lastRev = 0
    } finally {
      this.busy = false
    }
  }

  /** 把树上的节点补齐 / 刷新状态 */
  private decorate(): void {
    const root = this.watched
    if (!root) return
    this.addNavSwitch()
    this.updateNavSwitch()

    // ---- 文件行 ----
    for (const el of Array.from(root.querySelectorAll('.nav-file-title[data-path]'))) {
      const path = (el.getAttribute('data-path') || '').replace(/\\/g, '/')
      if (!/\.(md|markdown)$/i.test(path)) continue
      const pub = this.notes.get(path)
      let sw = el.querySelector<HTMLElement>('.' + 'blog-pub-sw')
      if (pub === undefined) {
        // 不是这个库的笔记（或还没读到状态）：不显示，免得给出错的状态
        if (sw) sw.remove()
        continue
      }
      if (!sw) {
        sw = document.createElement('span')
        sw.className = 'blog-pub-sw'
        sw.setAttribute(MARK_FILE, '1')
        sw.setAttribute('role', 'switch')
        sw.addEventListener('click', (ev) => {
          ev.preventDefault()
          ev.stopPropagation()
          const now = this.notes.get(path) === true
          void this.toggle(path, !now)
        })
        el.appendChild(sw)
      }
      sw.classList.toggle('on', pub)
      sw.setAttribute('aria-checked', pub ? 'true' : 'false')
      // 只用 aria-label，不设 title：Obsidian 会按 aria-label 弹它自己的提示气泡，
      // 再设 title 就会同时冒出浏览器原生 tooltip，看起来是两层叠在一起。
      sw.setAttribute('aria-label', pub ? '已公开，点击设为私密' : '私密，点击设为公开')
    }

    // ---- 文件夹行 ----
    for (const el of Array.from(root.querySelectorAll('.nav-folder-title[data-path]'))) {
      const folder = (el.getAttribute('data-path') || '').replace(/\\/g, '/')
      const inFolder = this.pathsUnder(folder)
      let box = el.querySelector<HTMLElement>('.' + 'blog-pub-folder')
      if (inFolder.length === 0) {
        if (box) box.remove()
        continue
      }
      if (!box) {
        box = document.createElement('span')
        box.className = 'blog-pub-folder'
        box.setAttribute(MARK_FOLDER, '1')
        // 计数不是按钮，只是让「这个文件夹公开了几篇」不用悬停也能看到
        const cnt = document.createElement('span')
        cnt.className = 'blog-pub-fcount'
        box.appendChild(cnt)
        // 三态滑块：左端=全部私密，右端=全部公开，中间=部分公开。
        // 用滑块而不是开关，是因为开关只有一个方向 —— 半开状态点下去只能推断成
        // 「全公开」，而部分公开的文件夹要能一键变全私密，必须让用户选方向。
        const sw = this.buildSlider(folder, () => this.pathsUnder(folder))
        box.appendChild(sw)
        el.appendChild(box)
      }
      const pubCount = inFolder.filter((p) => this.notes.get(p) === true).length
      const allPub = pubCount === inFolder.length
      const nonePub = pubCount === 0
      const sw = box.querySelector<HTMLElement>('.blog-pub-slider')
      if (sw) {
        sw.classList.toggle('on', allPub)
        sw.classList.toggle('off', nonePub)
        sw.classList.toggle('part', !allPub && !nonePub)
        const label = allPub
          ? `${folder}：${inFolder.length} 篇全部公开`
          : nonePub
            ? `${folder}：${inFolder.length} 篇全部私密`
            : `${folder}：${inFolder.length} 篇里 ${pubCount} 篇公开`
        // 只留滑块自己的 aria-label（Obsidian 据此弹一层气泡）。
        // 原来这里同时设了 title，会再叠一层原生 tooltip。
        sw.setAttribute('aria-label', label + '（左右拖动：左端全部私密，右端全部公开）')
        sw.setAttribute('aria-valuetext', label)
        // 拖动中不要被轮询刷回去
        if (sw !== this.dragSw) {
          const place = this.sliderPlace.get(sw)
          if (place) place(allPub ? 1 : nonePub ? 0 : 0.5)
        }
      }
      const cnt = box.querySelector<HTMLElement>('.blog-pub-fcount')
      if (cnt) {
        cnt.textContent = `${pubCount}/${inFolder.length}`
        // 计数不再单独给 title：外层 box 已经有 aria-label，再给一层就成两个气泡
      }
    }
  }

  /**
   * 造一个可左右拖动的三态滑块：0 = 全部私密，1 = 全部公开，0.5 = 部分公开。
   *
   * 交互：按下拖动钮随手走，松手落到最近的一端（0.5 只在「松手时两端都不靠」
   * 或当前就是部分公开且没拖动时出现）；直接点某一端也能跳过去，
   * 免得每次都要拖 —— 滑块小的时候拖并不好按。
   */
  private buildSlider(scopeLabel: string, getPaths: () => string[], needConfirm = false): HTMLElement {
    const sw = document.createElement('span')
    sw.className = 'blog-pub-slider'
    sw.setAttribute('role', 'slider')
    sw.setAttribute('aria-valuemin', '0')
    sw.setAttribute('aria-valuemax', '1')
    sw.setAttribute('tabindex', '0')
    const knob = document.createElement('span')
    knob.className = 'blog-pub-knob'
    sw.appendChild(knob)

    let value = 0.5
    const place = (v: number): void => {
      value = Math.max(0, Math.min(1, v))
      const track = sw.clientWidth || 40
      const kw = knob.offsetWidth || 16
      knob.style.left = Math.round((track - kw - 2) * value + 1) + 'px'
      sw.setAttribute('aria-valuenow', String(value))
    }
    this.sliderPlace.set(sw, place)

    const commit = (): void => {
      const paths = getPaths()
      if (paths.length === 0) return
      const target = value >= 0.75 ? true : value <= 0.25 ? false : null
      if (target === null) {
        place(0.5) // 中间没有对应动作，弹回去
        return
      }
      const run = (): void => void this.toggleMany(paths, target, scopeLabel)
      if (!needConfirm) {
        run()
        return
      }
      // 一次改全库是重动作（116 篇），给一次确认，别让误点把整站下线
      new ConfirmModal(this.app, {
        title: target ? `把${scopeLabel}笔记设为公开？` : `把${scopeLabel}笔记设为私密？`,
        body:
          `这会改动 ${paths.length} 篇笔记的 public 字段。` +
          (target ? '' : '设为私密后它们会从线上博客下线，需要重新公开并发布才会回来。'),
        cta: target ? '全部公开' : '全部私密',
        onConfirm: run,
      }).open()
    }

    let dragging = false
    let moved = false
    const fromEvent = (clientX: number): number => {
      const r = sw.getBoundingClientRect()
      if (r.width <= 0) return 0.5
      return Math.max(0, Math.min(1, (clientX - r.left) / r.width))
    }

    sw.addEventListener('pointerdown', (ev: PointerEvent) => {
      ev.preventDefault()
      ev.stopPropagation()
      dragging = true
      moved = false
      this.dragSw = sw
      // 不用 setPointerCapture：它对合成事件/某些指针会抛 NotFoundError，
      // 抛了就会中断这个 handler（place() 永远跑不到，表现为「拖了没反应」）。
      // 改成在 window 上挂 move/up —— 手指移出滑块也不丢，更稳。
      window.addEventListener('pointermove', onMove, true)
      window.addEventListener('pointerup', onUp, true)
      window.addEventListener('pointercancel', onUp, true)
      place(fromEvent(ev.clientX))
    })
    const onMove = (ev: PointerEvent): void => {
      if (!dragging) return
      ev.preventDefault()
      ev.stopPropagation()
      moved = true
      place(fromEvent(ev.clientX))
    }
    const onUp = (ev: PointerEvent): void => {
      if (!dragging) return
      dragging = false
      this.dragSw = null
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      window.removeEventListener('pointercancel', onUp, true)
      // 没拖动就是单击：点哪端跳哪端；点在当前状态那一侧则反向切
      if (!moved) {
        const cur = sw.classList.contains('on') ? 1 : sw.classList.contains('off') ? 0 : 0.5
        const hit = fromEvent(ev.clientX)
        value = hit >= 0.5 ? 1 : 0
        if (Math.abs(hit - cur) < 0.25) value = cur >= 0.75 ? 0 : 1
        place(value)
      }
      commit()
    }

    // 键盘：左右箭头 / Home / End
    sw.addEventListener('keydown', (ev: KeyboardEvent) => {
      let next: number | null = null
      if (ev.key === 'ArrowLeft') next = 0
      else if (ev.key === 'ArrowRight') next = 1
      else if (ev.key === 'Home') next = 0
      else if (ev.key === 'End') next = 1
      if (next === null) return
      ev.preventDefault()
      ev.stopPropagation()
      place(next)
      commit()
    })

    return sw
  }

  /** 某文件夹下所有已纳入管理的笔记路径 */
  private pathsUnder(folder: string): string[] {
    const prefix = folder ? folder + '/' : ''
    const out: string[] = []
    for (const p of this.notes.keys()) {
      if (!prefix || p.startsWith(prefix)) out.push(p)
    }
    return out
  }

  /** 顶部工具条：一个三态滑块管全库（左端全部私密，右端全部公开） */
  private addNavSwitch(): void {
    const leaf = this.app.workspace.getLeavesOfType('file-explorer')[0]
    const bar = leaf?.view.containerEl.querySelector('.nav-buttons-container')
    if (!bar || bar.querySelector(`[${MARK_NAV}]`)) return
    const wrap = document.createElement('div')
    wrap.className = 'clickable-icon nav-action-button blog-pub-navwrap'
    wrap.setAttribute(MARK_NAV, 'all')
    // 全库是重动作（116 篇），拖到某一端仍要确认一次，别让误拖把整站下线。
    const sw = this.buildSlider('全库', () => Array.from(this.notes.keys()), true)
    wrap.appendChild(sw)
    bar.appendChild(wrap)
  }

  /** 刷新顶部滑块的状态（全公开 / 全私密 / 部分公开） */
  private updateNavSwitch(): void {
    const sw = document.querySelector<HTMLElement>(`[${MARK_NAV}] .blog-pub-slider`)
    if (!sw) return
    const all = Array.from(this.notes.values())
    const pubCount = all.filter(Boolean).length
    const allPub = all.length > 0 && pubCount === all.length
    const nonePub = pubCount === 0
    sw.classList.toggle('on', allPub)
    sw.classList.toggle('off', nonePub)
    sw.classList.toggle('part', !allPub && !nonePub)
    const label = allPub
      ? `全库 ${all.length} 篇全部公开`
      : nonePub
        ? `全库 ${all.length} 篇全部私密`
        : `全库 ${all.length} 篇里 ${pubCount} 篇公开`
    sw.setAttribute('aria-label', label + '（左右拖动：左端全部私密，右端全部公开）')
    sw.setAttribute('aria-valuetext', label)
    if (sw !== this.dragSw) {
      const place = this.sliderPlace.get(sw)
      if (place) place(allPub ? 1 : nonePub ? 0 : 0.5)
    }
  }

  /** 停用时把注入的东西都摘掉，别留一堆点了没反应的开关 */
  private stripAll(): void {
    for (const el of Array.from(
      document.querySelectorAll(
        '.blog-pub-sw, .blog-pub-slider, .blog-pub-folder, [data-blog-pub], [data-blog-pub-folder], [data-blog-pub-nav]',
      ),
    )) {
      el.remove()
    }
  }
}

/** 一句确认 + 一个按钮。obsidian 的类型定义里没有 ConfirmModal，自己拼一个。 */
class ConfirmModal extends Modal {
  private opts: { title: string; body: string; cta: string; onConfirm: () => void }
  constructor(app: App, opts: { title: string; body: string; cta: string; onConfirm: () => void }) {
    super(app)
    this.opts = opts
  }
  onOpen(): void {
    const { contentEl } = this
    contentEl.createEl('h3', { text: this.opts.title })
    contentEl.createEl('p', { text: this.opts.body })
    const row = contentEl.createDiv({ cls: 'modal-button-container' })
    const yes = row.createEl('button', { text: this.opts.cta, cls: 'mod-warning' })
    yes.addEventListener('click', () => {
      this.close()
      this.opts.onConfirm()
    })
    const no = row.createEl('button', { text: '取消' })
    no.addEventListener('click', () => this.close())
  }
  onClose(): void {
    this.contentEl.empty()
  }
}

function normalize(p: string): string {
  return String(p).replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
}
