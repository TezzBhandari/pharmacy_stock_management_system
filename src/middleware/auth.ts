import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { ApiHttpError, ErrorType } from "../error/ApiHttpError";
import type { Request } from "../interfaces/auth";
import type { Response, NextFunction } from "express";

const pathToPublicKey = path.join(__dirname + "/../keys/id_rsa_pub.pem");

const publicKey = fs.readFileSync(pathToPublicKey, "utf-8");

/**
 * Middleware function for authenticating requests.
 * Checks the Authorization header for a valid JWT token.
 * If the token is valid, sets `req.jwt` with the decoded token and calls the next middleware.
 * If the token is invalid or missing, sends an UNAUTHORIZED response.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @throws {Error} If there's an error during JWT verification.
 * @returns {Promise<void>}
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(HttpStatusCodes.UNAUTHORIZED).json({
                error: "unauthorized",
            });
            return;
        }

        const tokenParts = authHeader.split(" ");

        if (tokenParts.length !== 2) {
            res.status(HttpStatusCodes.UNAUTHORIZED).json({
                error: "unauthorized",
            });
            return;
        }

        if (
            tokenParts[0] === "Bearer" &&
            tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
        ) {
            const verification = jwt.verify(tokenParts[1], publicKey, {
                algorithms: ["RS256"],
            });

            req.user = verification as {
                id: bigint;
                username: string;
                email: string;
                role: "admin" | "customer";
            };
            next();
        } else {
            res.status(HttpStatusCodes.UNAUTHORIZED).json({
                error: "unauthorized",
            });
        }
    } catch (error) {
        next(error);
    }
};

export const verifyRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const refreshToken = req.headers["refresh-token"] as string;

        if (!refreshToken) {
            throw new ApiHttpError({
                statusCode: HttpStatusCodes.UNAUTHORIZED,
                message: "unauthorized",
                type: ErrorType.UNAUTHORIZED,
            });
        }

        const refreshTokenVerification = jwt.verify(refreshToken, publicKey, {
            algorithms: ["RS256"],
        });

        req.user = refreshTokenVerification as {
            id: bigint;
            username: string;
            email: string;
            role: "admin" | "customer";
        };
        next();
    } catch (error) {
        next(error);
    }
};

export const authorizePermission = (allowedRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRole = req.user.role;
            if (allowedRole === userRole) {
                next();
            } else {
                res.status(HttpStatusCodes.FORBIDDEN).json({
                    error: "forbidden",
                });
            }
        } catch (error) {
            next(error);
        }
    };
};
