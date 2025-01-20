import { sql } from "drizzle-orm";
import db from "../utils/db";
import { tenants } from "../db/schemas";
import type { ICreateTenant } from "../interfaces";

export default class TenantRepo {
  private constructor() {}

  static async getTenantById(tenantId: bigint) {
    return await db.query.tenants
      .findFirst({
        where: (tenants, { eq }) => eq(tenants.id, sql.placeholder("tenantId")),
      })
      .prepare("get_tenant_by_id")
      .execute({ tenantId });
  }

  static createTenant(tenant: ICreateTenant) {
    return db
      .insert(tenants)
      .values({
        id: sql.placeholder("id"),
        name: sql.placeholder("address"),
        address: sql.placeholder("address"),
        createdAt: sql.placeholder("createdAt"),
        updatedAt: sql.placeholder("updatedAt"),
      })
      .returning({
        id: tenants.id,
      })
      .prepare("insert_tenant")
      .execute({
        id: tenant.id,
        name: tenant.name,
        address: tenant.address,
        createdAt: tenant.createdAt,
        updatedAt: tenant.updatedAt,
      });
  }
}
