# Contributing to RJ-Labs

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```
   This will start all applications in parallel.

## Development Workflow

### Adding a new component
1. Add the component to `packages/ui/src`.
2. Export it in `packages/ui/package.json`.
3. Use it in `apps/web` or `apps/docs`.

### Building
To build all apps and packages:
```bash
pnpm build
```

### Linting
To lint the codebase:
```bash
pnpm lint
```
