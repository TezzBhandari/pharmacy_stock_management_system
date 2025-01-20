import bcrypt from "bcrypt";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import AuthRepo from "../repository/auth";
import UserService from "./users";
import { ApiHttpError, ErrorType } from "../error/ApiHttpError";
import { issueJWT } from "../utils/jwt";
import { loggerWithNameSpace } from "../utils/logger";
import { snowflake } from "../utils/snowflake";
import type { IAuthUser, ICreateAuth } from "../interfaces/auth";

const logger = loggerWithNameSpace("Auth Service");

export default class AuthService {
  private constructor() {}

  static async login(body: IAuthUser) {
    const existingUser = await UserService.getUserByEmailOrUsername(
      body.username,
    );

    if (!existingUser) {
      logger.error(`User with email ${body.username} not found`);
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
        message: "invalid credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(
      body.password,
      existingUser.password,
    );

    if (!isValidPassword) {
      logger.error(
        `Password is not valid for the user with email ${body.username}`,
      );
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        type: ErrorType.BAD_REQUEST,
        message: "invalid credentials",
      });
    }

    const userInfoPayload = {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    };

    const accessToken = issueJWT({
      payload: userInfoPayload,
      options: {
        expiresIn: 5 * 60 * 1000,
      },
    });

    const refreshToken = issueJWT({
      payload: userInfoPayload,
      options: {
        expiresIn: 2 * 24 * 60 * 60 * 1000,
      },
    });

    const sessionId = await this.addSession({
      userId: existingUser.id,
      ip: body.ip,
      refreshToken,
    });

    logger.info("Generated Access Token and Refresh Token");
    return {
      accessToken,
      sessionId: sessionId,
      user: userInfoPayload,
    };
  }

  static async addSession(
    session: Pick<ICreateAuth, "userId" | "ip" | "refreshToken">,
  ) {
    const currentTimestamp = new Date().toUTCString();
    const newSession = {
      id: snowflake.nextId(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      ...session,
    };

    const createdSession = await AuthRepo.createAuth(newSession);
    if (createdSession.length === 0) {
      logger.error("session creation failure");
      throw new ApiHttpError({
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        type: ErrorType.INTERNAL_SERVER_ERROR,
        message: "something went wrong. try again",
      });
    }
    return createdSession[0].id;
  }
}
