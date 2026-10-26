#!/usr/bin/env bash
# 端到端测试一键运行：同一进程组内启动管理器 + 跑测试 + 收尾
# 注意：跨命令访问 localhost 在有些环境下会被隔离，所以必须同一次调用内完成。
set -u
cd "$(dirname "$0")/.." || exit 1

# 临时目录：用系统给的 TMPDIR/TEMP/TMP，拿不到才退回 /tmp。
# 不要写死某个用户的目录，否则换台机器就跑不了。
T="${TMPDIR:-${TEMP:-${TMP:-/tmp}}}"
T="${T%/}"

# 用户数据目录：与 scripts/manager.mjs 的解析规则保持一致。
# （Windows: %APPDATA%\obsidian-blog；macOS: ~/Library/Application Support/obsidian-blog；
#   Linux: ${XDG_CONFIG_HOME:-~/.config}/obsidian-blog）
if [ -n "${OBSIDIAN_BLOG_DATA:-}" ]; then
  DATA="$OBSIDIAN_BLOG_DATA"
elif [ "$(uname -s 2>/dev/null)" = "Darwin" ]; then
  DATA="$HOME/Library/Application Support/obsidian-blog"
elif [ -n "${APPDATA:-}" ]; then
  DATA="$APPDATA/obsidian-blog"
else
  DATA="${XDG_CONFIG_HOME:-$HOME/.config}/obsidian-blog"
fi

# 管理器监听的端口（与 manager.mjs 里的 PORT 一致）
# 下面第 0 步会 kill 掉占用这个端口的进程 —— 所以测试默认用 3458 这个测试专用端口，
# 不去动用户可能正开着的 3457。想换端口就自己传 PORT=xxxx。
PORT="${PORT:-3458}"

# 0. 清理上一轮残留：先杀掉占用端口的旧进程（否则新实例绑定失败）
if command -v netstat >/dev/null 2>&1; then
  if command -v taskkill >/dev/null 2>&1; then
    # Windows / Git Bash
    netstat -ano | grep ":$PORT" | grep LISTENING | awk '{print $NF}' | sort -u | while read -r pid; do
      taskkill //PID "$pid" //F >/dev/null 2>&1
    done
  else
    # Linux / macOS
    lsof -ti tcp:"$PORT" 2>/dev/null | while read -r pid; do
      kill "$pid" 2>/dev/null
    done
  fi
fi
sleep 1

# 测试要跑「全新用户」场景，所以清掉测试用的数据目录（脚本自己用的副本，不是用户的正式数据）
rm -rf "$T/mgr-cloneA" "$T/mgr-cloneB" "$T/mgr-e2e-data"

# 0.5 准备测试骨架（fixture）：两个本地 Obsidian 库 + 两个「假 GitHub」裸仓库
#     ⚠️ 这一步不能省：e2e-test.mjs 直接用这些路径，不自己创建。
#     裸仓库必须由 bash 预建 —— node 里 rm+mkdir 之后立刻 git init，Windows 会 EBUSY。
rm -rf "$T/mgr-vaultA" "$T/mgr-vaultB" "$T/mgr-remote.git" "$T/mgr-remoteB.git"
mkdir -p "$T/mgr-vaultA/.obsidian" "$T/mgr-vaultB/.obsidian"
# A1 公开、A2 私密（无 frontmatter 即默认私密）、B1 公开
printf -- '---\npublic: true\n---\n\n# A1\n\n测试内容 A1\n' > "$T/mgr-vaultA/A1.md"
printf -- '# A2\n\n私密内容 A2\n'                          > "$T/mgr-vaultA/A2.md"
printf -- '---\npublic: true\n---\n\n# B1\n\n测试内容 B1\n' > "$T/mgr-vaultB/B1.md"
git init --bare -q "$T/mgr-remote.git"
git init --bare -q "$T/mgr-remoteB.git"
# 默认分支统一成 main：本机 git 的 init.defaultBranch 可能是 master，
# 不统一的话后面 push HEAD 会推到 master，测试里 clone 出来的分支名跟着错。
git -C "$T/mgr-remote.git"  symbolic-ref HEAD refs/heads/main
git -C "$T/mgr-remoteB.git" symbolic-ref HEAD refs/heads/main

# 1. 启动管理器（用独立的临时数据目录，别动用户已有的连接与令牌）
E2E_DATA="$T/mgr-e2e-data"
OBSIDIAN_BLOG_DATA="$E2E_DATA" MGR_PORT="$PORT" node scripts/manager.mjs > "$T/mgr-run.log" 2>&1 &
MGR_PID=$!
sleep 3

# 2. 跑测试
OBSIDIAN_BLOG_DATA="$E2E_DATA" MGR_PORT="$PORT" node scripts/e2e-test.mjs
EXIT=$?

# 3. 收尾
kill "$MGR_PID" 2>/dev/null
rm -rf "$E2E_DATA" "$T/mgr-vaultA" "$T/mgr-vaultB" "$T/mgr-remote.git" "$T/mgr-remoteB.git"
echo ""
echo "===== 管理器日志 ====="
cat "$T/mgr-run.log"
rm -f "$T/mgr-run.log"
exit $EXIT
