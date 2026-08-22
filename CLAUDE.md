# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

ProfileSite is Carlos Barajas's resume showcase, deployed at solthoth.com. It's a single long-scroll React page (no router) rendering the content of [`carlos-barajas-resume.md`](carlos-barajas-resume.md) — the canonical source of truth for all resume content, never to be deleted. The app itself lives at the repo root (not in a subdirectory).

This repo was migrated from an Angular app to this React/Vite stack; see [`docs/migration/`](docs/migration/) for the phased migration plan and its status if anything looks unfinished or inconsistent.

## Stack

Vite + React 19 + TypeScript, scaffolded from [bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate). Package manager is **pnpm** (managed via Corepack — `corepack enable pnpm` if missing).

## Commands

- `pnpm dev` — start the Vite dev server with HMR.
- `pnpm build` — type-check the project (`tsc -b`) and produce a production bundle in `dist/`. The `tsc -b` step is gating: type errors fail the build.
- `pnpm lint` — run ESLint across the repo using the flat-config in `eslint.config.js`.
- `pnpm typecheck` — `tsc -b` only (the type-check half of `build`).
- `pnpm test` — run the Vitest unit suite once. `pnpm test:watch` for watch mode.
- `pnpm preview` — serve the built `dist/` locally to sanity-check the production output.

These scripts are the single source of truth: the local pre-commit hooks and the CI workflow both invoke them, so a green commit and a green CI run can't disagree. Change behavior by editing the script in `package.json`, not by duplicating flags in a hook or workflow.

## Architecture

### Resume content and data model

Resume content is hand-transcribed into [`src/data/resume.ts`](src/data/resume.ts), typed as `Achievement`, `RoleStage`, `ExperienceEntry`, `EarlierRole`, and `SkillCategory`. It must be kept in sync with `carlos-barajas-resume.md` by hand — there's no automated parsing. When the resume changes, update both files together. Every fact rendered in the UI should trace back to the Markdown file; don't invent content.

### Components

- [`App.tsx`](src/App.tsx) — assembles the page: `Hero`, then `Section`-wrapped Summary/Skills/Experience/Education/Interests, then `SiteFooter`. Summary, Education, and Interests are simple enough to stay inline rather than their own components.
- [`Hero.tsx`](src/components/Hero.tsx) + [`StatusPanel.tsx`](src/components/StatusPanel.tsx) — the name/title header and the signature CLI-style status panel (computes a live "years in production systems" figure from `careerStart` in `resume.ts`).
- [`Section.tsx`](src/components/Section.tsx) — shared eyebrow + heading wrapper used by most sections.
- [`Skills.tsx`](src/components/Skills.tsx) — renders `skills` as grouped chip lists.
- [`Experience.tsx`](src/components/Experience.tsx) + [`ExperienceStage.tsx`](src/components/ExperienceStage.tsx) — the experience section renders as a CI/CD-pipeline-style rail: each employer is a stage group (`<ol className="rail">`), each role within it a stage (`<ol className="rail__roles">`) with a status badge ("current" vs. "complete") that animates in via `useInView` ([`src/hooks/useInView.ts`](src/hooks/useInView.ts), `IntersectionObserver`-based, guarded for environments without it).
- [`SiteFooter.tsx`](src/components/SiteFooter.tsx).

No router. The old Angular app's list+detail split was an artifact of Angular's routing defaults, not something the resume content needs — every achievement is already shown inline.

### Design system

Tokens (light/dark aware, `prefers-color-scheme` + `data-theme` override) live in [`src/index.css`](src/index.css); layout and component styles in [`src/App.css`](src/App.css). Direction is an "infrastructure console" aesthetic grounded in the subject's actual domain (platform engineering / CI/CD) rather than a generic portfolio look:

- Type: Newsreader (display serif) + IBM Plex Sans (body) + IBM Plex Mono (status/data/labels only), loaded via Google Fonts `<link>` tags in `index.html`.
- Color: warm ink/paper neutrals with one copper accent and muted status green/amber for the CI-style badges — not the near-black + neon-terminal look.
- Reading measure ~760px (`--measure`), single responsive breakpoint at 560px.

When editing CSS, watch for selector-specificity collisions between type-based and class-based selectors (e.g. `.section` vs `h2`) — see the `frontend-design` skill (`.claude/skills/frontend-design/`) for the fuller design process this app was built with.

### TypeScript layout

Uses TS project references — the root `tsconfig.json` is just a solution file and references two real configs:

