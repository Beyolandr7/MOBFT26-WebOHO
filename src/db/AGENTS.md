# AGENTS: Database & Schema Management

## 🎯 Objective
Guidance for managing the MySQL database schema and Drizzle ORM implementation.

## 🧠 Context & Rules

### 1. Schema Truth
- **`src/db/schema.ts`** is the absolute source of truth.
- When adding new tables or columns, always update this file first.
- Use descriptive names for indexes and foreign keys.

### 2. Relationship Management
- **Ormawas <-> Questions**: 1-to-Many.
- **Questions <-> Options**: 1-to-Many.
- **Users <-> Answers**: 1-to-Many.
- **Users <-> Logs**: 1-to-Many (tracks completion per ormawa).

### 3. Migration Workflow
- Use `npm run db:push` for local development to sync changes quickly.
- Do not manually edit the MySQL database schema using external tools; always use Drizzle Kit.

### 4. Data Constraints
- **Uniqueness**: Ensure `ormawa.code` is unique as it is used for QR routing.
- **Cascading**: Use `onDelete: "cascade"` for questions and answers to ensure data cleanup if an ormawa is removed.
- **Booleans**: Use `tinyint("is_correct")` for boolean values in MySQL.

### 5. Seeding
- Maintain a `src/db/seed.ts` file for populating the 13 ormawas.
- Ensure the seed data is deterministic to prevent duplicate entries during development.
