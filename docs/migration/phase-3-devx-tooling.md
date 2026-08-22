# Phase 3 — Developer experience & tooling parity

**Status:** Complete

## Goal

Bring the devcontainer, editor config, git hooks, and repo documentation in
line with the new pnpm/Vite/React stack, so the project is as easy to pick
up as the Angular one was.

## Prerequisites

- Phase 2 complete and accepted.

## Steps

- [x] Update [`.devcontainer/devcontainer.json`](../../.devcontainer/devcontainer.json):
  - [x] Dropped the `angular-cli` feature; pnpm is enabled via
        `postCreateCommand` (`corepack enable pnpm && pnpm install`) rather
        than a dedicated feature, since Corepack ships with the Node base
        image already.
  - [x] Bumped the base image to
        `mcr.microsoft.com/devcontainers/typescript-node:24-bookworm`.
  - [x] `postCreateCommand` now runs from repo root (`pnpm install`), not
        `cd solthoth && npm install`.
  - [x] Dropped the `angular.ng-template` VS Code extension, added
        `dbaeumer.vscode-eslint`. Also dropped the global-prettier
        devcontainer feature — the template's pre-commit hooks call
        `pnpm exec eslint`/`pnpm typecheck`/`pnpm test` directly, no
        standalone `prettier` binary is used anywhere anymore.
- [x] Reviewed [`.devcontainer/post-start.sh`](../../.devcontainer/post-start.sh)
      — it only starts `ollama` for `scripts/pr-draft-ai.sh`, nothing
      Angular/npm-specific. No changes needed.
- [x] Reconciled `.pre-commit-config.yaml` and `commitlint.config.js`
      against a fresh clone of the template: **byte-identical**, confirmed
      via `diff`. No drift since Phase 1.
- [x] `solthoth/.editorconfig`, `.prettierignore`, `.vscode/` — moot, all of
      `solthoth/` was deleted before this phase started (done early during
      Phase 2, at the user's request). Nothing to migrate; no `.vscode/`
      exists at repo root either, matching the template (which doesn't ship
      one).
- [x] Rewrote root [`CLAUDE.md`](../../CLAUDE.md): stack, commands, resume
      data model, component breakdown, design system direction, TS project
      references, testing setup, commit hygiene, and current CI/infra
      state — replacing every Angular-era reference.
- [x] Added a root [`README.md`](../../README.md) (didn't exist before —
      the app moved to repo root in Phase 1 but the template's own README
      wasn't copied over). Project-specific, not the generic template
      boilerplate: prerequisites, getting started, commands table, a note
      on keeping `resume.ts` in sync with the Markdown source, and a
      pointer to `infra/` and the Phase 4 doc for CI/CD status.
- [x] Verified `scripts/pr-create-draft.sh` and `scripts/pr-draft-ai.sh` —
      both are npm/Angular-agnostic (pure `git`/`gh`/`ollama`), no changes
      needed.
- [x] Committed as `chore(devx): align devcontainer with react/pnpm stack`
      and `docs: rewrite CLAUDE.md and add project README for react stack`.
- [x] Checked this phase's boxes off and committed as
      `docs: mark phase 3 devx tooling complete`.

## Acceptance criteria

- [x] `.devcontainer/devcontainer.json` has no Angular-era leftovers and
      installs/runs the pnpm stack from repo root.
- [x] `CLAUDE.md` accurately describes the current (React) architecture —
      no stale Angular references.
- [x] Pre-commit hooks (eslint/typecheck/test + commitlint) run clean —
      verified via `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
      and the pre-commit hooks themselves on both commits this phase.

## Notes

- **Not done, and not in scope**: an actual devcontainer rebuild wasn't
  performed in this session (no container runtime available here) — the
  JSON was hand-verified against the template's conventions and the
  correct pnpm bootstrap command, but a real "build the devcontainer and
  run `pnpm dev` in it" check is still worth doing next time you're in
  VS Code with the Dev Containers extension.
- Prettier question from the original plan is resolved: the template
  doesn't use Prettier at all (ESLint is the sole formatter/linter, via
  `eslint --fix` in the pre-commit hook), and this repo now matches that
  exactly — no lingering Prettier config, hook, or devcontainer feature.
