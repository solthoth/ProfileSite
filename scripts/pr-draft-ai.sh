#!/usr/bin/env bash
set -euo pipefail

MODEL="${MODEL:-llama3.1}"
BASE_BRANCH="${BASE_BRANCH:-main}"
MAX_DIFF_CHARS="${MAX_DIFF_CHARS:-180000}"

branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$branch" == "HEAD" ]]; then
  echo "Detached HEAD. Checkout a branch first."
  exit 1
fi

git fetch -q origin "$BASE_BRANCH" || true

diff="$(git diff --no-color "origin/$BASE_BRANCH...HEAD")"
commits="$(git log --oneline "origin/$BASE_BRANCH..HEAD" || true)"
files="$(git diff --name-status "origin/$BASE_BRANCH...HEAD")"

if [[ -z "${diff// }" ]]; then
  echo "No diff found against origin/$BASE_BRANCH...HEAD"
  exit 1
fi

# Trim very large diffs
if (( ${#diff} > MAX_DIFF_CHARS )); then
  diff="${diff:0:MAX_DIFF_CHARS}\n\n[TRUNCATED DIFF: exceeded ${MAX_DIFF_CHARS} chars]"
fi

prompt=$(
cat <<'EOF'
You are writing a GitHub Pull Request for the changes provided.

OUTPUT EXACTLY TWO SECTIONS in this order:

TITLE: <conventional-commit style title>
BODY:
<markdown>

TITLE rules (commitlint / Conventional Commits):
- Format: type(scope): summary  OR  type: summary
- type must be one of: feat, fix, chore, docs, refactor, test, ci, build, perf, style
- scope (optional): choose a short scope based on the area changed. For a frontend app, prefer:
  ui, routing, i18n, forms, auth, api, state, components, styles, deps, config, build, ci, infra
- summary: imperative, present tense, <= 72 chars, no period.
- Do NOT invent ticket numbers or claim tests were run if unknown.

BODY rules:
Use Markdown with headings:

## Summary
- 2–6 bullets describing what changed and why

## Testing
- What you tested locally / in CI
- If you did not run tests, say so explicitly

## Risk / Rollback
- 1–3 bullets for risk
- Clear rollback steps

## Notes for reviewers
- Call out key files/areas
- Mention follow-ups/known limitations

Be accurate. Use specifics from diff/commits. No hallucinations.
EOF
)

input=$(
cat <<EOF
BRANCH: $branch
BASE: $BASE_BRANCH

COMMITS (since base):
$commits

CHANGED FILES:
$files

DIFF:
$diff
EOF
)

result="$(printf "%s\n\n%s" "$prompt" "$input" | ollama run "$MODEL")"

title="$(echo "$result" | sed -n 's/^TITLE: //p' | head -n 1)"
body="$(echo "$result" | awk 'BEGIN{p=0} /^BODY:/{p=1; next} {if(p) print}')"

if [[ -z "${title// }" || -z "${body// }" ]]; then
  echo "Failed to parse model output. Raw output:"
  echo "$result"
  exit 1
fi

echo "$title" > PR_TITLE.txt
echo "$body" > PR.md

echo "✅ Generated PR_TITLE.txt and PR.md"
echo "👉 Review/edit them, then run: scripts/pr-create-draft.sh"