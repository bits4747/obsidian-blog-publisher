/**
 * 主题预览图的本地服务。
 *
 * 它把一个已经构建好的站点目录（`out/`）按普通静态服务器发出去，并额外提供两个路由：
 *   /preset/<id>.css  直接吐出某个内置预设的 CSS 原文（截图脚本注入用）
 *   /pv/<id>/         首页 + 注入该预设，等于「这套主题看起来是什么样」
 *
 * 为什么截图不能直接开 out/index.html：主题是一层外链 CSS，要看到某套预设必须把
 * 那段 CSS 也塞进页面；另外无头浏览器每次都是新 profile，localStorage 是空的，
 * 想截「放大字号之后」的样子还得靠查询参数注入。
 *
 * 用法：node tools/preview/preview-serve.mjs <站点产物目录> [端口]
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THEME_PRESETS } from '../../scripts/theme-presets.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(process.argv[2] || path.join(__dirname, '..', '..', '_preview', 'site'))
const PORT = Number(process.argv[3] || 3480)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
}

const byId = new Map(THEME_PRESETS.map((p) => [p.id, p]))

/**
 * 自检脚本：放大字号后查「文字被裁」和「元素越出卡片」。
 * 结果写进 document.title，配合 chrome --dump-dom 读回来 ——
 * 这样能一次跑完「每套主题 × 首页/笔记页 × 几个字号」，不用一张张看图。
 */
const PROBE = `<script>
setTimeout(() => {
  const clipped = []
  const escape = []
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el)
    if (cs.display === 'inline' || cs.display === 'contents') continue
    if (((cs.overflowY === 'hidden' || cs.overflowY === 'clip') && el.scrollHeight > el.clientHeight + 1) ||
        ((cs.overflowX === 'hidden' || cs.overflowX === 'clip') && el.scrollWidth > el.clientWidth + 1))
      clipped.push(el.tagName + '.' + (el.className || '').toString().slice(0, 24))
  }
  const cards = document.querySelectorAll(
    '[data-region="folders"] > *, [data-region="list"] > *, [data-region="tags"] a, [data-region="tags"] button'
  )
  for (const card of cards) {
    const r = card.getBoundingClientRect()
    if (!r.width || !r.height) continue
    for (const ch of card.querySelectorAll('*')) {
      const cr = ch.getBoundingClientRect()
      if (!cr.width || !cr.height) continue
      if (cr.bottom > r.bottom + 2 || cr.right > r.right + 2)
        escape.push(card.textContent.trim().slice(0, 8) + ' / ' + ch.tagName + '.' + (ch.className || '').toString().slice(0, 20) + ' d=' + Math.round(cr.bottom - r.bottom))
    }
  }
  const de = document.documentElement
  document.title = 'PROBE ' + JSON.stringify({
    fs: getComputedStyle(de).getPropertyValue('--site-fs').trim(),
    nClipped: clipped.length, clipped: clipped.slice(0, 5),
    nEscape: escape.length, escape: escape.slice(0, 5),
    hScroll: de.scrollWidth > de.clientWidth + 1
  })
}, 2500)
</script>`

const INDEX = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')

/** 在首页 HTML 的 </head> 前插一段额外样式 */
function withCss(href) {
  if (!href) return INDEX
  return INDEX.replace('</head>', `<link rel="stylesheet" href="${href}"></head>`)
}

http
  .createServer((req, res) => {
    const raw = decodeURIComponent(req.url.split('?')[0])

    // 预设 CSS 原文（截图时注入用）
    const mCss = /^\/preset\/([\w-]+)\.css$/.exec(raw)
    if (mCss) {
      const p = byId.get(mCss[1])
      if (!p) {
        res.writeHead(404)
        res.end('no')
        return
      }
      res.writeHead(200, { 'content-type': 'text/css; charset=utf-8' })
      res.end(p.css)
      return
    }

    // /pv/<id>/ 或 /pv/default/ —— 首页 + 注入该主题
    // ?fs=1.6 顺带把阅读字号写进 localStorage，用来截「放大后」的样子。
    const mPv = /^\/pv\/([\w-]+)\/?$/.exec(raw)
    if (mPv) {
      const id = mPv[1]
      const href = id === 'default' ? '' : `/preset/${id}.css`
      if (id !== 'default' && !byId.has(id)) {
        res.writeHead(404)
        res.end('no')
        return
      }
      const q = new URL(req.url, 'http://x').searchParams
      const fsq = Number(q.get('fs'))
      let html = withCss(href)
      if (Number.isFinite(fsq) && fsq > 0) {
        html = html.replace(
          '</head>',
          `<script>try{localStorage.setItem('font-scale','${fsq}')}catch(e){}</script></head>`
        )
      }
      if (q.get('probe')) html = html.replace('</head>', PROBE + '</head>')
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
      res.end(html)
      return
    }

    let p = raw
    if (p.endsWith('/')) p += 'index.html'
    let file = path.join(ROOT, p)
    if (!file.startsWith(ROOT)) {
      res.writeHead(403)
      res.end('no')
      return
    }
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html'
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file)) file = path.join(ROOT, 'index.html')
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream'
    res.writeHead(200, { 'content-type': type })
    fs.createReadStream(file).pipe(res)
  })
  .listen(PORT, '127.0.0.1', () => console.log('preview server on ' + PORT + ' root=' + ROOT))
