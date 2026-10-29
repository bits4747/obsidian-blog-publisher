/**
 * 博客发布器的全部实现：数据层 + 发布/自动同步逻辑 + HTTP 服务 + 界面。
 *
 * 这里是一个工厂函数，而不是一个「跑起来就监听端口」的脚本 —— 因为同一套功能
 * 有两个宿主：
 *   ① scripts/manager.mjs  —— 命令行启动，浏览器访问 localhost:3457；
 *   ② Obsidian 插件         —— 在插件里直接调用，界面用 iframe 装同一份 HTML。
 * 功能只有一份实现，插件才可能与管理器完全一致；改一处两边同时生效。
 *
 * 所有路径都由参数注入（toolRoot / dataDir / port），不在模块加载时读环境变量，
 * 这样同一个进程里可以起多个实例（测试、多个库并存）。
 */

import { promises as fsp } from 'node:fs'
import fsSync from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import http from 'node:http'
import matter from 'gray-matter'
import { UI } from './ui-template.mjs'
import { THEME_PRESETS } from './theme-presets.mjs'
import { THEME_PREVIEWS, THEME_PREVIEW_VERSION } from './theme-previews.mjs'

/**
 * @param {object} opts
 * @param {string} opts.toolRoot 站点模板所在目录（含 package.json / src / scripts/build-content.mjs）
 * @param {string} opts.dataDir  个人数据目录（连接清单、令牌、仓库工作副本）
 * @param {number} [opts.port]   监听端口，0 表示随机可用端口
 * @param {(msg: string) => void} [opts.log]  日志输出
 */
