# Deployment

ProfileSite deploys to two Azure Static Web App environments, provisioned with [OpenTofu](https://opentofu.org/) via [bit-and-byte-ideas/azure-static-webapp-cicd-kit](https://github.com/bit-and-byte-ideas/azure-static-webapp-cicd-kit). The structure mirrors the pattern used across other Bit and Byte Ideas repositories (see [bit-and-byte-ideas-website](https://github.com/bit-and-byte-ideas/bit-and-byte-ideas-website)'s `deploy/infra/`) rather than a single combined pipeline.

## Environments

| Environment | Trigger | URL |
|---|---|---|
| `dev` | Every push to `main` (plus manual dispatch, for previewing a branch) | `blue-forest-0fc96911e.7.azurestaticapps.net` |
| `prod` | A **published GitHub Release** — not every push to `main` | `gray-pebble-08cf5171e.7.azurestaticapps.net` |

Shipping to production means cutting a release, not just merging to `main`.

A custom domain (`solthoth.com`) isn't bound to prod yet — `custom_domain` in `deploy/infra/prod/terraform.tfvars` is `null`, pending a CNAME delegation record at the domain registrar.

## Infrastructure

`deploy/infra/dev/` and `deploy/infra/prod/` are separate OpenTofu roots, each sourcing the `azure-static-webapp-cicd-kit`'s `azure-static-webapp` module. Resource names are derived from `project_name` + `environment` (set in each directory's `terraform.tfvars`, `project_name = "solthoth-profilesite"`):

- Resource group: `rg-solthoth-profilesite-{dev,prod}` — must already exist in Azure; the module reads it via a data source rather than creating it.
- Static Web App: `swa-solthoth-profilesite-{dev,prod}` — created by this configuration.

## CI/CD workflows

| Workflow | Purpose |
|---|---|
| `ci.yml` | `pnpm lint`, `pnpm build`, `pnpm test` on every push/PR to `main`. Doesn't touch infra or deploy. |
| `deploy-infra-dev.yaml` / `deploy-infra-prod.yaml` | Call the CI/CD kit's reusable OpenTofu workflow per environment (validate → plan → apply), each scoped to its own `deploy/infra/<env>` working directory. |
| `deploy-app-dev.yaml` | Builds and deploys to the `dev` Static Web App. |
| `deploy-app-prod.yaml` | Builds and deploys to the `prod` Static Web App, gated on a published release. |

Azure identifiers (`AZURE_CLIENT_ID_DEV`/`_PROD`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`, `TF_BACKEND_*`) are stored as GitHub Actions **Variables**, not Secrets — none of them are sensitive under OIDC-based authentication. Each environment's `AZURE_STATIC_WEB_APPS_API_TOKEN` deploy token *is* a secret, scoped per GitHub Environment (`dev`/`prod`), sourced from that environment's OpenTofu `api_key` output.

The infra-deploying workflows explicitly grant `permissions: { id-token: write, contents: read }` — the reusable OpenTofu workflow needs `id-token: write` for Azure OIDC login, and this repo's default token permissions don't include it.

Applying infrastructure to `prod` requires manual approval via the `prod` GitHub Environment's required-reviewer gate.

## Shipping a change

1. Open a PR against `main`; `ci.yml` runs lint/build/test.
2. Once merged, `dev` deploys automatically — check `blue-forest-0fc96911e.7.azurestaticapps.net`.
3. When ready for production, publish a GitHub Release off `main`. That triggers `deploy-app-prod.yaml`.
