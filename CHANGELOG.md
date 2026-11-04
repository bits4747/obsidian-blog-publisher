# 更新日志

[English](CHANGELOG.en.md)

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.5] - 2026-11-04

### 修复
- 根 `tsconfig.json` 的 `include` 原先把 `obsidian-plugin/` 也扫进去，但插件依赖装在 `obsidian-plugin/node_modules`，站点侧 `npm ci` 不会装它，所以干净环境里 `next build` 的类型检查会报 `Cannot find module 'obsidian'`。现在把该目录排除，插件自己的类型检查仍走 `npm run typecheck` 的第二条命令（`-p obsidian-plugin/tsconfig.json`）。

## [1.0.4] - 2026-11-04

### 变更
- 根目录 `README.md` 改为英文正文，中文说明移到 `README.zh.md`（原 `README.en.md`）。社区目录只扫根目录那一份，英文是必需项；两份文件顶部互相链接。
- `scripts/build-content.mjs` 在 `content/` 目录不存在时跳过内容构建：这是不含任何笔记的源码仓库（笔记由发布器写进用户仓库），不该按「拒绝构建空站点」处理。`content/` 存在但没有公开笔记时仍然拒绝构建。

### 修复
- `obsidian-plugin/src/main.ts` 的样式赋值改为 CSS 类（`blog-publisher-root` / `blog-publisher-frame` / `blog-publisher-loading`），写进 `styles.css` 的这几条规则随插件样式表下发，用户可以用 CSS 片段覆盖；笔记页的标题高亮同理改为 `.preview-heading-flash` 类。
- `src/main.ts` 里禁用的 lint 规则补上原因说明。

## [1.0.3] - 2026-11-04

### 修复
- 插件视图的 iframe 与加载提示不再逐条赋值 `element.style.*`，改用 CSS 类；`loading` 出错时加 `is-error` 类而不是直接写颜色。

## [1.0.2] - 2026-11-01

### 变更
- 文件树开关与批量按钮的样式从插件代码里搬到 `obsidian-plugin/styles.css`：样式不再由 `main.js` 注入 `<style>`，用户可以用 CSS 片段覆盖，主题也能接管。Release 因此多一个 `styles.css` 资产，手动安装需要三个文件。

## [1.0.1] - 2026-11-01

### 变更
- 插件改为单文件分发：`worker.js` 并入 `main.js`（1.17 MB），官方安装与手动安装都只需 `main.js` + `manifest.json` 两个文件。同一份 bundle 用 `BLOG_PUBLISHER_START` 环境变量区分角色——有它就以后台服务身份运行，没有就走插件本体。
- 插件 id 改为 `note-blog-publisher`，名称改为 **Note Blog Publisher**（原 `blog-publisher` 已被社区目录占用）。插件目录名随之改变，从旧版升级需要把文件挪到 `.obsidian/plugins/note-blog-publisher/`。
- 新增 `.github/workflows/release.yml`：打 tag 触发，校验 tag 与 `manifest.json` 的 version 一致后打包、生成构建溯源证明、创建 Release 并附上资产。
- `manifest.json` 与 `versions.json` 移到仓库根目录：社区目录只读默认分支根目录那一份清单，放在 `obsidian-plugin/` 子目录里会导致提交被拒。`release.yml` 与装库脚本随之改路径。
- 设置页与确认弹窗的标题改用 `Setting#setHeading()`，不再直接写 `<h2>` / `<h3>` 元素。
- 去掉控制台调试输出，只保留错误信息。
- 文件树里的公开开关与批量按钮改用 Obsidian 主题变量（`--interactive-accent`、`--shadow-s`），换主题或改配色时跟随，不再写死色值。

