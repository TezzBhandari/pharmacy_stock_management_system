import { bigint, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersRoles } from "./users_roles";

export const roles = pgTable("roles", {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),

    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const roleRelations = relations(roles, ({ many }) => ({
    users: many(usersRoles),
}));
