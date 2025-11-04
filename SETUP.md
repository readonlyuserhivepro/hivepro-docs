# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd ~/hivepro-docs
npm install
```

## Step 2: Build Locally (Test)

```bash
npm run build
npm run dev
```

Open http://localhost:8080 in your browser to see your docs!

## Step 3: Push to GitHub

```bash
# Initialize git (if not done already)
git init
git add .
git commit -m "Initial commit: HivePro docs with CI/CD"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/hivepro-docs.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/hivepro-docs`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select:
   - ✅ **GitHub Actions** (NOT a branch!)
5. Done! No need to click Save

## Step 5: Wait for Deployment

1. Go to **Actions** tab in your repository
2. You'll see the workflow running
3. Wait ~2 minutes for completion
4. Your site will be live at: `https://YOUR_USERNAME.github.io/hivepro-docs/`

## 🎉 Success!

Your documentation is now live and will auto-deploy whenever you push to main!

## ✍️ Writing New Docs

### Method 1: Create markdown file directly

```bash
# Create a new guide
touch docs-src/guides/my-new-guide.md
```

Edit the file:

```markdown
---
title: My New Guide
order: 1
---

# My New Guide

Content here...
```

### Method 2: Use any editor

Just create `.md` files in `docs-src/` folders and write in Markdown!

### Commit and Push

```bash
git add docs-src/
git commit -m "Add new guide"
git push origin main
```

GitHub Actions will automatically:
1. Convert your markdown to HTML
2. Add it to the sidebar
3. Deploy to GitHub Pages

## 📁 Folder Structure

```
docs-src/
├── getting-started/     → "Getting Started" section in sidebar
│   ├── installation.md
│   └── quickstart.md
├── guides/              → "Guides" section in sidebar
│   ├── my-guide.md
│   └── extensions/      → Subsection under Guides
│       └── creating.md
└── api-reference/       → "API Reference" section
    └── overview.md
```

**The folder structure automatically creates the sidebar!**

## 🔄 Workflow

```
Write Markdown → Commit → Push → Auto Deploy ✅
   (Local)                        (2 minutes)
```

## 🐛 Troubleshooting

**Build fails locally?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Not deploying?**
- Check Actions tab for errors
- Ensure GitHub Pages source is set to "GitHub Actions"
- Wait 5-10 minutes after first setup

**Sidebar not updating?**
- Make sure files are in `docs-src/` not `docs/`
- Check frontmatter is valid YAML
- Rebuild: `npm run build`

## 💡 Pro Tips

1. **Test before pushing:**
   ```bash
   npm run build && npm run dev
   ```

2. **Auto-rebuild on save:**
   ```bash
   npm run watch
   ```

3. **Use frontmatter for ordering:**
   ```yaml
   ---
   title: My Page
   order: 1  # Lower numbers appear first
   ---
   ```

4. **Link between pages:**
   ```markdown
   [Installation Guide](../getting-started/installation.md)
   ```

## 🎯 Next Steps

1. ✅ Setup complete
2. ✅ Write your docs in `docs-src/`
3. ✅ Push to GitHub
4. ✅ Docs auto-deploy!

Need help? Check the full README.md