### 文档
- README 安装段改为「社区插件目录搜索安装」为主、手动安装为辅；补「为什么数据写在库之外」一节，逐条说明克隆仓库、跨库复用、令牌隔离三个原因，并声明除该数据目录外只读取当前库的公开笔记。
- README 与 CHANGELOG 的项目结构树、命令说明同步单文件产物。
- README 把「几点需要知道的」并入常见问题，逐条改写成问句（`site-template/` 的作用与能否删除、文件树开关为何不响应、界面语言与明暗为何不能单独设、公开状态存在哪）
- README 令牌说明改为「系统加密保存」，并补 Linux 回退明文的前提
- README 项目结构树对齐实际文件：补 `.editorconfig` / `.gitattributes` / `CHANGELOG.en.md` / `CONTRIBUTING*.md` / `versions.json` / `main.js` / `worker.js`，CI 段改为反映 `deploy.yml` 里 `check` / `verify` / `build` / `deploy` 四个 job 的双重用途（站点仓库构建部署、插件仓库类型检查+打包）

### 安全
- GitHub 令牌不再明文落盘：Windows 用 DPAPI（`CryptProtectData`，CurrentUser 作用域）、macOS 用 Keychain 加密，密文存在 `local.json` 的 `githubTokenEnc` 字段，只有本机当前账号能解开。旧格式的明文 `githubToken` 在首次读取时自动迁移成密文并删除原字段；迁移失败（系统命令不可用）则保持原样，不会让用户丢掉令牌。Linux 没有免依赖的等价物，仍退回明文并在 README 写明。
- 修掉一个更隐蔽的令牌泄露：`git()` 与 `preflightRemote()` 原先把令牌拼进命令行参数（`-c http.extraHeader=Authorization: Basic ...`），会出现在进程列表里、也可能被工具的错误输出带出来。改用 git 官方的 `GIT_CONFIG_COUNT` / `GIT_CONFIG_KEY_0` / `GIT_CONFIG_VALUE_0` 环境变量注入，配置照样生效但不出现在 argv。
- 令牌解密结果在内存里缓存，避免每次 git 调用都起一次子进程。

## [1.0.0] - 2026-10-30

首个公开版本。此前版本号是内部迭代（`1.0.0` ~ `1.8.0`），公开发布统一从 `1.0.0` 重新起算，
所以下文内部迭代段里也会看到一个 `1.0.0`——两者不是同一个版本，内部版本一律带「内部」前缀。

### 新增
- 英文文档 `README.en.md`，中文 README 顶部加语言切换
- `CONTRIBUTING.md`：报告问题要带什么、本地怎么跑、提交前三道检查、六条硬规矩
- `.github/ISSUE_TEMPLATE/`：Bug 报告与功能建议模板，关闭空白 issue
- `obsidian-plugin/versions.json`（Obsidian 社区插件要求的最低版本映射）
- CI 增加 `verify` job：`typecheck` + 打包插件 + 断言产物非空，**不依赖博客内容**；`pull_request` 触发
- e2e 补两节：`/api/connection/setup`（三条负例 + 一条正例，锁死「不留半成品连接」）、`/api/update-source`（源码改动后模板被全量覆盖、无活动连接被拒）

### 变更
- 版本号统一为 `1.0.0`（`package.json`、`obsidian-plugin/package.json`、`obsidian-plugin/manifest.json`、两个 lock 文件）
- README 安装段改为从 Release 下载三个文件，不再让人克隆仓库再拷贝；补「前置条件」表（Git / **Node.js** / GitHub 账号）与「手动更新」段
- README 授权段用表格说明 `repo` 与 `workflow` 两个 scope 各自的作用，并写明令牌以**明文**存在本机 `local.json`
- 把 `scanWikilinks` / `repairObsidianArtifacts` / `stripMdLinks` / `parseWikilink` / `extractWikiRefs` / `extractTags` 从两份手抄副本合并为 `src/lib/wikilink.mjs` 单一实现

### 修复
- 渲染端 `extractWikiRefs` 漏掉部分引用（`DP/DDP.md`、`图论/圆方树.md`、`图论/最小割.md`、`字符串/回文自动机PAM.md` 四篇）——该函数在 `src/` 里没有消费者，实际反链由构建期索引生成，所以线上未受影响，但隐患已消除

## [1.8.0] - 2026-10-29

