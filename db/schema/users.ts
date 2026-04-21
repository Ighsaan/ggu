import { pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id, {
      onDelete: "cascade",
    })
    .notNull(),
  email: text("email"),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  provider: text("provider"),
  lastSignInAt: timestamp("last_sign_in_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type AppUser = typeof users.$inferSelect;
export type NewAppUser = typeof users.$inferInsert;
