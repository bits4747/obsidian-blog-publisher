/* 博客发布器端到端回归测试（18 个检查点，覆盖多库切换、发布、公开开关、api() 方法不退化等）。
 * 运行：bash scripts/e2e-run.sh —— 它会用独立的临时数据目录起管理器、跑完测试再清理，
 * 不会碰你已有的连接与令牌。必须有 Node 与 git；全新用户首次运行会跑 npm install。 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

/**
 * 端口跟随 MGR_PORT，和 manager.mjs 用同一个变量。
 * 写死 3457 的后果：本机要是已经开着管理器，e2e-run.sh 会先把那个进程杀掉，
 * 用户手上正用着的窗口就没了。改成可配置后，测试能挑个空端口自己跑。
 */
const BASE = 'http://127.0.0.1:' + (Number(process.env.MGR_PORT) || 3457)
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

/**
 * 没有显式给 OBSIDIAN_BLOG_DATA 就直接退出。
 *
 * 为什么必须拦：这个测试会建连接、删连接、改配置。以前没拦，直接 `node
 * scripts/e2e-test.mjs` 跑一次，就会往**用户真实的** %APPDATA%\obsidian-blog
 * 里塞进几条「测试A」连接（repo 指向 %TEMP%\mgr-remote.git，那个裸仓库
 * 测试结束就被删了）。用户打开管理器就看到一个「选哪个库」的下拉，里面全是
 * 用不了的测试项 —— 这正是用户报「这个东西是什么、没必要吧」的来源。
 * 正确跑法只有一个：bash scripts/e2e-run.sh（它会自动指到临时目录）。
 */
