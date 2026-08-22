# Phase 4 — CI/CD and infrastructure

**Status:** Not started

## Goal

Update `.github/workflows/ci.yaml` for the pnpm/Vite build, and confirm the
[azure-static-webapp-cicd-kit](https://github.com/bit-and-byte-ideas/azure-static-webapp-cicd-kit)
integration (already partially wired up in `infra/`) works with the new
build output.

## Prerequisites

- Phase 3 complete and accepted.

## Current state (already in place, verify don't rebuild)

- [`infra/main.tf`](../../infra/main.tf) already sources
  `azure-static-webapp-cicd-kit//modules/azure-static-webapp` — provisions
  the Static Web App itself.
- [`infra/variables.tf`](../../infra/variables.tf), [`infra/versions.tf`](../../infra/versions.tf)
  already set up (OpenTofu ≥1.6, `azurerm` backend).
- [`.github/workflows/ci.yaml`](../../.github/workflows/ci.yaml) already
  calls the kit's reusable `opentofu.yml` workflow for the `infra` job, and
  has a `deploy` job using `Azure/static-web-apps-deploy@v1`.

## Steps

- [ ] Update the `commitlint` job: drop `working-directory: ./solthoth`,
      run from repo root, swap `npm ci` → `pnpm install --frozen-lockfile`
      (with pnpm setup via `pnpm/action-setup`).
- [ ] Update/replace the `prettier` job: either keep a formatting-check job
      (if Phase 3 kept Prettier) or replace with `pnpm lint` (ESLint) — match
      whatever Phase 3 landed on.
- [ ] Update the `build` job:
  - [ ] Drop `working-directory: ./solthoth`.
  - [ ] Swap Node setup for pnpm setup (`pnpm/action-setup` + `actions/setup-node`
        with `cache: pnpm`), Node 24+.
  - [ ] `pnpm install --frozen-lockfile`, `pnpm test` (un-comment/enable —
        no more "tests commented out" caveat), `pnpm build`.
  - [ ] Fix artifact upload path: Vite outputs to `dist/` at repo root, not
        `solthoth/dist/solthoth/browser/`. Update
        `actions/upload-artifact` `path:` accordingly.
- [ ] Update the `deploy` job's `download-artifact` path to match, and
      confirm `app_location`/`skip_app_build` inputs to
      `Azure/static-web-apps-deploy@v1` still make sense for a static Vite
      build (no SSR — the old Angular app had Express SSR; confirm the new
      React app is a static SPA build with no server component needed).
- [ ] Confirm `infra` job's `working_directory: infra` input to the reusable
      `opentofu.yml` workflow is still correct — no changes expected here,
      just verify.
- [ ] Confirm required GitHub secrets are already configured in repo
      settings (cannot be verified by Claude — ask user to confirm):
      `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`,
      `TF_BACKEND_RESOURCE_GROUP`, `TF_BACKEND_STORAGE_ACCOUNT`,
      `TF_BACKEND_CONTAINER`, `TF_BACKEND_KEY`,
      `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- [ ] Push branch and open a **draft** PR so Actions run on this branch and
      the pipeline can be validated without touching `main` yet (the
      `infra`/`deploy` jobs are gated to `main` pushes already, so this
      mainly validates `commitlint`/`prettier or lint`/`build`).
- [ ] Fix any CI failures surfaced by the draft PR run.
- [ ] Commit as `ci: migrate workflow to pnpm/vite build and fix artifact paths`.
- [ ] Check this phase's boxes off and commit as
      `docs: mark phase 4 cicd/infra complete`.

## Acceptance criteria

- Draft PR's `commitlint`, format/lint, and `build` jobs pass on GitHub
  Actions using the new stack.
- No workflow step still references `solthoth/` or `npm`.
- User has confirmed all required secrets exist in repo settings (Phase 5
  will actually exercise `infra`/`deploy` on merge to `main`).

## Notes / open questions for user review

- Confirm the new React app is a pure static SPA (no SSR needed) — if SSR
  or an API backend is wanted later, the `deploy` job and Static Web App
  config will need revisiting; out of scope for this migration.
- This phase does not merge to `main` — that's Phase 5, once `infra` and
  `deploy` jobs can be exercised for real.
