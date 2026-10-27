/**
 * 管理器的整套界面：HTML 结构 + CSS + 内联客户端脚本，整块字符串。
 *
 * 抽成独立模块的原因：同一套界面要被两处使用 ——
 *   ① scripts/manager.mjs 用 node:http 把它发给浏览器；
 *   ② Obsidian 插件把它塞进 iframe 里显示。
 * 界面只有一份，插件的功能才可能与管理器完全一致。
 *
 * ⚠️ 这个字符串里不能出现反引号或 ${ 开头的插值（会截断模板），
 *    客户端代码里要拼接反引号必须写成 \\`。
 */
export const UI = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>Publish Manager</title>
<style>
  /* 主题变量：默认浅色，prefers-color-scheme: dark 时切蓝黑，
     也可以用 <html data-theme="dark|light"> 手动覆盖（右上角按钮切换）。 */
  :root {
    --bg: #f6f7f9; --fg: #1f2937; --card: #fff; --border: #e5e7eb; --border-soft: #f0f0f0;
    --muted: #6b7280; --muted-2: #9ca3af; --field: #d1d5db;
    /* 与站点同一族蓝（站点 --primary 约 #2570cc），管理器按钮/选中态全部用这个蓝 */
    --accent: #2570cc; --accent-hover: #1d5fbb; --accent-soft: #eaeffa; --accent-soft-hover: #d8e4f8;
    --hover: #f9fafb; --chip: #e5e7eb; --chip-fg: #374151; --btn-ghost: #f3f4f6;
    --ok: #059669; --ok-bg: #10b981; --ok-bg-hover: #15803d; --bad: #dc2626; --warn-bg: #fffbeb; --warn-fg: #92400e; --warn-bd: #fde68a;
    --bar: rgba(246,247,249,.92);
    --shadow: rgba(0,0,0,.25);
    --busy-bg: #eef2ff; --busy-fg: #3730a3; --okbg: #ecfdf5; --okfg: #065f46; --errbg: #fef2f2; --errfg: #991b1b;
  }
  html[data-theme="dark"] {
    --bg: #0f1420; --fg: #e5e9f2; --card: #171d2b; --border: #2a3348; --border-soft: #222a3d;
    --muted: #97a3b8; --muted-2: #6f7c93; --field: #38425a;
    --accent: #5b9bf8; --accent-hover: #7bb0fb; --accent-soft: #1c2740; --accent-soft-hover: #24334f;
    --hover: #1e2637; --chip: #2a3348; --chip-fg: #cbd5e6; --btn-ghost: #232b3d;
    --ok: #34d399; --ok-bg: #10b981; --ok-bg-hover: #15803d; --bad: #f87171; --warn-bg: #3a2f14; --warn-fg: #fcd34d; --warn-bd: #6b5520;
    --bar: rgba(15,20,32,.92);
    --shadow: rgba(0,0,0,.55);
    --busy-bg: #1e2740; --busy-fg: #a5b8f5; --okbg: #12301f; --okfg: #6ee7b7; --errbg: #3a1a1c; --errfg: #fca5a5;
  }
  body { font-family: system-ui, 'Microsoft YaHei', sans-serif; background: var(--bg); margin: 0; padding: 20px; color: var(--fg); }
  .wrap { max-width: 1100px; margin: 0 auto; }
  h1 { font-size: 21px; margin: 0 0 4px; } .sub { color: var(--muted); font-size: 14.5px; margin-bottom: 14px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; margin-bottom: 14px; }
  .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  input, select { padding: 8px 10px; border: 1px solid var(--field); border-radius: 8px; font-size: 15.5px;
                  background: var(--card); color: var(--fg); }
  input#q { flex: 1; min-width: 160px; }
  button { padding: 8px 14px; border: 0; border-radius: 8px; background: var(--accent); color: #fff; font-size: 15px; cursor: pointer; }
  button.mini { padding: 3px 9px; font-size: 13.5px; background: var(--chip); color: var(--chip-fg); }
  button.mini.green { background: var(--accent); color: #fff; }
  button:disabled { opacity: .55; cursor: default; }
  /* 文件夹区用「列容器」布局：每个 .grid-col 是一条独立的纵向流。
     这样展开某个文件夹只会把它自己那一列撑高，其它列既不会被行高带着下移，也不会留下大片空白。 */
  .grid { display: flex; align-items: flex-start; gap: 12px; }
  .grid-col { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
  .box { background: var(--card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .box-head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--border-soft); cursor: pointer; }
  .box-head:hover { background: var(--hover); }
  .box-head .name { font-weight: 600; font-size: 16.5px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  /* 文件夹标题上的批量按钮：不许被压缩、不许换行，窄列里优先保住文件夹名 */
  .box-head button.mini { flex-shrink: 0; white-space: nowrap; padding: 3px 7px; }
  .box-head .cnt { flex-shrink: 0; }
  .box-head { gap: 6px; }
  .cnt { font-size: 13.5px; color: var(--muted-2); }
  .chev { transition: transform .15s; color: var(--muted-2); }
  .chev.open { transform: rotate(90deg); }
  ul { list-style: none; margin: 0; padding: 6px; }
  li { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 6px; }
  li:hover { background: var(--hover); }
  .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15.5px; }
  .pub { color: var(--accent); font-size: 13.5px; } .pri { color: var(--muted-2); font-size: 13.5px; }
  .sw { position: relative; width: 32px; height: 18px; border-radius: 999px; background: var(--field); border: 0; cursor: pointer; transition: .15s; flex-shrink: 0; }
  .sw.on { background: var(--accent); } .sw::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: #fff; transition: .15s; }
  .sw.on::after { left: 16px; }
  /* ---- 变更分类：新增 / 修改 / 删除 ---- */
  .chg { font-size: 12.5px; font-weight: 600; padding: 1px 6px; border-radius: 999px; flex-shrink: 0;
         border: 1px solid transparent; white-space: nowrap; }
  .chg.add { color: var(--ok); background: color-mix(in srgb, var(--ok) 12%, transparent); border-color: color-mix(in srgb, var(--ok) 35%, transparent); }
  .chg.mod { color: var(--warn-fg); background: var(--warn-bg); border-color: var(--warn-bd); }
  .chg.del { color: var(--bad); background: color-mix(in srgb, var(--bad) 12%, transparent); border-color: color-mix(in srgb, var(--bad) 35%, transparent); }
  .box-head .sum { display: flex; gap: 4px; flex-shrink: 0; }
  li.gone .t { text-decoration: line-through; color: var(--muted-2); }
  /* ---- 自动同步设置条 ---- */
  /* 变更三栏：新增 / 修改 / 删除，在所有文件夹上方一次列全 */
  /* align-items:start —— 每栏按自己的条目数决定高度。默认的 stretch 会把三栏拉成一样高，
     某一栏条目多的时候另外两栏就只剩一大片空白。 */
  .chgcols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; align-items: start; }
  /* 没有改动时把「变更」这张卡压扁：只留标题行 + 一行提示，别占半屏 */
  #chgCard.is-empty .chgcols { display: block; }
  #chgCard.is-empty .row { margin-bottom: 0; }
  .chgnone { display: flex; align-items: center; gap: 7px; padding: 2px 0 2px 2px;
             font-size: 14px; color: var(--muted-2); }
  .chgnone .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
  .chgcol { border: 1px solid var(--border-soft); border-radius: 9px; overflow: hidden; display: flex; flex-direction: column; }
  .chgcol .ch { display: flex; align-items: center; gap: 6px; padding: 7px 10px; font-size: 14px; font-weight: 600; border-bottom: 1px solid var(--border-soft); }
  .chgcol .ch .n { margin-left: auto; font-size: 13.5px; color: var(--muted); }
  .chgcol ul { list-style: none; margin: 0; padding: 4px 0; max-height: 190px; overflow: auto; }
  .chgcol li { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 14.5px; cursor: pointer; }
  .chgcol li:hover { background: var(--hover); }
  .chgcol li .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chgcol li .p { font-size: 13px; color: var(--muted-2); max-width: 46%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chgcol .empty { padding: 10px; font-size: 14px; color: var(--muted-2); }
  /* 未分组块：有内容时和下面的文件夹网格留出间隔，空的时候不占位 */
  #ungrouped:not(:empty) { margin-bottom: 12px; }
  #ungrouped .box { border-color: var(--border); }
  /* 未分组里可能塞了上百篇笔记，一条长龙不好翻：按列排，宽度够就自动多列 */
  #ungrouped ul { column-width: 300px; column-gap: 10px; }
  #ungrouped li { break-inside: avoid; }
  #folders li.flash { background: var(--accent-soft); }
  .autosync { display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    padding: 8px 11px; margin-top: 12px; border: 1px dashed var(--border); border-radius: 8px; }
  .autosync > .lbl { font-size: 14px; font-weight: 600; color: var(--muted); }
  .autosync label { display: flex; align-items: center; gap: 5px; font-size: 14px; cursor: pointer; color: var(--fg); }
  .autosync .hint { font-size: 13.5px; color: var(--muted-2); margin-left: auto; }
  /* ---- 自动同步流水：时间 + 动了哪些文件 + 推没推上去 + 有没有上线 ---- */
  .autolog-head { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .autolog-head .t { font-size: 13.5px; font-weight: 600; color: var(--muted); }
  .autolog-head .mini { margin-left: auto; padding: 2px 8px; font-size: 13px; }
  /* 流水不限高度：条目多了就整页往下长（原来卡 4 行要滚动，翻历史很别扭） */
  .autolog { margin-top: 4px; font-size: 13.5px; color: var(--muted-2);
    display: flex; flex-direction: column; gap: 5px; }
  .autolog .al { display: flex; flex-direction: column; gap: 1px; }
  .autolog .al-top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .autolog .tm { font-variant-numeric: tabular-nums; color: var(--muted); }
  .autolog .st { font-weight: 600; }
  .autolog .st.ok { color: var(--accent); } .autolog .st.bad { color: var(--bad); }
  .autolog .st.wait { color: var(--muted); } .autolog .st.skip { color: var(--muted-2); }
  .autolog .cs { color: var(--muted-2); }
  .autolog .took { color: var(--muted-2); }
  .autolog .sha { font-family: ui-monospace, Menlo, Consolas, monospace; color: var(--muted-2); }
  /* 第二行：这次动了哪些文件 —— 三栏里不再重复列这些，改由流水说明 */
  .autolog .al-files { display: flex; gap: 10px; flex-wrap: wrap; padding-left: 2px; font-size: 13px; }
  .autolog .fs { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .autolog .fs.add { color: var(--ok); } .autolog .fs.mod { color: var(--warn-fg); }
  .autolog .fs.del { color: var(--bad); }
  .hidden { display: none; }
  label { font-size: 14.5px; color: var(--muted); }
  .vault-ok { color: var(--accent); } .vault-bad { color: var(--bad); }
  /* ---- 顶部状态栏（发布反馈出现在这里，不用滚到底部）---- */
  .statusbar { position: sticky; top: 0; z-index: 30; margin: -20px -20px 14px; padding: 12px 20px;
               background: var(--bar); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
  .statusbar .inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .statusbar .title { font-size: 19px; font-weight: 700; white-space: nowrap; }
  .statusbar .spacer { flex: 1; }
  /* 主操作按钮用蓝色（与站点主色一致）；绿色只留给「已公开」状态本身 */
  .btn-publish { background: var(--accent); padding: 9px 18px; font-size: 15.5px; font-weight: 600;
                 box-shadow: 0 1px 2px rgba(37,112,204,.3); white-space: nowrap; }
  .btn-publish:hover:not(:disabled) { background: var(--accent-hover); }
  /* 顶栏里原来的「结果小胶囊」已按用户要求删除：所有操作结果统一走右上角弹窗，
     顶栏不再有任何会自己变化的小块。 */
  /* 非关键的「顺带成功」日志（站名变量同步等）淡一档：
     它们和成败混在同一视觉层级时，会让人把整次发布误判成成功（真实踩过）。 */
  .toast .tb pre .dim { opacity: .6; }

  /* ---- 右上角操作提示：每次「发布 / 更新源码 / 保存外观」都要有一条
     从「进行中」走到「成功 / 失败」的提示。用户反馈只看顶部小胶囊分不清
     「还没推送上去」和「正在跑」，所以做成独立浮层，带转圈和耗时。
     top 值让出顶栏高度：顶栏是 sticky 且要能点（发布 / 外观按钮就在那儿），
     贴 top:14px 会把按钮盖住 —— 实测截图确认过，所以往下挪到顶栏之下。 ---- */
  .toasts { position: fixed; top: 76px; right: 14px; z-index: 90; display: flex; flex-direction: column;
            gap: 8px; width: min(370px, calc(100vw - 28px)); pointer-events: none; }
  .toast { pointer-events: auto; cursor: pointer; background: var(--card); border: 1px solid var(--border); border-radius: 11px;
           padding: 10px 12px; box-shadow: 0 10px 30px var(--shadow); font-size: 14px;
           animation: tin .18s ease-out; }
  @keyframes tin { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  .toast .th { display: flex; align-items: center; gap: 7px; font-weight: 600; font-size: 14.5px; }
  .toast .th .tt { flex: 1; min-width: 0; }
  /* 没有关闭小 ×：点卡片任意位置即关闭（见 toastOpen 里的 click 监听）。
     只提示一下可点，不给按钮。 */
  .toast:hover { border-color: var(--accent); }
  .toast .tb { margin-top: 5px; color: var(--muted); font-size: 13.5px; line-height: 1.55; word-break: break-word; }
  .toast .spin { width: 13px; height: 13px; border-radius: 50%; border: 2px solid var(--accent);
                 border-top-color: transparent; animation: tspin .8s linear infinite; flex-shrink: 0; }
  @keyframes tspin { to { transform: rotate(360deg); } }
  .toast .ic { width: 15px; height: 15px; border-radius: 50%; flex-shrink: 0; display: inline-flex;
               align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; }
  .toast .ic.ok { background: var(--ok); } .toast .ic.bad { background: var(--bad); }
  .toast.busy { border-left: 3px solid var(--accent); }
  .toast.ok   { border-left: 3px solid var(--ok); }
  .toast.bad  { border-left: 3px solid var(--bad); }
  .toast .tb details { margin-top: 5px; }
  .toast .tb pre { margin: 5px 0 0; white-space: pre-wrap; font: 11.5px/1.6 Consolas, monospace;
                   color: var(--muted-2); max-height: 170px; overflow: auto; }
  .toast .tb a { color: var(--accent); }

  /* ---- 单库信息条：一行搞定，不再用卡片 ---- */
  .vbar { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
          padding: 0 2px 12px; font-size: 14px; }
  .vbar .vname { font-weight: 600; font-size: 15px; color: var(--fg); }
  .vbar .vrepo { color: var(--muted); font-size: 13.5px; }
  .vbar .vmeta { color: var(--muted-2); font-size: 13.5px; }
  .vbar .vmeta b { color: var(--accent); font-weight: 600; }
  .vbar .vspacer { flex: 1; }
  /* 「有 N 处改动还没发布」的常驻提醒：它是持续状态，不是一次性结果，
     所以留在信息条上（顶栏小胶囊删掉后从那里挪过来的）。 */
  .vbar .pending { font-size: 13.5px; color: var(--warn-fg); background: var(--warn-bg);
                   border: 1px solid var(--warn-bd); padding: 2px 9px; border-radius: 999px; font-weight: 500; }
  .vbar .pending.hidden { display: none; }
  .vbar .vlink { display: inline-flex; align-items: center; gap: 3px; text-decoration: none;
                 font-size: 13.5px; color: var(--accent); padding: 2px 8px; border-radius: 6px;
                 background: var(--accent-soft); font-weight: 500; }
  .vbar .vlink:hover { background: var(--accent-soft-hover); text-decoration: underline; }
  .vbar .vlink.hidden { display: none; }
  /* 多连接时（只有命令行版会遇到）的紧凑下拉 */
  .vbar select { padding: 2px 6px; font-size: 13px; border-radius: 6px; }

  /* ---- 新建连接：一步一个库 + 一个仓库 ---- */
  .dialog { position: fixed; inset: 0; z-index: 50; background: rgba(17,24,39,.45);
            display: flex; align-items: center; justify-content: center; padding: 20px; }
  .dialog .panel { background: var(--card); border-radius: 14px; width: 100%; max-width: 520px;
                   padding: 20px 22px; box-shadow: 0 20px 50px var(--shadow);
                   max-height: calc(100vh - 40px); overflow-y: auto; }
  .dialog h2 { margin: 0 0 4px; font-size: 18.5px; }
  .dialog .hint { font-size: 14.5px; color: var(--muted); margin-bottom: 16px; }
  .field { margin-bottom: 14px; }
  .field > label { display: block; margin-bottom: 5px; font-size: 14.5px; color: var(--chip-fg); font-weight: 500; }
  .field input { width: 100%; box-sizing: border-box; }
  .pickrow { display: flex; gap: 8px; }
  .pickrow input { flex: 1; }
  .picker { font-size: 13.5px; color: var(--muted-2); margin-top: 5px; min-height: 16px; }
  .picker.ok { color: var(--accent); font-weight: 500; } .picker.bad { color: var(--bad); }
  .dialog .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
  .tabs { display: flex; gap: 6px; margin-bottom: 8px; }
  .tab { background: var(--btn-ghost); color: var(--chip-fg); border: 0; cursor: pointer; font-size: 14.5px;
         padding: 5px 11px; border-radius: 8px; }
  .tab:hover { background: var(--chip); }
  .tab.on { background: var(--accent); color: #fff; }
  button.ghost { background: var(--btn-ghost); color: var(--chip-fg); }
  .warnbox { background: var(--warn-bg); color: var(--warn-fg); border: 1px solid var(--warn-bd); border-radius: 8px;
             padding: 9px 12px; font-size: 14.5px; margin-bottom: 12px; }
  /* 未授权提示条：新机器上「一键连接 / 发布」都需要 GitHub 授权，
     不把这条摆到眼前，用户只会得到一个看不懂的失败。 */
  .authbar { display: flex; align-items: center; gap: 10px; margin: -6px 0 14px; padding: 9px 13px;
             background: var(--warn-bg); color: var(--warn-fg); border: 1px solid var(--warn-bd);
             border-radius: 10px; font-size: 14.5px; }
  .authbar.hidden { display: none; }
  .authbar .mini { margin-left: auto; }
  .tokenrow { display: flex; gap: 8px; align-items: flex-start; }
  .tokenrow input { flex: 1; font-family: ui-monospace, Consolas, monospace; font-size: 14px; }
  /* ---- 自定义外观：一大块等宽文本框 ---- */
  .dialog .panel.wide { max-width: 780px; }
  .theme-editor { width: 100%; box-sizing: border-box; min-height: 240px; resize: vertical;
                  font-family: ui-monospace, Consolas, "Cascadia Mono", monospace; font-size: 13px;
                  line-height: 1.55; tab-size: 2; padding: 11px 12px; border-radius: 9px;
                  background: var(--field); color: var(--fg); border: 1px solid var(--border-soft); }
  .theme-editor:focus { outline: 2px solid var(--accent); outline-offset: -1px; }
  .theme-bar { display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .theme-bar .cnt { margin-left: auto; font-size: 13px; color: var(--muted-2); }
  .theme-bar .cnt.over { color: var(--bad); font-weight: 600; }
  .theme-tip { font-size: 13.5px; color: var(--muted); margin: 2px 0 10px; line-height: 1.6; }
  .theme-tip code { font-family: ui-monospace, Consolas, monospace; font-size: 12.5px;
                    background: var(--chip); padding: 1px 5px; border-radius: 5px; }
  .theme-msg { font-size: 13.5px; margin-top: 8px; min-height: 16px; }
  .theme-msg.ok { color: var(--accent); }
  .theme-msg.bad { color: var(--bad); }
  /* ---- 预设外观：一个下拉框 ----
     用户要求「一个框，点击可以滑动选择，鼠标悬浮有主题简介」：
     收起时只是一个显示当前样式的框；点开是一个可滚动的名字列表，
     鼠标停在某个名字上，框底那行简介跟着变。 */
  .preset-box { position: relative; margin: 4px 0 14px; }
  .preset-current {
    width: 100%; display: flex; align-items: center; gap: 8px; text-align: left;
    border: 1px solid var(--border); border-radius: 9px; padding: 7px 11px;
    background: var(--card); color: var(--fg); font: inherit; font-size: 13px; cursor: pointer;
    transition: border-color .15s ease;
  }
  .preset-current:hover, .preset-box.open .preset-current { border-color: var(--accent); }
  .preset-current .nm { flex: 1 1 auto; font-weight: 600; }
  .preset-current .caret {
    flex: 0 0 auto; color: var(--muted-2); font-size: 10px;
    transition: transform .15s ease;
  }
  .preset-box.open .preset-current .caret { transform: rotate(180deg); }
  .preset-menu {
    position: absolute; left: 0; right: 0; top: calc(100% + 4px); z-index: 30;
    border: 1px solid var(--border); border-radius: 9px; background: var(--card);
    box-shadow: 0 12px 28px -12px var(--shadow); overflow: hidden;
  }
  .preset-menu[hidden] { display: none; }
  .preset-list { max-height: 186px; overflow-y: auto; padding: 4px; scrollbar-width: thin; }
  .preset-list::-webkit-scrollbar { width: 7px; }
  .preset-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
  .preset {
    display: block; width: 100%; text-align: left; cursor: pointer;
    border: 0; border-radius: 6px; padding: 5px 8px; margin: 1px 0;
    background: transparent; color: var(--fg); font: inherit; font-size: 12.5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .preset:hover { background: var(--accent-soft-hover); color: var(--accent); }
  .preset.on { color: var(--accent); font-weight: 600; }
  .preset.on::after { content: '✓'; margin-left: 6px; }
  .preset-desc {
    border-top: 1px solid var(--border); padding: 6px 10px; font-size: 11.5px;
    color: var(--muted-2); line-height: 1.45; min-height: 30px;
    display: flex; align-items: center; gap: 6px; background: var(--bg);
  }
  .preset-desc b { color: var(--fg); font-weight: 600; flex: 0 0 auto; }
  /* ---- 主题预览图 ----
     选中某套预设时显示它长什么样。图是通用示例内容（站名「示例博客」），
     不含任何真实个人信息。用户自己写的 CSS 没有图可显示，那时换成一行说明。 */
  .preset-preview {
    margin: -6px 0 12px; border: 1px solid var(--border); border-radius: 9px;
    overflow: hidden; background: var(--bg); line-height: 0;
  }
  .preset-preview[hidden] { display: none; }
  .preset-preview img { width: 100%; height: auto; display: block; }
  .preset-preview-empty {
    margin: -6px 0 12px; padding: 8px 11px; border: 1px dashed var(--border);
    border-radius: 9px; font-size: 12.5px; color: var(--muted-2);
  }
  .preset-preview-empty[hidden] { display: none; }
  /* ---- 写作指南弹窗 ---- */
  .guide-panel { max-width: 720px; }
  .guide-sec { margin-bottom: 12px; }
  .guide-sec .gt { font-size: 13px; color: var(--muted); margin-bottom: 5px; }
  .guide-code {
    margin: 0; font-family: ui-monospace, Consolas, "Cascadia Mono", monospace;
    font-size: 12px; line-height: 1.6; padding: 10px 12px; border-radius: 9px;
    background: var(--field); color: var(--fg); border: 1px solid var(--border-soft);
    overflow-x: auto; white-space: pre; tab-size: 2;
  }
  .guide-note {
    font-size: 12.5px; color: var(--muted-2); line-height: 1.6;
    padding: 8px 11px; border-radius: 8px; background: var(--chip);
  }
  /* 插件用 iframe 嵌入（?embed=1）：Obsidian 左侧已经是文件树，
     这里的「搜索 + 文件夹网格」重复且挤，整块隐藏，只留连接 / 变更 / 流水 / 发布。 */
  body.embed-mode #mainCard { display: none; }
</style></head><body>

<div class="statusbar"><div class="inner">
  <span class="title" data-i18n="appTitle">发布管理器</span>
  <span class="spacer"></span>
  <button class="mini" id="authBtn" onclick="openAuthDialog()" data-i18n="authBtn">GitHub 授权</button>
  <button class="mini" id="srcBtn" onclick="doUpdateSource()" data-i18n="srcBtn">⬆ 更新源码</button>
  <button class="btn-publish" id="pubBtn" onclick="doPublish()" data-i18n="publishBtn">⟳ 发布到 GitHub</button>
</div></div>

<!-- 右上角操作提示：发布 / 更新源码 / 保存外观都会在这里出现一条
     从「进行中」到「已上线」或「失败」的提示条，失败时可直接展开看日志。 -->
<div class="toasts" id="toasts"></div>

<div class="authbar hidden" id="authBar">
  <span data-i18n="authBarText"></span>
  <button class="mini" onclick="openAuthDialog()" data-i18n="authBarBtn">现在授权</button>
</div>

<div class="wrap">

<!-- 单库信息条：只占一行。库名 / 仓库 / 篇数 / 打开网页 / 设置，
     全塞在状态栏下面这一条里，不再单独占一张卡片（那会白占掉首屏最值钱的位置）。 -->
<div class="vbar" id="vbar">
  <span class="vname" id="vbName"></span>
  <span class="vrepo" id="vbRepo"></span>
  <span class="vmeta" id="vbMeta"></span>
  <!-- 「有 N 处改动还没发布」的常驻提醒。原来是顶栏小胶囊里的一句话，
       小胶囊整体删掉后（用户要求只保留弹窗）这句话挪到这里 ——
       它是持续状态，不该做成需要点掉的弹窗。 -->
  <span class="pending hidden" id="pendingHint"></span>
  <span class="vspacer"></span>
  <a class="vlink hidden" id="vbLink" target="_blank" rel="noopener" data-i18n="openSite">↗ 打开网页</a>
  <button class="mini" id="themeBtn" onclick="openTheme()" data-i18n="themeBtn">外观</button>
  <button class="mini" id="setupBtn" onclick="openActiveSetup()" data-i18n="vaultSettings">设置</button>
</div>

<div class="card" id="chgCard">
  <div class="row" style="margin-bottom:10px">
    <label style="font-size: 15px;font-weight:600;" data-i18n="chgTitle">变更</label>
    <span class="cnt" id="chgHint"></span>
  </div>
  <div class="chgcols" id="chgcols"></div>
  <div class="autosync" id="autosync">
    <span class="lbl" data-i18n="autoSyncTitle">自动同步</span>
    <label title="新增的笔记自动设为公开并发布" data-i18n-title="autoSyncTipAdded">
      <input type="checkbox" id="as-added" onchange="setAutoSync('added', this.checked)">
      <span data-i18n="autoSyncAdded">新增</span>
    </label>
    <label title="已公开笔记的改动自动发布" data-i18n-title="autoSyncTipModified">
      <input type="checkbox" id="as-modified" onchange="setAutoSync('modified', this.checked)">
      <span data-i18n="autoSyncModified">修改</span>
    </label>
    <label title="本地删除或转私密后，线上也跟着删掉" data-i18n-title="autoSyncTipDeleted">
      <input type="checkbox" id="as-deleted" onchange="setAutoSync('deleted', this.checked)">
      <span data-i18n="autoSyncDeleted">删除</span>
    </label>
    <span class="hint" data-i18n="autoSyncHint">勾选后这类改动会自动发布，不用点右上角「发布」</span>
  </div>
  <div class="autolog-head" id="autologHead" style="display:none">
    <span class="t" data-i18n="autoLogTitle">自动同步流水</span>
    <button class="mini" id="alClear" onclick="clearAutoLogUI()" data-i18n="autoLogClear">清空</button>
  </div>
  <div class="autolog" id="autolog"></div>
</div>

<div class="card" id="mainCard">
  <div class="row" style="margin-bottom:12px">
    <input id="q" placeholder="搜索笔记标题 / 路径…" data-i18n-ph="searchPh">
    <button class="mini" onclick="expandAllFolders()" data-i18n="expandAll">一键展开</button>
    <button class="mini" onclick="collapseAllFolders()" data-i18n="collapseAll">一键收起</button>
    <button class="mini" onclick="toggleAll(true)" data-i18n="pubAll">全部公开</button>
    <button class="mini" onclick="toggleAll(false)" data-i18n="privAll">全部私密</button>
  </div>
  <!-- 未分组（库根目录下的笔记）单独一块，不混进文件夹网格 -->
  <div id="ungrouped"></div>
  <div class="grid" id="folders"></div>
  <div id="log"></div>
</div>
</div>

<script>
let S = { connections: [], active: null, vaultPath: '', vaultOk: false, notes: [], collapsed: new Set() };

// ---- 界面语言 ----
// 只翻界面文案；笔记标题 / 路径 / 仓库名 / 站名一律原样显示。
// 首次访问跟随浏览器语言，手动切过之后记在 localStorage，不再跟随。
// 注意：这一段在服务端 UI 模板字面量里，所以全程只用单引号拼接，不能出现反引号与美元花括号。
const DICT = {
  zh: {
    appTitle: '发布管理器',
    publishBtn: '⟳ 发布到 GitHub',
    srcBtn: '⬆ 更新源码',
    updatingSrc: '正在更新源码…',
    srcSynced: '站点源码已更新',
    srcUpdateFail: '更新源码失败：',
    publishing: '发布中…',
    publishDone: '完成',
    // 推送成功 ≠ 网页已更新：GitHub 还要跑一次构建再部署，通常 40~90 秒。
    // 这几条把那段等待显示成进度，避免用户反复刷新去猜。
    liveBuilding: function (s) { return '已推送，GitHub 正在构建部署…已等 ' + s + ' 秒' },
    liveOk: function (s) { return '已上线（用时 ' + s + ' 秒）' },
    liveTimeout: '等了 4 分钟还没上线，构建可能失败了，请到 GitHub 仓库的 Actions 页面看一眼',
    liveOpen: '打开线上页面',
    toastResultTitle: '操作结果',
    toastClose: '关闭提示',
    toastDetail: '查看详情',
    toastPublishTitle: '发布到 GitHub',
    toastSourceTitle: '更新站点源码',
    toastThemeTitle: '保存自定义外观',
    toastStarting: '正在准备…',
    toastPushed: '已推送，正在等 GitHub 构建上线',
    toastNothingToPush: '没有新的改动可推送（线上已是最新）',
    toastDone: '完成',
    toastFailed: '失败',
    toastPublishOk: '发布成功',
    toastSourceOk: '源码已更新',
    toastThemeOk: '外观已保存并推送',
    toastThemeSavedOnly: '外观已保存到仓库（尚未推送）',
    vaultSettings: '设置',
    themeBtn: '外观',
    themeTitle: '自定义外观',
    // 面板里的说明文字总量必须 ≤50 字（用户要求），细节全放进「写作指南」弹窗
    themeIntro: '粘贴 CSS 改颜色和首页排版，留空即默认。',
    themeDefault: '默认',
    themeDefaultDesc: '站点自带：蓝白配色 + 三列卡片首页',
    themePresetCustom: '自定义',
    themePresetApplied: function (name) { return '已填入「' + name + '」，改完记得点保存' },
    themeGuideBtn: '写作指南',
    themeGuideTitle: '怎么写自定义外观',
    themeGuideIntro: '下面是可以覆盖的变量和可以定位的区域，复制过去改数字就行。',
    themeGuideVars: '颜色与圆角：覆盖 :root 里的变量，深色模式写在 html.dark 下。',
    themeGuideHook: '版面：这些区域都带 data-region，可改排布、间距、颜色。',
    themeGuideNote: '全站宽度由站点统一控制（--content-w），主题里不要写 max-width；大纲是悬浮组件，不要去动它的位置。',
    themeGuideFont: '字号要跟着右上角的字号滑块走，就用 var(--fsu)。',
    themeGuideInsert: '插入到编辑器',
    themePlaceholder: '/* 例：把强调色换成墨绿，正文用宋体 */\\n:root {\\n  --primary: oklch(0.48 0.11 155);\\n}\\n\\n[data-region="article"] {\\n  font-family: "Songti SC", serif;\\n}',
    themeEmpty: '还没有自定义外观（用默认主题）',
    themeChars: function (n, max) { return n + ' / ' + max + ' 字符' },
    themeSave: '保存',
    themeSavePublish: '保存并发布',
    themeSaving: '保存中…',
    themePublishing: '保存并推送中…',
    themeSaved: '已保存到仓库（还没上线，点「保存并发布」或「更新源码」才会生效）',
    themeSaveFail: '保存失败：',
    themePublishFail: '发布失败：',
    themeCleared: '已清空自定义外观（恢复默认主题）',
    themeLoading: '正在读取…',
    themeLoadFail: '读取失败：',
    themeClear: '清空',

    searchPh: '搜索笔记标题 / 路径…',
    expandAll: '一键展开',
    collapseAll: '一键收起',
    pubAll: '全部公开',
    privAll: '全部私密',
    // 文件夹标题上的批量按钮：位置窄，英文用短词，别把文件夹名挤掉
    pubAllMini: '公开',
    privAllMini: '私密',
    noConn: '还没有连接，点右边新建一个',
    current: '当前',
    noVault: '未设置本地库',
    vaultMeta: function (n, p) { return n + ' 篇 · ' + p + ' 篇公开' },
    // 卡片上的公开数要加粗：与其在外面按子串匹配（换语言就失效），不如直接给带标记的整串
    vaultMetaHtml: function (n, p) { return n + ' 篇 · <b>' + p + ' 篇公开</b>' },
    openSite: '↗ 打开网页',
    remove: '移除',
    removeTip: '只从清单移除，不影响 GitHub 仓库和本地库',
    removeConfirm: function (name) { return '移除「' + name + '」这条连接？\\n\\n· 不会删除 GitHub 仓库\\n· 不会改动本地 Obsidian 库\\n· 下次可以重新添加' },
    removeFail: '移除失败：',
    switchFail: '切换失败：',
    uncategorized: '未分组',
    countNotes: function (n) { return n + ' 篇' },
    pub: '公开',
    pri: '私密',
    toggleFail: '切换失败：',
    pendingPrompt: function (n) { return '有 ' + n + ' 处改动还没发布，点右上角「发布」' },
    chgAdded: '新增',
    chgModified: '修改',
    chgDeleted: '删除',
    chgTitle: '变更',
    chgNone: '没有待处理的改动',
    chgCount: function (n) { return n + ' 处待处理' },
    chgJumpTip: '点一下跳到下面文件夹里的这一篇',
    chgTipAdded: '新增：还没发布出去的新笔记。自动同步开着的话，这类改完会自己发上去并从这一栏消失',
    chgTipModified: '修改：还没发出去的改动。自动同步开着的话会自己发上去并从这一栏消失',
    chgTipDeleted: '删除：还没同步到线上的删除/转私密。自动同步开着的话会自己发上去并从这一栏消失',
    autoSyncTitle: '自动同步',
    autoSyncAdded: '新增',
    autoSyncModified: '修改',
    autoSyncDeleted: '删除',
    autoSyncHint: '勾选后这类改动会自动发布，不用点右上角「发布」',
    autoSyncTipAdded: '新增的笔记自动设为公开并发布',
    autoSyncTipModified: '已公开笔记的改动自动发布（公开的仍公开，私密的仍私密）',
    autoSyncTipDeleted: '本地删除或转私密后，线上也跟着删掉',
    autoSyncSaved: '自动同步设置已保存',
    autoSyncFail: '保存失败：',
    autoLogTitle: '自动同步流水',
    autoLogClear: '清空',
    autoLogStartTip: '开始推送的时间',
    autoLogPushing: '开始推送',
    autoLogPushed: '已推送，等构建',
    autoLogPushedAt: function (s) { return '已推送 ' + s + '，等构建' },
    autoLogLive: function (s) { return '已更新 ' + s },
    autoLogTook: function (s) { return '（' + s + '）' },
    autoLogFailed: '推送失败',
    autoLogInterrupted: '推送中断（管理器退出），结果未知',
    autoLogFresh: '跑完，无改动可推',
    autoLogBuildFailed: '构建失败',
    autoLogTimeout: '构建超时',
    autoLogOpenActions: '点这一行去 GitHub Actions 看看',
    autoLogMore: function (n) { return ' 等 ' + n + ' 个' },
    autoLogFileAdded: '新增',
    autoLogFileModified: '修改',
    autoLogFileDeleted: '删除',
    noChanges: '暂无待同步改动',
    pending: function (n) { return n + ' 项待同步' },
    emptyNoConn: '还没有博客连接，点上方「＋ 新建博客」开始。',
    emptyNoNotes: '这个库里还没有笔记，或者本地库路径不对。点上方当前博客卡片可以改。',
    loadFail: '加载失败：',
    detail: '详情',
    save: '保存修改',
    create: '创建并开始',
    cancel: '取消',
    vaultTip: '本地库：',
    vaultNone: '（未设置）',
    setupTitleEdit: '这个博客的设置',
    setupTitleNew: '新建博客',
    setupHint: '一个本地库对应一个 GitHub 仓库。选好本地库，下面一键搞定 GitHub 那边的事。',
    step1: '① 本地库文件夹',
    chooseFolder: '选择文件夹…',
    pickPlaceholder: '点右边按钮选择文件夹',
    step2: '② 名字（管理器里显示，也是网页左上角标题）',
    namePlaceholder: '例如：我的博客',
    step3: '③ GitHub 仓库（网页就放在这个仓库里）',
    repoLocked: '仓库地址建好后不再改动（要换仓库请移除这条连接重新新建）',
    tabAuto: '帮我新建一个仓库',
    tabManual: '我已经有仓库了',
    repoPlaceholder: 'https://github.com/你的用户名/仓库名.git',
    repoTip: '填仓库地址即可，建议用空仓库（如已在 GitHub 建好但还没放过东西）',
    repoNamePlaceholder: '仓库名（英文），例如 my-blog',
    createOnGitHub: '在 GitHub 上创建',
    goAuthorize: '去 GitHub 授权…',
    needRepoName: '先填一个仓库名',
    creating: '创建中…',
    createOk: '已在 GitHub 建好仓库：',
    createFail: '创建失败：',
    tokenReady: '✓ 已检测到 GitHub 授权，可直接创建',
    tokenMissing: '还没有 GitHub 授权。点「去 GitHub 授权…」看一步到位的做法（只需一次）。',
    pickOk: '✓ 已选择：',
    pickWait: '请在弹窗中选择…',
    pickTimeout: '没有选择文件夹。如果弹窗被浏览器挡住了，先关掉/最小化浏览器窗口，或用 Alt+Tab 找到它，再试一次。',
    pickFail: '选择失败：',
    mustPickVault: '请先选择本地库文件夹',
    mustFillRepo: '请填写 GitHub 仓库地址',
    mustCreateRepo: '请先在「帮我新建一个仓库」里创建，或切到「我已经有仓库了」填地址',
    saved: '已保存',
    created: '已创建，点右上角「发布到 GitHub」即可上线',
    authTitle: '连接 GitHub',
    authHint: '一个令牌就够：新建仓库、连接已有仓库、发布上线，全都用它。',
    authClose: '关闭',
    authRetry: '重新检测',
    authBtn: 'GitHub 授权',
    authBarText: '还没连上 GitHub：新建仓库、连接已有仓库、发布上线都需要一次授权。',
    authBarBtn: '现在授权',
    authOk: function (login) { return login ? '已授权：' + login : '已授权' },
    authUnknown: '本机存着令牌，但现在连不上 GitHub 验证（检查网络 / 加速器）。',
    tokenLabel: '粘贴 GitHub 令牌（personal access token），只存在本机',
    tokenPh: '粘贴令牌，例如 ghp_…',
    tokenSave: '保存并验证',
    tokenWhere: '获取步骤：github.com → 右上角头像 → <b>Settings</b> → 左侧最下 <b>Developer settings</b> → <b>Personal access tokens</b> → 选 <b>Tokens (classic)</b> → <b>Generate new token (classic)</b> → 勾选 <b>repo</b> 和 <b>workflow</b> → 生成后复制粘贴到这里。<br><b>repo</b> 负责克隆、推送、建仓库、同步站名；<b>workflow</b> 首次建站时需要往仓库写入 .github/workflows/deploy.yml，不勾会被 GitHub 拒绝推送。<br>⚠️ <b>有效期请选「No expiration」（永久）</b>：令牌一到期，发布、建仓库、自动建站都会失败，还得重新生成一个再来粘贴。选永久的就不用管了（令牌只存这台电脑，不会上传）。',
    tokenClear: '清除本机保存的令牌',
    tokenCleared: '已清除本机保存的令牌',
    checking: '检测中…',
    authFound: '已检测到 GitHub 授权',
    authNotFound: '还没检测到授权',
    checkFail: '检测失败：',
    publishFail: '发布失败：',
    publishErr: '有步骤失败',
    pushNetworkFail: '没能推送到 GitHub（多半是加速器没开或掉了）。笔记已安全保存在本地，开好加速器后重新点一次「发布」即可。',
    pushed: ' · 已推送，1~2 分钟后上线',
    logPublic: function (n, c, r) { return '公开笔记 ' + n + ' 篇：新增/更新 ' + c + '，移除过期 ' + r },
    logSiteName: function (prev, want) { return '已更新网页标题的站名：' + (prev ? '「' + prev + '」→ ' : '') + '「' + want + '」' },
    logFresh: '线上已是最新，无需推送',
    logPushed: '已推送 GitHub，Actions 构建中（1~2 分钟后网站自动更新）',
    logGitFail: 'git 操作失败：',
    logVarOk: function (name) { return '已把站名「' + name + '」写入仓库变量 SITE_NAME（下次构建生效）' },
    logVarNoToken: '站名同步跳过：需要 GitHub 授权才能改仓库变量。可设环境变量 GITHUB_TOKEN 后重试，或用 gh 登录。',
    logVarBadRepo: '站名同步跳过：仓库地址不是 GitHub 仓库',
    logVarFail: function (reason, detail) { return '站名同步失败（' + reason + '）：' + (detail || '') },
    errNeedNameRepo: '名称与仓库地址必填',
    errNoConn: '连接不存在',
    errNeedRepo: '请填写 GitHub 仓库地址',
    errBadVault: '请选择一个有效的库（需包含 .obsidian 目录）',
    errPrepFail: '连接已保存，但仓库准备失败：',
    errFirstConn: '请先创建一个连接，再设置本地库',
    errBadPath: '路径无效：需要包含 .obsidian 目录的库绝对路径',
    errEmptyName: '名字不能为空',
    errNoVault: '本地库未配置',
    errBadVaultPath: '本地库路径无效',
    errWorkdirFail: '工作副本准备失败：',
    errRepoUnreachable: '连不上这个仓库（多半是还没授权、仓库不存在，或本机连不上 GitHub）。',
    errCloneFail: '克隆仓库失败：',
    errTokenShort: '令牌太短，请确认粘贴完整（不含空格）。',
    errTokenRejected: 'GitHub 拒绝了这个令牌（无效、已撤销或权限不足）。',
    errTokenNetwork: '无法连到 GitHub 验证令牌（检查本机网络/加速器）。',
    errNoActive: '没有活动连接',
    errNeedRepoName: '请填写仓库名',
    errBadRepoName: '仓库名只能用英文字母、数字、点、下划线、连字符',
    errNoAuth: '还没有 GitHub 授权。请先按弹窗里的说明完成授权。',
    errRepoExists: function (name) { return '仓库「' + name + '」已经存在了。请换一个名字，或切到「我已经有仓库了」直接填它的地址。' },
    errCreateRejected: 'GitHub 拒绝了这次创建：',
    errCheckScope: '请检查令牌是否有 repo 权限',
    errBadAuth: 'GitHub 授权无效或权限不足（需要 repo 权限）。请重新授权后重试。',
    errCreateFail: function (status) { return '创建失败（HTTP ' + status + '）：' },
    errConnectFail: '连接 GitHub 失败：',
    errNoDir: '目录已存在且不是 git 仓库：',
    errGitFail: function (cmd) { return 'git ' + cmd + ' 失败' },
    errPathEscaped: '路径越界',
    errForbidden: '拒绝访问：只接受本机页面的请求',
    errPublishing: '正在发布中，请等这次结束再试',
    ok: '完成',
  },
  en: {
    appTitle: 'Publish Manager',
    publishBtn: '⟳ Publish to GitHub',
    srcBtn: '⬆ Update source',
    updatingSrc: 'Updating source…',
    srcSynced: 'Site source updated',
    srcUpdateFail: 'Failed to update source: ',
    publishing: 'Publishing…',
    publishDone: 'Done',
    liveBuilding: function (s) { return 'Pushed. GitHub is building and deploying… ' + s + 's elapsed' },
    liveOk: function (s) { return 'Live (took ' + s + 's)' },
    liveTimeout: 'Still not live after 4 minutes — the build may have failed. Check the Actions tab of the GitHub repo.',
    liveOpen: 'Open live site',
    toastResultTitle: 'Result',
    toastClose: 'Dismiss',
    toastDetail: 'Details',
    toastPublishTitle: 'Publish to GitHub',
    toastSourceTitle: 'Update site source',
    toastThemeTitle: 'Save custom appearance',
    toastStarting: 'Preparing…',
    toastPushed: 'Pushed — waiting for the GitHub build to go live',
    toastNothingToPush: 'Nothing new to push (the site is already up to date)',
    toastDone: 'Done',
    toastFailed: 'Failed',
    toastPublishOk: 'Published',
    toastSourceOk: 'Source updated',
    toastThemeOk: 'Appearance saved and pushed',
    toastThemeSavedOnly: 'Appearance saved to the repo (not pushed yet)',
    vaultSettings: 'Settings',
    themeBtn: 'Appearance',
    themeTitle: 'Custom appearance',
    // ≤50 characters in total for the panel copy; details live in the guide dialog
    themeIntro: 'Paste CSS: colors & layout; empty = default.',
    themeDefault: 'Default',
    themeDefaultDesc: 'Built-in: blue on white, three-column card home',
    themePresetCustom: 'Custom',
    themePresetApplied: function (name) { return 'Filled in “' + name + '” — remember to save' },
    themeGuideBtn: 'How to write',
    themeGuideTitle: 'How to write a custom theme',
    themeGuideIntro: 'These are the variables you can override and the regions you can target — copy, then change the numbers.',
    themeGuideVars: 'Colors and radius: override the variables under :root; dark mode goes under html.dark.',
    themeGuideHook: 'Layout: these regions all carry data-region — reshape columns, spacing, colors.',
    themeGuideNote: 'Site width is controlled centrally (--content-w) — do not set max-width in a theme; the outline panel is a floating widget, leave its position alone.',
    themeGuideFont: 'To follow the font-size slider, size text with var(--fsu).',
    themeGuideInsert: 'Insert into editor',
    themePlaceholder: '/* e.g. switch the accent to forest green and use a serif body font */\\n:root {\\n  --primary: oklch(0.48 0.11 155);\\n}\\n\\n[data-region="article"] {\\n  font-family: Georgia, serif;\\n}',
    themeEmpty: 'No custom appearance yet (using the default theme)',
    themeChars: function (n, max) { return n + ' / ' + max + ' characters' },
    themeSave: 'Save',
    themeSavePublish: 'Save and publish',
    themeSaving: 'Saving…',
    themePublishing: 'Saving and pushing…',
    themeSaved: 'Saved to the repo (not live yet — use “Save and publish” or “Update source” to apply it)',
    themeSaveFail: 'Save failed: ',
    themePublishFail: 'Publish failed: ',
    themeCleared: 'Custom appearance cleared (back to the default theme)',
    themeLoading: 'Loading…',
    themeLoadFail: 'Load failed: ',
    themeClear: 'Clear',
    searchPh: 'Search note title / path…',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    pubAll: 'Publish all',
    privAll: 'Make all private',
    pubAllMini: 'Public',
    privAllMini: 'Private',
    noConn: 'No connections yet — create one on the right',
    current: 'Current',
    noVault: 'No local vault',
    vaultMeta: function (n, p) { return n + (n === 1 ? ' note · ' : ' notes · ') + p + ' public' },
    vaultMetaHtml: function (n, p) { return n + (n === 1 ? ' note · ' : ' notes · ') + '<b>' + p + ' public</b>' },
    openSite: '↗ Open site',
    remove: 'Remove',
    removeTip: 'Removes from this list only — your GitHub repo and local vault are untouched',
    removeConfirm: function (name) { return 'Remove the connection "' + name + '"?\\n\\n· The GitHub repo is NOT deleted\\n· Your local Obsidian vault is NOT modified\\n· You can add it again later' },
    removeFail: 'Remove failed: ',
    switchFail: 'Switch failed: ',
    uncategorized: 'Ungrouped',
    countNotes: function (n) { return n + (n === 1 ? ' note' : ' notes') },
    pub: 'Public',
    pri: 'Private',
    toggleFail: 'Toggle failed: ',
    pendingPrompt: function (n) { return n + (n === 1 ? ' change' : ' changes') + ' not published yet — click Publish' },
    chgAdded: 'New',
    chgModified: 'Modified',
    chgDeleted: 'Deleted',
    chgTitle: 'Changes',
    chgNone: 'No pending changes',
    chgCount: function (n) { return n + ' pending' },
    chgJumpTip: 'Click to jump to this note in the folders below',
    chgTipAdded: 'New: not published yet. With auto-sync on, these are published and leave this column by themselves',
    chgTipModified: 'Modified: not published yet. With auto-sync on, these are published and leave this column by themselves',
    chgTipDeleted: 'Deleted: not synced to the site yet. With auto-sync on, these are synced and leave this column by themselves',
    autoSyncTitle: 'Auto-sync',
    autoSyncAdded: 'New',
    autoSyncModified: 'Modified',
    autoSyncDeleted: 'Deleted',
    autoSyncHint: 'Checked types are published automatically — no need to click Publish.',
    autoSyncTipAdded: 'New notes are made public and published automatically',
    autoSyncTipModified: 'Edits to published notes go live automatically (public stays public, private stays private)',
    autoSyncTipDeleted: 'Local deletes or unpublishing also remove them from the site',
    autoSyncSaved: 'Auto-sync settings saved',
    autoSyncFail: 'Save failed: ',
    autoLogTitle: 'Auto-sync log',
    autoLogClear: 'Clear',
    autoLogStartTip: 'When the push started',
    autoLogPushing: 'Pushing',
    autoLogPushed: 'Pushed, building',
    autoLogPushedAt: function (s) { return 'Pushed ' + s + ', building' },
    autoLogLive: function (s) { return 'Updated ' + s },
    autoLogTook: function (s) { return ' (' + s + ')' },
    autoLogFailed: 'Push failed',
    autoLogInterrupted: 'Push interrupted (manager exited) — result unknown',
    autoLogFresh: 'Ran, nothing to push',
    autoLogBuildFailed: 'Build failed',
    autoLogTimeout: 'Build timed out',
    autoLogOpenActions: 'Click to open GitHub Actions',
    autoLogMore: function (n) { return ' +' + n + ' more' },
    autoLogFileAdded: 'added',
    autoLogFileModified: 'modified',
    autoLogFileDeleted: 'deleted',
    noChanges: 'Nothing to sync',
    pending: function (n) { return n + (n === 1 ? ' change pending' : ' changes pending') },
    emptyNoConn: 'No blog connections yet — click “＋ New blog” above.',
    emptyNoNotes: 'No notes in this vault, or the local vault path is wrong. Click the current blog card above to change it.',
    loadFail: 'Load failed: ',
    detail: 'Details',
    save: 'Save',
    create: 'Create & start',
    cancel: 'Cancel',
    vaultTip: 'Vault: ',
    vaultNone: '(not set)',
    setupTitleEdit: 'Blog settings',
    setupTitleNew: 'New blog',
    setupHint: 'One local vault maps to one GitHub repo. Pick the vault, then finish GitHub below in one click.',
    step1: '① Local vault folder',
    chooseFolder: 'Choose folder…',
    pickPlaceholder: 'Click the button to choose a folder',
    step2: '② Name (shown here, and as the site title)',
    namePlaceholder: 'e.g. My Blog',
    step3: '③ GitHub repo (the site is published from here)',
    repoLocked: 'The repo URL is fixed once set — remove this connection and create a new one to switch repos.',
    tabAuto: 'Create a repo for me',
    tabManual: 'I already have a repo',
    repoPlaceholder: 'https://github.com/your-username/repo-name.git',
    repoTip: 'Just paste the repo URL. An empty repo works best (created on GitHub, nothing in it yet).',
    repoNamePlaceholder: 'Repo name (letters/numbers), e.g. my-blog',
    createOnGitHub: 'Create on GitHub',
    goAuthorize: 'Authorize GitHub…',
    needRepoName: 'Enter a repo name first',
    creating: 'Creating…',
    createOk: 'Repo created on GitHub: ',
    createFail: 'Create failed: ',
    tokenReady: '✓ GitHub authorization detected — you can create directly',
    tokenMissing: 'No GitHub authorization yet. Click “Authorize GitHub…” for the one-time setup.',
    pickOk: '✓ Selected: ',
    pickWait: 'Choose a folder in the dialog…',
    pickTimeout: 'No folder was chosen. If the dialog is hidden behind the browser, close the browser window or press Alt+Tab to find it, then try again.',
    pickFail: 'Pick failed: ',
    mustPickVault: 'Choose a local vault folder first',
    mustFillRepo: 'Enter the GitHub repo URL',
    mustCreateRepo: 'Create it under “Create a repo for me” first, or switch to “I already have a repo”',
    saved: 'Saved',
    created: 'Created — click “Publish to GitHub” in the top-right to go live',
    authTitle: 'Connect to GitHub',
    authHint: 'One token is enough: creating a repo, connecting an existing one, and publishing all use it.',
    authClose: 'Close',
    authRetry: 'Check again',
    authBtn: 'GitHub access',
    authBarText: 'Not connected to GitHub yet: creating a repo, connecting one, and publishing all need a one-time authorization.',
    authBarBtn: 'Authorize now',
    authOk: function (login) { return login ? 'Authorized: ' + login : 'Authorized' },
    authUnknown: 'A token is saved here, but GitHub can’t be reached to verify it right now (check network / accelerator).',
    tokenLabel: 'Paste a GitHub personal access token — it is stored on this machine only',
    tokenPh: 'Paste token, e.g. ghp_…',
    tokenSave: 'Save & verify',
    tokenWhere: 'Steps: github.com → avatar (top right) → <b>Settings</b> → <b>Developer settings</b> (bottom of the left sidebar) → <b>Personal access tokens</b> → choose <b>Tokens (classic)</b> → <b>Generate new token (classic)</b> → check <b>repo</b> and <b>workflow</b> → copy the token and paste it here.<br><b>repo</b> covers cloning, pushing, creating repos and syncing the site name; <b>workflow</b> is needed when setting up a new site, because the first push writes .github/workflows/deploy.yml and GitHub rejects it without that scope.<br>⚠️ Set <b>Expiration to “No expiration”</b>: once the token expires, publishing, creating repos and automatic site setup all fail until you generate a new one and paste it here again. Choose no expiration and you never have to think about it (the token is stored on this machine only and is never uploaded).',
    tokenClear: 'Clear the saved token',
    tokenCleared: 'Cleared the saved token',
    checking: 'Checking…',
    authFound: 'GitHub authorization detected',
    authNotFound: 'No authorization detected',
    checkFail: 'Check failed: ',
    publishFail: 'Publish failed: ',
    publishErr: 'Some steps failed',
    pushNetworkFail: "Couldn't reach GitHub (the accelerator is probably off or dropped). Your notes are safe on this machine — turn the accelerator back on and hit Publish again.",
    pushed: ' · Pushed — live in 1~2 minutes',
    logPublic: function (n, c, r) { return n + (n === 1 ? ' public note: ' : ' public notes: ') + c + ' added/updated, ' + r + ' stale removed' },
    logSiteName: function (prev, want) { return 'Site title updated: ' + (prev ? '"' + prev + '" → ' : '') + '"' + want + '"' },
    logFresh: 'Already up to date — nothing to push',
    logPushed: 'Pushed to GitHub — Actions is building (the site updates in 1~2 minutes)',
    logGitFail: 'git failed: ',
    logVarOk: function (name) { return 'Set the site title "' + name + '" as the repo variable SITE_NAME (applies on next build)' },
    logVarNoToken: 'Site title sync skipped: changing repo variables needs GitHub authorization. Set GITHUB_TOKEN and retry, or log in with gh.',
    logVarBadRepo: 'Site title sync skipped: this repo is not on GitHub',
    logVarFail: function (reason, detail) { return 'Site title sync failed (' + reason + '): ' + (detail || '') },
    errNeedNameRepo: 'Name and repo URL are required',
    errNoConn: 'Connection not found',
    errNeedRepo: 'Enter the GitHub repo URL',
    errBadVault: 'Pick a valid vault (it must contain a .obsidian folder)',
    errPrepFail: 'Connection saved, but preparing the repo failed: ',
    errFirstConn: 'Create a connection before setting a vault',
    errBadPath: 'Invalid path: needs an absolute vault path containing a .obsidian folder',
    errEmptyName: 'Name cannot be empty',
    errNoVault: 'No local vault configured',
    errBadVaultPath: 'Invalid local vault path',
    errWorkdirFail: 'Failed to prepare the working copy: ',
    errRepoUnreachable: 'Cannot reach that repo — most likely GitHub is not authorized yet, the repo does not exist, or this machine cannot reach GitHub.',
    errCloneFail: 'Cloning the repo failed: ',
    errTokenShort: 'The token looks too short. Paste it in full, without spaces.',
    errTokenRejected: 'GitHub rejected this token (invalid, revoked, or missing scope).',
    errTokenNetwork: 'Could not reach GitHub to verify the token (check your network / accelerator).',
    errNoActive: 'No active connection',
    errNeedRepoName: 'Enter a repo name',
    errBadRepoName: 'Repo names allow only letters, digits, dot, underscore and hyphen',
    errNoAuth: 'No GitHub authorization yet. Follow the instructions in the dialog first.',
    errRepoExists: function (name) { return 'The repo "' + name + '" already exists. Pick another name, or paste its URL under “I already have a repo”.' },
    errCreateRejected: 'GitHub rejected the request: ',
    errCheckScope: 'Check that your token has the repo scope',
    errBadAuth: 'GitHub authorization is invalid or lacks the repo scope. Re-authorize and retry.',
    errCreateFail: function (status) { return 'Create failed (HTTP ' + status + '): ' },
    errConnectFail: 'Could not reach GitHub: ',
    errNoDir: 'Directory exists but is not a git repo: ',
    errGitFail: function (cmd) { return 'git ' + cmd + ' failed' },
    errPathEscaped: 'Path escapes the vault',
    errForbidden: 'Forbidden: only local pages may send requests',
    errPublishing: 'A publish is already running. Please wait for it to finish.',
    ok: 'Done',
  },
};
function guessLang() {
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'zh';
  return /^zh/i.test(nav) ? 'zh' : 'en';
}
/**
 * 界面语言。
 *
 * 插件里（?embed=1）由 Obsidian 决定：宿主把语言当查询参数传进来，
 * 之后主题/语言一变还会 postMessage 通知，所以**不再有语言切换按钮**。
 * 命令行版（直接用浏览器开 127.0.0.1:3457）没有宿主，只能按浏览器语言猜一次。
 *
 * 用户的要求：只有中英两种。Obsidian 是简体/繁体中文 → 管理器用中文，
 * 其它语言一律用英文。
 */
function langFromParam() {
  try {
    const v = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
    if (!v) return null;
    return /^zh/.test(v) ? 'zh' : 'en';
  } catch (e) { return null; }
}
function currentLang() {
  const fromHost = langFromParam();
  if (fromHost) return fromHost;
  try { return localStorage.getItem('manager-lang') || guessLang(); } catch (e) { return guessLang(); }
}
let LANG = currentLang();
function t(key) {
  const d = DICT[LANG] || DICT.zh;
  const v = d[key];
  return typeof v === 'function' ? v : (v || (DICT.zh[key] && typeof DICT.zh[key] === 'function' ? key : v) || key);
}
// tf 只支持两个参数，早期够用；后来 logPublic 需要三个（公开数/新增数/移除数），
// 多传的那个参数被静默丢掉，日志里出现 "undefined stale removed"。改成变长参数。
function tf(key, ...args) {
  const d = DICT[LANG] || DICT.zh;
  const v = d[key];
  return typeof v === 'function' ? v(...args) : v;
}
function applyLang() {
  document.title = t('appTitle');
  document.documentElement.setAttribute('lang', LANG === 'zh' ? 'zh-CN' : 'en');
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) { el.title = t(el.getAttribute('data-i18n-title')); });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
  // 带 HTML 标签的文案（授权指引里有 b / br），只能走 innerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
}
/**
 * 宿主（Obsidian 插件）改了语言/主题时调这里。
 *
 * 插件那边把 lang / theme 用 postMessage 送进来，避免刷新整个 iframe
 * （刷新会丢掉正在输入的内容、正在滚动的流水位置）。
 * 注意：本文件整体是一个模板字面量，注释里不能出现反引号。
 */
function applyHostSettings(msg) {
  let changed = false;
  if (msg && typeof msg.lang === 'string') {
    const next = /^zh/i.test(msg.lang) ? 'zh' : 'en';
    if (next !== LANG) { LANG = next; applyLang(); changed = true; }
  }
  if (msg && typeof msg.theme === 'string') applyTheme(msg.theme === 'dark' ? 'dark' : 'light');
  if (changed) {
    try { renderVaults(); renderChanges(); renderFolders(); syncAutoSyncUI(); } catch (e) { /* 还没加载完就跳过 */ }
    try { refreshDlgsAfterLang(); } catch (e) { /* 没弹窗就算了 */ }
  }
}
window.addEventListener('message', function (ev) {
  // 只认同源消息：iframe 里 origin 是 127.0.0.1，别的页面发不进来
  if (ev && ev.data && typeof ev.data === 'object' && ev.data.__blogPublisher === true) {
    applyHostSettings(ev.data);
  }
});

// 语言切换后把已打开的弹窗原样重开（内容是闭包，外部拿不到，只能重建）
function refreshDlgsAfterLang() {
  const sd = document.getElementById('setupDlg');
  if (sd) {
    const nm = document.getElementById('sName') ? document.getElementById('sName').value : '';
    const rv = document.getElementById('sRepo') ? document.getElementById('sRepo').value
      : (document.getElementById('sRepoName') ? document.getElementById('sRepoName').value : '');
    openSetup(setupConn, true);
    if (document.getElementById('sName') && nm) document.getElementById('sName').value = nm;
    if (document.getElementById('sRepo') && rv) {
      document.getElementById('sRepo').value = rv;
      document.getElementById('sRepo').dispatchEvent(new Event('input'));
    }
    if (document.getElementById('sRepoName') && rv) document.getElementById('sRepoName').value = rv;
    if (setupShowPick) setupShowPick(setupPicked);
  }
  const ad = document.getElementById('authDlg');
  if (ad) { ad.remove(); if (authHelpReopen) authHelpReopen(); }
  const ad2 = document.getElementById('authMainDlg');
  if (ad2) {
    const tv = ad2.querySelector('#tokenIn') ? ad2.querySelector('#tokenIn').value : '';
    ad2.remove();
    if (authDialogReopen) {
      authDialogReopen();
      const ni = document.getElementById('authMainDlg');
      if (ni && tv) ni.querySelector('#tokenIn').value = tv;
    }
  }
  // 外观弹窗：重开会把「正在编辑但还没保存的 CSS」丢掉，这里先存下来再填回去。
  // 不这么做的话，切一次界面语言就等于把用户粘的一大段样式清空 —— 很难受。
  const td = document.getElementById('themeDlg');
  if (td) {
    const tcss = td.querySelector('#themeCss') ? td.querySelector('#themeCss').value : '';
    td.remove();
    if (themeReopen) {
      themeReopen(true);
      const ni = document.getElementById('themeCss');
      if (ni && tcss) { ni.value = tcss; ni.dispatchEvent(new Event('input')); }
    }
  }
  // 写作指南是只读的说明弹窗，切语言时直接关掉即可 —— 用户再点一次按钮
  // 就是新语言的内容，没必要费劲保住它的滚动位置。
  const gd = document.getElementById('themeGuideDlg');
  if (gd) gd.remove();
}

// ---- 明暗主题 ----
// 插件里由 Obsidian 决定（宿主 postMessage 送 dark/light），没有切换按钮。
// 命令行版没有宿主，退回跟随系统（prefers-color-scheme）。
// data-theme 必须在首帧前设好，否则会亮→暗闪一下。
function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark' || mode === 'light') root.setAttribute('data-theme', mode);
  else root.removeAttribute('data-theme');
}
function themeFromParam() {
  try {
    const v = (new URLSearchParams(location.search).get('theme') || '').toLowerCase();
    return v === 'dark' || v === 'light' ? v : null;
  } catch (e) { return null; }
}
applyTheme(themeFromParam());

// 统一请求：有 body 走 POST，无 body 走 GET。
// ⚠️ 但服务端多数写接口（/api/publish、/api/toggle…）**只认 POST**，
// 因此这里显式传 method，避免"无 body 就退化成 GET → 404"。
async function api(path, body, method) {
  const m = method || (body !== undefined ? 'POST' : 'GET');
  const init = { method: m, headers: { 'x-lang': LANG } };
  if (body !== undefined) {
    init.headers['content-type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  const r = await fetch(path, init);
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    const err = new Error(j.error || r.status);
    // 服务端用结构化字段标注「这是授权问题」，客户端据此弹授权窗，
    // 而不是靠错误文案里有没有「授权」两个字（换语言就失效）。
    err.needAuth = !!j.needAuth;
    throw err;
  }
  return r.json();
}

// ---- GitHub 授权（全局入口，不藏在某个弹窗里）----
// 新机器上没有 GitHub 授权时，clone/push 会失败；以前只能在建仓库弹窗里看到指引，
// 用户根本不知道那次失败跟授权有关。这里给一个常驻按钮 + 提示条 + 令牌输入框。
let AUTH = { token: false, login: null, reachable: null };
async function refreshAuth() {
  try {
    const r = await api('/api/auth/status');
    AUTH = { token: !!r.token, login: r.login || null, reachable: r.reachable };
  } catch (e) {
    AUTH = { token: false, login: null, reachable: false };
  }
  updateAuthBar();
  return AUTH;
}
function updateAuthBar() {
  const bar = document.getElementById('authBar');
  if (!bar) return;
  // 已有可用授权就收起提示条；连不上 GitHub（reachable===false）也提示，
  // 因为那正是用户最需要知道的状态（多半是加速器没开）。
  const ok = AUTH.token && AUTH.reachable !== false;
  bar.classList.toggle('hidden', ok);
}
function openAuthDialog() {
  authDialogReopen = openAuthDialog;
  const old = document.getElementById('authMainDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'authMainDlg';
  d.innerHTML =
    '<div class="panel">' +
      '<h2 data-i18n="authTitle"></h2>' +
      '<div class="hint" id="authState"></div>' +
      '<div class="field">' +
        '<label data-i18n="tokenLabel"></label>' +
        '<div class="tokenrow">' +
          '<input id="tokenIn" type="password" autocomplete="off" spellcheck="false" data-i18n-ph="tokenPh">' +
          '<button id="tokenSave" data-i18n="tokenSave"></button>' +
        '</div>' +
        '<div class="hint" style="margin:8px 0 0" data-i18n-html="tokenWhere"></div>' +
        '<div id="tokenMsg"></div>' +
      '</div>' +
      '<div class="actions">' +
        (AUTH.token ? '<button class="ghost" id="authClear" data-i18n="tokenClear"></button>' : '') +
        '<button class="ghost" id="authClose" data-i18n="authClose"></button>' +
        '<button id="authRetry" data-i18n="authRetry"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();
  paintAuthState(d);
  d.querySelector('#authClose').onclick = () => d.remove();
  d.onclick = (e) => { if (e.target === d) d.remove(); };
  const clearBtn = d.querySelector('#authClear');
  if (clearBtn) clearBtn.onclick = async () => {
    try {
      await api('/api/auth/token', { token: '' }, 'POST');
      AUTH = { token: false, login: null, reachable: null };
      d.remove();
      await refreshAuth();
      openAuthDialog();
    } catch (e) { showTokenMsg(d, 'err', e.message); }
  };
  d.querySelector('#tokenSave').onclick = async () => {
    const inp = d.querySelector('#tokenIn');
    const val = (inp.value || '').trim();
    if (!val) { showTokenMsg(d, 'err', t('errTokenShort')); return; }
    const btn = d.querySelector('#tokenSave');
    btn.disabled = true; const oldLabel = btn.textContent; btn.textContent = t('checking');
    try {
      const r = await api('/api/auth/token', { token: val }, 'POST');
      inp.value = '';
      await refreshAuth();
      d.remove();
      setResult('ok', tf('authOk', r.login));
      openAuthDialog();
    } catch (e) {
      showTokenMsg(d, 'err', e.message);
    } finally {
      const b2 = d.querySelector('#tokenSave');
      if (b2) { b2.disabled = false; b2.textContent = oldLabel; }
    }
  };
  d.querySelector('#authRetry').onclick = async () => {
    const b = d.querySelector('#authRetry');
    b.disabled = true; b.textContent = t('checking');
    await refreshAuth();
    b.disabled = false; b.textContent = t('authRetry');
    paintAuthState(d);
  };
}
function paintAuthState(d) {
  const el = d.querySelector('#authState');
  if (!el) return;
  if (AUTH.token && AUTH.reachable !== false) el.textContent = tf('authOk', AUTH.login);
  else if (AUTH.token) el.textContent = t('authUnknown');
  else el.textContent = t('authNotFound');
}
function showTokenMsg(d, kind, text) {
  const box = d.querySelector('#tokenMsg');
  if (!box) return;
  box.className = 'warnbox';
  box.style.marginTop = '8px';
  box.textContent = text;
}
let authDialogReopen = null;
// 全局授权弹窗与「建仓库」弹窗里的指引共用 id 会互相干扰（切换语言时靠 id 找弹窗重开），
// 所以全局这个用独立 id。

// ---- 操作结果提示（弹窗）----
// 历史：这里原来是顶栏的一个小胶囊，只显示最新一句话。用户要求「保留弹窗，
// 不要最上面 github 授权旁边的小块」，并且「弹窗要人点击才消失」——
// 自动消失会让人错过失败原因，也分不清「没推送上去」和「正在更新」。
// 所以：全局只用一张「最近结果」弹窗，新结果覆盖旧内容，成败都留着等用户点关闭。
let RESULT_TID = 0;
function ensureResultToast() {
  if (!RESULT_TID || !TOAST_LIVE.has(RESULT_TID)) RESULT_TID = toastOpen(t('toastResultTitle'), '');
  return RESULT_TID;
}
function setResult(kind, text, detail) {
  if (!text) return;
  const map = { ok: 'ok', busy: 'busy', err: 'bad', alert: 'bad' };
  const k = map[kind] || 'bad';
  const id = ensureResultToast();
  // detail 有时就是一句网址（「线上地址」）。整串都是 URL 时改成可点的链接，
  // 不塞进等宽日志块里。用 indexOf 判断而不写正则：本文件在模板字面量内，
  // 正则里的反斜杠会先被模板吃掉一层（见 shortRepo 的注释）。
  let url = '';
  let rest = detail ? String(detail) : '';
  if (rest.indexOf('http://') === 0 || rest.indexOf('https://') === 0) { url = rest; rest = ''; }
  toastSet(id, k, text, '', rest, url);
}
function clearResult() {
  if (RESULT_TID) { toastDrop(RESULT_TID); RESULT_TID = 0; }
}
// ---- 右上角操作提示（toast）----
// 为什么要单独一套：顶部那条小胶囊只显示最新一句话，用户看不出
// 「点了没反应 / 正在跑 / 已经推上去等构建 / 彻底失败」这四种状态的区别，
// 反馈里说的就是「不知道是没推送成功还是正在更新」。
// 这里每条操作给一张卡片，从转圈开始，最后定格成 ✓ 或 ✗，失败可展开日志。
// 生命周期：busy 卡片不自动消失（让人随时能看见还在跑）；成功和失败也都留着不自动收，
// 必须用户点卡片右上角的 × 才消失 —— 要求「弹窗要人点击才消失」。
let toastSeq = 0;
const TOAST_LIVE = new Map(); // id -> { el, titleEl, bodyEl, spinEl, icEl, timer }
function toastOpen(title, body) {
  const box = document.getElementById('toasts');
  if (!box) return 0;
  // 顶栏是 sticky、高度会随窗口宽度换行变化，写死 top 会在窄窗口里盖住「发布」按钮。
  // 每次开新提示时按「顶栏 + 信息条」的真实底边重算一次，永远贴在它们下面 ——
  // 只让出顶栏是不够的：信息条右侧就是「外观 / 设置」按钮，提示条压上去就点不到了。
  try {
    let bottom = 0;
    const bar = document.querySelector('.statusbar');
    if (bar) bottom = bar.getBoundingClientRect().bottom;
    const vb = document.getElementById('vbar');
    if (vb && vb.offsetParent !== null) {
      const r2 = vb.getBoundingClientRect();
      if (r2.height > 0 && r2.bottom > bottom) bottom = r2.bottom;
    }
    if (bottom > 0) box.style.top = Math.round(bottom + 10) + 'px';
  } catch (e) { /* 取不到就用 CSS 里的兜底值 */ }
  const id = ++toastSeq;
  const el = document.createElement('div');
  el.className = 'toast busy';
  el.title = t('toastClose');
  const th = document.createElement('div'); th.className = 'th';
  const spin = document.createElement('span'); spin.className = 'spin';
  const ic = document.createElement('span'); ic.className = 'ic'; ic.style.display = 'none';
  const tt = document.createElement('span'); tt.className = 'tt'; tt.textContent = title;
  th.appendChild(spin); th.appendChild(ic); th.appendChild(tt);
  const tb = document.createElement('div'); tb.className = 'tb';
  if (body) tb.textContent = body;
  el.appendChild(th); el.appendChild(tb);
  // 关闭方式：点卡片任意位置（用户要求「不要小 x，点任何位置都可以删除」）。
  // 但卡片里有可交互内容 —— 「查看详情」的折叠、线上地址外链 —— 点它们不该关掉卡片，
  // 否则想看日志的人一点就没了。所以这些区域内的点击放行，其余位置一律关闭。
  el.addEventListener('click', (ev) => {
    const hit = ev.target;
    if (hit && hit.closest && hit.closest('details, a, summary')) return;
    toastDrop(id);
  });
  box.appendChild(el);
  TOAST_LIVE.set(id, { el, tt, tb, spin, ic, timer: 0 });
  return id;
}
/** 把一条提示改成终态：kind = 'ok' | 'bad' | 'busy' */
function toastSet(id, kind, title, body, detail, linkUrl) {
  const rec = TOAST_LIVE.get(id);
  if (!rec) return;
  const { el, tt, tb, spin, ic } = rec;
  if (rec.timer) { clearTimeout(rec.timer); rec.timer = 0; }
  el.className = 'toast ' + (kind || 'busy');
  if (kind === 'ok' || kind === 'bad') {
    spin.style.display = 'none';
    ic.style.display = '';
    ic.className = 'ic ' + kind;
    ic.textContent = kind === 'ok' ? '✓' : '!';
  } else {
    spin.style.display = '';
    ic.style.display = 'none';
  }
  if (title) tt.textContent = title;
  tb.innerHTML = '';
  if (body) {
    const s = document.createElement('div'); s.textContent = body; tb.appendChild(s);
  }
  if (linkUrl) {
    const a = document.createElement('a');
    a.href = linkUrl; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = t('liveOpen');
    a.style.display = 'inline-block'; a.style.marginTop = '4px';
    tb.appendChild(a);
  }
  if (detail) {
    const d = document.createElement('details');
    const sm = document.createElement('summary'); sm.textContent = t('toastDetail');
    const pre = document.createElement('pre');
    // 日志按「是不是关键成败」分档：非关键行（站名变量同步之类顺带成功的话）
    // 淡一档显示。失败行保持正常亮度，方便展开后一眼定位。
    for (const line of String(detail).split(String.fromCharCode(10))) {
      const s = document.createElement('span');
      s.textContent = line + String.fromCharCode(10);
      if (!isCriticalLog(line)) s.className = 'dim';
      pre.appendChild(s);
    }
    d.appendChild(sm); d.appendChild(pre); tb.appendChild(d);
  }
  // 不自动消失：成功、失败、进行中都留着，必须用户点一下卡片才收起。
  // 自动收起会让人正好走开就错过结果，反而更分不清「推上去了没有」。
}
function toastDrop(id) {
  const rec = TOAST_LIVE.get(id);
  if (!rec) return;
  if (rec.timer) clearTimeout(rec.timer);
  TOAST_LIVE.delete(id);
  try { rec.el.remove(); } catch (e) { /* 已经不在 DOM 里 */ }
}
// 判断一行发布日志是否属于「关键成败」。非关键的一般是顺带成功的说明
// （站名变量已写入之类），它们成功与否都不影响内容有没有上线。
function isCriticalLog(line) {
  const s = String(line || '');
  // 站名变量同步是顺带动作，成功失败都不影响内容有没有上线，一律淡显。
  if (s.indexOf('SITE_NAME') >= 0) return false;
  // ⚠️ 关键词必须中英文各写一份：原来只写了中文，英文模式下
  // "Already up to date — nothing to push" 一个都不命中，被判成非关键而淡显，
  // 同一条日志两种语言分档不同（真实踩过）。
  const keys = [
    'git ', 'GitHub',
    '推送', 'push',
    '公开笔记', 'public note',
    '失败', 'failed',
    '无法', 'Could not', "couldn't",
  ];
  for (const k of keys) if (s.indexOf(k) >= 0) return true;
  return false;
}
// 提示：本段处在服务端 UI 模板字面量内，正则里的反斜杠会被模板字面量先吃掉一层，
// 极易写出「看着对、到浏览器就废」的表达式。这里改用 RegExp 字符串 + 字符类，
// 不写任何反斜杠，彻底避开这层转义。
function shortRepo(repo) {
  return String(repo || '')
    .replace(new RegExp('^https?://github[.]com/', 'i'), '')
    .replace(new RegExp('[.]git$', 'i'), '');
}

async function loadState() {
  const next = await api('/api/state');
  // 注意：不能整体替换 S（S = next）。服务端不返回 collapsed（那是纯前端的展示状态），
  // 整体替换会把 S.collapsed 抹掉，下一行 renderFolders() 读 S.collapsed.has 就抛
  // "Cannot read properties of undefined"。这里只合并服务端字段，保留本地折叠状态。
  S = { ...next, collapsed: S.collapsed ?? new Set() };
  renderVaults(); renderChanges(); renderFolders(); syncAutoSyncUI();
}

// ---- 变更三栏（新增 / 修改 / 删除），列在所有文件夹上方 ----
// 需求：这三类要在文件夹外面单独列出来，且「发布」之后清空（那些算旧的改动）。
// 清空不是前端擦一下 —— 服务端发布成功后会推进水位，下次拉状态它们自然就不在了，
// 所以这里只管照着 S.changes 画。
function renderChanges() {
  const box = document.getElementById('chgcols');
  const hint = document.getElementById('chgHint');
  if (!box) return;
  const CH = manualChanges();
  const titleOf = (p) => {
    const n = S.notes.find((x) => x.path === p);
    return n ? n.title : p.replace(/\.(md|markdown)$/i, '').split('/').pop();
  };
  const total = CH.added.length + CH.modified.length + CH.deleted.length;
  if (hint) hint.textContent = total ? tf('chgCount', total) : '';
  box.innerHTML = '';
  // 没有改动时不要把三栏空壳摆在那儿占掉半屏，收成一行
  const card = document.getElementById('chgCard');
  if (card) card.classList.toggle('is-empty', total === 0);
  if (total === 0) {
    const ok = document.createElement('div');
    ok.className = 'chgnone';
    ok.innerHTML = '<span class="dot"></span>' + esc(t('chgNone'));
    box.appendChild(ok);
    return;
  }
  const cols = [
    { key: 'add', label: t('chgAdded'), list: CH.added, tip: t('chgTipAdded') },
    { key: 'mod', label: t('chgModified'), list: CH.modified, tip: t('chgTipModified') },
    { key: 'del', label: t('chgDeleted'), list: CH.deleted, tip: t('chgTipDeleted') },
  ];
  for (const c of cols) {
    const col = document.createElement('div');
    col.className = 'chgcol';
    const head = document.createElement('div');
    head.className = 'ch';
    head.title = c.tip;
    head.innerHTML = '<span class="chg ' + c.key + '">' + esc(c.label) + '</span><span class="n">' + c.list.length + '</span>';
    col.appendChild(head);
    if (!c.list.length) {
      const e = document.createElement('div');
      e.className = 'empty';
      e.textContent = '—';
      col.appendChild(e);
    } else {
      const ul = document.createElement('ul');
      for (const p of c.list) {
        const li = document.createElement('li');
        li.title = p + '\\n' + t('chgJumpTip');
        const ts = document.createElement('span');
        ts.className = 't';
        ts.textContent = titleOf(p);
        const ps = document.createElement('span');
        ps.className = 'p';
        ps.textContent = p;
        li.appendChild(ts);
        li.appendChild(ps);
        // 新增的笔记：这里也给一个公开开关，和下面文件夹里的那个是同一件事
        if (c.key === 'add') {
          const n = S.notes.find((x) => x.path === p);
          if (n) {
            const sw = document.createElement('button');
            sw.className = 'sw' + (n.isPublic ? ' on' : '');
            sw.title = n.isPublic ? t('pri') : t('pub');
            sw.onclick = async (e) => {
              e.stopPropagation();
              try { await api('/api/toggle', { path: p, pub: !n.isPublic }); }
              catch (err) { setResult('err', t('toggleFail') + err.message); return; }
              n.isPublic = !n.isPublic;
              await refreshChanges();
              promptPending();
            };
            li.appendChild(sw);
          }
        }
        li.onclick = () => focusNote(p);
        ul.appendChild(li);
      }
      col.appendChild(ul);
    }
    box.appendChild(col);
  }
}

// 点变更条目：展开它所在的文件夹并滚过去，高亮一下（否则「删除了某篇」这种
// 在长列表里根本找不到）
function focusNote(p) {
  const f = p.includes('/') ? p.split('/').slice(0, -1).join('/') : '';
  S.collapsed.delete(f);
  renderFolders();
  const rows = [...document.querySelectorAll('#folders li, #ungrouped li')];
  const el = rows.find((li) => { const t0 = li.querySelector('.t'); return t0 && t0.title === p; });
  if (!el) return;
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 1400);
}

// 自动同步的三个开关：服务端是唯一真相，这里只负责把界面勾选状态对齐过去。
function syncAutoSyncUI() {
  const a = S.autoSync || { added: false, modified: true, deleted: false };
  const put = (id, v) => { const el = document.getElementById(id); if (el) el.checked = !!v; };
  put('as-added', a.added); put('as-modified', a.modified); put('as-deleted', a.deleted);
  renderAutoLog();
}
// 自动同步流水：把「后台什么时候开始推、动了哪些文件、推没推上去、有没有更新成功」显示出来。
// 自动同步常在没人盯着屏幕的时候发生，没有这条记录就只能靠猜。
function renderAutoLog() {
  const box = document.getElementById('autolog');
  const head = document.getElementById('autologHead');
  if (!box) return;
  // 老版本记过「有改动但开关没开」这种条目，用户明确说不需要，这里直接不画
  const log = (Array.isArray(S.autoLog) ? S.autoLog : []).filter((e) => e && e.kind !== 'skip');
  // 界面每 8 秒轮询一次就会重画；不记住滚动位置的话，用户刚往下滚就又跳回顶部
  const keepTop = box.scrollTop;
  box.innerHTML = '';
  if (head) head.style.display = log.length ? '' : 'none';
  if (!log.length) return;
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const hhmm = (ms) => { const d = new Date(ms); return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); };
  // 推送 → 上线之间的耗时，用「3 分 12 秒」这种说法，比秒数好读
  const dur = (sec) => {
    sec = Math.max(0, Math.round(sec));
    const en = LANG === 'en';
    if (sec < 60) return sec + (en ? 's' : ' 秒');
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (!s) return m + (en ? 'm' : ' 分');
    return m + (en ? 'm ' : ' 分 ') + s + (en ? 's' : ' 秒');
  };
  const baseOf = (p) => p.replace(/\.(md|markdown)$/i, '').split('/').pop();
  for (const e of log) {
    const row = document.createElement('div');
    row.className = 'al';
    const top = document.createElement('div');
    top.className = 'al-top';
    const tm = document.createElement('span');
    tm.className = 'tm';
    tm.textContent = hhmm(e.at);
    tm.title = t('autoLogStartTip');
    top.appendChild(tm);
    const st = document.createElement('span');
    const c = e.counts || {};
    const cs = document.createElement('span');
    cs.className = 'cs';
    cs.textContent = [
      c.added ? '+' + c.added : '',
      c.modified ? '~' + c.modified : '',
      c.deleted ? '-' + c.deleted : '',
    ].filter(Boolean).join(' ');
    const pushedAt = Number(e.pushedAt) || 0;
    // 状态按「结论优先」排列：失败 > 构建失败 > 超时 > 已更新 > 没东西可推 > 已推送 > 开始推送
    if (e.failed) {
      st.className = 'st bad';
      st.textContent = t(e.interrupted ? 'autoLogInterrupted' : 'autoLogFailed');
      st.title = String(e.error || e.failKind || '');
    } else if (e.buildFailed) {
      st.className = 'st bad'; st.textContent = t('autoLogBuildFailed');
      st.title = String(e.buildConclusion || '');
    } else if (e.liveTimeout) {
      st.className = 'st bad'; st.textContent = t('autoLogTimeout');
      st.title = String(e.buildStatus || '');
    } else if (e.live) {
      st.className = 'st ok'; st.textContent = tf('autoLogLive', hhmm(e.liveAt));
    } else if (e.pushed === false) {
      // 发布流程跑完但没东西可推（仓库是新鲜的），不算失败，但也该让人看见
      st.className = 'st skip'; st.textContent = t('autoLogFresh');
    } else if (pushedAt) {
      st.className = 'st wait'; st.textContent = tf('autoLogPushedAt', hhmm(pushedAt));
    } else {
      st.className = 'st wait'; st.textContent = t('autoLogPushing');
    }
    top.appendChild(st);
    if (cs.textContent.trim()) top.appendChild(cs);
    // 从「开始推送」到「确认更新」一共花了多久
    if (e.live && e.liveAt > e.at) {
      const took = document.createElement('span');
      took.className = 'took';
      took.textContent = tf('autoLogTook', dur((e.liveAt - e.at) / 1000));
      top.appendChild(took);
    }
    if (e.commit) {
      const sh = document.createElement('span');
      sh.className = 'sha'; sh.textContent = e.commit.slice(0, 7);
      top.appendChild(sh);
    }
    // 构建失败 / 超时：点这一行直接去 GitHub Actions 看看到底怎么了
    if ((e.buildFailed || e.liveTimeout) && e.buildUrl) {
      top.style.cursor = 'pointer';
      top.title = t('autoLogOpenActions') + '\\n' + e.buildUrl;
      top.onclick = () => window.open(e.buildUrl, '_blank');
    }
    row.appendChild(top);
    // 第二行：这次到底动了哪些文件（三栏里不再重复列，改由这里说明）
    const f = e.files || {};
    const segs = [];
    const pushSeg = (arr, cls, label) => {
      if (!Array.isArray(arr) || !arr.length) return;
      const names = arr.slice(0, 3).map(baseOf);
      let txt = label + ' ' + names.join('、');
      if (arr.length > names.length) txt += tf('autoLogMore', arr.length - names.length);
      const sp = document.createElement('span');
      sp.className = 'fs ' + cls;
      sp.textContent = txt;
      sp.title = arr.join('\\n');
      segs.push(sp);
    };
    pushSeg(f.added, 'add', t('autoLogFileAdded'));
    pushSeg(f.modified, 'mod', t('autoLogFileModified'));
    pushSeg(f.deleted, 'del', t('autoLogFileDeleted'));
    if (segs.length) {
      const fl = document.createElement('div');
      fl.className = 'al-files';
      for (const sp of segs) fl.appendChild(sp);
      row.appendChild(fl);
    }
    box.appendChild(row);
  }
  if (keepTop) box.scrollTop = keepTop;
}

// 「需要你处理的」改动：自动同步开关关着的那几类。
// 开关开着的类由后台自己发，只在流水里说明，不放进三栏（用户明确要求）。
// 例外：最近一次自动同步推送失败了，就把对应那几类放回栏里提醒 ——
// 否则一次失败的推送会让改动（尤其「转私密」这种）悄悄留在线上。
function manualChanges() {
  const CH = S.changes || {};
  const AS = S.autoSync || {};
  const last = (Array.isArray(S.autoLog) ? S.autoLog : []).find((e) => e && e.kind !== 'skip') || null;
  const fc = last && last.failed ? (last.counts || {}) : null;
  const keep = (k) => (AS[k] ? !!(fc && fc[k] > 0) : true);
  return {
    added: keep('added') ? (CH.added || []) : [],
    modified: keep('modified') ? (CH.modified || []) : [],
    deleted: keep('deleted') ? (CH.deleted || []) : [],
  };
}

// 顶栏提示：只说「还有几处要发布」，不再逐条报「某某已设为私密，记得发布」。
// 自动同步能处理的改动不提示（它们也不会出现在三栏里）。
// 位置：vbar 上的常驻小字（顶栏小胶囊已按用户要求删掉）。
let _pendingPrompt = '';
function promptPending() {
  const m = manualChanges();
  const n = m.added.length + m.modified.length + m.deleted.length;
  const el = document.getElementById('pendingHint');
  if (!el) return;
  if (!n) { el.classList.add('hidden'); el.textContent = ''; _pendingPrompt = ''; return; }
  const msg = tf('pendingPrompt', n);
  if (msg === _pendingPrompt) return;
  _pendingPrompt = msg;
  el.textContent = msg;
  el.classList.remove('hidden');
}

// 清空自动同步流水（服务端落盘，重启也不会回来）
async function clearAutoLogUI() {
  try {
    await api('/api/autolog/clear', {});
  } catch (e) {
    setResult('err', t('autoSyncFail') + e.message);
    return;
  }
  S.autoLog = [];
  renderAutoLog();
  renderChanges();
  promptPending();
}
async function setAutoSync(type, value) {
  try {
    const r = await api('/api/autosync', { type, value });
    S.autoSync = r.autoSync;
    setResult('ok', t('autoSyncSaved'));
  } catch (e) {
    setResult('err', t('autoSyncFail') + e.message);
  }
  // 无论成败都以服务端返回为准重新对齐（失败时把勾选回滚）
  syncAutoSyncUI();
  // 开关一变，「哪些算待处理」就变了：三栏、文件夹徽标、顶部提示都要跟着重算，
  // 否则会残留「有 N 处改动还没发布」而三栏已经是 0。
  renderChanges(); renderFolders(); promptPending();
}

// ---- 单库信息条 ----
// 只显示当前这一个库：库名 · 仓库 · 篇数 · 打开网页 · 设置。
// 不铺卡片、不占一整张卡的高度 —— 这些信息一眼就能看完，占一大块地方纯属浪费首屏。
// （命令行版如果配置过多个连接，这里给一个极窄的下拉做切换。）
function renderVaults() {
  const bar = document.getElementById('vbar');
  if (!bar) return;
  const nameEl = document.getElementById('vbName');
  const repoEl = document.getElementById('vbRepo');
  const metaEl = document.getElementById('vbMeta');
  const linkEl = document.getElementById('vbLink');
  const cur = S.connections.find((c) => c.id === S.active) || null;
  const oldSel = bar.querySelector('select.vswitch');
  if (oldSel) oldSel.remove();

  if (!cur) {
    if (nameEl) nameEl.textContent = t('noConn');
    if (repoEl) repoEl.textContent = '';
    if (metaEl) metaEl.textContent = '';
    if (linkEl) linkEl.classList.add('hidden');
    return;
  }

  if (nameEl) nameEl.textContent = cur.name;
  if (repoEl) {
    repoEl.textContent = shortRepo(cur.repo) + ' · ' + cur.branch;
    repoEl.title = cur.repo;
  }
  if (metaEl) {
    metaEl.innerHTML = cur.vaultOk
      ? tf('vaultMetaHtml', cur.noteCount, cur.publicCount)
      : '<span class="vault-bad">' + t('noVault') + '</span>';
    metaEl.title = t('vaultTip') + (cur.vaultPath || t('vaultNone'));
  }
  if (linkEl) {
    if (cur.siteUrl) {
      linkEl.href = cur.siteUrl;
      linkEl.title = cur.siteUrl;
      linkEl.classList.remove('hidden');
    } else {
      linkEl.classList.add('hidden');
    }
  }

  // 多个连接时（只有命令行版会遇到）给一个紧凑的下拉
  if (S.connections.length > 1) {
    const sel = document.createElement('select');
    sel.className = 'vswitch';
    for (const c of S.connections) {
      const o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name;
      if (c.id === S.active) o.selected = true;
      sel.appendChild(o);
    }
    sel.onchange = async () => {
      try { await api('/api/connection/switch', { id: sel.value }); clearResult(); await loadState(); }
      catch (e) { setResult('err', t('switchFail') + e.message); sel.value = S.active; }
    };
    if (nameEl) nameEl.insertAdjacentElement('afterend', sel);
  }
}

// ---- 新建/修改连接：一个库 + 一个仓库，一步完成 ----
let setupConn = null, setupPicked = '';
// ---- 自定义外观 ----
// 库主人在这个框里粘贴 CSS，保存后写进仓库的 public/theme.css，
// 由 layout.tsx 以 <link> 引入（见 build-content.mjs 里的 theme.generated.ts）。
//
// 为什么只给 CSS、不给整页模板：
//   站点是 Next 静态导出，页面结构在 React 里编译好了；要让用户改 HTML
//   就等于把模板引擎暴露出去，安全与升级成本都不是这个项目该承担的。
//   而 CSS 足以改颜色、字体、间距、显隐、位置（flex/grid 都可覆盖），
//   又能保证用户写的东西永远不会被当成 HTML/JS 执行。
// 内置预设外观。这里是一枚占位串，由 manager-core 在发出页面时替换成真实数据
// （本文件整体是模板字面量，不能直接插值；预设在 scripts/theme-presets.mjs 里）。
let PRESETS = "__THEME_PRESETS__";
if (typeof PRESETS === 'string') PRESETS = [];
// 预览图的 id 集合。这里只需要知道「有没有图」，图片本身走
// /preset-preview/<id>.png 现取（内嵌 base64，不依赖磁盘上的图片目录）。
let PREVIEW_IDS = "__THEME_PREVIEW_IDS__";
if (!Array.isArray(PREVIEW_IDS)) PREVIEW_IDS = [];
// 图片内容哈希。服务器给预览图设了 86400 秒缓存，换了图但 URL 不变的话
// 用户会一直看到旧图 —— 拼个 ?v= 上去，图一改 URL 就变。
let PREVIEW_VER = "__THEME_PREVIEW_VER__";
// 没被服务端替换时（占位符原样留着）就当没有版本号，别把 __THEME_PREVIEW_VER__
// 拼进 URL 里发一个必然 404 的请求。
if (typeof PREVIEW_VER !== 'string' || PREVIEW_VER.indexOf('__') >= 0) PREVIEW_VER = '';

// 写作指南弹窗：面板里塞不下也不该塞（用户要求面板文字 ≤50 字），
// 所以「怎么写」全部放这里，点了按钮才出现，看完可以一键插进编辑器。
function openThemeGuide(onInsert) {
  const old = document.getElementById('themeGuideDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'themeGuideDlg';
  d.innerHTML =
    '<div class="panel wide guide-panel">' +
      '<h2 data-i18n="themeGuideTitle"></h2>' +
      '<div class="hint" data-i18n="themeGuideIntro"></div>' +
      '<div class="guide-sec">' +
        '<div class="gt" data-i18n="themeGuideVars"></div>' +
        '<pre class="guide-code">' +
          ':root {\\n' +
          '  --background: oklch(0.99 0.004 250);      /* 页面底色 */\\n' +
          '  --foreground: oklch(0.19 0.021 257);      /* 正文颜色 */\\n' +
          '  --card: oklch(1 0 0);                     /* 卡片底色 */\\n' +
          '  --primary: oklch(0.55 0.16 256);          /* 强调色：链接、按钮 */\\n' +
          '  --muted-foreground: oklch(0.53 0.019 255);/* 次要文字 */\\n' +
          '  --border: oklch(0.916 0.008 253);         /* 描边 */\\n' +
          '  --radius: 0.625rem;                       /* 圆角 */\\n' +
          '}\\n' +
          'html.dark {\\n' +
          '  --background: oklch(0.17 0.022 256);\\n' +
          '  --primary: oklch(0.72 0.155 252);\\n' +
          '}' +
        '</pre>' +
      '</div>' +
      '<div class="guide-sec">' +
        '<div class="gt" data-i18n="themeGuideHook"></div>' +
        '<pre class="guide-code">' +
          '[data-region="header"]  { /* 顶栏 */ }\\n' +
          '[data-region="folders"] { /* 首页文件夹区：几列 / 卡片还是列表 */ }\\n' +
          '[data-region="list"]    { /* 笔记列表 */ }\\n' +
          '[data-region="tags"]    { /* 标签栏 */ }\\n' +
          '[data-region="article"] { /* 正文 */ }\\n' +
          '[data-region="footer"]  { /* 页脚 */ }' +
        '</pre>' +
      '</div>' +
      '<div class="guide-sec">' +
        '<div class="gt" data-i18n="themeGuideFont"></div>' +
        '<pre class="guide-code">' +
          'body { font-family: "Songti SC", serif; }\\n' +
          '[data-region="article"] { font-size: calc(1.05 * var(--fsu)); }' +
        '</pre>' +
      '</div>' +
      '<div class="guide-note" data-i18n="themeGuideNote"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="guideClose" data-i18n="cancel"></button>' +
        '<button id="guideInsert" data-i18n="themeGuideInsert"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();
  const close = () => d.remove();
  d.querySelector('#guideClose').onclick = close;
  d.onclick = (e) => { if (e.target === d) close(); };
  d.querySelector('#guideInsert').onclick = () => {
    // 只插入「颜色」这一块：它是大多数人真正要改的东西。
    // 版面选择器块插进去是空规则，插了反而要用户自己删。
    const code = [
      '/* 颜色 / 圆角：覆盖 :root 里的变量即可，深色模式写在 html.dark 下 */',
      ':root {',
      '  --background: oklch(0.99 0.004 250);',
      '  --foreground: oklch(0.19 0.021 257);',
      '  --primary: oklch(0.55 0.16 256);',
      '  --border: oklch(0.916 0.008 253);',
      '  --radius: 0.625rem;',
      '}',
    ].join('\\n');
    close();
    if (onInsert) onInsert(code);
  };
}

let themeReopen = null;
// keep=true：切语言后重开，编辑器里的未保存内容要保住，别被服务器的旧值盖掉
function openTheme(keep) {
  themeReopen = openTheme;
  const old = document.getElementById('themeDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'themeDlg';
  // 这段 HTML 在服务端模板字面量里，只能用单引号拼接（不能用反引号/模板占位）
  d.innerHTML =
    '<div class="panel wide">' +
      '<h2 data-i18n="themeTitle"></h2>' +
      '<div class="hint" data-i18n="themeIntro"></div>' +
      '<div class="preset-box" id="presetBox">' +
        '<button type="button" class="preset-current" id="presetCurrent" aria-haspopup="listbox" aria-expanded="false">' +
          '<span class="nm" id="presetCurrentName"></span>' +
          '<span class="caret">▼</span>' +
        '</button>' +
        '<div class="preset-menu" id="presetMenu" hidden>' +
          '<div class="preset-list" id="presetRow" role="listbox"></div>' +
          '<div class="preset-desc" id="presetDesc"></div>' +
        '</div>' +
      '</div>' +
      // 预览：选中的那套到底长什么样。自定义 CSS 没法预渲染（用户写什么就是什么），
      // 所以「自定义」时不显示图，只留一行说明 —— 用户明确要求「自定义不用预览」。
      '<div class="preset-preview" id="presetPreview">' +
        '<img id="presetPreviewImg" alt="">' +
      '</div>' +
      '<div class="preset-preview-empty" id="presetPreviewEmpty" data-i18n="themePresetCustom"></div>' +
      '<textarea class="theme-editor" id="themeCss" spellcheck="false" data-i18n-ph="themePlaceholder"></textarea>' +
      '<div class="theme-bar">' +
        '<button class="mini" id="themeGuide" data-i18n="themeGuideBtn"></button>' +
        '<button class="mini" id="themeClear" data-i18n="themeClear"></button>' +
        '<span class="cnt" id="themeCnt"></span>' +
      '</div>' +
      '<div class="theme-msg" id="themeMsg"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="themeClose" data-i18n="cancel"></button>' +
        '<button class="ghost" id="themeSave" data-i18n="themeSave"></button>' +
        '<button id="themePub" data-i18n="themeSavePublish"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();

  const $ = (id) => d.querySelector('#' + id);
  const ta = $('themeCss');
  const msg = $('themeMsg');
  const cnt = $('themeCnt');
  let maxBytes = 200 * 1024;

  const say = (kind, text) => { msg.className = 'theme-msg ' + kind; msg.textContent = text; };
  const clearMsg = () => { msg.className = 'theme-msg'; msg.textContent = ''; };

  // 计数按**字节**算，与服务端的 200KB 上限一致：
  // 中文注释一个字符占 3 字节，按字符数显示会让用户以为还有空间却被拒绝。
  const updateCount = () => {
    const bytes = new Blob([ta.value]).size;
    const over = bytes > maxBytes;
    cnt.className = 'cnt' + (over ? ' over' : '');
    // 用 KB 显示更贴近上限的语义（200KB 的上限按字符数说没有意义）
    cnt.textContent = (bytes / 1024).toFixed(1) + ' / ' + Math.round(maxBytes / 1024) + ' KB';
    $('themePub').disabled = over;
    $('themeSave').disabled = over;
  };

  ta.addEventListener('input', () => { updateCount(); clearMsg(); markPreset(matchPreset(ta.value)); });

  $('themeClose').onclick = () => d.remove();
  d.onclick = (e) => { if (e.target === d) d.remove(); };

  // 预设：一个下拉框。收起时只显示当前这套的名字；点开是可滚动的名字列表，
  // 鼠标停在某个名字上，框底那行简介跟着变。选中后把整套 CSS 填进编辑器
  // （不直接保存 —— 让用户先看一眼、改两笔再保存，避免误点就把线上皮肤换掉）。
  const row = $('presetRow');
  const descEl = $('presetDesc');
  const boxEl = $('presetBox');
  const menuEl = $('presetMenu');
  const curEl = $('presetCurrent');
  const curNameEl = $('presetCurrentName');
  const pvBox = $('presetPreview');
  const pvImg = $('presetPreviewImg');
  const pvEmpty = $('presetPreviewEmpty');
  // 「默认」也当成一套可选的外观：它的 CSS 就是空串（清空 = 回到站点自带主题）。
  // 单独放进列表而不是靠「没匹配到」来表示，用户才能在框里明确选中它、看到它的预览。
  const DEFAULT_PRESET = {
    id: 'default',
    name: { zh: '默认', en: 'Default' },
    desc: { zh: '站点自带：蓝白配色 + 三列卡片首页', en: 'Built-in: blue on white, three-column card home' },
    css: '',
  };
  const allPresets = () => [DEFAULT_PRESET].concat(PRESETS);
  const descOf = (p) => (p.desc && (p.desc[LANG] || p.desc.zh)) || '';
  const nameOf = (p) => (p.name && (p.name[LANG] || p.name.zh)) || p.id;
  const presetById = (id) => allPresets().find((p) => p.id === id) || null;
  // 预览图：有截图就显示，没有（用户自己写的 CSS）就只留一行「自定义」说明。
  // 用户明确要求「自定义不用预览」—— 他写什么就是什么，没法预渲染。
  const updatePreview = (id) => {
    if (!pvBox) return;
    const has = !!id && PREVIEW_IDS.indexOf(id) >= 0;
    pvBox.hidden = !has;
    pvEmpty.hidden = has;
    if (has) {
      pvImg.src = '/preset-preview/' + id + '.png' + (PREVIEW_VER ? '?v=' + PREVIEW_VER : '');
      pvImg.alt = nameOf(presetById(id) || DEFAULT_PRESET);
    } else {
      pvImg.removeAttribute('src');
    }
  };
  const showDesc = (p) => {
    if (!descEl) return;
    descEl.innerHTML = '';
    if (!p) {
      const s = document.createElement('span');
      s.textContent = t('themePresetCustom');
      descEl.appendChild(s);
      return;
    }
    const b = document.createElement('b');
    b.textContent = nameOf(p);
    const s = document.createElement('span');
    s.textContent = descOf(p);
    descEl.appendChild(b);
    descEl.appendChild(s);
  };
  // 收起时按钮上显示什么：选中了某套就显示它，否则说明这是用户自己改过的
  const setCurrentName = (id) => {
    if (!curNameEl) return;
    const p = presetById(id);
    curNameEl.textContent = p ? nameOf(p) : t('themePresetCustom');
  };
  const openMenu = (on) => {
    if (!menuEl || !curEl || !boxEl) return;
    menuEl.hidden = !on;
    boxEl.classList.toggle('open', on);
    curEl.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) {
      const p = presetById(matchPreset(ta.value));
      showDesc(p);
      if (p) updatePreview(p.id);
    }
  };
  const renderPresets = () => {
    if (!row) return;
    if (!PRESETS.length) { if (boxEl) boxEl.style.display = 'none'; return; }
    row.innerHTML = '';
    allPresets().forEach((p) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'preset';
      b.dataset.id = p.id;
      b.setAttribute('role', 'option');
      b.textContent = nameOf(p);
      // title 留一份，方便用键盘/读屏的人也能拿到简介
      b.title = descOf(p) ? nameOf(p) + '：' + descOf(p) : nameOf(p);
      b.onmouseenter = () => { showDesc(p); updatePreview(p.id); };
      b.onfocus = () => { showDesc(p); updatePreview(p.id); };
      b.onclick = () => {
        ta.value = p.css;
        updateCount();
        clearMsg();
        markPreset(p.id);
        say('ok', p.id === 'default' ? t('themeCleared') : tf('themePresetApplied', nameOf(p)));
        openMenu(false);
        ta.focus();
      };
      row.appendChild(b);
    });
    markPreset(matchPreset(ta.value));
  };
  const markPreset = (id) => {
    if (!row) return;
    [...row.children].forEach((el) => el.classList.toggle('on', !!id && el.dataset.id === id));
    setCurrentName(id);
    const p = presetById(id);
    showDesc(p);
    updatePreview(id);
  };
  // 编辑器里的内容正好等于某套预设（或为空 = 默认）时，下拉框里把它点亮，
  // 用户能一眼看出「我现在是这套」。自己改过的内容则显示「自定义」。
  const matchPreset = (css) => {
    const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
    const v = norm(css);
    if (!v) return 'default';
    const hit = PRESETS.find((p) => norm(p.css) === v);
    return hit ? hit.id : '';
  };

  // 下拉框的开合：点按钮切换；点别处、按 Esc 收起
  if (curEl) curEl.onclick = (e) => { e.stopPropagation(); openMenu(menuEl.hidden); };
  d.addEventListener('click', (e) => {
    if (boxEl && !boxEl.contains(e.target) && !menuEl.hidden) openMenu(false);
  });
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menuEl.hidden) openMenu(false); });

  // 载入当前值：读接口不 clone、不扫库，工作副本没准备好时返回空串。
  // keep=true 用于「切语言后重开」：此时编辑器里已经有用户没保存的内容，
  // 不能拿服务器上的旧值把它盖掉，只补上 maxBytes 与预设列表。
  say('', t('themeLoading'));
  api('/api/theme').then((r) => {
    maxBytes = r.maxBytes || maxBytes;
    if (keep) {
      updateCount();
      renderPresets();
      return;
    }
    ta.value = r.css || '';
    updateCount();
    renderPresets();
    if (!r.css) say('', t('themeEmpty'));
    else clearMsg();
  }).catch((e) => say('bad', t('themeLoadFail') + e.message));

  $('themeClear').onclick = () => {
    ta.value = '';
    updateCount();
    clearMsg();
    markPreset('');
    say('', t('themeCleared'));
    ta.focus();
  };

  // 写作指南：面板里只留一行说明（用户要求面板文字 ≤50 字），
  // 具体怎么写放进这个按钮，点了才展开，不占面板地方。
  $('themeGuide').onclick = () => openThemeGuide((code) => {
    ta.value = ta.value.trim() ? ta.value.replace(/\\s*$/, '\\n\\n') + code : code;
    updateCount();
    clearMsg();
    markPreset(matchPreset(ta.value));
    ta.focus();
  });

  const save = async (alsoPublish) => {
    const css = ta.value;
    const btn = alsoPublish ? $('themePub') : $('themeSave');
    const other = alsoPublish ? $('themeSave') : $('themePub');
    const old = btn.textContent;
    btn.disabled = true; other.disabled = true;
    btn.textContent = alsoPublish ? t('themePublishing') : t('themeSaving');
    clearMsg();
    // 弹窗里的提示会被「保存成功后自动关窗」吞掉，所以同时在右上角留一条：
    // 关窗之后用户还能看见「外观已保存并推送 / 失败原因」。
    const tid = alsoPublish ? toastOpen(t('toastThemeTitle'), t('toastStarting')) : 0;
    try {
      const r = alsoPublish
        ? await api('/api/theme/publish', { css })
        : await api('/api/theme', { css });
      if (alsoPublish) {
        if (r.failed) {
          // 文件已经写进工作副本，只是没推上去 —— 这一点必须说清，
          // 否则用户会以为连保存都失败了，重开弹窗发现内容还在，反而更困惑。
          const msg = t('themePublishFail') + ((r.log && r.log[r.log.length - 1]) || '');
          say('bad', msg);
          toastSet(tid, 'bad', t('toastFailed'), msg);
        } else if (r.pushed) {
          const msg = (r.log && r.log[0]) || t('themeSaved');
          say('ok', msg);
          toastSet(tid, 'busy', t('toastThemeTitle'), t('toastPushed'), (r.log || []).join('\\n'));
          // 外观推送也要等 Pages 构建，同样把上线进度显示到底
          if (r.commit) {
            let since = Date.now();
            try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* 取不到就退回开始时刻 */ }
            void waitUntilLive(since, r.commit, '', tid, 'theme');
          } else {
            toastSet(tid, 'ok', t('toastThemeOk'), msg);
          }
          setTimeout(() => { const x = document.getElementById('themeDlg'); if (x) x.remove(); }, 1600);
        } else {
          const msg = (r.log && r.log[0]) || t('themeSaved');
          say('ok', msg);
          toastSet(tid, 'ok', t('toastThemeSavedOnly'), msg);
        }
      } else {
        say('ok', t('themeSaved'));
        // 「只保存」也要提示：这条明确写着「还没上线」，避免用户以为已经生效
        toastSet(tid, 'ok', t('toastThemeSavedOnly'), t('themeSaved'));
      }
      try { await loadState(); } catch (e) { /* 状态刷新失败不影响保存结果 */ }
    } catch (e) {
      const msg = (alsoPublish ? t('themePublishFail') : t('themeSaveFail')) + e.message;
      say('bad', msg);
      if (tid) toastSet(tid, 'bad', t('toastFailed'), msg);
    } finally {
      btn.disabled = false; other.disabled = false;
      btn.textContent = old;
      updateCount();
    }
  };

  $('themeSave').onclick = () => save(false);
  $('themePub').onclick = () => save(true);
}

// 顶部「设置」按钮：没有连接时是「新建」，有连接时编辑当前这个
function openActiveSetup() {
  const cur = S.connections.find((c) => c.id === S.active) || null;
  openSetup(cur, false);
}
// 这两个句柄供切语言时原样重开弹窗用（弹窗内容是函数内闭包，外部拿不到）
let setupShowPick = null, authHelpReopen = null;
function openSetup(conn, keepPicked) {
  setupConn = conn || null;
  // keepPicked：切语言时重开弹窗要留住用户已经选好的文件夹
  if (!keepPicked) setupPicked = conn ? conn.vaultPath || '' : '';
  const old = document.getElementById('setupDlg');
  if (old) old.remove();

  const dlg = document.createElement('div');
  dlg.className = 'dialog'; dlg.id = 'setupDlg';
  // 注意：这段 HTML 处在服务端 UI 模板字面量内部，因此不能用反引号与模板占位符，
  // 只能拼接字符串（否则反引号会提前闭合外层模板）。占位符由下面的 textContent 填。
  dlg.innerHTML =
    '<div class="panel">' +
      '<h2 id="sTitle"></h2>' +
      '<div class="hint" data-i18n="setupHint"></div>' +
      '<div class="field">' +
        '<label data-i18n="step1"></label>' +
        '<div class="pickrow">' +
          '<input id="sVault" readonly data-i18n-ph="pickPlaceholder">' +
          '<button class="ghost" id="sPick" data-i18n="chooseFolder"></button>' +
        '</div>' +
        '<div class="picker" id="sPickMsg"></div>' +
      '</div>' +
      '<div class="field">' +
        '<label data-i18n="step2"></label>' +
        '<input id="sName" data-i18n-ph="namePlaceholder">' +
      '</div>' +
      '<div class="field">' +
        '<label data-i18n="step3"></label>' +
        '<div id="sRepoArea"></div>' +
      '</div>' +
      '<div id="sWarn"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="sCancel" data-i18n="cancel"></button>' +
        '<button id="sSave"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(dlg);
  applyLang();   // 填上面那批 data-i18n / data-i18n-ph

  const $ = (id) => dlg.querySelector('#' + id);
  $('sTitle').textContent = conn ? t('setupTitleEdit') : t('setupTitleNew');
  $('sSave').textContent = conn ? t('save') : t('create');
  $('sVault').value = setupPicked;
  $('sName').value = conn ? conn.name : '';

  // ---- ③ GitHub 仓库区：分「已有连接（只读）」与「新建（三选一）」 ----
  // 用户之前的困惑：「连接 GitHub」被拆成两个按钮、不知道去哪建仓库、不知道要授权。
  // 现在收成一块：默认一键新建，选「我已建好」才出现地址输入框。
  const repoArea = $('sRepoArea');
  let repoMode = 'auto';           // auto = 一键新建；manual = 我已有仓库
  let tokenOk = false;             // 本机是否已有 GitHub 授权
  let repoVal = conn ? conn.repo : '';

  const renderRepoArea = () => {
    repoArea.innerHTML = '';
    if (conn) {
      const ro = document.createElement('input');
      ro.value = conn.repo; ro.readOnly = true;
      repoArea.appendChild(ro);
      const tip = document.createElement('div');
      tip.className = 'picker';
      tip.textContent = t('repoLocked');
      repoArea.appendChild(tip);
      return;
    }

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    const mkTab = (key, label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tab' + (repoMode === key ? ' on' : '');
      b.textContent = label;
      b.onclick = () => { repoMode = key; renderRepoArea(); };
      return b;
    };
    tabs.appendChild(mkTab('auto', t('tabAuto')));
    tabs.appendChild(mkTab('manual', t('tabManual')));
    repoArea.appendChild(tabs);

    if (repoMode === 'manual') {
      const inp = document.createElement('input');
      inp.id = 'sRepo'; inp.value = repoVal;
      inp.placeholder = t('repoPlaceholder');
      inp.oninput = () => { repoVal = inp.value; };
      repoArea.appendChild(inp);
      const tip = document.createElement('div');
      tip.className = 'picker';
      tip.textContent = t('repoTip');
      repoArea.appendChild(tip);
    } else {
      // 一键新建：只需一个仓库名
      const row = document.createElement('div');
      row.className = 'pickrow';
      const inp = document.createElement('input');
      inp.id = 'sRepoName';
      inp.placeholder = t('repoNamePlaceholder');
      inp.value = repoVal ? (repoVal.split('/').pop() || '').replace(/\.git$/, '') : '';
      row.appendChild(inp);
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'ghost';
      btn.id = 'sCreateRepo';
      btn.textContent = tokenOk ? t('createOnGitHub') : t('goAuthorize');
      btn.onclick = async () => {
        const rn = (inp.value || '').trim();
        if (!rn) { alert(t('needRepoName')); return; }
        if (!tokenOk) { showAuthHelp(); return; }
        btn.disabled = true; btn.textContent = t('creating');
        try {
          const r = await api('/api/repo/create', { repoName: rn, private: false }, 'POST');
          repoVal = r.repo;
          setResult('ok', t('createOk') + r.repo);
          renderRepoArea();
        } catch (e) {
          repoArea.appendChild(warnLine(t('createFail') + e.message));
        } finally {
          const b2 = document.getElementById('sCreateRepo');
          if (b2) { b2.disabled = false; b2.textContent = t('createOnGitHub'); }
        }
      };
      row.appendChild(btn);
      repoArea.appendChild(row);

      const tip = document.createElement('div');
      tip.className = 'picker' + (tokenOk ? ' ok' : '');
      tip.textContent = tokenOk ? t('tokenReady') : t('tokenMissing');
      repoArea.appendChild(tip);
    }
  };

  const warnLine = (text) => {
    const d = document.createElement('div');
    d.className = 'warnbox'; d.style.marginTop = '8px';
    d.textContent = text;
    return d;
  };

  // 授权指引：不假装能替用户输密码，直接给出最短可行路径
  const showAuthHelp = () => {
    authHelpReopen = showAuthHelp;
    const old2 = document.getElementById('authDlg');
    if (old2) old2.remove();
    const d2 = document.createElement('div');
    d2.className = 'dialog'; d2.id = 'authDlg';
    d2.innerHTML =
      '<div class="panel">' +
        '<h2 data-i18n="authTitle"></h2>' +
        '<div class="hint" data-i18n="authHint"></div>' +
        '<div class="warnbox" data-i18n-html="tokenWhere"></div>' +
        '<div class="actions">' +
          '<button class="ghost" id="authClose" data-i18n="authClose"></button>' +
          '<button id="authRetry" data-i18n="authRetry"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d2);
    applyLang();
    d2.querySelector('#authClose').onclick = () => d2.remove();
    d2.onclick = (e) => { if (e.target === d2) d2.remove(); };
    d2.querySelector('#authRetry').onclick = async () => {
      const b = d2.querySelector('#authRetry');
      b.disabled = true; b.textContent = t('checking');
      try {
        const r = await api('/api/auth/status');
        tokenOk = !!r.token;
        if (tokenOk) { d2.remove(); setResult('ok', t('authFound')); renderRepoArea(); }
        else { b.disabled = false; b.textContent = t('authRetry'); setResult('err', t('authNotFound')); }
      } catch (e) {
        b.disabled = false; b.textContent = t('authRetry');
        setResult('err', t('checkFail') + e.message);
      }
    };
  };

  renderRepoArea();
  // 后台问一次有没有授权（不阻塞界面）
  api('/api/auth/status').then((r) => {
    tokenOk = !!r.token;
    if (!conn) renderRepoArea();
  }).catch(() => {});

  const showPick = (p) => {
    setupShowPick = showPick;
    const m = $('sPickMsg');
    if (!p) { m.className = 'picker'; m.textContent = ''; return; }
    // 库里必须有 .obsidian 才是合法 Obsidian 库；没有也让用户看到自己选了什么
    m.className = 'picker ok';
    m.textContent = t('pickOk') + p;
    if (!conn && !$('sName').value) {
      // UI 模板里的反斜杠要按「浏览器最终看到的源码」算层数，这里干脆不用正则：
      // 文件里写四个反斜杠 = 模板求值后两个 = 字符串字面量一个反斜杠
      const sep = p.indexOf('\\\\') >= 0 ? '\\\\' : '/'
      const parts = p.split(sep)
      const base = parts.filter(Boolean).pop() || ''
      if (base) $('sName').value = base;
    }
  };
  showPick(setupPicked);

  $('sPick').onclick = async () => {
    $('sPick').disabled = true; $('sPick').textContent = t('pickWait');
    // 原生文件夹对话框是模态的，服务端会一直等用户点完（最长 5 分钟）。
    // 万一对话框被浏览器挡住、用户以为卡死了，这里给一个更短的兜底：
    // 到点后解锁按钮并提示怎么找回弹窗，避免界面永远停在「请在弹窗中选择…」。
    let timedOut = false;
    const guard = setTimeout(() => {
      timedOut = true;
      $('sPick').disabled = false; $('sPick').textContent = t('chooseFolder');
      $('sPickMsg').className = 'picker bad';
      $('sPickMsg').textContent = t('pickTimeout');
    }, 200000);
    try {
      const r = await api('/api/browse', {}, 'POST');
      if (timedOut) return;
      if (r.path) { setupPicked = r.path; $('sVault').value = r.path; showPick(r.path); }
    } catch (e) {
      if (!timedOut) { $('sPickMsg').className = 'picker bad'; $('sPickMsg').textContent = t('pickFail') + e.message; }
    }
    finally { clearTimeout(guard); if (!timedOut) { $('sPick').disabled = false; $('sPick').textContent = t('chooseFolder'); } }
  };

  const close = () => dlg.remove();
  $('sCancel').onclick = close;
  dlg.onclick = (e) => { if (e.target === dlg) close(); };

  $('sSave').onclick = async () => {
    const warn = $('sWarn');
    warn.innerHTML = '';
    const name = $('sName').value.trim();
    if (!setupPicked) { warn.innerHTML = '<div class="warnbox">' + t('mustPickVault') + '</div>'; return; }
    if (!repoVal) {
      warn.innerHTML = '<div class="warnbox">' + (conn ? t('mustFillRepo') : t('mustCreateRepo')) + '</div>';
      return;
    }
    $('sSave').disabled = true;
    try {
      if (conn) {
        // 已有连接：只更新本地库路径与显示名
        const r = await api('/api/connection/vault', { vaultPath: setupPicked, id: conn.id });
        if (name && name !== conn.name) await api('/api/connection/rename', { id: conn.id, name });
        if (r && r.warn) warn.innerHTML = '<div class="warnbox">' + esc(r.warn) + '</div>';
      } else {
        const r = await api('/api/connection/setup', {
          name, repo: repoVal, branch: 'main', vaultPath: setupPicked, initFromTemplate: true,
        });
        if (r && r.warn) { warn.innerHTML = '<div class="warnbox">' + esc(r.warn) + '</div>'; $('sSave').disabled = false; return; }
      }
      close();
      setResult('ok', conn ? t('saved') : t('created'));
      await loadState();
    } catch (e) {
      warn.innerHTML = '<div class="warnbox">' + esc(e.message) + '</div>';
      $('sSave').disabled = false;
      // 建连接时因为「没有 GitHub 授权」失败，是最常见的卡点：
      // 当场把授权弹窗打开，用户不用自己去找入口。
      if (e.needAuth) openAuthDialog();
    }
  };
}

// HTML 转义：拼 innerHTML 时必须过一遍（文件夹名、笔记路径、服务端错误文案都可能带 < > "）。
// 同一份 UI 里 setResult 用 textContent，这里却拼字符串，转义纪律不一致曾是 XSS 缺口。
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function renderFolders() {
  const q = document.getElementById('q').value.trim().toLowerCase();
  const grid = document.getElementById('folders');
  grid.innerHTML = '';
  // 与上面三栏用同一份口径：自动同步开关开着的类别由后台自己发，不算「待处理」，
  // 否则文件夹里会一直挂着 ~ / - 徽标，跟三栏显示的 0 对不上。
  const CH = manualChanges();
  // path -> 'add' | 'mod' | 'del'，用于给每一行打标签
  const chgOf = new Map();
  for (const p of CH.added) chgOf.set(p, 'add');
  for (const p of CH.modified) chgOf.set(p, 'mod');
  for (const p of CH.deleted) chgOf.set(p, 'del');

  const folders = new Map();
  const push = (n) => {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    if (!folders.has(f)) folders.set(f, []);
    folders.get(f).push(n);
  };
  for (const n of S.notes) {
    if (q && !(n.title + n.path).toLowerCase().includes(q)) continue;
    push(n);
  }
  // 线上有、本地已经没有的笔记：也挂进所属文件夹，用删除样式显示，
  // 否则用户只会看到「线上多出来一篇」却在这个列表里找不到它。
  // 注意：本地还在、只是关了 public 的笔记已经在 S.notes 里（会被打上「删除」标签），
  // 这里必须跳过，否则同一篇会在列表里出现两次。
  const localPaths = new Set(S.notes.map((n) => n.path));
  for (const p of CH.deleted) {
    if (localPaths.has(p)) continue;
    if (q && !p.toLowerCase().includes(q)) continue;
    push({ path: p, title: p.replace(/\.(md|markdown)$/i, '').split('/').pop(), isPublic: true, gone: true });
  }
  const keys = [...folders.keys()].sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a < b ? -1 : 1));
  const ungroupedEl = document.getElementById('ungrouped');
  if (ungroupedEl) ungroupedEl.innerHTML = '';
  const rest = [];   // 有文件夹的盒子，稍后按列分配
  for (const f of keys) {
    const items = folders.get(f);
    // 条目数按列表里实际显示的行算（已删除的也算一行，否则只剩「删除」项的文件夹会显示 0 篇）
    const realCount = items.length;
    // 有改动的排前面：新增 → 修改 → 删除 → 未变
    const rank = (n) => { const c = n.gone ? 'del' : chgOf.get(n.path); return c === 'add' ? 0 : c === 'mod' ? 1 : c === 'del' ? 2 : 3; };
    items.sort((a, b) => rank(a) - rank(b));
    const cntAdd = items.filter((n) => !n.gone && chgOf.get(n.path) === 'add').length;
    const cntMod = items.filter((n) => !n.gone && chgOf.get(n.path) === 'mod').length;
    const cntDel = items.filter((n) => n.gone || chgOf.get(n.path) === 'del').length;
    const collapsed = S.collapsed.has(f);   // 收起状态记在 S.collapsed 里，跨重渲染保留
    const box = document.createElement('div'); box.className = 'box';
    const head = document.createElement('div'); head.className = 'box-head';
    head.innerHTML = '<span class="chev' + (collapsed ? '' : ' open') + '">▶</span><span class="name">' + esc(f || t('uncategorized')) + '</span>';
    // 文件夹上的变更摘要：+新增 ~修改 -删除
    const sum = document.createElement('span'); sum.className = 'sum';
    const chip = (cls, label, tip) => { const s = document.createElement('span'); s.className = 'chg ' + cls; s.textContent = label; s.title = tip; sum.appendChild(s); };
    if (cntAdd) chip('add', '+' + cntAdd, t('chgTipAdded'));
    if (cntMod) chip('mod', '~' + cntMod, t('chgTipModified'));
    if (cntDel) chip('del', '-' + cntDel, t('chgTipDeleted'));
    if (sum.children.length) head.appendChild(sum);
    const cnt = document.createElement('span'); cnt.className = 'cnt'; cnt.textContent = tf('countNotes', realCount);
    head.appendChild(cnt);
    const mk = (label, cls, pub) => { const b = document.createElement('button'); b.className = 'mini ' + cls; b.textContent = label; b.onclick = (e) => { e.stopPropagation(); toggleBatch(f, pub); }; return b; };
    head.appendChild(mk(t('pubAllMini'), 'green', true));
    head.appendChild(mk(t('privAllMini'), '', false));
    head.onclick = () => {
      const nowCollapsed = !S.collapsed.has(f);
      if (nowCollapsed) S.collapsed.add(f); else S.collapsed.delete(f);
      const list = box.querySelector('ul');
      list.style.display = nowCollapsed ? 'none' : '';
      head.querySelector('.chev').classList.toggle('open', !nowCollapsed);
    };
    box.appendChild(head);
    const ul = document.createElement('ul');
    if (collapsed) ul.style.display = 'none';
    for (const n of items) {
      const chg = n.gone ? 'del' : chgOf.get(n.path) || null;
      const li = document.createElement('li');
      if (n.gone) li.className = 'gone';
      // 变更标签：新增/修改/删除
      if (chg) {
        const b = document.createElement('span');
        b.className = 'chg ' + chg;
        b.textContent = t(chg === 'add' ? 'chgAdded' : chg === 'mod' ? 'chgModified' : 'chgDeleted');
        b.title = t(chg === 'add' ? 'chgTipAdded' : chg === 'mod' ? 'chgTipModified' : 'chgTipDeleted');
        li.appendChild(b);
      }
      const ts = document.createElement('span'); ts.className = 't'; ts.title = n.path; ts.textContent = n.title;
      li.appendChild(ts);
      // 已删除的条目（线上有、本地没了）不再显示公开/私密标签，它已经不存在了
      if (!n.gone) {
        const tag = document.createElement('span');
        tag.className = n.isPublic ? 'pub' : 'pri';
        tag.textContent = n.isPublic ? t('pub') : t('pri');
        li.appendChild(tag);
      }
      if (!n.gone) {
        // 公开开关：新增的笔记也走同一个开关，和文件夹上的「全部公开/全部私密」联动
        const sw = document.createElement('button'); sw.className = 'sw' + (n.isPublic ? ' on' : '');
        sw.onclick = async () => {
          try { await api('/api/toggle', { path: n.path, pub: !n.isPublic }); }
          catch (e) { setResult('err', t('toggleFail') + e.message); return; }
          n.isPublic = !n.isPublic;
          // 公开状态一变，变更分类（新增/删除）也跟着变，重新拉一次状态
          await refreshChanges();
          promptPending();
        };
        li.appendChild(sw);
      }
      ul.appendChild(li);
    }
    box.appendChild(ul);
    // 库根目录下的笔记（没有文件夹）单独一块，不混进文件夹列
    if (f === '' && ungroupedEl) ungroupedEl.appendChild(box);
    else rest.push(box);
  }
  // 文件夹按列分配：第 i 个文件夹固定落在第 i % N 列。
  // 展开/收起时只有它自己那一列变高，其它列纹丝不动，也不会因为行高对齐留下空白。
  if (rest.length) {
    const nCols = Math.max(1, Math.min(3, Math.floor(((grid.clientWidth || window.innerWidth) + 12) / 332)));
    const cols = [];
    for (let i = 0; i < nCols; i++) {
      const col = document.createElement('div');
      col.className = 'grid-col';
      grid.appendChild(col);
      cols.push(col);
    }
    rest.forEach((box, i) => cols[i % nCols].appendChild(box));
  } else if (!(ungroupedEl && ungroupedEl.children.length) && S.notes.length === 0 && CH.deleted.length === 0) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.flex = '1 1 0';
    card.textContent = S.connections.length === 0 ? t('emptyNoConn') : t('emptyNoNotes');
    grid.appendChild(card);
  }
}

