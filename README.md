# ProfileSite

Carlos Barajas's resume, showcased at [solthoth.com](https://solthoth.com). A single-page React app rendering the content of [`carlos-barajas-resume.md`](carlos-barajas-resume.md), the canonical source of truth for the resume itself.

Scaffolded from [bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate); infrastructure and deployment build on [bit-and-byte-ideas/azure-static-webapp-cicd-kit](https://github.com/bit-and-byte-ideas/azure-static-webapp-cicd-kit). See [`CLAUDE.md`](CLAUDE.md) for architecture details and [`docs/migration/`](docs/migration/) for the (in-progress) migration history from a prior Angular version of this site.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) (this repo pins it via the `packageManager` field —
  run `corepack enable pnpm` if you don't have it)

## Getting started

```bash
pnpm install
# install git hooks (commit-msg + pre-commit) — requires the pre-commit tool
# (https://pre-commit.com): `brew install pre-commit` or `pipx install pre-commit`
pre-commit install --hook-type pre-commit --hook-type commit-msg
pnpm dev
```

## Commands

| Command            | What it does                                                     |
| ------------------ | ------------------------------------------------------------------ |
| `pnpm dev`          | Start the Vite dev server with HMR.                                |
| `pnpm build`        | Type-check (`tsc -b`) and build the production bundle to `dist/`. |
| `pnpm preview`      | Serve the built `dist/` locally to verify the production output.  |
| `pnpm lint`         | Run ESLint across the repo.                                        |
| `pnpm typecheck`    | Type-check only (`tsc -b`), no build output.                       |
| `pnpm test`         | Run the Vitest unit suite once.                                    |
| `pnpm test:watch`   | Run Vitest in watch mode.                                          |

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) and are validated by commitlint via a git hook. The same `lint`, `build`, and `test` commands run in CI on every push and pull request.

## Updating the resume

`carlos-barajas-resume.md` is the source of truth for content — never delete it. Resume content is hand-transcribed into [`src/data/resume.ts`](src/data/resume.ts); when the Markdown changes, update the TypeScript data alongside it so the two stay in sync.

## Infrastructure

[`infra/`](infra/) provisions the Azure Static Web App this site deploys to, via OpenTofu and the `azure-static-webapp-cicd-kit` module. See [`docs/migration/phase-4-cicd-infra.md`](docs/migration/phase-4-cicd-infra.md) for the current state of the CI/CD wiring.
