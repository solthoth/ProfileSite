# ProfileSite Migration Plan

**All 5 phases complete as of 2026-08-22.** Both `dev`
(https://blue-forest-0fc96911e.7.azurestaticapps.net/) and `prod`
(https://gray-pebble-08cf5171e.7.azurestaticapps.net/) are live. This doc
and the phase docs are kept as a record of how the migration happened and
why — see each phase doc's "History"/"Notes" sections for what deviated
from the original plan and what's still open as optional follow-up.

This repository was rebuilt from scratch, using
[bit-and-byte-ideas/frontend-react-teamplate](https://github.com/bit-and-byte-ideas/frontend-react-teamplate)
as the starting scaffold and
[bit-and-byte-ideas/azure-static-webapp-cicd-kit](https://github.com/bit-and-byte-ideas/azure-static-webapp-cicd-kit)
for CI/CD and Azure infrastructure provisioning. The site showcases the resume
in [`carlos-barajas-resume.md`](../../carlos-barajas-resume.md), which is the
canonical source of truth for content and **must never be deleted**.

## How to use this plan

- Work happens on branch `migration/react-template`, merged to `main` via PR
  only after Phase 5 is accepted. This keeps `main`'s existing Angular site
  and Azure deployment live/working until the replacement is verified.
- Each phase has its own doc (`phase-N-*.md`) with a checklist. Check boxes
  off as steps complete and commit the doc update alongside the code change
  it describes — the checklist _is_ the progress record.
- **Stop at the end of every phase** for review before starting the next one.
- Every commit in every phase uses
  [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`,
  `fix:`, `docs:`, `chore:`, `ci:`, `build:`, etc.), matching this repo's
  existing `commitlint.config.js`.

## Resuming after a break / running out of session tokens

1. `git status` and `git log --oneline -20` on `migration/react-template` to
   see the last completed commit.
2. Open the phase doc referenced in the most recent commit message and read
   its checklist — checked items are done, the first unchecked item is where
   to pick back up.
3. Re-read the "Acceptance criteria" section of that phase before continuing,
   to confirm nothing partially-done needs finishing first.
4. Continue down the checklist. Don't start the next phase's doc until the
   current phase's acceptance criteria are all met and the user has signed
   off in conversation.

## Phases

| Phase | Doc                                                | Goal                                                                                             |
| ----- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1     | [phase-1-scaffold.md](phase-1-scaffold.md)         | Stand up the React/Vite scaffold from the template at repo root — **complete**                   |
| 2     | [phase-2-content.md](phase-2-content.md)           | Rebuild the resume-showcase UI and content on the new scaffold — **complete**                    |
| 3     | [phase-3-devx-tooling.md](phase-3-devx-tooling.md) | Bring devcontainer, pre-commit, editor, and CLAUDE.md docs in line with the new stack — **complete** |
| 4     | [phase-4-cicd-infra.md](phase-4-cicd-infra.md)     | Update GitHub Actions CI and wire up the Azure Static Web App CI/CD kit for the new build output — **superseded by Phase 5's dev/prod restructure** |
| 5     | [phase-5-cutover.md](phase-5-cutover.md)           | Remove the old Angular app, merge to `main`, verify production deploy — **complete, dev and prod both live** |

## Key decisions

- **New app lives at repo root**, matching the template's own layout (flat
  `package.json`, `src/`, `public/` at the top level) rather than nested
  under `solthoth/` as the Angular app was. The old Angular app was removed
  before Phase 5 even started (git history retains it if ever needed).
- **Package manager: pnpm** (via corepack), **Node 24+**, matching the
  template's requirements — replacing npm/Node 20.
- **Resume content stays hand-synced** from `carlos-barajas-resume.md` into a
  typed TS data file (`src/data/resume.ts`), not auto-parsed from Markdown.
  Automated parsing is a possible future enhancement, not in scope here —
  see Phase 2 notes.
- **Infra ended up restructured, not just adjusted**: Phase 4 built a
  single `infra/` dir with a combined `ci.yml` infra+deploy job, matching
  the original plan. Once that pipeline ran for the first time in Phase 5,
  the user pointed at a different, proven pattern used across other repos
  and had it rebuilt to match — `deploy/infra/{dev,prod}/` with separate
  `deploy-infra-*.yaml`/`deploy-app-*.yaml` workflows, GitHub Actions
  Variables instead of Secrets, and prod deploying only on a published
  GitHub Release. See Phase 5's "History" section for the full story,
  including three real bugs the first pipeline run surfaced along the way.