// 窗口宽度变化时重新分列（列数变了要重新分配文件夹），防抖 150ms
let _gridResizeT = 0;
window.addEventListener('resize', () => {
  clearTimeout(_gridResizeT);
  _gridResizeT = setTimeout(() => { if (S.notes) renderFolders(); }, 150);
});

// 只刷新「变更分类 + 笔记列表」，用于公开开关切换后同步标签（不整页重载）
async function refreshChanges() {
  try {
    const next = await api('/api/state');
    S.notes = next.notes;
    S.changes = next.changes;
    S.autoSync = next.autoSync;
    if (Array.isArray(next.autoLog)) S.autoLog = next.autoLog;
    renderChanges(); renderFolders(); updateVaultCounts(); renderAutoLog();
  } catch {
    /* 刷新失败不影响主流程，下次 loadState 会纠正 */
  }
}
// 切公开状态后，只更新信息条上的计数，不整页重渲染（避免滚动位置丢失）
function updateVaultCounts() {
  const cur = S.connections.find((c) => c.id === S.active);
  if (!cur) return;
  cur.publicCount = S.notes.filter((n) => n.isPublic).length;
  const metaEl = document.getElementById('vbMeta');
  if (metaEl) metaEl.innerHTML = tf('vaultMetaHtml', cur.noteCount, cur.publicCount);
}
async function toggleBatch(folder, pub) {
  for (const n of S.notes) {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    if (f === folder && n.isPublic !== pub) { await api('/api/toggle', { path: n.path, pub }); n.isPublic = pub; }
  }
  await refreshChanges(); updateVaultCounts(); promptPending();
}
// 一键收起 / 一键展开：只改 S.collapsed，再重渲染（重渲染会读取该集合）
function collapseAllFolders() {
  for (const n of S.notes) {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    S.collapsed.add(f);
  }
  renderFolders();
}
function expandAllFolders() {
  S.collapsed.clear();
  renderFolders();
}
async function toggleAll(pub) {
  for (const n of S.notes) if (n.isPublic !== pub) { await api('/api/toggle', { path: n.path, pub }); n.isPublic = pub; }
  await refreshChanges(); updateVaultCounts(); promptPending();
}

