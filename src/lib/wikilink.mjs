/**
 * Obsidian 语法解析的**唯一实现**。
 *
 * 为什么单独一个文件：这几条规则（wikilink 扫描、坏引用修复、标签提取、
 * 链接解析）在**构建期**（`scripts/build-content.mjs`，纯 Node）和**渲染期**
 * （`src/lib/obsidian.ts` / `remark-obsidian.ts`，浏览器）都要用，而且必须
 * 逐字一致 —— 一旦两边判得不一样，就会出现「正文里是标签、标签页里没有」
 * 「大纲有这条、点进去 404」这类自相矛盾的 bug。
 *
 * 以前是两份手抄的副本，靠注释里写「必须与另一边保持同一实现」来维持。
 * 现在改成这一个 `.mjs`：TS 侧 `allowJs` 直接引，Node 侧原生 ESM 引，
 * 谁都不用再抄。**改这里就是同时改两边，不存在漂移。**
 *
 * 注意：本文件不能 import 任何 TS 类型或 Next 专属东西，它要能在裸 Node 里跑。
 */

/** @typedef {{ start: number, end: number, isEmbed: boolean, inner: string }} WikiToken */
/** @typedef {{ target: string, heading: string, alias: string | null }} LinkParts */
/** @typedef {{ all: string[], embeds: string[], links: string[] }} WikiRefs */

/** 路径归一化：统一斜杠、去 ./ 前缀、去开头的斜杠 */
export function normalizePath(p) {
  return String(p).replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '')
}

/** vault 相对路径 → URL slug（去 .md，保留层级） */
export function toSlug(p) {
  return normalizePath(p).replace(/\.(md|markdown)$/i, '')
}

/**
 * markdown 链接 `[文字](url)` → `文字`。支持一层嵌套方括号
 * （如 `[P3216 [HNOI2011]数学作业](url)`），由内向外反复剥。
 */
const MD_LINK_RE = /\[([^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*)\]\([^()]*\)/g
export function stripMdLinks(input) {
  let cur = input
  let prev
  let guard = 0
  do {
    prev = cur
    cur = cur.replace(MD_LINK_RE, '$1')
  } while (cur !== prev && ++guard < 8)
  return cur
}

/**
 * 扫描文本里的 [[...]] / ![[...]]，**允许内部出现成对的方括号**。
 *
 * 不能再用 /\[\[([^\[\]]+?)\]\]/ 这种正则：本库的标题经常本身是 markdown 链接，
 * 例如 `[[CSP-S#[P8820 [CSP-S 2022] 数据传输](https://…)]]`，
 * 正则会在第一个 ] 处截断，整条引用失效（真实踩过）。
 *
 * @param {string} text
 * @returns {WikiToken[]}
 */
export function scanWikilinks(text) {
  /** @type {WikiToken[]} */
  const out = []
  let i = 0
  while (i < text.length) {
    const isEmbed = text[i] === '!' && text[i + 1] === '[' && text[i + 2] === '['
    const plain = text[i] === '[' && text[i + 1] === '['
    if (!isEmbed && !plain) {
      i += 1
      continue
    }
    const open = i + (isEmbed ? 3 : 2)
    let j = open
    let depth = 0
    let end = -1
    while (j < text.length) {
      const ch = text[j]
      if (ch === '\n') break
      if (ch === '\\') {
        j += 2
        continue
      }
      if (ch === '[') {
        depth += 1
        j += 1
        continue
      }
      if (ch === ']') {
        if (depth > 0) {
          depth -= 1
          j += 1
          continue
        }
        if (text[j + 1] === ']') {
          end = j + 2
          break
        }
        j += 1
        continue
      }
      j += 1
    }
    if (end < 0) {
      i = open
      continue
    }
    out.push({ start: i, end, isEmbed, inner: text.slice(open, end - 2) })
    i = end
  }
  return out
}

/**
 * 修复 Obsidian / 编辑器产生的一类坏引用：把 markdown 链接塞进了 wikilink。
 *
 * 形如 `![[显示文字](网址)](笔记.md#标题)`（没有闭合的 `]]`），本库里真实存在
 * （DP/DDP.md 最后一行）。统一改写成 `![[笔记.md#标题|显示文字]]`。
 * 只处理「整行就是这一条」且没有 `]]` 的行，避免误伤正常内容。
 *
 * 另外，**任何** wikilink 内部只要含 markdown 链接语法都要剥成纯文字：
 * mdast 解析阶段 `[文字](url)` 会先变成 link 节点，把 `[[` 与 `]]` 拆到不同
 * 节点里，后面的 wikilink 扫描就再也拼不回来了（Obsidian 复制「标题本身是
 * 链接」的引用正好是这种形态）。extractHeadingSection 匹配标题时同样会剥掉
 * 链接语法，所以这里剥完两边仍然对得上。
 *
 * @param {string} content
 * @returns {string}
 */
const ARTIFACT_LINE = /^(\s*)(!?)\[\[(.+?)\]\(([^)]*)\)\]\((.+)\)\s*$/
export function repairObsidianArtifacts(content) {
  if (!content.includes('[[')) return content
  let inFence = false
  const lines = content.split('\n').map((line) => {
    // 代码块里的 [[ ]] 是示例代码，不是引用
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return line
    }
    if (inFence || !line.includes('[[')) return line
    let l = line
    if (!l.includes(']]')) {
      const m = ARTIFACT_LINE.exec(l)
      if (m) {
        const [, indent, bang, label, , target] = m
        l = `${indent}${bang}[[${target.trim()}|${label.trim()}]]`
      }
    }
    const toks = scanWikilinks(l)
    if (toks.length === 0) return l
    let res = ''
    let last = 0
    for (const tk of toks) {
      res += l.slice(last, tk.start)
      res += (tk.isEmbed ? '!' : '') + '[[' + stripMdLinks(tk.inner) + ']]'
      last = tk.end
    }
    return res + l.slice(last)
  })
  return lines.join('\n')
}

