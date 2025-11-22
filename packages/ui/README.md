# @labs/ui

Shared UI component library for RJ-Labs applications.

## Installation

This package is intended to be used within the RJ-Labs monorepo.

```bash
pnpm add @labs/ui
```

## Usage

Import components directly:

```tsx
import { Button } from "@labs/ui/button";

export default function Page() {
  return (
    <Button appName="web">
      Click me
    </Button>
  );
}
```

## Available Components

- **Button**: A standard button component.
- **Card**: A container component for grouping content.
- **Code**: A component for displaying inline code.
