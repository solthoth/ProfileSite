# Phase 3 — Developer experience & tooling parity

**Status:** Not started

## Goal

Bring the devcontainer, editor config, git hooks, and repo documentation in
line with the new pnpm/Vite/React stack, so the project is as easy to pick
up as the Angular one was.

## Prerequisites

- Phase 2 complete and accepted.

## Steps

- [ ] Update [`.devcontainer/devcontainer.json`](../../.devcontainer/devcontainer.json):
  - [ ] Swap `angular-cli` feature for pnpm (`corepack enable pnpm` via
        `postCreateCommand`, or a dedicated pnpm feature if one exists).
  - [ ] Bump base image / Node feature to Node 24+.
  - [ ] Update `postCreateCommand` (`cd solthoth && npm install` → root
        `pnpm install`, since the app now lives at repo root).
  - [ ] Review VS Code extensions list: drop `angular.ng-template`, consider
        React/Vite-relevant extensions if the template recommends any.
- [ ] Review [`.devcontainer/post-start.sh`](../../.devcontainer/post-start.sh)
      for anything Angular/npm-specific that needs updating.
- [ ] Reconcile `.pre-commit-config.yaml` and `commitlint.config.js` at root
      against the template's versions (should already be close from Phase 1
      — confirm no drift, e.g. prettier hook vs. eslint-only if template
      dropped Prettier).
- [ ] Update or remove `solthoth/.editorconfig`, `.prettierignore`,
      `.vscode/` if the new app doesn't use Prettier or has different
      formatting tooling — move any still-relevant settings to repo root.
- [ ] Rewrite root [`CLAUDE.md`](../../CLAUDE.md) to describe the new stack:
      React 19 + TS + Vite + pnpm, new folder structure, new dev commands,
      new routing/data model — replacing the Angular-specific content.
- [ ] Update [`solthoth/README.md`](../../solthoth/README.md) equivalent —
      root `README.md` should describe the new project (create one if the
      template's README wasn't already copied wholesale in Phase 1, adapted
      to this project rather than the generic template).
- [ ] Verify `scripts/pr-create-draft.sh` and `scripts/pr-draft-ai.sh` still
      work (they likely don't depend on Angular specifically, but confirm no
      hardcoded `solthoth/` paths).
- [ ] Commit as `chore(devx): align devcontainer and tooling with react/pnpm stack`
      and `docs: rewrite CLAUDE.md for react stack`.
- [ ] Check this phase's boxes off and commit as
      `docs: mark phase 3 devx tooling complete`.

## Acceptance criteria

- A fresh devcontainer rebuild successfully installs deps and can run
  `pnpm dev` with no Angular-era leftovers required.
- `CLAUDE.md` accurately describes the current (React) architecture — no
  stale Angular references.
- Pre-commit hooks (prettier/eslint + commitlint) run clean on the new code.

## Notes / open questions for user review

- If the template doesn't use Prettier (ESLint-only), decide whether to keep
  Prettier for Markdown/JSON formatting anyway or standardize fully on the
  template's approach.
