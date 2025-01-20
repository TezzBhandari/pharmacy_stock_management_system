import { loggerWithNameSpace } from "../utils/logger";
import UserService from "../services/users";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import type { Request, Response, NextFunction } from "express";
import type { ICreateUser } from "../interfaces/user";

const logger = loggerWithNameSpace("User Controller");

export const createUser = async (
  req: Request<
    {},
    {},
    Pick<
      ICreateUser,
      "username" | "fullname" | "email" | "password" | "tenantId"
    >
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = await UserService.createUser(req.body);
    logger.info(`user created; userId: ${userId}`);
    res.status(HttpStatusCodes.CREATED).json({
      message: "user created successfully",
    });
  } catch (error) {
    logger.error("create user failed");
    logger.error(error);
    next(error);
  }
};