if (!(process.env.OBSIDIAN_BLOG_DATA || '').trim()) {
  console.error(
    '\n[e2e] 拒绝运行：没有设置 OBSIDIAN_BLOG_DATA。\n' +
      '      这个测试会写入连接配置，必须跑在临时数据目录里，\n' +
      '      否则会把测试连接灌进你真实的 %APPDATA%\\obsidian-blog。\n' +
      '      请改用：bash scripts/e2e-run.sh\n',
  )
  process.exit(2)
}
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
  // 界面与服务端分在两个文件里：UI 在 scripts/ui-template.mjs，路由在 scripts/manager-core.mjs。
  const uiSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'ui-template.mjs'), 'utf8')
  const coreSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'manager-core.mjs'), 'utf8')
  const ui = uiSrc.slice(uiSrc.indexOf('async function api(path, body, method)'))
  const calls = [...ui.matchAll(/api\(\s*'([^']+)'\s*(,[^)]*)?\)/g)].map((m) => ({ ep: m[1], rest: (m[2] || '').trim() }))
  // 允许「无 body 无 method」= 走 GET 的端点，直接从服务端注册处读出来，
  // 而不是在这里手抄一份白名单 —— 手抄的白名单会和真实路由脱节
  // （/api/auth/status 就是这么被误报成写接口的）。
  const GET_OK = new Set([...coreSrc.matchAll(/req\.method === 'GET' && url === '([^']+)'/g)].map((m) => m[1]))
  ok(GET_OK.size >= 2, '从服务端读出 GET 端点白名单，实际 ' + JSON.stringify([...GET_OK]))
  const bad = calls.filter((c) => !GET_OK.has(c.ep) && c.rest === '')
  ok(bad.length === 0, '无「无 body 且无 method」的写接口调用', JSON.stringify(bad))
}

console.log('\n=== 13. 自定义外观（public/theme.css） ===')
// 库主人在管理器「外观」里粘贴的 CSS：存进工作副本的 public/theme.css，
// 构建时由 build-content.mjs 算出 theme.generated.ts，layout 以 <link> 引入。
// 这一节锁死「存 / 读 / 清空 / 超限 / 保存并发布」几条链路。
{
  await api('/api/connection/switch', { id: idA })
  const wdA = path.join(DATA_DIR, 'repos', idA)
  const themeFile = path.join(wdA, 'public', 'theme.css')

  // 初始为空（A 由模板初始化，没写过外观）
  let t = await api('/api/theme')
  ok(t.css === '', '初始无自定义外观', JSON.stringify(t.css).slice(0, 40))
  ok(t.maxBytes === 200 * 1024, '上限 200KB 已下发，实际 ' + t.maxBytes)

  const css = ':root { --primary: oklch(0.48 0.11 155); }\n[data-region="main"] { max-width: 44rem; }\n'
  t = await api('/api/theme', { css })
  ok(t.ok === true && t.bytes === Buffer.byteLength(css), '保存返回字节数，实际 ' + t.bytes)
  ok(exists(themeFile) && fs.readFileSync(themeFile, 'utf8') === css, '已写入工作副本 public/theme.css')
  t = await api('/api/theme')
  ok(t.css === css, '读回内容一致')

  // 超限必须拒绝（防止误粘贴巨型文件把仓库和构建撑坏）
  let tooBig = false
  try { await api('/api/theme', { css: 'a{}'.repeat(80 * 1024) }) }
  catch (e) { tooBig = true; console.log('  拒绝原因:', e.message) }
  ok(tooBig, '超过 200KB 被拒绝')
  ok(fs.readFileSync(themeFile, 'utf8') === css, '被拒后原文件未被破坏')

  // 保存并发布：只推 theme.css
  t = await api('/api/theme/publish', { css })
  ok(t.ok === true && t.pushed === true, '保存并发布成功', JSON.stringify(t.failed || ''))
  const remoteFiles = gitRun('git', ['ls-tree', '-r', '--name-only', 'HEAD'], { cwd: REMOTE_A }).split('\n')
  ok(remoteFiles.includes('public/theme.css'), '远端仓库含 public/theme.css')
  ok(gitRun('git', ['show', 'HEAD:public/theme.css'], { cwd: REMOTE_A }) === css.trim(), '远端内容与提交一致')

  // 清空 = 删除文件（回到默认主题），而不是留一个空文件
  t = await api('/api/theme', { css: '   ' })
  ok(t.removed === true, '空白内容被视为清除')
  ok(!exists(themeFile), '文件已删除')
  t = await api('/api/theme')
  ok(t.css === '', '清空后读回为空')

  // 外观按连接隔离：切到 C 不该看到 A 的 CSS
  await api('/api/connection/switch', { id: idC })
  t = await api('/api/theme')
  ok(t.css === '' && t.hasWorkdir === true, '切到 C 后读接口正常且无继承外观，hasWorkdir=' + t.hasWorkdir)
  await api('/api/connection/switch', { id: idA })
}

console.log('\n=== 14. 界面约定：弹窗手动关闭 + 宽度/字号解耦 ===')
// 这几条是用户明确要求的行为，靠人眼容易回归，静态扫描源码锁死：
//  1) 弹窗（toast）不能自动消失，也不能有「小 ×」，必须点卡片任意位置才关；
//  2) 字号缩放只改字号，不改版面：根字号不跟着变，内容宽度读 --content-w；
//  3) 主题只负责颜色与「非正文界面」的排布，不许自己写 max-width 改宽度。
{
  const uiSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'ui-template.mjs'), 'utf8')
  const cssSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'globals.css'), 'utf8')
  const presetsSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'theme-presets.mjs'), 'utf8')

  // 1) 弹窗：没有任何 toast 的自动收起定时器
  const autoDrop = [...uiSrc.matchAll(/setTimeout\([^)]*toastDrop/g)].map((m) => m[0])
  ok(autoDrop.length === 0, 'toast 没有自动关闭定时器', JSON.stringify(autoDrop))

  // 1b) 没有关闭小 × 的元素
  ok(!/className = 'x'/.test(uiSrc) && !/className = 'th \.x'/.test(uiSrc), 'toast 没有小 × 按钮')
  ok(!/\.toast \.th \.x\s*\{/.test(uiSrc), 'toast 的 .x 样式已移除')

  // 1c) 点卡片关闭，且放行卡片内的折叠/外链
  ok(/el\.addEventListener\('click'/.test(uiSrc), 'toast 绑定了点击关闭')
  ok(/closest\('details, a, summary'\)/.test(uiSrc), 'toast 内的折叠与外链点击不关闭')

  // 2) 字号：根字号必须是固定值，不随 --site-fs 变（否则控件与宽度会跟着缩）
  ok(!/html\s*\{\s*font-size:\s*calc\([^}]*--site-fs/.test(cssSrc), '根字号不随 --site-fs 缩放')
  ok(/--fsu:\s*calc\(1rem \* var\(--site-fs/.test(cssSrc), '正文用 --fsu 跟随字号')

  // 3) 宽度：统一变量 --content-w，组件里不许再写死 rem 宽度
  ok(/--content-w:\s*[\d.]+rem/.test(cssSrc), 'globals.css 定义了 --content-w')
  const appSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'blog', 'blog-app.tsx'), 'utf8')
  const noteSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'blog', 'note-view.tsx'), 'utf8')
  const hardW = [...(appSrc + noteSrc).matchAll(/max-w-\[[\d.]+rem\]/g)].map((m) => m[0])
  // 只约束「容器」：顶栏/正文/页脚/文章这四块必须读 --content-w。
  // 搜索框那种小控件的固定宽度不算版面宽度，不在此列。
  const containerHardW = (appSrc + noteSrc)
    .split('\n')
    .filter((l) => /data-region="(header|main|footer|note|article)"/.test(l))
    .flatMap((l) => [...l.matchAll(/max-w-\[[\d.]+rem\]/g)].map((m) => m[0]))
  ok(containerHardW.length === 0, '容器（顶栏/正文/页脚/文章）没有写死 rem 宽度', JSON.stringify(containerHardW))
  ok(hardW.length <= 1, '写死 rem 宽度只剩搜索框这类小控件', JSON.stringify(hardW))
  ok(/max-w-\[var\(--content-w\)\]/.test(appSrc), 'main/header/footer 读 --content-w')

  // 3b) 主题里不许用 max-width 改宽度（注释里提到是允许的，只看真实声明）
  const decls = [...presetsSrc.matchAll(/max-width:\s*[\d.]+rem/g)].map((m) => m[0])
  ok(decls.length === 0, '每套主题预设都不写 max-width', JSON.stringify(decls))
}

