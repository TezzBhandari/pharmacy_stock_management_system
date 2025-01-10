import { bigint, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const auths = pgTable("auths", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    userId: bigint("user_id", { mode: "bigint" })
        .notNull()
        .references(() => users.id),
    refreshToken: varchar("refresh_token", { length: 881 }).notNull(),
    ip: varchar("ip", { length: 30 }),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const authsRelations = relations(auths, ({ one }) => ({
    user: one(users, {
        fields: [auths.userId],
        references: [users.id],
    }),
}));
