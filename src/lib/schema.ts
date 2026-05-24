import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  date,
  jsonb,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const teams = pgTable("teams", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  plan: text("plan").notNull().default("team"),
  ownerId: uuid("owner_id").notNull(),
  seatLimit: integer("seat_limit").default(5),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").unique().notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  plan: text("plan").notNull().default("free"),
  passwordHash: text("password_hash"),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  teamId: uuid("team_id").references(() => teams.id),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const generations = pgTable("generations", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  prospectInfo: text("prospect_info").notNull(),
  senderContext: text("sender_context"),
  companyUrl: text("company_url"),
  linkedinUrl: text("linkedin_url"),
  pdfFilename: text("pdf_filename"),
  emailsJson: jsonb("emails_json").notNull(),
  model: text("model").default("claude-sonnet-4-6"),
  tokensUsed: integer("tokens_used"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const usage = pgTable(
  "usage",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    periodStart: date("period_start").notNull(),
    periodEnd: date("period_end").notNull(),
    emailsGenerated: integer("emails_generated").notNull().default(0),
    emailsLimit: integer("emails_limit").notNull(),
  },
  (table) => [unique().on(table.userId, table.periodStart)]
);

export const events = pgTable("events", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id),
  sessionId: text("session_id"),
  eventType: text("event_type").notNull(),
  page: text("page"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const apiKeys = pgTable("api_keys", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  keyHash: text("key_hash").notNull().unique(),
  keyPrefix: text("key_prefix").notNull(),
  name: text("name"),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").default(sql`now()`),
  revokedAt: timestamp("revoked_at"),
});

// Inferred types
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Generation = typeof generations.$inferSelect;
export type NewGeneration = typeof generations.$inferInsert;

export type Usage = typeof usage.$inferSelect;
export type NewUsage = typeof usage.$inferInsert;

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
