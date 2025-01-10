import type { Request, Response, NextFunction } from "express";
import AuthService from "../services/authenticate";
import { IAuthUser } from "../interfaces/auth";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { loggerWithNameSpace } from "../utils/logger";

const logger = loggerWithNameSpace("auth controller");

export const login = async (
    req: Request<{}, {}, Pick<IAuthUser, "username" | "password">>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authUser: IAuthUser = {
            username: req.body.username,
            password: req.body.password,
            ip: req.ip,
        };

        const { accessToken, sessionId, user } = await AuthService.login(authUser);
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 5 * 60 * 1000),
        });

        res.status(HttpStatusCodes.OK).json({
            accessToken,
            user,
        });
    } catch (error) {
        logger.error("login failed");
        logger.error(error);
        next(error);
    }
};
