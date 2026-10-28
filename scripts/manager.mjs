#!/usr/bin/env node
/**
 * 发布内核的本地调试入口
 *
 * 用户实际用的是 Obsidian 插件，界面开在 Obsidian 里。这个文件只是让内核
 * 能在 Obsidian 外面跑起来，方便在浏览器里调接口、看日志；端到端测试也用它起实例。
 *
 *   npm run dev:manager  →  http://localhost:3457
 *
 * 真正的实现在 scripts/manager-core.mjs —— 插件用的是同一份，所以行为和插件里完全一致。
 * 这个文件只负责：定位目录、读环境变量、启动、打印地址。
 *
 * 配置文件：
 *   connections.json（随仓库同步）：{ connections: [{id,name,repo,branch}], }
 *   local.json（仅本机，gitignore）：{ active: id, vaultPaths: { id: 本地库路径 } }
 *   repos/<id>/：各连接的站点仓库工作副本（git clone / 模板初始化）
 */

import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createManager } from './manager-core.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TOOL_ROOT = path.resolve(__dirname, '..')

/**
 * 数据目录（用户区，与源码分离）。
 *
 * 源码目录只放程序代码，可以直接开源；个人数据（连接清单、本机库路径、GitHub 令牌、
 * 站点仓库工作副本）统一放用户区，和其他桌面软件一样，不混在源目录里。
 *
 * 默认：Windows %APPDATA%\obsidian-blog，macOS ~/Library/Application Support/obsidian-blog，
 * Linux ~/.config/obsidian-blog；设 OBSIDIAN_BLOG_DATA 可整体改到别处
 * （例如放 U 盘、放同步盘，或跑测试时用临时目录）。
 */
function resolveDataDir() {
  const fromEnv = (process.env.OBSIDIAN_BLOG_DATA || '').trim()
  if (fromEnv) return path.resolve(fromEnv)
  const home = os.homedir() || ''
  if (process.platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'obsidian-blog')
  }
  if (process.platform === 'darwin') {
    return path.join(home, 'Library', 'Application Support', 'obsidian-blog')
  }
  return path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'obsidian-blog')
}

const PORT = Number(process.env.MGR_PORT || 3457)
const DATA_DIR = resolveDataDir()

const mgr = createManager({ toolRoot: TOOL_ROOT, dataDir: DATA_DIR, port: PORT })

mgr
  .start()
  .then((port) => {
    const { conn, vaultPath } = mgr.state()
    console.log(`[manager] Dev server: http://localhost:${port}`)
    console.log(`[manager] Active connection: ${conn ? conn.name : '(none)'}; vault path: ${vaultPath || '(not set)'}`)
    console.log(`[manager] Source directory: ${TOOL_ROOT}`)
    console.log(`[manager] Data directory:   ${DATA_DIR}`)
  })
  .catch((e) => {
    console.error('[manager] ' + String((e && e.message) || e))
    process.exitCode = 1
  })
