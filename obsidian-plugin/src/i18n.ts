import { App } from 'obsidian'

/**
 * 插件自身的界面语言。
 *
 * 只分中文 / 英文两种：Obsidian 配简体或繁体中文都算中文，其它语言一律英文。
 * 判定顺序与 Obsidian 自己一致 —— 先看 app 配置，再看 localStorage。
 */
export type Lang = 'zh' | 'en'

export function hostLang(app: App): Lang {
  let raw = ''
  try {
    const cfg = (app as unknown as { vault?: { getConfig?: (k: string) => unknown } }).vault
    const fromCfg = cfg?.getConfig ? cfg.getConfig('language') : ''
    if (typeof fromCfg === 'string' && fromCfg) raw = fromCfg
    else raw = window.localStorage.getItem('language') || ''
  } catch {
    /* 取不到就按中文，和 Obsidian 默认一致 */
  }
  // zh / zh-cn / zh-tw / zh-hant … 都算中文
  return /^zh/i.test(raw) ? 'zh' : raw ? 'en' : 'zh'
}

export interface Strings {
  // 文件树：单篇
  pub: string
  priv: string
  swToPrivate: string
  swToPublic: string
  // 文件树：文件夹 / 全库
  folderAllPublic: (folder: string, n: number) => string
  folderAllPrivate: (folder: string, n: number) => string
  folderMixed: (folder: string, n: number, pub: number) => string
  vaultAllPublic: (n: number) => string
  vaultAllPrivate: (n: number) => string
  vaultMixed: (n: number, pub: number) => string
  scopeAll: string
  // 批量确认
  confirmPublicTitle: (scope: string) => string
  confirmPrivateTitle: (scope: string) => string
  confirmPublicBody: (n: number) => string
  confirmPrivateBody: (n: number) => string
  confirmPublicCta: string
  confirmPrivateCta: string
  cancel: string
  // 提示
  batchDone: (scope: string, pub: boolean, n: number) => string
  toggleFail: (msg: string) => string
  vaultMismatch: (configured: string, current: string) => string
  // 插件外壳
  ribbonOpen: string
  cmdOpen: string
  cmdPublish: string
  cmdAllPublic: string
  cmdAllPrivate: string
  cmdFolderPublic: string
  cmdFolderPrivate: string
  noActiveNote: string
  viewTitle: string
  loading: string
  startFail: (msg: string) => string
  publishing: string
  publishFailed: (msg: string) => string
  pushed: string
  upToDate: string
  pluginStartFail: (msg: string) => string
  // 设置页
  settingsTitle: string
  settingsDataDesc: string
  settingsOpenName: string
  settingsOpenDesc: string
  settingsOpenBtn: string
  settingsBrowserName: string
  settingsBrowserDesc: string
  settingsBrowserBtn: string
}

const ZH: Strings = {
  pub: '公开',
  priv: '私密',
  swToPrivate: '已公开，点击设为私密',
  swToPublic: '私密，点击设为公开',
  folderAllPublic: (f, n) => `${f}：${n} 篇全部公开`,
  folderAllPrivate: (f, n) => `${f}：${n} 篇全部私密`,
  folderMixed: (f, n, p) => `${f}：${n} 篇里 ${p} 篇公开`,
  vaultAllPublic: (n) => `全库 ${n} 篇全部公开`,
  vaultAllPrivate: (n) => `全库 ${n} 篇全部私密`,
  vaultMixed: (n, p) => `全库 ${n} 篇里 ${p} 篇公开`,
  scopeAll: '全库',
  confirmPublicTitle: (s) => `把${s}笔记设为公开？`,
  confirmPrivateTitle: (s) => `把${s}笔记设为私密？`,
  confirmPublicBody: (n) => `这会改动 ${n} 篇笔记的 public 字段。`,
  confirmPrivateBody: (n) => `这会改动 ${n} 篇笔记的 public 字段。设为私密后它们会从线上博客下线，需要重新公开并发布才会回来。`,
  confirmPublicCta: '全部公开',
  confirmPrivateCta: '全部私密',
  cancel: '取消',
  batchDone: (scope, pub, n) => `${scope ? scope + '：' : ''}已${pub ? '公开' : '设为私密'} ${n} 篇`,
  toggleFail: (msg) => '设置失败：' + msg,
  vaultMismatch: (a, b) =>
    '博客发布器：管理器配置的库不是当前库，文件树上的公开开关已停用。\n管理器：' + a + '\n当前：' + b,
  ribbonOpen: '打开博客发布器',
  cmdOpen: '打开博客发布器',
  cmdPublish: '立即发布到 GitHub',
  cmdAllPublic: '全部笔记设为公开',
  cmdAllPrivate: '全部笔记设为私密',
  cmdFolderPublic: '当前文件夹全部公开',
  cmdFolderPrivate: '当前文件夹全部私密',
  noActiveNote: '先打开一篇笔记',
  viewTitle: '博客发布器',
  loading: '正在启动发布器…',
  startFail: (m) => '启动失败：' + m,
  publishing: '正在发布…',
  publishFailed: (m) => '发布失败：' + m,
  pushed: '已推送 GitHub，正在构建',
  upToDate: '线上已是最新',
  pluginStartFail: (m) => '博客发布器启动失败：' + m,
  settingsTitle: '博客发布器',
  settingsDataDesc:
    '数据目录与命令行版发布管理器共用（默认 %APPDATA%\\obsidian-blog），所以两边的连接、令牌、发布流水是同一份。',
  settingsOpenName: '打开发布器',
  settingsOpenDesc: '也可以点左侧栏的图标，或用命令面板「打开博客发布器」',
  settingsOpenBtn: '打开',
  settingsBrowserName: '在浏览器中打开',
  settingsBrowserDesc: '用系统浏览器打开同一个界面（适合大屏操作）',
  settingsBrowserBtn: '打开',
}

