# Contributing

[中文](CONTRIBUTING.md)

Short version: this project **welcomes issues but does not accept external pull requests**.

Not because contributions aren't welcome — this repo has an unusual shape. It is both a blog generator and the site template that gets pushed into users' repositories. `src/`, `scripts/build-content.mjs`, and `.github/` are bundled into the Obsidian plugin and laid down in every user's blog repo. A single change has to work through four paths: the local manager, the plugin, the CI build, and already-published sites. An external PR is hard to verify without the machine it was written on. So the arrangement is: **you report the problem, I change the code.**

## Reporting a problem

Use the [issue templates](https://github.com/bits4747/obsidian-blog-publisher/issues/new/choose). Bringing these saves half the back-and-forth:

| What to include | Where to get it |
|---|---|
| Version | Bottom right of the manager, or `version` in the root `manifest.json` |
| OS | Windows / macOS / Linux, with the version |
| Which step failed | One of: connect / authorize / pick notes / publish / update source |
| The full manager log | Expand Details after clicking publish; **don't truncate the error text** |
| Whether Git and Node are installed | `git --version`, `node -v` |

If networking is involved, say up front **whether a proxy or accelerator is running**. About 90% of "publish failed" reports here are GitHub being unreachable, and the raw error (`fatal: unable to access ...`) tells you which one it is.

## Running the code

```bash
git clone https://github.com/bits4747/obsidian-blog-publisher
cd obsidian-blog-publisher
npm install
npm install --prefix obsidian-plugin

npm run dev:manager     # local publisher, http://localhost:3457
npm run dev             # site preview, http://localhost:3010
```

After changing plugin code, rebundle it (`main.js` / `worker.js` are build output and aren't committed):

```bash
npm run plugin
```

### Three checks before you commit

```bash
npm run typecheck   # site + plugin, both strict
npm test            # e2e: full regression in a temp data directory, ~8–10 min
npm run build       # confirm the site actually builds
```

`npm test` creates its own temp directory and won't touch your real config. **Don't run `node scripts/e2e-test.mjs` directly** — it writes connection config, and the script will refuse and tell you to use `npm test` instead.

### One constraint you have to know

`src/`, `scripts/build-content.mjs`, and `.github/` exist **in two places**: the source tree, and bundled inside the plugin. If you change them and forget `npm run plugin`, existing users clicking "Update source" still get the old template — the symptom is "I changed the code but nothing changed for users", which is very hard to trace.

## Code layout

```
src/                    the site (Next.js, static export)
  lib/wikilink.mjs      ★ the single implementation of Obsidian syntax parsing (shared by build and render)
  lib/obsidian.ts       note model, visibility, outline
  lib/remark-obsidian.ts  markdown plugin (wikilink / callout / tags)
  components/blog/      UI components
scripts/
  manager-core.mjs      publisher core (HTTP server, 22 endpoints, git operations)
  ui-template.mjs       publisher UI (HTML/CSS/JS template string)
  build-content.mjs     content build: notes → public/data/*.json
  e2e-test.mjs          end-to-end tests
obsidian-plugin/        Obsidian plugin shell (starts the core as a child process)
```

## Hard rules

These aren't style preferences — each one is a bug that already happened:

1. **`src/lib/wikilink.mjs` is the single implementation.** `obsidian.ts` and `build-content.mjs` used to carry hand-copied duplicates kept in sync by a comment saying "must match the other side" — and they drifted, with the render side missing references from 4 notes. Change parsing rules only in this file.

2. **`ui-template.mjs` is a template literal.** Comments inside it can't contain backticks or `${` — either one closes the string early.

3. **Never use `t` / `tf` / `S` / `LANG` / `DICT` as local variable names in the template.** `t` is the global translation function; shadowing it throws `t is not a function`, and that error surfaces in the UI as "publish failed", which is nearly impossible to trace.

4. **The repo's `.gitignore` must never ignore `content/`.** That's the published content directory the CI builds from. Once ignored, a note that goes private and then public again becomes untracked, `git add -A` skips it, and no amount of publishing gets it online — while `git status` still reports clean.

5. **Chinese and English strings must stay aligned.** There are two dictionaries: the client-side `DICT` (inside the template literal in `ui-template.mjs`) and the server-side `SMSG` (plain scope in `manager-core.mjs`). New strings need both; `npm test` includes a key-set alignment check.

6. **Note titles, paths, folder names, repo names, and the site name are "blog content" — never translated.**

## License

By contributing you agree to license your work under [MIT](LICENSE).