console.log('\n=== 15. 外观面板：默认进列表 + 说明≤50字 + 预设预览图 ===')
// 用户明确要求的三条，靠人眼容易回归，这里静态 + 接口双重锁死：
//  1)「默认」也要出现在预设下拉里（它等价于空 CSS，用户要能明确选中它）；
//  2) 面板上的说明文字不得超过 50 字，写 CSS 的教程只能放在「写作指南」弹窗里；
//  3) 每套内置预设都要有预览图，自定义没有（用户写什么就是什么，预渲染不了）。
{
  const uiSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'ui-template.mjs'), 'utf8')
  const presetsSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'theme-presets.mjs'), 'utf8')
  const previewsSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'theme-previews.mjs'), 'utf8')

  // 1) 默认作为一套可选外观
  ok(/id:\s*'default'/.test(uiSrc), '「默认」是可选预设（id=default）')
  ok(/DEFAULT_PRESET\].concat\(PRESETS\)|\[DEFAULT_PRESET\]/.test(uiSrc), '预设列表 = 默认 + 内置预设')

  // 2) 面板文案 ≤50 字：themeIntro 是唯一常驻说明，逐语言量长度
  const introZh = /themeIntro:\s*'([^']*)'/.exec(uiSrc)
  const introEn = [...uiSrc.matchAll(/themeIntro:\s*'([^']*)'/g)].map((m) => m[1])
  ok(!!introZh, '面板说明 themeIntro 存在')
  ok(introZh[1].length <= 50, '中文说明 ≤50 字，实际 ' + introZh[1].length + ' 字')
  const badEn = introEn.filter((s) => s.length > 60)
  ok(badEn.length === 0, '英文说明也够短（≤60 字符），实际 ' + JSON.stringify(introEn))
  // 教程必须住在按钮后面，不能摊在面板上
  ok(/id="themeGuide"/.test(uiSrc) && /openThemeGuide/.test(uiSrc), '写 CSS 的教程在「写作指南」按钮里')

  // 3) 预览图：每套内置预设 + 默认各有一张，id 必须对齐
  const presetIds = [...presetsSrc.matchAll(/"id":\s*"([\w-]+)"/g)].map((m) => m[1])
  ok(presetIds.length === 6, '内置预设 6 套，实际 ' + presetIds.length)
  const previewIds = [...previewsSrc.matchAll(/^\s{2}"([\w-]+)":/gm)].map((m) => m[1])
  const missing = ['default'].concat(presetIds).filter((id) => !previewIds.includes(id))
  ok(missing.length === 0, '每套预设都有预览图（含默认）', JSON.stringify(missing))
  ok(/THEME_PREVIEW_VERSION/.test(previewsSrc), '预览图带内容哈希（改图后缓存会失效）')

  // 图片真的能取到，且是 PNG
  const r = await fetch(BASE + '/preset-preview/default.png')
  ok(r.status === 200, '预览图接口可访问，实际 ' + r.status)
  ok((r.headers.get('content-type') || '').includes('image/png'), '返回 image/png')
  const buf = Buffer.from(await r.arrayBuffer())
  ok(buf.length > 2000 && buf.slice(0, 4).toString('hex') === '89504e47', '返回的是有效 PNG（' + buf.length + ' 字节）')
  const bad = await fetch(BASE + '/preset-preview/not-a-preset.png')
  ok(bad.status === 404, '未知预设返回 404，实际 ' + bad.status)

  // 自定义没有预览图：面板里要有「自定义」占位说明
  ok(/presetPreviewEmpty/.test(uiSrc) && /themePresetCustom/.test(uiSrc), '自定义外观不显示预览图，只给一行说明')
}

