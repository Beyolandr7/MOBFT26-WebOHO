# Foundation - OHO Quiz & Gamification Module

Framework used: Next.js 16 (App Router) with Drizzle ORM and NextAuth.js.

## Roles and Access

- `mahasiswa`: The primary participant. Can scan QR codes, view the trumpet dashboard, and take quizzes.
- `mahasiswa` can only view their own quiz results and overall "Trumpet" progress.
- `panitia`: Management role. Can view logs, monitor participant progress, and manage Ormawa/Question data.
- `team`: Technical role with full system access (Superadmin).
- Access control is implemented via `middleware.ts` and `next-auth` session validation.

## Data Ownership

- `users`: Managed via NextAuth, stores role and basic identification.
- `ormawas`: Managed by Panitia/Team. Contains the 13 student organizations.
- `questions` & `question_answers`: Managed by Panitia. Defines the quiz content per ormawa.
- `answers`: Owned by Mahasiswa (system-generated on submission).
- `logs`: System-managed. Records quiz completion events.
- `start_time`: System-managed. Tracks the duration of a quiz session.

## Schema

### Table `ormawas`

| Column     | Description                                                   |
| :--------- | :------------------------------------------------------------ |
| `name`     | Name of the Student Organization (Ormawa).                    |
| `code`     | Unique identifier used in QR code URLs (e.g., `HMM`, `HMTK`). |
| `img_logo` | URL or path to the organization's logo.                       |

### Table `questions`

| Column      | Description                                                |
| :---------- | :--------------------------------------------------------- |
| `question`  | The quiz question text.                                    |
| `ormawa_id` | FK to `ormawas`. Each ormawa has its own set of questions. |

### Table `question_answers` (Options)

| Column        | Description                                                   |
| :------------ | :------------------------------------------------------------ |
| `question_id` | FK to `questions`.                                            |
| `answer_text` | The text for the multiple-choice option.                      |
| `is_correct`  | Boolean (0/1). Indicates if the option is the correct answer. |

### Table `logs` (Progress Tracking)

| Column        | Description                                        |
| :------------ | :------------------------------------------------- |
| `user_id`     | FK to `users`.                                     |
| `ormawa_id`   | FK to `ormawas`.                                   |
| `description` | Status of the quiz: `"Completed"` or `"Times Up"`. |

## Validation and Data Rules

- **Access via QR**: Quizzes are accessed via a URL like `/quiz/[ormawa-code]`.
- **Completion Criteria**: A quiz is marked "Completed" when a user submits answers for all questions associated with that `ormawa_id`.
- **Single Attempt**: Once a record exists in `logs` with `description: "Completed"` for a specific user and ormawa, the user cannot re-enter that quiz.
- **Session Timing**: A `start_time` entry is created when a user first opens a quiz. Submissions after a certain threshold (e.g., 5-10 minutes) may be rejected or marked as `"Times Up"`.

## Gamification: The Trumpet of Stones

- **The Visual**: The main dashboard (`/dashboard`) features a large "Trumpet" illustration.
- **The Stones**: The trumpet has 13 missing "stones" or slots, representing the 13 Ormawas.
- **Progress Logic**:
  - The system counts the number of unique ormawas completed by the user: `SELECT COUNT(DISTINCT ormawa_id) FROM logs WHERE user_id = ? AND description = 'Completed'`.
  - For each completed quiz, one stone in the trumpet UI is "lit up" or filled with a gem.
  - Reaching 13/13 stones unlocks a special "Completion" state or animation.

## API Surface

- `GET /api/quiz/:code`: Fetches the ormawa details and the list of questions (without revealing `is_correct` values).
- `POST /api/quiz/:code/submit`: Processes the array of answers. Validates against the `start_time` and creates entries in `answers` and `logs`.
- `GET /api/progress`: Returns a JSON object containing the list of completed `ormawa_id`s for the logged-in user to render the trumpet state.

## UI Surface

- **Main Dashboard (`/`)**: Displays the 13-stone Trumpet. Shows current progress (e.g., "5/13 Ormawas Visited").
- **Quiz Page (`/quiz/[code]`)**: A single-page list format (as per the example).
  - Numbered questions.
  - Horizontal or vertical radio groups for options (A, B, C).
  - Sticky "Submit Quiz" button at the bottom.
- **Success Overlay**: Triggered after submission, showing which stone was just filled.

## Route Guards

- `middleware.ts` ensures only logged-in users with the correct role can access the quiz pages.
- Redirects users who have already completed a specific quiz back to the dashboard if they try to access the quiz URL again.
