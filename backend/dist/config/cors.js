"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://localhost:3000",
    "https://localhost:3001",
];
if (process.env.PRODUCTION_ORIGINS) {
    const productionOrigins = process.env.PRODUCTION_ORIGINS.split(",");
    allowedOrigins.push(...productionOrigins);
}
exports.corsConfig = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "X-API-Key",
        "X-Client-Version",
    ],
    exposedHeaders: [
        "X-Total-Count",
        "X-Page-Count",
        "X-Rate-Limit-Remaining",
        "X-Rate-Limit-Reset",
    ],
    maxAge: 86400,
};
exports.default = exports.corsConfig;
//# sourceMappingURL=cors.js.map