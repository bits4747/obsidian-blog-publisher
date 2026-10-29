/**
 * manager-core.mjs 是纯 JavaScript（本地调试入口与插件共用同一份），
 * 这里给出插件用到的那部分类型，让 tsc 能检查插件侧的调用。
 */
export interface ManagerOptions {
  toolRoot: string
  dataDir: string
  port?: number
  /**
   * 宿主的界面语言。启动期报错（端口占用、服务起不来）没有 HTTP 请求可读
   * x-lang 头，只能由宿主在创建时告诉这里，否则英文界面会弹出中文错误。
   */
  lang?: 'zh' | 'en'
  log?: (msg: string) => void
}

export interface ManagerInstance {
  start(): Promise<number>
  stop(): Promise<void>
  server: import('node:http').Server
  readonly port: number
  readonly toolRoot: string
  readonly dataDir: string
  state(): {
    conn: { id: string; name: string; repo: string; branch: string } | null
    vaultPath: string | null
  }
}

export function createManager(opts: ManagerOptions): ManagerInstance
