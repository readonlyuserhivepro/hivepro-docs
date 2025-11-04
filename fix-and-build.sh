#!/bin/bash

# Quick fix script for path issues
echo "🔧 Fixing documentation build..."

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Rebuild documentation
echo "🏗️  Building documentation..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "🚀 To preview your docs:"
    echo "   npm run dev"
    echo ""
    echo "   Then open: http://localhost:8080"
    echo ""
    echo "📝 Your new page should now be accessible at:"
    echo "   http://localhost:8080/docs/section/autovm.html"
    echo ""
else
    echo "❌ Build failed. Check the errors above."
    exit 1
fi
