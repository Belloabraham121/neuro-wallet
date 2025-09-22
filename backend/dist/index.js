"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const config_1 = require("./config");
const cors_2 = __importDefault(require("./config/cors"));
const rateLimit_1 = require("./config/rateLimit");
const logger_1 = require("./config/logger");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const notFoundHandler_1 = __importDefault(require("./middleware/notFoundHandler"));
const requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
const routes_1 = __importDefault(require("./routes"));
require("./config/passport");
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
}).$extends((0, extension_accelerate_1.withAccelerate)());
const app = (0, express_1.default)();
const PORT = config_1.config.port;
const API_VERSION = process.env.API_VERSION || "v1";
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
app.use((0, cors_1.default)(cors_2.default));
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
else {
    app.use((0, morgan_1.default)("combined", {
        stream: { write: (message) => logger_1.logger.info(message.trim()) },
    }));
}
app.use(requestLogger_1.default);
app.set('trust proxy', true);
app.use(rateLimit_1.rateLimitConfig);
app.use(passport_1.default.initialize());
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || "1.0.0",
    });
});
app.use("/api", routes_1.default);
app.use(notFoundHandler_1.default);
app.use(errorHandler_1.default);
process.on("SIGINT", async () => {
    logger_1.logger.info("Received SIGINT, shutting down gracefully...");
    await exports.prisma.$disconnect();
    process.exit(0);
});
process.on("SIGTERM", async () => {
    logger_1.logger.info("Received SIGTERM, shutting down gracefully...");
    await exports.prisma.$disconnect();
    process.exit(0);
});
if (process.env.NODE_ENV === "development") {
    app.listen(PORT, () => {
        logger_1.logger.info(`🚀 Server running on port ${PORT}`);
        logger_1.logger.info(`📚 API documentation available at http://localhost:${PORT}/api/${API_VERSION}`);
        logger_1.logger.info(`🔍 Environment: ${process.env.NODE_ENV}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map