console.log('\n=== 16. 插件嵌入模式不显示「切换库」下拉，改按当前库自动选中 ===')
// 用户报的：「obsidian 里一次只能打开一个库，这个选择没必要吧？」
// 成因是测试污染：直接 `node scripts/e2e-test.mjs` 会往真实配置里塞「测试A」连接，
// 于是顶栏冒出下拉。这里同时锁死「不再污染」与「插件里不显示」两件事。
{
  const uiSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'ui-template.mjs'), 'utf8')
  const e2eSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'e2e-test.mjs'), 'utf8')
  const pluginSrc = fs.readFileSync(
    path.join(process.cwd(), 'obsidian-plugin', 'src', 'main.ts'),
    'utf8',
  )

  // 1) 下拉只在非嵌入模式出现
  ok(/embedded\s*=\s*document\.body\.classList\.contains\('embed-mode'\)/.test(uiSrc), '识别嵌入模式（embed-mode）')
  ok(/S\.connections\.length\s*>\s*1\s*&&\s*!embedded/.test(uiSrc), '多连接下拉在插件里不渲染（本地调试入口保留）')

  // 2) 插件把当前库路径传给界面，界面据此自动选中连接
  ok(/vault=/.test(pluginSrc) && /encodeURIComponent\(vaultPath\)/.test(pluginSrc), '插件把当前库路径传给 iframe')
  ok(/EMBED_VAULT/.test(uiSrc) && /syncActiveByVault/.test(uiSrc), '界面按库路径自动对齐活动连接')

  // 3) 没设 OBSIDIAN_BLOG_DATA 时测试直接拒绝运行（防再次污染真实配置）
  ok(/拒绝运行：没有设置 OBSIDIAN_BLOG_DATA/.test(e2eSrc), 'e2e 缺临时数据目录时拒绝运行')

  // 4) 用户真实配置里不应残留指向已删除临时仓库的连接
  //    注意不能查 DATA_DIR —— 那是本次测试自己的临时目录，里面本来就该有测试连接。
  const realData = (() => {
    const home = os.homedir() || ''
    if (process.platform === 'win32') return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'obsidian-blog')
    if (process.platform === 'darwin') return path.join(home, 'Library', 'Application Support', 'obsidian-blog')
    return path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'obsidian-blog')
  })()
  const connFile = path.join(realData, 'connections.json')
  if (fs.existsSync(connFile)) {
    const list = (JSON.parse(fs.readFileSync(connFile, 'utf8')).connections || []).filter(
      (c) => /[\\/](Temp|tmp)[\\/]/i.test(String(c.repo || '')) || /^mgr-remote/i.test(path.basename(String(c.repo || ''))),
    )
    ok(list.length === 0, '真实配置里没有指向临时测试仓库的残留连接', JSON.stringify(list.map((c) => c.name)))
  }
}

