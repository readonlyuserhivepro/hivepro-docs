# 📊 Markdown to GitHub Pages Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  📝 Step 1: Write Documentation (Local)                        │
│                                                                 │
│  docs-src/                                                      │
│  ├── getting-started/                                          │
│  │   └── installation.md  ← Write your docs here!             │
│  └── guides/                                                    │
│      └── my-guide.md                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  💾 Step 2: Commit and Push                                    │
│                                                                 │
│  $ git add docs-src/                                           │
│  $ git commit -m "Add new documentation"                       │
│  $ git push origin main                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🤖 Step 3: GitHub Actions (Automatic)                         │
│                                                                 │
│  .github/workflows/deploy.yml                                  │
│                                                                 │
│  1. Checkout code                                              │
│  2. Install Node.js & dependencies                             │
│  3. Run: npm run build                                         │
│     ├── Read all .md files                                     │
│     ├── Convert Markdown → HTML                                │
│     ├── Generate sidebar from folders                          │
│     └── Output to dist/                                        │
│  4. Deploy to GitHub Pages                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🌐 Step 4: Live on GitHub Pages                               │
│                                                                 │
│  https://YOUR_USERNAME.github.io/hivepro-docs/                 │
│                                                                 │
│  ✅ Documentation is live!                                     │
│  ✅ Sidebar auto-generated from folder structure               │
│  ✅ All links working                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 How the Build Works

### Input: Markdown Files

```
docs-src/
├── getting-started/
│   ├── installation.md
│   └── quickstart.md
└── guides/
    └── extensions/
        └── creating.md
```

### Process: Build Script (build.js)

1. **Scan folders** → Determine sidebar sections
2. **Read markdown** → Parse frontmatter and content
3. **Convert to HTML** → Using markdown-it
4. **Generate sidebar** → Automatically from folder structure
5. **Create pages** → With navigation and styling

### Output: HTML Files

```
dist/
├── index.html
├── styles.css
├── script.js
└── docs/
    ├── getting-started/
    │   ├── installation.html
    │   └── quickstart.html
    └── guides/
        └── extensions/
            └── creating.html
```

## 📂 Folder = Sidebar Section

| Folder Path | Sidebar Section | Example Files |
|-------------|----------------|---------------|
| `docs-src/getting-started/` | "Getting Started" | installation.md, quickstart.md |
| `docs-src/core-concepts/` | "Core Concepts" | architecture.md, security.md |
| `docs-src/guides/` | "Guides" | basic-usage.md |
| `docs-src/guides/extensions/` | → Subsection under Guides | creating.md, publishing.md |
| `docs-src/api-reference/` | "API Reference" | overview.md, endpoints.md |
| `docs-src/resources/` | "Resources" | faq.md, changelog.md |

## 🎯 Key Features

### ✅ Automatic Sidebar Generation

- No manual HTML editing
- Folders become sections
- Subfolders become subsections
- Order controlled by frontmatter

### ✅ Markdown Frontmatter

```yaml
---
title: Page Title        # Shown in sidebar
order: 1                 # Controls position (lower = first)
---
```

### ✅ Auto-Deploy on Push

```bash
git push origin main
# → GitHub Actions automatically builds and deploys
# → Live in ~2 minutes
```

### ✅ Local Development

```bash
npm run build    # Build once
npm run dev      # Preview at localhost:8080
npm run watch    # Auto-rebuild on changes
```

## 🚀 Complete Example

### 1. Create a new guide

```bash
touch docs-src/guides/advanced-features.md
```

### 2. Write content

```markdown
---
title: Advanced Features
order: 2
---

# Advanced Features

Learn about advanced HivePro features...

## Feature 1

Description...

## Feature 2

More details...
```

### 3. Preview locally

```bash
npm run build
npm run dev
```

### 4. Deploy

```bash
git add docs-src/guides/advanced-features.md
git commit -m "Add advanced features guide"
git push origin main
```

### 5. Result

- ✅ New page created at `/docs/guides/advanced-features.html`
- ✅ Added to sidebar under "Guides" section
- ✅ Automatically deployed to GitHub Pages
- ✅ Live at: `https://YOUR_USERNAME.github.io/hivepro-docs/docs/guides/advanced-features.html`

## 💡 Benefits

| Traditional Docs | Markdown + CI/CD |
|------------------|------------------|
| Edit HTML manually | Write simple Markdown |
| Update sidebar in every file | Auto-generated from folders |
| Manual deployment | Push to deploy |
| Risk of broken links | Automatic link validation |
| Complex setup | Simple workflow |

## 🎓 Learning Curve

```
Markdown (5 min) → Git (know already) → Auto-deploy! ✅
```

You just write Markdown and push. Everything else is automatic!
