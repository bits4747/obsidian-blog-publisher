import { App, Command, ItemView, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, addIcon } from 'obsidian'
import * as nodeFs from 'node:fs'
import * as nodePath from 'node:path'
import * as nodeOs from 'node:os'
import { materializeTemplate, templateReady } from './template.js'
import { ExplorerBadges } from './explorer.js'
import { hostLang, strings, type Strings } from './i18n.js'

const VIEW_TYPE = 'blog-publisher-view'

/** 当前活动笔记所在的文件夹（库根返回 ''，没有活动笔记返回 null） */
function activeFolder(app: App): string | null {
  const f = app.workspace.getActiveFile()
  if (!f) return null
  const i = f.path.lastIndexOf('/')
  return i < 0 ? '' : f.path.slice(0, i)
}

/** 宿主当前是深色还是浅色 */
function hostTheme(): 'dark' | 'light' {
  return document.body.classList.contains('theme-dark') ? 'dark' : 'light'
}

/** 文件树上「公开 / 私密」开关的样式。注入一次，跟随 Obsidian 主题变量。 */
const EXPLORER_CSS = `
/* 单篇开关：和管理器界面里那个 .sw 同一个造型（胶囊 + 圆钮），
   但缩到 24×13，因为在 250px 宽的文件树里 30×16 太占地方。 */
.blog-pub-sw {
  position: relative; flex-shrink: 0; margin-left: 6px;
  width: 24px; height: 13px; border-radius: 999px;
  background: var(--background-modifier-border);
  cursor: pointer; user-select: none;
  transition: background-color .15s ease;
}
.blog-pub-sw::after {
  content: ''; position: absolute; top: 1.5px; left: 2px;
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--text-on-accent, #fff);
  box-shadow: 0 1px 2px rgba(0,0,0,.25);
  transition: left .15s ease;
}
.blog-pub-sw.on { background: #2570cc; }
.blog-pub-sw.on::after { left: 12px; }
.blog-pub-sw:hover { box-shadow: 0 0 0 2px var(--background-modifier-hover); }

/* 文件行：开关贴到行尾（和文件夹行对齐，不然它紧跟在标题后面） */
.nav-file-title .blog-pub-sw { margin-left: auto; }

/* 批量按钮（文件夹 / 全库）：两个明确的「公开」「私密」。
   做成一个连体的分段控件（共用外框、中间一道分隔线），比两个独立小胶囊
   紧凑得多，视觉上也只占「一个控件」的位置。 */
.blog-pub-batch {
  margin-left: 6px; flex-shrink: 0;
  display: inline-flex; align-items: stretch;
  border: 1px solid var(--background-modifier-border);
  border-radius: 4px; overflow: hidden;
}
.blog-pub-bbtn {
  font-size: 10px; line-height: 12px; padding: 1px 5px;
  cursor: pointer; user-select: none;
  color: var(--text-faint); background: transparent;
  transition: background-color .12s ease, color .12s ease;
}
.blog-pub-bbtn + .blog-pub-bbtn { border-left: 1px solid var(--background-modifier-border); }
.blog-pub-bbtn:hover { color: var(--text-normal); background: var(--background-modifier-hover); }
.blog-pub-bbtn.active {
  background: #2570cc; color: var(--text-on-accent, #fff);
}
.blog-pub-bbtn.active:hover { background: #2570cc; color: var(--text-on-accent, #fff); }
body.theme-dark .blog-pub-bbtn.active,
body.theme-dark .blog-pub-bbtn.active:hover { background: #5b9bf8; }

/* 文件夹行尾：计数常驻（不悬停也能看到公开了几篇），按钮组跟后面 */
.blog-pub-folder {
  margin-left: auto; flex-shrink: 0;
  display: flex; align-items: center; gap: 4px;
}
.blog-pub-folder .blog-pub-fcount {
  font-size: 10px; line-height: 15px; color: var(--text-faint);
  font-variant-numeric: tabular-nums;
}
/* 顶部工具条里的按钮组：跟着 nav-action-button 的尺寸走 */
.blog-pub-navwrap { display: inline-flex; align-items: center; padding: 0 4px; }

/* 深色主题下用亮一档的蓝，否则 #2570cc 压在深底上发闷。
   （.theme-dark 是 Obsidian 挂在 body 上的，不需要插件自己判断。） */
body.theme-dark .blog-pub-sw.on { background: #5b9bf8; }
`

