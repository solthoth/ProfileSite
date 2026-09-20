# Deployment

ProfileSite deploys to two Azure Static Web App environments, `dev` and `prod`. The Static Web Apps themselves — along with the `solthoth.com` DNS zone and custom-domain binding — are provisioned and managed **outside this repository**, by the platform-foundation OpenTofu platform. This repo contains no infrastructure code; it only builds the app and pushes the result to the existing Static Web Apps.

## Environments

| Environment | Trigger |
|---|---|
| `dev` | Every push to `main` (plus manual dispatch, for previewing a branch) |
| `prod` | A **published GitHub Release** — not every push to `main` |

Shipping to production means cutting a release, not just merging to `main`.

Hostnames, resource names, and the custom domain for each environment are owned by platform-foundation. Look there rather than in this repo.

## CI/CD workflows

| Workflow | Purpose |
|---|---|
| `ci.yml` | `pnpm lint`, `pnpm build`, `pnpm test` on every push/PR to `main`. Doesn't deploy. |
| `deploy-app-dev.yaml` | Builds and deploys to the `dev` Static Web App. |
| `deploy-app-prod.yaml` | Builds and deploys to the `prod` Static Web App, gated on a published release. |

Each deploy workflow runs in its matching GitHub Environment (`dev` / `prod`) and authenticates with a single secret, `AZURE_STATIC_WEB_APPS_API_TOKEN` — the deployment token of that environment's Static Web App, obtained from platform-foundation. No other Azure credentials, OIDC settings, or workflow variables are needed here.

If a Static Web App is ever re-provisioned, its deployment token changes; update the matching environment secret in this repo's GitHub settings.

## Shipping a change

1. Open a PR against `main`; `ci.yml` runs lint/build/test.
2. Once merged, `dev` deploys automatically — check the `dev` site.
3. When ready for production, publish a GitHub Release off `main`. That triggers `deploy-app-prod.yaml`.
