import { sql } from "drizzle-orm";
import db from "../utils/db";
import { tenants, users, usersRoles } from "../db/schemas";
import type { IOnboarding } from "../interfaces";

export default class OnboardingRepo {
  private constructor() {}

  static onboarding(onBoard: IOnboarding) {
    return db.transaction(async (tx) => {
      // Step 1: Create Tenant
      const tenant = await tx
        .insert(tenants)
        .values({
          id: sql.placeholder("id"),
          organizationName: sql.placeholder("organizationName"),
          tier: sql.placeholder("tier"),
          createdAt: sql.placeholder("createdAt"),
          updatedAt: sql.placeholder("updatedAt"),
        })
        .returning({
          id: tenants.id,
          organizationName: tenants.organizationName,
          tier: tenants.tier,
          createdAt: tenants.createdAt,
          updatedAt: tenants.updatedAt,
        })
        .prepare("insert_tenant")
        .execute({
          id: onBoard.id,
          organizationName: onBoard.organizationName,
          tier: onBoard.tier,
          createdAt: onBoard.createdAt,
          updatedAt: onBoard.updatedAt,
        });

      if (tenant.length === 0) {
        tx.rollback();
        return null;
      }

      // Step 2: Create User
      const tenantOwner = await tx
        .insert(users)
        .values({
          id: sql.placeholder("id"),
          fullname: sql.placeholder("fullname"),
          username: sql.placeholder("username"),
          email: sql.placeholder("email"),
          password: sql.placeholder("password"),
          tenantId: sql.placeholder("tenantId"),
          createdAt: sql.placeholder("createdAt"),
          updatedAt: sql.placeholder("updatedAt"),
        })
        .returning({
          id: users.id,
          fullname: users.fullname,
          username: users.username,
          email: users.email,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .prepare("insert_user")
        .execute({
          id: onBoard.owner.id,
          fullname: onBoard.owner.fullname,
          username: onBoard.owner.username,
          email: onBoard.owner.email,
          password: onBoard.owner.password,
          tenantId: tenant[0].id,
          createdAt: onBoard.owner.createdAt,
          updatedAt: onBoard.owner.updatedAt,
        });

      if (tenantOwner.length === 0) {
        tx.rollback();
        return null;
      }

      const ownerRole = await tx.query.roles
        .findFirst({
          where: (roles, { eq }) => eq(roles.slug, sql.placeholder("roleSlug")),
        })
        .prepare("get_role_by_slug")
        .execute({ roleSlug: "owner" });

      if (!ownerRole) {
        tx.rollback();
        return null;
      }

      const assignRole = await tx
        .insert(usersRoles)
        .values({
          roleId: sql.placeholder("roleId"),
          userId: sql.placeholder("userId"),
        })
        .returning({
          userId: usersRoles.userId,
          roleId: usersRoles.roleId,
        })
        .prepare("assign_role")
        .execute({ roleId: ownerRole.id, userId: tenantOwner[0].id });

      if (!assignRole) {
        tx.rollback();
        return null;
      }

      return {
        ...tenant[0],
        owner: tenantOwner[0],
      };
    });
  }
}