/** 后台服务子进程的通信句柄（utilityProcess 或 child_process 的统一外观） */
interface ChildHandle {
  postMessage: (m: unknown) => void
  on: (ev: string, cb: (...a: any[]) => void) => void
  kill: () => void
  pid?: number
}

/**
 * 拿 Electron 的 utilityProcess。
 *
 * 渲染进程里 `require('electron')` 直接给的模块没有 utilityProcess（那是主进程的 API），
 * 要走 remote.require('electron')。拿不到就返回 null，调用方退回系统 node。
 */
function getUtilityProcess(): { fork: (p: string, a: string[], o?: Record<string, unknown>) => any } | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const electron = require('electron') as { remote?: { require?: (m: string) => any }; utilityProcess?: unknown }
    const main = electron.remote?.require ? (electron.remote.require('electron') as { utilityProcess?: unknown }) : null
    const up = (main?.utilityProcess ?? electron.utilityProcess) as { fork?: unknown } | undefined
    if (up && typeof up.fork === 'function') return up as { fork: (p: string, a: string[], o?: Record<string, unknown>) => any }
  } catch {
    /* 非 Electron 环境 */
  }
  return null
}

/** 插件把「模板根目录」铺在哪：与命令行版共用同一个用户数据目录 */
function dataRoot(): string {
  const fromEnv = (process.env.OBSIDIAN_BLOG_DATA || '').trim()
  if (fromEnv) return nodePath.resolve(fromEnv)
  const home = nodeOs.homedir() || ''
  if (process.platform === 'win32') {
    return nodePath.join(process.env.APPDATA || nodePath.join(home, 'AppData', 'Roaming'), 'obsidian-blog')
  }
  if (process.platform === 'darwin') {
    return nodePath.join(home, 'Library', 'Application Support', 'obsidian-blog')
  }
  return nodePath.join(process.env.XDG_CONFIG_HOME || nodePath.join(home, '.config'), 'obsidian-blog')
}

export default class BlogPublisherPlugin extends Plugin {
  private child: ChildHandle | null = null
  private port = 0
  private starting: Promise<number> | null = null
  private toolRoot = ''
  private explorer: ExplorerBadges | null = null
  /** 界面语言：跟随 Obsidian，简体 / 繁体中文都算中文，其余英文 */
  private lang: 'zh' | 'en' = 'zh'
  /** 当前语言的全部文案（视图与设置页也要读，故不设 private） */
  t: Strings = strings('zh')
  /** 命令对象留一份：Obsidian 改语言不广播事件，靠定时比对后改 name 刷新命令面板 */
  private cmds: Command[] = []

