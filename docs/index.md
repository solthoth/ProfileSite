# ProfileSite

ProfileSite is Carlos Barajas's resume site, deployed at [solthoth.com](https://solthoth.com). It's a single-page React application that renders the content of [`carlos-barajas-resume.md`](https://github.com/solthoth/ProfileSite/blob/main/carlos-barajas-resume.md) — a long-scroll page covering summary, key skills, work experience, education, and interests.

## At a glance

- **Stack**: React 19 + TypeScript + Vite, package-managed with pnpm.
- **Content**: sourced from a single Markdown file (`carlos-barajas-resume.md`) at the repo root, hand-transcribed into a typed data module for the UI. The same file generates downloadable IC, Manager, and Director resume PDFs.
- **Design**: a clean print-resume system shared by the site and the PDFs. See the [style guide](style-guide.md).
- **Hosting**: Azure Static Web Apps with separate `dev` and `prod` environments, provisioned and managed outside this repo (platform-foundation).

## Where to look next

- [Architecture](architecture.md) — how the app is put together: data model, resume PDFs, components.
- [Style guide](style-guide.md) — color, type, layout, and the PDF template.
- [Development](development.md) — running the project locally, testing, commit conventions.
- [Deployment](deployment.md) — CI/CD pipeline, infrastructure, and how to ship a change to production.

## Origin

This site was rebuilt from an earlier Angular implementation in August 2026, scaffolded from [bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate), matching the tooling conventions used across other Bit and Byte Ideas repositories.
