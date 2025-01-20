import type { Request, Response, NextFunction } from "express";
import { loggerWithNameSpace } from "../utils/logger";

const logger = loggerWithNameSpace("RequestLogger");

/**
 * logs the http method and url of the request
 *
 * ..param {Request} req - The request object
 * ..param {Response} res - The response object
 * ..param {NextFunction} next - The next middleware function
 * ..returns {void}
 */
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info("", { method: req.method, url: req.url });
    next();
};

export { requestLogger };
