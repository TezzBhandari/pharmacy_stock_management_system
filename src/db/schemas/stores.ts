import { pgTable, bigint, varchar, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { users } from "./users";
import { tenants } from "./tenants";

export const stores = pgTable("stores", {
    id: bigint("id", {
        mode: "bigint",
    }).primaryKey(),

    name: varchar("name", {
        length: 100,
    }).notNull(),

    tenantId: bigint("tenant_id", { mode: "bigint" }).references(
        () => tenants.id,
    ),

    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const storeRelations = relations(stores, ({ many }) => ({
    users: many(users),
}));
