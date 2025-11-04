# 🔧 GitHub Actions Troubleshooting

## Issue: "Dependencies lock file is not found"

### Error Message
```
Error: Dependencies lock file is not found in /home/runner/work/hivepro-docs/hivepro-docs. 
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

### Cause
The `package-lock.json` file is not committed to your repository, but the GitHub Actions workflow expects it for caching.

### Solution

**Step 1: Generate and commit package-lock.json**

```bash
cd ~/hivepro-docs

# Remove old lock file if exists
rm -f package-lock.json

# Clean install to generate new lock file
npm install

# Verify it was created
ls -la package-lock.json
```

**Step 2: Commit the lock file**

```bash
git add package-lock.json
git add .gitignore
git add .github/workflows/deploy.yml
git commit -m "Add package-lock.json for GitHub Actions"
git push origin main
```

**Step 3: Verify deployment**

1. Go to your repo on GitHub
2. Click **Actions** tab
3. Watch the workflow run
4. Should complete in ~2 minutes

---

## Issue: Build fails on GitHub Actions but works locally

### Possible Causes

1. **Missing files in git**
   ```bash
   # Make sure all necessary files are committed
   git status
   git add docs-src/
   git add build.js package.json
   git commit -m "Add missing files"
   git push
   ```

2. **Node version mismatch**
   - GitHub Actions uses Node 20
   - Check your local version: `node --version`
   - Update if needed: `nvm install 20`

3. **Path issues**
   - Use relative paths in markdown
   - Don't use absolute paths like `/docs/...`
   - Use `../section/page.md` format

---

## Issue: GitHub Pages not enabled

### Error in Actions
```
Error: No url found for deployment
```

### Solution

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Wait 1 minute and re-run the workflow

---

## Issue: 404 on GitHub Pages

### Symptoms
- Workflow succeeds
- But site shows 404 error

### Solutions

**Check 1: Repository visibility**
- Repository must be **public** for free GitHub Pages
- Or you need GitHub Pro for private repo pages

**Check 2: Correct URL**
Your site URL should be:
```
https://YOUR_USERNAME.github.io/hivepro-docs/
```

NOT:
```
https://YOUR_USERNAME.github.io/
```

**Check 3: index.html exists**
```bash
# Make sure index.html is in the root
ls -la index.html

# It should be copied to dist/ during build
npm run build
ls -la dist/index.html
```

---

## Issue: Sidebar links broken

### Symptoms
- Sidebar shows but links give 404
- URLs look like: `/docs/section/docs/section/page.html`

### Solution
This was fixed in the latest `build.js`. Update it:

```bash
git pull origin main
npm run build
npm run dev  # Test locally first
```

---

## Issue: New markdown files not appearing

### Checklist

1. **File in correct location?**
   ```bash
   # Should be in docs-src/, not docs/
   ls -la docs-src/section/yourfile.md
   ```

2. **Valid frontmatter?**
   ```markdown
   ---
   title: Your Page
   order: 1
   ---
   ```

3. **Committed to git?**
   ```bash
   git status
   git add docs-src/
   git commit -m "Add new page"
   git push
   ```

4. **Build successful?**
   - Check Actions tab for errors
   - Test locally: `npm run build`

---

## Issue: Slow deployment

### Normal timeline
- Push to GitHub: instant
- Workflow starts: ~30 seconds
- Build & deploy: ~1-2 minutes
- **Total: ~2-3 minutes**

### If taking longer
1. Check Actions tab for progress
2. Look for errors in workflow logs
3. GitHub may have delays (rare)

---

## Issue: "npm ERR!" during build

### Common errors

**Error: Cannot find module**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error: Permission denied**
```bash
# Solution: Check file permissions
chmod +x build.js
chmod +x setup-github-pages.sh
```

**Error: ENOENT: no such file**
```bash
# Solution: Make sure all files exist
ls -la build.js
ls -la package.json
ls -la docs-src/
```

---

## Testing Locally Before Pushing

**Always test locally first!**

```bash
# Clean build
rm -rf dist/
npm run build

# Preview
npm run dev

# Test in browser
# Open: http://localhost:8080

# Check all links work
# Navigate through sidebar
# Verify new pages appear
```

---

## Quick Fix Commands

### Reset everything
```bash
cd ~/hivepro-docs
rm -rf node_modules dist package-lock.json
npm install
npm run build
npm run dev
```

### Re-deploy to GitHub
```bash
git add .
git commit -m "Fix deployment issues"
git push origin main
```

### View GitHub Actions logs
```bash
# Or use GitHub CLI
gh run list
gh run view --log
```

---

## Getting Help

### Check these first:
1. ✅ Actions tab shows green checkmark?
2. ✅ `package-lock.json` committed?
3. ✅ GitHub Pages source set to "GitHub Actions"?
4. ✅ Repository is public?
5. ✅ Build works locally?

### Debug commands:
```bash
# Check git status
git status

# Check if files are tracked
git ls-files

# Test build locally
npm run build -- --verbose

# Check node version
node --version  # Should be 18+ or 20+

# Check npm version
npm --version
```

### Still stuck?

1. Check the **Actions** tab logs on GitHub
2. Look for the exact error message
3. Search this file for that error
4. Test the suggested fix locally first
5. Then push to GitHub

---

## Automated Setup

Use the setup script for automatic configuration:

```bash
chmod +x setup-github-pages.sh
./setup-github-pages.sh
```

This will:
- ✅ Install dependencies
- ✅ Generate package-lock.json
- ✅ Test the build
- ✅ Show you what to commit

---

## Prevention Tips

✅ **Always test locally before pushing**
```bash
npm run build && npm run dev
```

✅ **Commit package-lock.json**
```bash
git add package-lock.json
```

✅ **Keep dependencies updated**
```bash
npm update
git add package-lock.json
git commit -m "Update dependencies"
```

✅ **Use the watch mode during development**
```bash
npm run watch
# Edit files and see changes automatically
```

---

## Success Checklist

When everything works, you should see:

- ✅ Green checkmark on Actions tab
- ✅ Site loads at `https://USERNAME.github.io/hivepro-docs/`
- ✅ Sidebar appears with all sections
- ✅ All links work (no 404s)
- ✅ New pages show up automatically
- ✅ Markdown renders correctly

If all boxes checked: **You're all set!** 🎉
