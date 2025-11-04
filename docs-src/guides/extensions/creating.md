---
title: Creating Extensions
order: 1
---

# Creating Extensions

Learn how to create custom extensions for HivePro to extend its functionality.

## Overview

HivePro extensions allow you to:

- Add custom security checks
- Integrate with third-party tools
- Customize reporting formats
- Extend API functionality

## Extension Structure

A HivePro extension is a package with the following structure:

```
my-extension/
├── manifest.json
├── index.js
├── checks/
│   └── custom-check.js
├── lib/
│   └── helpers.js
└── README.md
```

## Creating Your First Extension

### Step 1: Initialize Extension

```bash
hivepro extension init my-first-extension
cd my-first-extension
```

### Step 2: Define Manifest

Edit `manifest.json`:

```json
{
  "name": "my-first-extension",
  "version": "1.0.0",
  "description": "My first HivePro extension",
  "author": "Your Name",
  "main": "index.js",
  "hivepro": {
    "minVersion": "5.0.0",
    "maxVersion": "6.0.0"
  },
  "capabilities": [
    "security-check",
    "report-format"
  ]
}
```

### Step 3: Implement Extension

Create `index.js`:

```javascript
module.exports = {
  name: 'My First Extension',
  
  async initialize(context) {
    console.log('Extension initialized');
  },
  
  async execute(target, options) {
    // Your extension logic here
    return {
      findings: [],
      metadata: {}
    };
  }
};
```

## Building Extensions

```bash
# Install dependencies
npm install

# Build extension
hivepro extension build

# Test extension
hivepro extension test
```

## Next Steps

- Learn about [Publishing Extensions](publishing.md)
- Explore the [Extension API](../../api-reference/extensions.md)
- See [Example Extensions](https://github.com/hivepro/extensions)
