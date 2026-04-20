import {
  mysqlTable,
  bigint,
  varchar,
  text,
  datetime,
  timestamp,
  tinyint,
  mysqlEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// 1. Users
export const users = mysqlTable(
  "users",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: mysqlEnum("role", ["team", "panitia"]).notNull(),
    emailVerifiedAt: datetime("email_verified_at", { mode: "string" }),
    rememberToken: varchar("remember_token", { length: 100 }),
    createdAt: datetime("created_at", { mode: "string" }),
    updatedAt: datetime("updated_at", { mode: "string" }),
  },
  (table) => ({
    usernameKey: uniqueIndex("users_username_unique").on(table.username),
    emailKey: uniqueIndex("users_email_unique").on(table.email),
  })
);

// 2. Ormawas (Student Organizations)
export const ormawas = mysqlTable("ormawas", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 255 }).notNull(),
  imgLogo: varchar("img_logo", { length: 255 }).notNull(),
  createdAt: datetime("created_at", { mode: "string" }),
  updatedAt: datetime("updated_at", { mode: "string" }),
});

// 3. Questions (per Ormawa)
export const questions = mysqlTable(
  "questions",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    question: text("question").notNull(),
    ormawaId: bigint("ormawa_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => ormawas.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: datetime("created_at", { mode: "string" }),
    updatedAt: datetime("updated_at", { mode: "string" }),
  },
  (table) => ({
    ormawaIdx: index("questions_ormawa_id_foreign").on(table.ormawaId),
  })
);

// 4. Question Answers (options for each question)
export const questionAnswers = mysqlTable(
  "question_answers",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    questionId: bigint("question_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => questions.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    answerText: varchar("answer_text", { length: 255 }).notNull(),
    isCorrect: tinyint("is_correct").notNull().default(0),
  },
  (table) => ({
    questionIdx: index("question_answers_question_id_foreign").on(
      table.questionId
    ),
  })
);

// 5. Answers (user-submitted answers)
export const answers = mysqlTable(
  "answers",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    questionId: bigint("question_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => questions.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    answerId: bigint("answer_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => questionAnswers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: datetime("created_at", { mode: "string" }),
    updatedAt: datetime("updated_at", { mode: "string" }),
  },
  (table) => ({
    questionIdx: index("answers_question_id_foreign").on(table.questionId),
    userIdx: index("answers_user_id_foreign").on(table.userId),
    answerIdx: index("answers_answer_id_foreign").on(table.answerId),
  })
);

// 6. Logs (tracks completion / timeout per user per ormawa)
export const logs = mysqlTable(
  "logs",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    ormawaId: bigint("ormawa_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => ormawas.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    description: varchar("description", { length: 255 }).notNull(), // "Completed" | "Times Up"
    createdAt: datetime("created_at", { mode: "string" }),
    updatedAt: datetime("updated_at", { mode: "string" }),
  },
  (table) => ({
    ormawaIdx: index("logs_ormawa_id_foreign").on(table.ormawaId),
    userIdx: index("logs_user_id_foreign").on(table.userId),
  })
);

// 7. Start Time (tracks when a user began an ormawa quiz session)
// NOTE: start_time uses a single timestamp with ON UPDATE — no conflict.
export const startTime = mysqlTable(
  "start_time",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    startTime: timestamp("start_time", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ormawaId: bigint("ormawa_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => ormawas.id, { onDelete: "cascade" }),
    createdAt: datetime("created_at", { mode: "string" }),
    updatedAt: datetime("updated_at", { mode: "string" }),
  },
  (table) => ({
    userIdx: index("start_time_user_id_foreign").on(table.userId),
    ormawaIdx: index("start_time_ormawa_id_foreign").on(table.ormawaId),
  })
);

// 8. Failed Jobs (Laravel artifact — kept for schema parity, not used in Next.js)
export const failedJobs = mysqlTable("failed_jobs", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement()
    .notNull(),
  uuid: varchar("uuid", { length: 255 }).notNull(),
  connection: text("connection").notNull(),
  queue: text("queue").notNull(),
  payload: text("payload").notNull(),
  exception: text("exception").notNull(),
  failedAt: timestamp("failed_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
