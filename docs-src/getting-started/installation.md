---
title: Installation Guide
order: 1
---

# Installation

This guide will walk you through installing HivePro on various platforms. Choose the installation method that best fits your infrastructure.

## System Requirements

Before installing HivePro, ensure your system meets the following requirements:

- **CPU:** 4 cores minimum (8+ recommended)
- **RAM:** 8GB minimum (16GB+ recommended)
- **Storage:** 50GB minimum (SSD recommended)
- **OS:** Linux (Ubuntu 20.04+, RHEL 8+, Debian 11+)
- **Network:** Outbound internet access for updates and scanning

## Docker Installation

The easiest way to get started with HivePro is using Docker:

```bash
# Pull the latest image
docker pull hivepro/platform:latest

# Run HivePro
docker run -d \
  --name hivepro \
  -p 8080:8080 \
  -v /var/lib/hivepro:/data \
  hivepro/platform:latest
```

::: alert alert-info
**Tip:** Use Docker Compose for easier management. See our Docker Compose example below.
:::

### Docker Compose

```yaml
version: '3.8'

services:
  hivepro:
    image: hivepro/platform:latest
    container_name: hivepro
    ports:
      - "8080:8080"
    volumes:
      - hivepro-data:/data
      - ./config:/etc/hivepro
    environment:
      - HIVEPRO_DB_HOST=postgres
      - HIVEPRO_DB_NAME=hivepro
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=hivepro
      - POSTGRES_USER=hivepro
      - POSTGRES_PASSWORD=changeme
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  hivepro-data:
  postgres-data:
```

## Kubernetes Installation

For production deployments, we recommend using Kubernetes:

```bash
# Add HivePro Helm repository
helm repo add hivepro https://charts.hivepro.io
helm repo update

# Install HivePro
helm install hivepro hivepro/platform \
  --namespace hivepro \
  --create-namespace \
  --set ingress.enabled=true \
  --set ingress.hostname=hivepro.example.com
```

### Kubernetes Manifest

Alternatively, you can use our Kubernetes manifests:

```bash
# Deploy HivePro
kubectl apply -f https://hivepro.io/deploy/k8s.yaml

# Check deployment status
kubectl get pods -n hivepro

# Access the service
kubectl port-forward -n hivepro svc/hivepro 8080:8080
```

## Standalone Installation

For development or testing environments:

```bash
# Download and install
curl -sSL https://get.hivepro.io | sh

# Or manually:
wget https://releases.hivepro.io/latest/hivepro-linux-amd64.tar.gz
tar -xzf hivepro-linux-amd64.tar.gz
sudo mv hivepro /usr/local/bin/

# Start HivePro
hivepro start --config /etc/hivepro/config.yaml
```

## Verification

After installation, verify HivePro is running correctly:

```bash
# Check service status
hivepro status

# Test API endpoint
curl http://localhost:8080/api/health

# View logs
hivepro logs --tail 50
```

::: alert alert-warning
**Security Note:** Change default passwords and configure TLS before using HivePro in production.
:::

## Next Steps

Now that HivePro is installed, you can:

- Follow the [Quick Start Guide](quickstart.md) to run your first scan
- Configure HivePro for your environment in the [Configuration](configuration.md) section
- Learn about [HivePro's Architecture](../core-concepts/architecture.md)