  private syncLang(): boolean {
    const next = hostLang(this.app)
    if (next === this.lang) return false
    this.lang = next
    this.t = strings(next)
    // 命令名和面板里的插件名前缀都要跟着变：改名字前缀只能重新注册一遍
    this.manifest.name = next === 'zh' ? '博客发布器' : 'Blog Publisher'
    this.registerCommands()
    // 文件树上已注入的按钮文字要重造
    this.explorer?.setLang()
    // 视图标签页的标题是建 leaf 时按 getDisplayText() 取的，改语言不会自动刷新
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      const el = (leaf as unknown as { tabHeaderInnerTitleEl?: HTMLElement }).tabHeaderInnerTitleEl
      if (el) el.setText(this.t.viewTitle)
    }
    return true
  }


  /**
   * 注册 / 重注册命令。
   *
   * 命令面板里显示的插件名前缀是 addCommand 那一刻按 manifest.name 定死的，
   * 之后改 manifest.name 不会影响已经注册的命令（实测）。所以语言变了要把
   * 名字改好再整批重新注册一遍，前缀才会跟着变。
   */
  private registerCommands(): void {
    for (const c of this.cmds) {
      try {
        this.removeCommand(c.id)
      } catch {
        /* 还没注册过 */
      }
    }
    this.cmds = []
    this.cmds.push(
      this.addCommand({
        id: 'open-publisher',
        name: this.t.cmdOpen,
        callback: () => void this.activateView(),
      }),
    )

    this.cmds.push(
      this.addCommand({
        id: 'publish-now',
        name: this.t.cmdPublish,
        callback: async () => {
          const n = new Notice(this.t.publishing, 4000)
          try {
            const port = await this.ensureServer()
            const r = await fetch(`http://127.0.0.1:${port}/api/publish`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: '{}',
            })
            const j = (await r.json()) as { failed?: boolean; pushed?: boolean; log?: string[] }
            n.hide()
            new Notice(
              j.failed
                ? this.t.publishFailed((j.log || []).slice(-1)[0] || '')
                : j.pushed
                  ? this.t.pushed
                  : this.t.upToDate,
              6000,
            )
          } catch (e) {
            n.hide()
            new Notice(this.t.publishFailed(String((e as Error)?.message || e)), 8000)
          }
        },
      }),
    )

    // 全库 / 当前文件夹的批量命令：文件树上的按钮已经能做，这里给键盘党一个入口
    const bulk = (pub: boolean, folderOnly: boolean) => async () => {
      const ex = this.explorer
      if (!ex) return
      if (folderOnly) {
        const folder = activeFolder(this.app)
        if (folder === null) {
          new Notice(this.t.noActiveNote, 5000)
          return
        }
        await ex.setFolder(folder, pub)
        return
      }
      await ex.setAll(pub)
    }
    this.cmds.push(
      this.addCommand({ id: 'set-all-public', name: this.t.cmdAllPublic, callback: bulk(true, false) }),
      this.addCommand({ id: 'set-all-private', name: this.t.cmdAllPrivate, callback: bulk(false, false) }),
      this.addCommand({
        id: 'set-folder-public',
        name: this.t.cmdFolderPublic,
        checkCallback: (checking) => {
          if (activeFolder(this.app) === null) return false
          if (!checking) void bulk(true, true)()
          return true
        },
      }),
      this.addCommand({
        id: 'set-folder-private',
        name: this.t.cmdFolderPrivate,
        checkCallback: (checking) => {
          if (activeFolder(this.app) === null) return false
          if (!checking) void bulk(false, true)()
          return true
        },
      }),
    )


  }

  async onload() {
    console.log('[blog-publisher] loading')

    this.lang = hostLang(this.app)
    this.t = strings(this.lang)

    // 命令面板里的插件名前缀是 addCommand 那一刻按 manifest.name 定死的，
    // 之后改名字不会影响已注册的命令。所以要在注册命令之前把名字定成当前语言。
    this.manifest.name = this.lang === 'zh' ? '博客发布器' : 'Blog Publisher'

    // 侧边栏图标
    addIcon(
      'blog-publisher',
      '<svg viewBox="0 0 100 100"><path fill="currentColor" d="M20 15h60a5 5 0 0 1 5 5v60a5 5 0 0 1-5 5H20a5 5 0 0 1-5-5V20a5 5 0 0 1 5-5zm10 15v10h40V30H30zm0 18v8h40v-8H30zm0 16v8h26v-8H30z"/></svg>',
    )

    const style = document.createElement('style')
    style.id = 'blog-publisher-explorer-css'
    style.textContent = EXPLORER_CSS
    document.head.appendChild(style)
    this.register(() => style.remove())

    this.registerView(VIEW_TYPE, (leaf) => new BlogPublisherView(leaf, this))

    this.addRibbonIcon('blog-publisher', this.t.ribbonOpen, () => {
      void this.activateView()
    })

    this.registerCommands()

    this.addSettingTab(new BlogPublisherSettingTab(this.app, this))

    // 插件启用时就把服务拉起来：自动同步要依赖它常驻
    void this.ensureServer()
      .then(() => {
        // 服务起来之后才能读到公开状态，所以文件树开关在 ensureServer 之后挂
        this.explorer = new ExplorerBadges(this.app, () => this.ensureServer())
        this.explorer.start()
        this.register(() => this.explorer?.stop())
      })
      .catch((e) => {
        console.error('[blog-publisher] 启动失败', e)
        new Notice(this.t.pluginStartFail(String((e as Error)?.message || e)), 10000)
      })

    // Obsidian 改语言不发事件，用便宜的定时比对兜底（2 秒一次，只比一个字符串）。
    // 窗口被遮挡 / 最小化时 Chromium 会把定时器降频到分钟级，所以再挂两个必然触发的时机：
    // 回到前台（focus）和切换可见性。用户切回 Obsidian 的那一刻文案就是对的。
    this.registerInterval(window.setInterval(() => this.syncLang(), 2000))
    this.registerDomEvent(window, 'focus', () => this.syncLang())
    this.registerDomEvent(document, 'visibilitychange', () => {
      if (document.visibilityState === 'visible') this.syncLang()
    })
  }

  async onunload() {
    this.explorer?.stop()
    this.explorer = null
    if (this.child) {
      try {
        this.child.postMessage({ type: 'stop' })
      } catch {
        /* 已经退出 */
      }
      // 给它 1.5 秒优雅退出，超时就强杀
      await new Promise<void>((res) => setTimeout(res, 1500))
      try {
        this.child.kill()
      } catch {
        /* 已经退出 */
      }
      this.child = null
    }
  }

  /**
   * 确保后台服务在跑，返回端口。
   *
   * 模板要先铺到用户数据目录（插件装到 .obsidian/plugins/ 之后，用户机器上
   * 不一定还有 blog-static 源码目录），所以第一次会多花几百毫秒写 ~50 个文件。
   */
  async ensureServer(): Promise<number> {
    if (this.port) return this.port
    if (this.starting) return this.starting

    this.starting = (async () => {
      const root = dataRoot()
      this.toolRoot = nodePath.join(root, 'site-template')
      if (!templateReady(nodeFs, nodePath, this.toolRoot)) {
        console.log('[blog-publisher] 首次铺开站点模板 →', this.toolRoot)
        materializeTemplate(nodeFs, nodePath, this.toolRoot)
      }

      // manifest.dir 是相对库根的路径（如 ".obsidian/plugins/blog-publisher"），
      // 而子进程要求绝对路径，所以要拼上库的绝对路径。
      const basePath = (this.app.vault.adapter as unknown as { basePath?: string }).basePath || ''
      const workerPath = basePath
        ? nodePath.join(basePath, this.manifest.dir || '', 'worker.js')
        : nodePath.join(this.manifest.dir || '', 'worker.js')
      const startEnv = { ...process.env, BLOG_PUBLISHER_START: JSON.stringify({ toolRoot: this.toolRoot, dataDir: root, port: 0 }) }

      const port = await new Promise<number>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('后台服务启动超时（40 秒）')), 40000)

        // 优先用 Electron 的 utilityProcess：它起的是真 Node 进程，与 Obsidian
        // 共用同一个 Electron 二进制，用户机器上不需要另装 Node。
        // （renderer 里的 node:worker_threads 不可用：V8 platform 没开 Worker 支持。）
        const utility = getUtilityProcess()
        let child: { postMessage: (m: unknown) => void; on: (ev: string, cb: (...a: any[]) => void) => void; kill: () => void; pid?: number } | null = null

        if (utility) {
          const u = utility.fork(workerPath, [], { env: startEnv, stdio: 'pipe' })
          child = {
            postMessage: (m) => u.postMessage(m),
            on: (ev, cb) => {
              if (ev === 'message') u.on('message', cb)
              else if (ev === 'exit') u.on('exit', cb)
              else if (ev === 'error') u.on('error', cb)
            },
            kill: () => {
              try {
                u.kill()
              } catch {
                /* 已退出 */
              }
            },
            pid: u.pid,
          }
          if (u.stderr) u.stderr.on('data', (d: Buffer) => console.error('[blog-publisher] ' + String(d)))
        } else {
          // 兜底：系统 node。需要用户机器上装了 Node。
          const cp = require('node:child_process') as typeof import('node:child_process')
          const c = cp.spawn('node', [workerPath], { env: startEnv, windowsHide: true })
          child = {
            postMessage: (m) => c.send(m as Record<string, unknown>),
            on: (ev, cb) => {
              if (ev === 'message') c.on('message', cb)
              else if (ev === 'exit') c.on('exit', (code) => cb(code))
              else if (ev === 'error') c.on('error', cb)
            },
            kill: () => {
              try {
                c.kill()
              } catch {
                /* 已退出 */
              }
            },
            pid: c.pid,
          }
          c.stderr?.on('data', (d: Buffer) => console.error('[blog-publisher] ' + String(d)))
        }

        this.child = child
        const c = child
        c.on('message', (m: { type?: string; port?: number; error?: string; text?: string }) => {
          if (m.type === 'ready' && typeof m.port === 'number') {
            clearTimeout(timer)
            resolve(m.port)
          } else if (m.type === 'error') {
            clearTimeout(timer)
            reject(new Error(m.error || '未知错误'))
          } else if (m.type === 'log') {
            console.log('[blog-publisher] ' + m.text)
          }
        })
        c.on('error', (e: Error) => {
          clearTimeout(timer)
          reject(e)
        })
        c.on('exit', (code: number) => {
          clearTimeout(timer)
          reject(new Error('后台服务进程退出（code ' + code + '）'))
        })
      })

      this.port = port
      console.log('[blog-publisher] 服务已就绪，端口', port)
      return port
    })()

    try {
      return await this.starting
    } finally {
      this.starting = null
    }
  }

  async activateView() {
    const { workspace } = this.app
    const leaves = workspace.getLeavesOfType(VIEW_TYPE)
    // 只认主区域里的那个；右栏 250px 宽放不下三栏 + 文件夹网格
    let leaf = leaves.find((l) => l.getRoot() === workspace.rootSplit)
    if (!leaf) {
      // 早期版本把它开在右栏了，这里顺手挪走，免得留一个挤扁的副本
      for (const old of leaves) {
        if (old.getRoot() !== workspace.rootSplit) old.detach()
      }
      leaf = workspace.getLeaf('tab')
      await leaf.setViewState({ type: VIEW_TYPE, active: true })
    }
    workspace.revealLeaf(leaf)
    return leaf
  }
}