// 发布：顶部状态栏保留一句话结论，右上角另开一条进度提示（从转圈走到 ✓/✗）。
async function doPublish() {
  const btn = document.getElementById('pubBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('publishing');
  const tid = toastOpen(t('toastPublishTitle'), t('toastStarting'));
  // 基线必须在**推送完成之后**取。推送前取的话，上一笔提交的构建如果正好在这几秒内
  // 落地，就会被误判成「本次已上线」——实测踩到过：状态栏显示「已上线（用时 5 秒）」，
  // 但实际部署的是上一版。推送后再取，基线里已经包含任何更早完成的构建，
  // 本次构建的 generatedAt 必然更大。
  const publishStart = Date.now();
  try {
    const r = await api('/api/publish', undefined, 'POST');
    const lines = r.log || [];
    // 成败由服务端给的结构化字段判断，不能靠日志里有没有「失败」两个字（换语言就失效）
    const summary = lines[0] || t('publishDone');
    if (r.failed) {
      // 推送失败时，界面上必须一眼看出「没上线」——真实踩过坑：失败那行夹在
      // 几条成功日志（本地写入 / 站名变量同步）中间，用户以为已经发布了。
      // 网络类失败单独给一句人话（多半是加速器），具体报错降到最后一行。
      if (r.failKind === 'network') {
        toastSet(tid, 'bad', t('toastFailed'), t('pushNetworkFail'), lines.join('\\n'));
      } else {
        toastSet(tid, 'bad', t('toastFailed'), summary === t('publishDone') ? t('publishErr') : summary, lines.join('\\n'));
      }
    } else {
      // 推上去只是第一步：Pages 还要构建 + 部署（实测 40~90 秒）。
      // 这里不阻塞按钮，后台轮询把「还要等多久 / 已经上线」显示出来。
      if (r.pushed) {
        toastSet(tid, 'busy', t('toastPublishTitle'), t('toastPushed'), lines.join('\\n'));
        let since = publishStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* 取不到就退回开始时刻 */ }
        void waitUntilLive(since, r.commit, r.siteUrl, tid, 'publish');
      } else {
        // 没东西可推也是一种明确的「完成」，别让它停在转圈上让人以为还在跑
        toastSet(tid, 'ok', t('toastDone'), t('toastNothingToPush'), lines.join('\\n'));
      }
    }
  } catch (e) {
    toastSet(tid, 'bad', t('toastFailed'), t('publishFail') + e.message);
    // 授权问题导致的失败：直接把授权窗弹出来，省得用户去找那个按钮
    if (e.needAuth) openAuthDialog();
  } finally {
    btn.disabled = false; btn.textContent = old;
    try { await loadState(); } catch { /* 状态刷新失败不影响发布结果 */ }
    refreshAuth();
  }
}

