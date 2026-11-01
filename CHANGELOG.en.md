# Changelog

[中文](CHANGELOG.md)

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org).

## [1.0.1] - 2026-11-01

### Changed
- The plugin now ships as a single file: `worker.js` is folded into `main.js` (1.17 MB), so both the community-directory install and the manual install need only `main.js` and `manifest.json`. The same bundle serves two roles, selected by the `BLOG_PUBLISHER_START` environment variable — set it and it runs as the background service, omit it and it runs as the plugin itself.
- Plugin id is now `note-blog-publisher` and the name is **Note Blog Publisher** (`blog-publisher` was already taken in the community directory). The plugin directory name changed accordingly; upgrading from an older build means moving the files to `.obsidian/plugins/note-blog-publisher/`.
- Added `.github/workflows/release.yml`: pushing a tag verifies that the tag matches the `version` in `manifest.json`, bundles the plugin, generates a build provenance attestation, and creates a Release with both assets.
- `manifest.json` and `versions.json` moved to the repository root: the community directory reads only the root manifest on the default branch, so keeping it under `obsidian-plugin/` would get the submission rejected. `release.yml` and the vault-deploy step follow the new path.
- The settings tab and the confirmation modal now use `Setting#setHeading()` instead of writing `<h2>` / `<h3>` elements directly.
- Removed console debug output, keeping only error messages.
- The public toggle and batch buttons in the file explorer now use Obsidian theme variables (`--interactive-accent`, `--shadow-s`), so they follow the active theme instead of hardcoded colors.

### Documentation
- README installation now leads with the community directory and keeps manual install as the fallback; added a "Why it writes outside the vault" section covering the three reasons (cloned repo, cross-vault reuse, token isolation) and stating that beyond that one data directory the plugin only reads public notes from the vault you have open.
- README and CHANGELOG project trees and command descriptions updated for the single-file output.
- README: "Worth knowing" folded into the FAQ and rewritten as questions (what `site-template/` is and whether it can be deleted, why the explorer switches don't respond, why interface language and theme can't be set separately, where the public flag lives)
- README: token section now says "encrypted by the OS" and notes the Linux plain-text fallback
- README: project layout aligned with the real tree (added `.editorconfig` / `.gitattributes` / `CHANGELOG.en.md` / `CONTRIBUTING*.md` / `versions.json` / `main.js` / `worker.js`); the CI entry now reflects the four jobs in `deploy.yml` (`check` / `verify` / `build` / `deploy`) serving both repos — build and deploy in a site repo, typecheck and bundle in the plugin repo

### Security
- The GitHub token is no longer stored in plain text: Windows uses DPAPI (`CryptProtectData`, CurrentUser scope) and macOS uses the Keychain. The ciphertext lives in the `githubTokenEnc` field of `local.json`, decryptable only by your own account on this machine. The old plain-text `githubToken` field is migrated to ciphertext and deleted on first read; if migration fails (system command unavailable) the original is left untouched, so you never lose the token. Linux has no dependency-free equivalent and still falls back to plain text, as documented in the README.
- Fixed a subtler token leak: `git()` and `preflightRemote()` used to pass the token on the command line (`-c http.extraHeader=Authorization: Basic ...`), which shows up in the process list and can be echoed by tool error output. They now inject it through git's official `GIT_CONFIG_COUNT` / `GIT_CONFIG_KEY_0` / `GIT_CONFIG_VALUE_0` environment variables — same effect, nothing in argv.
- The decrypted token is cached in memory so each git call doesn't spawn a subprocess.

## [1.0.0] - 2026-10-30

First public release. Earlier version numbers were internal iteration (`1.0.0` – `1.8.0`); public releases restart at `1.0.0`, so an internal `1.0.0` also appears below. They are not the same release — internal versions are prefixed with "internal".

### Added
- English documentation `README.en.md`; language switch at the top of both READMEs
- `CONTRIBUTING.md`: what to include in a report, how to run locally, three checks before committing, six hard rules
- `.github/ISSUE_TEMPLATE/`: bug report and feature request templates; blank issues disabled
- `obsidian-plugin/versions.json` (minimum app version map required by the Obsidian community registry)
- CI `verify` job: `typecheck` + bundle the plugin + assert the artifacts are non-empty, **independent of blog content**; also triggered on `pull_request`
- Two new e2e sections: `/api/connection/setup` (three negative cases plus one positive, locking in "never leave a half-created connection") and `/api/update-source` (template fully overwritten after a source change; rejected with no active connection)

