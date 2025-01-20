import { eq, sql } from "drizzle-orm";
import db from "../utils/db";
import { roles } from "../db/schemas";
import type { ICreateRole, IUpdateRole } from "../interfaces";

export default class RoleRepo {
  private constructor() {}

  static createRole(role: ICreateRole) {
    return db
      .insert(roles)
      .values({
        id: sql.placeholder("id"),
        name: sql.placeholder("name"),
        slug: sql.placeholder("slug"),
        createdAt: sql.placeholder("createdAt"),
        updatedAt: sql.placeholder("updatedAt"),
      })
      .returning({
        id: roles.id,
        name: roles.name,
        slug: roles.slug,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .prepare("insert_role")
      .execute({
        id: role.id,
        name: role.name,
        slug: role.slug,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      });
  }

  static async getRoleById(roleId: bigint) {
    return await db.query.roles
      .findFirst({
        where: (roles, { eq }) => eq(roles.id, sql.placeholder("roleId")),
      })
      .prepare("get_role_by_id")
      .execute({ roleId });
  }

  static async getRoles() {
    return await db.query.roles.findMany().prepare("get_roles").execute();
  }

  static async updateRole(roleId: bigint, updateRole: IUpdateRole) {
    return db
      .update(roles)
      .set({
        name: updateRole.name,
        updatedAt: updateRole.updatedAt,
      })
      .where(eq(roles.id, sql.placeholder("roleId")))
      .returning({
        id: roles.id,
        name: roles.name,
        slug: roles.slug,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .prepare("update_role")
      .execute({ roleId });
  }

  static async deleteRole(roleId: bigint) {
    return await db
      .delete(roles)
      .where(eq(roles.id, sql.placeholder("roleId")))
      .returning({ id: roles.id, name: roles.name })
      .prepare("delete_role")
      .execute({ roleId });
  }
}
