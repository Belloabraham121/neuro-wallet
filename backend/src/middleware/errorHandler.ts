import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let code = err.code || "INTERNAL_ERROR";

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    statusCode,
  });

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    code = "VALIDATION_ERROR";
  }

  if (err.name === "UnauthorizedError" || err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Unauthorized";
    code = "UNAUTHORIZED";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    code = "TOKEN_EXPIRED";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    code = "INVALID_ID";
  }

  // Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    const prismaError = err as any;
    if (prismaError.code === "P2002") {
      statusCode = 409;
      message = "Resource already exists";
      code = "DUPLICATE_RESOURCE";
    } else if (prismaError.code === "P2025") {
      statusCode = 404;
      message = "Resource not found";
      code = "RESOURCE_NOT_FOUND";
    }
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Something went wrong";
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
        details: err,
      }),
    },
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });
};

export default errorHandler;
