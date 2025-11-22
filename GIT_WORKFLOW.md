# Git Workflow & Branching Strategy

## Branching Model

We follow a structured branching strategy to ensure stability and smooth collaboration.

### Branches

- **`main`**: Production-ready code. Deployed to production environment.
- **`staging`**: Pre-production testing. Deployed to staging environment for QA/Testing.
- **`dev`**: Main development branch. All feature branches merge here.

### Workflow

1.  **Feature Development**:
    - Create a new branch from `dev`: `git checkout -b feature/my-feature dev`
    - Work on your changes.
    - Open a Pull Request (PR) to `dev`.

2.  **Release to Staging**:
    - Merge `dev` into `staging` when a release candidate is ready.
    - QA/Testing occurs on `staging`.

3.  **Release to Production**:
    - Merge `staging` into `main` after successful validation.

## Commit Standards

We follow the **Conventional Commits** specification. Each commit should define the scope of work and be independent.

### Format
```
<type>(<scope>): <description>

[optional body]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Examples
- `feat(auth): implement login with email`
- `fix(ui): resolve button alignment issue on mobile`
- `docs(readme): update installation instructions`
