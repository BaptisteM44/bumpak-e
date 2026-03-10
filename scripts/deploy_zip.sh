#!/usr/bin/env bash
# Script to create deployment ZIPs for backend and frontend
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
echo "Root: $ROOT_DIR"
cd "$ROOT_DIR"

# Backend ZIP (exclude secrets and node_modules)
echo "Creating backend-deploy.zip..."
zip -r backend-deploy.zip backend -x "backend/node_modules/*" "backend/.git/*" "backend/.env*" "backend/.vscode/*" "*/.DS_Store" >/dev/null
echo "backend-deploy.zip created"

# Frontend build ZIP (use build directory)
if [ -d frontend/build ]; then
  echo "Creating frontend-build.zip..."
  (cd frontend/build && zip -r "$ROOT_DIR/frontend-build.zip" .) >/dev/null
  echo "frontend-build.zip created"
else
  echo "frontend/build not found — run 'npm run build' in frontend first"
fi

echo "Done."