# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

ProfileSite is Carlos Barajas's resume showcase, deployed at solthoth.com. It's a single long-scroll React page (no router) rendering the content of [`carlos-barajas-resume.md`](carlos-barajas-resume.md) — the canonical source of truth for all resume content, never to be deleted. The app itself lives at the repo root (not in a subdirectory).

## Stack

Vite + React 19 + TypeScript, scaffolded from [bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate). Package manager is **pnpm** (managed via Corepack — `corepack enable pnpm` if missing).

## Commands

- `pnpm dev` — start the Vite dev server with HMR.
- `pnpm build` — type-check the project (`tsc -b`) and produce a production bundle in `dist/`. The `tsc -b` step is gating: type errors fail the build.
- `pnpm lint` — run ESLint across the repo using the flat-config in `eslint.config.js`.
- `pnpm typecheck` — `tsc -b` only (the type-check half of `build`).
- `pnpm test` — run the Vitest unit suite once. `pnpm test:watch` for watch mode.
- `pnpm preview` — serve the built `dist/` locally to sanity-check the production output.
- `pnpm test:e2e` — Playwright suite; set `E2E_PORT` if 5173 is taken by another dev server.
- `pnpm resumes` — regenerate the IC/Manager/Director PDFs in `public/resumes/` and `src/data/resume-editions.json` from the Markdown resume. Needs macOS + Microsoft Word + uv, so it's run locally, never in CI.

These scripts are the single source of truth: the local pre-commit hooks and the CI workflow both invoke them, so a green commit and a green CI run can't disagree. Change behavior by editing the script in `package.json`, not by duplicating flags in a hook or workflow.

## Architecture

### Resume content and data model

Resume content is hand-transcribed into [`src/data/resume.ts`](src/data/resume.ts), typed as `Achievement`, `RoleStage`, `ExperienceEntry`, `EarlierRole`, and `SkillCategory`. It must be kept in sync with `carlos-barajas-resume.md` by hand (a unit test checks the Experience bullets and tags). When the resume changes, update both files together **and run `pnpm resumes`**: a unit test fails when the committed PDFs were built from a different version of the Markdown. Every fact rendered in the UI should trace back to the Markdown file; don't invent content.

The Markdown file also feeds separate resume variants (IC, manager, director), so it stays deliberately verbose. Each Experience bullet ends with an audience tag comment (`<!-- ic mgr dir -->`), mirrored as `Achievement.audiences` (`Audience = 'ic' | 'mgr' | 'dir'`) in `resume.ts`. The website renders every bullet; variants keep only the bullets tagged for them. Trim in the variant, not in the source. Each edition's headline and summary live in the Markdown's closing **Resume Variants** section, which only the PDF build reads. See [`scripts/resume/README.md`](scripts/resume/README.md).

### Components

The page mirrors a printed resume: a white frame on a sky-blue stage, holding a download panel and the resume sheet.

- [`App.tsx`](src/App.tsx) — assembles the frame: `ResumeDownloads`, then the sheet (`SheetHeader`, a main column with Summary + `Experience`, and a sidebar with `Skills`, Education, and Interests), then `SiteFooter`. Summary, Education, and Interests stay inline.
- [`ResumeDownloads.tsx`](src/components/ResumeDownloads.tsx) + [`PdfIcon.tsx`](src/components/PdfIcon.tsx) — one PDF download per edition, driven by [`src/data/editions.ts`](src/data/editions.ts) (which reads the generated `resume-editions.json`).
- [`SheetHeader.tsx`](src/components/SheetHeader.tsx) — name, headline, contact list, and the three decorative blocks.
- [`Section.tsx`](src/components/Section.tsx) — shared `h2` wrapper.
- [`Experience.tsx`](src/components/Experience.tsx), [`AchievementList.tsx`](src/components/AchievementList.tsx), [`EarlierExperienceList.tsx`](src/components/EarlierExperienceList.tsx), [`Skills.tsx`](src/components/Skills.tsx), [`SiteFooter.tsx`](src/components/SiteFooter.tsx).

No router, no WebGL/animation layer. The earlier 3D redesign was removed (see `docs/redesign/00-overview.md`, marked superseded); don't reintroduce three.js/GSAP without a new decision.

### Design system

