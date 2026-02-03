#!/usr/bin/env bash
set -euo pipefail

BASE_BRANCH="${BASE_BRANCH:-main}"

if [[ ! -f PR_TITLE.txt || ! -f PR.md ]]; then
  echo "Missing PR_TITLE.txt or PR.md. Run scripts/pr-draft-ai.sh first."
  exit 1
fi

title="$(cat PR_TITLE.txt)"
head_branch="$(git rev-parse --abbrev-ref HEAD)"

gh pr create \
  --base "$BASE_BRANCH" \
  --head "$head_branch" \
  --title "$title" \
  --body-file PR.md \
  --draft