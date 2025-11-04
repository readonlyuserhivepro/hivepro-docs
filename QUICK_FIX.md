# 🚀 Quick Fix: GitHub Actions Deployment

Your GitHub Actions is failing because `package-lock.json` is missing. Here's how to fix it:

## Fix in 3 Steps

### Step 1: Generate package-lock.json

```bash
cd ~/hivepro-docs

# Install dependencies (this creates package-lock.json)
npm install
```

### Step 2: Commit the files

```bash
# Add all updated files
git add package-lock.json
git add .gitignore
git add .github/workflows/deploy.yml

# Commit
git commit -m "Fix GitHub Actions: Add package-lock.json"

# Push to GitHub
git push origin main
```

### Step 3: Verify

1. Go to GitHub: `https://github.com/YOUR_USERNAME/hivepro-docs`
2. Click **Actions** tab (top menu)
3. You should see a new workflow running
4. Wait ~2 minutes for it to complete
5. Green checkmark = Success! ✅

Your site will be live at: `https://YOUR_USERNAME.github.io/hivepro-docs/`

---

## Or Use the Automated Script

```bash
cd ~/hivepro-docs

# Make script executable
chmod +x setup-github-pages.sh

# Run it
./setup-github-pages.sh

# Then follow the instructions shown
```

---

## What Was Fixed?

1. ✅ Updated `.gitignore` to allow `package-lock.json`
2. ✅ Updated workflow to handle missing lock file gracefully
3. ✅ Fixed relative path issues in sidebar links

## Testing Locally First

Before pushing, always test:

```bash
npm run build
npm run dev
```

Open http://localhost:8080 and verify everything works!

---

## Need More Help?

See `GITHUB_ACTIONS_TROUBLESHOOTING.md` for detailed troubleshooting guide.
