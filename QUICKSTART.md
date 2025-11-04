# HivePro Documentation - Quick Reference

## 📁 Directory Structure

```
hivepro-docs/
├── index.html                          # ✅ Main landing page (DONE)
├── styles.css                          # ✅ Global styles (DONE)
├── script.js                           # ✅ Global JavaScript (DONE)
├── _template.html                      # ✅ Template for new pages (DONE)
├── create-page.sh                      # ✅ Helper script to create pages (DONE)
├── README.md                           # ✅ Full documentation (DONE)
├── .gitignore                          # ✅ Git ignore rules (DONE)
│
├── docs/
│   ├── getting-started/
│   │   ├── installation.html           # ✅ Installation guide (DONE)
│   │   ├── quickstart.html             # ✅ Quick start guide (DONE)
│   │   └── configuration.html          # ⬜ TODO: Create this page
│   │
│   ├── core-concepts/
│   │   ├── architecture.html           # ⬜ TODO: Create this page
│   │   ├── features.html               # ⬜ TODO: Create this page
│   │   └── security.html               # ⬜ TODO: Create this page
│   │
│   ├── guides/
│   │   ├── basic-usage.html            # ⬜ TODO: Create this page
│   │   ├── advanced.html               # ⬜ TODO: Create this page
│   │   ├── customization.html          # ⬜ TODO: Create this page
│   │   └── extensions/
│   │       ├── creating-extensions.html # ⬜ TODO: Create this page
│   │       └── publishing.html          # ⬜ TODO: Create this page
│   │
│   ├── api-reference/
│   │   ├── overview.html               # ✅ API overview (DONE)
│   │   ├── endpoints.html              # ⬜ TODO: Create this page
│   │   └── authentication.html         # ⬜ TODO: Create this page
│   │
│   └── resources/
│       ├── troubleshooting.html        # ⬜ TODO: Create this page
│       ├── faq.html                    # ⬜ TODO: Create this page
│       └── changelog.html              # ⬜ TODO: Create this page
```

## ✅ Completed Files

1. **index.html** - Main landing page with welcome content
2. **styles.css** - Complete styling for all pages
3. **script.js** - Navigation and sidebar functionality
4. **_template.html** - Reusable template for new pages
5. **create-page.sh** - Script to generate new pages quickly
6. **docs/getting-started/installation.html** - Full installation guide
7. **docs/getting-started/quickstart.html** - Quick start tutorial
8. **docs/api-reference/overview.html** - API documentation overview

## 🚀 Quick Start Commands

### 1. Initialize Git Repository
```bash
cd ~/hivepro-docs
git init
git add .
git commit -m "Initial commit: HivePro documentation"
```

### 2. Create New Pages (Easy Way)
```bash
# Make the script executable
chmod +x create-page.sh

# Create a new page
./create-page.sh docs/getting-started/configuration.html "Configuration"
./create-page.sh docs/core-concepts/architecture.html "Architecture"
./create-page.sh docs/resources/faq.html "FAQ"
```

### 3. Create New Pages (Manual Way)
```bash
# Copy the template
cp _template.html docs/section/new-page.html

# Edit the file and update:
# - PAGE_TITLE in <title> tag
# - Page Title in <h1> tag
# - Add class="active" to the corresponding sidebar link
# - Add your content
```

### 4. Test Locally
```bash
# Open in browser
firefox index.html
# or
google-chrome index.html
# or
open index.html  # macOS
```

### 5. Push to GitHub
```bash
# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/hivepro-docs.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 6. Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages
3. Select branch: main, folder: / (root)
4. Save

Your site will be live at: `https://YOUR_USERNAME.github.io/hivepro-docs/`

## 📝 Creating Content Checklist

For each new page:
- [ ] Copy from _template.html or use create-page.sh
- [ ] Update page title in <title> tag
- [ ] Update h1 heading
- [ ] Add your content (h2, h3, paragraphs, code blocks, etc.)
- [ ] Update sidebar navigation in ALL pages to include new page
- [ ] Add class="active" to current page's sidebar link
- [ ] Test the page in browser
- [ ] Check all links work correctly
- [ ] Commit and push to GitHub

## 🎨 Customization Tips

### Change Brand Colors
Edit `styles.css` and find these lines:
```css
.logo span { color: #e74c3c; }  /* Logo accent color */
.btn { background: #e74c3c; }   /* Button color */
/* Search for #e74c3c and replace with your color */
```

### Add New Sidebar Section
Add this HTML to all page files in the sidebar:
```html
<div class="sidebar-section">
    <div class="sidebar-title">NEW SECTION</div>
    <ul class="sidebar-items">
        <li class="sidebar-item"><a href="path/to/page.html">Page Name</a></li>
    </ul>
</div>
```

## 🔗 Important File Paths

When creating pages, use the correct relative paths:

| File Location | CSS/JS Path | Index Path | Sibling Page Path |
|--------------|-------------|------------|-------------------|
| docs/section/page.html | ../../styles.css | ../../index.html | ./other-page.html |
| docs/section/sub/page.html | ../../../styles.css | ../../../index.html | ./other-page.html |

## 🛠️ Troubleshooting

**Pages not loading correctly?**
- Check relative paths in href attributes
- Ensure CSS/JS paths match folder depth
- Verify all files are committed to git

**Sidebar not working?**
- Check script.js is loaded
- Verify sidebar ID is "sidebar"
- Check console for JavaScript errors

**GitHub Pages not updating?**
- Wait 5-10 minutes after push
- Check Settings > Pages is enabled
- Clear browser cache

## 📚 Next Steps

1. Create remaining documentation pages using the template
2. Customize colors and branding in styles.css
3. Add your actual documentation content
4. Test all links and navigation
5. Push to GitHub and enable Pages
6. Share your documentation URL!

## 🎯 Pro Tips

- Use `create-page.sh` to save time creating new pages
- Keep sidebar navigation consistent across all pages
- Use code blocks with proper syntax highlighting
- Add alerts (info/warning) for important notes
- Break long pages into smaller, focused pages
- Test on mobile devices (sidebar is responsive)
- Use descriptive page titles and headings
- Add "Next Steps" sections at the end of pages