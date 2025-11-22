# RJ-Labs Architecture

## Overview
RJ-Labs is a monorepo built using [Turborepo](https://turbo.build/repo). It follows a standard structure separating applications and shared packages.

## Structure

### Apps (`/apps`)
- **`web`**: The main SaaS application (Next.js).
- **`docs`**: The documentation site (Next.js).

### Packages (`/packages`)
- **`@labs/ui`**: Shared React component library.
- **`@labs/eslint-config`**: Shared ESLint configurations.
- **`@labs/typescript-config`**: Shared TypeScript configurations.

## Dependency Graph
The `web` and `docs` applications depend on the shared packages. Changes in packages are automatically detected by Turborepo, ensuring efficient builds.

## Tech Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules / Tailwind (TBD)
- **Package Manager**: pnpm
- **Build System**: Turborepo