// 轮询「线上是否已经是刚推的那一版」。
// 判定优先用提交 SHA（线上产物里带 GITHUB_SHA），拿不到再退回比构建时间。
// 连续点两次发布时，靠 liveSeq 让上一轮作废，免得旧轮询把新结果覆盖掉。
let liveSeq = 0;
async function waitUntilLive(baselineAt, sha, siteUrl, toastId, kind) {
  const seq = ++liveSeq;
  const t0 = Date.now();
  const LIMIT = 4 * 60 * 1000;
  const q = (sha ? 'sha=' + encodeURIComponent(sha) : 'since=' + encodeURIComponent(String(baselineAt)));
  const okTitle = kind === 'source' ? t('toastSourceOk')
    : kind === 'theme' ? t('toastThemeOk')
    : t('toastPublishOk');
  const busyTitle = kind === 'source' ? t('toastSourceTitle')
    : kind === 'theme' ? t('toastThemeTitle')
    : t('toastPublishTitle');
  while (Date.now() - t0 < LIMIT) {
    if (seq !== liveSeq) return;
    const secs = Math.round((Date.now() - t0) / 1000);
    // 提示条同步显示已经等了多久，避免用户以为卡死
    if (toastId) toastSet(toastId, 'busy', busyTitle, tf('liveBuilding', secs));
    let r = null;
    try { r = await api('/api/live?' + q); } catch { /* 网络抖一下就继续等 */ }
    if (seq !== liveSeq) return;
    if (r && r.live) {
      const took = Math.round((Date.now() - t0) / 1000);
      if (toastId) toastSet(toastId, 'ok', okTitle, tf('liveOk', took), '', r.siteUrl || siteUrl || '');
      return;
    }
    await new Promise((res) => setTimeout(res, 3000));
  }
  if (seq === liveSeq) {
    if (toastId) toastSet(toastId, 'bad', t('toastFailed'), t('liveTimeout'));
  }
}

