---
description: Microservices + Monolith Hybrid Architecture Pattern
---

# RJ Suite Architecture Pattern: Microservices + Monolith Hybrid

## Core Principle

**Every core system in RJ Suite follows a dual-layer architecture:**

1. **Package Layer** (`/packages/@labs/*`): Reusable TypeScript library
2. **Application Layer** (`/apps/*-service`): Standalone, deployable microservice

The packages can be used independently in ANY project, AND the apps can run standalone OR integrate into the unified `apps/academy` monolith.

---

## The Pattern

### For Each Core System (e.g., Authentication)

#### 1. Create the Package First
```
packages/auth/
├── package.json (name: "@labs/auth")
├── src/
│   ├── index.ts (exports all public APIs)
│   ├── providers/
│   ├── session/
│   └── types/
└── tests/
```

**Purpose**: Reusable library that can be:
- Imported into ANY Next.js/React project
- Used in other monorepo apps
- Published to npm for external use

**Export Pattern**:
```typescript
// packages/auth/src/index.ts
export * from './providers'
export * from './session'
export * from './types'
export { createAuthHandler } from './handlers'
```

---

#### 2. Create the Standalone App/Service
```
apps/auth-service/
├── package.json (name: "auth-service")
├── app/
│   ├── api/
│   │   ├── auth/signup/route.ts
│   │   ├── auth/login/route.ts
│   │   └── users/route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   └── layout.tsx
└── middleware.ts
```

**Purpose**: Standalone microservice that:
- Can be deployed independently (e.g., `auth.rjsuite.com`)
- Exposes RESTful APIs for other services
- Has its own admin UI/dashboard
- Works like Auth0, Clerk, or similar SaaS products

**Implementation**:
```typescript
// apps/auth-service/app/api/auth/signup/route.ts
import { createUser } from '@labs/auth'

export async function POST(req: Request) {
  // Uses the @labs/auth package internally
  const user = await createUser(data)
  return Response.json({ user })
}
```

---

#### 3. Integrate into Monolith (apps/academy)
```
apps/academy/
├── package.json (depends on ALL @labs/* packages)
├── app/
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── learn/
│   │   └── page.tsx
│   └── api/
│       └── auth/[...nextauth]/route.ts
```

**Purpose**: Unified platform that:
- Imports ALL `@labs/*` packages directly
- Bundles all code together (monolith)
- Deployed as single application
- No inter-service API calls needed

**Implementation**:
```typescript
// apps/academy/app/api/auth/signup/route.ts
import { createUser } from '@labs/auth'

export async function POST(req: Request) {
  // Same package, same code as auth-service
  // But bundled as part of the monolith
  const user = await createUser(data)
  return Response.json({ user })
}
```

---

## Deployment Scenarios

### Scenario A: Microservices Architecture
```
┌─────────────────┐
│  auth-service   │ → auth.rjsuite.com
│ (uses @labs/auth)│
└─────────────────┘
        ↓ API calls
┌─────────────────┐
│ learning-service│ → learn.rjsuite.com
│(uses @labs/learning)│
└─────────────────┘
        ↓ API calls
┌─────────────────┐
│  email-service  │ → email.rjsuite.com
│ (uses @labs/email)│
└─────────────────┘
        ↓ API calls
┌─────────────────┐
│   academy app   │ → academy.rjsuite.com
│ (orchestrates)  │
└─────────────────┘
```

**When to use**:
- High scale requirements
- Different teams managing services
- Need independent deployment cycles
- Want to sell individual services as products

---

### Scenario B: Monolith Architecture
```
┌──────────────────────────────┐
│        academy app           │
│                              │
│  ├─ @labs/auth              │
│  ├─ @labs/learning          │
│  ├─ @labs/email             │
│  ├─ @labs/ai                │
│  └─ @labs/payments          │
│                              │
│  All code bundled together  │
└──────────────────────────────┘
    ↓ deployed to
academy.rjsuite.com
```

**When to use**:
- Faster development (no network latency)
- Easier debugging (one codebase)
- Lower infrastructure costs
- Simpler deployment
- Better for MVP/early stage

---

### Scenario C: Hybrid (Best of Both)
```
Standalone services for reusability:
├─ auth-service → Sell as "RJ Auth" product
├─ email-service → Sell as "RJ Mail" product
└─ ai-service → Sell as "RJ AI" product

Main platform as monolith:
└─ academy → Uses all @labs/* packages directly
```

**This is the RJ Suite approach!**

---

## Rules and Guidelines

### RULE 1: Package First, Always
- Never create app-specific logic in apps
- Always create the package first
- Apps are just thin wrappers around packages

### RULE 2: Packages Must Be Standalone
- Each package must work independently
- Zero coupling to other packages (except utils, database)
- Must be publishable to npm

### RULE 3: Apps Depend on Packages
- Apps import from `@labs/*`
- Apps never duplicate package logic
- Apps provide UI/API layer only

