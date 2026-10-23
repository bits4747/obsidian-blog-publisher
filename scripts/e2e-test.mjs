/* 发布管理器端到端回归测试（18 个检查点，覆盖多库切换、发布、公开开关、api() 方法不退化等）。
 * 运行：bash scripts/e2e-run.sh —— 它会用独立的临时数据目录起管理器、跑完测试再清理，
 * 不会碰你已有的连接与令牌。必须有 Node 与 git；全新用户首次运行会跑 npm install。 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const BASE = 'http://127.0.0.1:3457'
const TEMP = os.tmpdir()
/**
 * 与 manager.mjs 保持同一套数据目录解析规则：个人数据在用户区，源码目录保持干净。
 * 测试建议用 OBSIDIAN_BLOG_DATA 指向临时目录，避免污染真实配置。
 */
const DATA_DIR = (() => {
  const fromEnv = (process.env.OBSIDIAN_BLOG_DATA || '').trim()
  if (fromEnv) return path.resolve(fromEnv)
  const home = os.homedir() || ''
  if (process.platform === 'win32') return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'obsidian-blog')
  if (process.platform === 'darwin') return path.join(home, 'Library', 'Application Support', 'obsidian-blog')
  return path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'obsidian-blog')
})()
const VAULT_A = path.join(TEMP, 'mgr-vaultA').replace(/\\/g, '/')
const VAULT_B = path.join(TEMP, 'mgr-vaultB').replace(/\\/g, '/')
const REMOTE_A = path.join(TEMP, 'mgr-remote.git').replace(/\\/g, '/')
const REMOTE_B = path.join(TEMP, 'mgr-remoteB.git').replace(/\\/g, '/')
const CLONE_A = path.join(TEMP, 'mgr-cloneA').replace(/\\/g, '/')
const CLONE_B = path.join(TEMP, 'mgr-cloneB').replace(/\\/g, '/')

let pass = 0, fail = 0
const ok = (c, msg, extra = '') => {
  if (c) { pass++; console.log(`  [PASS] ${msg}`) }
  else { fail++; console.log(`  [FAIL] ${msg}${extra ? ' -> ' + extra : ''}`) }
}

async function api(p, body) {
  const r = await fetch(BASE + p, body
    ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }
    : undefined)
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error || ('HTTP ' + r.status))
  return j
}
const gitRun = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', ...opts })
  if (r.error) throw new Error(r.error.message)
  if (r.status !== 0) throw new Error(((r.stderr || '') + (r.stdout || '')).trim().slice(0, 300))
  return (r.stdout || '').trim()
}
const rm = (p) => fs.rmSync(p, { recursive: true, force: true })
const exists = (p) => fs.existsSync(p)

// 裸仓库 B 由外部 bash 预建（node 内 rm+mkdir 后立即 git init 在 Windows 会 EBUSY）
ok(exists(path.join(REMOTE_B, 'HEAD')), '裸仓库 B 已就绪')
rm(CLONE_A); rm(CLONE_B)

console.log('\n=== 1. 初始状态 ===')
let s = await api('/api/state')
ok(s.connections.length === 0, '无连接', JSON.stringify(s.connections))
ok(s.notes.length === 0, '无笔记')

console.log('\n=== 2. 创建连接 A（initFromTemplate=true） ===')
let r = await api('/api/connection/create', {
  name: '测试A', repo: REMOTE_A, branch: 'main', initFromTemplate: true,
})
ok(!!r.id, '创建成功，id=' + r.id)
const repoDirA = path.join(DATA_DIR, 'repos', r.id).replace(/\\/g, '/')
const idA = r.id
ok(exists(path.join(repoDirA, '.git')), '工作副本已 git init')
for (const f of ['package.json', 'next.config.ts', 'src', 'scripts/build-content.mjs', '.github']) {
  ok(exists(path.join(repoDirA, f)), '模板含 ' + f)
}

console.log('\n=== 3. 设置本地库 vaultA ===')
r = await api('/api/connection/vault', { vaultPath: VAULT_A })
ok(r.ok, '库路径校验通过')

