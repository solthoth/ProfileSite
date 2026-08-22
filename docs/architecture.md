# Architecture

## Content and data model

The resume's content lives in two places that must be kept in sync by hand:

1. [`carlos-barajas-resume.md`](https://github.com/solthoth/ProfileSite/blob/main/carlos-barajas-resume.md) at the repo root — the canonical source of truth. This file is never deleted or auto-generated away.
2. `src/data/resume.ts` — a hand-transcribed, typed version of the same content, consumed directly by the React components. Types include `Achievement`, `RoleStage`, `ExperienceEntry`, `EarlierRole`, and `SkillCategory`.

There's no automated parsing between the two — when the resume changes, both files are updated together. Every fact rendered in the UI should trace back to the Markdown file.

## Page structure

The site is a single long-scroll page — there's no client-side router. An earlier Angular version of the site split roles into a list view and a per-role detail view, but that was an artifact of the old framework's routing defaults rather than something the content itself needed: every achievement is already shown inline.

`App.tsx` assembles the page from top to bottom:

| Section | Component(s) | Notes |
|---|---|---|
| Header | `Hero` + `StatusPanel` | Name/title, plus a CLI-styled status panel that computes a live "years in production systems" figure from a fixed career-start date. |
| Summary, Education, Interests | inline in `App.tsx` | Simple enough not to warrant their own components. |
| Skills | `Skills` | Renders grouped chip lists by category. |
| Experience | `Experience` + `ExperienceStage` | Renders as a CI/CD-pipeline-style rail — each employer is a stage group, each role within it a stage with a status badge ("current" vs. "complete") that animates in via an `IntersectionObserver`-based hook (`useInView`) as it scrolls into view. |
| Footer | `SiteFooter` | |

## Design system

The visual direction is deliberately grounded in the subject's own domain — platform engineering and CI/CD — rather than a generic portfolio look:

- **Typography**: Newsreader (display serif) for headings, IBM Plex Sans for body text, IBM Plex Mono reserved for status/data/labels — loaded via Google Fonts.
- **Color**: warm ink/paper neutrals with a single copper accent, plus muted status green/amber for the pipeline-style badges. Deliberately not the near-black-background-with-neon-accent look common to developer portfolios.
- **Layout**: a ~760px reading measure, with a single responsive breakpoint at 560px.

Design tokens (light/dark aware via `prefers-color-scheme` and a `data-theme` override) live in `src/index.css`; layout and component styles live in `src/App.css`.

## TypeScript project structure

The root `tsconfig.json` is a solution file only — it references two real project configs:

- `tsconfig.app.json` covers `src/` (the browser-side app). Bundler-mode module resolution, `verbatimModuleSyntax`, `noUnusedLocals`/`noUnusedParameters`, and `erasableSyntaxOnly` are all enabled — type-only imports must use `import type`, and TypeScript-only syntax that can't be erased at compile time (enums, namespaces, parameter properties) is rejected in favor of plain unions and objects.
- `tsconfig.node.json` covers tooling config (`vite.config.ts`).
