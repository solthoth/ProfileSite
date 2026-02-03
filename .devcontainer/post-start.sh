#!/usr/bin/env bash
set -euo pipefail

export OLLAMA_HOST="${OLLAMA_HOST:-0.0.0.0:11434}"

# If already running, don't start another copy
if pgrep -x ollama >/dev/null 2>&1; then
  echo "ollama already running"
  exit 0
fi

# Start in background with logs
nohup ollama serve > /tmp/ollama.log 2>&1 &
echo "ollama started (logs: /tmp/ollama.log)"