import { App, ItemView, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, addIcon } from 'obsidian'
import * as nodeFs from 'node:fs'
import * as nodePath from 'node:path'
import * as nodeOs from 'node:os'
import { materializeTemplate, templateReady } from './template.js'
import { ExplorerBadges } from './explorer.js'

const VIEW_TYPE = 'blog-publisher-view'

/** 文件树上「公开 / 私密」开关的样式。注入一次，跟随 Obsidian 主题变量。 */
const EXPLORER_CSS = `
/* 开关本体：和管理器界面里那个 .sw 同一个造型（胶囊 + 圆钮），
   不是「公开 / 私密」两个按钮。 */
.blog-pub-sw {
  position: relative; flex-shrink: 0; margin-left: 6px;
  width: 30px; height: 16px; border-radius: 999px;
  background: var(--background-modifier-border);
  cursor: pointer; user-select: none;
  transition: background-color .15s ease;
}
.blog-pub-sw::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--text-on-accent, #fff);
  box-shadow: 0 1px 2px rgba(0,0,0,.25);
  transition: left .15s ease;
}
.blog-pub-sw.on { background: var(--interactive-accent); }
.blog-pub-sw.on::after { left: 16px; }
/* 部分公开：钮停在中间，和「全公开 / 全私密」区分开 */
.blog-pub-sw.part { background: var(--interactive-accent); opacity: .55; }
.blog-pub-sw.part::after { left: 9px; }
.blog-pub-sw:hover { box-shadow: 0 0 0 2px var(--background-modifier-hover); }

/* 文件行：开关贴到行尾（和文件夹行对齐，不然它紧跟在标题后面） */
.nav-file-title .blog-pub-sw { margin-left: auto; }

/* 文件夹行尾：计数常驻（不悬停也能看到公开了几篇），开关跟后面 */
.blog-pub-folder {
  margin-left: auto; flex-shrink: 0;
  display: flex; align-items: center; gap: 4px;
}
.blog-pub-folder .blog-pub-fcount {
  font-size: 10px; line-height: 15px; color: var(--text-faint);
  font-variant-numeric: tabular-nums;
}
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

  async onload() {
    console.log('[blog-publisher] loading')

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

    this.addRibbonIcon('blog-publisher', '打开博客发布器', () => {
      void this.activateView()
    })

    this.addCommand({
      id: 'open-publisher',
      name: '打开博客发布器',
      callback: () => void this.activateView(),
    })

    this.addCommand({
      id: 'publish-now',
      name: '立即发布到 GitHub',
      callback: async () => {
        const n = new Notice('正在发布…', 4000)
        try {
          const port = await this.ensureServer()
          const r = await fetch(`http://127.0.0.1:${port}/api/publish`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{}',
          })
          const j = (await r.json()) as { failed?: boolean; pushed?: boolean; log?: string[] }
          n.hide()
          new Notice(j.failed ? '发布失败：' + (j.log || []).slice(-1)[0] : j.pushed ? '已推送 GitHub，正在构建' : '线上已是最新', 6000)
        } catch (e) {
          n.hide()
          new Notice('发布失败：' + String((e as Error)?.message || e), 8000)
        }
      },
    })

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
        new Notice('博客发布器启动失败：' + String((e as Error)?.message || e), 10000)
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

  constructor(leaf: WorkspaceLeaf, plugin: BlogPublisherPlugin) {
    super(leaf)
    this.plugin = plugin
  }

  getViewType() {
    return VIEW_TYPE
  }
  getDisplayText() {
    return '博客发布器'
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

    const loading = root.createDiv({ text: '正在启动发布器…', cls: 'blog-publisher-loading' })
    loading.style.padding = '20px'

    try {
      const port = await this.plugin.ensureServer()
      loading.remove()
      const frame = root.createEl('iframe')
      // embed=1：Obsidian 左侧已经是文件树，界面里那套文件夹网格是重复的，藏掉。
      frame.src = `http://127.0.0.1:${port}/?embed=1`
      frame.style.width = '100%'
      frame.style.height = '100%'
      frame.style.border = '0'
      frame.style.display = 'block'
      // iframe 里要能用剪贴板 / 下载等能力，但不需要额外权限
      frame.setAttribute('allow', 'clipboard-write')
      this.frame = frame
    } catch (e) {
      loading.setText('启动失败：' + String((e as Error)?.message || e))
      loading.style.color = 'var(--text-error)'
    }
  }

  async onClose() {
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
    containerEl.createEl('h2', { text: '博客发布器' })

    containerEl.createEl('p', {
      text: '数据目录与命令行版发布管理器共用（默认 %APPDATA%\\obsidian-blog），所以两边的连接、令牌、发布流水是同一份。',
      cls: 'setting-item-description',
    })

    new Setting(containerEl)
      .setName('打开发布器')
      .setDesc('也可以点左侧栏的图标，或用命令面板「打开博客发布器」')
      .addButton((b) =>
        b.setButtonText('打开').onClick(() => {
          void this.plugin.activateView()
        }),
      )

    new Setting(containerEl)
      .setName('在浏览器中打开')
      .setDesc('用系统浏览器打开同一个界面（适合大屏操作）')
      .addButton((b) =>
        b.setButtonText('打开').onClick(async () => {
          const port = await this.plugin.ensureServer()
          window.open(`http://127.0.0.1:${port}/`, '_blank')
        }),
      )
  }
}
