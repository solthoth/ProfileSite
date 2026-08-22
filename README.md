# ProfileSite

Carlos Barajas's resume site, deployed at [solthoth.com](https://solthoth.com) — a single-page React app rendering the content of [`carlos-barajas-resume.md`](carlos-barajas-resume.md), the canonical source of truth for the resume itself.

## Quickstart

```bash
pnpm install
pre-commit install --hook-type pre-commit --hook-type commit-msg
pnpm dev
```

Requires [Node.js](https://nodejs.org/) 24+ and [pnpm](https://pnpm.io/) (pinned via `packageManager` in `package.json` — run `corepack enable pnpm` if it's missing) and [pre-commit](https://pre-commit.com/) (`brew install pre-commit` or `pipx install pre-commit`) for the local git hooks.

## Documentation

Full documentation lives in [`docs/`](docs/) (also published to Backstage TechDocs via [`catalog-info.yaml`](catalog-info.yaml)):

- [Architecture](docs/architecture.md) — content/data model, components, design system.
- [Development](docs/development.md) — commands, testing, commit conventions.
- [Deployment](docs/deployment.md) — CI/CD pipeline, infrastructure, shipping to prod.

See [`CLAUDE.md`](CLAUDE.md) for guidance aimed at Claude Code specifically.
