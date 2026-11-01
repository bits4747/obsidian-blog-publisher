import { App, Modal, Notice, Setting, requestUrl } from 'obsidian'
import { hostLang, strings, type Strings } from './i18n.js'

/**
 * 把「是否公开」直接做进 Obsidian 原生文件浏览器。
 *
 * 为什么不用插件自己的文件夹网格：Obsidian 左侧本来就是文件树，再摆一套
 * 网格等于让用户在两个地方看同一批文件，而且两边折叠状态、排序、搜索都不同步。
 * 这里把公开状态贴到原生树的行上，用户在自己的文件树上就能直接点。
 *
 * 状态来源是发布器的 /api/state（它扫库读 frontmatter），点击调 /api/toggle。
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

  /**
   * 界面语言。跟随 Obsidian，不在插件里另设开关。
   * 缓存上一次的语言字符串，语言变了才重建已经注入的节点文字。
   */
  private lang: string
  private t: Strings

  private enqueue(job: () => Promise<void>): Promise<void> {
    const run = this.queue.then(job, job)
    // 队列本身不能因为某次失败而断掉
    this.queue = run.catch(() => undefined)
    return run
  }

  constructor(app: App, getPort: () => Promise<number>) {
    this.app = app
    this.getPort = getPort
    this.lang = hostLang(app)
    this.t = strings(this.lang as 'zh' | 'en')
  }

  /** 语言变了就重刷一遍文案（Obsidian 改语言不广播事件，由宿主定时比对后调用） */
  setLang(): boolean {
    const next = hostLang(this.app)
    if (next === this.lang) return false
    this.lang = next
    this.t = strings(next as 'zh' | 'en')
    // 已经注入的文字要重建：直接清掉让 decorate() 按新语言重新造
    this.stripAll()
    this.decorate()
    return true
  }

  /** 全库设为公开 / 私密（命令面板入口，走同一套确认） */
  async setAll(pub: boolean): Promise<void> {
    const paths = Array.from(this.notes.keys())
    if (paths.length === 0) return
    const s = this.t.scopeAll
    new ConfirmModal(this.app, {
      title: pub ? this.t.confirmPublicTitle(s) : this.t.confirmPrivateTitle(s),
      body: pub ? this.t.confirmPublicBody(paths.length) : this.t.confirmPrivateBody(paths.length),
      cta: pub ? this.t.confirmPublicCta : this.t.confirmPrivateCta,
      cancel: this.t.cancel,
      onConfirm: () => void this.toggleMany(paths, pub, s),
    }).open()
  }

  /** 某个文件夹设为公开 / 私密（命令面板入口） */
  async setFolder(folder: string, pub: boolean): Promise<void> {
    const paths = this.pathsUnder(folder)
    if (paths.length === 0) return
    await this.toggleMany(paths, pub, folder || this.t.scopeAll)
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
          new Notice(this.t.vaultMismatch(String(j.vaultPath), base), 12000)
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
        new Notice(this.t.toggleFail(j.error || 'HTTP ' + r.status), 6000)
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
      new Notice(this.t.toggleFail(String((e as Error)?.message || e)), 6000)
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
      new Notice(this.t.batchDone(scope, pub, done), 4000)
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
      sw.setAttribute('aria-label', pub ? this.t.swToPrivate : this.t.swToPublic)
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
        // 批量用两个明确的按钮（公开 / 私密），不用开关也不用滑块：
        // 开关只有一个方向，半开状态点下去只能推断成「全公开」，而部分公开的
        // 文件夹要能一键变全私密；滑块又太长太占地方。两个按钮把方向写清楚。
        box.appendChild(this.buildBatchButtons(folder, () => this.pathsUnder(folder)))
        el.appendChild(box)
      }
      const pubCount = inFolder.filter((p) => this.notes.get(p) === true).length
      const allPub = pubCount === inFolder.length
      const nonePub = pubCount === 0
      const batch = box.querySelector<HTMLElement>('.blog-pub-batch')
      if (batch) {
        this.paintBatchButtons(batch, allPub, nonePub)
        const label = allPub
          ? this.t.folderAllPublic(folder, inFolder.length)
          : nonePub
            ? this.t.folderAllPrivate(folder, inFolder.length)
            : this.t.folderMixed(folder, inFolder.length, pubCount)
        batch.setAttribute('aria-label', label)
      }
      const cnt = box.querySelector<HTMLElement>('.blog-pub-fcount')
      if (cnt) {
        cnt.textContent = `${pubCount}/${inFolder.length}`
        // 计数不再单独给 title：外层 box 已经有 aria-label，再给一层就成两个气泡
      }
    }
  }

  /**
   * 造一组「公开 / 私密」两个按钮，用来批量改一个文件夹（或全库）的公开状态。
   *
   * 为什么不用开关：开关只有两个态，一个「部分公开」的文件夹点下去只能被推断成
   * 「全公开」—— 想一键变全私密就没有入口了。滑块能选方向，但 44px 的长条挂在
   * 文件树里又太长、很碍眼。两个按钮把方向直接写出来，宽度也只比开关略大。
   */
  private buildBatchButtons(
    scopeLabel: string,
    getPaths: () => string[],
    needConfirm = false,
  ): HTMLElement {
    const box = document.createElement('span')
    box.className = 'blog-pub-batch'
    for (const pub of [true, false]) {
      const btn = document.createElement('span')
      btn.className = 'blog-pub-bbtn'
      btn.setAttribute('role', 'button')
      btn.setAttribute('tabindex', '0')
      btn.dataset.pub = pub ? '1' : '0'
      btn.textContent = pub ? this.t.pub : this.t.priv
      const run = (ev: Event): void => {
        ev.preventDefault()
        ev.stopPropagation()
        const paths = getPaths()
        if (paths.length === 0) return
        const go = (): void => void this.toggleMany(paths, pub, scopeLabel)
        if (!needConfirm) {
          go()
          return
        }
        // 一次改全库是重动作（上百篇），给一次确认，别让误点把整站下线
        const s = scopeLabel || this.t.scopeAll
        new ConfirmModal(this.app, {
          title: pub ? this.t.confirmPublicTitle(s) : this.t.confirmPrivateTitle(s),
          body: pub ? this.t.confirmPublicBody(paths.length) : this.t.confirmPrivateBody(paths.length),
          cta: pub ? this.t.confirmPublicCta : this.t.confirmPrivateCta,
          cancel: this.t.cancel,
          onConfirm: go,
        }).open()
      }
      btn.addEventListener('click', run)
      btn.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') run(ev)
      })
      box.appendChild(btn)
    }
    return box
  }

  /**
   * 按当前公开状态给两个按钮上色：已经全公开就点亮「公开」，
   * 已经全私密就点亮「私密」，部分公开时两个都不点亮。
   */
  private paintBatchButtons(batch: HTMLElement, allPub: boolean, nonePub: boolean): void {
    for (const btn of Array.from(batch.querySelectorAll<HTMLElement>('.blog-pub-bbtn'))) {
      const pub = btn.dataset.pub === '1'
      btn.classList.toggle('active', pub ? allPub : nonePub)
    }
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

  /** 顶部工具条：两个按钮管全库（公开 / 私密） */
  private addNavSwitch(): void {
    const leaf = this.app.workspace.getLeavesOfType('file-explorer')[0]
    const bar = leaf?.view.containerEl.querySelector('.nav-buttons-container')
    if (!bar || bar.querySelector(`[${MARK_NAV}]`)) return
    const wrap = document.createElement('div')
    wrap.className = 'clickable-icon nav-action-button blog-pub-navwrap'
    wrap.setAttribute(MARK_NAV, 'all')
    // 全库是重动作（上百篇），点下去仍要确认一次，别让误点把整站下线。
    wrap.appendChild(this.buildBatchButtons(this.t.scopeAll, () => Array.from(this.notes.keys()), true))
    bar.appendChild(wrap)
  }

  /** 刷新顶部按钮的点亮状态（全公开 / 全私密 / 部分公开） */
  private updateNavSwitch(): void {
    const batch = document.querySelector<HTMLElement>(`[${MARK_NAV}] .blog-pub-batch`)
    if (!batch) return
    const all = Array.from(this.notes.values())
    const pubCount = all.filter(Boolean).length
    const allPub = all.length > 0 && pubCount === all.length
    const nonePub = pubCount === 0
    this.paintBatchButtons(batch, allPub, nonePub)
    const label = allPub
      ? this.t.vaultAllPublic(all.length)
      : nonePub
        ? this.t.vaultAllPrivate(all.length)
        : this.t.vaultMixed(all.length, pubCount)
    batch.setAttribute('aria-label', label)
  }

  /** 停用时把注入的东西都摘掉，别留一堆点了没反应的开关 */
  private stripAll(): void {
    for (const el of Array.from(
      document.querySelectorAll(
        '.blog-pub-sw, .blog-pub-batch, .blog-pub-folder, [data-blog-pub], [data-blog-pub-folder], [data-blog-pub-nav]',
      ),
    )) {
      el.remove()
    }
  }
}

/** 一句确认 + 一个按钮。obsidian 的类型定义里没有 ConfirmModal，自己拼一个。 */
class ConfirmModal extends Modal {
  private opts: { title: string; body: string; cta: string; cancel: string; onConfirm: () => void }
  constructor(
    app: App,
    opts: { title: string; body: string; cta: string; cancel: string; onConfirm: () => void },
  ) {
    super(app)
    this.opts = opts
  }
  onOpen(): void {
    const { contentEl } = this
    // 用 setHeading() 而不是 createEl('h3')：官方指南要求标题走 Setting，
    // 直接用 HTML 标题元素会与其它插件的样式不一致。
    new Setting(contentEl).setName(this.opts.title).setHeading()
    contentEl.createEl('p', { text: this.opts.body })
    const row = contentEl.createDiv({ cls: 'modal-button-container' })
    const yes = row.createEl('button', { text: this.opts.cta, cls: 'mod-warning' })
    yes.addEventListener('click', () => {
      this.close()
      this.opts.onConfirm()
    })
    const no = row.createEl('button', { text: this.opts.cancel })
    no.addEventListener('click', () => this.close())
  }
  onClose(): void {
    this.contentEl.empty()
  }
}

function normalize(p: string): string {
  return String(p).replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
}
