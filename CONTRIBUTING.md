# 参与开发

[English](CONTRIBUTING.en.md)

先说结论：这个项目**欢迎 issue，但暂不接受外部 PR**。

原因不是不欢迎代码，而是这个仓库有个特殊之处 —— 它同时是「博客生成器」和「被发布到用户仓库的站点模板」。`src/`、`scripts/build-content.mjs`、`.github/` 会被原样打包进 Obsidian 插件，再铺到每个用户的博客仓库里。一处改动要同时通过本地管理器、插件、CI 构建、已发布站点四条路径，外部 PR 很难在没有本机环境的情况下验证完整。所以目前的做法是：**你提问题，我改代码**。

## 报告问题

用 [Issues](https://github.com/bits4747/obsidian-blog-publisher/issues) 的模板。麻烦带上这些，能省掉一半来回：

| 要带什么 | 怎么拿 |
|---|---|
| 版本号 | 管理器页面右下角，或仓库根 `manifest.json` 的 `version` |
| 操作系统 | Windows / macOS / Linux 具体版本 |
| 卡在哪一步 | 「建连接 / 授权 / 选笔记 / 发布 / 更新源码」中的哪一步 |
| 管理器的完整日志 | 点发布后展开的 Details；报错原文**不要截断** |
| 有没有装 Git / Node | `git --version`、`node -v` |

如果涉及网络，先说清楚**有没有开代理/加速器**。这个项目 90% 的「发布失败」都是 GitHub 连不上，而报错原文（`fatal: unable to access ...`）能直接看出来。

## 自己改代码跑起来

```bash
git clone https://github.com/bits4747/obsidian-blog-publisher
cd obsidian-blog-publisher
npm install
npm install --prefix obsidian-plugin

npm run dev:manager     # 本地发布管理器，http://localhost:3457
npm run dev             # 站点预览，http://localhost:3010
```

改完插件代码要重新打包（`main.js` / `worker.js` 是产物，不进 git）：

```bash
npm run plugin
```

### 提交前必须过的三道

```bash
npm run typecheck   # 站点 + 插件两套 tsconfig，都是 strict
npm test            # e2e：起临时数据目录跑完整回归，约 8~10 分钟
npm run build       # 确认站点能真的构建出来
```

`npm test` 会自己建临时目录，不会碰你的真实配置。**不要直接跑 `node scripts/e2e-test.mjs`** —— 它会写连接配置，脚本会拒绝运行并提示你改用 `npm test`。

### 一个必须知道的约束

`src/`、`scripts/build-content.mjs`、`.github/` 是**双份存在**的：源码目录一份，插件里打包一份。改完这些文件后如果不跑 `npm run plugin` 重新打包，老用户点「更新源码」拿到的还是旧模板 —— 表现是「代码改了、用户那儿没变」，很难查。

## 代码结构

```
src/                    站点（Next.js，静态导出）
  lib/wikilink.mjs      ★ Obsidian 语法解析的唯一实现（构建期与渲染期共用）
  lib/obsidian.ts       笔记模型、可见性、大纲
  lib/remark-obsidian.ts  markdown 渲染插件（wikilink / callout / 标签）
  components/blog/      界面组件
scripts/
  manager-core.mjs      发布管理器内核（HTTP 服务、22 个 API、git 操作）
  ui-template.mjs       管理器界面（HTML/CSS/JS 模板字符串）
  build-content.mjs     内容构建：笔记 → public/data/*.json
  e2e-test.mjs          端到端测试
obsidian-plugin/        Obsidian 插件壳（起子进程跑内核）
```

## 几条硬规矩

这些不是风格偏好，是踩过坑总结出来的：

1. **`src/lib/wikilink.mjs` 是唯一实现**。以前 `obsidian.ts` 和 `build-content.mjs` 各有一份手抄副本，靠注释「必须保持一致」维持 —— 结果漂移了，渲染端漏了 4 篇笔记的引用。改解析规则只改这个文件。

2. **`ui-template.mjs` 是模板字面量**，里面的注释不能出现反引号和 `${`，会提前闭合字符串。

3. **模板里不要用 `t` / `tf` / `S` / `LANG` / `DICT` 当局部变量名** —— `t` 是全局翻译函数，遮蔽后报 `t is not a function`，而这个错误会以「发布失败」的形式出现在界面上，极难定位。

4. **仓库的 `.gitignore` 绝不能忽略 `content/`**。它是发布内容目录，CI 靠它生成站点。一旦忽略，「取消公开再恢复」的笔记会变成未跟踪文件，`git add -A` 跳过它，怎么发布都上不了线，而 `git status` 还显示干净。

5. **中英文案必须对齐**。界面文案有两套字典：客户端 `DICT`（在 `ui-template.mjs` 的模板字面量里）和服务端 `SMSG`（`manager-core.mjs` 普通作用域）。新增文案两边都要加，`npm test` 里有键集对齐检查。

6. **笔记标题、路径、文件夹名、仓库名、站名属于「博客内容」，永远不翻译。**

## 许可

提交即同意以 [MIT](LICENSE) 授权。
