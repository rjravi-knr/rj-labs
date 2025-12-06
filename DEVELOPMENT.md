# Development Guide

Welcome to the RJ Suite Monorepo. This guide acts as a central hub for running and managing the various applications and services.

## System Overview

### Applications (`apps/`)
| Application | Port | Description | Command |
|-------------|------|-------------|---------|
| **Auth App** | `3000` | Authentication UI (Login, Signup) | `pnpm dev --filter=auth-app` |
| **Docs** | `3001` | Documentation Site | `pnpm dev --filter=docs` |
| **Web Builder** | `3003` | Website Builder SaaS (Landing) | `pnpm dev --filter=web` |

### Services (`services/`)
| Service | Port | Description | Command |
|---------|------|-------------|---------|
| **Auth Service** | `3002` | Auth API Microservice | `pnpm dev --filter=auth-service` |

## Quick Start

### Running Individual Apps
Use the filtered `pnpm dev` commands listed above.

### Running the Entire Stack
To run all applications and services simultaneously:
```bash
pnpm dev
```
(This requires `concurrently` or `turbo` configured to run parallel dev scripts)

## Troubleshooting
- **Port Conflicts**: Ensure ports 3000-3003 are free.
- **Database**: Ensure your Postgres instance is running locally (`@labs/database` expects this).