[`docs/style-guide.md`](docs/style-guide.md) is the reference: palette, type, layout, components, and the PDF template. Tokens live in [`src/index.css`](src/index.css), layout and component styles in [`src/App.css`](src/App.css), and the PDF palette at the top of [`scripts/resume/build_resumes.py`](scripts/resume/build_resumes.py). Change a token in both and update the guide.

- Type: Montserrat (display) + Lato (body) via Google Fonts in `index.html`. The PDFs use Word-bundled Century Gothic + Aptos.
- Color: sky/white/paper surfaces, blue for structure, teal only in the download panel, red only on the PDF tag. Reference colors that fail AA as text have darker `-ink` variants.
- Light only (no dark theme). Breakpoints at 1200px and 720px.

### TypeScript layout

Uses TS project references — the root `tsconfig.json` is just a solution file and references two real configs:

- `tsconfig.app.json` — covers `src/` (browser code). Bundler-mode resolution, `verbatimModuleSyntax`, `noUnusedLocals`/`noUnusedParameters`, and `erasableSyntaxOnly` are all on: type-only imports must use `import type`, unused symbols fail the build, and TS-only syntax that can't be erased (enums, namespaces, parameter properties) is rejected. Prefer plain unions/objects over `enum`.
- `tsconfig.node.json` — covers tooling files (`vite.config.ts`).

### Testing

Vitest with the jsdom environment and Testing Library. Config lives in `vite.config.ts` under the `test` key — note `include: ['src/**/*.{test,spec}.{ts,tsx}']` is deliberately scoped to `src/`, not the default. `src/setupTests.ts` registers `@testing-library/jest-dom` matchers. `src/App.test.tsx` has smoke tests for the header, every experience entry and skill category, and one download link per edition. `src/data/resume.test.ts` imports the Markdown resume (`?raw`) and fails if any experience bullet's text or audience tags in `resume.ts` drift from it, if an edition's PDF is missing, or if the PDFs were generated from a different version of the Markdown.

Playwright covers real-browser behavior under `e2e/`, configured in `playwright.config.ts` (`pnpm test:e2e`, `pnpm test:e2e:ui`): PDFs served and downloadable, the sticky download panel, no horizontal scroll at 1440/900/390px, print styles, and axe scans at desktop and phone widths.

## Commit hygiene

- **Conventional Commits** are enforced. `commitlint.config.js` extends `@commitlint/config-conventional`.
- **pre-commit framework** (`.pre-commit-config.yaml`) wires local hooks:
  - `commit-msg` stage → `pnpm exec commitlint --edit` validates the message.
  - `pre-commit` stage → `eslint --fix` on staged JS/TS files (auto-fixing), then `pnpm typecheck` and `pnpm test` (whole-repo, matching CI).
- New contributors must run `pre-commit install --hook-type pre-commit --hook-type commit-msg` once after cloning.
- **Do not bypass with `--no-verify`.** A Claude PreToolUse hook (`.claude/hooks/block-no-verify.sh`, wired in `.claude/settings.json`) rejects `git commit --no-verify` and `-n`. Fix the underlying hook failure instead.

## CI/CD and infrastructure

The Azure Static Web Apps that host the site are provisioned and managed
**outside this repo**, by the platform-foundation OpenTofu platform — including
the `solthoth.com` DNS zone and custom-domain binding. This repo contains no
OpenTofu code and no infra workflows (`deploy/infra/` and `deploy-infra-*.yaml`
were removed when that migration happened); don't recreate them. It only
builds the app and pushes the result to the existing Static Web Apps:

- **`.github/workflows/ci.yml`** — `pnpm lint`, `pnpm build`, `pnpm test` on
  push/PR to `main`. Build-only; doesn't deploy.
- **`deploy-app-dev.yaml`** — builds and deploys to the `dev` Static Web App
  on every push to `main` (plus `workflow_dispatch` for previewing a branch).
- **`deploy-app-prod.yaml`** — builds and deploys to `prod` **only when a
  GitHub Release is published** — not on every push to `main`. Cut a release
  to ship to production.
- Each environment's `AZURE_STATIC_WEB_APPS_API_TOKEN` is a GitHub
  Environment secret (`dev`/`prod` environments) and is the **only** Azure
  credential GitHub needs. Its value is the deployment token of the matching
  Static Web App, obtained from platform-foundation. No Azure OIDC, backend,
  or `vars.*` identifiers are used by any workflow here.
- Resource names, hostnames, and the custom domain are owned by
  platform-foundation, not this repo — check there rather than assuming them.

