# Phase 4 — CI/CD and infrastructure

**Status:** Complete (superseded — see note)

> **Superseded during Phase 5.** Everything below describes the
> single-environment `infra/` + combined `ci.yml` infra/deploy jobs this
> phase originally built. Once that pipeline actually ran for the first
> time in Phase 5, the user pointed at a different, proven pattern used
> across other repos and had it rebuilt to match: `deploy/infra/{dev,prod}/`
> and separate `deploy-infra-*.yaml`/`deploy-app-*.yaml` workflows. See
> [phase-5-cutover.md](phase-5-cutover.md) for what actually shipped and
> current status. This doc is kept as-is for history.

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
  the Static Web App itself. Unchanged this phase; verified still correct.
- [`infra/variables.tf`](../../infra/variables.tf), [`infra/versions.tf`](../../infra/versions.tf)
  already set up (OpenTofu ≥1.6, `azurerm` backend). Unchanged.

## What was actually needed (revised from the original checklist)

Phase 1 already replaced `.github/workflows/ci.yaml` wholesale with the
template's `ci.yml` (per the user's explicit instruction that the template
is the golden standard) — so there was no separate `commitlint` job or
`prettier` job left to migrate; the template's CI doesn't run commitlint at
all (it's local-only, via the `commit-msg` pre-commit hook). That collapsed
most of the original step list into one job: **add the `infra` and `deploy`
jobs back on top of the template's `build` job**, fixed for the new output
path.

## Steps

- [x] `build` job (from Phase 1, re-verified): pnpm setup, Node 24, no
      `working-directory: ./solthoth`, `pnpm install --frozen-lockfile`,
      `pnpm lint`, `pnpm build`, `pnpm test` (not commented out). Added an
      `Upload build artifact` step (`actions/upload-artifact@v4`, path
      `dist/` — Vite's default output at repo root, not
      `solthoth/dist/solthoth/browser/`), gated to `main` push only, same
      as the old workflow's pattern.
- [x] Added the `infra` job back: unchanged call into
      `bit-and-byte-ideas/azure-static-webapp-cicd-kit/.github/workflows/opentofu.yml@main`
      with `working_directory: infra`, gated to `github.ref ==
      'refs/heads/main' && github.event_name == 'push'` (matches the old
      `ci.yaml`'s gating exactly, so a PR never touches Azure).
- [x] Added the `deploy` job back: downloads the `dist` artifact,
      `Azure/static-web-apps-deploy@v1` with `app_location: dist/`,
      `skip_app_build: true` — confirmed correct for a static Vite SPA
      build (no SSR; see Notes).
- [x] Confirmed `working_directory: infra` is still correct — unchanged.
- [x] Confirmed with the user that required GitHub secrets exist (as
      placeholders; real values land before Phase 5's merge).
- [x] Pushed the branch and opened **draft PR #9**
      (`migration/react-template` → `main`) after explicit user
      confirmation (pushing/opening a PR is a remote, visible action).
- [x] **Fixed a real CI failure surfaced by the draft PR**: the first run
      failed with `startup_failure` — "The workflow is requesting
      'id-token: write', but is only allowed 'id-token: none'." The
      reusable `opentofu.yml` workflow requests `id-token: write` for
      Azure OIDC login; GitHub requires the *calling* workflow to
      explicitly grant at least that much, and this repo's default token
      permissions are more restrictive. Fixed by adding
      `permissions: { id-token: write, contents: read }` to the `infra`
      job. Diagnosed via `gh api .../check-suites` + scraping the run
      page's `Invalid workflow file` banner (not visible in `gh run view`
      or job logs, since the run never started).
- [x] Second run (32550761057) passed: `build` green (lint/build/test),
      `infra`/`deploy` correctly **skipped** (PR event, not a `main`
      push) — exactly the intended gating.
- [x] Committed as
      `ci: migrate workflow to pnpm/vite build and fix artifact paths` and
      `fix(ci): grant id-token: write to the infra job for Azure OIDC login`.
- [x] Checked this phase's boxes off and committed as
      `docs: mark phase 4 cicd/infra complete`.

## Acceptance criteria

- [x] Draft PR's `build` job (lint/build/test) passes on GitHub Actions
      using the new stack.
- [x] No workflow step references `solthoth/` or `npm`.
- [x] User has confirmed all required secrets exist in repo settings
      (placeholders for now — real values land before Phase 5's merge,
      which is when `infra`/`deploy` will actually run for the first
      time).

## Notes

- **Still unverified**: the `infra` and `deploy` jobs themselves haven't
  run yet — they're gated to `main` push, and this phase deliberately
  doesn't merge to `main`. First real exercise of Azure OIDC login,
  OpenTofu plan/apply, and the static web app deploy happens in Phase 5,
  once real secret values are in place. Don't assume they're bug-free
  just because the YAML is now valid and the `build` job is green.
- Confirmed the new React app is a pure static SPA (no SSR, no server
  component) — `app_location: dist/` + `skip_app_build: true` is correct
  as-is, no Static Web App config changes needed.
- PR: https://github.com/solthoth/ProfileSite/pull/9 (draft).