### 变更
- 开源仓库只提供 Obsidian 插件形态：删除 `启动管理器.bat`，`npm run manage` 改为 `npm run dev:manager` 并归入「本地开发」，标注为仅调试用
- 界面标题、界面内文案、插件描述统一叫「博客发布器」，不再用「发布管理器」这一命令行时代的称呼
- README 快速开始只讲装插件与启用；浏览器界面只作为改内核时的调试入口

### 移除
- `启动管理器.bat`（双击启动浏览器版管理器的入口）

## [1.7.0] - 2026-10-28

### 新增
- 外观预设增加「方格」与「霓虹」两套，预设总数六套（加「默认」共七项）
- 预设下拉框选中后显示该套首页的预览图（内嵌 base64，带内容哈希绕开缓存）
- 预设按版面而不是配色区分：三列纸卡 / 单列大卡 / 纯文字索引 / 文件树 / 方块拼贴 / 编号目录
- 仓库加入 `themes/`（预设源文件）与 `tools/preview/`（预览图生成链路）

### 变更
- 预设名称改短：墨绿 / 樱粉 / 黑白 / 树形 / 方格 / 霓虹，中英文都有
- 字号滑块的 100% 等于旧版的 120%（新增 `--fs-boost` 全局基准）
- 全站统一内容宽度 `--content-w`（默认 `78rem`），主题不再各写各的 `max-width`
- 外观面板说明压到一句话，教程移入「写作指南」弹窗

### 修复
- 放大字号后文字被裁、元素越出卡片（穿模）
- 树形主题文件夹名比文章标题还小
- 切换界面语言时外观编辑器里未保存的 CSS 被服务器旧值覆盖
- 转私密后日志假报「推送失败」（两个管理器进程抢同一个 git 工作副本）
- 自动同步的结果没有弹窗提示，只写进流水
- `#2427` 这类题目编号被误识别成标签，导致标题链接渲染错误
- 插件形态下顶栏多余的「切换库」下拉

### 移除
- 预设「终端」「素笺双栏」「文档站」三套

## [1.6.0] - 2026-10-26

### 新增
- 自定义外观：管理器里粘贴 CSS 即可改站点配色与首页排版，存为仓库里的 `public/theme.css`
- 外观面板内置预设，可一键填入再改
- 站点提供 `data-region` 钩子（header / main / footer / folders / list / tags / article），供 CSS 定位版面
- 管理器结果弹窗：发布、更新源码、保存外观都有从转圈到 ✓/✗ 的卡片

### 变更
- 弹窗不自动消失、无关闭按钮，点卡片任意位置才收起
- 字号只缩放文字不动版面（覆写 Tailwind 的 `--text-*` 变量，不改根字号）

## [1.5.0] - 2026-10-25

### 新增
- 首页逐层下钻 + 面包屑，支持任意层级嵌套文件夹
- 插件：界面语言与明暗跟随 Obsidian

### 变更
- 管理器首屏从大卡片改成一行信息条
- 文件树批量控件从三态滑块改成「公开」「私密」两个按钮

### 修复
- 已公开过的笔记转私密后误报为「新增」
- 插件里烘焙的站点模板不随插件升级刷新，导致「更新源码」点了没反应

## [1.4.0] - 2026-10-24

### 新增
- Obsidian 插件：公开状态做进原生文件树（笔记 / 文件夹 / 全库三处）
- 插件内核跑在 utilityProcess 子进程里，避免 git 同步调用卡住 Obsidian 主线程
- 文件夹行常驻显示已公开计数

## [内部 1.0.0] - 2026-10-23

### 新增
- 发布管理器：逐篇公开开关、批量操作、搜索筛选、变更三栏、自动同步与流水
- 一键建 GitHub 仓库并启用 Pages
- 静态站点：复刻 Obsidian 的阅读体验（双链 / 嵌入 / callout / 公式 / 标签 / 块引用 / 悬浮预览 / 可拖拽大纲）
- 中英切换、明暗主题、字号缩放
