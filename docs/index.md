# ProfileSite

ProfileSite is Carlos Barajas's resume site, deployed at [solthoth.com](https://solthoth.com). It's a single-page React application that renders the content of [`carlos-barajas-resume.md`](https://github.com/solthoth/ProfileSite/blob/main/carlos-barajas-resume.md) — a long-scroll page covering summary, key skills, work experience, education, and interests.

## At a glance

- **Stack**: React 19 + TypeScript + Vite, package-managed with pnpm.
- **Content**: sourced from a single Markdown file (`carlos-barajas-resume.md`) at the repo root, hand-transcribed into a typed data module for the UI to render.
- **Design**: an "infrastructure console" aesthetic — a CLI-style status panel and a CI/CD-pipeline-style experience timeline — grounded in the subject's own domain (platform engineering) rather than a generic portfolio template.
- **Hosting**: Azure Static Web Apps, provisioned with OpenTofu, with separate `dev` and `prod` environments.

## Where to look next

- [Architecture](architecture.md) — how the app is put together: data model, components, styling.
- [Development](development.md) — running the project locally, testing, commit conventions.
- [Deployment](deployment.md) — CI/CD pipeline, infrastructure, and how to ship a change to production.

## Origin

This site was rebuilt from an earlier Angular implementation in August 2026, scaffolded from [bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate) and deployed using [bit-and-byte-ideas/azure-static-webapp-cicd-kit](https://github.com/bit-and-byte-ideas/azure-static-webapp-cicd-kit), matching the tooling conventions used across other Bit and Byte Ideas repositories.
