# Phase 1 — Scaffold the React template

**Status:** Not started

## Goal

Stand up a working React 19 + TypeScript + Vite app at the repo root,
scaffolded from
[bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate),
running side by side with the existing Angular app (`solthoth/`) until it's
verified. This phase produces a buildable, lintable, testable placeholder
app — not the resume content yet (that's Phase 2).

## Prerequisites

- Branch `migration/react-template` created off `main`.
- Node 24+ and pnpm available locally (or via the devcontainer once updated
  in Phase 3 — for Phase 1 it's fine to install pnpm ad hoc with
  `corepack enable pnpm`).

## Steps

- [ ] Create and check out branch `migration/react-template`.
- [ ] Shallow-clone the template into a scratch dir (not committed) to copy
      from: `git clone --depth 1 https://github.com/bit-and-byte-ideas/frontend-react-teamplate <scratch>`.
- [ ] Copy the template's scaffold into the repo root, adapting project name
      references (`solthoth`/`ProfileSite`) as needed:
  - [ ] `package.json`, `pnpm-lock.yaml`
  - [ ] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
  - [ ] `vite.config.ts`, `index.html`
  - [ ] `eslint.config.js`
  - [ ] `src/` (placeholder app), `public/`
  - [ ] `.agents/skills`, `skills-lock.json` (if present in template)
  - [ ] `.github/workflows/*` that are generic CI (lint/build/test) —
        reconcile with existing `.github/workflows/ci.yaml` in Phase 4, not
        here; for now just note what the template ships.
- [ ] Reconcile root-level config that already exists in this repo against
      the template's version (don't blindly overwrite — diff first):
  - [ ] `.pre-commit-config.yaml`
  - [ ] `commitlint.config.js`
  - [ ] `.gitignore`
- [ ] Update `package.json` `name` field to match the repo (`profilesite`,
      or confirm with user if a different package name is preferred).
- [ ] `pnpm install` succeeds at repo root.
- [ ] `pnpm dev` serves the placeholder app locally.
- [ ] `pnpm build` produces `dist/` with no errors.
- [ ] `pnpm lint` passes.
- [ ] `pnpm test` passes (template's placeholder Vitest suite).
- [ ] Remove the scratch clone.
- [ ] Commit scaffold as `chore(scaffold): add react + vite template from frontend-react-teamplate`.
- [ ] Check this phase's boxes above off in this file and commit as
      `docs: mark phase 1 scaffold complete`.

## Explicitly out of scope for this phase

- Deleting `solthoth/` (Angular app) — happens in Phase 5.
- Updating `.github/workflows/ci.yaml` — happens in Phase 4.
- Updating root `CLAUDE.md` — happens in Phase 3.
- Any resume content/UI — happens in Phase 2.

## Acceptance criteria

- New app builds, lints, and tests clean from repo root with pnpm.
- Old Angular app under `solthoth/` is untouched and still builds.
- `carlos-barajas-resume.md` is untouched.
- All new/changed files committed with Conventional Commits messages.

## Notes / open questions for user review

- Confirm desired `package.json` name if not `profilesite`.
- Confirm whether template's `.github/workflows` (if any beyond lint/build)
  should be adopted as-is or merged with the existing kit-based deploy flow
  in Phase 4.
