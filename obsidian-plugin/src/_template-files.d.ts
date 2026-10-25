/** 由 esbuild.config.mjs 在构建前生成。 */
export type TemplateFile = { t: 'utf8'; v: string } | { t: 'base64'; v: string }
export declare const TEMPLATE_FILES: Record<string, TemplateFile>
/** 模板内容指纹（sha256 前 16 位）。插件升级后据此判断是否需要重铺 site-template。 */
export declare const TEMPLATE_REV: string