# Phase 5 — Cutover and decommission

**Status:** Complete — dev and prod are both live

## Goal

Remove the old Angular app, merge the migration into `main`, and verify the
new site deploys to Azure successfully.

## Prerequisites

- Phase 4 complete and accepted; draft PR's CI (commitlint/lint/build)
  green.
- User has confirmed required GitHub Actions secrets exist (see Phase 4
  notes).

## Steps

- [x] Delete `solthoth/` (old Angular app) entirely — git history retains it
      if it's ever needed again. **Done early**, right after Phase 1 was
      accepted, at the user's request.
- [x] Remove any now-dead root files left over from the Angular era —
      confirmed clean.
- [x] Full clean-room check: fresh clone, `pnpm install --frozen-lockfile`,
      `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — all pass.
- [x] Marked PR #9 ready for review, verified CI green.
- [x] Stopped and got explicit user go-ahead before merging (via
      AskUserQuestion).
- [x] Merged PR #9 to `main` (merge commit `01d342c`).
- [x] Fixed three real bugs surfaced by the first-ever run of the deploy
      pipeline (unsupported `location` argument, missing `id-token: write`
      permission, and a wrong overall CI/CD shape — restructured to match
      the `bit-and-byte-ideas-website` dev/prod pattern). See "History"
      below.
- [x] Fixed an Azure AD federated-identity subject casing mismatch — see
      "History" below. This required action in Azure, outside the repo;
      done by the user (deleted and recreated the dev credential via
      OpenTofu from their other repo; separately fixed prod's three
      credentials, all of which had `profilesite` lowercased against
      GitHub's actual `ProfileSite` casing).
- [x] **`Deploy Infrastructure (dev)`**: Validate → Plan → Apply all green.
      Created `rg-solthoth-profilesite-dev`'s Static Web App:
      `swa-solthoth-profilesite-dev`.
- [x] **`Deploy Infrastructure (prod)`**: Validate → Plan → Apply all green
      (3 resources: Static Web App, Log Analytics workspace, Application
      Insights — `application_insights = true` for prod). Required a
      manual approval on the `prod` GitHub Environment's required-reviewer
      gate, approved by the user.
- [x] Fetched both environments' deployment tokens via `az staticwebapp
      secrets list` and set them as the `AZURE_STATIC_WEB_APPS_API_TOKEN`
      secret in the `dev`/`prod` GitHub Environments (the user separately
      also updated both, redundant but consistent).
- [x] **`Deploy App (dev)`** succeeded. **Verified live**:
      https://blue-forest-0fc96911e.7.azurestaticapps.net/ returns
      `HTTP 200` and the correct `<title>Carlos Barajas</title>`.
- [x] **`Deploy App (prod)`**: user published release
      [`v0.0.1`](https://github.com/solthoth/ProfileSite/releases/tag/v0.0.1),
      triggering `deploy-app-prod.yaml`. Waited on the `prod` environment's
      required-reviewer gate, approved by the user, then succeeded.
      **Verified live**: https://gray-pebble-08cf5171e.7.azurestaticapps.net/
      returns `HTTP 200`, correct `<title>Carlos Barajas</title>` and the
      expected static SPA shell (meta description, OG tags, font
      preconnects matching `index.html` exactly — resume content itself
      renders client-side, so it won't appear in a raw `curl`, which is
      expected for this SPA).
- [x] Checked this phase's boxes off and committed as
      `docs: mark phase 5 cutover complete`.
- [x] Updated [`docs/migration/README.md`](README.md) status table to show
      all phases complete.

## History: what actually happened (deviated substantially from the plan)

The original single-environment `infra`/`deploy` jobs had *never actually
run* before this phase (first-ever exercise of the pipeline) and surfaced a
chain of real, sequential problems, each fixed in turn:

1. **`tofu validate` failure**: the old `infra/main.tf` passed `location =
   var.location` to the `azure-static-webapp-cicd-kit` module, which
   doesn't accept that input — it derives location from the target
   resource group via a data source. Fixed in commit `12df6a1`.
2. **`startup_failure`**: the reusable OpenTofu workflow requests
   `id-token: write`; this repo's default token permissions don't grant
   it. Fixed by explicitly granting `permissions: { id-token: write,
   contents: read }` on the calling job (commit `8c38b88`).
3. **Wrong overall CI/CD shape**: the user pointed at
   [bit-and-byte-ideas-website](https://github.com/bit-and-byte-ideas/bit-and-byte-ideas-website)'s
   `deploy/infra/` as the proven, consistent pattern used across other
   repos. Rebuilt to match (commit `de572e5`): `deploy/infra/{dev,prod}/`
   (separate OpenTofu roots, `project_name = "solthoth-profilesite"`
   deriving `rg-solthoth-profilesite-{env}` / `swa-solthoth-profilesite-{env}`),
   split `deploy-infra-*.yaml`/`deploy-app-*.yaml` workflows, GitHub
   Actions Variables instead of Secrets for the non-sensitive Azure
   identifiers, and prod app-deploy gated on a published Release rather
   than push to `main`.
4. **`AADSTS7002138` federated-identity subject mismatch**: GitHub's OIDC
   subject claim is `repo:solthoth/ProfileSite:ref:refs/heads/main` (exact
   repo casing). The Azure AD app registrations' federated credentials had
   `repo:solthoth/profilesite:...` (lowercase) — confirmed by running `az
   ad app federated-credential list` locally against both
   `AZURE_CLIENT_ID_DEV` and `AZURE_CLIENT_ID_PROD` app registrations. The
   user fixed both (dev by recreating via OpenTofu from another repo; prod
   by hand) outside this repo/session.

## Acceptance criteria

- [x] `main` contains only the new React/Vite app plus
      `carlos-barajas-resume.md`, `docs/`, `deploy/infra/`, and supporting
      root config — no Angular remnants.
- [x] Dev Azure Static Web App serves the new resume site correctly.
- [x] Production Azure Static Web App serves the new resume site
      correctly — live at
      https://gray-pebble-08cf5171e.7.azurestaticapps.net/ as of release
      `v0.0.1`.
- [x] All commits from Phase 1 through Phase 5 follow Conventional Commits.

## Notes

- **Remaining, optional follow-up work** (not part of this migration's
  scope, listed here so it isn't lost):
  - `solthoth.com` custom domain binding — `deploy/infra/prod/terraform.tfvars`
    has `custom_domain = null`. Binding it needs a CNAME delegation record
    at the domain registrar (DNS access Claude doesn't have); flip it to
    `"solthoth.com"` and add the DNS record once ready.
  - Consider whether `master` and the other stale long-lived branches
    (`ci-setup`, `job-history`, `modular-content`,
    `fix/dependabot-security-updates`) should be cleaned up — not done as
    part of this migration unless requested.
  - The Node.js 20 deprecation warnings on several actions
    (`actions/checkout@v4`, `pnpm/action-setup@v4`, etc.) are benign for
    now but worth revisiting if/when those actions cut new major versions.
