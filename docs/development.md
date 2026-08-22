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

These scripts are the single source of truth: the local pre-commit hooks and the CI workflow both invoke them directly, so a commit that passes locally can't disagree with what CI reports.

## Testing

Tests run with [Vitest](https://vitest.dev/) in a jsdom environment, using React Testing Library. Configuration lives in `vite.config.ts` under the `test` key; note that `include` is scoped to `src/**/*.{test,spec}.{ts,tsx}` rather than Vitest's default. `src/setupTests.ts` registers `@testing-library/jest-dom` matchers.

`src/App.test.tsx` has smoke tests asserting the hero renders and that every experience/earlier-experience entry from `resume.ts` appears on the page.

### End-to-end tests

[Playwright](https://playwright.dev/) drives a real browser under `e2e/`, configured in `playwright.config.ts`. This exists because headless Chrome's one-shot screenshot capture doesn't reliably tick `requestAnimationFrame`-driven work — GSAP tweens, React Three Fiber's `useFrame` loop, `IntersectionObserver` reveals — so anything scroll- or animation-driven needs a real browser's event loop to verify correctly. `pnpm test:e2e` starts its own dev server (`webServer` in the config) and runs against it; run `pnpm exec playwright install --with-deps chromium` once beforehand to fetch the browser binary. CI runs the same suite in a dedicated `e2e` job.

## Commit conventions

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, etc.) and are validated by [commitlint](https://commitlint.js.org/) via a git hook — `commitlint.config.js` extends `@commitlint/config-conventional`.

The [pre-commit](https://pre-commit.com/) framework wires up local hooks (`.pre-commit-config.yaml`):

- `commit-msg` stage runs commitlint against the commit message.
- `pre-commit` stage auto-fixes staged JS/TS files with `eslint --fix`, then runs `pnpm typecheck` and `pnpm test` against the whole repo (matching what CI checks).

Changes land via a feature branch and pull request — direct pushes to `main` aren't used.
