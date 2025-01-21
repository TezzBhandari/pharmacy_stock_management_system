import {
  pgTable,
  pgEnum,
  bigint,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { users } from "./users";

export const tenantTierEnum = pgEnum("tenant_tier", ["basic", "premium"]);

export const tenants = pgTable("tenants", {
  id: bigint("id", {
    mode: "bigint",
  }).primaryKey(),

  organizationName: varchar("organization_name", {
    length: 100,
  }).notNull(),

  tier: tenantTierEnum("tier").notNull().default("basic"),

  createdAt: timestamp("created_at", { mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const tenantRelations = relations(tenants, ({ many }) => ({
  users: many(users),
}));
