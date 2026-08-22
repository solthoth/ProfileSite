# Phase 2 — Resume content and UI

**Status:** Complete, visually reviewed

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

## Visual review (added after initial "complete")

Screen-recording permission was fixed mid-phase, enabling an actual browser
review via headless Chrome + macOS `screencapture`. That surfaced two real
bugs, fixed in a follow-up commit
(`fix(resume): strip default markers from ol, fix status panel grid overflow`):

- The global list reset (`src/index.css`) only targeted `ul`, not `ol`. The
  experience rail uses `ol` for companies and roles, so the browser's
  default "1. 2. 3." numbering was rendering on top of the custom
  dot/rail styling.
- `.status-panel__row` used a bare `1fr` grid track, which doesn't shrink
  below its content's intrinsic width — a classic CSS Grid gotcha. Fixed
  with `minmax(0, 1fr)` so status values wrap instead of overflowing on
  narrow viewports.

Verified via screenshots: full page in dark mode, full page in light mode,
and a ~500px mobile width (see note below on why 500px rather than a true
~390px phone width). Hero, status panel, skills grid, the full experience
pipeline rail (all 5 companies, badges, sub-bullets), earlier experience,
education, interests, and footer all confirmed rendering correctly in both
color schemes.

**Headless-Chrome caveat**: this sandbox's headless Chrome has a rendering
floor somewhere between 390–500px `--window-size` — below it, layout runs
at a wider viewport than requested while the output PNG is still cropped to
the requested size, making correctly-wrapping text look like an overflow
bug. Confirmed with a trivial static HTML file (no app CSS involved) before
concluding it wasn't a real issue. 500px was used as the narrow-viewport
proxy instead; true sub-500px phone widths (e.g. 375–430px) haven't been
screenshotted, though the CSS at that range is the same flexbox/grid
wrapping already verified at 500px, so risk is low.

## Acceptance criteria

- [x] Site renders the full resume: summary, key skills, all experience
      entries (including "Earlier Experience"), education, interests.
- [x] Every fact in the UI traces back to `carlos-barajas-resume.md` — no
      invented content.
- [x] `pnpm build`, `pnpm lint`, `pnpm test` all pass.
- [x] **Visually reviewed via headless Chrome screenshots this session**
      (dark, light, ~500px mobile) at the user's request, two real bugs
      found and fixed. User has not yet looked at it themselves in a real
      browser — worth a quick `pnpm dev` glance, but not blocking.

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
