/**
 * 把 _dev/themes/*.css 生成成 scripts/theme-presets.mjs。
 *
 * 为什么单独一个生成脚本而不是手抄：
 *   主题是我在 _dev/themes 里反复调出来的（一轮一轮看截图改色），
 *   手抄进管理器必然漂移 —— 改了主题文件却忘了同步预设，
 *   用户选到的和设计稿就不是一份东西。
 *
 * 用法：node scripts/gen-theme-presets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, '..', '..', '_dev', 'themes')
const OUT = path.join(__dirname, 'theme-presets.mjs')

/** 文件名的编号即顺序；中文名取破折号后的部分 */
const META = {
  '01': { id: 'study', zh: '墨绿书斋', en: 'Ink Study', dzh: '左目录 + 右正文的双栏书页，暖纸底全衬线，适合长文阅读', den: 'Two-column book page: contents on the left, text on the right — warm paper, full serif' },
  '03': { id: 'sakura', zh: '樱纸', en: 'Sakura Paper', dzh: '目录横排到正文上方、首页单列大留白，极浅粉白配玫红', den: 'Horizontal contents above the text, single-column index home — pale pink and rose' },
  '04': { id: 'terminal', zh: '终端', en: 'Terminal', dzh: '右侧 tagbar + 满宽正文，全等宽字体与命令行列表', den: 'Right-hand tagbar, full-width text, all-monospace with command-line lists' },
  '05': { id: 'mono', zh: '极简黑白', en: 'Mono', dzh: '不要目录，正文满宽居中，首页是纯文字索引表', den: 'No contents panel at all — full-width centered text, index-style home' },
}

/** 从 CSS 里取几个颜色，画预设卡片的缩略色块 */
function swatchOf(css) {
  const pick = (name, block) => {
    const m = new RegExp('--' + name + ':\\s*([^;]+);').exec(block)
    return m ? m[1].trim() : ''
  }
  const iDark = css.indexOf('html.dark')
  const light = iDark > 0 ? css.slice(0, iDark) : css
  return {
    bg: pick('background', light),
    fg: pick('foreground', light),
    accent: pick('primary', light),
    card: pick('card', light),
  }
}

// 排除 *.min.css：那是调试时压缩给浏览器注入用的临时产物，不是源文件
const files = fs
  .readdirSync(SRC)
  .filter((f) => /^\d\d-.*\.css$/.test(f) && !/\.min\.css$/.test(f))
  .sort()
const presets = []
for (const f of files) {
  const num = f.slice(0, 2)
  const meta = META[num]
  if (!meta) throw new Error('未登记的预设编号: ' + f)
  const css = fs.readFileSync(path.join(SRC, f), 'utf8').trim() + '\n'
  presets.push({
    id: meta.id,
    name: { zh: meta.zh, en: meta.en },
    desc: { zh: meta.dzh, en: meta.den },
    swatch: swatchOf(css),
    css,
  })
  console.log(`  ${f} → ${meta.id} (${Buffer.byteLength(css)} bytes)`)
}

const body =
  '/**\n' +
  ' * 内置外观预设。\n' +
  ' *\n' +
  ' * 为什么要有预设：\n' +
  ' *   只给一个空白 CSS 框，多数人不知道从哪下手（「我能改什么」本身就是门槛）。\n' +
  ' *   预设把「能用、好看、日夜都调过」的成品直接摆出来，点一下填进编辑器，\n' +
  ' *   用户再在上面改两笔就成了自己的。既保留完全自由，又不要求从零写。\n' +
  ' *\n' +
  ' * 每个预设都是**完整**的 CSS：:root（日间）+ html.dark（夜间）+ 版式规则。\n' +
  ' * 不写成「只覆盖几个变量」的补丁 —— 补丁依赖默认主题的具体取值，\n' +
  ' * 默认主题一改预设就跟着走样；而且用户想改颜色时找不到完整变量表。\n' +
  ' *\n' +
  ' * 由 scripts/gen-theme-presets.mjs 从 _dev/themes/*.css 生成，不要手改。\n' +
  ' */\n\n' +
  'export const THEME_PRESETS = ' +
  JSON.stringify(presets, null, 2) +
  '\n'

fs.writeFileSync(OUT, body, 'utf8')
console.log(`\n✅ ${path.relative(process.cwd(), OUT)}  ${presets.length} 套预设  ${(Buffer.byteLength(body) / 1024).toFixed(1)} KB`)
