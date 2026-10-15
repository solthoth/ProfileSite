# Architecture

## Content and data model

The resume's content lives in two places, kept in sync:

1. [`carlos-barajas-resume.md`](https://github.com/solthoth/ProfileSite/blob/main/carlos-barajas-resume.md) at the repo root is the canonical source of truth. This file is never deleted or auto-generated. Each Experience bullet carries an audience tag (`<!-- ic mgr dir -->`), and a closing **Resume Variants** section holds each downloadable edition's headline and summary.
2. `src/data/resume.ts` is a hand-transcribed, typed version of the same content, consumed directly by the React components. Types include `Achievement` (with `audiences`), `RoleStage`, `ExperienceEntry`, `EarlierRole`, and `SkillCategory`.

`src/data/resume.test.ts` imports the Markdown and fails if any Experience bullet's text or audience tags in `resume.ts` differ from it. Every fact rendered in the UI should trace back to the Markdown file.

## Resume PDFs

`pnpm resumes` (`scripts/resume/build_resumes.py`) parses the Markdown and renders IC, Manager, and Director editions to `.docx` with python-docx. Microsoft Word converts them to PDF, and they're committed to `public/resumes/`. It also writes `src/data/resume-editions.json`, which drives the site's download links. A unit test compares the hash recorded there with the current Markdown, so stale PDFs fail the build. See [scripts/resume/README.md](https://github.com/solthoth/ProfileSite/blob/main/scripts/resume/README.md).

## Page structure

The site is a single page with no client-side router. It's laid out like the printed resume: a white frame on a sky-blue stage, with a download panel beside the resume sheet.

| Area | Component(s) | Notes |
|---|---|---|
| Download panel | `ResumeDownloads` + `PdfIcon` | One PDF link per edition from `resume-editions.json`. Sticky on desktop. |
| Sheet header | `SheetHeader` | Name, headline, contact list, and the three decorative blocks. |
| Summary, Experience | `Section`, `Experience`, `AchievementList`, `EarlierExperienceList` | The main column. Summary and bullets sit on light bands. |
| Skills, Education, Interests | `Skills`, inline `Section`s in `App.tsx` | The sidebar column. |
| Footer | `SiteFooter` | |

## Design system

The full reference is the [style guide](style-guide.md). In short: a sky/white/paper palette, one blue accent family for structure, teal reserved for the download panel, Montserrat and Lato on the web (Century Gothic and Aptos in the PDFs), light only, and breakpoints at 1200px and 720px. Tokens live in `src/index.css`; layout and component styles live in `src/App.css`.

## TypeScript project structure

The root `tsconfig.json` is a solution file only — it references two real project configs:

- `tsconfig.app.json` covers `src/` (the browser-side app). Bundler-mode module resolution, `verbatimModuleSyntax`, `noUnusedLocals`/`noUnusedParameters`, and `erasableSyntaxOnly` are all enabled — type-only imports must use `import type`, and TypeScript-only syntax that can't be erased at compile time (enums, namespaces, parameter properties) is rejected in favor of plain unions and objects.
- `tsconfig.node.json` covers tooling config (`vite.config.ts`).
