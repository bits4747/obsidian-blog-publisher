#!/usr/bin/env node
/**
 * 发布管理器（多库/多仓库版）
 *
 * 浏览器打开 http://localhost:3457
 *   - 连接管理：多个「本地库 ↔ GitHub 仓库」连接，图形化新建/切换，一键建立同步
 *   - 笔记管理：分栏文件夹视图，逐篇/按文件夹/全局切换公开状态（写 frontmatter public: true）
 *   - 一键发布：把公开笔记（含新增/修改/删除）完整同步到所连仓库并推送，GitHub Actions 自动构建上线
 *
 * 配置文件：
 *   connections.json（随仓库同步）：{ connections: [{id,name,repo,branch}], }
 *   local.json（仅本机，gitignore）：{ active: id, vaultPaths: { id: 本地库路径 } }
 *   repos/<id>/：各连接的站点仓库工作副本（git clone / 模板初始化）
 */

import { promises as fsp } from 'node:fs'
import fsSync from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import http from 'node:http'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TOOL_ROOT = path.resolve(__dirname, '..')
const PORT = Number(process.env.MGR_PORT || 3457)

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
const DATA_DIR = (() => {
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
})()

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
  if (token && looksGithub) {
    const basic = Buffer.from('x-access-token:' + token).toString('base64')
    pre.push('-c', 'http.extraHeader=Authorization: Basic ' + basic)
  }
  const r = spawnSync('git', [...pre, ...args], {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 120000,
    windowsHide: true,
    // 见函数上方注释 ③：有令牌且目标是 GitHub 时，跳过 MITM 证书的吊销检查
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: '0',
      ...(token && looksGithub ? { GIT_SSL_NO_VERIFY: '1' } : null),
    },
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
function readGithubToken() {
  const fromEnv = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim()
  if (fromEnv) return fromEnv
  // 管理器里粘贴保存过的令牌（local.json，仅本机、已 gitignore）
  try {
    const saved = (loadLocal().githubToken || '').trim()
    if (saved) return saved
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
  if (t) local.githubToken = t
  else delete local.githubToken
  saveLocal(local)
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
  const localRels = new Set()
  for (const n of vaultState(vaultPath).notes) {
    const rel = normalize(n.path)
    localRels.add(rel)
    if (!published.has(rel)) {
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
  if (token && looksGithub) {
    const basic = Buffer.from('x-access-token:' + token).toString('base64')
    pre.push('-c', 'http.extraHeader=Authorization: Basic ' + basic)
  }
  const started = Date.now()
  const r = spawnSync('git', [...pre, 'ls-remote', '--heads', repo], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 12000,
    windowsHide: true,
    // 同 git()：加速器的 MITM 证书会卡在吊销检查，有令牌时跳过（见 git() 注释 ③）
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: '0',
      ...(token && looksGithub ? { GIT_SSL_NO_VERIFY: '1' } : null),
    },
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
  if (!failed) {
    let ackedDeleted = []
    try {
      ackedDeleted = diffVault(vaultPath, workdir, null).deleted.map((r) => normalize(r))
    } catch {
      ackedDeleted = []
    }
    try {
      savePublishMark(conn.id, { at: startedAt, ackedDeleted })
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
      // push 单独包一层：失败时把原因归类，网络类问题给出可操作的提示
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
      log.push(msg('logPushed'))
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
    logPublic: (n, c, r) => `公开笔记 ${n} 篇：新增/更新 ${c}，移除过期 ${r}`,
    logSiteName: (prev, want) => `已更新网页标题的站名：${prev ? '「' + prev + '」→ ' : ''}「${want}」`,
    logFresh: '线上已是最新，无需推送',
    logPushed: '已推送 GitHub，Actions 构建中（1~2 分钟后网站自动更新）',
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
    gitUserName: '发布管理器',
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
    logPublic: (n, c, r) => `${n} public ${n === 1 ? 'note' : 'notes'}: ${c} added/updated, ${r} stale removed`,
    logSiteName: (prev, want) => `Site title updated: ${prev ? '"' + prev + '" → ' : ''}"${want}"`,
    logFresh: 'Already up to date — nothing to push',
    logPushed: 'Pushed to GitHub — Actions is building (the site updates in 1~2 minutes)',
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
const UI = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>Publish Manager</title>
<style>
  /* 主题变量：默认浅色，prefers-color-scheme: dark 时切蓝黑，
     也可以用 <html data-theme="dark|light"> 手动覆盖（右上角按钮切换）。 */
  :root {
    --bg: #f6f7f9; --fg: #1f2937; --card: #fff; --border: #e5e7eb; --border-soft: #f0f0f0;
    --muted: #6b7280; --muted-2: #9ca3af; --field: #d1d5db;
    /* 与站点同一族蓝（站点 --primary 约 #2570cc），管理器按钮/选中态全部用这个蓝 */
    --accent: #2570cc; --accent-hover: #1d5fbb; --accent-soft: #eaeffa; --accent-soft-hover: #d8e4f8;
    --hover: #f9fafb; --chip: #e5e7eb; --chip-fg: #374151; --btn-ghost: #f3f4f6;
    --ok: #059669; --ok-bg: #10b981; --ok-bg-hover: #15803d; --bad: #dc2626; --warn-bg: #fffbeb; --warn-fg: #92400e; --warn-bd: #fde68a;
    --bar: rgba(246,247,249,.92);
    --shadow: rgba(0,0,0,.25);
    --busy-bg: #eef2ff; --busy-fg: #3730a3; --okbg: #ecfdf5; --okfg: #065f46; --errbg: #fef2f2; --errfg: #991b1b;
  }
  html[data-theme="dark"] {
    --bg: #0f1420; --fg: #e5e9f2; --card: #171d2b; --border: #2a3348; --border-soft: #222a3d;
    --muted: #97a3b8; --muted-2: #6f7c93; --field: #38425a;
    --accent: #5b9bf8; --accent-hover: #7bb0fb; --accent-soft: #1c2740; --accent-soft-hover: #24334f;
    --hover: #1e2637; --chip: #2a3348; --chip-fg: #cbd5e6; --btn-ghost: #232b3d;
    --ok: #34d399; --ok-bg: #10b981; --ok-bg-hover: #15803d; --bad: #f87171; --warn-bg: #3a2f14; --warn-fg: #fcd34d; --warn-bd: #6b5520;
    --bar: rgba(15,20,32,.92);
    --shadow: rgba(0,0,0,.55);
    --busy-bg: #1e2740; --busy-fg: #a5b8f5; --okbg: #12301f; --okfg: #6ee7b7; --errbg: #3a1a1c; --errfg: #fca5a5;
  }
  body { font-family: system-ui, 'Microsoft YaHei', sans-serif; background: var(--bg); margin: 0; padding: 20px; color: var(--fg); }
  .wrap { max-width: 1100px; margin: 0 auto; }
  h1 { font-size: 19px; margin: 0 0 4px; } .sub { color: var(--muted); font-size: 12.5px; margin-bottom: 14px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; margin-bottom: 14px; }
  .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  input, select { padding: 8px 10px; border: 1px solid var(--field); border-radius: 8px; font-size: 13.5px;
                  background: var(--card); color: var(--fg); }
  input#q { flex: 1; min-width: 160px; }
  button { padding: 8px 14px; border: 0; border-radius: 8px; background: var(--accent); color: #fff; font-size: 13px; cursor: pointer; }
  button.mini { padding: 3px 9px; font-size: 11.5px; background: var(--chip); color: var(--chip-fg); }
  button.mini.green { background: var(--accent); color: #fff; }
  button:disabled { opacity: .55; cursor: default; }
  /* 文件夹区用「列容器」布局：每个 .grid-col 是一条独立的纵向流。
     这样展开某个文件夹只会把它自己那一列撑高，其它列既不会被行高带着下移，也不会留下大片空白。 */
  .grid { display: flex; align-items: flex-start; gap: 12px; }
  .grid-col { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
  .box { background: var(--card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .box-head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--border-soft); cursor: pointer; }
  .box-head:hover { background: var(--hover); }
  .box-head .name { font-weight: 600; font-size: 14.5px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .cnt { font-size: 11.5px; color: var(--muted-2); }
  .chev { transition: transform .15s; color: var(--muted-2); }
  .chev.open { transform: rotate(90deg); }
  ul { list-style: none; margin: 0; padding: 6px; }
  li { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 6px; }
  li:hover { background: var(--hover); }
  .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13.5px; }
  .pub { color: var(--accent); font-size: 11.5px; } .pri { color: var(--muted-2); font-size: 11.5px; }
  .sw { position: relative; width: 32px; height: 18px; border-radius: 999px; background: var(--field); border: 0; cursor: pointer; transition: .15s; flex-shrink: 0; }
  .sw.on { background: var(--accent); } .sw::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: #fff; transition: .15s; }
  .sw.on::after { left: 16px; }
  /* ---- 变更分类：新增 / 修改 / 删除 ---- */
  .chg { font-size: 10.5px; font-weight: 600; padding: 1px 6px; border-radius: 999px; flex-shrink: 0;
         border: 1px solid transparent; white-space: nowrap; }
  .chg.add { color: var(--ok); background: color-mix(in srgb, var(--ok) 12%, transparent); border-color: color-mix(in srgb, var(--ok) 35%, transparent); }
  .chg.mod { color: var(--warn-fg); background: var(--warn-bg); border-color: var(--warn-bd); }
  .chg.del { color: var(--bad); background: color-mix(in srgb, var(--bad) 12%, transparent); border-color: color-mix(in srgb, var(--bad) 35%, transparent); }
  .box-head .sum { display: flex; gap: 4px; flex-shrink: 0; }
  li.gone .t { text-decoration: line-through; color: var(--muted-2); }
  /* ---- 自动同步设置条 ---- */
  /* 变更三栏：新增 / 修改 / 删除，在所有文件夹上方一次列全 */
  /* align-items:start —— 每栏按自己的条目数决定高度。默认的 stretch 会把三栏拉成一样高，
     某一栏条目多的时候另外两栏就只剩一大片空白。 */
  .chgcols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; align-items: start; }
  .chgcol { border: 1px solid var(--border-soft); border-radius: 9px; overflow: hidden; display: flex; flex-direction: column; }
  .chgcol .ch { display: flex; align-items: center; gap: 6px; padding: 7px 10px; font-size: 12px; font-weight: 600; border-bottom: 1px solid var(--border-soft); }
  .chgcol .ch .n { margin-left: auto; font-size: 11.5px; color: var(--muted); }
  .chgcol ul { list-style: none; margin: 0; padding: 4px 0; max-height: 190px; overflow: auto; }
  .chgcol li { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 12.5px; cursor: pointer; }
  .chgcol li:hover { background: var(--hover); }
  .chgcol li .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chgcol li .p { font-size: 11px; color: var(--muted-2); max-width: 46%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chgcol .empty { padding: 10px; font-size: 12px; color: var(--muted-2); }
  /* 未分组块：有内容时和下面的文件夹网格留出间隔，空的时候不占位 */
  #ungrouped:not(:empty) { margin-bottom: 12px; }
  #ungrouped .box { border-color: var(--border); }
  /* 未分组里可能塞了上百篇笔记，一条长龙不好翻：按列排，宽度够就自动多列 */
  #ungrouped ul { column-width: 300px; column-gap: 10px; }
  #ungrouped li { break-inside: avoid; }
  #folders li.flash { background: var(--accent-soft); }
  .autosync { display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    padding: 8px 11px; margin-top: 12px; border: 1px dashed var(--border); border-radius: 8px; }
  .autosync > .lbl { font-size: 12px; font-weight: 600; color: var(--muted); }
  .autosync label { display: flex; align-items: center; gap: 5px; font-size: 12px; cursor: pointer; color: var(--fg); }
  .autosync .hint { font-size: 11.5px; color: var(--muted-2); margin-left: auto; }
  /* ---- 自动同步流水：时间 + 动了哪些文件 + 推没推上去 + 有没有上线 ---- */
  .autolog-head { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .autolog-head .t { font-size: 11.5px; font-weight: 600; color: var(--muted); }
  .autolog-head .mini { margin-left: auto; padding: 2px 8px; font-size: 11px; }
  /* 默认只露 4 行的高度，多了在里面滚（高度由脚本按实际行高算，文件行多也不会撑爆） */
  .autolog { margin-top: 4px; font-size: 11.5px; color: var(--muted-2);
    display: flex; flex-direction: column; gap: 5px;
    max-height: 150px; overflow-y: auto; overflow-x: hidden; }
  .autolog .al { display: flex; flex-direction: column; gap: 1px; }
  .autolog .al-top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .autolog .tm { font-variant-numeric: tabular-nums; color: var(--muted); }
  .autolog .st { font-weight: 600; }
  .autolog .st.ok { color: var(--accent); } .autolog .st.bad { color: var(--bad); }
  .autolog .st.wait { color: var(--muted); } .autolog .st.skip { color: var(--muted-2); }
  .autolog .cs { color: var(--muted-2); }
  .autolog .took { color: var(--muted-2); }
  .autolog .sha { font-family: ui-monospace, Menlo, Consolas, monospace; color: var(--muted-2); }
  /* 第二行：这次动了哪些文件 —— 三栏里不再重复列这些，改由流水说明 */
  .autolog .al-files { display: flex; gap: 10px; flex-wrap: wrap; padding-left: 2px; font-size: 11px; }
  .autolog .fs { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .autolog .fs.add { color: var(--ok); } .autolog .fs.mod { color: var(--warn-fg); }
  .autolog .fs.del { color: var(--bad); }
  .hidden { display: none; }
  label { font-size: 12.5px; color: var(--muted); }
  .vault-ok { color: var(--accent); } .vault-bad { color: var(--bad); }

  /* ---- 顶部状态栏（发布反馈出现在这里，不用滚到底部）---- */
  .statusbar { position: sticky; top: 0; z-index: 30; margin: -20px -20px 14px; padding: 12px 20px;
               background: var(--bar); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
  .statusbar .inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .statusbar .title { font-size: 17px; font-weight: 700; white-space: nowrap; }
  .statusbar .spacer { flex: 1; }
  /* 主操作按钮用蓝色（与站点主色一致）；绿色只留给「已公开」状态本身 */
  .btn-publish { background: var(--accent); padding: 9px 18px; font-size: 13.5px; font-weight: 600;
                 box-shadow: 0 1px 2px rgba(37,112,204,.3); white-space: nowrap; }
  .btn-publish:hover:not(:disabled) { background: var(--accent-hover); }
  .result { display: flex; align-items: center; gap: 7px; font-size: 13px; padding: 6px 12px;
            border-radius: 999px; max-width: 620px; }
  .result.busy { background: var(--accent-soft); color: var(--accent); }
  .result.ok   { background: var(--okbg); color: var(--okfg); }
  .result.err  { background: var(--errbg); color: var(--errfg); }
  .result .txt { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .result details { font-weight: 400; } .result summary { cursor: pointer; opacity: .75; }
  .result pre { margin: 6px 0 0; white-space: pre-wrap; font: 11.5px/1.6 Consolas, monospace; }
  /* 推送失败（多半是加速器）时的高亮条：圆角胶囊形撑不下整句话，而且失败提示
     必须一眼看到——单独用一张实心红条，不跟其它日志混在一起。 */
  .result.alert { color: #fff; background: var(--bad); font-weight: 600; border-radius: 10px; }
  .result.alert .txt { white-space: normal; overflow: visible; }
  /* 非关键的「顺带成功」日志（站名变量同步等）淡一档：
     它们和成败混在同一视觉层级时，会让人把整次发布误判成成功（真实踩过）。 */
  .result pre .dim { opacity: .6; }

  /* ---- 多库切换：卡片式选择器 ---- */
  .vaults { display: flex; gap: 10px; overflow-x: auto; padding: 2px 2px 10px; }
  .vault { position: relative; flex: 0 0 auto; width: 230px; text-align: left; cursor: pointer;
           background: var(--card); border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 13px 11px;
           font: inherit; color: inherit; transition: border-color .15s, box-shadow .15s, transform .12s; }
  .vault.has-del { padding-bottom: 34px; }
  .vault:hover { border-color: var(--accent); transform: translateY(-1px); }
  .vault.on { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,112,204,.14); }
  .vault .vname { font-weight: 600; font-size: 14px; margin-bottom: 3px; overflow: hidden;
                  text-overflow: ellipsis; white-space: nowrap; }
  .vault .vrepo { font-size: 11.5px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .vault .vmeta { font-size: 11.5px; color: var(--muted-2); margin-top: 6px; }
  .vault .vmeta b { color: var(--accent); font-weight: 600; }
  .vault .badge { position: absolute; top: 10px; right: 10px; font-size: 10px; padding: 2px 7px;
                  border-radius: 999px; background: var(--accent); color: #fff; }
  .vault.new { display: flex; align-items: center; justify-content: center; gap: 6px; width: 170px;
               border-style: dashed; color: var(--muted); font-size: 13px; }
  .vault.new:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
  .vault .del { position: absolute; bottom: 8px; right: 8px; font-size: 10.5px; padding: 1px 7px;
                border-radius: 6px; background: var(--btn-ghost); color: var(--muted-2); border: 0; cursor: pointer; }
  .vault .del:hover { background: #fee2e2; color: var(--bad); }
  .vault .vlink { display: inline-flex; align-items: center; gap: 3px; margin-top: 7px; text-decoration: none;
                  font-size: 11.5px; color: var(--accent); padding: 2px 7px 2px 5px; border-radius: 6px;
                  background: var(--accent-soft); font-weight: 500; }
  .vault .vlink:hover { background: var(--accent-soft-hover); text-decoration: underline; }

  /* ---- 新建连接：一步一个库 + 一个仓库 ---- */
  .dialog { position: fixed; inset: 0; z-index: 50; background: rgba(17,24,39,.45);
            display: flex; align-items: center; justify-content: center; padding: 20px; }
  .dialog .panel { background: var(--card); border-radius: 14px; width: 100%; max-width: 520px;
                   padding: 20px 22px; box-shadow: 0 20px 50px var(--shadow); }
  .dialog h2 { margin: 0 0 4px; font-size: 16.5px; }
  .dialog .hint { font-size: 12.5px; color: var(--muted); margin-bottom: 16px; }
  .field { margin-bottom: 14px; }
  .field > label { display: block; margin-bottom: 5px; font-size: 12.5px; color: var(--chip-fg); font-weight: 500; }
  .field input { width: 100%; box-sizing: border-box; }
  .pickrow { display: flex; gap: 8px; }
  .pickrow input { flex: 1; }
  .picker { font-size: 11.5px; color: var(--muted-2); margin-top: 5px; min-height: 16px; }
  .picker.ok { color: var(--accent); font-weight: 500; } .picker.bad { color: var(--bad); }
  .dialog .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
  .tabs { display: flex; gap: 6px; margin-bottom: 8px; }
  .tab { background: var(--btn-ghost); color: var(--chip-fg); border: 0; cursor: pointer; font-size: 12.5px;
         padding: 5px 11px; border-radius: 8px; }
  .tab:hover { background: var(--chip); }
  .tab.on { background: var(--accent); color: #fff; }
  button.ghost { background: var(--btn-ghost); color: var(--chip-fg); }
  .warnbox { background: var(--warn-bg); color: var(--warn-fg); border: 1px solid var(--warn-bd); border-radius: 8px;
             padding: 9px 12px; font-size: 12.5px; margin-bottom: 12px; }
  /* 未授权提示条：新机器上「一键连接 / 发布」都需要 GitHub 授权，
     不把这条摆到眼前，用户只会得到一个看不懂的失败。 */
  .authbar { display: flex; align-items: center; gap: 10px; margin: -6px 0 14px; padding: 9px 13px;
             background: var(--warn-bg); color: var(--warn-fg); border: 1px solid var(--warn-bd);
             border-radius: 10px; font-size: 12.5px; }
  .authbar.hidden { display: none; }
  .authbar .mini { margin-left: auto; }
  .tokenrow { display: flex; gap: 8px; align-items: flex-start; }
  .tokenrow input { flex: 1; font-family: ui-monospace, Consolas, monospace; font-size: 12px; }
</style></head><body>

<div class="statusbar"><div class="inner">
  <span class="title" data-i18n="appTitle">发布管理器</span>
  <span class="spacer"></span>
  <span id="result" class="result hidden"><span class="txt"></span></span>
  <button class="mini" id="langBtn" onclick="toggleLang()" data-i18n-title="switchLang" data-i18n-aria="switchLang">EN</button>
  <button class="mini" id="themeBtn" onclick="toggleTheme()" data-i18n-title="toggleTheme" data-i18n-aria="toggleTheme">◐</button>
  <button class="mini" id="authBtn" onclick="openAuthDialog()" data-i18n="authBtn">GitHub 授权</button>
  <button class="mini" id="srcBtn" onclick="doUpdateSource()" data-i18n="srcBtn">⬆ 更新源码</button>
  <button class="btn-publish" id="pubBtn" onclick="doPublish()" data-i18n="publishBtn">⟳ 发布到 GitHub</button>
</div></div>

<div class="authbar hidden" id="authBar">
  <span data-i18n="authBarText"></span>
  <button class="mini" onclick="openAuthDialog()" data-i18n="authBarBtn">现在授权</button>
</div>

<div class="wrap">

<div class="card">
  <div class="row" style="margin-bottom:9px">
    <label style="font-size:13px;font-weight:600;" data-i18n="myBlogs">我的博客</label>
    <span class="cnt" id="vaultHint"></span>
  </div>
  <div class="vaults" id="vaults"></div>
</div>

<div class="card" id="chgCard">
  <div class="row" style="margin-bottom:10px">
    <label style="font-size:13px;font-weight:600;" data-i18n="chgTitle">变更</label>
    <span class="cnt" id="chgHint"></span>
  </div>
  <div class="chgcols" id="chgcols"></div>
  <div class="autosync" id="autosync">
    <span class="lbl" data-i18n="autoSyncTitle">自动同步</span>
    <label title="新增的笔记自动设为公开并发布" data-i18n-title="autoSyncTipAdded">
      <input type="checkbox" id="as-added" onchange="setAutoSync('added', this.checked)">
      <span data-i18n="autoSyncAdded">新增</span>
    </label>
    <label title="已公开笔记的改动自动发布" data-i18n-title="autoSyncTipModified">
      <input type="checkbox" id="as-modified" onchange="setAutoSync('modified', this.checked)">
      <span data-i18n="autoSyncModified">修改</span>
    </label>
    <label title="本地删除或转私密后，线上也跟着删掉" data-i18n-title="autoSyncTipDeleted">
      <input type="checkbox" id="as-deleted" onchange="setAutoSync('deleted', this.checked)">
      <span data-i18n="autoSyncDeleted">删除</span>
    </label>
    <span class="hint" data-i18n="autoSyncHint">勾选后这类改动会自动发布，不用点右上角「发布」</span>
  </div>
  <div class="autolog-head" id="autologHead" style="display:none">
    <span class="t" data-i18n="autoLogTitle">自动同步流水</span>
    <button class="mini" id="alClear" onclick="clearAutoLogUI()" data-i18n="autoLogClear">清空</button>
  </div>
  <div class="autolog" id="autolog"></div>
</div>

<div class="card" id="mainCard">
  <div class="row" style="margin-bottom:12px">
    <input id="q" placeholder="搜索笔记标题 / 路径…" data-i18n-ph="searchPh">
    <button class="mini" onclick="expandAllFolders()" data-i18n="expandAll">一键展开</button>
    <button class="mini" onclick="collapseAllFolders()" data-i18n="collapseAll">一键收起</button>
    <button class="mini" onclick="toggleAll(true)" data-i18n="pubAll">全部公开</button>
    <button class="mini" onclick="toggleAll(false)" data-i18n="privAll">全部私密</button>
  </div>
  <!-- 未分组（库根目录下的笔记）单独一块，不混进文件夹网格 -->
  <div id="ungrouped"></div>
  <div class="grid" id="folders"></div>
  <div id="log"></div>
</div>
</div>

<script>
let S = { connections: [], active: null, vaultPath: '', vaultOk: false, notes: [], collapsed: new Set() };

// ---- 界面语言 ----
// 只翻界面文案；笔记标题 / 路径 / 仓库名 / 站名一律原样显示。
// 首次访问跟随浏览器语言，手动切过之后记在 localStorage，不再跟随。
// 注意：这一段在服务端 UI 模板字面量里，所以全程只用单引号拼接，不能出现反引号与美元花括号。
const DICT = {
  zh: {
    appTitle: '发布管理器',
    toggleTheme: '切换明暗主题',
    switchLang: '切换界面语言',
    publishBtn: '⟳ 发布到 GitHub',
    srcBtn: '⬆ 更新源码',
    updatingSrc: '正在更新源码…',
    srcSynced: '站点源码已更新',
    srcUpdateFail: '更新源码失败：',
    publishing: '发布中…',
    publishDone: '完成',
    // 推送成功 ≠ 网页已更新：GitHub 还要跑一次构建再部署，通常 40~90 秒。
    // 这几条把那段等待显示成进度，避免用户反复刷新去猜。
    liveBuilding: function (s) { return '已推送，GitHub 正在构建部署…已等 ' + s + ' 秒' },
    liveOk: function (s) { return '已上线（用时 ' + s + ' 秒）' },
    liveTimeout: '等了 4 分钟还没上线，构建可能失败了，请到 GitHub 仓库的 Actions 页面看一眼',
    liveOpen: '打开线上页面',
    myBlogs: '我的博客',
    searchPh: '搜索笔记标题 / 路径…',
    expandAll: '一键展开',
    collapseAll: '一键收起',
    pubAll: '全部公开',
    privAll: '全部私密',
    noConn: '还没有连接，点右边新建一个',
    notesHint: function (n, p) { return n + ' 篇笔记 · ' + p + ' 篇已公开' },
    pickVault: '请先为这个博客选择本地库文件夹',
    current: '当前',
    noVault: '未设置本地库',
    vaultMeta: function (n, p) { return n + ' 篇 · ' + p + ' 篇公开' },
    // 卡片上的公开数要加粗：与其在外面按子串匹配（换语言就失效），不如直接给带标记的整串
    vaultMetaHtml: function (n, p) { return n + ' 篇 · <b>' + p + ' 篇公开</b>' },
    openSite: '↗ 打开网页',
    remove: '移除',
    removeTip: '只从清单移除，不影响 GitHub 仓库和本地库',
    removeConfirm: function (name) { return '移除「' + name + '」这条连接？\\n\\n· 不会删除 GitHub 仓库\\n· 不会改动本地 Obsidian 库\\n· 下次可以重新添加' },
    removeFail: '移除失败：',
    newBlog: '＋ 新建博客',
    switchFail: '切换失败：',
    uncategorized: '未分组',
    countNotes: function (n) { return n + ' 篇' },
    pub: '公开',
    pri: '私密',
    toggleFail: '切换失败：',
    pendingPrompt: function (n) { return '有 ' + n + ' 处改动还没发布，点右上角「发布」' },
    chgAdded: '新增',
    chgModified: '修改',
    chgDeleted: '删除',
    chgTitle: '变更',
    chgNone: '没有待处理的改动',
    chgCount: function (n) { return n + ' 处待处理' },
    chgJumpTip: '点一下跳到下面文件夹里的这一篇',
    chgTipAdded: '新增：还没发布出去的新笔记。自动同步开着的话，这类改完会自己发上去并从这一栏消失',
    chgTipModified: '修改：还没发出去的改动。自动同步开着的话会自己发上去并从这一栏消失',
    chgTipDeleted: '删除：还没同步到线上的删除/转私密。自动同步开着的话会自己发上去并从这一栏消失',
    autoSyncTitle: '自动同步',
    autoSyncAdded: '新增',
    autoSyncModified: '修改',
    autoSyncDeleted: '删除',
    autoSyncHint: '勾选后这类改动会自动发布，不用点右上角「发布」',
    autoSyncTipAdded: '新增的笔记自动设为公开并发布',
    autoSyncTipModified: '已公开笔记的改动自动发布（公开的仍公开，私密的仍私密）',
    autoSyncTipDeleted: '本地删除或转私密后，线上也跟着删掉',
    autoSyncSaved: '自动同步设置已保存',
    autoSyncFail: '保存失败：',
    autoLogTitle: '自动同步流水',
    autoLogClear: '清空',
    autoLogStartTip: '开始推送的时间',
    autoLogPushing: '开始推送',
    autoLogPushed: '已推送，等构建',
    autoLogPushedAt: function (s) { return '已推送 ' + s + '，等构建' },
    autoLogLive: function (s) { return '已更新 ' + s },
    autoLogTook: function (s) { return '（' + s + '）' },
    autoLogFailed: '推送失败',
    autoLogInterrupted: '推送中断（管理器退出），结果未知',
    autoLogFresh: '跑完，无改动可推',
    autoLogBuildFailed: '构建失败',
    autoLogTimeout: '构建超时',
    autoLogOpenActions: '点这一行去 GitHub Actions 看看',
    autoLogMore: function (n) { return ' 等 ' + n + ' 个' },
    autoLogFileAdded: '新增',
    autoLogFileModified: '修改',
    autoLogFileDeleted: '删除',
    noChanges: '暂无待同步改动',
    pending: function (n) { return n + ' 项待同步' },
    emptyNoConn: '还没有博客连接，点上方「＋ 新建博客」开始。',
    emptyNoNotes: '这个库里还没有笔记，或者本地库路径不对。点上方当前博客卡片可以改。',
    loadFail: '加载失败：',
    detail: '详情',
    save: '保存修改',
    create: '创建并开始',
    cancel: '取消',
    vaultTip: '本地库：',
    vaultNone: '（未设置）',
    setupTitleEdit: '这个博客的设置',
    setupTitleNew: '新建博客',
    setupHint: '一个本地库对应一个 GitHub 仓库。选好本地库，下面一键搞定 GitHub 那边的事。',
    step1: '① 本地库文件夹',
    chooseFolder: '选择文件夹…',
    pickPlaceholder: '点右边按钮选择文件夹',
    step2: '② 名字（管理器里显示，也是网页左上角标题）',
    namePlaceholder: '例如：我的博客',
    step3: '③ GitHub 仓库（网页就放在这个仓库里）',
    repoLocked: '仓库地址建好后不再改动（要换仓库请移除这条连接重新新建）',
    tabAuto: '帮我新建一个仓库',
    tabManual: '我已经有仓库了',
    repoPlaceholder: 'https://github.com/你的用户名/仓库名.git',
    repoTip: '填仓库地址即可，建议用空仓库（如已在 GitHub 建好但还没放过东西）',
    repoNamePlaceholder: '仓库名（英文），例如 my-blog',
    createOnGitHub: '在 GitHub 上创建',
    goAuthorize: '去 GitHub 授权…',
    needRepoName: '先填一个仓库名',
    creating: '创建中…',
    createOk: '已在 GitHub 建好仓库：',
    createFail: '创建失败：',
    tokenReady: '✓ 已检测到 GitHub 授权，可直接创建',
    tokenMissing: '还没有 GitHub 授权。点「去 GitHub 授权…」看一步到位的做法（只需一次）。',
    pickOk: '✓ 已选择：',
    pickWait: '请在弹窗中选择…',
    pickTimeout: '没有选择文件夹。如果弹窗被浏览器挡住了，先关掉/最小化浏览器窗口，或用 Alt+Tab 找到它，再试一次。',
    pickFail: '选择失败：',
    mustPickVault: '请先选择本地库文件夹',
    mustFillRepo: '请填写 GitHub 仓库地址',
    mustCreateRepo: '请先在「帮我新建一个仓库」里创建，或切到「我已经有仓库了」填地址',
    saved: '已保存',
    created: '已创建，点右上角「发布到 GitHub」即可上线',
    authTitle: '连接 GitHub',
    authHint: '一个令牌就够：新建仓库、连接已有仓库、发布上线，全都用它。',
    authClose: '关闭',
    authRetry: '重新检测',
    authBtn: 'GitHub 授权',
    authBarText: '还没连上 GitHub：新建仓库、连接已有仓库、发布上线都需要一次授权。',
    authBarBtn: '现在授权',
    authOk: function (login) { return login ? '已授权：' + login : '已授权' },
    authUnknown: '本机存着令牌，但现在连不上 GitHub 验证（检查网络 / 加速器）。',
    tokenLabel: '粘贴 GitHub 令牌（personal access token），只存在本机',
    tokenPh: '粘贴令牌，例如 ghp_…',
    tokenSave: '保存并验证',
    tokenWhere: '获取步骤：github.com → 右上角头像 → <b>Settings</b> → 左侧最下 <b>Developer settings</b> → <b>Personal access tokens</b> → 选 <b>Tokens (classic)</b> → <b>Generate new token (classic)</b> → 勾选 <b>repo</b> 和 <b>workflow</b> → 生成后复制粘贴到这里。<br><b>repo</b> 负责克隆、推送、建仓库、同步站名；<b>workflow</b> 首次建站时需要往仓库写入 .github/workflows/deploy.yml，不勾会被 GitHub 拒绝推送。<br>⚠️ <b>有效期请选「No expiration」（永久）</b>：令牌一到期，发布、建仓库、自动建站都会失败，还得重新生成一个再来粘贴。选永久的就不用管了（令牌只存这台电脑，不会上传）。',
    tokenClear: '清除本机保存的令牌',
    tokenCleared: '已清除本机保存的令牌',
    checking: '检测中…',
    authFound: '已检测到 GitHub 授权',
    authNotFound: '还没检测到授权',
    checkFail: '检测失败：',
    publishFail: '发布失败：',
    publishErr: '有步骤失败',
    pushNetworkFail: '没能推送到 GitHub（多半是加速器没开或掉了）。笔记已安全保存在本地，开好加速器后重新点一次「发布」即可。',
    pushed: ' · 已推送，1~2 分钟后上线',
    logPublic: function (n, c, r) { return '公开笔记 ' + n + ' 篇：新增/更新 ' + c + '，移除过期 ' + r },
    logSiteName: function (prev, want) { return '已更新网页标题的站名：' + (prev ? '「' + prev + '」→ ' : '') + '「' + want + '」' },
    logFresh: '线上已是最新，无需推送',
    logPushed: '已推送 GitHub，Actions 构建中（1~2 分钟后网站自动更新）',
    logGitFail: 'git 操作失败：',
    logVarOk: function (name) { return '已把站名「' + name + '」写入仓库变量 SITE_NAME（下次构建生效）' },
    logVarNoToken: '站名同步跳过：需要 GitHub 授权才能改仓库变量。可设环境变量 GITHUB_TOKEN 后重试，或用 gh 登录。',
    logVarBadRepo: '站名同步跳过：仓库地址不是 GitHub 仓库',
    logVarFail: function (reason, detail) { return '站名同步失败（' + reason + '）：' + (detail || '') },
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
    errRepoExists: function (name) { return '仓库「' + name + '」已经存在了。请换一个名字，或切到「我已经有仓库了」直接填它的地址。' },
    errCreateRejected: 'GitHub 拒绝了这次创建：',
    errCheckScope: '请检查令牌是否有 repo 权限',
    errBadAuth: 'GitHub 授权无效或权限不足（需要 repo 权限）。请重新授权后重试。',
    errCreateFail: function (status) { return '创建失败（HTTP ' + status + '）：' },
    errConnectFail: '连接 GitHub 失败：',
    errNoDir: '目录已存在且不是 git 仓库：',
    errGitFail: function (cmd) { return 'git ' + cmd + ' 失败' },
    errPathEscaped: '路径越界',
    errForbidden: '拒绝访问：只接受本机页面的请求',
    errPublishing: '正在发布中，请等这次结束再试',
    ok: '完成',
  },
  en: {
    appTitle: 'Publish Manager',
    toggleTheme: 'Toggle dark / light theme',
    switchLang: 'Switch interface language',
    publishBtn: '⟳ Publish to GitHub',
    srcBtn: '⬆ Update source',
    updatingSrc: 'Updating source…',
    srcSynced: 'Site source updated',
    srcUpdateFail: 'Failed to update source: ',
    publishing: 'Publishing…',
    publishDone: 'Done',
    liveBuilding: function (s) { return 'Pushed. GitHub is building and deploying… ' + s + 's elapsed' },
    liveOk: function (s) { return 'Live (took ' + s + 's)' },
    liveTimeout: 'Still not live after 4 minutes — the build may have failed. Check the Actions tab of the GitHub repo.',
    liveOpen: 'Open live site',
    myBlogs: 'My blogs',
    searchPh: 'Search note title / path…',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    pubAll: 'Publish all',
    privAll: 'Make all private',
    noConn: 'No connections yet — create one on the right',
    notesHint: function (n, p) { return n + (n === 1 ? ' note · ' : ' notes · ') + p + ' public' },
    pickVault: 'Pick a local vault folder for this blog',
    current: 'Current',
    noVault: 'No local vault',
    vaultMeta: function (n, p) { return n + (n === 1 ? ' note · ' : ' notes · ') + p + ' public' },
    vaultMetaHtml: function (n, p) { return n + (n === 1 ? ' note · ' : ' notes · ') + '<b>' + p + ' public</b>' },
    openSite: '↗ Open site',
    remove: 'Remove',
    removeTip: 'Removes from this list only — your GitHub repo and local vault are untouched',
    removeConfirm: function (name) { return 'Remove the connection "' + name + '"?\\n\\n· The GitHub repo is NOT deleted\\n· Your local Obsidian vault is NOT modified\\n· You can add it again later' },
    removeFail: 'Remove failed: ',
    newBlog: '＋ New blog',
    switchFail: 'Switch failed: ',
    uncategorized: 'Ungrouped',
    countNotes: function (n) { return n + (n === 1 ? ' note' : ' notes') },
    pub: 'Public',
    pri: 'Private',
    toggleFail: 'Toggle failed: ',
    pendingPrompt: function (n) { return n + (n === 1 ? ' change' : ' changes') + ' not published yet — click Publish' },
    chgAdded: 'New',
    chgModified: 'Modified',
    chgDeleted: 'Deleted',
    chgTitle: 'Changes',
    chgNone: 'No pending changes',
    chgCount: function (n) { return n + ' pending' },
    chgJumpTip: 'Click to jump to this note in the folders below',
    chgTipAdded: 'New: not published yet. With auto-sync on, these are published and leave this column by themselves',
    chgTipModified: 'Modified: not published yet. With auto-sync on, these are published and leave this column by themselves',
    chgTipDeleted: 'Deleted: not synced to the site yet. With auto-sync on, these are synced and leave this column by themselves',
    autoSyncTitle: 'Auto-sync',
    autoSyncAdded: 'New',
    autoSyncModified: 'Modified',
    autoSyncDeleted: 'Deleted',
    autoSyncHint: 'Checked types are published automatically — no need to click Publish.',
    autoSyncTipAdded: 'New notes are made public and published automatically',
    autoSyncTipModified: 'Edits to published notes go live automatically (public stays public, private stays private)',
    autoSyncTipDeleted: 'Local deletes or unpublishing also remove them from the site',
    autoSyncSaved: 'Auto-sync settings saved',
    autoSyncFail: 'Save failed: ',
    autoLogTitle: 'Auto-sync log',
    autoLogClear: 'Clear',
    autoLogStartTip: 'When the push started',
    autoLogPushing: 'Pushing',
    autoLogPushed: 'Pushed, building',
    autoLogPushedAt: function (s) { return 'Pushed ' + s + ', building' },
    autoLogLive: function (s) { return 'Updated ' + s },
    autoLogTook: function (s) { return ' (' + s + ')' },
    autoLogFailed: 'Push failed',
    autoLogInterrupted: 'Push interrupted (manager exited) — result unknown',
    autoLogFresh: 'Ran, nothing to push',
    autoLogBuildFailed: 'Build failed',
    autoLogTimeout: 'Build timed out',
    autoLogOpenActions: 'Click to open GitHub Actions',
    autoLogMore: function (n) { return ' +' + n + ' more' },
    autoLogFileAdded: 'added',
    autoLogFileModified: 'modified',
    autoLogFileDeleted: 'deleted',
    noChanges: 'Nothing to sync',
    pending: function (n) { return n + (n === 1 ? ' change pending' : ' changes pending') },
    emptyNoConn: 'No blog connections yet — click “＋ New blog” above.',
    emptyNoNotes: 'No notes in this vault, or the local vault path is wrong. Click the current blog card above to change it.',
    loadFail: 'Load failed: ',
    detail: 'Details',
    save: 'Save',
    create: 'Create & start',
    cancel: 'Cancel',
    vaultTip: 'Vault: ',
    vaultNone: '(not set)',
    setupTitleEdit: 'Blog settings',
    setupTitleNew: 'New blog',
    setupHint: 'One local vault maps to one GitHub repo. Pick the vault, then finish GitHub below in one click.',
    step1: '① Local vault folder',
    chooseFolder: 'Choose folder…',
    pickPlaceholder: 'Click the button to choose a folder',
    step2: '② Name (shown here, and as the site title)',
    namePlaceholder: 'e.g. My Blog',
    step3: '③ GitHub repo (the site is published from here)',
    repoLocked: 'The repo URL is fixed once set — remove this connection and create a new one to switch repos.',
    tabAuto: 'Create a repo for me',
    tabManual: 'I already have a repo',
    repoPlaceholder: 'https://github.com/your-username/repo-name.git',
    repoTip: 'Just paste the repo URL. An empty repo works best (created on GitHub, nothing in it yet).',
    repoNamePlaceholder: 'Repo name (letters/numbers), e.g. my-blog',
    createOnGitHub: 'Create on GitHub',
    goAuthorize: 'Authorize GitHub…',
    needRepoName: 'Enter a repo name first',
    creating: 'Creating…',
    createOk: 'Repo created on GitHub: ',
    createFail: 'Create failed: ',
    tokenReady: '✓ GitHub authorization detected — you can create directly',
    tokenMissing: 'No GitHub authorization yet. Click “Authorize GitHub…” for the one-time setup.',
    pickOk: '✓ Selected: ',
    pickWait: 'Choose a folder in the dialog…',
    pickTimeout: 'No folder was chosen. If the dialog is hidden behind the browser, close the browser window or press Alt+Tab to find it, then try again.',
    pickFail: 'Pick failed: ',
    mustPickVault: 'Choose a local vault folder first',
    mustFillRepo: 'Enter the GitHub repo URL',
    mustCreateRepo: 'Create it under “Create a repo for me” first, or switch to “I already have a repo”',
    saved: 'Saved',
    created: 'Created — click “Publish to GitHub” in the top-right to go live',
    authTitle: 'Connect to GitHub',
    authHint: 'One token is enough: creating a repo, connecting an existing one, and publishing all use it.',
    authClose: 'Close',
    authRetry: 'Check again',
    authBtn: 'GitHub access',
    authBarText: 'Not connected to GitHub yet: creating a repo, connecting one, and publishing all need a one-time authorization.',
    authBarBtn: 'Authorize now',
    authOk: function (login) { return login ? 'Authorized: ' + login : 'Authorized' },
    authUnknown: 'A token is saved here, but GitHub can’t be reached to verify it right now (check network / accelerator).',
    tokenLabel: 'Paste a GitHub personal access token — it is stored on this machine only',
    tokenPh: 'Paste token, e.g. ghp_…',
    tokenSave: 'Save & verify',
    tokenWhere: 'Steps: github.com → avatar (top right) → <b>Settings</b> → <b>Developer settings</b> (bottom of the left sidebar) → <b>Personal access tokens</b> → choose <b>Tokens (classic)</b> → <b>Generate new token (classic)</b> → check <b>repo</b> and <b>workflow</b> → copy the token and paste it here.<br><b>repo</b> covers cloning, pushing, creating repos and syncing the site name; <b>workflow</b> is needed when setting up a new site, because the first push writes .github/workflows/deploy.yml and GitHub rejects it without that scope.<br>⚠️ Set <b>Expiration to “No expiration”</b>: once the token expires, publishing, creating repos and automatic site setup all fail until you generate a new one and paste it here again. Choose no expiration and you never have to think about it (the token is stored on this machine only and is never uploaded).',
    tokenClear: 'Clear the saved token',
    tokenCleared: 'Cleared the saved token',
    checking: 'Checking…',
    authFound: 'GitHub authorization detected',
    authNotFound: 'No authorization detected',
    checkFail: 'Check failed: ',
    publishFail: 'Publish failed: ',
    publishErr: 'Some steps failed',
    pushNetworkFail: "Couldn't reach GitHub (the accelerator is probably off or dropped). Your notes are safe on this machine — turn the accelerator back on and hit Publish again.",
    pushed: ' · Pushed — live in 1~2 minutes',
    logPublic: function (n, c, r) { return n + (n === 1 ? ' public note: ' : ' public notes: ') + c + ' added/updated, ' + r + ' stale removed' },
    logSiteName: function (prev, want) { return 'Site title updated: ' + (prev ? '"' + prev + '" → ' : '') + '"' + want + '"' },
    logFresh: 'Already up to date — nothing to push',
    logPushed: 'Pushed to GitHub — Actions is building (the site updates in 1~2 minutes)',
    logGitFail: 'git failed: ',
    logVarOk: function (name) { return 'Set the site title "' + name + '" as the repo variable SITE_NAME (applies on next build)' },
    logVarNoToken: 'Site title sync skipped: changing repo variables needs GitHub authorization. Set GITHUB_TOKEN and retry, or log in with gh.',
    logVarBadRepo: 'Site title sync skipped: this repo is not on GitHub',
    logVarFail: function (reason, detail) { return 'Site title sync failed (' + reason + '): ' + (detail || '') },
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
    errRepoExists: function (name) { return 'The repo "' + name + '" already exists. Pick another name, or paste its URL under “I already have a repo”.' },
    errCreateRejected: 'GitHub rejected the request: ',
    errCheckScope: 'Check that your token has the repo scope',
    errBadAuth: 'GitHub authorization is invalid or lacks the repo scope. Re-authorize and retry.',
    errCreateFail: function (status) { return 'Create failed (HTTP ' + status + '): ' },
    errConnectFail: 'Could not reach GitHub: ',
    errNoDir: 'Directory exists but is not a git repo: ',
    errGitFail: function (cmd) { return 'git ' + cmd + ' failed' },
    errPathEscaped: 'Path escapes the vault',
    errForbidden: 'Forbidden: only local pages may send requests',
    errPublishing: 'A publish is already running. Please wait for it to finish.',
    ok: 'Done',
  },
};
function guessLang() {
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'zh';
  return /^zh/i.test(nav) ? 'zh' : 'en';
}
function currentLang() {
  try { return localStorage.getItem('manager-lang') || guessLang(); } catch (e) { return guessLang(); }
}
let LANG = currentLang();
function t(key) {
  const d = DICT[LANG] || DICT.zh;
  const v = d[key];
  return typeof v === 'function' ? v : (v || (DICT.zh[key] && typeof DICT.zh[key] === 'function' ? key : v) || key);
}
// tf 只支持两个参数，早期够用；后来 logPublic 需要三个（公开数/新增数/移除数），
// 多传的那个参数被静默丢掉，日志里出现 "undefined stale removed"。改成变长参数。
function tf(key, ...args) {
  const d = DICT[LANG] || DICT.zh;
  const v = d[key];
  return typeof v === 'function' ? v(...args) : v;
}
function applyLang() {
  document.title = t('appTitle');
  document.documentElement.setAttribute('lang', LANG === 'zh' ? 'zh-CN' : 'en');
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) { el.title = t(el.getAttribute('data-i18n-title')); });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
  // 带 HTML 标签的文案（授权指引里有 b / br），只能走 innerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
  const lb = document.getElementById('langBtn');
  if (lb) lb.textContent = LANG === 'zh' ? 'EN' : '中';
}
function toggleLang() {
  LANG = LANG === 'zh' ? 'en' : 'zh';
  try { localStorage.setItem('manager-lang', LANG); } catch (e) { /* 忽略 */ }
  applyLang();
  try { renderVaults(); renderChanges(); renderFolders(); syncAutoSyncUI(); } catch (e) { /* 还没加载完就跳过 */ }
  // 已打开的设置/授权弹窗也要跟着换语言：记下当前状态原样重开
  const sd = document.getElementById('setupDlg');
  if (sd) {
    const nm = document.getElementById('sName') ? document.getElementById('sName').value : '';
    const rv = document.getElementById('sRepo') ? document.getElementById('sRepo').value
      : (document.getElementById('sRepoName') ? document.getElementById('sRepoName').value : '');
    openSetup(setupConn, true);
    if (document.getElementById('sName') && nm) document.getElementById('sName').value = nm;
    if (document.getElementById('sRepo') && rv) {
      document.getElementById('sRepo').value = rv;
      document.getElementById('sRepo').dispatchEvent(new Event('input'));
    }
    if (document.getElementById('sRepoName') && rv) document.getElementById('sRepoName').value = rv;
    if (setupShowPick) setupShowPick(setupPicked);
  }
  const ad = document.getElementById('authDlg');
  if (ad) { ad.remove(); if (authHelpReopen) authHelpReopen(); }
  // 全局授权弹窗（authMainDlg）也要跟随语言：先取出已输入的令牌，重开后再填回
  const ad2 = document.getElementById('authMainDlg');
  if (ad2) {
    const tv = ad2.querySelector('#tokenIn') ? ad2.querySelector('#tokenIn').value : '';
    ad2.remove();
    if (authDialogReopen) {
      authDialogReopen();
      const ni = document.getElementById('authMainDlg');
      if (ni && tv) ni.querySelector('#tokenIn').value = tv;
    }
  }
}

// ---- 明暗主题 ----
// 默认跟随系统；手动切过之后写 localStorage，之后不再跟随。
// 这里用一个立即执行的函数在渲染前设好 data-theme，避免亮→暗闪一下。
function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark' || mode === 'light') root.setAttribute('data-theme', mode);
  else root.removeAttribute('data-theme');
}
function currentThemeMode() {
  try { return localStorage.getItem('manager-theme') || 'system'; } catch { return 'system'; }
}
function isDarkNow() {
  const root = document.documentElement;
  if (root.getAttribute('data-theme') === 'dark') return true;
  if (root.getAttribute('data-theme') === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function toggleTheme() {
  const next = isDarkNow() ? 'light' : 'dark';
  try { localStorage.setItem('manager-theme', next); } catch { /* 忽略 */ }
  applyTheme(next);
  updateThemeBtn();
}
function updateThemeBtn() {
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isDarkNow() ? '☀' : '◐';
}
applyTheme(currentThemeMode());

// 统一请求：有 body 走 POST，无 body 走 GET。
// ⚠️ 但服务端多数写接口（/api/publish、/api/toggle…）**只认 POST**，
// 因此这里显式传 method，避免"无 body 就退化成 GET → 404"。
async function api(path, body, method) {
  const m = method || (body !== undefined ? 'POST' : 'GET');
  const init = { method: m, headers: { 'x-lang': LANG } };
  if (body !== undefined) {
    init.headers['content-type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  const r = await fetch(path, init);
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    const err = new Error(j.error || r.status);
    // 服务端用结构化字段标注「这是授权问题」，客户端据此弹授权窗，
    // 而不是靠错误文案里有没有「授权」两个字（换语言就失效）。
    err.needAuth = !!j.needAuth;
    throw err;
  }
  return r.json();
}

// ---- GitHub 授权（全局入口，不藏在某个弹窗里）----
// 新机器上没有 GitHub 授权时，clone/push 会失败；以前只能在建仓库弹窗里看到指引，
// 用户根本不知道那次失败跟授权有关。这里给一个常驻按钮 + 提示条 + 令牌输入框。
let AUTH = { token: false, login: null, reachable: null };
async function refreshAuth() {
  try {
    const r = await api('/api/auth/status');
    AUTH = { token: !!r.token, login: r.login || null, reachable: r.reachable };
  } catch (e) {
    AUTH = { token: false, login: null, reachable: false };
  }
  updateAuthBar();
  return AUTH;
}
function updateAuthBar() {
  const bar = document.getElementById('authBar');
  if (!bar) return;
  // 已有可用授权就收起提示条；连不上 GitHub（reachable===false）也提示，
  // 因为那正是用户最需要知道的状态（多半是加速器没开）。
  const ok = AUTH.token && AUTH.reachable !== false;
  bar.classList.toggle('hidden', ok);
}
function openAuthDialog() {
  authDialogReopen = openAuthDialog;
  const old = document.getElementById('authMainDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'authMainDlg';
  d.innerHTML =
    '<div class="panel">' +
      '<h2 data-i18n="authTitle"></h2>' +
      '<div class="hint" id="authState"></div>' +
      '<div class="field">' +
        '<label data-i18n="tokenLabel"></label>' +
        '<div class="tokenrow">' +
          '<input id="tokenIn" type="password" autocomplete="off" spellcheck="false" data-i18n-ph="tokenPh">' +
          '<button id="tokenSave" data-i18n="tokenSave"></button>' +
        '</div>' +
        '<div class="hint" style="margin:8px 0 0" data-i18n-html="tokenWhere"></div>' +
        '<div id="tokenMsg"></div>' +
      '</div>' +
      '<div class="actions">' +
        (AUTH.token ? '<button class="ghost" id="authClear" data-i18n="tokenClear"></button>' : '') +
        '<button class="ghost" id="authClose" data-i18n="authClose"></button>' +
        '<button id="authRetry" data-i18n="authRetry"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();
  paintAuthState(d);
  d.querySelector('#authClose').onclick = () => d.remove();
  d.onclick = (e) => { if (e.target === d) d.remove(); };
  const clearBtn = d.querySelector('#authClear');
  if (clearBtn) clearBtn.onclick = async () => {
    try {
      await api('/api/auth/token', { token: '' }, 'POST');
      AUTH = { token: false, login: null, reachable: null };
      d.remove();
      await refreshAuth();
      openAuthDialog();
    } catch (e) { showTokenMsg(d, 'err', e.message); }
  };
  d.querySelector('#tokenSave').onclick = async () => {
    const inp = d.querySelector('#tokenIn');
    const val = (inp.value || '').trim();
    if (!val) { showTokenMsg(d, 'err', t('errTokenShort')); return; }
    const btn = d.querySelector('#tokenSave');
    btn.disabled = true; const oldLabel = btn.textContent; btn.textContent = t('checking');
    try {
      const r = await api('/api/auth/token', { token: val }, 'POST');
      inp.value = '';
      await refreshAuth();
      d.remove();
      setResult('ok', tf('authOk', r.login));
      openAuthDialog();
    } catch (e) {
      showTokenMsg(d, 'err', e.message);
    } finally {
      const b2 = d.querySelector('#tokenSave');
      if (b2) { b2.disabled = false; b2.textContent = oldLabel; }
    }
  };
  d.querySelector('#authRetry').onclick = async () => {
    const b = d.querySelector('#authRetry');
    b.disabled = true; b.textContent = t('checking');
    await refreshAuth();
    b.disabled = false; b.textContent = t('authRetry');
    paintAuthState(d);
  };
}
function paintAuthState(d) {
  const el = d.querySelector('#authState');
  if (!el) return;
  if (AUTH.token && AUTH.reachable !== false) el.textContent = tf('authOk', AUTH.login);
  else if (AUTH.token) el.textContent = t('authUnknown');
  else el.textContent = t('authNotFound');
}
function showTokenMsg(d, kind, text) {
  const box = d.querySelector('#tokenMsg');
  if (!box) return;
  box.className = 'warnbox';
  box.style.marginTop = '8px';
  box.textContent = text;
}
let authDialogReopen = null;
// 全局授权弹窗与「建仓库」弹窗里的指引共用 id 会互相干扰（toggleLang 靠 id 找弹窗），
// 所以全局这个用独立 id。

// ---- 顶部结果反馈 ----
function setResult(kind, text, detail) {  const el = document.getElementById('result');
  el.className = 'result ' + kind;
  el.innerHTML = '';
  // ⚠️ 局部变量不能叫 t：会遮蔽全局的翻译函数 t(key)，下面 t('detail') 就会报
  // "t is not a function"（这个 bug 真实发生过，表现为发布后顶部显示 Publish failed）。
  const span = document.createElement('span'); span.className = 'txt'; span.textContent = text;
  el.appendChild(span);
  if (detail) {
    const d = document.createElement('details');
    const sm = document.createElement('summary'); sm.textContent = t('detail');
    // 日志按「是不是关键成败」分档：非关键行（站名变量同步之类顺带成功的话）
    // 淡一档显示。失败行保持正常亮度，方便在展开后一眼定位。
    const pre = document.createElement('pre');
    for (const line of String(detail).split(String.fromCharCode(10))) {
      const s = document.createElement('span');
      s.textContent = line + String.fromCharCode(10);
      if (!isCriticalLog(line)) s.className = 'dim';
      pre.appendChild(s);
    }
    d.appendChild(sm); d.appendChild(pre); el.appendChild(d);
  }
}
// 判断一行发布日志是否属于「关键成败」。非关键的一般是顺带成功的说明
// （站名变量已写入之类），它们成功与否都不影响内容有没有上线。
function isCriticalLog(line) {
  const s = String(line || '');
  // 站名变量同步是顺带动作，成功失败都不影响内容有没有上线，一律淡显。
  if (s.indexOf('SITE_NAME') >= 0) return false;
  // ⚠️ 关键词必须中英文各写一份：原来只写了中文，英文模式下
  // "Already up to date — nothing to push" 一个都不命中，被判成非关键而淡显，
  // 同一条日志两种语言分档不同（真实踩过）。
  const keys = [
    'git ', 'GitHub',
    '推送', 'push',
    '公开笔记', 'public note',
    '失败', 'failed',
    '无法', 'Could not', "couldn't",
  ];
  for (const k of keys) if (s.indexOf(k) >= 0) return true;
  return false;
}
function clearResult() { document.getElementById('result').className = 'result hidden'; }
// 提示：本段处在服务端 UI 模板字面量内，正则里的反斜杠会被模板字面量先吃掉一层，
// 极易写出「看着对、到浏览器就废」的表达式。这里改用 RegExp 字符串 + 字符类，
// 不写任何反斜杠，彻底避开这层转义。
function shortRepo(repo) {
  return String(repo || '')
    .replace(new RegExp('^https?://github[.]com/', 'i'), '')
    .replace(new RegExp('[.]git$', 'i'), '');
}

async function loadState() {
  const next = await api('/api/state');
  // 注意：不能整体替换 S（S = next）。服务端不返回 collapsed（那是纯前端的展示状态），
  // 整体替换会把 S.collapsed 抹掉，下一行 renderFolders() 读 S.collapsed.has 就抛
  // "Cannot read properties of undefined"。这里只合并服务端字段，保留本地折叠状态。
  S = { ...next, collapsed: S.collapsed ?? new Set() };
  renderVaults(); renderChanges(); renderFolders(); syncAutoSyncUI();
}

// ---- 变更三栏（新增 / 修改 / 删除），列在所有文件夹上方 ----
// 需求：这三类要在文件夹外面单独列出来，且「发布」之后清空（那些算旧的改动）。
// 清空不是前端擦一下 —— 服务端发布成功后会推进水位，下次拉状态它们自然就不在了，
// 所以这里只管照着 S.changes 画。
function renderChanges() {
  const box = document.getElementById('chgcols');
  const hint = document.getElementById('chgHint');
  if (!box) return;
  const CH = manualChanges();
  const titleOf = (p) => {
    const n = S.notes.find((x) => x.path === p);
    return n ? n.title : p.replace(/\.(md|markdown)$/i, '').split('/').pop();
  };
  const total = CH.added.length + CH.modified.length + CH.deleted.length;
  if (hint) hint.textContent = total ? tf('chgCount', total) : '';
  box.innerHTML = '';
  const cols = [
    { key: 'add', label: t('chgAdded'), list: CH.added, tip: t('chgTipAdded') },
    { key: 'mod', label: t('chgModified'), list: CH.modified, tip: t('chgTipModified') },
    { key: 'del', label: t('chgDeleted'), list: CH.deleted, tip: t('chgTipDeleted') },
  ];
  for (const c of cols) {
    const col = document.createElement('div');
    col.className = 'chgcol';
    const head = document.createElement('div');
    head.className = 'ch';
    head.title = c.tip;
    head.innerHTML = '<span class="chg ' + c.key + '">' + esc(c.label) + '</span><span class="n">' + c.list.length + '</span>';
    col.appendChild(head);
    if (!c.list.length) {
      const e = document.createElement('div');
      e.className = 'empty';
      e.textContent = '—';
      col.appendChild(e);
    } else {
      const ul = document.createElement('ul');
      for (const p of c.list) {
        const li = document.createElement('li');
        li.title = p + '\\n' + t('chgJumpTip');
        const ts = document.createElement('span');
        ts.className = 't';
        ts.textContent = titleOf(p);
        const ps = document.createElement('span');
        ps.className = 'p';
        ps.textContent = p;
        li.appendChild(ts);
        li.appendChild(ps);
        // 新增的笔记：这里也给一个公开开关，和下面文件夹里的那个是同一件事
        if (c.key === 'add') {
          const n = S.notes.find((x) => x.path === p);
          if (n) {
            const sw = document.createElement('button');
            sw.className = 'sw' + (n.isPublic ? ' on' : '');
            sw.title = n.isPublic ? t('pri') : t('pub');
            sw.onclick = async (e) => {
              e.stopPropagation();
              try { await api('/api/toggle', { path: p, pub: !n.isPublic }); }
              catch (err) { setResult('err', t('toggleFail') + err.message); return; }
              n.isPublic = !n.isPublic;
              await refreshChanges();
              promptPending();
            };
            li.appendChild(sw);
          }
        }
        li.onclick = () => focusNote(p);
        ul.appendChild(li);
      }
      col.appendChild(ul);
    }
    box.appendChild(col);
  }
}

// 点变更条目：展开它所在的文件夹并滚过去，高亮一下（否则「删除了某篇」这种
// 在长列表里根本找不到）
function focusNote(p) {
  const f = p.includes('/') ? p.split('/').slice(0, -1).join('/') : '';
  S.collapsed.delete(f);
  renderFolders();
  const rows = [...document.querySelectorAll('#folders li, #ungrouped li')];
  const el = rows.find((li) => { const t0 = li.querySelector('.t'); return t0 && t0.title === p; });
  if (!el) return;
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 1400);
}

// 自动同步的三个开关：服务端是唯一真相，这里只负责把界面勾选状态对齐过去。
function syncAutoSyncUI() {
  const a = S.autoSync || { added: false, modified: true, deleted: false };
  const put = (id, v) => { const el = document.getElementById(id); if (el) el.checked = !!v; };
  put('as-added', a.added); put('as-modified', a.modified); put('as-deleted', a.deleted);
  renderAutoLog();
}
// 自动同步流水：把「后台什么时候开始推、动了哪些文件、推没推上去、有没有更新成功」显示出来。
// 自动同步常在没人盯着屏幕的时候发生，没有这条记录就只能靠猜。
function renderAutoLog() {
  const box = document.getElementById('autolog');
  const head = document.getElementById('autologHead');
  if (!box) return;
  // 老版本记过「有改动但开关没开」这种条目，用户明确说不需要，这里直接不画
  const log = (Array.isArray(S.autoLog) ? S.autoLog : []).filter((e) => e && e.kind !== 'skip');
  // 界面每 8 秒轮询一次就会重画；不记住滚动位置的话，用户刚往下滚就又跳回顶部
  const keepTop = box.scrollTop;
  box.innerHTML = '';
  if (head) head.style.display = log.length ? '' : 'none';
  if (!log.length) return;
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const hhmm = (ms) => { const d = new Date(ms); return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); };
  // 推送 → 上线之间的耗时，用「3 分 12 秒」这种说法，比秒数好读
  const dur = (sec) => {
    sec = Math.max(0, Math.round(sec));
    const en = LANG === 'en';
    if (sec < 60) return sec + (en ? 's' : ' 秒');
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (!s) return m + (en ? 'm' : ' 分');
    return m + (en ? 'm ' : ' 分 ') + s + (en ? 's' : ' 秒');
  };
  const baseOf = (p) => p.replace(/\.(md|markdown)$/i, '').split('/').pop();
  for (const e of log) {
    const row = document.createElement('div');
    row.className = 'al';
    const top = document.createElement('div');
    top.className = 'al-top';
    const tm = document.createElement('span');
    tm.className = 'tm';
    tm.textContent = hhmm(e.at);
    tm.title = t('autoLogStartTip');
    top.appendChild(tm);
    const st = document.createElement('span');
    const c = e.counts || {};
    const cs = document.createElement('span');
    cs.className = 'cs';
    cs.textContent = [
      c.added ? '+' + c.added : '',
      c.modified ? '~' + c.modified : '',
      c.deleted ? '-' + c.deleted : '',
    ].filter(Boolean).join(' ');
    const pushedAt = Number(e.pushedAt) || 0;
    // 状态按「结论优先」排列：失败 > 构建失败 > 超时 > 已更新 > 没东西可推 > 已推送 > 开始推送
    if (e.failed) {
      st.className = 'st bad';
      st.textContent = t(e.interrupted ? 'autoLogInterrupted' : 'autoLogFailed');
      st.title = String(e.error || e.failKind || '');
    } else if (e.buildFailed) {
      st.className = 'st bad'; st.textContent = t('autoLogBuildFailed');
      st.title = String(e.buildConclusion || '');
    } else if (e.liveTimeout) {
      st.className = 'st bad'; st.textContent = t('autoLogTimeout');
      st.title = String(e.buildStatus || '');
    } else if (e.live) {
      st.className = 'st ok'; st.textContent = tf('autoLogLive', hhmm(e.liveAt));
    } else if (e.pushed === false) {
      // 发布流程跑完但没东西可推（仓库是新鲜的），不算失败，但也该让人看见
      st.className = 'st skip'; st.textContent = t('autoLogFresh');
    } else if (pushedAt) {
      st.className = 'st wait'; st.textContent = tf('autoLogPushedAt', hhmm(pushedAt));
    } else {
      st.className = 'st wait'; st.textContent = t('autoLogPushing');
    }
    top.appendChild(st);
    if (cs.textContent.trim()) top.appendChild(cs);
    // 从「开始推送」到「确认更新」一共花了多久
    if (e.live && e.liveAt > e.at) {
      const took = document.createElement('span');
      took.className = 'took';
      took.textContent = tf('autoLogTook', dur((e.liveAt - e.at) / 1000));
      top.appendChild(took);
    }
    if (e.commit) {
      const sh = document.createElement('span');
      sh.className = 'sha'; sh.textContent = e.commit.slice(0, 7);
      top.appendChild(sh);
    }
    // 构建失败 / 超时：点这一行直接去 GitHub Actions 看看到底怎么了
    if ((e.buildFailed || e.liveTimeout) && e.buildUrl) {
      top.style.cursor = 'pointer';
      top.title = t('autoLogOpenActions') + '\\n' + e.buildUrl;
      top.onclick = () => window.open(e.buildUrl, '_blank');
    }
    row.appendChild(top);
    // 第二行：这次到底动了哪些文件（三栏里不再重复列，改由这里说明）
    const f = e.files || {};
    const segs = [];
    const pushSeg = (arr, cls, label) => {
      if (!Array.isArray(arr) || !arr.length) return;
      const names = arr.slice(0, 3).map(baseOf);
      let txt = label + ' ' + names.join('、');
      if (arr.length > names.length) txt += tf('autoLogMore', arr.length - names.length);
      const sp = document.createElement('span');
      sp.className = 'fs ' + cls;
      sp.textContent = txt;
      sp.title = arr.join('\\n');
      segs.push(sp);
    };
    pushSeg(f.added, 'add', t('autoLogFileAdded'));
    pushSeg(f.modified, 'mod', t('autoLogFileModified'));
    pushSeg(f.deleted, 'del', t('autoLogFileDeleted'));
    if (segs.length) {
      const fl = document.createElement('div');
      fl.className = 'al-files';
      for (const sp of segs) fl.appendChild(sp);
      row.appendChild(fl);
    }
    box.appendChild(row);
  }
  // 默认只露 4 行：按前 4 行的真实高度算，带不带文件行都能正好放下 4 条
  const rows = [...box.children];
  const gap = parseFloat(getComputedStyle(box).rowGap) || 0;
  let h = 0;
  rows.slice(0, 4).forEach((r, i) => { h += r.offsetHeight + (i ? gap : 0); });
  box.style.maxHeight = h > 0 ? Math.ceil(h) + 'px' : '150px';
  if (keepTop) box.scrollTop = keepTop;
}

// 「需要你处理的」改动：自动同步开关关着的那几类。
// 开关开着的类由后台自己发，只在流水里说明，不放进三栏（用户明确要求）。
// 例外：最近一次自动同步推送失败了，就把对应那几类放回栏里提醒 ——
// 否则一次失败的推送会让改动（尤其「转私密」这种）悄悄留在线上。
function manualChanges() {
  const CH = S.changes || {};
  const AS = S.autoSync || {};
  const last = (Array.isArray(S.autoLog) ? S.autoLog : []).find((e) => e && e.kind !== 'skip') || null;
  const fc = last && last.failed ? (last.counts || {}) : null;
  const keep = (k) => (AS[k] ? !!(fc && fc[k] > 0) : true);
  return {
    added: keep('added') ? (CH.added || []) : [],
    modified: keep('modified') ? (CH.modified || []) : [],
    deleted: keep('deleted') ? (CH.deleted || []) : [],
  };
}

// 顶栏提示：只说「还有几处要发布」，不再逐条报「某某已设为私密，记得发布」。
// 自动同步能处理的改动不提示（它们也不会出现在三栏里）。
let _pendingPrompt = '';
function promptPending() {
  const m = manualChanges();
  const n = m.added.length + m.modified.length + m.deleted.length;
  const el = document.getElementById('result');
  if (!n) {
    // 只撤掉自己上一条提示，别把「发布成功」这类结果擦掉
    if (_pendingPrompt && el && el.textContent.trim() === _pendingPrompt) {
      el.className = 'result';
      el.innerHTML = '';
    }
    _pendingPrompt = '';
    return;
  }
  const msg = tf('pendingPrompt', n);
  if (msg === _pendingPrompt) return;
  _pendingPrompt = msg;
  setResult('ok', msg);
}

// 清空自动同步流水（服务端落盘，重启也不会回来）
async function clearAutoLogUI() {
  try {
    await api('/api/autolog/clear', {});
  } catch (e) {
    setResult('err', t('autoSyncFail') + e.message);
    return;
  }
  S.autoLog = [];
  renderAutoLog();
  renderChanges();
  promptPending();
}
async function setAutoSync(type, value) {
  try {
    const r = await api('/api/autosync', { type, value });
    S.autoSync = r.autoSync;
    setResult('ok', t('autoSyncSaved'));
  } catch (e) {
    setResult('err', t('autoSyncFail') + e.message);
  }
  // 无论成败都以服务端返回为准重新对齐（失败时把勾选回滚）
  syncAutoSyncUI();
  // 开关一变，「哪些算待处理」就变了：三栏、文件夹徽标、顶部提示都要跟着重算，
  // 否则会残留「有 N 处改动还没发布」而三栏已经是 0。
  renderChanges(); renderFolders(); promptPending();
}

// ---- 多库切换：卡片式 ----
function renderVaults() {
  const wrap = document.getElementById('vaults');
  wrap.innerHTML = '';
  const hint = document.getElementById('vaultHint');

  if (S.connections.length === 0) {
    hint.textContent = t('noConn');
  } else {
    const cur = S.connections.find((c) => c.id === S.active);
    hint.textContent = cur && cur.vaultOk
      ? tf('notesHint', cur.noteCount, cur.publicCount)
      : t('pickVault');
  }

  for (const c of S.connections) {
    const b = document.createElement('button');
    b.className = 'vault' + (c.id === S.active ? ' on' : '');
    const badge = c.id === S.active ? '<span class="badge">' + t('current') + '</span>' : '';
    const meta = !c.vaultOk
      ? '<span class="vault-bad">' + t('noVault') + '</span>'
      : tf('vaultMetaHtml', c.noteCount, c.publicCount);
    b.innerHTML =
      badge +
      '<div class="vname"></div>' +
      '<div class="vrepo"></div>' +
      '<div class="vmeta">' + meta + '</div>';
    b.querySelector('.vname').textContent = c.name;
    b.querySelector('.vrepo').textContent = shortRepo(c.repo) + ' · ' + c.branch;
    b.title = c.repo + '\\n' + t('vaultTip') + (c.vaultPath || t('vaultNone'));

    // 这个库对应的线上网页：一节直接可点的链接
    const url = c.siteUrl;
    if (url) {
      const a = document.createElement('a');
      a.className = 'vlink';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = t('openSite');
      a.title = url;
      a.onclick = (ev) => { ev.stopPropagation(); }; // 别触发卡片本身的「切换/设置」
      b.appendChild(a);
    }
    b.onclick = async () => {
      if (c.id === S.active) { openSetup(c); return; }
      b.disabled = true;
      try { await api('/api/connection/switch', { id: c.id }); clearResult(); await loadState(); }
      catch (e) { setResult('err', t('switchFail') + e.message); b.disabled = false; }
    };

    const del = document.createElement('button');
    del.className = 'del'; del.textContent = t('remove');
    del.title = t('removeTip');
    del.onclick = async (ev) => {
      ev.stopPropagation();
      if (!confirm(tf('removeConfirm', c.name))) return;
      try { await api('/api/connection/remove', { id: c.id }); await loadState(); }
      catch (e) { alert(t('removeFail') + e.message); }
    };
    b.appendChild(del);
    b.classList.add('has-del');
    wrap.appendChild(b);
  }

  const add = document.createElement('button');
  add.className = 'vault new';
  add.innerHTML = '<span style="font-size:16px">＋</span> ' + t('newBlog').replace('＋ ', '');
  add.onclick = () => openSetup(null);
  wrap.appendChild(add);
}

// ---- 新建/修改连接：一个库 + 一个仓库，一步完成 ----
let setupConn = null, setupPicked = '';
// 这两个句柄供切语言时原样重开弹窗用（弹窗内容是函数内闭包，外部拿不到）
let setupShowPick = null, authHelpReopen = null;
function openSetup(conn, keepPicked) {
  setupConn = conn || null;
  // keepPicked：切语言时重开弹窗要留住用户已经选好的文件夹
  if (!keepPicked) setupPicked = conn ? conn.vaultPath || '' : '';
  const old = document.getElementById('setupDlg');
  if (old) old.remove();

  const dlg = document.createElement('div');
  dlg.className = 'dialog'; dlg.id = 'setupDlg';
  // 注意：这段 HTML 处在服务端 UI 模板字面量内部，因此不能用反引号与模板占位符，
  // 只能拼接字符串（否则反引号会提前闭合外层模板）。占位符由下面的 textContent 填。
  dlg.innerHTML =
    '<div class="panel">' +
      '<h2 id="sTitle"></h2>' +
      '<div class="hint" data-i18n="setupHint"></div>' +
      '<div class="field">' +
        '<label data-i18n="step1"></label>' +
        '<div class="pickrow">' +
          '<input id="sVault" readonly data-i18n-ph="pickPlaceholder">' +
          '<button class="ghost" id="sPick" data-i18n="chooseFolder"></button>' +
        '</div>' +
        '<div class="picker" id="sPickMsg"></div>' +
      '</div>' +
      '<div class="field">' +
        '<label data-i18n="step2"></label>' +
        '<input id="sName" data-i18n-ph="namePlaceholder">' +
      '</div>' +
      '<div class="field">' +
        '<label data-i18n="step3"></label>' +
        '<div id="sRepoArea"></div>' +
      '</div>' +
      '<div id="sWarn"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="sCancel" data-i18n="cancel"></button>' +
        '<button id="sSave"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(dlg);
  applyLang();   // 填上面那批 data-i18n / data-i18n-ph

  const $ = (id) => dlg.querySelector('#' + id);
  $('sTitle').textContent = conn ? t('setupTitleEdit') : t('setupTitleNew');
  $('sSave').textContent = conn ? t('save') : t('create');
  $('sVault').value = setupPicked;
  $('sName').value = conn ? conn.name : '';

  // ---- ③ GitHub 仓库区：分「已有连接（只读）」与「新建（三选一）」 ----
  // 用户之前的困惑：「连接 GitHub」被拆成两个按钮、不知道去哪建仓库、不知道要授权。
  // 现在收成一块：默认一键新建，选「我已建好」才出现地址输入框。
  const repoArea = $('sRepoArea');
  let repoMode = 'auto';           // auto = 一键新建；manual = 我已有仓库
  let tokenOk = false;             // 本机是否已有 GitHub 授权
  let repoVal = conn ? conn.repo : '';

  const renderRepoArea = () => {
    repoArea.innerHTML = '';
    if (conn) {
      const ro = document.createElement('input');
      ro.value = conn.repo; ro.readOnly = true;
      repoArea.appendChild(ro);
      const tip = document.createElement('div');
      tip.className = 'picker';
      tip.textContent = t('repoLocked');
      repoArea.appendChild(tip);
      return;
    }

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    const mkTab = (key, label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tab' + (repoMode === key ? ' on' : '');
      b.textContent = label;
      b.onclick = () => { repoMode = key; renderRepoArea(); };
      return b;
    };
    tabs.appendChild(mkTab('auto', t('tabAuto')));
    tabs.appendChild(mkTab('manual', t('tabManual')));
    repoArea.appendChild(tabs);

    if (repoMode === 'manual') {
      const inp = document.createElement('input');
      inp.id = 'sRepo'; inp.value = repoVal;
      inp.placeholder = t('repoPlaceholder');
      inp.oninput = () => { repoVal = inp.value; };
      repoArea.appendChild(inp);
      const tip = document.createElement('div');
      tip.className = 'picker';
      tip.textContent = t('repoTip');
      repoArea.appendChild(tip);
    } else {
      // 一键新建：只需一个仓库名
      const row = document.createElement('div');
      row.className = 'pickrow';
      const inp = document.createElement('input');
      inp.id = 'sRepoName';
      inp.placeholder = t('repoNamePlaceholder');
      inp.value = repoVal ? (repoVal.split('/').pop() || '').replace(/\.git$/, '') : '';
      row.appendChild(inp);
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'ghost';
      btn.id = 'sCreateRepo';
      btn.textContent = tokenOk ? t('createOnGitHub') : t('goAuthorize');
      btn.onclick = async () => {
        const rn = (inp.value || '').trim();
        if (!rn) { alert(t('needRepoName')); return; }
        if (!tokenOk) { showAuthHelp(); return; }
        btn.disabled = true; btn.textContent = t('creating');
        try {
          const r = await api('/api/repo/create', { repoName: rn, private: false }, 'POST');
          repoVal = r.repo;
          setResult('ok', t('createOk') + r.repo);
          renderRepoArea();
        } catch (e) {
          repoArea.appendChild(warnLine(t('createFail') + e.message));
        } finally {
          const b2 = document.getElementById('sCreateRepo');
          if (b2) { b2.disabled = false; b2.textContent = t('createOnGitHub'); }
        }
      };
      row.appendChild(btn);
      repoArea.appendChild(row);

      const tip = document.createElement('div');
      tip.className = 'picker' + (tokenOk ? ' ok' : '');
      tip.textContent = tokenOk ? t('tokenReady') : t('tokenMissing');
      repoArea.appendChild(tip);
    }
  };

  const warnLine = (text) => {
    const d = document.createElement('div');
    d.className = 'warnbox'; d.style.marginTop = '8px';
    d.textContent = text;
    return d;
  };

  // 授权指引：不假装能替用户输密码，直接给出最短可行路径
  const showAuthHelp = () => {
    authHelpReopen = showAuthHelp;
    const old2 = document.getElementById('authDlg');
    if (old2) old2.remove();
    const d2 = document.createElement('div');
    d2.className = 'dialog'; d2.id = 'authDlg';
    d2.innerHTML =
      '<div class="panel">' +
        '<h2 data-i18n="authTitle"></h2>' +
        '<div class="hint" data-i18n="authHint"></div>' +
        '<div class="warnbox" data-i18n-html="tokenWhere"></div>' +
        '<div class="actions">' +
          '<button class="ghost" id="authClose" data-i18n="authClose"></button>' +
          '<button id="authRetry" data-i18n="authRetry"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d2);
    applyLang();
    d2.querySelector('#authClose').onclick = () => d2.remove();
    d2.onclick = (e) => { if (e.target === d2) d2.remove(); };
    d2.querySelector('#authRetry').onclick = async () => {
      const b = d2.querySelector('#authRetry');
      b.disabled = true; b.textContent = t('checking');
      try {
        const r = await api('/api/auth/status');
        tokenOk = !!r.token;
        if (tokenOk) { d2.remove(); setResult('ok', t('authFound')); renderRepoArea(); }
        else { b.disabled = false; b.textContent = t('authRetry'); setResult('err', t('authNotFound')); }
      } catch (e) {
        b.disabled = false; b.textContent = t('authRetry');
        setResult('err', t('checkFail') + e.message);
      }
    };
  };

  renderRepoArea();
  // 后台问一次有没有授权（不阻塞界面）
  api('/api/auth/status').then((r) => {
    tokenOk = !!r.token;
    if (!conn) renderRepoArea();
  }).catch(() => {});

  const showPick = (p) => {
    setupShowPick = showPick;
    const m = $('sPickMsg');
    if (!p) { m.className = 'picker'; m.textContent = ''; return; }
    // 库里必须有 .obsidian 才是合法 Obsidian 库；没有也让用户看到自己选了什么
    m.className = 'picker ok';
    m.textContent = t('pickOk') + p;
    if (!conn && !$('sName').value) {
      // UI 模板里的反斜杠要按「浏览器最终看到的源码」算层数，这里干脆不用正则：
      // 文件里写四个反斜杠 = 模板求值后两个 = 字符串字面量一个反斜杠
      const sep = p.indexOf('\\\\') >= 0 ? '\\\\' : '/'
      const parts = p.split(sep)
      const base = parts.filter(Boolean).pop() || ''
      if (base) $('sName').value = base;
    }
  };
  showPick(setupPicked);

  $('sPick').onclick = async () => {
    $('sPick').disabled = true; $('sPick').textContent = t('pickWait');
    // 原生文件夹对话框是模态的，服务端会一直等用户点完（最长 5 分钟）。
    // 万一对话框被浏览器挡住、用户以为卡死了，这里给一个更短的兜底：
    // 到点后解锁按钮并提示怎么找回弹窗，避免界面永远停在「请在弹窗中选择…」。
    let timedOut = false;
    const guard = setTimeout(() => {
      timedOut = true;
      $('sPick').disabled = false; $('sPick').textContent = t('chooseFolder');
      $('sPickMsg').className = 'picker bad';
      $('sPickMsg').textContent = t('pickTimeout');
    }, 200000);
    try {
      const r = await api('/api/browse', {}, 'POST');
      if (timedOut) return;
      if (r.path) { setupPicked = r.path; $('sVault').value = r.path; showPick(r.path); }
    } catch (e) {
      if (!timedOut) { $('sPickMsg').className = 'picker bad'; $('sPickMsg').textContent = t('pickFail') + e.message; }
    }
    finally { clearTimeout(guard); if (!timedOut) { $('sPick').disabled = false; $('sPick').textContent = t('chooseFolder'); } }
  };

  const close = () => dlg.remove();
  $('sCancel').onclick = close;
  dlg.onclick = (e) => { if (e.target === dlg) close(); };

  $('sSave').onclick = async () => {
    const warn = $('sWarn');
    warn.innerHTML = '';
    const name = $('sName').value.trim();
    if (!setupPicked) { warn.innerHTML = '<div class="warnbox">' + t('mustPickVault') + '</div>'; return; }
    if (!repoVal) {
      warn.innerHTML = '<div class="warnbox">' + (conn ? t('mustFillRepo') : t('mustCreateRepo')) + '</div>';
      return;
    }
    $('sSave').disabled = true;
    try {
      if (conn) {
        // 已有连接：只更新本地库路径与显示名
        const r = await api('/api/connection/vault', { vaultPath: setupPicked, id: conn.id });
        if (name && name !== conn.name) await api('/api/connection/rename', { id: conn.id, name });
        if (r && r.warn) warn.innerHTML = '<div class="warnbox">' + esc(r.warn) + '</div>';
      } else {
        const r = await api('/api/connection/setup', {
          name, repo: repoVal, branch: 'main', vaultPath: setupPicked, initFromTemplate: true,
        });
        if (r && r.warn) { warn.innerHTML = '<div class="warnbox">' + esc(r.warn) + '</div>'; $('sSave').disabled = false; return; }
      }
      close();
      setResult('ok', conn ? t('saved') : t('created'));
      await loadState();
    } catch (e) {
      warn.innerHTML = '<div class="warnbox">' + esc(e.message) + '</div>';
      $('sSave').disabled = false;
      // 建连接时因为「没有 GitHub 授权」失败，是最常见的卡点：
      // 当场把授权弹窗打开，用户不用自己去找入口。
      if (e.needAuth) openAuthDialog();
    }
  };
}

// HTML 转义：拼 innerHTML 时必须过一遍（文件夹名、笔记路径、服务端错误文案都可能带 < > "）。
// 同一份 UI 里 setResult 用 textContent，这里却拼字符串，转义纪律不一致曾是 XSS 缺口。
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function renderFolders() {
  const q = document.getElementById('q').value.trim().toLowerCase();
  const grid = document.getElementById('folders');
  grid.innerHTML = '';
  // 与上面三栏用同一份口径：自动同步开关开着的类别由后台自己发，不算「待处理」，
  // 否则文件夹里会一直挂着 ~ / - 徽标，跟三栏显示的 0 对不上。
  const CH = manualChanges();
  // path -> 'add' | 'mod' | 'del'，用于给每一行打标签
  const chgOf = new Map();
  for (const p of CH.added) chgOf.set(p, 'add');
  for (const p of CH.modified) chgOf.set(p, 'mod');
  for (const p of CH.deleted) chgOf.set(p, 'del');

  const folders = new Map();
  const push = (n) => {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    if (!folders.has(f)) folders.set(f, []);
    folders.get(f).push(n);
  };
  for (const n of S.notes) {
    if (q && !(n.title + n.path).toLowerCase().includes(q)) continue;
    push(n);
  }
  // 线上有、本地已经没有的笔记：也挂进所属文件夹，用删除样式显示，
  // 否则用户只会看到「线上多出来一篇」却在这个列表里找不到它。
  // 注意：本地还在、只是关了 public 的笔记已经在 S.notes 里（会被打上「删除」标签），
  // 这里必须跳过，否则同一篇会在列表里出现两次。
  const localPaths = new Set(S.notes.map((n) => n.path));
  for (const p of CH.deleted) {
    if (localPaths.has(p)) continue;
    if (q && !p.toLowerCase().includes(q)) continue;
    push({ path: p, title: p.replace(/\.(md|markdown)$/i, '').split('/').pop(), isPublic: true, gone: true });
  }
  const keys = [...folders.keys()].sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a < b ? -1 : 1));
  const ungroupedEl = document.getElementById('ungrouped');
  if (ungroupedEl) ungroupedEl.innerHTML = '';
  const rest = [];   // 有文件夹的盒子，稍后按列分配
  for (const f of keys) {
    const items = folders.get(f);
    // 条目数按列表里实际显示的行算（已删除的也算一行，否则只剩「删除」项的文件夹会显示 0 篇）
    const realCount = items.length;
    // 有改动的排前面：新增 → 修改 → 删除 → 未变
    const rank = (n) => { const c = n.gone ? 'del' : chgOf.get(n.path); return c === 'add' ? 0 : c === 'mod' ? 1 : c === 'del' ? 2 : 3; };
    items.sort((a, b) => rank(a) - rank(b));
    const cntAdd = items.filter((n) => !n.gone && chgOf.get(n.path) === 'add').length;
    const cntMod = items.filter((n) => !n.gone && chgOf.get(n.path) === 'mod').length;
    const cntDel = items.filter((n) => n.gone || chgOf.get(n.path) === 'del').length;
    const collapsed = S.collapsed.has(f);   // 收起状态记在 S.collapsed 里，跨重渲染保留
    const box = document.createElement('div'); box.className = 'box';
    const head = document.createElement('div'); head.className = 'box-head';
    head.innerHTML = '<span class="chev' + (collapsed ? '' : ' open') + '">▶</span><span class="name">' + esc(f || t('uncategorized')) + '</span>';
    // 文件夹上的变更摘要：+新增 ~修改 -删除
    const sum = document.createElement('span'); sum.className = 'sum';
    const chip = (cls, label, tip) => { const s = document.createElement('span'); s.className = 'chg ' + cls; s.textContent = label; s.title = tip; sum.appendChild(s); };
    if (cntAdd) chip('add', '+' + cntAdd, t('chgTipAdded'));
    if (cntMod) chip('mod', '~' + cntMod, t('chgTipModified'));
    if (cntDel) chip('del', '-' + cntDel, t('chgTipDeleted'));
    if (sum.children.length) head.appendChild(sum);
    const cnt = document.createElement('span'); cnt.className = 'cnt'; cnt.textContent = tf('countNotes', realCount);
    head.appendChild(cnt);
    const mk = (label, cls, pub) => { const b = document.createElement('button'); b.className = 'mini ' + cls; b.textContent = label; b.onclick = (e) => { e.stopPropagation(); toggleBatch(f, pub); }; return b; };
    head.appendChild(mk(t('pubAll'), 'green', true));
    head.appendChild(mk(t('privAll'), '', false));
    head.onclick = () => {
      const nowCollapsed = !S.collapsed.has(f);
      if (nowCollapsed) S.collapsed.add(f); else S.collapsed.delete(f);
      const list = box.querySelector('ul');
      list.style.display = nowCollapsed ? 'none' : '';
      head.querySelector('.chev').classList.toggle('open', !nowCollapsed);
    };
    box.appendChild(head);
    const ul = document.createElement('ul');
    if (collapsed) ul.style.display = 'none';
    for (const n of items) {
      const chg = n.gone ? 'del' : chgOf.get(n.path) || null;
      const li = document.createElement('li');
      if (n.gone) li.className = 'gone';
      // 变更标签：新增/修改/删除
      if (chg) {
        const b = document.createElement('span');
        b.className = 'chg ' + chg;
        b.textContent = t(chg === 'add' ? 'chgAdded' : chg === 'mod' ? 'chgModified' : 'chgDeleted');
        b.title = t(chg === 'add' ? 'chgTipAdded' : chg === 'mod' ? 'chgTipModified' : 'chgTipDeleted');
        li.appendChild(b);
      }
      const ts = document.createElement('span'); ts.className = 't'; ts.title = n.path; ts.textContent = n.title;
      li.appendChild(ts);
      // 已删除的条目（线上有、本地没了）不再显示公开/私密标签，它已经不存在了
      if (!n.gone) {
        const tag = document.createElement('span');
        tag.className = n.isPublic ? 'pub' : 'pri';
        tag.textContent = n.isPublic ? t('pub') : t('pri');
        li.appendChild(tag);
      }
      if (!n.gone) {
        // 公开开关：新增的笔记也走同一个开关，和文件夹上的「全部公开/全部私密」联动
        const sw = document.createElement('button'); sw.className = 'sw' + (n.isPublic ? ' on' : '');
        sw.onclick = async () => {
          try { await api('/api/toggle', { path: n.path, pub: !n.isPublic }); }
          catch (e) { setResult('err', t('toggleFail') + e.message); return; }
          n.isPublic = !n.isPublic;
          // 公开状态一变，变更分类（新增/删除）也跟着变，重新拉一次状态
          await refreshChanges();
          promptPending();
        };
        li.appendChild(sw);
      }
      ul.appendChild(li);
    }
    box.appendChild(ul);
    // 库根目录下的笔记（没有文件夹）单独一块，不混进文件夹列
    if (f === '' && ungroupedEl) ungroupedEl.appendChild(box);
    else rest.push(box);
  }
  // 文件夹按列分配：第 i 个文件夹固定落在第 i % N 列。
  // 展开/收起时只有它自己那一列变高，其它列纹丝不动，也不会因为行高对齐留下空白。
  if (rest.length) {
    const nCols = Math.max(1, Math.min(3, Math.floor(((grid.clientWidth || window.innerWidth) + 12) / 332)));
    const cols = [];
    for (let i = 0; i < nCols; i++) {
      const col = document.createElement('div');
      col.className = 'grid-col';
      grid.appendChild(col);
      cols.push(col);
    }
    rest.forEach((box, i) => cols[i % nCols].appendChild(box));
  } else if (!(ungroupedEl && ungroupedEl.children.length) && S.notes.length === 0 && CH.deleted.length === 0) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.flex = '1 1 0';
    card.textContent = S.connections.length === 0 ? t('emptyNoConn') : t('emptyNoNotes');
    grid.appendChild(card);
  }
}

// 窗口宽度变化时重新分列（列数变了要重新分配文件夹），防抖 150ms
let _gridResizeT = 0;
window.addEventListener('resize', () => {
  clearTimeout(_gridResizeT);
  _gridResizeT = setTimeout(() => { if (S.notes) renderFolders(); }, 150);
});

// 只刷新「变更分类 + 笔记列表」，用于公开开关切换后同步标签（不整页重载）
async function refreshChanges() {
  try {
    const next = await api('/api/state');
    S.notes = next.notes;
    S.changes = next.changes;
    S.autoSync = next.autoSync;
    if (Array.isArray(next.autoLog)) S.autoLog = next.autoLog;
    renderChanges(); renderFolders(); updateVaultCounts(); renderAutoLog();
  } catch {
    /* 刷新失败不影响主流程，下次 loadState 会纠正 */
  }
}
// 切公开状态后，只更新卡片上的计数，不整页重渲染（避免滚动位置丢失）
function updateVaultCounts() {
  const cur = S.connections.find((c) => c.id === S.active);
  if (!cur) return;
  cur.publicCount = S.notes.filter((n) => n.isPublic).length;
  document.getElementById('vaultHint').textContent = tf('notesHint', cur.noteCount, cur.publicCount);
  const card = document.querySelector('.vault.on .vmeta');
  if (card) card.innerHTML = tf('vaultMetaHtml', cur.noteCount, cur.publicCount);
}
async function toggleBatch(folder, pub) {
  for (const n of S.notes) {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    if (f === folder && n.isPublic !== pub) { await api('/api/toggle', { path: n.path, pub }); n.isPublic = pub; }
  }
  await refreshChanges(); updateVaultCounts(); promptPending();
}
// 一键收起 / 一键展开：只改 S.collapsed，再重渲染（重渲染会读取该集合）
function collapseAllFolders() {
  for (const n of S.notes) {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    S.collapsed.add(f);
  }
  renderFolders();
}
function expandAllFolders() {
  S.collapsed.clear();
  renderFolders();
}
async function toggleAll(pub) {
  for (const n of S.notes) if (n.isPublic !== pub) { await api('/api/toggle', { path: n.path, pub }); n.isPublic = pub; }
  await refreshChanges(); updateVaultCounts(); promptPending();
}

// 发布：反馈直接出现在右上角状态栏，不需要滚到底部
async function doPublish() {
  const btn = document.getElementById('pubBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('publishing');
  setResult('busy', t('publishing'));
  // 基线必须在**推送完成之后**取。推送前取的话，上一笔提交的构建如果正好在这几秒内
  // 落地，就会被误判成「本次已上线」——实测踩到过：状态栏显示「已上线（用时 5 秒）」，
  // 但实际部署的是上一版。推送后再取，基线里已经包含任何更早完成的构建，
  // 本次构建的 generatedAt 必然更大。
  const publishStart = Date.now();
  try {
    const r = await api('/api/publish', undefined, 'POST');
    const lines = r.log || [];
    // 成败由服务端给的结构化字段判断，不能靠日志里有没有「失败」两个字（换语言就失效）
    const summary = lines[0] || t('publishDone');
    if (r.failed) {
      // 推送失败时，界面上必须一眼看出「没上线」——真实踩过坑：失败那行夹在
      // 几条成功日志（本地写入 / 站名变量同步）中间，用户以为已经发布了。
      // 网络类失败单独给一句人话（多半是加速器），具体报错降到最后一行。
      if (r.failKind === 'network') setResult('alert', t('pushNetworkFail'), lines.join('\\n'));
      else setResult('err', summary === t('publishDone') ? t('publishErr') : summary, lines.join('\\n'));
    } else {
      setResult('ok', summary + (r.pushed ? t('pushed') : ''), lines.join('\\n'));
      // 推上去只是第一步：Pages 还要构建 + 部署（实测 40~90 秒）。
      // 这里不阻塞按钮，后台轮询把「还要等多久 / 已经上线」显示出来。
      if (r.pushed) {
        let since = publishStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* 取不到就退回开始时刻 */ }
        void waitUntilLive(since, r.commit, r.siteUrl);
      }
    }
  } catch (e) {
    setResult('err', t('publishFail') + e.message);
    // 授权问题导致的失败：直接把授权窗弹出来，省得用户去找那个按钮
    if (e.needAuth) openAuthDialog();
  } finally {
    btn.disabled = false; btn.textContent = old;
    try { await loadState(); } catch { /* 状态刷新失败不影响发布结果 */ }
    refreshAuth();
  }
}

// 轮询「线上是否已经是刚推的那一版」。
// 判定优先用提交 SHA（线上产物里带 GITHUB_SHA），拿不到再退回比构建时间。
// 连续点两次发布时，靠 liveSeq 让上一轮作废，免得旧轮询把新结果覆盖掉。
let liveSeq = 0;
async function waitUntilLive(baselineAt, sha, siteUrl) {
  const seq = ++liveSeq;
  const t0 = Date.now();
  const LIMIT = 4 * 60 * 1000;
  const q = (sha ? 'sha=' + encodeURIComponent(sha) : 'since=' + encodeURIComponent(String(baselineAt)));
  while (Date.now() - t0 < LIMIT) {
    if (seq !== liveSeq) return;
    setResult('busy', tf('liveBuilding', Math.round((Date.now() - t0) / 1000)));
    let r = null;
    try { r = await api('/api/live?' + q); } catch { /* 网络抖一下就继续等 */ }
    if (seq !== liveSeq) return;
    if (r && r.live) {
      setResult('ok', tf('liveOk', Math.round((Date.now() - t0) / 1000)), (r.siteUrl || siteUrl || '') + '?fresh=' + Date.now());
      return;
    }
    await new Promise((res) => setTimeout(res, 3000));
  }
  if (seq === liveSeq) setResult('alert', t('liveTimeout'), siteUrl || '');
}

// 「更新源码」：把工具目录里的站点源码（src/、scripts/、.github/ 与顶层配置）
// 全量覆盖进工作副本并推送，让 GitHub Actions 重新构建。
// 与「发布」的分工：发布同步笔记（content/），这里同步站点本身。
// 改完 blog-static/src/ 后必须点这个，只点「发布」线上不会变。
async function doUpdateSource() {
  const btn = document.getElementById('srcBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('updatingSrc');
  setResult('busy', t('updatingSrc'));
  // 与发布一样：源码推上去也要等 Pages 构建，顺手把上线进度显示出来。
  // 基线同样在推送完成之后取（原因见 doPublish 里的注释）。
  const srcStart = Date.now();
  try {
    const r = await api('/api/update-source', undefined, 'POST');
    const lines = r.log || [];
    if (r.failed) {
      if (r.failKind === 'network') setResult('alert', t('pushNetworkFail'), lines.join('\\n'));
      else setResult('err', lines[0] || t('publishErr'), lines.join('\\n'));
    } else {
      setResult('ok', (lines[0] || t('srcSynced')) + (r.pushed ? t('pushed') : ''), lines.join('\\n'));
      if (r.pushed) {
        let since = srcStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* 取不到就退回开始时刻 */ }
        void waitUntilLive(since, r.commit, '');
      }
    }
  } catch (e) {
    setResult('err', t('srcUpdateFail') + e.message);
    if (e.needAuth) openAuthDialog();
  } finally {
    btn.disabled = false; btn.textContent = old;
    try { await loadState(); } catch { /* 状态刷新失败不影响更新结果 */ }
    refreshAuth();
  }
}
document.getElementById('q').oninput = renderFolders;
updateThemeBtn();
applyLang();
loadState().catch((e) => setResult('err', t('loadFail') + e.message));
// 授权状态查一次再决定提示条是否显示：已授权的机器上不该出现这条
refreshAuth();
setInterval(() => { loadState().catch(() => {}); }, 8000);
</script></body></html>`


// ---------- 路由 ----------
const LOOPBACK = /^(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/i
/** 发布互斥：同一时刻只允许一次发布在跑（防连点导致 index.lock 冲突） */
let PUBLISHING = false
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
      res.end(UI)
      return
    }
    const { connections, conn, vaultPath, workdir, local } = activeConfig()

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
      json(res, 200, { ok: true })
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
      const r = await updateSource(conn, wd.workdir, langOf(req))
      json(res, 200, { log: r.log, failed: r.failed, pushed: r.pushed, failKind: r.failKind || null, commit: r.commit || '' })
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

server.on('error', (e) => {
  // 端口被占用（上一次管理器没关干净）时，原来是一段未捕获异常堆栈；
  // 这里给一句能直接照做的提示。
  if (e && e.code === 'EADDRINUSE') {
    console.error(`[manager] 端口 ${PORT} 已被占用：可能已经有一个管理器在运行。先关掉它，或设 PORT=其它端口再启动。`)
  } else {
    console.error('[manager] 服务启动失败：' + String((e && e.message) || e))
  }
  process.exitCode = 1
})

server.listen(PORT, '127.0.0.1', () => {
  const { conn, vaultPath } = activeConfig()
  console.log(`[manager] Publish manager: http://localhost:${PORT}`)
  console.log(`[manager] Active connection: ${conn ? conn.name : '(none)'}; vault path: ${vaultPath || '(not set)'}`)
  console.log(`[manager] Source directory: ${TOOL_ROOT}`)
  console.log(`[manager] Data directory:   ${DATA_DIR}`)
  restartWatcher()
  // 上次关掉时可能还有「推了但没等到上线」的记录，接着盯（定时器随进程消失）
  try {
    resumeAutoLiveWatch()
  } catch {
    /* 补盯失败不影响管理器启动 */
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
  autoBusy = true
  // 先落一条「开始推送」，再真的去推：git push + GitHub Actions 加起来要几十秒到几分钟，
  // 只在推完之后写一条的话，这段时间界面上一片空白，看着像没反应。
  const entry = { at: startedAt, kind: 'run', counts, files: filesOf(handled), stage: 'pushing' }
  pushAutoLog(conn.id, entry)
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
    // publish 自己也会写文件（content/、.blog-meta.json），别让这些写入再触发一轮
    autoSuppressUntil = Date.now() + 5000
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
      return
    }
    if (Date.now() > deadline) {
      patchAutoLog(conn.id, entry.at, {
        liveTimeout: true,
        buildStatus: (b && b.status) || '',
        buildUrl: (b && b.url) || '',
      })
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
