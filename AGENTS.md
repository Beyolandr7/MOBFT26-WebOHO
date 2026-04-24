# Project Context: MOB FT 2026 - Web OHO

This repository is for the **Web OHO** (Open House & Ormawa) platform, part of the MOB FT 2026 ecosystem at Universitas Surabaya.

## 🤖 Critical Instructions for AI Agents

To ensure consistency and prevent hallucinations, follow these rules strictly:

### 1. Architectural Alignment
- **Framework**: Next.js 16 (App Router) with Turbopack.
- **Styling**: Tailwind CSS v4 + DaisyUI. Use vanilla CSS/Tailwind utilities; avoid external UI libraries unless requested.
- **ORM**: Drizzle ORM with MySQL. Always refer to `src/db/schema.ts` for the source of truth.
- **Auth**: NextAuth.js. Roles are `mahasiswa`, `panitia`, and `team`.

### 2. Core Business Logic
- **The Trumpet**: The main gamification element is a "Trumpet" with **13 missing stones**.
- **Progress**: A stone is filled only when a user has a `logs` entry with `description: "Completed"` for a specific Ormawa.
- **Quiz Access**: Users MUST access quizzes via QR codes (URLs like `/quiz/[ormawa-code]`).
- **Single Page Quiz**: Quizzes are rendered as a single-page list of questions (not one-by-one).

### 3. Coding Standards
- **Naming**: 
  - `camelCase` for functions, variables, and hooks.
  - `PascalCase` for React components and Types.
  - `kebab-case` for file and directory names.
- **Type Safety**: TypeScript (Strict) is mandatory. No `any` types.
- **Imports**: Use absolute imports with the `@/` alias (e.g., `@/db/schema`).

### 4. Visual Excellence
- **Mobile First**: The primary use case is mobile (scanning QR codes on-site). Design for small screens first.
- **Aesthetics**: Follow modern design principles (gradients, smooth transitions, DaisyUI themes).
- **Assets**: Never use placeholder images. If an asset is missing, use the provided tools to generate or search for it.

## 📂 Important Directories
- `docs/`: Contains [Requirements](./docs/requirements/oho_quiz_module.md) and [Tasks](./docs/tasks/oho_implementation_tasks.md). Always check these before implementation.
- `src/app/`: Application routes and pages.
- `src/db/`: Database schema, client, and migrations.
- `src/lib/`: Shared utility functions and schemas.

## 🛠️ Task Execution
Before starting a task, cross-reference the `docs/tasks/oho_implementation_tasks.md` to ensure you are not duplicating work or deviating from the roadmap.
