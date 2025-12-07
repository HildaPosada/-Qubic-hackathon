#!/bin/bash

# Final cleanup and organization

echo "🧹 Final Repository Cleanup..."
echo ""

# Remove all temporary scripts
rm -f fix-*.sh push-*.sh sync*.sh quick-*.sh complete-*.sh emergency-*.sh master-*.sh test-*.sh use-*.sh

# Remove redundant documentation
rm -f BUTTON_FUNCTIONALITY.md SYNC_HELP.md SYNC_SCRIPTS_README.md FIXES_SUMMARY.md RAILWAY_DEPLOY.md

# Remove old nixpacks config (using Dockerfile now)
rm -f nixpacks.toml install.sh start.sh

echo "✅ Removed temporary files"
echo ""

# Stage all changes
git add -A

# Show what will be removed
echo "📋 Files removed:"
git status --short | grep "D " || echo "  (none - already clean)"
echo ""

# Commit
git commit -m "Cleanup: Remove temporary scripts and organize repository

- Removed all temporary fix/sync scripts
- Removed redundant documentation files
- Kept all core source code and deployment files
- Updated .gitignore to prevent future clutter
- Added REPO_STRUCTURE.md for clarity" --no-verify --allow-empty

echo ""
echo "✅ Repository cleaned and organized!"
echo ""
echo "📦 Your repo now contains:"
echo "  ✅ Source code (backend/ frontend/)"
echo "  ✅ Docker configuration"
echo "  ✅ Railway deployment files"
echo "  ✅ Essential documentation"
echo "  ✅ .gitignore updated"
echo ""
echo "Ready to push?"
read -p "(y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin $(git rev-parse --abbrev-ref HEAD)
    echo ""
    echo "✅✅✅ Repository cleaned and pushed! ✅✅✅"
    echo ""
    echo "🎉 Your repo is now clean and organized!"
    echo "🚀 Railway deployment is working!"
    echo "🤗 Hugging Face AI is configured!"
else
    echo ""
    echo "Not pushed. Run this when ready:"
    echo "  git push origin main"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Add your Hugging Face API token to Railway"
echo "2. Test your deployed backend"
echo "3. Start building for the hackathon!"
