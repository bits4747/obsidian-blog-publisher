import esbuild from 'esbuild'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

/** 插件 id 与安装目录名。官方目录要求 id 全局唯一且不能含 obsidian。 */
const PLUGIN_ID = 'note-blog-publisher'

const banner = `/*
Note Blog Publisher —— Obsidian 插件
把 Obsidian 笔记发布成静态博客。

本文件由 esbuild 从 src/ 与 ../scripts/ 打包生成，不要手改。
*/`

/**
 * 插件要把「站点模板」一起带走：新建连接时用它初始化仓库。
 *
 * TEMPLATE_ITEMS 与 manager-core.mjs 里的同名常量必须一致 —— 这里直接从
 * core 源码里读出来，避免两处手抄后漂移。
 */
function readTemplateItems() {
  const core = fs.readFileSync(path.join(ROOT, 'scripts', 'manager-core.mjs'), 'utf8')
  const m = /const TEMPLATE_ITEMS = (\[[^\]]+\])/.exec(core)
  if (!m) throw new Error('从 manager-core.mjs 读不到 TEMPLATE_ITEMS')
  return JSON.parse(m[1].replace(/'/g, '"'))
}

/**
 * 把模板文件打进一个「虚拟文件表」模块：{ 'src/app/page.tsx': '内容', ... }
 *
 * 为什么要打包进插件，而不是让插件去读 blog-static 源码目录：
 * 插件装到 .obsidian/plugins/ 之后，用户机器上不一定还有那个源码目录。
 * 模板只有 ~390KB，塞进 main.js 换「装上就能用」是划算的。
 */
function buildTemplateModule() {
  const items = readTemplateItems()
  const files = {}
  let total = 0

  const walk = (abs, rel) => {
    const st = fs.statSync(abs)
    if (st.isDirectory()) {
      for (const name of fs.readdirSync(abs)) {
        if (name === '.git' || name === 'node_modules' || name === '.next' || name === 'out') continue
        walk(path.join(abs, name), rel ? rel + '/' + name : name)
      }
      return
    }
    const buf = fs.readFileSync(abs)
    total += buf.length
    // 二进制模板（本项目模板里目前没有）也要能带走：用 base64
    const isText = !buf.includes(0)
    files[rel] = isText
      ? { t: 'utf8', v: buf.toString('utf8') }
      : { t: 'base64', v: buf.toString('base64') }
  }

  for (const item of items) {
    const abs = path.join(ROOT, item)
    if (!fs.existsSync(abs)) continue
    walk(abs, item)
  }

  const count = Object.keys(files).length
  console.log(`  模板文件: ${count} 个，${(total / 1024).toFixed(0)} KB`)

  // 模板指纹：插件升级后，<dataDir>/site-template 里还留着旧版本铺开的文件。
  // templateReady() 原来只检查文件「存在」，于是旧模板永远不会被覆盖 ——
  // 表现为「点『更新源码』没反应」：复制过去的内容和线上一致，git 没有 diff，不推送。
  // 把内容摘要带进去，落盘后写一份 .template-rev，不一致就整体重铺。
  const rev = crypto.createHash('sha256').update(JSON.stringify(files)).digest('hex').slice(0, 16)
  console.log(`  模板指纹: ${rev}`)

  return {
    code:
      `// 由 esbuild.config.mjs 自动生成：站点模板文件表（${count} 个文件）\n` +
      `export const TEMPLATE_REV = ${JSON.stringify(rev)}\n` +
      `export const TEMPLATE_FILES = ${JSON.stringify(files)}\n`,
    count,
    total,
  }
}

const tpl = buildTemplateModule()
const tplPath = path.join(__dirname, 'src', '_template-files.js')
fs.writeFileSync(tplPath, tpl.code, 'utf8')

const common = {
  bundle: true,
  external: [
    'obsidian',
    'electron',
    '@codemirror/autocomplete',
    '@codemirror/collab',
    '@codemirror/commands',
    '@codemirror/language',
    '@codemirror/lint',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/lr',
  ],
  format: 'cjs',
  target: 'es2022',
  logLevel: 'info',
  sourcemap: false,
  treeShaking: true,
  minify: false,
  // node 内置模块保持 external：Obsidian 的 Electron 里 require 得到
  platform: 'node',
  define: { 'process.env.NODE_ENV': '"production"' },
  write: false,
}

/**
 * 把两段 bundle 合成一个 main.js。
 *
 * 官方目录安装时只下载 main.js / manifest.json / styles.css 三个文件，
 * 所以后台服务不能再是一个独立的 worker.js，必须住在 main.js 里。
 *
 * 两个分支各自包一层函数，互不可见：
 *   - 子进程带着 BLOG_PUBLISHER_START 启动 → 只跑后台服务，然后 return
 *   - Obsidian 加载 → 只跑插件本体
 *
 * 必须这样分叉，是因为插件本体在顶层 require('obsidian')，而那个模块只存在于
 * Obsidian 的插件加载器里；后台服务进程是普通 Node，加载它就会抛 MODULE_NOT_FOUND。
 */
function compose(pluginCode, workerCode) {
  return `${banner}
;(function () {
  'use strict'
  if (process.env.BLOG_PUBLISHER_START) {
    // ==================== 后台服务（子进程模式） ====================
    ;(function () {
${workerCode}
    })()
    return
  }
  // ==================== 插件本体（Obsidian 加载） ====================
  ;(function () {
${pluginCode}
  })()
})()
`
}

async function buildOnce() {
  const [plugin, worker] = await Promise.all([
    esbuild.build({ ...common, entryPoints: [path.join(__dirname, 'src', 'main.ts')] }),
    esbuild.build({ ...common, entryPoints: [path.join(__dirname, 'src', 'worker-entry.ts')] }),
  ])
  const pluginCode = plugin.outputFiles[0].text
  const workerCode = worker.outputFiles[0].text
  const out = path.join(__dirname, 'main.js')
  fs.writeFileSync(out, compose(pluginCode, workerCode), 'utf8')
  for (const r of [plugin, worker]) {
    if (r.warnings.length) r.warnings.forEach((w) => console.log('  warn: ' + w.text))
  }
  console.log(`✅ main.js ${(fs.statSync(out).size / 1024).toFixed(0)} KB（含后台服务）`)
  return out
}

/**
 * 装进 Obsidian 库：把构建产物复制到 <vault>/.obsidian/plugins/<PLUGIN_ID>/。
 *
 * 为什么放在构建脚本里：这一步以前靠手工 `cp`，忘了就出现「改了源码、管理器里
 * 看得见新东西、Obsidian 里还是旧的」——2026-10-26 连犯两次。构建产物与装好的
 * 副本字节不一致属于部署遗漏，不是代码问题，所以让它跟着构建一起发生。
 *
 * 库路径来源：<数据目录>/local.json 的 vaultPaths（管理器「设置」里选的那个库），
 * 取当前 active 连接；还没配过库时跳过，只打印提示。
 * 传 --no-deploy 可跳过（例如只想看构建结果）。
 */
function deployToVault() {
  if (process.argv.includes('--no-deploy')) {
    console.log('  跳过部署（--no-deploy）')
    return
  }
  const dataDir =
    process.platform === 'win32'
      ? path.join(process.env.APPDATA || '', 'obsidian-blog')
      : process.platform === 'darwin'
        ? path.join(process.env.HOME || '', 'Library', 'Application Support', 'obsidian-blog')
        : path.join(process.env.HOME || '', '.config', 'obsidian-blog')
  const localFile = path.join(dataDir, 'local.json')
  if (!fs.existsSync(localFile)) {
    console.log('  未找到 local.json，跳过部署（管理器里选一次库路径即可）')
    return
  }
  let vaultPath = ''
  try {
    const local = JSON.parse(fs.readFileSync(localFile, 'utf8'))
    const id = local.active
    vaultPath = (local.vaultPaths && id && local.vaultPaths[id]) || ''
  } catch {
    console.log('  local.json 解析失败，跳过部署')
    return
  }
  if (!vaultPath || !fs.existsSync(vaultPath)) {
    console.log('  未配置库路径，跳过部署')
    return
  }
  const dest = path.join(vaultPath, '.obsidian', 'plugins', PLUGIN_ID)
  fs.mkdirSync(dest, { recursive: true })
  for (const name of ['main.js', 'manifest.json']) {
    fs.copyFileSync(path.join(__dirname, name), path.join(dest, name))
  }
  console.log(`  已装进库：${dest}`)
  console.log('  → Obsidian 里「重载插件」（或重启）才会生效')
}

const watch = process.argv.includes('--watch')

await buildOnce()
if (watch) {
  console.log('watching src/ ...')
  let timer = null
  fs.watch(path.join(__dirname, 'src'), { recursive: true }, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      buildOnce().catch((e) => console.log('  build failed: ' + e.message))
    }, 200)
  })
} else {
  deployToVault()
}
