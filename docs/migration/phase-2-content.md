# Phase 2 — Resume content and UI

**Status:** Not started

## Goal

Rebuild the resume-showcase experience on the new React scaffold, sourcing
content from [`carlos-barajas-resume.md`](../../carlos-barajas-resume.md).
Functional parity with the old Angular app (listing + detail view of roles,
skills, summary) is the baseline; visual design does not need to be
pixel-identical.

## Prerequisites

- Phase 1 complete and accepted.

## Steps

- [ ] Define TypeScript types mirroring the resume's structure (`Experience`,
      `EarlierExperience`, `Skill` categories, etc.) — analogous to the old
      `Job` interface in [`solthoth/src/app/job.service.ts`](../../solthoth/src/app/job.service.ts).
- [ ] Hand-transcribe resume content into a typed data module (e.g.
      `src/data/resume.ts`), kept in sync with `carlos-barajas-resume.md` by
      convention (see Notes below).
- [ ] Add React Router (or template's preferred routing approach) with:
  - [ ] `/` — summary, skills, and experience list.
  - [ ] `/experience/:id` — detail view per role (achievements, details).
- [ ] Build components: summary/header, skills grid, experience card,
      experience list, experience detail.
- [ ] Port the design-token approach from the old
      [`styles.css`](../../solthoth/src/styles.css) (spacing scale, color
      system, typography) into the new app's styling approach (confirm
      whether template uses CSS Modules, plain CSS, or a CSS-in-JS/utility
      approach before deciding where tokens live).
- [ ] Responsive layout check (mobile/desktop) matching old
      `--layout-max-width: 960px` constraint or a deliberate replacement.
- [ ] Set page metadata: title, favicon (reuse `solthoth/src/favicon.ico` or
      replace), meta description for SEO/sharing.
- [ ] Add/adjust Vitest component tests for the new pages (at least smoke
      tests: renders summary, renders experience list, navigates to detail).
- [ ] `pnpm build` + manual local check (`pnpm dev`, click through both
      routes) before committing.
- [ ] Commit content/UI work — likely multiple commits, e.g.
      `feat(resume): add experience data model and summary page`,
      `feat(resume): add experience detail route`.
- [ ] Check this phase's boxes off and commit as
      `docs: mark phase 2 content complete`.

## Acceptance criteria

- Site renders the full resume: summary, key skills, all experience entries
  (including "Earlier Experience"), education, interests.
- Every fact in the UI traces back to `carlos-barajas-resume.md` — no
  invented content.
- `pnpm build`, `pnpm lint`, `pnpm test` all pass.

## Notes / open questions for user review

- Resume content is kept in sync **by hand**, not auto-generated from the
  Markdown file. If this repo grows or the resume changes often, consider a
  follow-up (out of scope here) that parses `carlos-barajas-resume.md` at
  build time instead of hand-duplicating it into TS.
- Confirm whether the old two-page (list + detail) UX should carry over, or
  whether a single long-scroll resume page is preferred for this rebuild.
