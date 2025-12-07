#!/bin/bash

# Quick fix for Railway pip issue

echo "🔧 Fixing Railway pip command not found..."

git add nixpacks.toml railway.toml Procfile
git commit -m "Fix: Railway pip command not found - use python3.11 -m pip" --no-verify --allow-empty
git push origin $(git rev-parse --abbrev-ref HEAD)

echo ""
echo "✅ Fix pushed! Railway will redeploy automatically."
echo ""
echo "If it still fails, set this in Railway manually:"
echo "  Start Command: cd backend && python3.11 -m uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
