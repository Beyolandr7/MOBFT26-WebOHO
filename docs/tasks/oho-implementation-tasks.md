# OHO Implementation Tasks

Implementation roadmap for the OHO Quiz & Gamification system based on the [OHO Quiz Module Requirements](../requirements/oho_quiz_module.md).

## Phase 1: Database & Data Foundation

- [ ] **Schema Completion**: Ensure `schema.ts` includes all tables: `ormawas`, `questions`, `question_answers`, `answers`, `logs`, and `start_time`.
- [ ] **Migration & Push**: Execute `npm run db:push` to synchronize the local MySQL database with the updated Drizzle schema.
- [ ] **Seeding Script**: Create `src/db/seed.ts` to populate the 13 Ormawas and their corresponding quiz questions from the provided content.
- [ ] **Drizzle Studio Validation**: Use `npm run db:studio` to verify that the tables are correctly created and seeded.

## Phase 2: Core Backend & API Logic

- [ ] **Quiz Data Fetcher**: Implement `GET /api/quiz/[code]` to retrieve ormawa info and questions (excluding the `isCorrect` field for security).
- [ ] **Submission Handler**: Implement `POST /api/quiz/[code]/submit`:
  - [ ] Validate that all questions were answered.
  - [ ] Check for existing "Completed" log to prevent double submission.
  - [ ] Compare current time with `start_time` to enforce session timeouts.
  - [ ] Save individual responses to `answers` table.
  - [ ] Create a "Completed" entry in the `logs` table.
- [ ] **Progress API**: Implement `GET /api/progress` to return a list of completed ormawa IDs for the current user.

## Phase 3: Authentication & Route Protection

- [ ] **Role Definition**: Ensure `next-auth.d.ts` and the auth config correctly handle the `mahasiswa` and `panitia` roles.
- [ ] **Middleware Guards**: Update `middleware.ts` to:
  - [ ] Redirect unauthenticated users to login.
  - [ ] Prevent users who have already finished a quiz from re-entering the `/quiz/[code]` route.
- [ ] **Auth Context**: Ensure the user role and ID are easily accessible in both Server and Client components.

## Phase 4: Dashboard & Gamification (The Trumpet)

- [ ] **Trumpet Component**: Create a reusable `TrumpetDisplay` component that can render the 13 stones in various states (empty, filled, animated).
- [ ] **Dashboard Integration**: Build the `/dashboard` page to fetch user progress and update the `TrumpetDisplay`.
- [ ] **Milestone Feedback**: Implement a visual celebration or message when a user fills their 13th stone.

## Phase 5: Quiz User Interface

- [ ] **Dynamic Quiz Route**: Build the `/quiz/[code]` page.
- [ ] **Quiz Layout**: Implement the single-page list format:
  - [ ] Header with Ormawa name and logo.
  - [ ] Numbered list of questions.
  - [ ] Radio group inputs for options A, B, and C.
- [ ] **State Management**: Handle local question answers and show a progress indicator (e.g., "3 of 5 answered").
- [ ] **Submission UX**: Add a sticky "Submit Answers" button and a confirmation dialog.
- [ ] **Success Overlay**: Design a modal or overlay that appears after submission, showing the "Stone Filling" animation.

## Phase 6: Testing & Mobile Optimization

- [ ] **QR Simulation**: Test the flow by manually entering organization codes in the URL.
- [ ] **Mobile Responsiveness**: Ensure the quiz list and the trumpet dashboard are perfectly usable on mobile browsers (small screens).
- [ ] **End-to-End Test**: Simulate a student scanning 13 codes and filling the trumpet stones from start to finish.