- `tsconfig.app.json` — covers `src/` (browser code). Bundler-mode resolution, `verbatimModuleSyntax`, `noUnusedLocals`/`noUnusedParameters`, and `erasableSyntaxOnly` are all on: type-only imports must use `import type`, unused symbols fail the build, and TS-only syntax that can't be erased (enums, namespaces, parameter properties) is rejected. Prefer plain unions/objects over `enum`.
- `tsconfig.node.json` — covers tooling files (`vite.config.ts`).

### Testing

Vitest with the jsdom environment and Testing Library. Config lives in `vite.config.ts` under the `test` key — note `include: ['src/**/*.{test,spec}.{ts,tsx}']` is deliberately scoped to `src/`, not the default. `src/setupTests.ts` registers `@testing-library/jest-dom` matchers. `src/App.test.tsx` has smoke tests asserting the hero renders and every experience/earlier-experience entry appears.

## Commit hygiene

- **Conventional Commits** are enforced. `commitlint.config.js` extends `@commitlint/config-conventional`.
- **pre-commit framework** (`.pre-commit-config.yaml`) wires local hooks:
  - `commit-msg` stage → `pnpm exec commitlint --edit` validates the message.
  - `pre-commit` stage → `eslint --fix` on staged JS/TS files (auto-fixing), then `pnpm typecheck` and `pnpm test` (whole-repo, matching CI).
- New contributors must run `pre-commit install --hook-type pre-commit --hook-type commit-msg` once after cloning.
- **Do not bypass with `--no-verify`.** A Claude PreToolUse hook (`.claude/hooks/block-no-verify.sh`, wired in `.claude/settings.json`) rejects `git commit --no-verify` and `-n`. Fix the underlying hook failure instead.

## CI/CD and infrastructure

Mirrors the pattern used across other bit-and-byte-ideas-adjacent repos (see
[bit-and-byte-ideas-website](https://github.com/bit-and-byte-ideas/bit-and-byte-ideas-website)'s
`deploy/infra/` and workflow layout) rather than a single combined pipeline:

- **`.github/workflows/ci.yml`** — `pnpm lint`, `pnpm build`, `pnpm test` on
  push/PR to `main`. Build-only; doesn't touch infra or deploy.
- **`deploy/infra/dev/` and `deploy/infra/prod/`** — separate OpenTofu roots,
  each sourcing the `azure-static-webapp-cicd-kit`'s `azure-static-webapp`
  module. `resource_group_name`/`static_webapp_name` are derived from
  `project_name` + `environment` (`terraform.tfvars`, `project_name =
  "solthoth-profilesite"`) as `rg-solthoth-profilesite-{env}` /
  `swa-solthoth-profilesite-{env}`. The target resource group must already
  exist in Azure — the module reads it via a data source, it doesn't create
  one.
- **`deploy-infra-dev.yaml` / `deploy-infra-prod.yaml`** — call the kit's
  reusable `opentofu.yml` workflow per environment, each with its own
  `working_directory` and Azure/backend identifiers pulled from GitHub
  Actions **Variables** (`vars.*`, not secrets — none of these values are
  sensitive under OIDC auth): `AZURE_CLIENT_ID_DEV`/`_PROD`,
  `AZURE_TENANT_ID` (shared), `AZURE_SUBSCRIPTION_ID` (shared, no per-env
  suffix in this repo), `TF_BACKEND_RESOURCE_GROUP`/`_STORAGE_ACCOUNT`
  (shared), `TF_BACKEND_CONTAINER_DEV`/`_PROD`, `TF_BACKEND_KEY_DEV`/`_PROD`.
  Both grant `permissions: { id-token: write, contents: read }` explicitly —
  required for the reusable workflow's Azure OIDC login; this repo's default
  token permissions are more restrictive than that.
- **`deploy-app-dev.yaml`** — builds and deploys to the `dev` Static Web App
  on every push to `main` (plus `workflow_dispatch` for previewing a branch).
- **`deploy-app-prod.yaml`** — builds and deploys to `prod` **only when a
  GitHub Release is published** — not on every push to `main`. Cut a release
  to ship to production.
- Each environment's `AZURE_STATIC_WEB_APPS_API_TOKEN` is a GitHub
  Environment secret (`dev`/`prod` environments), sourced from that
  environment's `deploy/infra/<env>` OpenTofu `api_key` output after the
  first successful apply — it doesn't exist until then.
- A custom domain (`solthoth.com`) isn't bound yet — `custom_domain` in
  `deploy/infra/prod/terraform.tfvars` is `null` pending a CNAME delegation
  record at the registrar; see `docs/migration/phase-5-cutover.md`.

