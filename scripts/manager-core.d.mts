/**
 * manager-core.mjs 是纯 JavaScript（命令行版与插件共用同一份），
 * 这里给出插件用到的那部分类型，让 tsc 能检查插件侧的调用。
 */
export interface ManagerOptions {
  toolRoot: string
  dataDir: string
  port?: number
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
