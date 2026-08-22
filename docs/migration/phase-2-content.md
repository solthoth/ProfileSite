# Phase 2 — Resume content and UI

**Status:** Complete, pending user visual review

## Goal

Rebuild the resume-showcase experience on the new React scaffold, sourcing
content from [`carlos-barajas-resume.md`](../../carlos-barajas-resume.md).

## Prerequisites

- Phase 1 complete and accepted.

## Steps

- [x] Define TypeScript types mirroring the resume's structure
      (`Achievement`, `RoleStage`, `ExperienceEntry`, `EarlierRole`,
      `SkillCategory`) in [`src/data/resume.ts`](../../src/data/resume.ts).
- [x] Hand-transcribe resume content into `src/data/resume.ts`, with a
      top-of-file comment noting it must be kept in sync with
      `carlos-barajas-resume.md`.
- [x] **Decision (deviates from original checklist): single long-scroll
      page, no router.** The old Angular app's list+detail split existed
      because Angular pages default to that shape, not because the resume
      content needs a separate detail view — every achievement bullet is
      already shown inline in the list. Added no React Router dependency;
      see Notes.
- [x] Build components: [`Hero`](../../src/components/Hero.tsx),
      [`StatusPanel`](../../src/components/StatusPanel.tsx),
      [`Section`](../../src/components/Section.tsx) (shared heading
      wrapper), [`Skills`](../../src/components/Skills.tsx),
      [`Experience`](../../src/components/Experience.tsx) +
      [`ExperienceStage`](../../src/components/ExperienceStage.tsx),
      [`SiteFooter`](../../src/components/SiteFooter.tsx). Summary,
      education, and interests are simple enough to stay inline in
      [`App.tsx`](../../src/App.tsx) rather than their own components.
- [x] Design system (see Notes for full rationale): design tokens in
      [`src/index.css`](../../src/index.css) (light/dark aware), layout and
      component styles in [`src/App.css`](../../src/App.css). Replaces the
      old app's `--layout-max-width: 960px` token system with a narrower
      760px reading measure suited to a long-scroll resume.
- [x] Responsive layout: single breakpoint at 560px covering hero, status
      panel, and the experience rail's left padding.
- [x] Page metadata: title "Carlos Barajas", meta description, Open Graph
      tags, `theme-color`, and a new favicon (ink square, serif "S"
      monogram, copper underline — `public/favicon.svg`) in
      [`index.html`](../../index.html). Old `solthoth/src/favicon.ico` was
      already deleted with the Angular app.
- [x] Vitest smoke tests in [`src/App.test.tsx`](../../src/App.test.tsx):
      renders the name heading and contact info, renders every experience
      company and earlier-experience entry.
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass.
- [x] Commit content/UI work as
      `feat(resume): build resume showcase UI on the react scaffold`.
- [x] Check this phase's boxes off and commit as
      `docs: mark phase 2 content complete`.

## Not done in this phase

- **No browser screenshot / visual QA.** This environment has no
  display/screenshot access (`screencapture` failed with "could not create
  image from display" — headless). Design correctness was reasoned through
  from the CSS and component structure, not visually confirmed. **Run
  `pnpm dev` locally and look at it before treating this phase as truly
  done** — check responsive behavior, the scroll-reveal animation on the
  experience rail, and both light/dark color schemes.

## Acceptance criteria

- [x] Site renders the full resume: summary, key skills, all experience
      entries (including "Earlier Experience"), education, interests.
- [x] Every fact in the UI traces back to `carlos-barajas-resume.md` — no
      invented content.
- [x] `pnpm build`, `pnpm lint`, `pnpm test` all pass.
- [ ] **User has visually reviewed the site locally** — not yet confirmed.

## Notes

- **Design direction**: an "infrastructure console" aesthetic grounded in
  Carlos's actual domain (platform engineering / CI/CD), not a generic
  portfolio template. Signature element is the hero's status panel
  (`curl solthoth.com/status`, mono key/value rows, a live-computed "uptime"
  in years since career start) and the experience section rendered as a
  CI/CD pipeline rail — each employer is a stage group, each role a stage
  with a status badge ("current" vs. "complete") that transitions from a
  queued to a passed look as it scrolls into view. Chose this over generic
  timeline dots because the "stage that passed" framing is literally the
  vocabulary of Carlos's job.
- **Type pairing**: Newsreader (display serif, editorial gravitas) + IBM
  Plex Sans (body) + IBM Plex Mono (status/data/labels only) — loaded via
  Google Fonts `<link>` tags in `index.html`, not self-hosted. IBM Plex was
  chosen specifically because it's a family designed for technical/systems
  products and ships a matched mono counterpart, rather than reaching for
  Inter (what the old site used) again.
- **Palette**: warm ink/paper neutrals (`--ink`, `--paper` in
  `src/index.css`) with a single copper accent and muted status green/amber
  for the CI-style badges — deliberately not the near-black-background +
  neon-green-terminal look that's a very common default for developer
  portfolios.
- **Motion**: `useInView` (`src/hooks/useInView.ts`) drives the pipeline
  reveal via `IntersectionObserver`; guarded for environments without it
  (falls back to already-visible) and respects `prefers-reduced-motion`
  globally via `src/index.css`.
- Resume content is kept in sync **by hand**, not auto-generated from the
  Markdown file — documented at the top of `src/data/resume.ts`. If the
  resume changes often, a follow-up that parses the Markdown at build time
  is a reasonable future enhancement, out of scope here.
