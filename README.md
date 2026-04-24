# MOB FT 2026 - Web OHO

Professional portal for the Open House Ormawa (OHO) event during Masa Orientasi Bersama (MOB) FT 2026 at Universitas Surabaya.

📌 Overview
Web OHO serves as a dedicated platform for managing the Open House Ormawa (OHO) event. It provides a gamified experience where students can explore different organizations, participate in quizzes, and track their participation status, all while maintaining a unified authentication state within the MOB FT 2026 digital ecosystem.

Core Responsibilities

- **Quiz Engine:** Manages interactive, time-limited quizzes for each Ormawa.
- **Participation Tracking:** Tracks user progress, quiz completions, and session timeouts.

🛠️ Tech Stack & Tooling
| Category | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router + Turbopack) |
| Styling | Tailwind CSS v4 + DaisyUI Components |
| Database | MySQL |
| ORM | Drizzle ORM |
| Auth | NextAuth.js |
| Quality | ESLint, Prettier, TypeScript (Strict) |
| Workflow | Husky, Lint-Staged, Commitlint (Conventional Commits) |

🚀 Getting Started
Prerequisites

- **Node.js:** >= 20.x
- **Package Manager:** npm
- **Database:** MySQL Server (Local or Dockerized)
- **Editor:** VS Code (Recommended Extensions: Tailwind CSS IntelliSense, Prettier, ESLint)

Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Beyolandr7/MOBFT26-WebOHO.git
    cd MOBFT26-WebOHO
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:** Copy the example environment file and configure your local variables:
    ```bash
    cp .env.example .env
    ```
    Modify `.env` and provide valid values for:
    - `DATABASE_URL`
    - `NEXTAUTH_SECRET` (Generate using `openssl rand -base64 32`)
4.  **Initialize Husky Hooks:**
    ```bash
    npm run prepare
    ```
5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The portal will be available at `http://localhost:3000`.

📜 Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement.
- `npm run build`: Generates the production build.
- `npm run start`: Starts the production server.
- `npm run typecheck`: Performs full static type checking with TypeScript.
- `npm run lint`: Analyzes the codebase for potential errors and styling issues.
- `npm run db:push`: Syncs the Drizzle schema with the database.
- `npm run db:studio`: Opens Drizzle Studio for database management.

🏗️ Development Workflow
Conventions

- **Language:** Source code and comments are in English. UI content is in Bahasa Indonesia.
- **Naming:**
  - `camelCase`: Functions, variables, and hooks.
  - `PascalCase`: React components and Types.
  - `kebab-case`: File and directory names.

Git Strategy

- **Branches:** `feat/*`, `fix/*`, `chore/*`, `refactor/*`.
- **Commits:** Follow Conventional Commits format.
- **Example:** `feat: add quiz submission logic` or `fix: resolve session timeout mismatch`.
- **Pre-commit:** The system automatically runs `npm run typecheck`, Prettier, and ESLint on staged files.

📚 References & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [DaisyUI Components](https://daisyui.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NextAuth.js](https://next-auth.js.org/)

Developed with 🤎 by KOORWA ITD MOB FT 2026.
