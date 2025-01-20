import HttpStatusCodes from "../constants/HttpStatusCodes";
import RoleRepo from "../repository/roles";
import { ApiHttpError, ErrorType } from "../error/ApiHttpError";
import { snowflake } from "../utils/snowflake";
import { loggerWithNameSpace } from "../utils/logger";
import { generateSlug } from "../utils/slug";
import type { ICreateRole, IUpdateRole } from "../interfaces";

const logger = loggerWithNameSpace("Role Service");

export default class RoleService {
  private constructor() {}

  static async getRoleById(roleId: bigint) {
    const role = await RoleRepo.getRoleById(roleId);

    if (!role) {
      logger.error("failed to fetch role");
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.NOT_FOUND,
        type: ErrorType.NOT_FOUND,
        message: "role not found",
      });
    }

    return role;
  }

  static async createRole(role: Pick<ICreateRole, "name">) {
    const currentTimestamp = new Date().toUTCString();
    const slug = generateSlug(role.name);

    const newRole: ICreateRole = {
      ...role,
      slug,
      id: snowflake.nextId(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    const createdRole = await RoleRepo.createRole(newRole);
    if (createdRole.length === 0) {
      logger.error("failed to create role");
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        type: ErrorType.INTERNAL_SERVER_ERROR,
        message: "something went wrong. try again",
      });
    }
    return createdRole[0];
  }

  static async getRoles() {
    return await RoleRepo.getRoles();
  }

  static async deleteRole(roleId: bigint) {
    const role = await RoleRepo.deleteRole(roleId);

    if (role.length === 0) {
      logger.error("failed to delete role");
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
        message: "could not delete role",
      });
    }

    return role[0];
  }

  static async updateRole(roleId: bigint, role: Pick<IUpdateRole, "name">) {
    const existingRole = await this.getRoleById(roleId);

    if (!existingRole) {
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.NOT_FOUND,
        type: ErrorType.NOT_FOUND,
        message: "unknown role id",
      });
    }

    const currentTimestamp = new Date().toUTCString();

    const updatedRole = await RoleRepo.updateRole(roleId, {
      name: role.name,
      updatedAt: currentTimestamp,
    });

    if (updatedRole.length === 0) {
      logger.error("failed to update role");
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
        message: "could not update role",
      });
    }

    return updatedRole[0];
  }
}
