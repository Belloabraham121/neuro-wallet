import { CorsOptions } from "cors";

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://localhost:3000",
  "https://localhost:3001",
];

// Add production origins if specified
if (process.env.PRODUCTION_ORIGINS) {
  const productionOrigins = process.env.PRODUCTION_ORIGINS.split(",");
  allowedOrigins.push(...productionOrigins);
}

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
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
  maxAge: 86400, // 24 hours
};

export default corsConfig;
