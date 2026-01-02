export const RATE_LIMIT_CONFIG = {
  maxRequests: 15,
  windowMs: 15 * 60 * 1000,
  blockDurationMs: 60 * 60 * 1000,
  pathLimits: {
    "/api/create-drop": { maxRequests: 10, windowMs: 15 * 60 * 1000 },
    "/api/open-drop": { maxRequests: 15, windowMs: 15 * 60 * 1000 },
    "/api/verify": { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  },
};
