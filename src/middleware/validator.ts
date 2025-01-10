import { loggerWithNameSpace } from "../utils/logger";
import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

const logger = loggerWithNameSpace("input validator middleware");

/**
 * Validates the body of a request using the provided schema.
 *
 * @param {Schema} schema - The schema to validate the body parameters against.
 * @return {Function} A middleware function that validates the request body and passes it to the next middleware.
 */
export const validateReqBody = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        logger.info("validating request body schema");
        const result = schema.safeParse(req.body);
        if (result.success) {
            logger.info("request body schema validated successfully");
            req.body = result.data;
            next();
        } else {
            logger.error("invalid request body schema");
            next(result.error);
        }
    };
};

/**
 * Validates the query of a request using the provided schema.
 *
 * @param {Schema} schema - The schema to validate the query parameters against.
 * @return {Function} A middleware function that validates the request query and passes it to the next middleware.
 */

export const validateReqQuery = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        logger.info("validating request query schema");
        const result = schema.safeParse(req.query);
        if (result.success) {
            logger.info("reqeust query schema validated successfully");
            req.query = result.data;
            next();
        } else {
            logger.error("invalid request query schema");
            next(result.error);
        }
    };
};

/**
 * Validates the params of a request using the provided schema.
 *
 * @param {Schema} schema - The schema to validate the params parameters against.
 * @return {Function} A middleware function that validates the request params and passes it to the next middleware.
 */
export const validateReqParams = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        logger.info("validating request params schema");
        const result = schema.safeParse(req.params);
        if (result.success) {
            logger.info("reqeust params schema validated successfully");
            req.params = result.data;
            next();
        } else {
            logger.error("invalid request params schema");
            next(result.error);
        }
    };
};