console.log('\n=== 17. 跨进程发布互斥 + 「推送被拒但远端已有」不算失败 ===')
// 用户报的：「把公开文章变私密后日志显示推送失败，同时没有弹窗提示」。
// 根因之一：本地调试入口与 Obsidian 插件里的发布器共用同一个数据目录与同一批
// git 工作副本，各自只有进程内的 PUBLISHING 变量，挡不住对方。转私密时两边几乎
// 同时推送，先跑的推上去了，后跑的报「推送失败」—— 其实内容已经上线。
{
  const uiSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'ui-template.mjs'), 'utf8')
  const coreSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'manager-core.mjs'), 'utf8')

  // 1) 锁的实现：原子独占创建 + 死锁回收 + 只删自己的锁
  ok(/openSync\(file, 'wx'\)/.test(coreSrc), '发布锁用 wx 原子创建')
  ok(/LOCK_STALE_MS/.test(coreSrc) && /pidAlive/.test(coreSrc), '死锁按 pid/超时回收')
  ok(/cur\.pid === process\.pid/.test(coreSrc), '释放时只删自己那把锁')
  // 2) 三条推送路径都要拿锁
  ok((coreSrc.match(/acquireLock\('publish-' \+ conn\.id\)/g) || []).length >= 3,
    '发布 / 更新源码 / 发布外观 都走同一把跨进程锁')
  ok(/if \(!lk\.ok\) \{\s*requeueAutoSync/.test(coreSrc), '自动同步抢不到锁就等下一轮，不硬推')
  // 3) 「推送被拒但远端已有这个提交」要判成功，不能报失败
  ok(/remoteHasHead/.test(coreSrc) && /logPushedAlready/.test(coreSrc), '推送被拒时先问远端是否已有该提交')
  ok(/failingPush|remoteHasHead\(conn, workdir\)/.test(coreSrc), '远端已有 → 记成功')

  // 4) 真接口：锁被占着时发布必须 409，且不能动工作副本
  const locksDir = path.join(DATA_DIR, 'locks')
  fs.mkdirSync(locksDir, { recursive: true })
  const lockFile = path.join(locksDir, 'publish-' + idA + '.lock')
  fs.writeFileSync(lockFile, JSON.stringify({ pid: process.pid, at: Date.now() }), 'utf8')
  const busy = await fetch(BASE + '/api/publish', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
  })
  const busyJson = await busy.json().catch(() => ({}))
  ok(busy.status === 409, '另一个进程持锁时发布返回 409，实际 ' + busy.status)
  ok(/另一个发布进程/.test(String(busyJson.error || '')), '提示说明了是另一个进程在推送')
  fs.rmSync(lockFile, { force: true })
  const after = await api('/api/publish', {})
  ok(after.failed !== true, '锁释放后可以正常发布')

  // 5) 自动同步的结果必须有弹窗，且只对新结论弹一次（首屏不弹历史）
  ok(/function notifyAutoLog/.test(uiSrc), '自动同步结果会弹提示')
  ok(/AUTO_SEEN_KEY/.test(uiSrc) && /localStorage/.test(uiSrc),
    '提示进度记在 localStorage：界面关着时跑完的同步，下次打开会补上结果')
  ok(/toastAutoFailed/.test(uiSrc) && /toastAutoLive/.test(uiSrc), '成功与失败各有对应文案')
}

console.log('\n=== 18. 行内标签识别：题目编号 / 颜色值 / 链接文字里都不算标签 ===')
// 用户报的：「哈希那篇 #2427. 「POI2010」珍珠项链 Beads 的题目链接被识别成了标签，
// 标题链接渲染有误」。根因两条：
//   a) 正文 `#2427` 纯数字被判成标签 → 渲染成 <a href="obsidian-tag:2427">；
//   b) 标签解析被应用在 **链接文字内部**，产出 <a><a></a></a> —— HTML 不允许 a 套 a，
//      浏览器会把内层拆出去，于是链接被截断、后半截变成普通文字。
// 这条规则必须与 obsidian.ts 的 extractTags 完全一致，否则会出现「正文是标签、
// 标签页里却没有」的自相矛盾。
{
  const libSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'remark-obsidian.ts'), 'utf8')
  ok(/function isValidTag\(/.test(libSrc), '行内标签有统一的合法性判定')
  ok(/isValidTag\(tag\.slice\(1\)\)/.test(libSrc), 'plainNodes 用 isValidTag 过滤，不再见 # 就成标签')
  ok(/if \(p\.type === 'link'\) \{\s*return\s*\}/.test(libSrc),
    '链接文字里不再解析标签（避免 <a> 套 <a> 把链接拆坏）')
  // 判定规则本身：纯数字、3~8 位十六进制都不算标签
  ok(/\^\\d\+\$/.test(libSrc), '纯数字（如 #2427 题目编号）不算标签')
  ok(/\^\[0-9a-fA-F\]\{3,8\}\$/.test(libSrc), '十六进制颜色值（如 #ff0000）不算标签')
  // 与 build-content.mjs 的标签提取口径对齐（同一份排除规则，两处都得有）
  const buildSrc = fs.readFileSync(path.join(process.cwd(), 'scripts', 'build-content.mjs'), 'utf8')
  ok(/!\/\^\\d\+\$\/\.test\(t\)/.test(buildSrc), '构建端 extractTags 也排除纯数字')
  ok(/!\/\^\[0-9a-fA-F\]\{3,8\}\$\/\.test\(t\)/.test(buildSrc), '构建端 extractTags 也排除颜色值')
}

console.log(`\n===== 结果：${pass} 通过 / ${fail} 失败 =====`)
process.exit(fail ? 1 : 0)