/**
 * 发布器主视图：一个 iframe，装的就是命令行管理器那份界面。
 *
 * 为什么用 iframe 而不是用 Obsidian 的组件重写一遍界面：
 * 界面上有 ~1900 行客户端逻辑（三栏、流水、拖拽大纲、i18n、自动同步开关…），
 * 重写等于维护两份、必然漂移。用 iframe 装同一份 HTML，功能一致性是构造保证的，
 * 以后界面改一处两边同时生效。
 */
class BlogPublisherView extends ItemView {
  private plugin: BlogPublisherPlugin
  private frame: HTMLIFrameElement | null = null
  private langTimer: number | null = null
  private langSent = ''

  constructor(leaf: WorkspaceLeaf, plugin: BlogPublisherPlugin) {
    super(leaf)
    this.plugin = plugin
  }

  getViewType() {
    return VIEW_TYPE
  }
  getDisplayText() {
    return this.plugin.t.viewTitle
  }
  getIcon() {
    return 'blog-publisher'
  }

  async onOpen() {
    const root = this.contentEl
    root.empty()
    root.addClass('blog-publisher-root')
    root.style.padding = '0'
    root.style.overflow = 'hidden'

    const loading = root.createDiv({ text: this.plugin.t.loading, cls: 'blog-publisher-loading' })
    loading.style.padding = '20px'

    try {
      const port = await this.plugin.ensureServer()
      loading.remove()
      const frame = root.createEl('iframe')
      // embed=1：Obsidian 左侧已经是文件树，界面里那套文件夹网格是重复的，藏掉。
      // lang/theme：界面不再自己放「中英」「明暗」按钮，改为跟宿主走 ——
      // 首帧就用这两个参数定好，之后变化靠 postMessage 热更新（不刷新 iframe）。
      const lang = hostLang(this.app)
      const theme = hostTheme()
      this.langSent = lang + '|' + theme
      // vault：把当前打开的库的绝对路径告诉界面。Obsidian 一次只开一个库，
      // 所以界面里不该有「选哪个库」的下拉 —— 传路径过去，界面自己按路径
      // 选中对应的连接（多条连接时也只认当前库那一条）。
      const vaultPath = (this.app.vault.adapter as unknown as { basePath?: string }).basePath || ''
      const vq = vaultPath ? '&vault=' + encodeURIComponent(vaultPath) : ''
      frame.src = `http://127.0.0.1:${port}/?embed=1&lang=${lang}&theme=${theme}${vq}`
      frame.style.width = '100%'
      frame.style.height = '100%'
      frame.style.border = '0'
      frame.style.display = 'block'
      // iframe 里要能用剪贴板 / 下载等能力，但不需要额外权限
      frame.setAttribute('allow', 'clipboard-write')
      this.frame = frame

      // 主题一变（Obsidian 切明暗、换主题）就把新值送进去
      this.registerEvent(
        this.app.workspace.on('css-change', () => {
          this.postSettings()
        }),
      )
      // 语言变化 Obsidian 不广播事件，用便宜的定时比对兜底（2 秒一次，只比字符串）
      this.langTimer = window.setInterval(() => {
        const now = hostLang(this.app) + '|' + hostTheme()
        if (now !== this.langSent) this.postSettings()
      }, 2000)
    } catch (e) {
      loading.setText(this.plugin.t.startFail(String((e as Error)?.message || e)))
      loading.style.color = 'var(--text-error)'
    }
  }

