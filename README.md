# 🎓 E-Learn Monorepo

Welcome to the **e-learn** project. This is a high-performance, fullstack monorepo built with a **Microservices-inspired architecture** but managed with a **Monolithic developer experience**.

## 🏗️ Architecture Overview

This project uses a **Monorepo** strategy to manage multiple applications and shared libraries in a single repository.

* **The "Engine":** [NestJS](https://nestjs.com/) (Backend API)
* **The "Face":** [Next.js](https://nextjs.org/) (Frontend Web & Docs)
* **The "Orchestrator":** [Turborepo](https://turbo.build/)
* **The "Librarian":** [pnpm](https://pnpm.io/) (Workspaces)

---

## 🚀 Quick Start: The One-Command Experience

In this monorepo, you don't need to open five terminal tabs. You can start the entire ecosystem—backend, frontend, and documentation—with a single command from the root.

1. **Install dependencies:**
```bash
pnpm install

```


2. **Start all applications in parallel:**
```bash
pnpm dev

```



> **Note:** Turborepo will automatically prefix your logs (e.g., `backend:`, `web:`) so you can monitor all services in one place.

---

## 📂 Project Structure

### Apps

* `apps/backend`: A **NestJS** API (The data powerhouse).
* `apps/web`: The main **Next.js** consumer application.
* `apps/docs`: A **Next.js** site for project documentation.

### Shared Packages

* `@repo/types`: **The Source of Truth.** Shared TypeScript interfaces (like `User`) used by both Backend and Frontend to ensure type safety.
* `@repo/ui`: A shared React component library (Buttons, Cards, etc.).
* `@repo/typescript-config`: Shared `tsconfig.json` profiles.
* `@repo/eslint-config`: Unified linting rules to keep code consistent.

---

## 🛠️ Development Workflow

### Adding Dependencies

To keep the monorepo clean, always add packages from the **root** using filters:

```bash
# Add a package only to the backend
pnpm add <package-name> --filter backend

# Add a package only to the web app
pnpm add <package-name> --filter web

```

### Running Specific Tasks

If you only want to work on the backend without spinning up the frontend:

```bash
pnpm dev --filter backend

```

### Building for Production

Turbo will intelligently cache your builds. If you haven't changed a package, Turbo will replay the build from the cache in milliseconds.

```bash
pnpm build

```

---

## 🧠 The "Outside View" (Reflexivity)

As a developer in this repo, remember the **Reflexive Principle**:
Even though you are working inside one "app" folder (The Participant), always consider how your changes affect the whole system (The Observer).

* **Changing a Type?** Update it in `@repo/types` so the Backend and Frontend stay in sync.
* **Creating a UI Component?** Put it in `packages/ui` so it can be reused in both `web` and `docs`.