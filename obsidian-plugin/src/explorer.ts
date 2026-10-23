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
  private hookTimer: number | null = null
  private busy = false
  private enabled = true
  private warnedVault = false

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
    // 库里被别处改动（同步、外部编辑器）时也要跟上
    this.poll = window.setInterval(() => void this.refresh(), 8000)
    void this.refresh()
  }

  stop(): void {
    this.observer?.disconnect()
    this.observer = null
    this.watched = null
    if (this.hookTimer !== null) window.clearInterval(this.hookTimer)
    if (this.poll !== null) window.clearInterval(this.poll)
    if (this.debounce !== null) window.clearTimeout(this.debounce)
    this.hookTimer = this.poll = this.debounce = null
    this.stripAll()
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
    if (this.busy) return
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
    } catch (e) {
      new Notice('设置失败：' + String((e as Error)?.message || e), 6000)
      this.overrides.delete(path)
      this.notes.set(path, !pub)
      this.decorate()
    } finally {
      this.busy = false
    }
  }

  private async toggleMany(paths: string[], pub: boolean): Promise<void> {
    if (this.busy || paths.length === 0) return
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
      new Notice(`已${pub ? '公开' : '设为私密'} ${done} 篇`, 4000)
      this.decorate()
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
      sw.setAttribute('aria-label', pub ? '已公开，点击设为私密' : '私密，点击设为公开')
      sw.title = pub ? '已公开，点击设为私密' : '私密，点击设为公开'
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
        // 一个开关（和管理器里逐篇那个长得一样），不是「公开 / 私密」两个按钮。
        // 点一下切到相反状态：没全公开 → 全公开；已全公开 → 全私密。
        const sw = document.createElement('span')
        sw.className = 'blog-pub-sw'
        sw.addEventListener('click', (ev) => {
          ev.preventDefault()
          ev.stopPropagation()
          const paths = this.pathsUnder(folder)
          const allPub = paths.length > 0 && paths.every((p) => this.notes.get(p) === true)
          void this.toggleMany(paths, !allPub)
        })
        // 计数不是按钮，只是让「这个文件夹公开了几篇」不用悬停也能看到
        const cnt = document.createElement('span')
        cnt.className = 'blog-pub-fcount'
        box.appendChild(cnt)
        box.appendChild(sw)
        el.appendChild(box)
      }
      const pubCount = inFolder.filter((p) => this.notes.get(p) === true).length
      const allPub = pubCount === inFolder.length
      const nonePub = pubCount === 0
      const sw = box.querySelector<HTMLElement>('.blog-pub-sw')
      if (sw) {
        sw.classList.toggle('on', allPub)
        sw.classList.toggle('part', !allPub && !nonePub)
        sw.title = allPub
          ? `${folder}：${inFolder.length} 篇全部公开，点击全部设为私密`
          : `${folder}：${inFolder.length} 篇里 ${pubCount} 篇公开，点击全部设为公开`
        sw.setAttribute('aria-label', sw.title)
        sw.setAttribute('role', 'switch')
        sw.setAttribute('aria-checked', allPub ? 'true' : 'false')
      }
      const cnt = box.querySelector<HTMLElement>('.blog-pub-fcount')
      if (cnt) {
        cnt.textContent = `${pubCount}/${inFolder.length}`
        cnt.title = `${folder}：${inFolder.length} 篇里 ${pubCount} 篇公开`
      }
      box.title = `${folder}：${pubCount}/${inFolder.length} 篇公开`
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

  /** 顶部工具条：一个开关管全库（不是「全部公开 / 全部私密」两个按钮） */
  private addNavSwitch(): void {
    const leaf = this.app.workspace.getLeavesOfType('file-explorer')[0]
    const bar = leaf?.view.containerEl.querySelector('.nav-buttons-container')
    if (!bar || bar.querySelector(`[${MARK_NAV}]`)) return
    const wrap = document.createElement('div')
    wrap.className = 'clickable-icon nav-action-button blog-pub-navwrap'
    wrap.setAttribute(MARK_NAV, 'all')
    const sw = document.createElement('span')
    sw.className = 'blog-pub-sw'
    sw.setAttribute('role', 'switch')
    sw.addEventListener('click', (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      const paths = Array.from(this.notes.keys())
      const allPub = paths.length > 0 && paths.every((p) => this.notes.get(p) === true)
      const target = !allPub
      // 一次改全库是重动作（116 篇），给一次确认，别让误点把整站下线
      new ConfirmModal(this.app, {
        title: target ? '把全库笔记设为公开？' : '把全库笔记设为私密？',
        body:
          `这会改动 ${paths.length} 篇笔记的 public 字段。` +
          (target ? '' : '设为私密后它们会从线上博客下线，需要重新公开并发布才会回来。'),
        cta: target ? '全部公开' : '全部私密',
        onConfirm: () => void this.toggleMany(paths, target),
      }).open()
    })
    wrap.appendChild(sw)
    bar.appendChild(wrap)
  }

  /** 刷新顶部开关的状态（全公开 / 全私密 / 部分公开） */
  private updateNavSwitch(): void {
    const sw = document.querySelector<HTMLElement>(`[${MARK_NAV}] .blog-pub-sw`)
    if (!sw) return
    const all = Array.from(this.notes.values())
    const pubCount = all.filter(Boolean).length
    const allPub = all.length > 0 && pubCount === all.length
    const nonePub = pubCount === 0
    sw.classList.toggle('on', allPub)
    sw.classList.toggle('part', !allPub && !nonePub)
    sw.setAttribute('aria-checked', allPub ? 'true' : 'false')
    const label = allPub
      ? `全库 ${all.length} 篇全部公开，点击全部设为私密`
      : `全库 ${all.length} 篇里 ${pubCount} 篇公开，点击全部设为公开`
    sw.title = label
    sw.setAttribute('aria-label', label)
  }

  /** 停用时把注入的东西都摘掉，别留一堆点了没反应的开关 */
  private stripAll(): void {
    for (const el of Array.from(
      document.querySelectorAll(
        '.blog-pub-sw, .blog-pub-folder, [data-blog-pub], [data-blog-pub-folder], [data-blog-pub-nav]',
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
