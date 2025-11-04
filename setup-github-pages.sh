#!/bin/bash

echo "🔧 Setting up GitHub Pages deployment..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the hivepro-docs directory?"
    exit 1
fi

# Install dependencies and generate package-lock.json
echo "📦 Installing dependencies..."
npm install

if [ ! -f "package-lock.json" ]; then
    echo "❌ Error: package-lock.json was not generated"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Test build
echo "🏗️  Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors above."
    exit 1
fi

echo "✓ Build successful"
echo ""

# Git status
echo "📋 Files to commit:"
echo ""
git status --short

echo ""
echo "✅ Setup complete! Now run these commands:"
echo ""
echo "  git add package-lock.json .gitignore .github/"
echo "  git add docs-src/ build.js package.json"
echo "  git commit -m 'Setup GitHub Pages CI/CD with markdown support'"
echo "  git push origin main"
echo ""
echo "Then check the Actions tab on GitHub to see the deployment!"
echo ""
