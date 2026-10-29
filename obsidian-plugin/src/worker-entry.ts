/**
 * 后台服务进程入口。
 *
 * 为什么不能直接跑在 Obsidian 的渲染进程里：manager-core 的 git/curl 调用用的是
 * spawnSync，会阻塞所在线程。如果放在渲染进程，每次发布或自动同步都会把整个
 * Obsidian 卡住几秒 —— 自动同步是「文件一变就推」，等于边写边卡。
 *
 * 为什么不用 node:worker_threads：Obsidian 的渲染进程跑在 Electron 的 renderer 里，
 * 那个 V8 platform 没有开 Worker 支持，`new Worker(...)` 会直接抛
 * "The V8 platform used by this instance of Node does not support creating Workers"。
 *
 * 所以用 Electron 的 utilityProcess.fork 起一个真正的 Node 子进程；拿不到
 * utilityProcess 时退回 child_process.spawn 系统 node。两种情况下与父进程通信的
 * 通道不同（process.parentPort / process.send），这里统一成一个 send() 抽象。
 *
 * 本文件是 esbuild 的第二个入口，产物 worker.js 与 main.js 同目录。
 */

import { createManager } from '../../scripts/manager-core.mjs'

type StartMsg = { toolRoot: string; dataDir: string; port: number; lang?: string }

interface Port {
  postMessage: (m: unknown) => void
  on: (ev: string, cb: (m: any) => void) => void
}

/** 统一「与父进程通信」的通道：utilityProcess 用 process.parentPort，spawn 用 process.send */
function getPort(): Port | null {
  const p = process as unknown as { parentPort?: Port }
  if (p.parentPort) return p.parentPort
  if (typeof process.send === 'function') {
    return {
      postMessage: (m: unknown) => process.send!(m),
      on: (_ev: string, cb: (m: any) => void) => process.on('message', cb),
    }
  }
  return null
}

/** 启动参数：utilityProcess 走 workerData 式的第一条消息，spawn 走 argv */
function readStartMsg(): StartMsg | null {
  const fromEnv = process.env.BLOG_PUBLISHER_START
  if (fromEnv) {
    try {
      return JSON.parse(fromEnv) as StartMsg
    } catch {
      return null
    }
  }
  return null
}

const port = getPort()

function send(m: unknown): void {
  try {
    port?.postMessage(m)
  } catch {
    /* 父进程已退出 */
  }
}

const msg = readStartMsg()

if (!msg) {
  send({ type: 'error', error: 'missing BLOG_PUBLISHER_START' })
  process.exit(1)
} else {
  const mgr = createManager({
    toolRoot: msg.toolRoot,
    dataDir: msg.dataDir,
    port: msg.port,
    // 启动期的报错没有 HTTP 请求可读 x-lang，只能由宿主把界面语言传进来
    lang: msg.lang === 'en' ? 'en' : 'zh',
    // 子进程没有控制台可看，日志通过消息发回主进程
    log: (m: string) => send({ type: 'log', text: String(m) }),
  })

  mgr
    .start()
    .then((actualPort: number) => {
      send({ type: 'ready', port: actualPort })
    })
    .catch((e: unknown) => {
      send({ type: 'error', error: String((e as Error)?.message || e) })
    })

  // 父进程要求关闭时，先停服务再退出
  port?.on('message', (m: { type?: string }) => {
    if (m && m.type === 'stop') {
      mgr
        .stop()
        .catch(() => undefined)
        .finally(() => process.exit(0))
    }
  })
}
