import esbuild from 'esbuild'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const banner = `/*
博客发布器 —— Obsidian 插件
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

const watch = process.argv.includes('--watch')

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
}

// 两个入口：
//   main.js   插件本体（Obsidian 加载它）
//   worker.js 后台线程，里面跑 manager-core 的 HTTP 服务（spawnSync 不卡界面）
const ctx = await esbuild.context({
  ...common,
  entryPoints: [path.join(__dirname, 'src', 'main.ts')],
  banner: { js: banner },
  outfile: path.join(__dirname, 'main.js'),
})

const workerCtx = await esbuild.context({
  ...common,
  entryPoints: [path.join(__dirname, 'src', 'worker-entry.ts')],
  outfile: path.join(__dirname, 'worker.js'),
})

if (watch) {
  await ctx.watch()
  await workerCtx.watch()
  console.log('watching...')
} else {
  const [r1, r2] = await Promise.all([ctx.rebuild(), workerCtx.rebuild()])
  await ctx.dispose()
  await workerCtx.dispose()
  for (const [name, r] of [
    ['main.js', r1],
    ['worker.js', r2],
  ]) {
    const out = path.join(__dirname, name)
    const size = fs.statSync(out).size
    console.log(`✅ ${name} ${(size / 1024).toFixed(0)} KB`)
    if (r.warnings.length) r.warnings.forEach((w) => console.log('  warn: ' + w.text))
  }
}
