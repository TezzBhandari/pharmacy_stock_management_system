import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { roles } from "./roles";

export const usersRoles = pgTable(
    "users_roles",
    {
        userId: bigint("user_id", { mode: "bigint" })
            .references(() => users.id)
            .notNull(),

        roleId: bigint("role_id", { mode: "bigint" })
            .references(() => roles.id)
            .notNull(),
    },
    (table) => ({
        pk: primaryKey({
            name: "users_roles_pkey",
            columns: [table.roleId, table.userId],
        }),
    }),
);

export const userRoleRelations = relations(usersRoles, ({ one }) => ({
    user: one(users, {
        fields: [usersRoles.userId],
        references: [users.id],
    }),

    role: one(roles, {
        fields: [usersRoles.roleId],
        references: [roles.id],
    }),
}));
