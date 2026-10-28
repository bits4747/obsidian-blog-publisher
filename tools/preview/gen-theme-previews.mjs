/**
 * 批量生成「外观预设」的预览图。
 *
 * 为什么用无头 Chrome 而不是普通浏览器：需要固定的窗口尺寸、固定的缩放，
 * 而且要连拍七张；无头模式还能保证没有任何浏览器扩展（翻译插件之类）的浮标
 * 混进截图里 —— 预览图会打包进插件随源码分发，多一个浮标就是多一处不该出现的元素。
 *
 * 内容用的是 tools/preview/make-preview-content.mjs 生成的通用示例笔记
 * （站名「示例博客」），不含任何真实笔记内容。
 *
 * 用法：
 *   node tools/preview/gen-theme-previews.mjs <站点产物目录> <输出目录>
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const SITE = path.resolve(process.argv[2] || '_preview/site')
const OUT = path.resolve(process.argv[3] || '_preview/shots')
const PORT = 3480
/** Chrome 的可执行文件；不在默认位置时用 CHROME 环境变量指定 */
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const W = 1240
const H = 760

const IDS = ['default', 'study', 'sakura', 'mono', 'tree', 'bento', 'neon']

fs.mkdirSync(OUT, { recursive: true })

for (const id of IDS) {
  const out = path.join(OUT, id + '.png')
  if (fs.existsSync(out)) fs.rmSync(out)
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--virtual-time-budget=6000',
      `--window-size=${W},${H}`,
      `--screenshot=${out}`,
      `http://127.0.0.1:${PORT}/pv/${id}/`,
    ],
    { stdio: 'pipe' }
  )
  console.log(`  ${id.padEnd(9)} ${(fs.statSync(out).size / 1024).toFixed(0)} KB`)
}
console.log('完成 → ' + OUT)