/**
 * `[[path#heading|alias]]` → { target, heading, alias }
 *
 * @param {string} link
 * @returns {LinkParts}
 */
export function parseWikilink(link) {
  let s = String(link).trim()
  /** @type {string | null} */
  let alias = null
  const bi = s.indexOf('|')
  if (bi >= 0) {
    alias = s.slice(bi + 1).trim() || null
    s = s.slice(0, bi)
  }
  let heading = ''
  const hi = s.indexOf('#')
  if (hi >= 0) {
    heading = s.slice(hi)
    s = s.slice(0, hi)
  }
  // 块引用 [[笔记#^blockid]]：保留块 ID（悬浮预览用），跳转时按整篇笔记处理
  s = normalizePath(s.replace(/\.(md|markdown)$/i, ''))
  return { target: s, heading, alias }
}

/**
 * 收集一篇笔记里的全部 wikilink 引用。
 *
 * @param {string} raw
 * @returns {WikiRefs}
 */
export function extractWikiRefs(raw) {
  /** @type {string[]} */
  const all = []
  /** @type {string[]} */
  const embeds = []
  /** @type {string[]} */
  const links = []
  for (const tk of scanWikilinks(repairObsidianArtifacts(raw))) {
    all.push(tk.inner)
    ;(tk.isEmbed ? embeds : links).push(tk.inner)
  }
  return { all, embeds, links }
}

/**
 * 标签：frontmatter.tags/tag + 正文行内 #标签
 *
 * 行内标签提取前先移除：
 * - wikilink/锚点（避免 [[#标题]] 被误判）
 * - 代码块与行内代码（避免 #include、#define 等被误判为标签）
 * - HTML 标签及其属性（避免 <font color="#ff0000"> 的颜色代码被误判为标签）
 * 另外纯数字（#2427 这种题目编号）与 3~8 位十六进制（#ff0000）都不算标签。
 *
 * @param {Record<string, unknown>} data
 * @param {string} content
 * @returns {string[]}
 */
export function extractTags(data, content) {
  /** @type {Set<string>} */
  const out = new Set()
  /** @param {unknown} v */
  const add = (v) => {
    if (typeof v === 'string') {
      v.split(/[,，]/).forEach((s) => {
        const t = s.trim()
        if (t) out.add(t)
      })
    } else if (Array.isArray(v)) {
      v.forEach((x) => {
        if (typeof x === 'string' && x.trim()) out.add(x.trim())
      })
    }
  }
  add(data.tags)
  add(data.tag)
  const plain = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/<[^>\n]+>/g, ' ')
    .replace(/\[\[[^\]\n]*\]\]/g, ' ')
  for (const m of plain.matchAll(/(^|[^\w#])#([\p{L}\p{N}][\p{L}\p{N}_/-]*)/gu)) {
    const t = m[2]
    if (t && !/^\d+$/.test(t) && !/^[0-9a-fA-F]{3,8}$/.test(t)) out.add(t)
  }
  return [...out].slice(0, 30)
}
