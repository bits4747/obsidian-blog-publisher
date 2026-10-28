"""
把截图目录里的 PNG 压成适合塞进管理器的小图，并生成
scripts/theme-previews.mjs（base64 数据模块）。

尺寸怎么定的：面板宽 780px，图片按容器宽度铺满，实际显示约 765 CSS px。
管理器跑在浏览器里 dpr 通常是 1.5~2，所以「清晰」要求原图至少 1150 宽。
截图是平涂色块 + 文字，PNG 调色板量化后压得很狠，1150 宽也就十几 KB。

为什么裁掉下半部分：首页下半屏是空白，留着只是浪费字节。

用法：
  python tools/preview/pack-theme-previews.py [_preview/shots] [scripts/theme-previews.mjs]
"""
import base64
import hashlib
import io
import json
import pathlib
import sys

from PIL import Image

SHOTS = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "_preview/shots")
OUT = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "scripts/theme-previews.mjs")

IDS = ["default", "study", "sakura", "mono", "tree", "bento", "neon"]

CROP_H = 620   # 只保留顶栏 + 标签栏 + 文件夹网格
W = 920        # 面板显示约 765 CSS px，920 宽在 dpr 1.2 下已经够清晰

items = []
for tid in IDS:
    src = SHOTS / (tid + ".png")
    if not src.exists():
        raise SystemExit("缺少截图: " + str(src))
    im = Image.open(src).convert("RGB")
    im = im.crop((0, 0, im.width, min(CROP_H, im.height)))
    h = round(im.height * W / im.width)
    im = im.resize((W, h), Image.LANCZOS)
    buf = io.BytesIO()
    im.convert("P", palette=Image.ADAPTIVE, colors=160).save(
        buf, format="PNG", optimize=True
    )
    raw = buf.getvalue()
    items.append((tid, base64.b64encode(raw).decode("ascii"), len(raw)))
    print(
        f"  {tid:<9} {W}x{h}  {len(raw)/1024:.1f} KB  -> base64 {len(items[-1][1])/1024:.1f} KB"
    )

body = (
    "/**\n"
    " * 内置主题的预览图（base64 PNG）。\n"
    " *\n"
    " * 由 tools/preview/gen-theme-previews.mjs + tools/preview/pack-theme-previews.py 生成，不要手改。\n"
    " * 截图内容全部是通用示例笔记（站名「示例博客」），不含任何真实个人信息。\n"
    " *\n"
    " * 为什么内嵌而不是放几个 png 文件：管理器在 Obsidian 里是以插件打包的\n"
    " * worker.js 运行的，装到 .obsidian/plugins 之后磁盘上没有「图片目录」这个概念；\n"
    " * 内嵌成字符串，worker 里直接按 /preset-preview/<id>.png 吐出去最省事。\n"
    " */\n\n"
    "export const THEME_PREVIEWS = {\n"
)
for tid, b64, _ in items:
    body += f"  {json.dumps(tid)}: {json.dumps(b64)},\n"
body += "}\n\n"

# 版本号：图片改了但文件名不变，浏览器会拿 86400 秒的缓存，一直看旧图。
# 用内容哈希做 query 参数（?v=），一改就换 URL，缓存自然失效。
digest = hashlib.sha256("".join(b for _, b, _ in items).encode("ascii")).hexdigest()[:10]
body += (
    "// 预览图内容哈希：改图就变，拼在 URL 后面（?v=）让浏览器缓存失效。\n"
    f"export const THEME_PREVIEW_VERSION = {json.dumps(digest)}\n"
)

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(body, encoding="utf-8")
total = sum(n for _, _, n in items)
print(
    f"\nOK {OUT}  {len(items)} 张  {total/1024:.1f} KB(png) "
    f"-> {OUT.stat().st_size/1024:.1f} KB(module)  v={digest}"
)
