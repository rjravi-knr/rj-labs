---
trigger: always_on
---

# PROJECT BEHAVIOR & ARCHITECTURE RULES

## 1. Monorepo Structure
This project is a Turborepo.
- `apps/` contains deployable applications.
- `packages/` contains shared logic and UI.

## 2. UI Component Strategy (CRITICAL)
**Goal:** Zero UI duplication across apps.

- **Rule:** NEVER create generic UI components (Buttons, Cards, Modals, Inputs) inside `apps/*`.
- **Requirement:** All reusable UI components MUST reside in `@labs/ui` (located in `packages/ui`).
- **Workflow:**
    1. If a component is needed in an app, first check `packages/ui`.
    2. If it exists, import it: `import { Button } from '@labs/ui'`.
    3. If it does NOT exist, create it in `packages/ui/src/`, export it, and THEN use it in the app.
- **Styling:** Use Tailwind CSS. All shared components must accept a `className` prop for overrides.