const EN: Strings = {
  // 文件树一行本来就窄，英文全拼「Public」「Private」比中文宽四成，
  // 会把标题挤掉。缩写到 Pub / Priv 后整组宽度和「公开|私密」基本一致。
  // 完整说法放在悬停提示里，不影响理解。
  pub: 'Pub',
  priv: 'Priv',
  swToPrivate: 'Public — click to make private',
  swToPublic: 'Private — click to make public',
  folderAllPublic: (f, n) => `${f}: all ${n} public`,
  folderAllPrivate: (f, n) => `${f}: all ${n} private`,
  folderMixed: (f, n, p) => `${f}: ${p} of ${n} public`,
  vaultAllPublic: (n) => `All ${n} notes public`,
  vaultAllPrivate: (n) => `All ${n} notes private`,
  vaultMixed: (n, p) => `${p} of ${n} notes public`,
  scopeAll: '',
  confirmPublicTitle: () => 'Make these notes public?',
  confirmPrivateTitle: () => 'Make these notes private?',
  confirmPublicBody: (n) => `This changes the public field of ${n} notes.`,
  confirmPrivateBody: (n) =>
    `This changes the public field of ${n} notes. Private notes are removed from the published site — they only come back after you make them public and publish again.`,
  confirmPublicCta: 'Make all public',
  confirmPrivateCta: 'Make all private',
  cancel: 'Cancel',
  batchDone: (scope, pub, n) => `${scope ? scope + ': ' : ''}${n} note(s) set to ${pub ? 'public' : 'private'}`,
  toggleFail: (msg) => 'Failed: ' + msg,
  vaultMismatch: (a, b) =>
    'Blog Publisher: the vault configured in the manager is not the current vault, so the public toggles in the file explorer are disabled.\nManager: ' + a + '\nCurrent: ' + b,
  ribbonOpen: 'Open blog publisher',
  cmdOpen: 'Open blog publisher',
  cmdPublish: 'Publish to GitHub now',
  cmdAllPublic: 'Make all notes public',
  cmdAllPrivate: 'Make all notes private',
  cmdFolderPublic: 'Make current folder public',
  cmdFolderPrivate: 'Make current folder private',
  noActiveNote: 'Open a note first',
  viewTitle: 'Blog publisher',
  loading: 'Starting publisher…',
  startFail: (m) => 'Failed to start: ' + m,
  publishing: 'Publishing…',
  publishFailed: (m) => 'Publish failed: ' + m,
  pushed: 'Pushed to GitHub, building now',
  upToDate: 'Site is already up to date',
  pluginStartFail: (m) => 'Blog publisher failed to start: ' + m,
  settingsTitle: 'Blog publisher',
  settingsDataDesc:
    'Shares the same data directory as the command-line manager (default %APPDATA%\\obsidian-blog), so connections, tokens and publish history are one and the same.',
  settingsOpenName: 'Open publisher',
  settingsOpenDesc: 'You can also click the ribbon icon or use the "Open blog publisher" command',
  settingsOpenBtn: 'Open',
  settingsBrowserName: 'Open in browser',
  settingsBrowserDesc: 'Opens the same UI in your system browser (handy on a large screen)',
  settingsBrowserBtn: 'Open',
}

const TABLE: Record<Lang, Strings> = { zh: ZH, en: EN }

export function strings(lang: Lang): Strings {
  return TABLE[lang]
}
