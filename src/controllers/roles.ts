import HttpStatusCodes from "../constants/HttpStatusCodes";
import RoleService from "../services/roles";
import { loggerWithNameSpace } from "../utils/logger";
import { ApiHttpError, ErrorType } from "../error/ApiHttpError";
import { convertToBigInt } from "../utils/bigInt";
import type { Request, Response, NextFunction } from "express";
import type { ICreateRole, IUpdateRole } from "../interfaces";

const logger = loggerWithNameSpace("Role Controller");

export const createRole = async (
  req: Request<{}, {}, Pick<ICreateRole, "name">>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await RoleService.createRole(req.body);
    logger.info(`created role with role id ${role.id}`);

    res.status(HttpStatusCodes.CREATED).json({
      status: "success",
      data: {
        role,
      },
      message: "role created successfully",
    });
  } catch (error) {
    logger.error("create role failed");
    if (error instanceof Error) {
      logger.error(error);
      if (error.name === "NeonDbError") {
        if (
          error.message ===
          'duplicate key value violates unique constraint "roles_slug_unique"'
        ) {
          next(
            new ApiHttpError({
              statusCode: HttpStatusCodes.BAD_REQUEST,
              type: ErrorType.BAD_REQUEST,
              message: "role already exists",
            }),
          );
          return;
        }
      }
    }
    next(error);
  }
};

export const getRoles = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await RoleService.getRoles();
    logger.info(`fetched all roles`);

    res.status(HttpStatusCodes.CREATED).json({
      status: "success",
      data: {
        roles,
      },
      message: "roles fetched successfully",
    });
  } catch (error) {
    logger.error("failed to fetch all roles");
    logger.error(error);
    next(error);
  }
};

export const getRoleById = async (
  req: Request<{ roleId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = convertToBigInt(req.params.roleId);
    if (!roleId) {
      throw new ApiHttpError({
        message: "invalid role id",
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
      });
    }

    const role = await RoleService.getRoleById(roleId);
    logger.info(`fetched role with role id ${role.id}`);

    res.status(HttpStatusCodes.CREATED).json({
      status: "success",
      data: {
        role,
      },
      message: "role fetched successfully",
    });
  } catch (error) {
    logger.error(`failed to fetch role`);
    logger.error(error);
    next(error);
  }
};

export const updateRole = async (
  req: Request<{ roleId: string }, {}, Pick<IUpdateRole, "name">>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = convertToBigInt(req.params.roleId);
    if (!roleId) {
      throw new ApiHttpError({
        message: "invalid role id",
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
      });
    }

    const role = await RoleService.updateRole(roleId, req.body);
    logger.info(`updated role with role id ${role.id}`);

    res.status(HttpStatusCodes.OK).json({
      status: "success",
      data: { role },
      message: "updated role successfully",
    });
  } catch (error) {
    logger.error(`failed to update role`);
    logger.error(error);
    next(error);
  }
};

export const deleteRole = async (
  req: Request<{ roleId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = convertToBigInt(req.params.roleId);
    if (!roleId) {
      throw new ApiHttpError({
        message: "invalid role id",
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
      });
    }

    const role = await RoleService.deleteRole(roleId);
    logger.info(`deleted role with role id ${role.id}`);

    res.status(HttpStatusCodes.CREATED).json({
      status: "success",
      data: {
        role,
      },
      message: "role deleted successfully",
    });
  } catch (error) {
    logger.error(`failed to fetch role`);
    logger.error(error);
    next(error);
  }
};
