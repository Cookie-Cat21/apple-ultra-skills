#!/usr/bin/env bash
# Apple Ultra Skills — bootstrap installer
# Detects Cursor / Claude / Agents directories and syncs skills.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/Cookie-Cat21/apple-ultra-skills/main/scripts/install.sh | sh
#   curl -fsSL ... | sh -s -- --dest /path/to/project
#   curl -fsSL ... | sh -s -- --method npx

set -euo pipefail

REPO="${APPLE_ULTRA_REPO:-Cookie-Cat21/apple-ultra-skills}"
BRANCH="${APPLE_ULTRA_BRANCH:-main}"
DEST="${PWD}"
METHOD="auto"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dest) DEST="$2"; shift 2 ;;
    --method) METHOD="$2"; shift 2 ;;
    --repo) REPO="$2"; shift 2 ;;
    --branch) BRANCH="$2"; shift 2 ;;
    -h|--help)
      echo "Usage: install.sh [--dest DIR] [--method auto|npx|sync|git]"
      exit 0
      ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

has_cmd() { command -v "$1" >/dev/null 2>&1; }

install_npx() {
  if ! has_cmd npx; then
    echo "npx not found. Install Node.js or use --method sync."
    return 1
  fi
  echo "→ Installing via skills CLI: npx skills add ${REPO}"
  cd "$DEST"
  npx skills add "$REPO" --yes
}

install_git_sync() {
  local tmp
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  echo "→ Cloning ${REPO} (${BRANCH})"
  git clone --depth 1 --branch "$BRANCH" "https://github.com/${REPO}.git" "$tmp/repo"
  if has_cmd node; then
    echo "→ Syncing skills to agent directories"
    node "$tmp/repo/scripts/sync-platforms.mjs" --target all --dest "$DEST"
  else
    echo "→ Node not found; copying to .cursor/skills/apple-ultra-skills"
    mkdir -p "$DEST/.cursor/skills/apple-ultra-skills"
    cp -R "$tmp/repo"/* "$DEST/.cursor/skills/apple-ultra-skills/"
    rm -rf "$DEST/.cursor/skills/apple-ultra-skills/.git" 2>/dev/null || true
  fi
}

case "$METHOD" in
  npx) install_npx ;;
  sync|git) install_git_sync ;;
  auto)
    if has_cmd npx; then
      install_npx || install_git_sync
    else
      install_git_sync
    fi
    ;;
  *) echo "Unknown method: $METHOD"; exit 1 ;;
esac

echo ""
echo "✓ Apple Ultra Skills installed to $DEST"
echo "  Next: run ultra-teach to create .ultra.md, then apple-hub to route tasks."
