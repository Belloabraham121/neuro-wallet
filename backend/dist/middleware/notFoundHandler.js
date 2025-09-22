"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: `Route ${req.originalUrl} not found`,
            code: "ROUTE_NOT_FOUND",
        },
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
    });
};
exports.notFoundHandler = notFoundHandler;
exports.default = exports.notFoundHandler;
//# sourceMappingURL=notFoundHandler.js.map