console.log('\n=== 4. state 应有 2 篇笔记 ===')
s = await api('/api/state')
ok(s.vaultOk === true, 'vaultOk=true')
ok(s.notes.length === 2, '笔记数=2，实际 ' + s.notes.length)
const a1 = s.notes.find((n) => n.path === 'A1.md')
const a2 = s.notes.find((n) => n.path === 'A2.md')
ok(a1 && a1.isPublic === true, 'A1 公开')
ok(a2 && a2.isPublic === false, 'A2 私密（新增默认私密）')

console.log('\n=== 5. 发布 ===')
r = await api('/api/publish', {})
console.log('  log:', JSON.stringify(r.log, null, 2))
ok(r.log.some((l) => l.includes('已推送') || l.includes('已是最新')), 'git 推送成功')

console.log('\n=== 6. clone 裸仓库验证 ===')
gitRun('git', ['clone', REMOTE_A, CLONE_A])
ok(exists(path.join(CLONE_A, 'content/A1.md')), 'content/A1.md 存在')
ok(!exists(path.join(CLONE_A, 'content/A2.md')), 'content/A2.md 不存在（私密不外泄）')
for (const f of ['package.json', 'next.config.ts', 'src', 'scripts/build-content.mjs', '.github/workflows']) {
  ok(exists(path.join(CLONE_A, f)), '线上含模板 ' + f)
}

console.log('\n=== 7. 删除同步：删掉 vaultA/A1.md 再发布 ===')
rm(path.join(VAULT_A, 'A1.md'))
r = await api('/api/publish', {})
console.log('  log:', JSON.stringify(r.log, null, 2))
rm(CLONE_A)
gitRun('git', ['clone', REMOTE_A, CLONE_A])
ok(!exists(path.join(CLONE_A, 'content/A1.md')), 'content/A1.md 已随删除移除')
ok(exists(path.join(CLONE_A, 'package.json')), '模板文件未被误删')

console.log('\n=== 7b. 恢复 A1.md 并测试「转私密即下线」 ===')
fs.writeFileSync(path.join(VAULT_A, 'A1.md'), '---\npublic: true\n---\n\n# A1\n\n测试内容 A1\n', 'utf8')
r = await api('/api/publish', {})
rm(CLONE_A); gitRun('git', ['clone', REMOTE_A, CLONE_A])
ok(exists(path.join(CLONE_A, 'content/A1.md')), 'A1.md 已恢复上线')
r = await api('/api/toggle', { path: 'A1.md', pub: false })
r = await api('/api/publish', {})
rm(CLONE_A); gitRun('git', ['clone', REMOTE_A, CLONE_A])
ok(!exists(path.join(CLONE_A, 'content/A1.md')), 'A1 转私密后从线上移除')
// 还原 A1 为公开
await api('/api/toggle', { path: 'A1.md', pub: true })

console.log('\n=== 8. 第二个连接（vaultB + remoteB）互不干扰 ===')
r = await api('/api/connection/create', { name: '测试B', repo: REMOTE_B, branch: 'main', initFromTemplate: true })
const idB = r.id
r = await api('/api/connection/vault', { vaultPath: VAULT_B })
s = await api('/api/state')
ok(s.notes.length === 1 && s.notes[0].path === 'B1.md', '切到 B 后只见 B1，实际 ' + JSON.stringify(s.notes.map(n=>n.path)))
r = await api('/api/publish', {})
rm(CLONE_B); gitRun('git', ['clone', REMOTE_B, CLONE_B])
ok(exists(path.join(CLONE_B, 'content/B1.md')), 'B1 推送到仓库 B')
ok(!exists(path.join(CLONE_B, 'content/A1.md')), '仓库 B 不含 A 的内容')

console.log('\n=== 8b. 切回连接 A ===')
r = await api('/api/connection/switch', { id: idA })
s = await api('/api/state')
ok(s.active === idA, 'active=' + idA)
ok(s.notes.length === 2, '切回 A 后仍见 2 篇，实际 ' + s.notes.length)
ok(s.vaultPath.replace(/\\/g, '/') === VAULT_A, 'A 的库路径保持：' + s.vaultPath)

