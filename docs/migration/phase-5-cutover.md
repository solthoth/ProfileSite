# Phase 5 — Cutover and decommission

**Status:** Not started

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
      accepted (commit `chore: remove legacy angular app` on
      `migration/react-template`), at the user's request. Also pruned the
      stale `.claude/worktrees/objective-haslett` worktree the user removed
      by hand.
- [ ] Remove any now-dead root files left over from the Angular era (double
      check nothing in Phase 1–4 still references `solthoth/`).
- [ ] Full clean-room check: fresh `pnpm install`, `pnpm lint`, `pnpm test`,
      `pnpm build` from a clean clone/checkout of the branch.
- [ ] Commit removal as `chore: remove legacy angular app`.
- [ ] Mark PR ready for review (undraft), verify Actions run green again
      post-removal (paths shouldn't change, but confirm).
- [ ] **Stop and get explicit user go-ahead before merging to `main`** —
      merging triggers the `infra` (OpenTofu apply) and `deploy` jobs
      against real Azure resources.
- [ ] Merge PR to `main` (user-approved).
- [ ] Watch the `infra` job — approve the OpenTofu apply in the `production`
      GitHub Environment gate if prompted.
- [ ] Watch the `deploy` job complete successfully.
- [ ] Verify the live site at the Azure Static Web App URL (see
      `infra` output `site_url` in the `infra` job logs, or Azure Portal).
- [ ] Check this phase's boxes off and commit as
      `docs: mark phase 5 cutover complete` (can be the final commit on
      `main` or a quick follow-up PR).
- [ ] Update [`docs/migration/README.md`](README.md) status table to show
      all phases complete.

## Acceptance criteria

- `main` contains only the new React/Vite app plus `carlos-barajas-resume.md`,
  `docs/`, `infra/`, and supporting root config — no Angular remnants.
- Production Azure Static Web App serves the new resume site correctly.
- All commits from Phase 1 through Phase 5 follow Conventional Commits.

## Notes / open questions for user review

- Confirm it's acceptable to delete `solthoth/` outright (vs. e.g. tagging
  the last Angular commit first for easy reference — git history already
  covers this, but a lightweight tag like `angular-final` is cheap insurance
  if desired).
- After merge, consider whether `master` (the stale duplicate default-ish
  branch mentioned in CI/CD config comments) and other now-irrelevant
  long-lived branches (`ci-setup`, `job-history`, `modular-content`,
  `fix/dependabot-security-updates`) should be cleaned up — not done as
  part of this migration unless requested.
