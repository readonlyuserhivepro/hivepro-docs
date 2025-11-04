# HivePro Documentation

Markdown-based documentation with automatic build and deployment to GitHub Pages.

## 📝 Writing Documentation

All documentation is written in **Markdown** (`.md`) files in the `docs-src/` directory.

### Folder Structure

```
docs-src/
├── getting-started/        # Getting Started section
│   ├── installation.md
│   ├── quickstart.md
│   └── configuration.md
├── core-concepts/          # Core Concepts section
│   ├── architecture.md
│   └── security.md
├── guides/                 # Guides section
│   ├── basic-usage.md
│   └── extensions/         # Subsection
│       └── creating.md
├── api-reference/          # API Reference section
│   └── overview.md
└── resources/              # Resources section
    └── faq.md
```

**Each folder becomes a section in the sidebar automatically!**

### Creating a New Page

1. Create a new `.md` file in the appropriate folder:

```bash
# Example: Create a new configuration guide
touch docs-src/getting-started/configuration.md
```

2. Add frontmatter at the top of your markdown file:

```markdown
---
title: Configuration Guide
order: 3
---

# Configuration Guide

Your content here...
```

3. Write your content in Markdown
4. Commit and push - GitHub Actions will automatically build and deploy!

### Frontmatter Options

```yaml
---
title: Page Title              # Optional: Auto-generated from filename if not specified
order: 1                       # Optional: Controls order within section (lower = first)
---
```

### Markdown Features

#### Headers

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

#### Code Blocks

````markdown
```bash
hivepro scan start --target example.com
```

```python
from hivepro import Client
client = Client(api_key="...")
```
````

#### Lists

```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

#### Links

```markdown
[Link to another page](../guides/basic-usage.md)
[External link](https://hivepro.io)
```

#### Alerts/Callouts

```markdown
::: alert alert-info
**Note:** This is an informational note.
:::

::: alert alert-warning
**Warning:** This is a warning message.
:::
```

#### Inline Code

```markdown
Use `code` for inline code snippets.
```

## 🚀 Local Development

### Install Dependencies

```bash
npm install
```

### Build Documentation

```bash
npm run build
```

This will:
- Convert all `.md` files to `.html`
- Generate sidebar navigation automatically
- Copy static assets to `dist/`

### Preview Locally

```bash
npm run dev
```

Then open http://localhost:8080 in your browser.

### Watch Mode (Auto-rebuild)

```bash
npm run watch
```

This will automatically rebuild when you change any `.md` file.

## 📦 Deployment to GitHub Pages

### Initial Setup

1. **Create GitHub Repository**

```bash
cd ~/hivepro-docs
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/hivepro-docs.git
git branch -M main
git push -u origin main
```

2. **Enable GitHub Pages**

- Go to your repository on GitHub
- Click **Settings** → **Pages**
- Under **Source**, select:
  - **Source:** GitHub Actions (not branch)
- Click **Save**

That's it! GitHub Actions will automatically build and deploy your docs.

### Automatic Deployment

Every time you push to the `main` branch:

1. GitHub Actions runs the build script
2. Converts all Markdown to HTML
3. Generates sidebar navigation
4. Deploys to GitHub Pages

Your site will be live at: `https://YOUR_USERNAME.github.io/hivepro-docs/`

### Manual Deployment

You can also trigger deployment manually:

- Go to **Actions** tab in GitHub
- Select **Build and Deploy Documentation**
- Click **Run workflow**

## 📂 Project Structure

```
hivepro-docs/
├── docs-src/                   # 📝 SOURCE: Write markdown here
│   ├── getting-started/
│   ├── core-concepts/
│   ├── guides/
│   ├── api-reference/
│   └── resources/
├── dist/                       # 🚀 OUTPUT: Generated HTML (git ignored)
│   ├── docs/
│   ├── styles.css
│   ├── script.js
│   └── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── build.js                    # Build script
├── package.json                # Node.js dependencies
├── styles.css                  # Global styles
├── script.js                   # Global JavaScript
└── index.html                  # Landing page
```

## 🎨 Customization

### Change Brand Colors

Edit `styles.css`:

```css
.logo span { color: #e74c3c; }  /* Logo accent */
.btn { background: #e74c3c; }   /* Button color */
/* Search and replace #e74c3c with your color */
```

### Customize Sidebar Sections

Edit `build.js` and modify the `sidebarConfig`:

```javascript
const sidebarConfig = {
  'getting-started': {
    title: 'Getting Started',
    order: 1
  },
  'your-section': {
    title: 'Your Custom Section',
    order: 2
  }
};
```

### Modify Page Template

Edit the `generatePage()` function in `build.js` to change the HTML structure.

## 🔧 Advanced Features

### Adding Custom Markdown Extensions

Install additional markdown-it plugins in `build.js`:

```javascript
const md = new MarkdownIt()
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-task-lists'));
```

### Custom Frontmatter Fields

Extend the frontmatter processing in `build.js`:

```javascript
const { data, content: markdown } = matter(fileContent);
const author = data.author || 'Unknown';
const date = data.date || new Date();
```

## 📋 Workflow Example

1. **Create a new feature guide:**

```bash
touch docs-src/guides/advanced-scanning.md
```

2. **Write content:**

```markdown
---
title: Advanced Scanning Techniques
order: 2
---

# Advanced Scanning

Learn advanced scanning techniques...
```

3. **Test locally:**

```bash
npm run build
npm run dev
```

4. **Commit and push:**

```bash
git add docs-src/guides/advanced-scanning.md
git commit -m "Add advanced scanning guide"
git push origin main
```

5. **Wait ~2 minutes** - Your page is now live!

## 🐛 Troubleshooting

### Build Fails

Check the GitHub Actions logs:
- Go to **Actions** tab
- Click on the failed workflow
- Review the logs

### Page Not Showing in Sidebar

- Ensure the file is in `docs-src/` folder
- Check frontmatter is valid YAML
- Rebuild: `npm run build`

### Links Not Working

- Use relative paths: `../section/page.md`
- Links to `.md` files are auto-converted to `.html`

### Styles Not Loading

- Clear browser cache
- Check `dist/` contains `styles.css`
- Verify build completed successfully

## 📚 Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-guide`
3. Add your markdown files to `docs-src/`
4. Commit your changes: `git commit -m 'Add new guide'`
5. Push to the branch: `git push origin feature/new-guide`
6. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details
