# Development

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/), pinned via the `packageManager` field in `package.json` — run `corepack enable pnpm` if it isn't available yet.
- [pre-commit](https://pre-commit.com/) for the local git hooks (`brew install pre-commit` or `pipx install pre-commit`).

## Getting started

```bash
pnpm install
pre-commit install --hook-type pre-commit --hook-type commit-msg
pnpm dev
```

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start the Vite dev server with HMR. |
| `pnpm build` | Type-check (`tsc -b`) and build the production bundle to `dist/`. Type errors fail the build. |
| `pnpm preview` | Serve the built `dist/` locally to verify the production output. |
| `pnpm lint` | Run ESLint across the repo. |
| `pnpm typecheck` | Type-check only (`tsc -b`), no build output. |
| `pnpm test` | Run the Vitest unit suite once. |
| `pnpm test:watch` | Run Vitest in watch mode. |
| `pnpm test:e2e` | Run the Playwright end-to-end suite once (headless, starts its own dev server). |
| `pnpm test:e2e:ui` | Run the Playwright suite in UI mode for interactive debugging. |
| `pnpm resumes` | Regenerate the resume PDFs and `src/data/resume-editions.json` from the Markdown resume (macOS + Microsoft Word + uv). Run after any resume change. |

These scripts are the single source of truth: the local pre-commit hooks and the CI workflow both invoke them directly, so a commit that passes locally can't disagree with what CI reports.

## Testing

Tests run with [Vitest](https://vitest.dev/) in a jsdom environment, using React Testing Library. Configuration lives in `vite.config.ts` under the `test` key; note that `include` is scoped to `src/**/*.{test,spec}.{ts,tsx}` rather than Vitest's default. `src/setupTests.ts` registers `@testing-library/jest-dom` matchers.

`src/App.test.tsx` has smoke tests asserting the header, every experience entry, every skill category, and one download link per resume edition render. `src/data/resume.test.ts` checks that `resume.ts` matches the Markdown bullet for bullet, including audience tags, and that the committed PDFs were generated from the current Markdown.

### End-to-end tests

[Playwright](https://playwright.dev/) drives a real browser under `e2e/`, configured in `playwright.config.ts`. It covers what jsdom can't: the PDFs actually being served and downloaded, the sticky download panel, the absence of horizontal scroll at desktop, tablet, and phone widths, print styles, and axe accessibility scans. `pnpm test:e2e` starts its own dev server (`webServer` in the config) on port 5173; set `E2E_PORT` to use another port when 5173 is taken. Run `pnpm exec playwright install --with-deps chromium` once beforehand to fetch the browser binary. CI runs the same suite in a dedicated `e2e` job.

## Commit conventions

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, etc.) and are validated by [commitlint](https://commitlint.js.org/) via a git hook — `commitlint.config.js` extends `@commitlint/config-conventional`.

The [pre-commit](https://pre-commit.com/) framework wires up local hooks (`.pre-commit-config.yaml`):

- `commit-msg` stage runs commitlint against the commit message.
- `pre-commit` stage auto-fixes staged JS/TS files with `eslint --fix`, then runs `pnpm typecheck` and `pnpm test` against the whole repo (matching what CI checks).

Changes land via a feature branch and pull request — direct pushes to `main` aren't used.