### RULE 4: Clear Dependency Hierarchy
```
Foundation Tier:
├─ @labs/utils
├─ @labs/database
└─ @labs/eslint-config, @labs/typescript-config

Core Tier (depend on Foundation):
├─ @labs/auth
├─ @labs/email
├─ @labs/api
└─ @labs/media

Feature Tier (depend on Core):
├─ @labs/ai
├─ @labs/learning
├─ @labs/analytics
└─ @labs/payments

Application Tier (depend on ALL):
├─ apps/auth-service (uses @labs/auth)
├─ apps/email-service (uses @labs/email)
├─ apps/learning-service (uses @labs/learning)
└─ apps/academy (uses ALL @labs/*)
```

### RULE 5: Inter-Package Communication
- Packages can depend on other packages
- Use TypeScript imports: `import { createUser } from '@labs/auth'`
- NO runtime API calls between packages

### RULE 6: Inter-Service Communication (Microservices)
- Services communicate via REST APIs
- Use `@labs/api` package for type-safe clients
- Services are independently deployable

### RULE 7: Monolith Communication
- Direct function calls via package imports
- No HTTP overhead
- Compile-time type safety

---

## Package Naming Convention

```
@labs/<domain>
```

Examples:
- `@labs/auth` - Authentication
- `@labs/email` - Email
- `@labs/learning` - Learning Management
- `@labs/ai` - AI/LLM utilities

---

## App Naming Convention

```
apps/<domain>-service   # For standalone microservices
apps/<name>             # For integrated apps
```

Examples:
- `apps/auth-service` - Standalone auth service
- `apps/email-service` - Standalone email service
- `apps/academy` - Integrated learning platform
- `apps/admin` - Admin dashboard
- `apps/docs` - Documentation site

---

## Example: Building the Auth System

### Step 1: Create Package
```bash
cd packages
mkdir auth
cd auth
pnpm init
```

```json
// packages/auth/package.json
{
  "name": "@labs/auth",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@labs/database": "workspace:*",
    "@labs/utils": "workspace:*"
  }
}
```

### Step 2: Build Package Logic
```typescript
// packages/auth/src/index.ts
export async function createUser(data: CreateUserInput) {
  // Core auth logic here
}

export async function verifyPassword(email: string, password: string) {
  // Password verification logic
}

export async function generateToken(userId: string) {
  // JWT generation
}
```

### Step 3: Create Standalone Service
```bash
cd apps
npx create-next-app@latest auth-service
```

```typescript
// apps/auth-service/app/api/auth/signup/route.ts
import { createUser } from '@labs/auth'

export async function POST(req: Request) {
  const data = await req.json()
  const user = await createUser(data) // Uses package
  return Response.json({ user })
}
```

### Step 4: Integrate into Monolith
```typescript
// apps/academy/app/api/auth/signup/route.ts
import { createUser } from '@labs/auth'

export async function POST(req: Request) {
  const data = await req.json()
  const user = await createUser(data) // Same package!
  return Response.json({ user })
}
```

---

## Benefits of This Architecture

### ✅ Flexibility
- Start with monolith for speed
- Extract to microservices when needed
- Mix and match based on requirements

### ✅ Reusability
- Packages work in ANY project
- Can sell individual services
- Open-source packages independently

### ✅ Developer Experience
- Type-safe across entire system
- Shared types between services
- IntelliSense everywhere

### ✅ Cost Efficiency
- Run monolith for low traffic
- Scale specific services independently
- Pay only for what you need

### ✅ Business Model Flexibility
- Sell standalone services (B2B SaaS)
- Offer integrated platform (B2C)
- Open-source packages for community

---

## When to Choose Each Deployment

| Factor | Microservices | Monolith |
|--------|--------------|----------|
| **Team Size** | Large, distributed | Small, co-located |
| **Scale** | High, variable | Low to medium |
| **Complexity** | High (needs isolation) | Low to medium |
| **Speed** | Slower (network calls) | Faster (in-process) |
| **Deployment** | Complex, independent | Simple, all-at-once |
| **Debugging** | Harder (distributed) | Easier (single process) |
| **Cost** | Higher (infrastructure) | Lower (single deployment) |

**RJ Suite Strategy**: Start monolith, build microservices alongside for business opportunities.

---

## Critical Don'ts

❌ Don't create business logic in apps
❌ Don't duplicate code between packages and apps
❌ Don't make packages depend on apps
❌ Don't create circular dependencies between packages
❌ Don't skip the package layer (go straight to apps)

---

## Summary

**The RJ Suite Pattern**:
1. Build reusable packages (`@labs/*`)
2. Create standalone services (`apps/*-service`) that use packages
3. Build integrated monolith (`apps/academy`) that uses same packages
4. Choose deployment model based on needs
5. Maintain flexibility to switch between architectures

This gives you the best of both worlds: the simplicity of a monolith with the flexibility of microservices.
