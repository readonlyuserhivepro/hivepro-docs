---
title: API Overview
order: 1
---

# API Overview

The HivePro API provides programmatic access to all platform features, enabling seamless integration with your security workflows and tools.

## Base URL

```
https://api.hivepro.io/v1
```

For self-hosted installations:

```
https://your-hivepro-instance.com/api/v1
```

## API Principles

The HivePro API follows REST principles and uses standard HTTP methods:

- **GET:** Retrieve resources
- **POST:** Create new resources
- **PUT:** Update existing resources
- **PATCH:** Partially update resources
- **DELETE:** Remove resources

## Authentication

All API requests require authentication using API keys or OAuth2 tokens. See the [Authentication Guide](authentication.md) for details.

```bash
# Using API Key
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.hivepro.io/v1/scans

# Using OAuth2 Token
curl -H "Authorization: Bearer YOUR_OAUTH_TOKEN" \
  https://api.hivepro.io/v1/scans
```

## Request Format

The API accepts JSON-encoded request bodies for POST, PUT, and PATCH requests:

```json
POST /v1/scans
Content-Type: application/json

{
  "target": "https://example.com",
  "scan_type": "standard",
  "profile": "web-app",
  "options": {
    "depth": 3,
    "timeout": 3600
  }
}
```

## Response Format

All API responses are JSON-encoded with a consistent structure:

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "scan_abc123",
    "status": "running",
    "created_at": "2024-11-04T10:30:00Z"
  },
  "meta": {
    "request_id": "req_xyz789"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TARGET",
    "message": "The specified target URL is invalid",
    "details": {
      "field": "target",
      "reason": "Invalid URL format"
    }
  },
  "meta": {
    "request_id": "req_xyz789"
  }
}
```

## HTTP Status Codes

The API uses standard HTTP status codes:

- **200 OK:** Request succeeded
- **201 Created:** Resource created successfully
- **204 No Content:** Request succeeded with no response body
- **400 Bad Request:** Invalid request parameters
- **401 Unauthorized:** Missing or invalid authentication
- **403 Forbidden:** Insufficient permissions
- **404 Not Found:** Resource not found
- **429 Too Many Requests:** Rate limit exceeded
- **500 Internal Server Error:** Server error

## Rate Limiting

API requests are rate limited to ensure service stability:

- **Standard tier:** 100 requests per minute
- **Professional tier:** 500 requests per minute
- **Enterprise tier:** Custom limits

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699107600
```

::: alert alert-warning
**Important:** When rate limit is exceeded, the API returns a 429 status code. Implement exponential backoff in your client.
:::

## SDKs and Libraries

Official SDKs are available for popular programming languages:

- **Python:** `pip install hivepro-sdk`
- **JavaScript/Node.js:** `npm install @hivepro/sdk`
- **Go:** `go get github.com/hivepro/hivepro-go`
- **Java:** Maven/Gradle dependency

### Example: Python SDK

```python
from hivepro import HiveProClient

# Initialize client
client = HiveProClient(api_key="your_api_key")

# Start a scan
scan = client.scans.create(
    target="https://example.com",
    scan_type="standard"
)

# Wait for completion
scan.wait_until_complete()

# Get vulnerabilities
vulns = scan.get_vulnerabilities(severity=["critical", "high"])

# Generate report
report = scan.generate_report(format="pdf")
report.download("scan-report.pdf")
```

## Next Steps

- Explore the [API Endpoints](endpoints.md) reference
- Learn about [Authentication](authentication.md) methods
- View integration examples
- Try the interactive API Explorer
