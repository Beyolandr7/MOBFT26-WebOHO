# AGENTS: App Router & Routing Logic

## 🎯 Objective
Guidance for building pages and interactive components within the `src/app` directory.

## 🧠 Context & Rules

### 1. Component Strategy
- **Default to Server Components**: Keep data fetching in Server Components (RSCs) whenever possible.
- **Client Boundary**: Use `"use client"` only for interactive elements (forms, buttons, animations).
- **Layouts**: Use `layout.tsx` for persistent UI like the Navigation or the Dashboard header.

### 2. Specific Routes
- **`/dashboard` (Root)**: Displays the Trumpet. This should be a Server Component that fetches `progress` data and passes it to a Client-side `TrumpetDisplay` component.
- **`/quiz/[code]`**: 
  - Dynamic route based on the ormawa code.
  - Fetches organization info and questions from the DB.
  - Uses a single large form for the list of questions.
- **`/login`**: Standard NextAuth sign-in page.

### 3. Data Fetching
- Fetch data directly in Server Components using `drizzle` queries.
- Do not create `api/` routes for data that is only needed by Server Components.
- Use `api/` routes only for client-side actions (like submitting a quiz) or real-time progress updates.

### 4. Interactive Quizzes
- The quiz page should manage its state locally (selected answers).
- Show a "Success" overlay or redirect to the dashboard upon completion.
- Implement a countdown timer if the session has a limit.
