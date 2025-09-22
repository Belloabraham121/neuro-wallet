"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let code = err.code || "INTERNAL_ERROR";
    logger_1.logger.error({
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        statusCode,
    });
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
    if (err.name === "PrismaClientKnownRequestError") {
        const prismaError = err;
        if (prismaError.code === "P2002") {
            statusCode = 409;
            message = "Resource already exists";
            code = "DUPLICATE_RESOURCE";
        }
        else if (prismaError.code === "P2025") {
            statusCode = 404;
            message = "Resource not found";
            code = "RESOURCE_NOT_FOUND";
        }
    }
    if (process.env.NODE_ENV === "production" && statusCode === 500) {
        message = "Something went wrong";
    }
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
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
//# sourceMappingURL=errorHandler.js.map