  /** 把宿主的语言 / 主题送进 iframe（不刷新，避免丢输入和滚动位置） */
  private postSettings(): void {
    const win = this.frame?.contentWindow
    if (!win) return
    const lang = hostLang(this.app)
    const theme = hostTheme()
    this.langSent = lang + '|' + theme
    try {
      win.postMessage({ __blogPublisher: true, lang, theme }, '*')
    } catch {
      /* iframe 还没就绪就下次再说 */
    }
  }

  async onClose() {
    if (this.langTimer !== null) window.clearInterval(this.langTimer)
    this.langTimer = null
    this.frame = null
  }
}

class BlogPublisherSettingTab extends PluginSettingTab {
  private plugin: BlogPublisherPlugin

  constructor(app: App, plugin: BlogPublisherPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this
    containerEl.empty()
    const t = this.plugin.t
    containerEl.createEl('h2', { text: t.settingsTitle })

    containerEl.createEl('p', {
      text: t.settingsDataDesc,
      cls: 'setting-item-description',
    })

    new Setting(containerEl)
      .setName(t.settingsOpenName)
      .setDesc(t.settingsOpenDesc)
      .addButton((b) =>
        b.setButtonText(t.settingsOpenBtn).onClick(() => {
          void this.plugin.activateView()
        }),
      )

    new Setting(containerEl)
      .setName(t.settingsBrowserName)
      .setDesc(t.settingsBrowserDesc)
      .addButton((b) =>
        b.setButtonText(t.settingsBrowserBtn).onClick(async () => {
          const port = await this.plugin.ensureServer()
          window.open(`http://127.0.0.1:${port}/`, '_blank')
        }),
      )
  }
}
