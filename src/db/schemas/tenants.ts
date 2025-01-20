import {
    pgTable,
    pgEnum,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { users } from "./users";

export const tenantPlanEnum = pgEnum("tenant_plan", ["basic", "premium"]);

export const tenants = pgTable("tenants", {
    id: bigint("id", {
        mode: "bigint",
    }).primaryKey(),

    organizationName: varchar("organization_name", {
        length: 100,
    }).notNull(),

    plan: tenantPlanEnum("plan").notNull().default("basic"),

    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const tenantRelations = relations(tenants, ({ many }) => ({
    users: many(users),
}));