// 「更新源码」：把工具目录里的站点源码（src/、scripts/、.github/ 与顶层配置）
// 全量覆盖进工作副本并推送，让 GitHub Actions 重新构建。
// 与「发布」的分工：发布同步笔记（content/），这里同步站点本身。
// 改完 blog-static/src/ 后必须点这个，只点「发布」线上不会变。
async function doUpdateSource() {
  const btn = document.getElementById('srcBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('updatingSrc');
  const tid = toastOpen(t('toastSourceTitle'), t('toastStarting'));
  // 与发布一样：源码推上去也要等 Pages 构建，顺手把上线进度显示出来。
  // 基线同样在推送完成之后取（原因见 doPublish 里的注释）。
  const srcStart = Date.now();
  try {
    const r = await api('/api/update-source', undefined, 'POST');
    const lines = r.log || [];
    if (r.failed) {
      if (r.failKind === 'network') {
        toastSet(tid, 'bad', t('toastFailed'), t('pushNetworkFail'), lines.join('\\n'));
      } else {
        toastSet(tid, 'bad', t('toastFailed'), lines[0] || t('publishErr'), lines.join('\\n'));
      }
    } else {
      if (r.pushed) {
        toastSet(tid, 'busy', t('toastSourceTitle'), t('toastPushed'), lines.join('\\n'));
        let since = srcStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* 取不到就退回开始时刻 */ }
        void waitUntilLive(since, r.commit, '', tid, 'source');
      } else {
        toastSet(tid, 'ok', t('toastDone'), t('toastNothingToPush'), lines.join('\\n'));
      }
    }
  } catch (e) {
    toastSet(tid, 'bad', t('toastFailed'), t('srcUpdateFail') + e.message);
    if (e.needAuth) openAuthDialog();
  } finally {
    btn.disabled = false; btn.textContent = old;
    try { await loadState(); } catch { /* 状态刷新失败不影响更新结果 */ }
    refreshAuth();
  }
}
document.getElementById('q').oninput = renderFolders;
// 插件用 iframe 嵌入时带 ?embed=1：Obsidian 自己的文件树已经承担了「浏览 + 折叠」，
// 这里的文件夹网格是重复的一套，藏掉它，界面只留发布相关的东西。
if (new URLSearchParams(location.search).get('embed') === '1') {
  document.body.classList.add('embed-mode');
}
applyLang();
loadState().catch((e) => setResult('err', t('loadFail') + e.message));
// 授权状态查一次再决定提示条是否显示：已授权的机器上不该出现这条
refreshAuth();
// 状态同步：先问极轻的 /api/rev（只回一个数字），版本号变了才拉全量 /api/state。
// 这样在 Obsidian 文件树里点了开关，这边 1 秒内就会跟着变；
// 全量那份要扫 117 个文件，不能按这个频率硬拉。
let lastRev = 0;
setInterval(async () => {
  try {
    const r = await api('/api/rev');
    const rev = Number(r && r.rev) || 0;
    if (!rev || rev === lastRev) return;
    lastRev = rev;
    await loadState();
  } catch (e) { /* 服务没起来就下次再试 */ }
}, 1000);
// 兜底：库被外部改动（同步、别的编辑器）时版本号不会变，仍然每 8 秒全量对一次
setInterval(() => { loadState().catch(() => {}); }, 8000);
</script></body></html>`
