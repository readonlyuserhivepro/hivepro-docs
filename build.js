const fs = require('fs-extra');
const path = require('path');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const matter = require('gray-matter');
const { glob } = require('glob');

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink()
  })
  .use(markdownItAttrs);

// Configuration
const config = {
  sourceDir: 'docs-src',
  outputDir: 'dist',
  templateDir: '.',
  staticFiles: ['styles.css', 'script.js', 'index.html']
};

// Sidebar structure with custom titles
const sidebarConfig = {
  'getting-started': {
    title: 'Getting Started',
    order: 1
  },
  'core-concepts': {
    title: 'Core Concepts',
    order: 2
  },
  'guides': {
    title: 'Guides',
    order: 3
  },
  'api-reference': {
    title: 'API Reference',
    order: 4
  },
  'resources': {
    title: 'Resources',
    order: 5
  }
};

// Function to convert filename to title
function filenameToTitle(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Function to get relative path based on depth
function getRelativePath(depth) {
  return '../'.repeat(depth);
}

// Function to scan directory structure and build sidebar
async function buildSidebarStructure() {
  const structure = {};
  
  // Get all markdown files
  const files = await glob(`${config.sourceDir}/**/*.md`);
  
  files.forEach(file => {
    const relativePath = path.relative(config.sourceDir, file);
    const parts = relativePath.split(path.sep);
    const section = parts[0];
    
    if (!structure[section]) {
      structure[section] = {
        title: sidebarConfig[section]?.title || filenameToTitle(section),
        order: sidebarConfig[section]?.order || 999,
        items: []
      };
    }
    
    // Read frontmatter for custom titles
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    
    const filename = parts[parts.length - 1];
    const isSubsection = parts.length > 2;
    const subsection = isSubsection ? parts[1] : null;
    
    const item = {
      title: data.title || filenameToTitle(filename),
      path: relativePath.replace(/\.md$/, '.html'),
      order: data.order || 999,
      subsection: subsection
    };
    
    structure[section].items.push(item);
  });
  
  // Sort sections and items
  Object.keys(structure).forEach(section => {
    structure[section].items.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  });
  
  return structure;
}

// Function to calculate relative path from current page to target
function getRelativePathTo(fromPath, toPath) {
  const from = path.dirname(fromPath).split(path.sep);
  const to = path.dirname(toPath).split(path.sep);
  
  // Find common base
  let i = 0;
  while (i < from.length && i < to.length && from[i] === to[i]) {
    i++;
  }
  
  // Go up from 'from' to common base
  const upLevels = from.length - i;
  let relativePath = '../'.repeat(upLevels);
  
  // Go down to target
  const downPath = to.slice(i).concat([path.basename(toPath)]).join('/');
  
  return relativePath + downPath;
}

// Function to generate sidebar HTML
function generateSidebar(structure, currentPath) {
  let html = '';
  
  // Sort sections by order
  const sortedSections = Object.entries(structure).sort((a, b) => 
    a[1].order - b[1].order
  );
  
  sortedSections.forEach(([sectionKey, section]) => {
    html += `
            <div class="sidebar-section">
                <div class="sidebar-title">${section.title}</div>
                <ul class="sidebar-items">`;
    
    // Group items by subsection
    const grouped = {};
    section.items.forEach(item => {
      if (item.subsection) {
        if (!grouped[item.subsection]) {
          grouped[item.subsection] = [];
        }
        grouped[item.subsection].push(item);
      } else {
        if (!grouped._main) {
          grouped._main = [];
        }
        grouped._main.push(item);
      }
    });
    
    // Render main items
    if (grouped._main) {
      grouped._main.forEach(item => {
        const isActive = currentPath === item.path ? ' class="active"' : '';
        // Generate relative path from current page to target page
        const href = item.path.startsWith('http') ? item.path : getRelativePathTo(currentPath, item.path);
        html += `
                    <li class="sidebar-item"><a href="${href}"${isActive}>${item.title}</a></li>`;
      });
    }
    
    // Render subsections
    Object.entries(grouped).forEach(([subsection, items]) => {
      if (subsection === '_main') return;
      
      const subsectionTitle = filenameToTitle(subsection);
      html += `
                    <li class="sidebar-item">
                        <a href="#">${subsectionTitle}</a>
                        <ul class="sidebar-items sidebar-subsection">`;
      
      items.forEach(item => {
        const isActive = currentPath === item.path ? ' class="active"' : '';
        // Generate relative path from current page to target page
        const href = getRelativePathTo(currentPath, item.path);
        html += `
                            <li class="sidebar-item"><a href="${href}"${isActive}>${item.title}</a></li>`;
      });
      
      html += `
                        </ul>
                    </li>`;
    });
    
    html += `
                </ul>
            </div>`;
  });
  
  return html;
}

// Function to generate HTML page
function generatePage(title, content, sidebar, depth) {
  const relativePath = getRelativePath(depth);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - HivePro Documentation</title>
    <link rel="stylesheet" href="${relativePath}styles.css">
</head>
<body>
    <header class="header">
        <div style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-toggle" onclick="toggleSidebar()">☰</button>
            <a href="${relativePath}index.html" class="logo"><span>Hive</span>Pro</a>
        </div>
        <nav class="header-nav">
            <a href="${relativePath}index.html">Docs</a>
            <a href="${relativePath}docs/api-reference/overview.html">API</a>
            <a href="#community">Community</a>
            <a href="#github">GitHub</a>
        </nav>
    </header>

    <div class="container">
        <aside class="sidebar" id="sidebar">
${sidebar}
        </aside>

        <main class="main-content">
            <div class="content-wrapper">
${content}
            </div>
        </main>
    </div>

    <script src="${relativePath}script.js"></script>
</body>
</html>`;
}

// Main build function
async function build() {
  console.log('🚀 Building HivePro Documentation...\n');
  
  // Clean output directory
  await fs.emptyDir(config.outputDir);
  console.log('✓ Cleaned output directory');
  
  // Copy static files
  for (const file of config.staticFiles) {
    await fs.copy(file, path.join(config.outputDir, file));
  }
  console.log('✓ Copied static files');
  
  // Build sidebar structure
  const sidebarStructure = await buildSidebarStructure();
  console.log('✓ Built sidebar structure');
  
  // Process markdown files
  const files = await glob(`${config.sourceDir}/**/*.md`);
  console.log(`\n📝 Processing ${files.length} markdown files...\n`);
  
  for (const file of files) {
    const relativePath = path.relative(config.sourceDir, file);
    const content = await fs.readFile(file, 'utf-8');
    const { data, content: markdown } = matter(content);
    
    // Convert markdown to HTML
    const htmlContent = md.render(markdown);
    
    // Determine depth for relative paths
    const depth = relativePath.split(path.sep).length;
    
    // Generate sidebar for this page
    const sidebar = generateSidebar(sidebarStructure, relativePath.replace(/\.md$/, '.html'));
    
    // Generate full page
    const title = data.title || filenameToTitle(path.basename(file));
    const page = generatePage(title, htmlContent, sidebar, depth);
    
    // Write output file
    const outputPath = path.join(config.outputDir, 'docs', relativePath.replace(/\.md$/, '.html'));
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, page);
    
    console.log(`  ✓ ${relativePath} → docs/${relativePath.replace(/\.md$/, '.html')}`);
  }
  
  console.log('\n✅ Build completed successfully!');
  console.log(`📦 Output: ${config.outputDir}/`);
  console.log('\n💡 To preview locally: npm run dev');
}

// Run build
build().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
