/**
 * 站点模板：把打包进插件的模板文件写到一个目录里。
 *
 * manager-core 的 initTemplate() 需要一个「模板根目录」（里面有 package.json、
 * src/、scripts/build-content.mjs、.github/ 等），新建连接时从它复制到仓库工作副本。
 * 源码仓库里模板根目录就是 blog-static 本身；插件版没有源码目录，
 * 所以首次需要时把打包进来的文件表铺到一个缓存目录，再把那个目录当作 toolRoot。
 */

// 由 esbuild.config.mjs 生成
import { TEMPLATE_FILES, TEMPLATE_REV } from './_template-files.js'

export type TemplateFile = { t: 'utf8'; v: string } | { t: 'base64'; v: string }

/** 记录已铺开模板指纹的文件名（放在模板目录里，随目录一起消失） */
const REV_FILE = '.template-rev'

export function templateFileCount(): number {
  return Object.keys(TEMPLATE_FILES as Record<string, TemplateFile>).length
}

/**
 * 把模板铺到 destDir（幂等：已存在的文件用内容覆盖）。
 *
 * @param fs  Obsidian 环境里用 node:fs
 * @param path node:path
 */
export function materializeTemplate(
  fs: typeof import('node:fs'),
  path: typeof import('node:path'),
  destDir: string,
): void {
  const files = TEMPLATE_FILES as Record<string, TemplateFile>
  for (const [rel, f] of Object.entries(files)) {
    const abs = path.join(destDir, rel)
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    if (f.t === 'base64') {
      fs.writeFileSync(abs, Buffer.from(f.v, 'base64'))
    } else {
      fs.writeFileSync(abs, f.v, 'utf8')
    }
  }
  // 指纹最后写：中途失败时下次仍会重铺，不会留下「看起来已就绪」的半套模板
  fs.writeFileSync(path.join(destDir, REV_FILE), TEMPLATE_REV, 'utf8')
}

/**
 * 模板是否已经铺好。
 *
 * 光检查文件「存在」不够：插件升级后模板内容会变，而旧目录里的文件一直都在，
 * 于是永远不会被覆盖。实测踩过 —— 点「更新源码」把旧模板复制进工作副本，
 * 内容和线上完全一致，git 没有 diff 就不推送，用户看到的是「点了没反应」。
 *
 * 所以必须比对指纹：`.template-rev` 与本次打包的 TEMPLATE_REV 一致才算就绪。
 * 没有该文件（旧版本铺的）一律视为未就绪，重铺一次。
 */
export function templateReady(fs: typeof import('node:fs'), path: typeof import('node:path'), dir: string): boolean {
  const revFile = path.join(dir, REV_FILE)
  if (!fs.existsSync(revFile)) return false
  try {
    if (fs.readFileSync(revFile, 'utf8').trim() !== TEMPLATE_REV) return false
  } catch {
    return false
  }
  // 指纹对了也再抽查几个关键文件，防止用户手动删掉其中一两个
  const must = ['package.json', 'next.config.ts', 'scripts/build-content.mjs', 'src/lib/api.ts']
  return must.every((m) => fs.existsSync(path.join(dir, m)))
}
