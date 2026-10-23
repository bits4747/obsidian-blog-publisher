// 极简静态文件服务器：预览构建产物（模拟 GitHub Pages 行为）
//
// 构建产物已经搬到用户数据目录的 build/site 下（源码目录不放笔记内容），
// 所以默认根目录不再是项目里的 out/，而是用户数据目录里的那份。
// 也可以手动指定：node scripts/serve.mjs <目录> [端口]
import { createServer } from 'node:http'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

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

const DEFAULT_ROOT = path.join(DATA_DIR, 'build', 'site')
const ROOT = path.resolve(process.argv[2] || DEFAULT_ROOT)
const PORT = Number(process.argv[3] || 8080)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x')
    let p = decodeURIComponent(url.pathname)
    if (p.endsWith('/')) p += 'index.html'
    let file = path.join(ROOT, p)
    // 用相对路径判断是否越权：直接 startsWith 会把 ROOT 的同级目录
    // （例如 /site-other）也当成在 ROOT 里面。
    const rel = path.relative(ROOT, file)
    if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('越权')
    // 只有「看起来像页面导航」的请求才回退到 index.html。
    // 带扩展名的（.json/.png/.js…）是资源请求，缺失就该老实返回 404：
    // 否则前端请求一篇不存在的笔记会拿到 200 + HTML，JSON 解析失败后
    // 被当成「加载失败」，而正确结论是「这篇笔记不存在」。
    const looksLikeAsset = /\.[a-z0-9]+$/i.test(p)
    try {
      await fs.access(file)
    } catch {
      if (looksLikeAsset) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
        res.end('not found')
        return
      }
      file = path.join(ROOT, 'index.html') // 查询参数路由的 SPA 兜底
    }
    const body = await fs.readFile(file)
    res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
}).listen(PORT, () => console.log(`静态预览: http://localhost:${PORT}/`))