### Changed
- Version unified at `1.0.0` (`package.json`, `obsidian-plugin/package.json`, `obsidian-plugin/manifest.json`, both lock files)
- README install section now points at the Release download instead of asking people to clone and copy; added a Requirements table (Git / **Node.js** / a GitHub account) and an Updating section
- README authorization section now explains the `repo` and `workflow` scopes in a table, and states that the token is stored **in plain text** in the local `local.json`
- `scanWikilinks` / `repairObsidianArtifacts` / `stripMdLinks` / `parseWikilink` / `extractWikiRefs` / `extractTags` merged from two hand-copied duplicates into a single implementation in `src/lib/wikilink.mjs`

### Fixed
- The render-side `extractWikiRefs` missed references in four notes (`DP/DDP.md`, `图论/圆方树.md`, `图论/最小割.md`, `字符串/回文自动机PAM.md`) — that function has no consumers in `src/` and backlinks are generated by the build-time index, so the live site was unaffected, but the hazard is gone
- e2e section 18 now checks the shared module for the tag rules (it was still looking in `build-content.mjs` after the merge)
- e2e coverage extended with `/api/connection/setup` and `/api/update-source`

## [1.8.0] - 2026-10-29

### Changed
- The open-source repo now ships only the Obsidian plugin form: removed `启动管理器.bat`, renamed `npm run manage` to `npm run dev:manager` and filed it under "Local development", marked debugging-only
- The UI title, in-app strings, and plugin description are all "Blog Publisher" now, instead of the command-line-era "publish manager"
- README quick start covers only installing and enabling the plugin; the browser UI is presented as a debugging entry for core changes

### Removed
- `启动管理器.bat` (double-click launcher for the browser version)

## [1.7.0] - 2026-10-28

### Added
- Two new appearance presets, Mosaic and Neon; six presets total (seven including Default)
- Selecting a preset in the dropdown now shows a preview image of that home layout (base64-inlined, content-hashed to bypass caching)
- Presets are distinguished by layout rather than palette: three-column paper cards / single-column large cards / plain-text index / file tree / block collage / numbered index
- Added `themes/` (preset sources) and `tools/preview/` (preview generation chain) to the repo

### Changed
- Shorter preset names: Ink green / Sakura / Mono / Tree / Mosaic / Neon, in both Chinese and English
- The font-size slider's 100% now equals the old 120% (new `--fs-boost` global baseline)
- One site-wide content width (`--content-w`, default `78rem`); themes no longer each set their own `max-width`
- The appearance panel blurb is down to one line; the tutorial moved into a "Writing guide" dialog

### Fixed
- Text clipped and elements overflowing their cards after zooming in
- The Tree theme's folder names were smaller than article titles
- Unsaved CSS in the appearance editor was overwritten by the server's old value when switching UI language
- Log falsely reported "push failed" after making a note private (two manager processes fighting over the same git working copy)
- Auto-sync results showed no popup, only a line in the log
- Problem IDs like `#2427` were misdetected as tags, breaking title link rendering
- A redundant "switch vault" dropdown in the top bar in plugin form

### Removed
- The Terminal, Letter Duo-column, and Docs presets

## [1.6.0] - 2026-10-26

### Added
- Custom appearance: paste CSS in the manager to change site palette and home layout, saved as `public/theme.css` in the repo
- Built-in presets in the appearance panel, one click to fill in and edit
- The site exposes `data-region` hooks (header / main / footer / folders / list / tags / article) for CSS to target
- Manager result card: publish, update source, and save appearance all get a card that goes from spinner to ✓/✗

### Changed
- The card doesn't auto-dismiss and has no close button — click anywhere on it to dismiss
- Font zoom scales text only, not the layout (overrides Tailwind's `--text-*` variables instead of the root font size)

## [1.5.0] - 2026-10-25

### Added
- Home page drill-down with breadcrumbs, supporting arbitrarily nested folders
- Plugin: UI language and light/dark follow Obsidian

### Changed
- The manager's first screen is a one-line info bar instead of a large card
- File-tree bulk controls changed from a tri-state slider to two buttons, "Publish" and "Make private"

### Fixed
- A note that had been public and then made private was falsely reported as "added"
- The site template baked into the plugin didn't refresh on plugin upgrade, so "Update source" appeared to do nothing

## [1.4.0] - 2026-10-24

### Added
- Obsidian plugin: public state wired into the native file explorer (per note / per folder / whole vault)
- The plugin core runs in a `utilityProcess` child process so synchronous git calls don't block Obsidian's main thread
- Folder rows permanently show the published count

## [internal 1.0.0] - 2026-10-23

### Added
- Publish manager: per-note public switch, bulk actions, search and filter, three change columns, auto-sync and its log
- One-click GitHub repo creation with Pages enabled
- Static site reproducing Obsidian's reading experience (wikilinks / embeds / callouts / math / tags / block references / hover previews / draggable outline)
- Chinese/English switching, light/dark themes, font zoom
