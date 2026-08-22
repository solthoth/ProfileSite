# ProfileSite Migration Plan

This repository is being rebuilt from scratch, using
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
| 5     | [phase-5-cutover.md](phase-5-cutover.md)           | Remove the old Angular app, merge to `main`, verify production deploy — **in progress**, blocked on Azure AD config |

## Key decisions

- **New app lives at repo root**, matching the template's own layout (flat
  `package.json`, `src/`, `public/` at the top level) rather than nested
  under `solthoth/` as the Angular app was. Old app is removed in Phase 5
  once the replacement is verified end-to-end (kept until then as a working
  rollback and so `main`'s CI/deploy keeps functioning during the migration).
- **Package manager: pnpm** (via corepack), **Node 24+**, matching the
  template's requirements — replacing npm/Node 20.
- **Resume content stays hand-synced** from `carlos-barajas-resume.md` into a
  typed TS data file (mirroring the old `JobService` pattern), not
  auto-parsed from Markdown. Automated parsing is a possible future
  enhancement, not in scope here — see Phase 2 notes.
- **Infra module usage is already correct**: [`infra/main.tf`](../../infra/main.tf)
  already sources `azure-static-webapp-cicd-kit`'s
  `modules/azure-static-webapp`. Phase 4 verifies/adjusts it rather than
  rebuilding it, and focuses on aligning the app-build/deploy workflow
  (build output path, Node→pnpm) with the kit's reusable OpenTofu workflow.
