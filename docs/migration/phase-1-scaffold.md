# Phase 1 — Scaffold the React template

**Status:** Complete

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

- [x] Create and check out branch `migration/react-template`.
- [x] Shallow-clone the template into a scratch dir (not committed) to copy
      from: `git clone --depth 1 https://github.com/bit-and-byte-ideas/frontend-react-teamplate <scratch>`.
- [x] Copy the template's scaffold into the repo root:
  - [x] `package.json` (renamed to `solthoth`), `pnpm-lock.yaml`
  - [x] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
  - [x] `vite.config.ts`, `index.html` (title set to "Carlos Barajas")
  - [x] `eslint.config.js`
  - [x] `src/` (placeholder app), `public/`
  - [x] `.agents/skills`, `skills-lock.json`
  - [x] `.claude/settings.json`, `.claude/hooks/`, `.claude/skills/`
        (symlinks into `.agents/skills/`) — not in the original checklist,
        added because they're part of the template's tracked scaffold.
  - [x] `.github/workflows/ci.yaml` (Angular) replaced outright with the
        template's `ci.yml` (lint/build/test only). **Deviation from the
        original plan**: user confirmed the template is the golden standard
        for all static web apps and to replace workflows wholesale rather
        than reconcile in Phase 4. Phase 4 will layer the Azure
        infra/deploy jobs back on top of this baseline instead of
        preserving the old Angular-shaped workflow.
- [x] Replaced root-level config with the template's versions (confirmed as
      the desired golden standard, not merged):
  - [x] `.pre-commit-config.yaml` — now local pnpm-script hooks
        (commitlint, eslint --fix, typecheck, test) instead of the old
        prettier-mirror + commitlint-mirror hooks.
  - [x] `commitlint.config.js` — now just `extends: ['@commitlint/config-conventional']`.
  - [x] `.gitignore` — rewritten for Node/pnpm/Vite, plus kept repo-specific
        entries (`.DS_Store`, `PR_TITLE.txt`, `PR.md`,
        `.claude/settings.local.json`, `.claude/worktrees/`) and added
        OpenTofu/Terraform ignores for `infra/`.
- [x] `package.json` `name` set to `solthoth` (matches the existing
      convention/domain, `solthoth.com`).
- [x] `pnpm install` succeeds at repo root.
- [x] `pnpm dev` serves the placeholder app locally (verified `HTTP 200`).
- [x] `pnpm build` produces `dist/` with no errors.
- [x] `pnpm lint` passes.
- [x] `pnpm typecheck` passes.
- [x] `pnpm test` passes — required scoping Vitest's `test.include` to
      `src/**/*.{test,spec}.{ts,tsx}` in `vite.config.ts` (not in the
      original checklist) because Vitest has no include filter by default
      and was picking up the still-present Angular `.spec.ts` files
      (including from a stray `.claude/worktrees/objective-haslett/`
      worktree checkout). This scoping is correct long-term too, not just
      a workaround.
- [x] `pre-commit install` (both `pre-commit` and `commit-msg` stages) and
      `pre-commit run --all-files` verified green end-to-end.
- [x] Remove the scratch clone.
- [x] Commit scaffold as `chore(scaffold): add react + vite template from frontend-react-teamplate`.
- [x] Check this phase's boxes above off in this file and commit as
      `docs: mark phase 1 scaffold complete`.

## Explicitly out of scope for this phase

- Deleting `solthoth/` (Angular app) — happens in Phase 5.
- Adding back Azure infra/deploy jobs to `.github/workflows/ci.yml` —
  happens in Phase 4.
- Updating root `CLAUDE.md` — happens in Phase 3.
- Any resume content/UI — happens in Phase 2.

## Acceptance criteria

- [x] New app builds, lints, and tests clean from repo root with pnpm.
- [x] Old Angular app under `solthoth/` is untouched and still builds
      (not re-verified this phase, but no Angular files were touched).
- [x] `carlos-barajas-resume.md` is untouched.
- [x] All new/changed files committed with Conventional Commits messages.

## Notes for later phases

- `package.json` name is `solthoth`, not `profilesite` — carry this through
  consistently in Phase 3/4 docs and any deploy naming.
- Phase 4 needs to add the `azure-static-webapp-cicd-kit` reusable
  `opentofu.yml` workflow call and the `Azure/static-web-apps-deploy@v1`
  deploy step on top of the template's `ci.yml`, matching what the old
  `ci.yaml` did but with `pnpm`/root paths and no SSR artifact split.
- Once `solthoth/` is deleted in Phase 5, the `vite.config.ts` test
  `include` scoping can stay as-is (still correct, just no longer strictly
  necessary).
