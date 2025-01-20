import { pgTable, bigint, varchar, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { auths } from "./auths";
import { tenants } from "./tenants";
import { usersRoles } from "./users_roles";

export const users = pgTable("users", {
    id: bigint("id", {
        mode: "bigint",
    }).primaryKey(),

    tenantId: bigint("tenant_id", { mode: "bigint" })
        .notNull()
        .references(() => tenants.id),

    fullname: varchar("fullname", {
        length: 100,
    }).notNull(),

    username: varchar("username", {
        length: 20,
    })
        .notNull()
        .unique(),

    email: varchar("email", {
        length: 255,
    })
        .notNull()
        .unique(),

    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const userRelations = relations(users, ({ many, one }) => ({
    auths: many(auths),
    tenant: one(tenants, {
        fields: [users.tenantId],
        references: [tenants.id],
    }),
    roles: many(usersRoles),
}));