export function createManager(opts) {
  const TOOL_ROOT = path.resolve(opts.toolRoot)
  const DATA_DIR = path.resolve(opts.dataDir)
  const PORT = Number.isFinite(opts.port) ? opts.port : 3457
  const log = typeof opts.log === 'function' ? opts.log : (m) => console.log(m)
  const __dirname = path.join(TOOL_ROOT, "scripts")



  // ---------- 数据目录（用户区，与源码分离）----------
  /**
   * 源码目录（TOOL_ROOT）只放程序代码，可以直接开源；
   * 个人数据（连接清单、本机库路径、GitHub 令牌、站点仓库工作副本）统一放用户区，
   * 和其他桌面软件一样，不混在源目录里。
   *
   * 本机数据默认落在：Windows %APPDATA%\obsidian-blog，macOS ~/Library/Application Support/obsidian-blog，
   * Linux  ~/.config/obsidian-blog；设置环境变量 OBSIDIAN_BLOG_DATA 可整体改到别处
   * （例如放 U 盘、放同步盘，或开源仓库里跑测试时用临时目录）。
   */

  /**
   * 首次启动时，把散落在源码目录里的旧数据搬到用户区。
   * 已经搬过的（用户区有文件、或源目录里本来就没有）就什么都不做，
   * 所以重复运行、升级后重新运行都是安全的。
   */
  function migrateDataToUserDir() {
    const moves = [
      ['connections.json', 'connections.json'],
      ['local.json', 'local.json'],
      ['repos', 'repos'],
      ['content', 'content'],
    ]
    let moved = 0
    for (const [from, to] of moves) {
      const src = path.join(TOOL_ROOT, from)
      const dst = path.join(DATA_DIR, to)
      if (!fsSync.existsSync(src) || fsSync.existsSync(dst)) continue
      try {
        fsSync.mkdirSync(path.dirname(dst), { recursive: true })
        fsSync.renameSync(src, dst)
        moved += 1
        console.log(`[manager] 已把 ${from} 移到用户数据目录：${dst}`)
      } catch (e) {
        // 搬不动（例如跨盘、被占用）就留在原处，功能不受影响，只是数据还在源目录
        console.warn(`[manager] ${from} 未能移到用户数据目录（将继续使用源目录里的那份）：${e.message}`)
      }
    }
    if (moved === 0) return
    const envSrc = path.join(TOOL_ROOT, '.env')
    if (fsSync.existsSync(envSrc) && !fsSync.existsSync(path.join(DATA_DIR, '.env'))) {
      try {
        fsSync.renameSync(envSrc, path.join(DATA_DIR, '.env'))
        console.log(`[manager] 已把 .env 移到用户数据目录`)
      } catch {
        /* 忽略 */
      }
    }
  }
  const SKIP = ['.obsidian', '.trash', '.smart-env', '.git', 'node_modules', '.next', 'out']
  const ASSET_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico', '.avif', '.pdf', '.mp3', '.wav', '.ogg', '.m4a', '.mp4', '.webm'])

  // ---------- 通用 ----------
  const readJson = (file, def) => {
    try {
      return JSON.parse(fsSync.readFileSync(file, 'utf8'))
    } catch {
      // 主文件坏了（半截写、磁盘满、手工改坏）时用上一次的备份救回来，
      // 否则一次坏写就会把全部连接和令牌"清零"，用户只能重建。
      try {
        return JSON.parse(fsSync.readFileSync(file + '.bak', 'utf8'))
      } catch {
        return def
      }
    }
  }
  const writeJson = (file, obj) => {
    // ⚠️ 必须建父目录：全新用户第一次使用管理器时用户数据目录还不存在
    // （DATA_DIR 是惰性创建的），否则 writeFileSync 直接 ENOENT，表现为
    // 「新建连接点不动 / 保存失败」。
    fsSync.mkdirSync(path.dirname(file), { recursive: true })
    // 原子写：先写临时文件再 rename，避免中途失败留下半截 JSON。
    const tmp = file + '.tmp'
    fsSync.writeFileSync(tmp, JSON.stringify(obj, null, 2))
    try {
      if (fsSync.existsSync(file)) fsSync.copyFileSync(file, file + '.bak')
    } catch {
      /* 备份失败不影响本次写入 */
    }
    fsSync.renameSync(tmp, file)
    return obj
  }
  const normalize = (p) => p.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '')
  const isMarkdown = (p) => /\.(md|markdown)$/i.test(p)
  const assetOf = (p) => {
    const ext = path.extname(p).toLowerCase()
    return ASSET_EXTS.has(ext) ? ext : null
  }
  function validVault(p) {
    if (!p || !path.isAbsolute(p)) return false
    try {
      return fsSync.statSync(path.join(p, '.obsidian')).isDirectory()
    } catch {
      return false
    }
  }
  function walkFiles(dir, baseDir, out = []) {
    let entries
    try {
      entries = fsSync.readdirSync(dir, { withFileTypes: true })
    } catch {
      return out
    }
    for (const e of entries) {
      const abs = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (SKIP.some((d) => e.name === d || e.name.startsWith(d + '/'))) continue
        walkFiles(abs, baseDir, out)
      } else if (e.isFile()) {
        out.push({ rel: path.relative(baseDir, abs).replace(/\\/g, '/'), abs })
      }
    }
    return out
  }

  // ---------- 连接配置 ----------
  // 数据全部在用户区（DATA_DIR），源目录保持干净可开源。
  // 注意：迁移必须在解析下列路径之前执行，所以放在这里同步调用一次。
  migrateDataToUserDir()
  const CONNECTIONS_FILE = path.join(DATA_DIR, 'connections.json')
  const LOCAL_FILE = path.join(DATA_DIR, 'local.json')

  function loadConnections() {
    const j = readJson(CONNECTIONS_FILE, { connections: [] })
    return Array.isArray(j.connections) ? j.connections : []
  }
  function saveConnections(list) {
    writeJson(CONNECTIONS_FILE, { connections: list })
  }
  function loadLocal() {
    return readJson(LOCAL_FILE, { active: null, vaultPaths: {} })
  }
  function saveLocal(local) {
    writeJson(LOCAL_FILE, local)
  }

  // 每个库一份「发布水位」：上次成功发布的时刻 + 已经确认过的删除。
  // 只存在本地配置（DATA_DIR/local.json），不上传、不进仓库。
  function loadPublishMark(connId) {
    if (!connId) return null
    const local = loadLocal()
    const all = local.publishMarks
    const m = all && typeof all === 'object' ? all[connId] : null
    return m && typeof m === 'object' ? m : null
  }
  function savePublishMark(connId, mark) {
    if (!connId) return
    const local = loadLocal()
    if (!local.publishMarks || typeof local.publishMarks !== 'object') local.publishMarks = {}
    local.publishMarks[connId] = mark
    saveLocal(local)
  }

  // ---------- 跨进程发布互斥 ----------
  /**
   * 为什么需要这一层：同一个数据目录可能被**两个管理器进程**同时使用 ——
   *   ① 本地调试入口 scripts/manager.mjs（默认 3457 端口）；
   *   ② Obsidian 插件里的后台服务（worker.js，随机端口）。
   * 两者共用 DATA_DIR，也就共用同一批 git 工作副本。而 PUBLISHING / autoBusy
   * 只是各自进程内存里的变量，跨进程完全无效。
   *
   * 后果（用户实测踩到）：转私密时两边几乎同时收到文件变化，同时往同一个工作副本
   * add/commit/push。先跑的那个提交 330864e 推上去了；后跑的那个在「提交已完成、
   * 推送被拒」之间失败，界面上记一条「推送失败」—— 可内容其实已经上线了。
   * 用户看到的就是「日志显示推送失败，但网页上确实没了」，完全无法判断到底成没成。
   *
   * 做法：数据目录里一个锁文件，openSync(file,'wx') 原子创建。锁里写 pid 与时刻，
   * 进程崩溃留下的死锁按「pid 已不存在」或「超过 10 分钟」自动回收。
   */
  const LOCK_DIR = path.join(DATA_DIR, 'locks')
  const LOCK_STALE_MS = 10 * 60 * 1000
  function lockFileOf(key) {
    return path.join(LOCK_DIR, String(key || 'publish').replace(/[^\w.-]/g, '_') + '.lock')
  }
  function readLockFile(file) {
    try {
      const j = JSON.parse(fsSync.readFileSync(file, 'utf8'))
      return j && typeof j === 'object' ? j : null
    } catch {
      return null
    }
  }
  /** pid 还活着吗：EPERM 说明进程在、只是不归我们管，也算活着。 */
  function pidAlive(pid) {
    if (!Number.isFinite(pid) || pid <= 0) return false
    try {
      process.kill(pid, 0)
      return true
    } catch (e) {
      return !!e && e.code === 'EPERM'
    }
  }
  /**
   * 抢锁。成功返回 { ok:true, release() }；被别人占着返回 { ok:false, holder }。
   * 锁目录建不出来（权限/只读盘）时返回 ok:true 且 degraded —— 不能因为拿不到锁
   * 就让人彻底无法发布，此时退回进程内互斥（PUBLISHING / autoBusy 仍在生效）。
   */
  function acquireLock(key) {
    const file = lockFileOf(key)
    try {
      fsSync.mkdirSync(LOCK_DIR, { recursive: true })
    } catch {
      return { ok: true, release() {}, degraded: true }
    }
    const me = { pid: process.pid, at: Date.now(), host: os.hostname() }
    for (let i = 0; i < 3; i++) {
      try {
        const fd = fsSync.openSync(file, 'wx')
        try {
          fsSync.writeFileSync(fd, JSON.stringify(me))
        } finally {
          fsSync.closeSync(fd)
        }
        let released = false
        return {
          ok: true,
          release() {
            if (released) return
            released = true
            try {
              const cur = readLockFile(file)
              // 只删自己那把：万一被判过期后别人抢到了，不能把别人的锁删掉。
              if (!cur || cur.pid === process.pid) fsSync.rmSync(file, { force: true })
            } catch {
              /* 删不掉就等它过期 */
            }
          },
        }
      } catch (e) {
        if (!e || e.code !== 'EEXIST') return { ok: true, release() {}, degraded: true }
        const cur = readLockFile(file)
        const stale = !cur || !pidAlive(cur.pid) || Date.now() - (Number(cur.at) || 0) > LOCK_STALE_MS
        if (!stale) return { ok: false, holder: cur }
        // 死锁（进程已被杀/卡了 10 分钟以上）：回收后重试
        try {
          fsSync.rmSync(file, { force: true })
        } catch {
          /* 别人先删了，下一轮再试 */
        }
      }
    }
    return { ok: false, holder: readLockFile(file) }
  }
  /** 拿到锁才执行 fn；拿不到返回 { busy:true, holder }（调用方决定是报错还是排队）。 */
  async function withPublishLock(key, fn) {
    const lk = acquireLock(key)
    if (!lk.ok) return { busy: true, holder: lk.holder }
    try {
      return await fn()
    } finally {
      lk.release()
    }
  }

  // 「新增 / 修改 / 删除」三栏是**日志**：自动同步发布只是把内容推上去，
  // 清单里那几条要留着让人看见；只有手动点「发布到 GitHub」才清空（算旧的改动）。
  // 之前是「库 vs content/ 现算差集」，任何一次发布都会让清单瞬间归零，
  // 自动同步开着时用户根本看不到自己刚改了什么，所以改成累积到本地配置里。
  // 每条只有路径；分类会变（新增后被改 → 只剩「修改」），同一篇只保留最新那一类。
  const CHANGE_KEYS = ['added', 'modified', 'deleted']
  function emptyChanges() {
    return { added: [], modified: [], deleted: [] }
  }
  function loadChangeLog(connId) {
    if (!connId) return emptyChanges()
    const local = loadLocal()
    const all = local.changeLog
    const raw = all && typeof all === 'object' ? all[connId] : null
    const out = emptyChanges()
    for (const k of CHANGE_KEYS) {
      const v = raw && raw[k]
      out[k] = Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x) : []
    }
    return out
  }
  function saveChangeLog(connId, next) {
    if (!connId) return
    const local = loadLocal()
    if (!local.changeLog || typeof local.changeLog !== 'object') local.changeLog = {}
    const out = emptyChanges()
    for (const k of CHANGE_KEYS) out[k] = (next && next[k]) || []
    local.changeLog[connId] = out
    saveLocal(local)
  }
  function clearChangeLog(connId) {
    saveChangeLog(connId, emptyChanges())
  }

  // ---------- 自动同步的历史 ----------
  // 自动同步是「后台自己干活」，跑了、推了、还是悄悄失败了，用户在界面上完全看不见。
  // 这里给每个库留最近若干条流水（时刻 + 各类改动数量 + 是否推上去 + 提交号 + 失败原因），
  // 界面轮询 /api/state 时顺带画出来。只增不删，超过上限自动截断，重启后仍在（存本地配置）。
  const AUTO_LOG_MAX = 20
  function loadAutoLog(connId) {
    if (!connId) return []
    const local = loadLocal()
    const all = local.autoLog
    const raw = all && typeof all === 'object' ? all[connId] : null
    if (!Array.isArray(raw)) return []
    return raw
      .filter((e) => e && typeof e === 'object' && Number.isFinite(e.at))
      .slice(0, AUTO_LOG_MAX)
  }
  function pushAutoLog(connId, entry) {
    if (!connId || !entry) return
    const cur = loadAutoLog(connId)
    cur.unshift(entry)
    const local = loadLocal()
    if (!local.autoLog || typeof local.autoLog !== 'object') local.autoLog = {}
    local.autoLog[connId] = cur.slice(0, AUTO_LOG_MAX)
    try {
      saveLocal(local)
    } catch {
      /* 写不进去不影响这次自动同步 */
    }
  }
  /** 回填某条自动同步流水（用 at 定位）：上线确认之后补 live/liveAt。 */
  function patchAutoLog(connId, at, patch) {
    if (!connId) return
    const local = loadLocal()
    const all = local.autoLog && typeof local.autoLog === 'object' ? local.autoLog : null
    const list = all && all[connId]
    if (!Array.isArray(list)) return
    const hit = list.find((e) => e && e.at === at)
    if (!hit) return
    Object.assign(hit, patch)
    try {
      saveLocal(local)
    } catch {
      /* 同上 */
    }
  }

  /** 清空某个库的自动同步流水（界面上的「清空」按钮）。 */
  function clearAutoLog(connId) {
    if (!connId) return
    const local = loadLocal()
    if (!local.autoLog || typeof local.autoLog !== 'object') local.autoLog = {}
    local.autoLog[connId] = []
    saveLocal(local)
  }

  /**
   * 探测「线上那份产物是不是我们要的这次构建」。
   * /api/live 与后台自动同步共用，所以单独抽出来。
   * 判定优先用 commit（线上 index.json 里带构建提交号，不受本机时钟影响）；
   * 旧产物没有该字段时才退回比时间（generatedAt 晚于基线）。
   */
  async function probeLiveSite(target, since, wantSha) {
    const t0 = Date.now()
    try {
      const r = await fetch(`${target}data/index.json?fresh=${t0}`, {
        cache: 'no-store',
        headers: { 'cache-control': 'no-cache', pragma: 'no-cache', 'user-agent': 'obsidian-blog-manager' },
        signal: AbortSignal.timeout(15000),
      })
      if (!r.ok) return { live: false, httpStatus: r.status, ms: Date.now() - t0 }
      const data = await r.json()
      const at = Date.parse(String((data && data.generatedAt) || '')) || 0
      const commit = String((data && data.commit) || '')
      return {
        live: wantSha && commit ? commit === wantSha : at > since,
        commit,
        generatedAt: at,
        notes: Array.isArray(data && data.notes) ? data.notes.length : 0,
        ms: Date.now() - t0,
      }
    } catch (e) {
      return { live: false, error: String((e && e.message) || e), ms: Date.now() - t0 }
    }
  }

  /** 从仓库地址拆出 owner / name（GitHub API 用），识别不出返回 null。 */
  function repoParts(repo) {
    const s = String(repo || '').trim()
    if (!s) return null
    let m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i)
    if (!m) m = s.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i)
    if (!m) return null
    return { owner: m[1], name: m[2] }
  }

  /**
   * 查这次提交的 GitHub Actions 构建跑到哪一步了。
   *
   * 为什么需要：Pages 部署偶尔会卡住（实测卡在 `npm ci` 里十几分钟一动不动，
   * 平时整条流程只要 40~90 秒）。光看线上产物只能得出「还没上线」，分不清
   * 是「正在构建」还是「早就挂了」，界面就只能一直显示「等构建」。
   * 有了这个才能明确说「构建失败」并给出 Actions 链接。
   * 没有令牌 / 不是 GitHub 仓库时返回 null，调用方退回纯轮询。
   */
  async function probeBuildStatus(repo, sha) {
    if (!sha) return null
    const parts = repoParts(repo)
    if (!parts) return null
    const token = loadLocal().githubToken
    if (!token) return null
    try {
      const u =
        `https://api.github.com/repos/${parts.owner}/${parts.name}/actions/runs` +
        `?head_sha=${encodeURIComponent(sha)}&per_page=5`
      const r = await fetch(u, {
        headers: {
          accept: 'application/vnd.github+json',
          authorization: `Bearer ${token}`,
          'user-agent': 'obsidian-blog-manager',
        },
        signal: AbortSignal.timeout(15000),
      })
      if (!r.ok) return { httpStatus: r.status }
      const data = await r.json()
      const runs = Array.isArray(data && data.workflow_runs) ? data.workflow_runs : []
      const hit = runs.find((x) => String(x.head_sha || '') === sha) || runs[0]
      if (!hit) return { found: false }
      return {
        found: true,
        id: hit.id,
        status: String(hit.status || ''),
        conclusion: String(hit.conclusion || ''),
        startedAt: Date.parse(String(hit.run_started_at || '')) || 0,
        updatedAt: Date.parse(String(hit.updated_at || '')) || 0,
        url: String(hit.html_url || ''),
      }
    } catch (e) {
      return { error: String((e && e.message) || e) }
    }
  }
  /** 把这次算出来的差集并进日志（只增不减；清空只由手动发布负责）。 */
  function recordChanges(connId, diff) {
    const cur = loadChangeLog(connId)
    let dirty = false
    for (const k of CHANGE_KEYS) {
      for (const p of (diff && diff[k]) || []) {
        const rel = normalize(p)
        // 换了类别就从别的栏里摘掉，避免同一篇同时挂在「新增」和「修改」
        for (const k2 of CHANGE_KEYS) {
          if (k2 === k) continue
          const i = cur[k2].indexOf(rel)
          if (i >= 0) {
            cur[k2].splice(i, 1)
            dirty = true
          }
        }
        if (!cur[k].includes(rel)) {
          cur[k].push(rel)
          dirty = true
        }
      }
    }
    if (dirty) {
      try {
        saveChangeLog(connId, cur)
      } catch {
        /* 日志写不进去不影响其它功能 */
      }
    }
    return cur
  }

  /**
   * 从「变更清单」里摘掉已经被自动同步处理掉的条目。
   *
   * 自动同步把某一类改动发上去之后，这批改动就不再是「待处理」了：留在三栏里
   * 会让人以为还得再点一次「发布」，顶部提示也会一直挂着。历史并不丢 ——
   * autoLog 里记着这次改了哪些文件、什么时候上线。
   *
   * 只摘**真正发上去**的那几类：某类开关没开时那类仍然留着，等用户手动处理。
   */
  function dropChanges(connId, parts) {
    if (!connId) return
    const cur = loadChangeLog(connId)
    let dirty = false
    for (const k of CHANGE_KEYS) {
      const list = (parts && parts[k]) || []
      if (!list.length) continue
      const gone = new Set(list.map((p) => normalize(p)))
      const next = cur[k].filter((p) => !gone.has(normalize(p)))
      if (next.length !== cur[k].length) {
        cur[k] = next
        dirty = true
      }
    }
    if (!dirty) return
    try {
      saveChangeLog(connId, cur)
    } catch {
      /* 写不进去不影响自动同步 */
    }
  }

  function activeConfig() {
    const local = loadLocal()
    const connections = loadConnections()
    const conn = connections.find((c) => c.id === local.active) ?? null
    const vaultPath = conn ? local.vaultPaths?.[conn.id] ?? '' : ''
    const workdir = conn ? path.join(DATA_DIR, 'repos', conn.id) : ''
    return { local, connections, conn, vaultPath, workdir }
  }

  // 模板初始化：把发布站点所需的文件从工具目录拷到新工作副本
  const TEMPLATE_ITEMS = ['package.json', 'package-lock.json', 'next.config.ts', 'postcss.config.mjs', 'components.json', 'tsconfig.json', 'src', 'scripts/build-content.mjs', '.github']

  /**
   * 自定义外观：库主人在管理器里粘贴的一段 CSS，最终存成仓库里的 public/theme.css。
   *
   * 为什么放在**仓库**里、而不是管理器本地配置里：
   *   站点是 GitHub Actions 从仓库构建的，CI 看不到本机的 DATA_DIR。
   *   只有把 theme.css 提交进仓库，构建时才能把它一起打进 out/。
   *
   * 为什么是 public/ 而不是 src/：
   *   public/ 下的文件由 Next 的 output:'export' 原样拷进 out/，不经过打包器，
   *   所以用户写的 CSS 不会被当成模块处理，也不需要改任何 .tsx。
   *   同时 public/ 不在 TEMPLATE_ITEMS 里 —— initTemplate() 不会碰它，
   *   用户的外观不会在「更新源码」时被模板覆盖掉。
   *
   * 上限 200KB：正常的主题微调远到不了，设一个上限只是防止误粘贴一个巨型文件
   * 把仓库和构建撑坏。
   */
  const THEME_REL = path.join('public', 'theme.css')
  const THEME_MAX_BYTES = 200 * 1024

  /** 读当前连接的自定义 CSS（工作副本还没准备好时按空处理，绝不为了读它去 clone） */
  function readThemeCss(workdir) {
    if (!workdir) return ''
    try {
      return fsSync.readFileSync(path.join(workdir, THEME_REL), 'utf8')
    } catch {
      return ''
    }
  }

  /** 写入/清除自定义 CSS。返回 { bytes, removed }；内容为空串时删除文件。 */
  function writeThemeCss(workdir, css) {
    const file = path.join(workdir, THEME_REL)
    if (!css.trim()) {
      try {
        fsSync.rmSync(file, { force: true })
      } catch {
        /* 本来就没有 */
      }
      return { bytes: 0, removed: true }
    }
    fsSync.mkdirSync(path.dirname(file), { recursive: true })
    // 统一用 \n 行尾：Windows 上粘贴的文本常带 \r\n，换台机器构建时
    // git 的 autocrlf 会让它来回变，导致「什么都没改却出现一个 diff」。
    fsSync.writeFileSync(file, css.replace(/\r\n?/g, '\n'), 'utf8')
    return { bytes: Buffer.byteLength(css, 'utf8'), removed: false }
  }

  /**
   * 把模板同步进工作副本。
   *
   * overwrite=false（已有站点、只想补齐缺失文件）时**仍然要处理删除**：
   * 模板里删掉的文件（例如 src/lib/profile.ts 随"去掉账号体系"一起删除）
   * 如果只做 cpSync 新增/覆盖，线上仓库会永远留着一个没人引用的死文件，
   * 甚至继续被构建打进产物。这里的规则是：
   *   - 模板里有的 → 覆盖/补齐（overwrite=false 时已有的先跳过）
   *   - 模板**目录内**多出来的文件 → 删掉（这些目录由模板全权拥有）
   * 顶层单文件（package.json 等）不删：用户可能自己加过东西。
   */
  function initTemplate(workdir, overwrite = true) {
    fsSync.mkdirSync(workdir, { recursive: true })
    for (const item of TEMPLATE_ITEMS) {
      const src = path.join(TOOL_ROOT, item)
      const dst = path.join(workdir, item)
      if (!fsSync.existsSync(src)) continue
      if (!overwrite && fsSync.existsSync(dst)) {
        // 已存在且不是全量覆盖：只清理"模板目录里多出来的文件"
        if (fsSync.statSync(src).isDirectory()) pruneMissing(src, dst)
        continue
      }
      if (fsSync.statSync(src).isDirectory() && fsSync.existsSync(dst)) {
        pruneMissing(src, dst)
      }
      fsSync.cpSync(src, dst, { recursive: true })
    }
    const gi = path.join(workdir, '.gitignore')
    if (overwrite || !fsSync.existsSync(gi)) {
      // 注意：content/ 绝不能写进这里忽略。本仓库是发布内容仓库，CI 靠仓库里的 content/ 生成站点。
      // 一旦忽略 content/，新公开或「取消公开再恢复」的笔记会被 git add -A 跳过，怎么发布都上不了线。
      fsSync.writeFileSync(gi, 'node_modules\n.next\nout\n.env\n.sync-manifest.json\n*.log\nlocal.json\nrepos/\npublic/data\npublic/assets\n')
    }
  }

  /** 删除 dst 中 src 已不存在的文件/目录（仅限模板拥有的目录树内部） */
  function pruneMissing(src, dst) {
    let entries
    try {
      entries = fsSync.readdirSync(dst, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      // 不碰 git 元数据与依赖目录
      if (e.name === '.git' || e.name === 'node_modules' || e.name === '.next' || e.name === 'out') continue
      const s = path.join(src, e.name)
      const d = path.join(dst, e.name)
      if (!fsSync.existsSync(s)) {
        fsSync.rmSync(d, { recursive: true, force: true })
        continue
      }
      if (e.isDirectory() && fsSync.statSync(s).isDirectory()) pruneMissing(s, d)
    }
  }

  /**
   * 远端仓库可达性与分支存在性。
   * 返回 { reachable, has, error }：
   *   reachable=false → 连不上这个仓库（没授权 / 仓库不存在 / 网络）。
   *     ⚠️ 不能当成「空仓库」去模板初始化：那样连接看着建好了，但发布必然推不上去，
   *     用户只会得到一个莫名其妙的失败。这里让它明确失败，由界面弹出授权引导。
   *   reachable=true, has=false → 仓库确实在但是空的 → 走模板初始化。
   *   reachable=true, has=true  → 走 clone。
   * 判据：空仓库的 ls-remote 返回 0 + 空输出；授权/网络问题返回 128。
   */
  function remoteHasBranch(repo, branch) {  try {
      const out = git(['ls-remote', '--heads', repo, branch])
      return { reachable: true, has: out.trim().length > 0 }
    } catch (e) {
      return { reachable: false, has: false, error: String((e && e.message) || e).slice(0, 200) }
    }
  }

  // 建立/恢复工作副本：远端有历史就 clone（保留提交），否则用模板初始化。
  // 远端连不上（未授权 / 仓库不存在 / 断网）时**不再**假装是空仓库，直接返回错误。
  function prepareWorkdir(conn, wantTemplate) {
    const workdir = path.join(DATA_DIR, 'repos', conn.id)
    const branch = conn.branch || 'main'
    const remote = remoteHasBranch(conn.repo, branch)
    if (!remote.reachable) {
      return { workdir, cloned: false, errKey: 'errRepoUnreachable', errArg: remote.error || '' }
    }
    if (remote.has) {
      try {
        git(['clone', '--branch', branch, conn.repo, workdir])
        if (wantTemplate) initTemplate(workdir, false) // 只补齐缺失文件
        return { workdir, cloned: true }
      } catch {
        fsSync.rmSync(workdir, { recursive: true, force: true })
        return { workdir, cloned: false, errKey: 'errCloneFail', errArg: '' }
      }
    }
    fsSync.rmSync(workdir, { recursive: true, force: true })
    initTemplate(workdir, true)
    git(['init', '-b', branch], workdir)
    try {
      git(['remote', 'add', 'origin', conn.repo], workdir)
    } catch {
      /* 可能已有 remote */
    }
    return { workdir, cloned: false, initialized: true }
  }

  function ensureWorkdir(conn) {
    const workdir = path.join(DATA_DIR, 'repos', conn.id)
    if (fsSync.existsSync(path.join(workdir, '.git'))) return { workdir, cloned: true }
    if (fsSync.existsSync(workdir) && fsSync.readdirSync(workdir).length > 0) {
      // 用结构化字段而不是拼好的中文句子，报错文案交给调用方按界面语言生成
      return { workdir, cloned: false, errKey: 'errNoDir', errArg: workdir }
    }
    try {
      return prepareWorkdir(conn, true)
    } catch (e) {
      return { workdir, cloned: false, error: String(e.message || e).slice(0, 200) }
    }
  }

  // 统一 git 调用：非零退出码 / spawn 失败一律抛错（避免失败被静默吞掉）
  //
  // ⚠️ 三个必加的保险（新机器上没配过 GitHub 凭据时会踩到）：
  //   ① GIT_TERMINAL_PROMPT=0 + credential.interactive=false：git 拿不到凭据时
  //      默认会弹交互提示（甚至 GUI 窗口）要用户名密码，在后台服务里就表现为
  //      「点一键连接永久卡住」。禁掉交互后它会立刻失败，界面才能给出引导。
  //   ② 有 GitHub 令牌时用 basic 认证头带上它（走 http.extraHeader，不写进
  //      remote URL、不落盘 .git/config），所以不装 gh、不配 GCM 也能连/推。
  //   ③ GIT_SSL_NO_VERIFY=1：本机的 Steam++（Watt Toolkit）加速器把
  //      github.com 指到 127.0.0.1 并用自签根证书做 MITM。Windows 的 schannel
  //      做吊销检查时查不到该证书的 CRL/OCSP，直接报
  //      "CRYPT_E_NO_REVOCATION_CHECK (0x80092012)" —— 此时网络其实是通的，
  //      但 git 连不上，表现为「点发布没反应 / 推不上去」。
  //      注意：GIT_SSL_NO_VERIFY 必须走环境变量，写成
  //      `-c http.sslVerify=false` 在本机实测同样有效，但环境变量覆盖面更广
  //      （对 clone/push 的子进程也生效）。代价是跳过证书校验：只在明确
  //      拿到 GitHub 令牌、目标是 GitHub 时才设，且用户信息通过 https + 令牌头
  //      传输，风险可控。
  // 工作副本的 origin 是不是 GitHub（缓存，避免每次 git 调用都读一遍 config）
  const githubWorkdirCache = new Map()
  function isGithubWorkdir(cwd) {
    if (!cwd) return false
    if (githubWorkdirCache.has(cwd)) return githubWorkdirCache.get(cwd)
    let yes = false
    try {
      yes = /github[.]com/i.test(fsSync.readFileSync(path.join(cwd, '.git', 'config'), 'utf8'))
    } catch {
      yes = false
    }
    githubWorkdirCache.set(cwd, yes)
    return yes
  }

  function git(args, cwd) {
    const token = readGithubToken()
    const pre = ['-c', 'credential.interactive=false']
    // 目标是 GitHub 才带令牌、才跳过证书校验。
    // URL 里能看出来的（ls-remote/clone）直接判断；带 cwd 的（push/pull 等）以前
    // 一律当成 GitHub，导致**任何**远端仓库都会收到 GitHub 令牌 —— 这里改成读
    // .git/config 里真实的 origin 地址再判断。
    const looksGithub = /github[.]com/i.test(args.join(' ')) || (!!cwd && isGithubWorkdir(cwd))
    // ⚠️ 令牌不能拼进命令行参数：`-c http.extraHeader=Authorization: Basic ...`
    // 会出现在进程列表里（同机其它用户/进程都能看到），也会被某些工具的
    // 错误输出带出来。改用 git 官方的环境变量注入（GIT_CONFIG_COUNT 系列），
    // 配置照样生效，但不出现在 argv 里。
    const env = {
      ...process.env,
      GIT_TERMINAL_PROMPT: '0',
    }
    if (token && looksGithub) {
      const basic = Buffer.from('x-access-token:' + token).toString('base64')
      env.GIT_CONFIG_COUNT = '1'
      env.GIT_CONFIG_KEY_0 = 'http.extraHeader'
      env.GIT_CONFIG_VALUE_0 = 'Authorization: Basic ' + basic
      // 见函数上方注释 ③：有令牌且目标是 GitHub 时，跳过 MITM 证书的吊销检查
      env.GIT_SSL_NO_VERIFY = '1'
    }
    const r = spawnSync('git', [...pre, ...args], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 120000,
      windowsHide: true,
      env,
    })
    if (r.error) throw new Error(r.error.message)
    if (r.status !== 0) {
      // 兜底文案是英文的（git 完全没输出的极端情况），但上游 publish() 会走
      // localizeRaw 归类，中文模式下用户看到的是「git 命令执行失败」。
      throw new Error(((r.stderr || '') + (r.stdout || '')).trim().slice(0, 300) || ('git ' + args.join(' ') + ' failed'))
    }
    return (r.stdout || '').trim()
  }

  /**
   * 远端分支上是否已经包含本地 HEAD 这个提交。
   *
   * 只用来回答一个问题：「推送报错了，但内容是不是其实已经上去了？」
   * 场景：另一个发布进程（插件后台 / 本地调试入口）或另一台电脑刚刚推过，
   * 本机再推就会被拒（non-fast-forward / stale info），可线上已经是这一版。
   * 这时候继续报「推送失败」纯属误导 —— 用户会以为没生效而反复重试。
   *
   * 任何一步拿不到结果都返回 false（宁可报失败，也不要谎报成功）。
   */
  async function remoteHasHead(conn, workdir) {
    try {
      const head = git(['rev-parse', 'HEAD'], workdir).trim()
      if (!head) return false
      let branch = ''
      try {
        branch = git(['rev-parse', '--abbrev-ref', 'HEAD'], workdir).trim()
      } catch {
        return false
      }
      if (!branch || branch === 'HEAD') return false
      // ls-remote 走网络，失败就作罢（返回值交给调用方当「没推上去」处理）
      const out = git(['ls-remote', 'origin', 'refs/heads/' + branch], workdir)
      const remoteSha = (out.split(/\s+/)[0] || '').trim()
      return !!remoteSha && remoteSha === head
    } catch {
      return false
    }
  }

  /**
   * 从 GitHub 仓库地址推出「线上网页地址」（GitHub Pages）。
   *
   * 规则（GitHub Pages 的项目站）：https://<用户名>.github.io/<仓库名>/
   * 也能识别 ssh 形式 git@github.com:用户名/仓库.git。
   * 识别不出（不是 GitHub 仓库）时返回 null —— 界面会隐藏「打开网页」按钮。
   */
  function siteUrlOf(repo) {
    const s = String(repo || '').trim()
    if (!s) return null
    let m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i)
    if (!m) m = s.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i)
    if (!m) return null
    const user = m[1]
    const name = m[2]
    // 注意：<用户名>.github.io 这个仓库本身就是「用户站」，地址没有 /仓库名 后缀
    if (name.toLowerCase() === `${user.toLowerCase()}.github.io`) {
      return `https://${user.toLowerCase()}.github.io/`
    }
    return `https://${user.toLowerCase()}.github.io/${name}/`
  }

  /** 仓库标识 owner/name（用于 GitHub REST API），识别不出返回 null */
  function repoSlugOf(repo) {
    const s = String(repo || '').trim()
    let m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i)
    if (!m) m = s.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i)
    return m ? `${m[1]}/${m[2]}` : null
  }

  /**
   * 读取可用的 GitHub 令牌（用于写仓库变量 / 查部署状态 / 让 git 传输免交互）。
   * 优先级：环境变量 GITHUB_TOKEN/GH_TOKEN > 本机在管理器里存过的令牌 > git 凭据管理器。
   * 读不到就返回 null，调用方据此给出「如何授权」的指引，而不是让 git 卡在交互提示上。
   */
  /**
   * 令牌在磁盘上的存法。
   *
   * 旧格式是 local.json 里的 `githubToken` 明文字段——任何能读你用户目录的程序
   * 都能直接拿走它。现在改成用系统自带的「只能本用户解开」的加密：
   *
   *   Windows  DPAPI（CryptProtectData，作用域 CurrentUser）
   *   macOS    Keychain（security 命令）
   *   Linux    没有免依赖的等价物，退回明文并在 README 里写明
   *
   * 两种格式并存：读到 `githubTokenEnc` 就用加密的；读到旧 `githubToken` 就顺手
   * 迁移成加密的并删掉明文字段。迁移失败（系统命令不可用）就保持原样，
   * 绝不让用户因此丢掉令牌。
   *
   * 为什么走子进程而不是纯 JS：DPAPI 是 Windows 系统 API，Node 标准库没有；
   * 装原生模块会给「下载即用」的插件加一道编译门槛。子进程只在保存和首次读取时
   * 各跑一次，结果缓存在内存里，不影响发布速度。
   */
  const TOKEN_ENC_FIELD = 'githubTokenEnc'

  const PS_DPAPI_PROTECT = [
    'Add-Type -AssemblyName System.Security',
    '$p=[Console]::In.ReadToEnd()',
    '$b=[Text.Encoding]::UTF8.GetBytes($p)',
    "$e=[Security.Cryptography.ProtectedData]::Protect($b,$null,'CurrentUser')",
    '[Console]::Out.Write([Convert]::ToBase64String($e))',
  ].join('; ')

  const PS_DPAPI_UNPROTECT = [
    'Add-Type -AssemblyName System.Security',
    '$s=[Console]::In.ReadToEnd()',
    '$e=[Convert]::FromBase64String($s)',
    "$b=[Security.Cryptography.ProtectedData]::Unprotect($e,$null,'CurrentUser')",
    '[Console]::Out.Write([Text.Encoding]::UTF8.GetString($b))',
  ].join('; ')

  function runWithInput(cmd, args, input) {
    const r = spawnSync(cmd, args, {
      input,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 20000,
      windowsHide: true,
    })
    if (r.status !== 0 || r.error) return null
    return r.stdout
  }

  /** 加密令牌；返回 null 表示这台机器没有可用的系统加密，调用方退回明文 */
  function encryptToken(plain) {
    const s = String(plain || '')
    if (!s) return null
    try {
      if (process.platform === 'win32') {
        const out = runWithInput('powershell', ['-NoProfile', '-NonInteractive', '-Command', PS_DPAPI_PROTECT], s)
        return out && out.trim() ? out.trim() : null
      }
      if (process.platform === 'darwin') {
        const acct = process.env.USER || 'user'
        const r = spawnSync('security', ['add-generic-password', '-U', '-a', acct, '-s', 'obsidian-blog-publisher', '-w', s], {
          encoding: 'utf8',
          timeout: 20000,
        })
        return r.status === 0 ? 'keychain' : null
      }
    } catch {
      /* 系统加密不可用就当没有 */
    }
    return null
  }

  /** 解密令牌；拿不到就返回 null */
  function decryptToken(enc) {
    const s = String(enc || '')
    if (!s) return null
    try {
      if (s === 'keychain') {
        const acct = process.env.USER || 'user'
        const r = spawnSync('security', ['find-generic-password', '-a', acct, '-s', 'obsidian-blog-publisher', '-w'], {
          encoding: 'utf8',
          timeout: 20000,
        })
        return r.status === 0 && r.stdout ? r.stdout.replace(/\n$/, '') : null
      }
      if (process.platform === 'win32') {
        const out = runWithInput('powershell', ['-NoProfile', '-NonInteractive', '-Command', PS_DPAPI_UNPROTECT], s)
        return out && out.length ? out : null
      }
    } catch {
      /* 解不开就当没有，让用户重新粘贴 */
    }
    return null
  }

  // 解密结果缓存：readGithubToken() 每次 git 调用都会走一遍，不能每次都起子进程。
  let tokenCache = undefined // undefined=还没读过；null=没有令牌；string=令牌

  function readGithubToken() {
    const fromEnv = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim()
    if (fromEnv) return fromEnv
    // 管理器里粘贴保存过的令牌（local.json，仅本机、已 gitignore）
    if (tokenCache !== undefined) return tokenCache
    try {
      const local = loadLocal()
      let saved = ''
      if (local[TOKEN_ENC_FIELD]) {
        saved = (decryptToken(local[TOKEN_ENC_FIELD]) || '').trim()
      } else if (local.githubToken) {
        // 旧格式：顺手迁移成加密的，迁移失败就继续用明文
        saved = String(local.githubToken).trim()
        try {
          const enc = encryptToken(saved)
          if (enc) {
            local[TOKEN_ENC_FIELD] = enc
            delete local.githubToken
            saveLocal(local)
          }
        } catch {
          /* 迁移失败不影响本次使用 */
        }
      }
      if (saved) {
        tokenCache = saved
        return saved
      }
      tokenCache = null
    } catch {
      /* 读不到就当没有 */
    }
    // 从 git 凭据管理器问一次 github.com 的密码（就是 PAT）—— 非交互，问不到立即返回
    try {
      const r = spawnSync('git', ['credential', 'fill'], {
        input: 'protocol=https\nhost=github.com\n\n',
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 15000,
        windowsHide: true,
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
      })
      if (r.status === 0 && r.stdout) {
        const m = r.stdout.match(/^password=(.+)$/m)
        if (m && m[1].trim()) return m[1].trim()
      }
    } catch {
      /* 没有凭据就当作未授权 */
    }
    return null
  }

  /** 把令牌写进管理器本地存储（local.json，仅本机、不入库）；空串=清除 */
  function saveGithubToken(token) {
    const local = loadLocal()
    const t = String(token || '').trim()
    // 两个字段都先清掉，避免新旧两份不一致
    delete local.githubToken
    delete local[TOKEN_ENC_FIELD]
    if (t) {
      const enc = encryptToken(t)
      if (enc) local[TOKEN_ENC_FIELD] = enc
      else local.githubToken = t // 这台机器没有可用的系统加密，退回明文（README 有说明）
    }
    saveLocal(local)
    tokenCache = t || null
    return !!t
  }


  /**
   * 访问 GitHub 接口（api.github.com）的网络层。
   *
   * 为什么要绕这一下：Node 自带 fetch 走的是自己的网络栈，在这台机器上**穿不过加速器**
   * （git 能通是因为 Git 走系统通道）。结果就是「推送笔记一切正常，但改名同步 / 一键建仓库
   * 总报网络错误」。所以这里改走**系统通道**去发请求，与 git 保持一致：git 能通，它就能通。
   *
   * 实现：优先用系统自带的 curl.exe（Windows 10 1803+ 内置，走系统通道），
   * 失败则回落到 Node fetch。返回值统一成 { ok, status, text }，调用方无需关心走哪条路。
   *
   * ⚠️ 不走 shell：参数用数组直接交给 spawnSync（不经过 cmd），
   * 因此令牌、仓库名里的特殊字符不会被 shell 解释，也不会有命令注入。
   */
  function systemCurlPath() {
    const candidates = [
      path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'curl.exe'),
      'curl.exe',
    ]
    for (const c of candidates) {
      try {
        const r = spawnSync(c, ['--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 10000, windowsHide: true })
        if (r.status === 0) return c
      } catch {
        /* 试下一个 */
      }
    }
    return null
  }

  /**
   * 发一个 GitHub API 请求。opts = { method, token, body, accept }
   * 返回 { ok, status, text }；网络层彻底失败时抛错，由调用方兜住。
   */
  async function ghApi(url, opts = {}) {
    const method = (opts.method || 'GET').toUpperCase()
    const token = opts.token || ''
    const accept = opts.accept || 'application/vnd.github+json'

    // 结果写到临时文件而不是读 stdout：避免中文/长 JSON 经过控制台编码被打坏。
    const curl = systemCurlPath()
    if (curl) {
      const outFile = path.join(os.tmpdir(), 'gh-' + process.pid + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.json')
      const args = [
        '-s', '-S', '-L',
        // Windows 版 curl 用系统 Schannel 做 TLS，默认要联网查证书吊销状态；
        // 在部分网络（代理/加速器/受限网络）下这一步会失败并整条请求报
        // CRYPT_E_NO_REVOCATION_CHECK (0x80092012)，表现为「连不上 GitHub」。
        // 跳过吊销检查即可正常握手（GitHub 证书本身仍然照常校验）。
        '--ssl-no-revoke',
        '--max-time', '60',
        '-o', outFile,
        '-w', '%{http_code}',
        '-H', 'Accept: ' + accept,
        '-H', 'User-Agent: obsidian-blog-manager',
      ]
      if (token) args.push('-H', 'Authorization: Bearer ' + String(token).replace(/[\r\n]/g, ''))
      if (opts.body != null) {
        args.push('-H', 'Content-Type: application/json')
        args.push('--data-binary', '@-')
      }
      args.push('-X', method, url)

      const r = spawnSync(curl, args, {
        input: opts.body != null ? String(opts.body) : undefined,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 90000,
        windowsHide: true,
      })
      let text = ''
      try {
        text = fsSync.readFileSync(outFile, 'utf8')
      } catch {
        /* 没写出来就是空响应体 */
      }
      try {
        fsSync.rmSync(outFile, { force: true })
      } catch {
        /* 临时文件删不掉不影响结果 */
      }
      const status = parseInt(String(r.stdout || '').trim(), 10)
      if (!Number.isNaN(status) && status > 0) {
        return { ok: status >= 200 && status < 300, status, text, via: 'system-curl' }
      }
      // curl 拿不到 HTTP 状态码（超时/DNS/连接失败）时才回落到 Node fetch
    }

    const res = await fetch(url, {
      method,
      headers: {
        Accept: accept,
        'User-Agent': 'obsidian-blog-manager',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(opts.body != null ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(opts.body != null ? { body: String(opts.body) } : {}),
    })
    const text = await res.text().catch(() => '')
    return { ok: res.ok, status: res.status, text, via: 'node-fetch' }
  }

  /**
   * 把「名字」写入仓库的 Actions 变量 SITE_NAME，让网页标题与管理器一致。
   * 部署工作流里读的是 `vars.SITE_NAME`（.github/workflows/deploy.yml）。
   *
   * 写入变量需要 PAT（仓库变量不能用 Actions 自带的 GITHUB_TOKEN 改），
   * 因此没令牌时返回 { ok:false, reason:'no-token' }，由界面给指引，不算发布失败。
   *
   * 注：网页标题的主通道已经是「site-name.txt 跟着发布推上去」（见 publish()），
   * 这里只是**改名后不重新发布**时的便捷补丁；两条路都走系统通道，互不依赖。
   */
  async function syncSiteNameVariable(repo, name) {
    const slug = repoSlugOf(repo)
    if (!slug) return { ok: false, reason: 'bad-repo' }
    const token = readGithubToken()
    if (!token) return { ok: false, reason: 'no-token' }
    try {
      // 先看变量是否已存在且相同，避免无谓的写请求
      const head = await ghApi(`https://api.github.com/repos/${slug}/actions/variables/SITE_NAME`, { token })
      if (head.ok) {
        try {
          const cur = JSON.parse(head.text)
          if (String(cur.value || '') === String(name)) return { ok: true, unchanged: true, via: head.via }
        } catch {
          /* 响应不是 JSON 就当作需要写入 */
        }
      }
      // 已存在 -> PATCH，不存在 -> POST（404 时走创建）
      const body = JSON.stringify({ name: 'SITE_NAME', value: String(name) })
      let res = await ghApi(`https://api.github.com/repos/${slug}/actions/variables/SITE_NAME`, { method: 'PATCH', token, body })
      if (res.status === 404) {
        res = await ghApi(`https://api.github.com/repos/${slug}/actions/variables`, { method: 'POST', token, body })
      }
      if (res.ok || res.status === 201 || res.status === 204) return { ok: true, via: res.via }
      return { ok: false, reason: 'http-' + res.status, detail: String(res.text || '').slice(0, 200) }
    } catch (e) {
      return { ok: false, reason: 'network', detail: String(e.message || e).slice(0, 200) }
    }
  }

  /**
   * 确保仓库启用了 GitHub Pages（build_type = workflow）。
   *
   * 为什么必须有这一步：新建的仓库默认**没有** Pages，而部署工作流第一步
   * actions/configure-pages 就要向 GitHub 问 Pages site；没启用时它会抛
   * `HttpError: Not Found - .../rest/pages/pages#get-a-apiname-pages-site`，
   * 整个构建直接失败。表现就是「代码推上去了，但网页一直没建起来」。
   *
   * 三种返回：
   *   - already：已启用，什么都不用做
   *   - created：本次刚启用（返回 201）
   *   - failed ：没权限 / 网络问题（reason 里带细节），调用方决定是否提示
   */
  async function ensurePages(repo) {
    const slug = repoSlugOf(repo)
    if (!slug) return { ok: false, reason: 'bad-repo' }
    const token = readGithubToken()
    if (!token) return { ok: false, reason: 'no-token' }
    try {
      const head = await ghApi(`https://api.github.com/repos/${slug}/pages`, { token })
      if (head.ok) return { ok: true, already: true }
      // 404 = 还没启用；其它状态码（401/403/网络）不该在这里尝试创建
      if (head.status !== 404) {
        return { ok: false, reason: 'http-' + head.status, detail: String(head.text || '').slice(0, 200) }
      }
      const body = JSON.stringify({ build_type: 'workflow' })
      const res = await ghApi(`https://api.github.com/repos/${slug}/pages`, { method: 'POST', token, body })
      if (res.ok || res.status === 201) return { ok: true, created: true, via: res.via }
      // 409 = 并发下别人已经建好了，视作成功
      if (res.status === 409) return { ok: true, already: true }
      return { ok: false, reason: 'http-' + res.status, detail: String(res.text || '').slice(0, 200) }
    } catch (e) {
      return { ok: false, reason: 'network', detail: String(e.message || e).slice(0, 200) }
    }
  }

  /**
   * 弹出 Windows 原生「选择文件夹」对话框，返回所选绝对路径（取消返回 null）。
   *
   * 走 Windows PowerShell（不是 pwsh）并带 -STA：FolderBrowserDialog 是 COM 组件，
   * 必须在单线程套间里创建。用户在对话框里停留时间不定，因此限制 5 分钟，
   * 超时就把子进程杀掉，避免 HTTP 请求永远挂着。
   *
   * ⚠️ 中文路径：Windows PowerShell 5.1 的 [Console]::Out 按**系统 ANSI 代码页**
   * （中文 Windows 上是 GBK）输出，而 Node 用 utf8 解码 → 「D:\我的笔记\博客」会变成
   * 「D:\????\??」，中文路径直接选不了。两个办法双保险：
   *   ① 让 PowerShell 先把 OutputEncoding 切成 UTF-8（首选，无临时文件）；
   *   ② 同时把结果写入临时文件（UTF-8 无 BOM），Node 读文件拿准确值。
   * 两者都成功时以文件为准（文件不经过控制台编码，最可靠）。
   */
  function pickFolder(langOfReq = 'zh') {
    const ps = path.join(process.env.WINDIR || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe')
    if (!fsSync.existsSync(ps)) return null
    const outFile = path.join(os.tmpdir(), `mgr-picked-${process.pid}-${Date.now()}.txt`)
    // 用换行拼接，**不要用 '; ' 拼接**：`if (...) {...}` 这类复合语句被分号串成一行时，
    // PowerShell 会报 `ParserError: MissingEndCurlyBrace`，pickFolder() 于是静默返回 null，
    // 界面上表现为「点了选择文件夹没反应、不弹窗」。
    const script = [
      // ① 控制台输出改 UTF-8，避免中文路径被 GBK 破坏
      '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8',
      'Add-Type -AssemblyName System.Windows.Forms | Out-Null',
      '$d = New-Object System.Windows.Forms.FolderBrowserDialog',
      `$d.Description = ${JSON.stringify(sm(langOfReq, 'pickDesc'))}`,
      '$d.ShowNewFolderButton = $false',
      // ⚠️ 只给「托底窗体」$f 设 TopMost 是**没用的**：ShowDialog($f) 弹出的文件夹对话框
      // 是另一个顶层窗口（类名 #32770，属于 shell），不继承 $f 的 TopMost。
      // Edge 全屏时会把对话框整个盖住 —— 对话框其实已创建、Win32 层面 IsWindowVisible
      // 也是 true，但用户完全看不见，界面表现为「点了选择文件夹就卡死」，HTTP 请求一直挂着。
      //
      // 而且要拿到它的句柄也不容易（实测都不可用）：
      //   [System.Diagnostics.Process]::GetCurrentProcess().MainWindowHandle → 0
      //   (Get-Process -Id $PID).MainWindowHandle                          → 0
      //   $d.Handle                                                         → 空
      // 唯一可行：EnumWindows 按「本进程 + 可见 + 类名 #32770」找出来，再 SetWindowPos 置顶。
      '$f = New-Object System.Windows.Forms.Form',
      '$f.TopMost = $true',
      '$f.ShowInTaskbar = $false',
      'Add-Type @"',
      'using System; using System.Text; using System.Runtime.InteropServices;',
      'public class PickWin {',
      '  [DllImport("user32.dll")] public static extern bool EnumWindows(Cb cb, IntPtr p);',
      '  [DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int GetClassName(IntPtr h, StringBuilder s, int n);',
      '  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);',
      '  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);',
      '  [DllImport("user32.dll", SetLastError=true)] public static extern bool SetWindowPos(IntPtr h, IntPtr a, int x,int y,int cx,int cy, uint f);',
      '  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);',
      '  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr h);',
      '  public delegate bool Cb(IntPtr h, IntPtr p);',
      '  public static bool Raise(uint myPid) {',
      '    bool done = false;',
      '    EnumWindows((h, p) => {',
      '      uint pid; GetWindowThreadProcessId(h, out pid);',
      '      if (pid != myPid || !IsWindowVisible(h)) return true;',
      '      var c = new StringBuilder(64); GetClassName(h, c, 64);',
      '      if (c.ToString() != "#32770") return true;',
      '      SetWindowPos(h, (IntPtr)(-1), 0, 0, 0, 0, 0x0003);',
      '      BringWindowToTop(h);',
      '      SetForegroundWindow(h);',
      '      done = true;',
      '      return true;',
      '    }, IntPtr.Zero);',
      '    return done;',
      '  }',
      '}',
      '"@',
      // ShowDialog 是模态阻塞的，只能在它弹出后用定时器把对话框顶到最前；
      // 重试几次是因为 shell 对话框的创建比 ShowDialog 返回要早一点。
      '$timer = New-Object System.Windows.Forms.Timer',
      '$timer.Interval = 200',
      '$tries = 0',
      '$timer.Add_Tick({',
      '  $tries++',
      '  if ($tries -gt 15) { $timer.Stop(); return }',
      '  try {',
      '    if ([PickWin]::Raise([uint32]$PID)) { $timer.Stop() }',
      '  } catch { }',
      '})',
      '$timer.Start()',
      '$ok = ($d.ShowDialog($f) -eq [System.Windows.Forms.DialogResult]::OK)',
      '$timer.Stop()',
      '$timer.Dispose()',
      'if ($ok) {',
      '  $p = $d.SelectedPath',
      `  [System.IO.File]::WriteAllText(${JSON.stringify(outFile)}, $p, (New-Object System.Text.UTF8Encoding($false)))`,
      '  [Console]::Out.Write($p)',
      '}',
      '$f.Dispose()',
    ].join('\n')
    try {
      const r = spawnSync(ps, ['-NoProfile', '-STA', '-Command', script], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 300000,
        windowsHide: true,
      })
      if (r.error) {
        console.log(`[manager] pick folder failed: ${r.error.message}`)
        return null
      }
      // 优先读临时文件（不经控制台编码，中文最稳）
      if (fsSync.existsSync(outFile)) {
        const fromFile = fsSync.readFileSync(outFile, 'utf8').trim()
        if (fromFile) return normalizePickedPath(fromFile)
      }
      const picked = (r.stdout || '').trim()
      return picked ? normalizePickedPath(picked) : null
    } finally {
      try {
        if (fsSync.existsSync(outFile)) fsSync.unlinkSync(outFile)
      } catch {
        /* 清理失败不影响主流程 */
      }
    }
  }

  /**
   * 规整用户选中的路径：
   * - 去掉可能成对出现的引号（有些对话框路径带引号）
   * - 统一成反斜杠（Windows 习惯，也便于后续 path.join）
   * - 去掉末尾多余的斜杠（保留盘符根目录 "C:\"）
   */
  function normalizePickedPath(p) {
    let s = String(p).trim().replace(/^"(.*)"$/, '$1').replace(/\//g, '\\')
    if (s.length > 3 && s.endsWith('\\')) s = s.replace(/\\+$/, '')
    return s
  }

  // ---------- 库扫描 / 公开开关 ----------
  function vaultState(vaultPath) {
    const files = walkFiles(vaultPath, vaultPath)
    const notes = []
    const assetIndex = new Map()
    for (const { rel, abs } of files) {
      if (isMarkdown(rel)) {
        const raw = fsSync.readFileSync(abs, 'utf8')
        let title = basenameTitle(rel)
        let pub = false
        try {
          const m = matter(raw)
          if (typeof m.data.title === 'string' && m.data.title.trim()) title = m.data.title.trim()
          pub = m.data.public === true
        } catch {
          /* frontmatter 异常按私密处理 */
        }
        notes.push({ path: rel, title, isPublic: pub })
      } else if (assetOf(rel)) {
        assetIndex.set(rel, abs)
        const base = rel.split('/').pop()
        if (!assetIndex.has(base)) assetIndex.set(base, rel)
      }
    }
    notes.sort((a, b) => (a.path < b.path ? -1 : 1))
    return { notes, assetIndex }
  }
  const basenameTitle = (rel) => rel.replace(/\.(md|markdown)$/i, '').split('/').pop()

  function setPublic(vaultPath, rel, pub) {
    // path.join 会保留 ../，只 startsWith 比较能被 `../别的库/x.md` 穿越到库外。
    // 先 resolve 再按「目录 + 分隔符」判断，保证目标确实在库内。
    const base = path.resolve(vaultPath)
    const abs = path.resolve(base, rel)
    if (abs !== base && !abs.startsWith(base + path.sep)) throw new Error('errPathEscaped')
    const raw = fsSync.readFileSync(abs, 'utf8')
    // 用 gray-matter 解析/序列化，避免手写字符串匹配漏掉空 frontmatter（---\n---）等边界
    let parsed
    try {
      parsed = matter(raw)
    } catch {
      parsed = { data: {}, content: raw }
    }
    const hadFrontmatter = Object.keys(parsed.data).length > 0
    const data = { ...parsed.data }
    if (pub) data.public = true
    else delete data.public
    // 原本就没有 frontmatter 且要设私密 → 无需改动（注意：原本只有 public 一个键时不能跳过，必须写回）
    if (!pub && !hadFrontmatter) return
    const next = matter.stringify(parsed.content, data)
    if (next !== raw) fsSync.writeFileSync(abs, next)
  }

  // ---------- 变更分类（新增 / 修改 / 删除） ----------
  /**
   * 对比「本地库」与「已发布的内容副本」，把差异分成三类。
   *
   * 判定依据是文件内容本身，不是 git 状态：workdir/content 就是线上正在用的那份内容，
   * 直接比文本最准确，也不受 .gitignore、提交历史、别处 clone 的影响。
   *
   * 三类语义（和界面上的标签一一对应）：
   *   added    本地有、线上没有 → 新增（含还没公开的：新增默认私密，也要能看见并选择公开）
   *   modified 两边都有，但本地公开笔记的正文/frontmatter 变了
   *   deleted  线上有、本地没了（删掉了文件，或者把 public 关掉了）
   *
   * 返回路径都按 vault 的 rel（`/` 分隔），与 notes[].path 同一套写法。
   */
  /**
   * 变更清单的「水位」：上一次发布成功的时刻。
   *
   * 为什么需要：本地有、线上没有的笔记里混着两类完全不同的东西 ——
   *   ① 真·新笔记（刚写、还没发）→ 用户希望在这里看到它，好决定要不要公开；
   *   ② 很久以前就没公开过的私密笔记 → 一直躺在库里，不该每次都被报成「新增」。
   * 光看「线上有没有」分不开这两类，只能看时间：上次发布之后才动过的才算新笔记。
   *
   * 没有记录时（升级后的第一次运行）退回 content/.blog-meta.json 的 mtime ——
   * 这个文件每次发布都会重写，它的 mtime 就是上次发布的时刻，正好当水位用。
   */
  function watermarkOf(workdir, mark) {
    if (mark && Number.isFinite(mark.at)) return mark.at
    try {
      return fsSync.statSync(path.join(workdir, 'content', '.blog-meta.json')).mtimeMs
    } catch {
      return 0
    }
  }

  function diffVault(vaultPath, workdir, mark) {
    const added = []
    const modified = []
    const deleted = []
    if (!workdir) return { added, modified, deleted }
    const contentDir = path.join(workdir, 'content')
    const published = new Map()
    if (fsSync.existsSync(contentDir)) {
      for (const { rel, abs } of walkFiles(contentDir, contentDir)) {
        if (!isMarkdown(rel)) continue
        try {
          published.set(normalize(rel), fsSync.readFileSync(abs, 'utf8'))
        } catch {
          /* 读不到就当没发布过 */
        }
      }
    }
    const since = watermarkOf(workdir, mark)
    // 已经确认过的删除：发布时清掉的、或用户已经知道并选择「不自动删」的，
    // 不该在清单里一直挂着（需求：手动发布后清空，算旧的改动）。
    const acked = new Set(((mark && mark.ackedDeleted) || []).map((r) => normalize(String(r))))
    // 「历史上公开过」的路径集合：只增不减，发布时把当次公开的并进去。
    // 用途见下面 added 分支 —— 判断「本地有、线上没有」到底是新笔记，还是
    // 一篇公开过、后来被关掉的旧笔记。后者不能算新增。
    const everPublished = new Set(((mark && mark.paths) || []).map((r) => normalize(String(r))))
    if (everPublished.size === 0) {
      // 老版本的水位没记 paths：退回内容副本里的时间清单，它的 key 就是
      // 上次发布时公开过的那些路径（升级后第一次运行够用，之后由发布补齐）。
      try {
        const meta = JSON.parse(fsSync.readFileSync(path.join(contentDir, '.blog-meta.json'), 'utf8'))
        const keys = meta && meta.notes && typeof meta.notes === 'object' ? Object.keys(meta.notes) : []
        for (const k of keys) everPublished.add(normalize(k))
      } catch {
        /* 没有就算了 */
      }
    }
    const localRels = new Set()
    for (const n of vaultState(vaultPath).notes) {
      const rel = normalize(n.path)
      localRels.add(rel)
      if (!published.has(rel)) {
        // 本地有、线上没有 —— 两种完全不同的情况，必须分开：
        //   ① 一篇公开过、后来关掉/删掉的旧笔记：它只是下线了，不算「新增」。
        //      这里绝不能只看 mtime：关掉 public 本身就是一次写盘，mtime 必然
        //      晚于水位，于是它会被误报成「新增」（用户实测踩到过）。
        //   ② 真·新笔记（从没公开过）：出现在「新增」里让人决定要不要公开。
        if (!n.isPublic && everPublished.has(rel)) continue
        // 只有「上次发布之后才动过」的才算新增；从没公开过的旧笔记不算（见 watermarkOf）。
        let mt = 0
        try {
          mt = fsSync.statSync(path.join(vaultPath, n.path)).mtimeMs
        } catch {
          mt = 0
        }
        if (since > 0) {
          if (mt <= since) continue
        } else if (!n.isPublic) {
          // 完全没有水位可参考时（第一次运行、且工作副本里没有发布记录）：
          // 没公开过的笔记一律不算新增 —— 否则一装上来就把库里几十篇私密笔记
          // 全列成「新增」，这正是要避免的噪音。真新写的笔记一旦设为公开就会进清单。
          continue
        }
        added.push(n.path)
        continue
      }
      if (!n.isPublic) {
        // 线上有这篇，本地却关掉了 public：下次发布会下线，算删除
        if (!acked.has(rel)) deleted.push(n.path)
        continue
      }
      let cur = ''
      try {
        cur = fsSync.readFileSync(path.join(vaultPath, n.path), 'utf8')
      } catch {
        continue
      }
      if (published.get(rel) !== cur) modified.push(n.path)
    }
    for (const rel of published.keys()) if (!localRels.has(rel) && !acked.has(rel)) deleted.push(rel)
    return { added, modified, deleted }
  }

  // ---------- 自动同步开关 ----------
  // 每类变更各自一个开关，存在本地配置里（不上传、不进仓库）。
  // 默认值按需求定：新增不自动（新笔记默认私密，不替用户做主）、修改自动、删除不自动（下线是不可逆的对外动作）。
  const AUTO_SYNC_DEFAULT = { added: false, modified: true, deleted: false }
  function loadAutoSync() {
    const local = loadLocal()
    const a = local.autoSync && typeof local.autoSync === 'object' ? local.autoSync : {}
    return {
      added: a.added === true,
      modified: a.modified === undefined ? AUTO_SYNC_DEFAULT.modified : a.modified === true,
      deleted: a.deleted === true,
    }
  }
  function saveAutoSync(next) {
    const local = loadLocal()
    local.autoSync = { added: next.added === true, modified: next.modified === true, deleted: next.deleted === true }
    saveLocal(local)
    return local.autoSync
  }

  /**
   * 发布前的网络预检：用很短的超时探一次远端能不能连上。
   *
   * 为什么需要：git push 连不上 GitHub 时要等满 21 秒才失败（系统 TCP 超时），
   * 期间界面一直转圈；而且失败信息会混在同一次发布的其它成功日志中间，
   * 很容易被当成整体成功（真实踩过：用户以为发布了，其实 push 根本没发出去）。
   * 这里先把「连不上」这个最常见的原因单独、快速地判出来，界面就能直接给出
   * 「检查加速器」这句话，而不是让用户对着 21 秒白等。
   *
   * 故意不看端口/超时细节：只要 ls-remote 非零退出且耗时接近上限，就认为是网络不通。
   * 返回 { ok, reason }。
   */
  function preflightRemote(repo) {
    if (!repo) return { ok: true }
    const token = readGithubToken()
    const looksGithub = /github[.]com/i.test(repo)
    const pre = ['-c', 'credential.interactive=false']
    // 同 git()：令牌走环境变量注入，不拼进 argv（argv 会出现在进程列表里）
    const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' }
    if (token && looksGithub) {
      const basic = Buffer.from('x-access-token:' + token).toString('base64')
      env.GIT_CONFIG_COUNT = '1'
      env.GIT_CONFIG_KEY_0 = 'http.extraHeader'
      env.GIT_CONFIG_VALUE_0 = 'Authorization: Basic ' + basic
      // 同 git()：加速器的 MITM 证书会卡在吊销检查，有令牌时跳过（见 git() 注释 ③）
      env.GIT_SSL_NO_VERIFY = '1'
    }
    const started = Date.now()
    const r = spawnSync('git', [...pre, 'ls-remote', '--heads', repo], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 12000,
      windowsHide: true,
      env,
    })
    if (r.status === 0) return { ok: true }
    const detail = ((r.stderr || '') + (r.stdout || '')).trim().slice(0, 300)
    // 区分「连不上」和「连上了但这个仓库不对」：后者不是网络问题，
    // 不能被界面说成「检查加速器」。GitHub 仓库不存在/无权限时回的是
    // "Repository not found"，这类要原样报给用户，别套网络那句话。
    const networkish = /Could not connect|Failed to connect|unable to access|Connection was reset|timed out|Could not resolve|SSL|TLS/i.test(detail)
    return { ok: false, network: networkish, elapsed: Date.now() - started, detail }
  }

  // ---------- 发布（完整同步：新增/修改/删除） ----------
  // async：末尾要用 ensurePages() 调 GitHub API 补启用 Pages，调用方必须 await。
  async function publish(conn, vaultPath, workdir, lang = 'zh', opts = {}) {
    const msg = (key, ...args) => sm(lang, key, ...args)
    const log = []
    // 水位用「开始发布的时刻」，不是结束时刻：发布过程中用户又存了一篇，
    // 那篇应该算作下次的新改动，不能被这次的水位顺手盖掉。
    const startedAt = Date.now()
    // 结构化结果：客户端不该靠「日志里有没有中文/英文关键词」判断成败，
    // 否则换语言就失效。这里额外给出 failed / pushed 两个布尔量。
    // failKind：失败归类，让界面能把「连不上 GitHub」和「其它 git 错误」分开说，
    // 前者是用户自己能解决的（开加速器），后者需要看具体报错。
    let failed = false
    let pushed = false
    let failKind = null
    const content = path.join(workdir, 'content')
    fsSync.mkdirSync(content, { recursive: true })

    const { notes, assetIndex } = vaultState(vaultPath)
    const publicNotes = notes.filter((n) => n.isPublic)
    const keep = new Set()
    // 本地真实时间清单：git 不保存 mtime，CI checkout 后所有笔记的 mtime 都变成
    // 部署时刻（表现为线上每篇日期都一样、排序失效）。发布在用户本机执行，
    // 这里把真实 mtime / birthtime 记进 content/.blog-meta.json 随内容一起提交。
    const noteTimes = {}
    let copied = 0
    let updated = 0

    // 1) 公开笔记 → content/（新增/修改）
    for (const n of publicNotes) {
      const src = path.join(vaultPath, n.path)
      const dst = path.join(content, n.path)
      fsSync.mkdirSync(path.dirname(dst), { recursive: true })
      const same = fsSync.existsSync(dst) && fsSync.readFileSync(dst, 'utf8') === fsSync.readFileSync(src, 'utf8')
      fsSync.copyFileSync(src, dst)
      try {
        const st = fsSync.statSync(src)
        noteTimes[normalize(n.path)] = {
          mtime: st.mtime.toISOString(),
          btime: st.birthtime && st.birthtime.getTime() > 0 ? st.birthtime.toISOString() : null,
        }
      } catch {
        /* 读不到时间就回落到构建端 stat */
      }
      keep.add(normalize(n.path))
      if (!same) updated++
      // 2) 公开笔记引用的附件
      const raw = fsSync.readFileSync(src, 'utf8')
      for (const m of raw.matchAll(/\[\[([^\]|]+?\.(?:png|jpg|jpeg|gif|svg|webp|mp3|mp4|pdf))\]\]/gi)) {
        const ref = m[1].trim()
        const rel = assetIndex.get(ref) || assetIndex.get(ref.split('/').pop()) || null
        if (rel) keep.add(normalize(rel))
      }
      for (const m of raw.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
        try {
          const ref = normalize(decodeURIComponent(m[1]))
          if (assetIndex.has(ref)) keep.add(ref)
        } catch {
          /* 忽略 */
        }
      }
    }

    // 3) 拷贝/更新引用附件
    for (const rel of keep) {
      if (isMarkdown(rel)) continue
      const src = path.join(vaultPath, rel)
      const dst = path.join(content, rel)
      if (!fsSync.existsSync(src)) continue
      fsSync.mkdirSync(path.dirname(dst), { recursive: true })
      const same = fsSync.existsSync(dst) && Buffer.compare(fsSync.readFileSync(dst), fsSync.readFileSync(src)) === 0
      fsSync.copyFileSync(src, dst)
      if (!same) copied++
    }

    // 4) 删除：content/ 里不属于本次公开集合的文件（含本地已删除/已转私密的）
    // opts.skipDelete：自动同步时用户可能把「删除」这一类关掉了 —— 那就只加/改，
    // 不把线上已有内容删掉（下线是对外动作，不该被一个文件事件顺手触发）。
    let removed = 0
    function walkContent(dir) {
      let out = []
      let entries
      try {
        entries = fsSync.readdirSync(dir, { withFileTypes: true })
      } catch {
        return out
      }
      for (const e of entries) {
        const abs = path.join(dir, e.name)
        if (e.isDirectory()) out.push(...walkContent(abs))
        else out.push({ abs, rel: path.relative(content, abs).replace(/\\/g, '/') })
      }
      return out
    }
    for (const { abs, rel } of walkContent(content)) {
      if (keep.has(rel)) continue
      // .blog-meta.json 由本函数自己维护，不属于「不该存在的文件」
      if (rel === '.blog-meta.json') continue
      if (opts.skipDelete) continue
      fsSync.rmSync(abs)
      removed++
    }
    // 清空空目录
    function pruneEmpty(dir) {
      for (const e of fsSync.readdirSync(dir, { withFileTypes: true })) {
        const abs = path.join(dir, e.name)
        if (e.isDirectory()) {
          pruneEmpty(abs)
          try {
            fsSync.rmdirSync(abs)
          } catch {
            /* 非空 */
          }
        }
      }
    }
    pruneEmpty(content)

    // 4.4) 写入本地时间清单（必须在第 4 步清理之后写：它不属于 keep 集合，
    // 写在前面会被「删除不在公开集合里的文件」这一步删掉）。
    try {
      // 自动同步可以「只增改、不删除」（opts.skipDelete），这时 content/ 里会留着
      // 几篇这次没参与的旧笔记；它们的时间清单必须原样保留，否则线上那几篇的日期
      // 会退化成构建机的 mtime（表现为日期突然变成今天、排序全乱）。
      let merged = noteTimes
      const metaFile = path.join(content, '.blog-meta.json')
      if (opts.skipDelete && fsSync.existsSync(metaFile)) {
        try {
          const prev = JSON.parse(fsSync.readFileSync(metaFile, 'utf8'))
          const prevNotes = prev && prev.notes && typeof prev.notes === 'object' ? prev.notes : {}
          merged = { ...prevNotes, ...noteTimes }
          for (const rel of Object.keys(merged)) {
            if (!fsSync.existsSync(path.join(content, rel))) delete merged[rel]
          }
        } catch {
          /* 旧清单坏了就按新的写 */
        }
      }
      fsSync.writeFileSync(
        metaFile,
        JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), notes: merged }, null, 2),
        'utf8'
      )
    } catch (e) {
      log.push(`[meta] 时间清单写入失败：${e.message}`)
    }

    log.push(msg('logPublic', publicNotes.length, updated + copied, removed))

    // 4.5) 把站名写进仓库里的 site-name.txt —— 网页标题（<title> 与左上角）由它决定。
    // 走「写文件 + 随本次提交推送」这条路，不依赖 GitHub 的 Actions 变量接口：
    // 推送这条路一直是通的，所以改名后点发布就能生效，换网络/换机器也一样。
    const siteNameFile = path.join(workdir, 'site-name.txt')
    const wantName = String(conn.name || '').trim()
    const prevName = fsSync.existsSync(siteNameFile) ? fsSync.readFileSync(siteNameFile, 'utf8').trim() : ''
    if (wantName && prevName !== wantName) {
      fsSync.writeFileSync(siteNameFile, wantName + '\n', 'utf8')
      log.push(msg('logSiteName', prevName, wantName))
    }

    // 5) git 提交推送（与「更新源码」共用，见 gitCommitPush）
    const gitRes = await gitCommitPush(conn, workdir, lang, msg('commitMsg') + new Date().toISOString().slice(0, 16).replace('T', ' '), log)
    failed = gitRes.failed
    pushed = gitRes.pushed
    failKind = gitRes.failKind

    // 6) 记下这次发布的水位：之后新写/新改的文件才算新改动，界面的变更清单随之清空。
    // 推送失败时不记 —— 那些改动其实还没上线，得继续留在清单里让人看见。
    // ackedDeleted 取「发布完之后仍然对不上」的删除：删除类自动同步关掉时
    // content/ 里会留着那些文件，它们会被反复报成删除，这里记下来就不再重复提示。
    // paths 是「历史上公开过」的路径并集（只增不减）：用来把「公开过又关掉的旧笔记」
    // 和「真·新笔记」区分开，前者不该被报成新增（见 diffVault 的 added 分支）。
    if (!failed) {
      let ackedDeleted = []
      try {
        ackedDeleted = diffVault(vaultPath, workdir, null).deleted.map((r) => normalize(r))
      } catch {
        ackedDeleted = []
      }
      let paths = []
      try {
        const prev = loadPublishMark(conn.id)
        const set = new Set(((prev && prev.paths) || []).map((r) => normalize(String(r))))
        for (const n of publicNotes) set.add(normalize(n.path))
        paths = [...set]
      } catch {
        paths = publicNotes.map((n) => normalize(n.path))
      }
      try {
        savePublishMark(conn.id, { at: startedAt, ackedDeleted, paths })
      } catch {
        /* 水位写不进去不影响这次发布的结果 */
      }
    }
    return { log, failed, pushed, failKind, commit: gitRes.commit || '' }
  }

  /**
   * 提交并推送工作副本的改动（「发布到 GitHub」与「更新源码」共用这一段）。
   * log 由调用方传入并就地追加；返回结构化成败，界面不该靠日志文字判断结果。
   */
  async function gitCommitPush(conn, workdir, lang, commitMsg, log) {
    const msg = (key, ...args) => sm(lang, key, ...args)
    let failed = false
    let pushed = false
    let failKind = null
    try {
      // 仓库未配置身份时兜底，避免 commit 失败
      try {
        git(['config', 'user.email'], workdir)
      } catch {
        git(['config', 'user.email', 'manager@local'], workdir)
        git(['config', 'user.name', msg('gitUserName')], workdir)
      }
      git(['add', '-A'], workdir)
      const status = git(['status', '--porcelain'], workdir)
      if (!status) {
        log.push(msg('logFresh'))
      } else {
        // 提交信息由调用方给全（发布与更新源码用不同的前缀），这里不再自己拼
        git(['commit', '-m', commitMsg], workdir)
        // 提交已经完成，从此往下任何失败都只是「没推上去」，本地内容都是安全的。
        // 推送前先快速探一次网络：连不上就直接给结论，不浪费用户 21 秒等 TCP 超时。
        const pre = preflightRemote(conn.repo)
        if (!pre.ok) {
          // 只有确定是网络问题才标 network；仓库不存在之类保持原样报错，
          // 免得把「仓库地址填错了」误导成「加速器没开」。
          if (pre.network) failKind = 'network'
          // 原文是 git 的英文输出，中文界面下不能直接显示：归类后换成界面语言的一句话
          // （原文由 localizeRaw 写进控制台，仍可排查）。
          // 标记 localized：这条 message 已经是界面语言，外层 catch 不能再归类一次。
          // （否则英文模式下会把一句完整英文误判成 rawUnknown；
          //   中文之所以没事，是因为 localizeRaw 对含中文的字符串直接原样返回。）
          const le = new Error(localizeRaw(lang, pre.detail || 'unreachable'))
          le.localized = true
          throw le
        }
        // 多电脑/网页端改动：推送前先并入库远端最新，避免 ! [rejected] fetch first
        const branch = conn.branch || 'main'
        // 另一个进程（本地调试入口 / 插件后台）可能刚刚把**同一个提交**推上去，
        // 此时本机再 pull/push 都会被搅（index.lock 冲突、stale info）。
        // 先问一次远端：它已经有我们 HEAD 了，就等于「已经推上去了」，不用再动。
        let alreadyPushed = false
        if (await remoteHasHead(conn, workdir)) {
          alreadyPushed = true
          pushed = true
          log.push(msg('logPushedAlready'))
        }
        if (!alreadyPushed) {
          try {
            git(['pull', '--rebase', '--autostash', '--allow-unrelated-histories', 'origin', branch], workdir)
          } catch (pullErr) {
            try {
              git(['rebase', '--abort'], workdir)
            } catch {
              /* 没有进行中的 rebase */
            }
            // 以前这里吞掉错误继续 push：rebase 半途而废时本地历史可能不完整，
            // 推上去会覆盖远端。现在只有「远端分支本来就不存在」才继续（空仓库首次推送），
            // 其余情况一律中止，把原文报给用户。
            let remoteHas = ''
            try {
              remoteHas = git(['ls-remote', '--heads', 'origin', branch], workdir)
            } catch {
              remoteHas = 'unknown'
            }
            if (remoteHas.trim()) {
              const le = new Error(localizeRaw(lang, String((pullErr && pullErr.message) || pullErr).slice(0, 300)))
              le.localized = true
              throw le
            }
          }
        }
        // push 单独包一层：失败时把原因归类，网络类问题给出可操作的提示
        if (!alreadyPushed) {
          try {
            git(['push', 'origin', 'HEAD'], workdir)
            pushed = true
            log.push(msg('logPushed'))
          } catch (e) {
            const text = String((e && e.message) || e)
            if (/Could not connect|Failed to connect|unable to access|Connection was reset|timed out|SSL/i.test(text)) {
              failKind = 'network'
            }
            // 推送被拒但远端已经有这个提交 = 内容其实已经在线上（典型场景：另一个
            // 管理器进程/另一台电脑刚把同一个提交推上去，或者上一次推送其实成功了、
            // 只是本机没拿到结果）。这时候报「推送失败」是假的 —— 用户会以为没上线，
            // 反复重试。先问一次远端：它已经有这个 SHA 就算成功。
            if (await remoteHasHead(conn, workdir)) {
              pushed = true
              failKind = null
              log.push(msg('logPushedAlready'))
            } else {
              throw e
            }
          }
        }
      }
      // 6) 确保仓库启用了 Pages。
      // 新建的仓库默认没有 Pages，而部署工作流第一步 actions/configure-pages 就要读
      // Pages site，没启用会直接抛 HttpError: Not Found 让整个构建失败——表现就是
      // 「推上去了但网页一直建不出来」。放在这里（而不是建仓库时）是因为：
      //   a) 连接用户自己已有的仓库时也要补这一步；
      //   b) 建仓库那一步可能没有令牌（手动建仓库的路径）。
      // 失败**不算发布失败**：内容已经推上去了，只是自动建站还没就绪，所以只加一行日志。
      if (pushed) {
        const pg = await ensurePages(conn.repo)
        if (pg.ok && pg.created) log.push(msg('logPagesOn'))
        else if (!pg.ok) log.push(msg('logPagesFail') + localizeReason(lang, pg.reason || '') + (lang === 'zh' ? '）' : ')'))
      }
    } catch (e) {
      failed = true
      // 已标记 localized 的异常（preflightRemote 那条）已经是界面语言，直接用；
      // 其余仍是 git 原文，走 localizeRaw 归类（原文会进控制台）。
      const rawMsg = String((e && e.message) || e)
      log.push(msg('logGitFail') + (e && e.localized ? rawMsg : localizeRaw(lang, rawMsg.slice(0, 300))))
    }
    // 本次推上去的提交 SHA：界面拿它去比对线上产物里的 GITHUB_SHA，
    // 精确判断「线上这一版是不是我刚推的」，比按时间猜可靠（不受本机时钟影响）。
    let commit = ''
    try {
      commit = git(['rev-parse', 'HEAD'], workdir).trim()
    } catch {
      /* 拿不到 SHA 只是少了精确判定，不影响发布本身 */
    }
    return { failed, pushed, failKind, commit }
  }

  /**
   * 只把 public/theme.css 提交推上去（「保存并发布外观」用）。
   *
   * 为什么不复用 updateSource()：那个是全量覆盖模板 + git add -A，
   * 会把工作副本里所有未发布的笔记改动一起推上线 —— 用户只是想换个配色，
   * 不该因此把还没想好要不要公开的笔记发出去。
   *
   * 所以这里只 add 一个文件；如果还有别的改动就明确报出来，让用户自己决定
   * 走「发布」（笔记）还是「更新源码」（站点代码），而不是替用户做决定。
   */
  async function publishThemeOnly(conn, workdir, lang, bytes) {
    const msg = (key, ...args) => sm(lang, key, ...args)
    const log = []
    const rel = 'public/theme.css'
    let failed = false
    let pushed = false
    let failKind = null
    try {
      // 仓库未配置身份时兜底（与 gitCommitPush 一致，避免 commit 直接失败）
      try {
        git(['config', 'user.email'], workdir)
      } catch {
        git(['config', 'user.email', 'manager@local'], workdir)
        git(['config', 'user.name', msg('gitUserName')], workdir)
      }
      // 检查「除了 theme.css 之外是否还有未提交的改动」。
      // 有的话不能只 add 一个文件就推：那会让用户以为其它改动也一起上线了。
      const dirty = git(['status', '--porcelain'], workdir)
        .split('\n')
        .map((l) => l.slice(3).trim())
        .filter(Boolean)
        .filter((p) => p !== rel && !p.startsWith('public/theme.css'))
      if (dirty.length > 0) {
        log.push(msg('logThemeOtherDirty', dirty.length))
      }
      git(['add', '--', rel], workdir)
      const staged = git(['diff', '--cached', '--name-only'], workdir).trim()
      if (!staged) {
        log.push(msg('logThemeNoChange'))
      } else {
        git(['commit', '-m', msg('commitThemeMsg')], workdir)
        const pre = preflightRemote(conn.repo)
        if (!pre.ok) {
          if (pre.network) failKind = 'network'
          const le = new Error(localizeRaw(lang, pre.detail || 'unreachable'))
          le.localized = true
          throw le
        }
        const branch = conn.branch || 'main'
        try {
          git(['pull', '--rebase', '--autostash', '--allow-unrelated-histories', 'origin', branch], workdir)
        } catch (pullErr) {
          try {
            git(['rebase', '--abort'], workdir)
          } catch {
            /* 没有进行中的 rebase */
          }
          let remoteHas = ''
          try {
            remoteHas = git(['ls-remote', '--heads', 'origin', branch], workdir)
          } catch {
            remoteHas = 'unknown'
          }
          if (remoteHas.trim()) {
            const le = new Error(localizeRaw(lang, String((pullErr && pullErr.message) || pullErr).slice(0, 300)))
            le.localized = true
            throw le
          }
        }
        try {
          git(['push', 'origin', 'HEAD'], workdir)
        } catch (e) {
          const text = String((e && e.message) || e)
          if (/Could not connect|Failed to connect|unable to access|Connection was reset|timed out|SSL/i.test(text)) {
            failKind = 'network'
          }
          throw e
        }
        pushed = true
        log.push(msg('logThemePushed', bytes))
      }
      if (pushed) {
        const pg = await ensurePages(conn.repo)
        if (pg.ok && pg.created) log.push(msg('logPagesOn'))
        else if (!pg.ok) log.push(msg('logPagesFail') + localizeReason(lang, pg.reason || '') + (lang === 'zh' ? '）' : ')'))
      }
    } catch (e) {
      failed = true
      const rawMsg = String((e && e.message) || e)
      log.push(msg('logGitFail') + (e && e.localized ? rawMsg : localizeRaw(lang, rawMsg.slice(0, 300))))
    }
    let commit = ''
    try {
      commit = git(['rev-parse', 'HEAD'], workdir).trim()
    } catch {
      /* 拿不到 SHA 只是少了精确判定，不影响发布本身 */
    }
    return { failed, pushed, failKind, commit, log }
  }

  /**
   * 「更新源码」：把工具目录里的站点源码（src/、scripts/build-content.mjs、.github/
   * 与顶层配置文件）**全量覆盖**进工作副本，再提交推送，让 GitHub Actions 重新构建。
   *
   * 为什么必须有这个入口：publish() 只把笔记同步进 content/；站点源码只在建连接 /
   * 空仓库时用 initTemplate(workdir, true) 覆盖一次，之后已有仓库走 overwrite=false，
   * 只补缺失文件、绝不覆盖已存在的文件（见 initTemplate 的注释）。所以改完
   * blog-static/src/ 再点「发布」是上不了线的，必须走这里。
   */
  async function updateSource(conn, workdir, lang) {
    const msg = (key, ...args) => sm(lang, key, ...args)
    const log = []
    initTemplate(workdir, true)
    log.push(msg('logSrcSynced'))
    const r = await gitCommitPush(conn, workdir, lang, msg('commitSrcMsg') + new Date().toISOString().slice(0, 16).replace('T', ' '), log)
    return { log, failed: r.failed, pushed: r.pushed, failKind: r.failKind, commit: r.commit || '' }
  }

  // ---------- 服务端文案 ----------
  // 服务端返回的报错与发布日志同样要跟着界面语言走，客户端每次请求都带 x-lang。
  // 这一段在普通服务端作用域（不在 UI 模板字面量内），可以直接用模板字符串。
  // 只翻提示与日志；笔记标题 / 路径 / 仓库名 / 站名一律原样。
  const SMSG = {
    zh: {
      errNeedNameRepo: '名称与仓库地址必填',
      errNoConn: '连接不存在',
      errNeedRepo: '请填写 GitHub 仓库地址',
      errBadVault: '请选择一个有效的库（需包含 .obsidian 目录）',
      errPrepFail: '连接已保存，但仓库准备失败：',
      errFirstConn: '请先创建一个连接，再设置本地库',
      errBadPath: '路径无效：需要包含 .obsidian 目录的库绝对路径',
      errEmptyName: '名字不能为空',
      errNoVault: '本地库未配置',
      errBadVaultPath: '本地库路径无效',
      errWorkdirFail: '工作副本准备失败：',
      errRepoUnreachable: '连不上这个仓库（多半是还没授权、仓库不存在，或本机连不上 GitHub）。',
      errCloneFail: '克隆仓库失败：',
      errTokenShort: '令牌太短，请确认粘贴完整（不含空格）。',
      errTokenRejected: 'GitHub 拒绝了这个令牌（无效、已撤销或权限不足）。',
      errTokenNetwork: '无法连到 GitHub 验证令牌（检查本机网络/加速器）。',
      errNoActive: '没有活动连接',
      errNeedRepoName: '请填写仓库名',
      errBadRepoName: '仓库名只能用英文字母、数字、点、下划线、连字符',
      errNoAuth: '还没有 GitHub 授权。请先按弹窗里的说明完成授权。',
      errRepoExists: (name) => `仓库「${name}」已经存在了。请换一个名字，或切到「我已经有仓库了」直接填它的地址。`,
      errCreateRejected: 'GitHub 拒绝了这次创建：',
      errCheckScope: '请检查令牌是否有 repo 权限',
      errBadAuth: 'GitHub 授权无效或权限不足（需要 repo 权限）。请重新授权后重试。',
      errCreateFail: (status) => `创建失败（HTTP ${status}）：`,
      errConnectFail: '连接 GitHub 失败：',
      errNoDir: '目录已存在且不是 git 仓库：',
      errGitFail: (cmd) => `git ${cmd} 失败`,
      errPathEscaped: '路径越界',
      errForbidden: '拒绝访问：只接受本机页面的请求',
      errPublishing: '正在发布中，请等这次结束再试',
      errPublishingOther: '另一个发布进程（另一窗口的发布器，或本地调试入口）正在推送，请等它结束再试',
      logPublic: (n, c, r) => `公开笔记 ${n} 篇：新增/更新 ${c}，移除过期 ${r}`,
      logSiteName: (prev, want) => `已更新网页标题的站名：${prev ? '「' + prev + '」→ ' : ''}「${want}」`,
      logFresh: '线上已是最新，无需推送',
      logPushed: '已推送 GitHub，Actions 构建中（1~2 分钟后网站自动更新）',
      logPushedAlready: '远端已有这个提交（可能是另一个管理器或上一次推送已经成功），内容已经在线上了',
      logGitFail: 'git 操作失败：',
      logVarOk: (name) => `已把站名「${name}」写入仓库变量 SITE_NAME（下次构建生效）`,
      logVarNoToken: '站名同步跳过：需要 GitHub 授权才能改仓库变量。可设环境变量 GITHUB_TOKEN 后重试，或用 gh 登录。',
      logVarBadRepo: '站名同步跳过：仓库地址不是 GitHub 仓库。',
      logVarFail: (reason, detail) => `站名同步失败（${reason}）：${detail || ''}`,
      logPagesOn: '已为这个仓库启用 GitHub Pages',
      // 注意：这条后面会拼 localizeReason(lang, reason)，所以结尾的「）」由调用方那侧闭合。
      // 写成 '（xxx）' 的整句会让 reason 插到括号外面，句子读不通。
      logPagesFail: '未能自动启用 GitHub Pages（',
      commitMsg: '发布更新 ',
      commitSrcMsg: '更新站点源码 ',
      logSrcSynced: '站点源码已同步到工作副本',
      // ---- 自定义外观 ----
      errThemeType: '外观内容必须是文本（CSS）',
      errThemeTooBig: (bytes, max) => `外观太大（${Math.round(bytes / 1024)}KB），上限 ${Math.round(max / 1024)}KB。请精简后再保存。`,
      logThemeNoChange: '外观没有变化，无需推送',
      logThemePushed: (bytes) => `自定义外观已推送（${Math.round(bytes / 1024) || 1}KB），GitHub Actions 构建中（1~2 分钟后网站自动更新）`,
      logThemeOtherDirty: (n) => `注意：工作副本里还有 ${n} 处其它改动没有提交，本次只推送了外观。要一并上线请点「发布」或「更新源码」。`,
      commitThemeMsg: '更新自定义外观 ',
      gitUserName: '博客发布器',
      pickDesc: '选择你的 Obsidian 库文件夹（里面应有 .obsidian 目录）',
      // ---- 原始错误的本地化分类（git / 网络 / GitHub 响应本身都是英文的）----
      rawNetwork: '连不上 GitHub（多半是加速器没开或掉了，或本机网络不通）',
      rawAuth: 'GitHub 拒绝了这次连接（令牌无效、已过期或权限不足）',
      rawRepoNotFound: 'GitHub 上找不到这个仓库（地址写错、仓库已删除，或令牌无权访问）',
      rawRejected: '远端拒绝了这次推送（远端有本机没有的提交，常见于换台电脑改过）',
      rawFileFail: '本机文件读写失败（文件被占用、路径不存在或没有权限）',
      rawGitFail: 'git 命令执行失败',
      rawUnknown: '操作失败（详细信息已写入管理器控制台）',
      reasonBadRepo: '仓库地址不是 GitHub 仓库',
      reasonNoToken: '缺少 GitHub 授权',
      reasonHttp: (status) => `GitHub 返回 HTTP ${status}`,
      reasonNetwork: '连不上 GitHub',
    },
    en: {
      errNeedNameRepo: 'Name and repo URL are required',
      errNoConn: 'Connection not found',
      errNeedRepo: 'Enter the GitHub repo URL',
      errBadVault: 'Pick a valid vault (it must contain a .obsidian folder)',
      errPrepFail: 'Connection saved, but preparing the repo failed: ',
      errFirstConn: 'Create a connection before setting a vault',
      errBadPath: 'Invalid path: needs an absolute vault path containing a .obsidian folder',
      errEmptyName: 'Name cannot be empty',
      errNoVault: 'No local vault configured',
      errBadVaultPath: 'Invalid local vault path',
      errWorkdirFail: 'Failed to prepare the working copy: ',
      errRepoUnreachable: 'Cannot reach that repo — most likely GitHub is not authorized yet, the repo does not exist, or this machine cannot reach GitHub.',
      errCloneFail: 'Cloning the repo failed: ',
      errTokenShort: 'The token looks too short. Paste it in full, without spaces.',
      errTokenRejected: 'GitHub rejected this token (invalid, revoked, or missing scope).',
      errTokenNetwork: 'Could not reach GitHub to verify the token (check your network / accelerator).',
      errNoActive: 'No active connection',
      errNeedRepoName: 'Enter a repo name',
      errBadRepoName: 'Repo names allow only letters, digits, dot, underscore and hyphen',
      errNoAuth: 'No GitHub authorization yet. Follow the instructions in the dialog first.',
      errRepoExists: (name) => `The repo "${name}" already exists. Pick another name, or paste its URL under “I already have a repo”.`,
      errCreateRejected: 'GitHub rejected the request: ',
      errCheckScope: 'Check that your token has the repo scope',
      errBadAuth: 'GitHub authorization is invalid or lacks the repo scope. Re-authorize and retry.',
      errCreateFail: (status) => `Create failed (HTTP ${status}): `,
      errConnectFail: 'Could not reach GitHub: ',
      errNoDir: 'Directory exists but is not a git repo: ',
      errGitFail: (cmd) => `git ${cmd} failed`,
      errPathEscaped: 'Path escapes the vault',
      errForbidden: 'Forbidden: only local pages may send requests',
      errPublishing: 'A publish is already running. Please wait for it to finish.',
      errPublishingOther: 'Another publisher (another window, or the local dev server) is pushing right now. Wait for it to finish.',
      logPublic: (n, c, r) => `${n} public ${n === 1 ? 'note' : 'notes'}: ${c} added/updated, ${r} stale removed`,
      logSiteName: (prev, want) => `Site title updated: ${prev ? '"' + prev + '" → ' : ''}"${want}"`,
      logFresh: 'Already up to date — nothing to push',
      logPushed: 'Pushed to GitHub — Actions is building (the site updates in 1~2 minutes)',
      logPushedAlready: 'The remote already has this commit (another manager, or an earlier push that did go through) — the content is already online',
      logGitFail: 'git failed: ',
      logVarOk: (name) => `Set the site title "${name}" as the repo variable SITE_NAME (applies on next build)`,
      logVarNoToken: 'Site title sync skipped: changing repo variables needs GitHub authorization. Set GITHUB_TOKEN and retry, or log in with gh.',
      logVarBadRepo: 'Site title sync skipped: this repo is not on GitHub.',
      logVarFail: (reason, detail) => `Site title sync failed (${reason}): ${detail || ''}`,
      logPagesOn: 'Enabled GitHub Pages for this repo',
      logPagesFail: 'Could not enable GitHub Pages automatically (',
      commitMsg: 'Publish update ',
      commitSrcMsg: 'Update site source ',
      logSrcSynced: 'Site source synced to the working copy',
      // ---- Custom appearance ----
      errThemeType: 'Appearance must be text (CSS)',
      errThemeTooBig: (bytes, max) => `Appearance is too large (${Math.round(bytes / 1024)}KB); the limit is ${Math.round(max / 1024)}KB. Trim it and save again.`,
      logThemeNoChange: 'Appearance unchanged — nothing to push',
      logThemePushed: (bytes) => `Custom appearance pushed (${Math.round(bytes / 1024) || 1}KB). GitHub Actions is building — the site updates in 1–2 minutes.`,
      logThemeOtherDirty: (n) => `Note: ${n} other change(s) in the working copy were not committed. Only the appearance was pushed. Use Publish or Update source to ship them.`,
      commitThemeMsg: 'Update custom appearance ',
      gitUserName: 'Publish Manager',
      pickDesc: 'Choose your Obsidian vault folder (it should contain a .obsidian folder)',
      // ---- Localized buckets for raw errors (git / network / GitHub replies are English) ----
      rawNetwork: "Couldn't reach GitHub (the accelerator is probably off or dropped, or this machine has no network)",
      rawAuth: 'GitHub refused this connection (token invalid, expired, or missing scope)',
      rawRepoNotFound: "That repo is not on GitHub (wrong URL, deleted, or your token cannot see it)",
      rawRejected: 'The remote rejected this push (it has commits this machine does not — common after working on another computer)',
      rawFileFail: 'Could not read or write a file on this machine (it is in use, missing, or you lack permission)',
      rawGitFail: 'A git command failed',
      rawUnknown: 'The operation failed (details are in the manager console)',
      reasonBadRepo: 'The repo URL is not a GitHub repo',
      reasonNoToken: 'Missing GitHub authorization',
      reasonHttp: (status) => `GitHub returned HTTP ${status}`,
      reasonNetwork: "Couldn't reach GitHub",
    },
  }
  // 客户端语言：请求头 x-lang，只认 en，其余一律按中文处理。
  const langOf = (req) => (String(req.headers['x-lang'] || '').toLowerCase().startsWith('en') ? 'en' : 'zh')
  function sm(lang, key, ...args) {
    const d = SMSG[lang] || SMSG.zh
    const v = d[key] !== undefined ? d[key] : SMSG.zh[key]
    return typeof v === 'function' ? v(...args) : v
  }
  // 把 git / GitHub 返回的英文原始错误归到少数几类，换成界面语言的一句话。
  // 中文模式下界面不允许出现英文原始报错（m10380）；原文仍写进管理器控制台便于排查。
  // 空输入返回空串：调用方普遍写成「本地化文案 + localizeRaw(...)」，
  // 空串才不会在句尾留下一个孤零零的「操作失败」。
  function localizeRaw(lang, raw) {
    const s = String(raw || '').trim()
    if (!s) return ''
    // 已经是中文就不动它：调用链上游可能已经本地化过一次（preflightRemote 抛的就是中文），
    // 再走下面的英文归类只会把它误判成 rawUnknown 丢掉原话。
    if (/[\u4e00-\u9fff]/.test(s)) return s
    const key = (() => {
      if (/Could not connect|Failed to connect|unable to access|Connection was reset|Could not resolve|timed out|SSL|TLS/i.test(s)) return 'rawNetwork'
      // GitHub 的两种写法都要覆盖：「Permission denied」和「Permission to a/b.git denied to c.」
      if (/Authentication failed|could not read Username|Permission denied|Permission to|denied to|403|401/i.test(s)) return 'rawAuth'
      if (/Repository not found|does not exist|not found/i.test(s)) return 'rawRepoNotFound'
      if (/non-fast-forward|rejected|fetch first/i.test(s)) return 'rawRejected'
      // 本机文件出错（ENOENT/EACCES/EBUSY…）：不是网络问题，要说成文件读写失败，
      // 否则用户会以为又是加速器/令牌的问题。
      if (/^E[A-Z]{3,}:/i.test(s)) return 'rawFileFail'
      if (/^git |git failed|fatal:/i.test(s)) return 'rawGitFail'
      return 'rawUnknown'
    })()
    console.error('[manager][raw] ' + s)
    return sm(lang, key)
  }
  // syncSiteNameVariable / ensurePages 的 reason 是英文代码，同样换成界面语言。
  function localizeReason(lang, reason) {
    const r = String(reason || '')
    if (r === 'no-token') return sm(lang, 'reasonNoToken')
    if (r === 'bad-repo') return sm(lang, 'reasonBadRepo')
    if (r === 'network') return sm(lang, 'reasonNetwork')
    const m = r.match(/^http-(\d+)$/)
    if (m) return sm(lang, 'reasonHttp', m[1])
    return r
  }

  // ---------- HTTP ----------


  // ---------- 路由 ----------
  const LOOPBACK = /^(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/i
  /** 发布互斥：同一时刻只允许一次发布在跑（防连点导致 index.lock 冲突） */
  let PUBLISHING = false

  /**
   * 状态版本号：任何会改动「笔记公开状态 / 变更清单 / 流水」的操作都 +1。
   *
   * 为什么需要：管理器界面和 Obsidian 文件树上的开关是两套 DOM，各拉各的
   * `/api/state`（一份要扫 117 个文件、算 diff，几百毫秒）。原来两边都是 8 秒
   * 轮询全量状态，于是在一边点开关，另一边最多要等 8 秒才变 —— 用户看到的就是
   * 「点了没反应 / 两边不同步」。
   * 现在两边改为每 1.2 秒只问这个极轻的版本号，变了才去拉全量状态。
   */
  let STATE_REV = 1
  const bumpRev = () => { STATE_REV += 1; return STATE_REV }
  function localWriteAllowed(req) {
    if (!LOOPBACK.test(String(req.headers.host || ''))) return false
    const origin = String(req.headers.origin || '')
    if (origin) {
      let ok = false
      try {
        ok = LOOPBACK.test(new URL(origin).host)
      } catch {
        ok = false
      }
      if (!ok) return false
    }
    const ct = String(req.headers['content-type'] || '')
    if (ct && !/^application\/json\b/i.test(ct)) return false
    return true
  }

  function json(res, code, body) {
    res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(body))
  }


  const server = http.createServer(async (req, res) => {
    const url = req.url.split('?')[0]
    let body = ''
    if (req.method === 'POST') for await (const c of req) body += c

    // 只允许「本机页面」发起写操作。
    // 管理器只监听 127.0.0.1，但**任何**本机网页都能向它发请求：跨站表单用
    // text/plain / x-www-form-urlencoded 提交不需要预检，就能驱动 /api/publish、
    // /api/toggle、/api/auth/token。这里从三处堵：
    //   ① Host 必须是回环地址（挡 DNS rebinding：攻击者域名解析到 127.0.0.1）；
    //   ② 带了 Origin 就必须是回环来源；
    //   ③ 带了 Content-Type 就必须是 application/json（表单类无法伪造）。
    if (req.method === 'POST' && !localWriteAllowed(req)) {
      json(res, 403, { error: sm(langOf(req), 'errForbidden') })
      return
    }

    try {
      if (req.method === 'GET' && (url === '/' || url.startsWith('/?'))) {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        // 预设外观随页面下发：ui-template.mjs 整体是模板字面量，不能直接插值，
        // 所以留了 __THEME_PRESETS__ 占位，在这里换成真实数据。
        // 用 JSON.parse 前的 JSON.stringify 包一层再替换，避免内容里的 $& 之类
        // 被 String.replace 当成替换模式吃掉。
        res.end(
          UI.replace('"__THEME_PRESETS__"', () => JSON.stringify(THEME_PRESETS))
            .replace('"__THEME_PREVIEW_IDS__"', () => JSON.stringify(Object.keys(THEME_PREVIEWS)))
            .replace('"__THEME_PREVIEW_VER__"', () => JSON.stringify(THEME_PREVIEW_VERSION))
        )
        return
      }
      // 主题预览图：内嵌的 base64 PNG 直接吐出去。
      // 为什么不放 public/：管理器是打包进插件 worker.js 运行的，装到
      // .obsidian/plugins 之后磁盘上没有「静态资源目录」可言，内嵌最省事。
      // 图是通用示例内容（站名「示例博客」），不含任何真实个人信息。
      const mPv = /^\/preset-preview\/([\w-]+)\.png$/.exec(url)
      if (req.method === 'GET' && mPv) {
        const b64 = THEME_PREVIEWS[mPv[1]]
        if (!b64) {
          res.writeHead(404)
          res.end()
          return
        }
        const buf = Buffer.from(b64, 'base64')
        res.writeHead(200, {
          'content-type': 'image/png',
          'content-length': buf.length,
          // 预览图跟着插件版本走，一个版本内不会变，可以放心让浏览器缓存
          'cache-control': 'public, max-age=86400',
        })
        res.end(buf)
        return
      }
      const { connections, conn, vaultPath, workdir, local } = activeConfig()

      // 极轻的版本号探针：只回一个数字，不扫库、不算 diff。
      // 管理器界面与 Obsidian 文件树都靠它做到「一边点开关，另一边立刻跟着变」。
      if (req.method === 'GET' && url === '/api/rev') {
        res.writeHead(200, {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
        })
        res.end(JSON.stringify({ rev: STATE_REV }))
        return
      }

      if (req.method === 'GET' && url === '/api/state') {
        let vaultOk = false
        let notes = []
        let changes = { added: [], modified: [], deleted: [] }
        if (conn && validVault(vaultPath)) {
          vaultOk = true
          notes = vaultState(vaultPath).notes
          // workdir 还没准备好（没 clone 过）时不比对，避免把所有笔记都报成「新增」
          if (workdir && fsSync.existsSync(path.join(workdir, 'content'))) {
            // 现算差集 → 并进「日志」：自动同步发布不会清空，只有手动发布才清空
            changes = recordChanges(conn.id, diffVault(vaultPath, workdir, loadPublishMark(conn.id)))
          }
        }
        // 每条连接带上自己的库状态，供多库切换卡片显示（未选中的库也要能看到是否有笔记）
        const list = connections.map((c) => {
          const vp = local.vaultPaths?.[c.id] ?? ''
          const ok = validVault(vp)
          return {
            id: c.id,
            name: c.name,
            repo: c.repo,
            branch: c.branch,
            siteUrl: siteUrlOf(c.repo),
            vaultPath: vp,
            vaultOk: ok,
            noteCount: ok ? vaultState(vp).notes.length : 0,
            publicCount: ok ? vaultState(vp).notes.filter((n) => n.isPublic).length : 0,
          }
        })
        json(res, 200, {
          rev: STATE_REV,
          connections: list,
          active: conn ? conn.id : null,
          vaultPath,
          vaultOk,
          notes,
          changes,
          autoSync: loadAutoSync(),
          autoLog: conn ? loadAutoLog(conn.id) : [],
        })
        return
      }

      if (req.method === 'POST' && url === '/api/autosync') {
        const { type, value } = JSON.parse(body)
        if (!['added', 'modified', 'deleted'].includes(type)) return json(res, 400, { error: 'badType' })
        const cur = loadAutoSync()
        cur[type] = value === true
        const saved = saveAutoSync(cur)
        // 开关变了，按新规则重挂监听（比如「新增」打开后要能立刻接管接下来的文件变化）
        restartWatcher()
        bumpRev()
        json(res, 200, { autoSync: saved })
        return
      }

      if (req.method === 'POST' && url === '/api/autolog/clear') {
        const c = activeConfig().conn
        if (!c) return json(res, 400, { error: 'noConn' })
        try {
          clearAutoLog(c.id)
        } catch (e) {
          return json(res, 500, { error: String((e && e.message) || e) })
        }
        json(res, 200, { ok: true, autoLog: [] })
        return
      }

      if (req.method === 'POST' && url === '/api/connection/create') {
        const { name, repo, branch, initFromTemplate } = JSON.parse(body)
        // trim 之后为空的连接名不能存进去（原来只判了 null/undefined）
        const cleanName = String(name ?? '').trim()
        const cleanRepo = String(repo ?? '').trim()
        if (!cleanName || !cleanRepo) return json(res, 400, { error: sm(langOf(req), 'errNeedNameRepo') })
        const id = 'c' + Date.now().toString(36)
        const conn = { id, name: cleanName, repo: cleanRepo, branch: (branch || 'main').trim() || 'main' }
        connections.push(conn)
        saveConnections(connections)
        const local = loadLocal()
        local.active = id
        saveLocal(local)
        if (initFromTemplate) {
          // 远端已有历史就 clone（换电脑/已有站点不丢提交），空仓库才用模板初始化
          const prep = prepareWorkdir(conn, true)
          // 原来忽略返回值：远端连不上时照样返回 ok，用户得到一个永远发布不了的连接
          if (prep && (prep.errKey || prep.error)) {
            return json(res, 400, {
              ok: false,
              error: sm(langOf(req), prep.errKey || 'errCloneFail'),
              needAuth: prep.errKey === 'errRepoUnreachable',
            })
          }
        }
        json(res, 200, { ok: true, id })
        return
      }

      if (req.method === 'POST' && url === '/api/connection/switch') {
        const { id } = JSON.parse(body)
        const local = loadLocal()
        if (!connections.find((c) => c.id === id)) return json(res, 404, { error: sm(langOf(req), 'errNoConn') })
        local.active = id
        saveLocal(local)
        json(res, 200, { ok: true })
        return
      }

      // 原生「选择文件夹」对话框（仅本机可用）。用户不必手打路径。
      if (req.method === 'POST' && url === '/api/browse') {
        const picked = pickFolder(langOf(req))
        json(res, 200, { path: picked })
        return
      }

      // 一步式：一个本地库 + 一个 GitHub 仓库 = 一条连接。校验通过才落盘。
      if (req.method === 'POST' && url === '/api/connection/setup') {
        const { name, repo, branch, vaultPath: vp, initFromTemplate } = JSON.parse(body)
        if (!repo || !String(repo).trim()) return json(res, 400, { error: sm(langOf(req), 'errNeedRepo') })
        if (!validVault(vp)) return json(res, 400, { error: sm(langOf(req), 'errBadVault') })
        const b = (branch || 'main').trim() || 'main'
        const id = 'c' + Date.now().toString(36)
        const c = { id, name: (name || path.basename(vp) || '我的博客').trim(), repo: String(repo).trim(), branch: b }
        // 先把仓库准备好，再落盘连接：远端连不上（未授权 / 仓库不存在 / 断网）时直接拒绝，
        // 不要留下「连接建好了但永远发布不了」的半成品 —— 那正是新机器上最容易踩的坑。
        let prep = null
        if (initFromTemplate) {
          prep = prepareWorkdir(c, true)
          if (prep.errKey) {
            // errKey 本身已经是完整的一句中文/英文（"连不上这个仓库（多半是还没授权、
            // 仓库不存在，或本机连不上 GitHub）"），再拼 git 原始英文只会又臭又长，
            // 所以这里只给本地化后的那一句；原文由 localizeRaw 写进控制台便于排查。
            // errNoDir 那条的 errArg 是本机路径（不是 git 报错），路径本身不需要翻译
            const extra = prep.errArg && prep.errKey === 'errNoDir' ? String(prep.errArg).slice(0, 160) : ''
            console.error('[manager][raw] ' + String(prep.errArg || ''))
            return json(res, 400, {
              error: sm(langOf(req), prep.errKey) + extra,
              needAuth: prep.errKey === 'errRepoUnreachable',
            })
          }
        }
        connections.push(c)
        saveConnections(connections)
        const loc = loadLocal()
        loc.vaultPaths = loc.vaultPaths || {}
        loc.vaultPaths[id] = path.normalize(vp)
        loc.active = id
        saveLocal(loc)
        let warn = null
        if (prep && prep.initialized) {
          // 空仓库已用模板初始化：第一次发布时要能把内容推上去，
          // 这一步失败不算连接失败（点发布还会再试一次），只提示。
          warn = null
        }
        json(res, 200, { ok: true, id, warn })
        return
      }

      // 删除连接（只从清单移除，不碰远端仓库，也不删本地 Obsidian 库）
      if (req.method === 'POST' && url === '/api/connection/remove') {
        const { id } = JSON.parse(body)
        const idx = connections.findIndex((c) => c.id === id)
        if (idx < 0) return json(res, 404, { error: sm(langOf(req), 'errNoConn') })
        const [removedConn] = connections.splice(idx, 1)
        saveConnections(connections)
        const loc = loadLocal()
        if (loc.vaultPaths) delete loc.vaultPaths[id]
        if (loc.active === id) loc.active = connections[0]?.id ?? null
        saveLocal(loc)
        // 工作副本是本工具自己生成的中间产物，可以安全清掉（不影响 GitHub 与本地库）
        try {
          fsSync.rmSync(path.join(DATA_DIR, 'repos', id), { recursive: true, force: true })
        } catch {
          /* 副本删除失败不影响连接已移除 */
        }
        json(res, 200, { ok: true, removed: removedConn.name })
        return
      }

      if (req.method === 'POST' && url === '/api/connection/vault') {
        const { vaultPath: vp, id } = JSON.parse(body)
        // 允许指定连接（设置抽屉里可能改的不是当前活动连接）
        const target = id ? connections.find((c) => c.id === id) : conn
        if (!target) return json(res, 400, { error: sm(langOf(req), 'errFirstConn') })
        if (!validVault(vp)) return json(res, 400, { error: sm(langOf(req), 'errBadPath') })
        const local = loadLocal()
        local.vaultPaths = local.vaultPaths || {}
        local.vaultPaths[target.id] = path.normalize(vp)
        saveLocal(local)
        json(res, 200, { ok: true })
        return
      }

      if (req.method === 'POST' && url === '/api/connection/rename') {
        const { id, name } = JSON.parse(body)
        const target = connections.find((c) => c.id === id)
        if (!target) return json(res, 404, { error: sm(langOf(req), 'errNoConn') })
        if (!name || !String(name).trim()) return json(res, 400, { error: sm(langOf(req), 'errEmptyName') })
        target.name = String(name).trim()
        saveConnections(connections)
        json(res, 200, { ok: true })
        return
      }

      if (req.method === 'POST' && url === '/api/toggle') {
        const { path: p, pub } = JSON.parse(body)
        if (!validVault(vaultPath)) return json(res, 400, { error: sm(langOf(req), 'errNoVault') })
        setPublic(vaultPath, p, !!pub)
        // 版本号一变，另一侧（Obsidian 文件树 / 管理器界面）1.2 秒内就会重拉状态
        bumpRev()
        json(res, 200, { ok: true, rev: STATE_REV })
        return
      }

      if (req.method === 'POST' && url === '/api/publish') {
        if (!conn) return json(res, 400, { error: sm(langOf(req), 'errNoActive') })
        if (!validVault(vaultPath)) return json(res, 400, { error: sm(langOf(req), 'errBadVaultPath') })
        // 发布互斥：连点两下「发布」会并发跑两套 git add/commit/push，
        // 抢 .git/index.lock，甚至把两次提交交叉写入。这里直接拒绝第二次。
        if (PUBLISHING) {
          return json(res, 409, { error: sm(langOf(req), 'errPublishing'), busy: true })
        }
        // 跨进程互斥：另一个发布进程（本地调试入口 / 插件后台）可能正在
        // 同一个工作副本上推送。以前这里只挡进程内的连点，挡不住另一个进程，
        // 结果两边同时提交 —— 一个成功、一个「推送失败」，界面上完全误导。
        const lk = acquireLock('publish-' + conn.id)
        if (!lk.ok) {
          return json(res, 409, { error: sm(langOf(req), 'errPublishingOther'), busy: true })
        }
        PUBLISHING = true
        try {
          const wd = ensureWorkdir(conn)
          if (wd.error) {
            return json(res, 500, { error: sm(langOf(req), 'errWorkdirFail') + localizeRaw(langOf(req), wd.error) })
          }
          if (wd.errKey) {
            return json(res, 500, {
              error: sm(langOf(req), 'errWorkdirFail') + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
              needAuth: wd.errKey === 'errRepoUnreachable',
            })
          }
          const r = await publish(conn, vaultPath, wd.workdir, langOf(req))
          const log = r.log
          const publishFailed = r.failed
          const publishPushed = r.pushed
          // 手动发布成功 → 变更清单（日志）清空，算「旧的改动」。
          // 自动同步走的是 autoSyncTick，不经过这里，所以它不会清空清单。
          if (!publishFailed) {
            try {
              clearChangeLog(conn.id)
            } catch {
              /* 清不掉不影响发布结果 */
            }
          }
          bumpRev()
          // 让网页左上角标题与这里的「名字」一致：把名字写进仓库的 Actions 变量 SITE_NAME。
          // 写变量需要自己的授权，失败不算发布失败，只提示怎么补。
          const sn = await syncSiteNameVariable(conn.repo, conn.name)
          if (sn.ok) {
            if (!sn.unchanged) log.push(sm(langOf(req), 'logVarOk', conn.name))
          } else if (sn.reason === 'no-token') {
            log.push(sm(langOf(req), 'logVarNoToken'))
          } else if (sn.reason === 'bad-repo') {
            log.push(sm(langOf(req), 'logVarBadRepo'))
          } else {
            // reason 是英文代码（no-token / bad-repo / http-404 / network），detail 是 GitHub 响应原文
            log.push(sm(langOf(req), 'logVarFail', localizeReason(langOf(req), sn.reason), localizeRaw(langOf(req), sn.detail)))
          }
          json(res, 200, {
            log,
            siteUrl: siteUrlOf(conn.repo),
            failed: publishFailed,
            pushed: publishPushed,
            // 本次推送的提交 SHA，界面用它判断线上是否已经是这一版
            commit: r.commit || '',
            // 失败归类：'network' 表示没连上 GitHub（用户自己开加速器就能解决）。
            // 界面据此把「没推上去」说成人话，而不是丢一段 fatal: unable to access... 给用户猜。
            failKind: r.failKind || null,
          })
        } finally {
          PUBLISHING = false
          lk.release()
        }
        return
      }

      // 发布之后「线上到底什么时候生效」：push → Actions 构建 → 部署，通常 40~90 秒。
      // 界面轮询这里，把这段等待变成可见的进度，而不是让用户反复刷新去猜。
      // 判定依据：线上 index.json 里的 generatedAt（构建时刻）晚于本次发布开始时刻，
      // 说明新构建已经部署上去了。加时间戳参数是为了绕开 Pages 的 max-age=600 边缘缓存。
      if (req.method === 'GET' && url === '/api/live') {
        const target = conn ? siteUrlOf(conn.repo) : null
        if (!target) return json(res, 400, { error: 'noSite' })
        const q = new URL(req.url, 'http://127.0.0.1').searchParams
        const since = Number(q.get('since') || 0) || 0
        const wantSha = String(q.get('sha') || '').trim()
        json(res, 200, { siteUrl: target, ...(await probeLiveSite(target, since, wantSha)) })
        return
      }

      // 「更新源码」：把工具目录里改过的站点源码全量覆盖进工作副本并推送。
      // 与 /api/publish 的分工：publish 同步的是笔记（content/），这里同步的是站点本身
      // （src/、scripts/build-content.mjs、.github/ 与顶层配置）。改完 blog-static/src/
      // 后必须走这里，否则线上永远不会变（原因见 updateSource 的注释）。
      if (req.method === 'POST' && url === '/api/update-source') {
        if (!conn) return json(res, 400, { error: sm(langOf(req), 'errNoActive') })
        const wd = ensureWorkdir(conn)
        if (wd.error) {
          return json(res, 500, { error: sm(langOf(req), 'errWorkdirFail') + localizeRaw(langOf(req), wd.error) })
        }
        if (wd.errKey) {
          return json(res, 500, {
            error: sm(langOf(req), 'errWorkdirFail') + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
            needAuth: wd.errKey === 'errRepoUnreachable',
          })
        }
        // 更新源码同样要跨进程互斥：它也是「全量覆盖 + git add -A + commit + push」，
        // 和自动同步撞上就会互相踩（一个推上去、另一个报失败）。
        const lkSrc = acquireLock('publish-' + conn.id)
        if (!lkSrc.ok) {
          return json(res, 409, { error: sm(langOf(req), 'errPublishingOther'), busy: true })
        }
        let r
        try {
          r = await updateSource(conn, wd.workdir, langOf(req))
        } finally {
          lkSrc.release()
        }
        json(res, 200, { log: r.log, failed: r.failed, pushed: r.pushed, failKind: r.failKind || null, commit: r.commit || '' })
        return
      }

      // 自定义外观：读 / 存库主人粘贴的 CSS（存进仓库的 public/theme.css）。
      // GET 时带上文件大小与上限，界面可以提前提示「太大了」；
      // 顺带给出站点是否已经就绪，没就绪时前端禁用「保存并发布」而不是让用户白等。
      if (req.method === 'GET' && url === '/api/theme') {
        const css = readThemeCss(workdir)
        json(res, 200, {
          css,
          bytes: Buffer.byteLength(css, 'utf8'),
          maxBytes: THEME_MAX_BYTES,
          hasWorkdir: !!workdir && fsSync.existsSync(workdir),
        })
        return
      }

      if (req.method === 'POST' && url === '/api/theme') {
        if (!conn) return json(res, 400, { error: sm(langOf(req), 'errNoActive') })
        const { css } = JSON.parse(body)
        if (typeof css !== 'string') return json(res, 400, { error: sm(langOf(req), 'errThemeType') })
        const bytes = Buffer.byteLength(css, 'utf8')
        if (bytes > THEME_MAX_BYTES) {
          return json(res, 400, { error: sm(langOf(req), 'errThemeTooBig', bytes, THEME_MAX_BYTES) })
        }
        const wd = ensureWorkdir(conn)
        if (wd.error) {
          return json(res, 500, { error: sm(langOf(req), 'errWorkdirFail') + localizeRaw(langOf(req), wd.error) })
        }
        if (wd.errKey) {
          return json(res, 500, {
            error: sm(langOf(req), 'errWorkdirFail') + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
            needAuth: wd.errKey === 'errRepoUnreachable',
          })
        }
        const r = writeThemeCss(wd.workdir, css)
        bumpRev()
        json(res, 200, { ok: true, bytes: r.bytes, removed: r.removed })
        return
      }

      // 保存外观并立刻提交推送，让 CI 重新构建（等价于「保存」+「更新源码」）。
      // 单独做一条路径而不是让界面连打两个接口：中间失败时状态是可见的
      // （文件已写、但没推上去），比界面自己编排更容易说清。
      if (req.method === 'POST' && url === '/api/theme/publish') {
        if (!conn) return json(res, 400, { error: sm(langOf(req), 'errNoActive') })
        const { css } = JSON.parse(body)
        if (typeof css !== 'string') return json(res, 400, { error: sm(langOf(req), 'errThemeType') })
        const bytes = Buffer.byteLength(css, 'utf8')
        if (bytes > THEME_MAX_BYTES) {
          return json(res, 400, { error: sm(langOf(req), 'errThemeTooBig', bytes, THEME_MAX_BYTES) })
        }
        const wd = ensureWorkdir(conn)
        if (wd.error) {
          return json(res, 500, { error: sm(langOf(req), 'errWorkdirFail') + localizeRaw(langOf(req), wd.error) })
        }
        if (wd.errKey) {
          return json(res, 500, {
            error: sm(langOf(req), 'errWorkdirFail') + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
            needAuth: wd.errKey === 'errRepoUnreachable',
          })
        }
        const w = writeThemeCss(wd.workdir, css)
        bumpRev()
        // 只推 theme.css：这里不该顺带把笔记也发出去（用户可能还没准备好公开某些笔记）。
        // 但 git add -A 会把工作副本里已有的其它改动一起带上，所以先确认
        // 「除了 theme.css 之外没有别的改动」，有就让用户走「发布」或「更新源码」。
        const lkT = acquireLock('publish-' + conn.id)
        if (!lkT.ok) {
          // 文件已经写进工作副本了（下次保存/发布自然带上），只是这次没推出去
          return json(res, 409, { error: sm(langOf(req), 'errPublishingOther'), busy: true, bytes: w.bytes })
        }
        let r
        try {
          r = await publishThemeOnly(conn, wd.workdir, langOf(req), w.bytes)
        } finally {
          lkT.release()
        }
        json(res, 200, {
          ok: !r.failed,
          bytes: w.bytes,
          removed: w.removed,
          failed: r.failed,
          pushed: r.pushed,
          failKind: r.failKind || null,
          commit: r.commit || '',
          log: r.log,
        })
        return
      }

      // 在 GitHub 上替用户新建仓库（需要一次授权，见 /api/auth/status）
      if (req.method === 'POST' && url === '/api/repo/create') {
        const { repoName, private: wantPrivate } = JSON.parse(body)
        const name = String(repoName || '').trim()
        if (!name) return json(res, 400, { error: sm(langOf(req), 'errNeedRepoName') })
        if (!/^[A-Za-z0-9._-]+$/.test(name)) {
          return json(res, 400, { error: sm(langOf(req), 'errBadRepoName') })
        }
        const token = readGithubToken()
        if (!token) return json(res, 401, { error: sm(langOf(req), 'errNoAuth') })
        try {
          const r = await ghApi('https://api.github.com/user/repos', {
            method: 'POST',
            token,
            body: JSON.stringify({
              name,
              private: !!wantPrivate,
              auto_init: false,
              // 仓库描述是写给 GitHub 仓库页面看的（不是界面文案），保持简洁英文
              description: 'A static blog generated from Obsidian notes',
            }),
          })
          let data = {}
          try {
            data = JSON.parse(r.text)
          } catch {
            /* 非 JSON 响应，下面按状态码给提示 */
          }
          if (r.status === 201 && data.clone_url) {
            // 新仓库默认没有 Pages，而部署工作流第一步就要读 Pages site，没启用会
            // 直接失败（HttpError: Not Found）。这里顺手启用，失败不影响建仓库本身。
            let pagesUrl = null
            try {
              const pg = await ensurePages(data.clone_url)
              if (pg.ok) pagesUrl = `https://${data.owner.login}.github.io/${data.name}/`
            } catch {
              /* 忽略：publish() 里还会再试一次 */
            }
            return json(res, 200, { repo: data.clone_url, htmlUrl: data.html_url, name: data.name, pagesUrl })
          }
          if (r.status === 422) {
            // 最常见的两种：重名 / 令牌缺 repo 权限
            const msg = String(data.message || '')
            if (/already exists/i.test(msg)) {
              return json(res, 409, { error: sm(langOf(req), 'errRepoExists', name) })
            }
            return json(res, 400, { error: sm(langOf(req), 'errCreateRejected') + (msg ? localizeRaw(langOf(req), msg) : sm(langOf(req), 'errCheckScope')) })
          }
          if (r.status === 401 || r.status === 403) {
            return json(res, 401, { error: sm(langOf(req), 'errBadAuth') })
          }
          return json(res, 500, { error: sm(langOf(req), 'errCreateFail', r.status) + localizeRaw(langOf(req), String(data.message || '').slice(0, 200)) })
        } catch (e) {
          return json(res, 500, { error: sm(langOf(req), 'errConnectFail') + localizeRaw(langOf(req), String(e.message || e).slice(0, 200)) })
        }
      }

      // 单独同步站名（设置抽屉里改完名字、不想重新发布时用）
      if (req.method === 'POST' && url === '/api/sync-site-name') {
        if (!conn) return json(res, 400, { error: sm(langOf(req), 'errNoActive') })
        const sn = await syncSiteNameVariable(conn.repo, conn.name)
        if (sn.ok) return json(res, 200, { ok: true, unchanged: !!sn.unchanged, name: conn.name })
        return json(res, 200, { ok: false, reason: sn.reason, detail: sn.detail || '', name: conn.name })
      }

      // 保存/清除用户粘贴的 GitHub 令牌（写 local.json：仅本机、不入库、不参与发布）。
      // 存之前先向 GitHub 验一次，避免把一个打错的/已撤销的令牌存下来——
      // 那会让后面每次 git 操作都 401，比"没有令牌"更难排查。
      if (req.method === 'POST' && url === '/api/auth/token') {
        const { token } = JSON.parse(body)
        const t = String(token || '').trim()
        if (!t) {
          saveGithubToken('')
          return json(res, 200, { ok: true, cleared: true })
        }
        if (t.length < 20) return json(res, 400, { error: sm(langOf(req), 'errTokenShort') })
        const r = await ghApi('https://api.github.com/user', { token: t })
        if (!r.ok) {
          if (r.status === 401 || r.status === 403) return json(res, 401, { error: sm(langOf(req), 'errTokenRejected') })
          return json(res, 502, { error: sm(langOf(req), 'errTokenNetwork') })
        }
        let login = null
        try { login = JSON.parse(r.text).login || null } catch { /* 忽略 */ }
        saveGithubToken(t)
        return json(res, 200, { ok: true, login })
      }

      // 本机是否已有 GitHub 授权（界面据此决定「一键新建仓库」可直接用还是先给指引）
      if (req.method === 'GET' && url === '/api/auth/status') {
        const token = readGithubToken()
        let login = null
        let reachable = null
        if (token) {
          try {
            const r = await ghApi('https://api.github.com/user', { token })
            if (r.ok) {
              login = JSON.parse(r.text).login || null
              reachable = true
            } else {
              // 令牌被 GitHub 拒了（401/403）：不是网络问题，界面要能区分这两种情况
              reachable = r.status !== 0
            }
          } catch {
            // 网络层彻底失败：令牌可能有效，但这台机器当前连不上 GitHub
            reachable = false
          }
        }
        return json(res, 200, { token: !!token, login, reachable })
      }

      res.writeHead(404)
      res.end()
    } catch (e) {
      // 已知的键走对应语言的文案；其余（git/网络原始信息）不能再原样透出——
      // 中文模式下界面里出现一段英文 fatal: 是不可接受的（m10380），
      // 所以统一交给 localizeRaw 归类，原文由它写进控制台便于排查。
      const raw = String(e.message || e).slice(0, 300)
      const known = SMSG.zh[raw]
      json(res, 500, { error: known !== undefined ? sm(langOf(req), raw) : localizeRaw(langOf(req), raw) })
    }
  })






  // ---------- 自动同步（文件变化 → 自动发布） ----------
  // 监听当前库的目录变化，静默一小会儿后按「三类开关」判断要不要自动发布。
  // 只在这台机器、这个进程活着的时候有效 —— 管理器关掉就不再自动同步，
  // 这是有意的：自动推送 git 属于对外动作，不该在没人看着的时候跑。
  let watchHandle = null
  let watchTimer = null
  let autoBusy = false
  let autoSuppressUntil = 0
  // 本轮防抖窗口里真正变过的文件（rel）。「新增自动公开」只认这些，
  // 不能按「本地有、线上没有」的全集去公开 —— 那会把库里所有从没发布过的
  // 旧私密笔记一次性推上线，属于不可挽回的隐私事故。
  let watchPending = new Set()

  function stopWatcher() {
    if (watchHandle) {
      try {
        watchHandle.close()
      } catch {
        /* 已关闭 */
      }
      watchHandle = null
    }
    if (watchTimer) {
      clearTimeout(watchTimer)
      watchTimer = null
    }
    watchPending.clear()
  }

  function restartWatcher() {
    stopWatcher()
    const { conn, vaultPath } = activeConfig()
    if (!conn || !validVault(vaultPath)) return
    try {
      // recursive: Windows 与 macOS 原生支持；Linux 上 Node 20+ 也支持
      watchHandle = fsSync.watch(vaultPath, { recursive: true }, (_ev, file) => {
        if (file) watchPending.add(normalize(String(file)))
        scheduleAutoSync()
      })
    } catch {
      watchHandle = null // 平台不支持就退化成「只能手动发布」
    }
  }

  function scheduleAutoSync() {
    if (watchTimer) clearTimeout(watchTimer)
    // 编辑器保存一次会连着触发好几个事件（临时文件、.obsidian、重命名），
    // 攒 2.5 秒再算一次，避免一次保存推出好几个提交。
    watchTimer = setTimeout(() => {
      watchTimer = null
      const touched = new Set(watchPending)
      watchPending.clear()
      autoSyncTick(touched).catch(() => {})
    }, 2500)
  }

  /**
   * 发布刚结束的静默期里到达的改动不能丢：放回待处理集合，等静默期过完再算一次。
   * （踩过：静默期 5 秒，用户紧接着存下一篇文章，那次改动被直接丢掉，
   *   界面上看着「自动同步开着」却没动静。）
   */
  function requeueAutoSync(touched) {
    for (const p of touched) if (p) watchPending.add(p)
    if (watchTimer) clearTimeout(watchTimer)
    const wait = Math.max(800, autoSuppressUntil - Date.now() + 200)
    watchTimer = setTimeout(() => {
      watchTimer = null
      const next = new Set(watchPending)
      watchPending.clear()
      autoSyncTick(next).catch(() => {})
    }, wait)
  }

  async function autoSyncTick(touched = new Set()) {
    if (autoBusy || Date.now() < autoSuppressUntil) {
      requeueAutoSync(touched)
      return
    }
    const { conn, vaultPath, workdir } = activeConfig()
    if (!conn || !validVault(vaultPath) || !workdir) return
    if (!fsSync.existsSync(path.join(workdir, 'content'))) return
    const flags = loadAutoSync()
    const before = diffVault(vaultPath, workdir, loadPublishMark(conn.id))
    // 先把「这次看到的改动」记进日志，再决定发不发：
    // 自动同步往往在用户没打开界面时就跑完了（改完文件立刻被推上去），
    // 如果只在 /api/state 里记，那次改动会永远不出现在三栏里 —— 而三栏本来就是
    // 「自上次手动发布以来改过什么」的日志，不能因为自动发布快就漏掉。
    try {
      recordChanges(conn.id, before)
    } catch {
      /* 日志写不进去不影响自动同步 */
    }
    // 新增：只自动公开「刚变过」的那几篇（见 watchPending 的注释）
    const addCandidates = before.added.filter((p) => touched.has(normalize(p)))
    const wantAdd = flags.added && addCandidates.length > 0
    const wantMod = flags.modified && before.modified.length > 0
    const wantDel = flags.deleted && before.deleted.length > 0
    const counts = { added: before.added.length, modified: before.modified.length, deleted: before.deleted.length }
    // 这一轮真正会被发上去的条目：只有对应开关开着的那些类。
    // 发成功之后它们要从三栏里消失（改由流水负责说明），没开的那些继续留着等手动处理。
    const handled = {
      added: wantAdd ? addCandidates.slice() : [],
      modified: wantMod ? before.modified.slice() : [],
      deleted: wantDel ? before.deleted.slice() : [],
    }
    const filesOf = (src) => ({
      added: (src.added || []).slice(0, 12),
      modified: (src.modified || []).slice(0, 12),
      deleted: (src.deleted || []).slice(0, 12),
    })
    const startedAt = Date.now()
    if (!wantAdd && !wantMod && !wantDel) {
      // 确实有改动、但对应的自动开关没开：这些改动就留在三栏里等人手动发布，
      // 不再往流水里写「有改动，但开关没开」（用户明确说不需要这种记录）。
      return
    }
    // 跨进程互斥：另一个发布进程（本地调试入口 / 插件）可能正在同一个
    // 工作副本上推送。抢不到就等下一轮 —— 绝不能两个进程同时 add/commit/push，
    // 那会一个成功一个「推送失败」，界面上看着像失败、其实已经上线了。
    const lk = acquireLock('publish-' + conn.id)
    if (!lk.ok) {
      requeueAutoSync(touched)
      return
    }
    autoBusy = true
    // 先落一条「开始推送」，再真的去推：git push + GitHub Actions 加起来要几十秒到几分钟，
    // 只在推完之后写一条的话，这段时间界面上一片空白，看着像没反应。
    const entry = { at: startedAt, kind: 'run', counts, files: filesOf(handled), stage: 'pushing' }
    pushAutoLog(conn.id, entry)
    bumpRev()
    try {
      // 「新增自动公开」：新笔记默认私密，开了这个开关才替用户把它设为 public，
      // 否则 publish 只拷公开笔记，新增永远上不了线。
      if (wantAdd) {
        for (const rel of addCandidates) {
          try {
            setPublic(vaultPath, rel, true)
          } catch {
            /* 单篇失败不影响其它 */
          }
        }
      }
      const lang = 'zh'
      const r = await publish(conn, vaultPath, workdir, lang, { skipDelete: !flags.deleted })
      entry.pushed = r.pushed === true
      entry.failed = r.failed === true
      entry.stage = entry.failed ? 'failed' : 'pushed'
      entry.pushedAt = Date.now()
      if (r.failKind) entry.failKind = r.failKind
      if (r.commit) entry.commit = r.commit
      // 发成功了才把这几类改动从三栏摘掉（历史留在流水里）；失败就留着让人看见
      if (!entry.failed) {
        try {
          dropChanges(conn.id, handled)
        } catch {
          /* 摘不掉不影响这次发布 */
        }
      }
      // 后台自己盯着上线：界面可能根本没开着，等用户回来看时那条记录应该已经有结论了
      if (r.pushed) watchAutoLive(conn, entry)
    } catch (e) {
      entry.failed = true
      entry.stage = 'failed'
      entry.error = String((e && e.message) || e).slice(0, 200)
    } finally {
      // 把结果回填到刚才那条「开始推送」上（按 at 定位），而不是再插一条
      patchAutoLog(conn.id, entry.at, {
        stage: entry.stage,
        pushed: entry.pushed,
        pushedAt: entry.pushedAt,
        failed: entry.failed,
        failKind: entry.failKind,
        commit: entry.commit,
        error: entry.error,
        files: entry.files,
      })
      autoBusy = false
      lk.release()
      // publish 自己也会写文件（content/、.blog-meta.json），别让这些写入再触发一轮
      autoSuppressUntil = Date.now() + 5000
      bumpRev()
    }
  }

  /**
   * 自动同步的「上线确认」：后台盯着线上产物，最多等 10 分钟。
   *
   * 判定顺序：线上产物带上了这次的提交号 → 已上线（唯一权威，不受本机时钟影响）；
   * 没上线就看 GitHub Actions 那边这次构建的结论 —— 已经失败就立刻收工、写清原因，
   * 别让界面一直显示「等构建」；到点还没上线也留一条明确的「构建超时」。
   *
   * 自动同步经常发生在没人盯着屏幕的时候，所以结论必须落到记录里，而不是只在界面上闪一下。
   */
  const AUTO_LIVE_DEADLINE = 10 * 60 * 1000

  function watchAutoLive(conn, entry) {
    const target = conn ? siteUrlOf(conn.repo) : null
    if (!target) return
    const repo = conn.repo
    const deadline = Date.now() + AUTO_LIVE_DEADLINE
    const tick = async () => {
      const r = await probeLiveSite(target, entry.at, entry.commit || '')
      if (r.live) {
        patchAutoLog(conn.id, entry.at, { live: true, liveAt: Date.now() })
        bumpRev()
        return
      }
      const b = await probeBuildStatus(repo, entry.commit || '')
      if (b && b.found && b.status === 'completed' && b.conclusion && b.conclusion !== 'success') {
        patchAutoLog(conn.id, entry.at, {
          live: false,
          buildFailed: true,
          buildConclusion: b.conclusion,
          buildUrl: b.url || '',
        })
        bumpRev()
        return
      }
      if (Date.now() > deadline) {
        patchAutoLog(conn.id, entry.at, {
          liveTimeout: true,
          buildStatus: (b && b.status) || '',
          buildUrl: (b && b.url) || '',
        })
        bumpRev()
        return
      }
      setTimeout(tick, 20000)
    }
    setTimeout(tick, 15000)
  }

  /**
   * 管理器重启后接着盯「推了但还没结论」的自动同步流水。
   *
   * 上线确认靠的是进程内的定时器，进程一重启就没了 —— 那条记录会永远停在
   * 「已推送，等构建」（用户实际遇到的就是这个）。启动时把最近半小时内这类条目
   * 重新挂上，重启也能自己补出结论。
   */
  function resumeAutoLiveWatch() {
    const { conn } = activeConfig()
    if (!conn) return
    if (!siteUrlOf(conn.repo)) return
    const now = Date.now()
    for (const e of loadAutoLog(conn.id)) {
      if (e.kind !== 'run') continue
      // 进程在推送途中被杀掉：那条记录会永远停在「开始推送」，得给个明确交代
      if (!e.failed && !e.pushed && e.stage === 'pushing' && now - e.at > 2 * 60 * 1000) {
        try {
          patchAutoLog(conn.id, e.at, { stage: 'failed', failed: true, interrupted: true })
        } catch {
          /* 补不上就算了，下次启动还会看到 */
        }
        continue
      }
      if (e.failed || !e.pushed || e.live || e.liveTimeout || e.buildFailed) continue
      if (!e.commit) continue
      if (now - e.at > 30 * 60 * 1000) continue
      watchAutoLive(conn, e)
    }
  }


  // ---------- 启动 / 停止 ----------
  /**
   * 启动 HTTP 服务。返回实际监听端口（port 传 0 时由系统分配）。
   * 端口被占用时 reject，而不是像命令行那样只打一行提示 —— 调用方要能自己决定怎么办。
   */
  function start() {
    return new Promise((resolve, reject) => {
      const onError = (e) => {
        server.removeListener("listening", onListening)
        if (e && e.code === "EADDRINUSE") {
          reject(new Error(`端口 ${PORT} 已被占用：可能已经有一个管理器在运行。`))
        } else {
          reject(new Error("服务启动失败：" + String((e && e.message) || e)))
        }
      }
        const onListening = () => {
          server.removeListener("error", onError)
          // port 传 0 时由系统分配，此时 PORT 仍是 0，日志与返回值都要用实际端口
          const actualPort = server.address() ? server.address().port : PORT
          const { conn, vaultPath } = activeConfig()
          log(`[manager] Dev server: http://localhost:${actualPort}`)
          log(`[manager] Active connection: ${conn ? conn.name : '(none)'}; vault path: ${vaultPath || '(not set)'}`)
          log(`[manager] Source directory: ${TOOL_ROOT}`)
          log(`[manager] Data directory:   ${DATA_DIR}`)
          restartWatcher()
          // 上次关掉时可能还有「推了但没等到上线」的记录，接着盯（定时器随进程消失）
          try {
            resumeAutoLiveWatch()
          } catch {
            /* 补盯失败不影响管理器启动 */
          }
          resolve(actualPort)
        }
      server.once("error", onError)
      server.once("listening", onListening)
      server.listen(PORT, "127.0.0.1")
    })
  }

  /** 关闭服务与文件监听（插件卸载 / 进程退出时调用） */
  function stop() {
    try { stopWatcher() } catch { /* 没起过就忽略 */ }
    return new Promise((resolve) => {
      try {
        server.close(() => resolve())
      } catch {
        resolve()
      }
    })
  }

  return {
    start,
    stop,
    server,
    get port() { return server.address() ? server.address().port : PORT },
    get toolRoot() { return TOOL_ROOT },
    get dataDir() { return DATA_DIR },
    // 给宿主做状态展示用
    state() {
      const { conn, vaultPath } = activeConfig()
      return { conn: conn ? { id: conn.id, name: conn.name, repo: conn.repo, branch: conn.branch } : null, vaultPath }
    },
  }
}