console.log('\n=== 9. 负例：无效库路径应被拒绝 ===')
let rejected = false
try { await api('/api/connection/vault', { vaultPath: path.resolve(process.cwd()) }) }
catch (e) { rejected = true; console.log('  拒绝原因:', e.message) }
ok(rejected, '非 Obsidian 库路径被拒绝')

console.log('\n=== 10. 连接已有内容的仓库（换电脑场景）应 clone 而非 init ===')
r = await api('/api/connection/create', { name: '测试C-已有仓库', repo: REMOTE_B, branch: 'main', initFromTemplate: true })
const idC = r.id
const repoDirC = path.join(DATA_DIR, 'repos', idC)
const logC = gitRun('git', ['log', '--oneline', '-5'], { cwd: repoDirC })
console.log('  历史:', logC.replace(/\n/g, ' | '))
ok(logC.length > 0, 'clone 保留了远端已有提交（不是空白 git init）')
ok(exists(path.join(repoDirC, 'content/B1.md')), 'clone 拉到了远端已有内容 B1.md')
ok(exists(path.join(repoDirC, 'package.json')), '模板文件已补齐')

console.log('\n=== 11. 回归：发布按钮必须能用「无 body 的 POST」调用 ===')
// 曾经的真实故障：UI 的 doPublish() 写 `api('/api/publish')`（不传 body），
// 而 fetch 在无 body 时默认 GET → 服务端只注册了 POST → 返回 404，
// 界面显示「发布失败：404」。修复后 api() 无 body 时仍显式发 POST。
// 这里故意**不带 body** 调用，锁死这个回归点。
{
  // 上一节新建的连接 C 成了当前连接，而它没有设置本地库 —— 直接发布会被
  // 「库路径无效」拦下（400）。先切回 A，这一节要测的是「无 body 会不会退化成 GET」，
  // 不是测路径校验。
  await api('/api/connection/switch', { id: idA })
  const r = await fetch(BASE + '/api/publish', { method: 'POST' })
  const j = await r.json().catch(() => ({}))
  ok(r.status === 200, '无 body 的 POST /api/publish 返回 200（不是 404），实际 ' + r.status + ' ' + JSON.stringify(j.error || ''))
  ok(Array.isArray(j.log), '返回结构含 log 数组')
  // 反向确认：GET 依然不该被接受（写操作不允许通过 GET 触发）
  const g = await fetch(BASE + '/api/publish', { method: 'GET' })
  ok(g.status === 404, 'GET /api/publish 仍为 404（写操作不接受 GET），实际 ' + g.status)
}

console.log('\n=== 12. 回归：所有内部 api() 调用点都不退化成 GET ===')
// 静态扫描 UI 源码：除查询型端点（/api/state）外，其余调用必须带 body 或显式 method。
{
  const src = fs.readFileSync(path.join(process.cwd(), 'scripts', 'manager.mjs'), 'utf8')
  const ui = src.slice(src.indexOf('async function api(path, body, method)'))
  const calls = [...ui.matchAll(/api\(\s*'([^']+)'\s*(,[^)]*)?\)/g)].map((m) => ({ ep: m[1], rest: (m[2] || '').trim() }))
  // 允许「无 body 无 method」= 走 GET 的端点，直接从服务端注册处读出来，
  // 而不是在这里手抄一份白名单 —— 手抄的白名单会和真实路由脱节
  // （/api/auth/status 就是这么被误报成写接口的）。
  const GET_OK = new Set([...src.matchAll(/req\.method === 'GET' && url === '([^']+)'/g)].map((m) => m[1]))
  ok(GET_OK.size >= 2, '从服务端读出 GET 端点白名单，实际 ' + JSON.stringify([...GET_OK]))
  const bad = calls.filter((c) => !GET_OK.has(c.ep) && c.rest === '')
  ok(bad.length === 0, '无「无 body 且无 method」的写接口调用', JSON.stringify(bad))
}

console.log(`\n===== 结果：${pass} 通过 / ${fail} 失败 =====`)
process.exit(fail ? 1 : 0)
