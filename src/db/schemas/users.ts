import {
    pgTable,
    pgEnum,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { auths } from "./auths";

export const userRoleEnum = pgEnum("user_role", ["admin", "customer"]);

export const users = pgTable("users", {
    id: bigint("id", {
        mode: "bigint",
    }).primaryKey(),

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
    userRole: userRoleEnum("user_role").notNull().default("customer"),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    auths: many(auths),
}));
