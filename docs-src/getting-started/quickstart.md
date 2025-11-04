---
title: Quick Start
order: 2
---

# Quick Start Guide

Get started with HivePro in minutes. This guide will walk you through running your first security scan.

## Prerequisites

Before you begin, make sure you have:

- HivePro installed (see [Installation Guide](installation.md))
- A target application or infrastructure to scan
- Network connectivity to your target

## Step 1: Access the Dashboard

Open your browser and navigate to the HivePro dashboard:

```
http://localhost:8080
```

Default credentials for first-time setup:

- **Username:** admin
- **Password:** hivepro (you'll be prompted to change this)

::: alert alert-warning
**Important:** Change the default password immediately after first login!
:::

## Step 2: Create Your First Project

Projects help organize your scans and findings:

1. Click on **Projects** in the sidebar
2. Click **New Project**
3. Fill in the details:
   - **Name:** My First Project
   - **Description:** Testing HivePro security scanning
   - **Owner:** Select yourself
4. Click **Create Project**

## Step 3: Configure a Scan Target

Add a target to scan:

```bash
# Using the CLI
hivepro target add \
  --name "Production Web App" \
  --url https://app.example.com \
  --type web \
  --project "My First Project"
```

## Step 4: Run Your First Scan

Now let's run a security scan:

### Using the Web Interface

1. Go to your project dashboard
2. Click on your target
3. Click **Start Scan**
4. Select scan type:
   - **Quick Scan:** Fast, basic vulnerability check (~5 min)
   - **Standard Scan:** Comprehensive security assessment (~30 min)
   - **Deep Scan:** Thorough analysis with all checks (~2 hours)
5. Click **Start**

### Using the CLI

```bash
# Quick scan
hivepro scan start \
  --target "Production Web App" \
  --type quick

# Standard scan with specific checks
hivepro scan start \
  --target "Production Web App" \
  --type standard \
  --checks "xss,sqli,csrf,auth"

# Watch scan progress
hivepro scan status --watch
```

## Step 5: Review Results

Once the scan completes, review the findings:

```bash
# View all vulnerabilities
hivepro vulns list --severity high,critical

# Get detailed information
hivepro vulns show VULN-2024-001

# Export report
hivepro report generate \
  --format pdf \
  --output scan-report.pdf
```

### Understanding Severity Levels

- **Critical:** Immediate action required, actively exploitable
- **High:** Serious security risk, should be fixed soon
- **Medium:** Potential security issue, plan remediation
- **Low:** Minor issue or best practice violation
- **Info:** Informational finding, no immediate risk

::: alert alert-info
**Tip:** Focus on Critical and High severity findings first for maximum security impact.
:::

## Next Steps

Now that you've completed your first scan, explore these topics:

- Learn about [Configuration Options](configuration.md)
- Set up [Automated Scanning](../guides/basic-usage.md)
- Explore [API Integration](../api-reference/overview.md)
- Configure [Custom Rules](../guides/customization.md)
