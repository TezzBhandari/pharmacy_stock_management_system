import { z } from "zod";
import { loggerWithNameSpace } from "../utils/logger";
import { ApiHttpError } from "../error/ApiHttpError";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import zodErrorFormatter from "../utils/zodErrorFormat";
import type { Request, Response, NextFunction } from "express";
import { DrizzleError } from "drizzle-orm";

const logger = loggerWithNameSpace("Error Handler middleware");

/**
 * middleware: handles the case when a resource is not found
 *
 * ..param {Request} req - the request object
 * ..param {Response} res - the response object
 * ..param {NextFunction} next - the  object
 * ..returns {Response} The HTTP response with a status code of 404 and a JSON object containing the error message.
 */
export const notFoundError = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error("Resource Not Found");
  res.status(HttpStatusCodes.NOT_FOUND).json({
    error: "resource not found",
  });
  return;
};

export const genericErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiHttpError) {
    logger.error(err.message);
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  if (err instanceof z.ZodError) {
    logger.error("input validator zod error");
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "invalid input",
      errors: zodErrorFormatter(err),
    });
    return;
  }

  logger.error(err);
  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "internal server error",
  });
  return;
};
