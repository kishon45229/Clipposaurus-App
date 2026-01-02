import { RATE_LIMIT_CONFIG } from "./config";

/**
 * Get path-specific rate limit configuration
 */
export function getPathConfig(path: string): {
  maxRequests: number;
  windowMs: number;
} {
  for (const [pathPattern, config] of Object.entries(
    RATE_LIMIT_CONFIG.pathLimits
  )) {
    if (path.startsWith(pathPattern)) {
      return config;
    }
  }
  return {
    maxRequests: RATE_LIMIT_CONFIG.maxRequests,
    windowMs: RATE_LIMIT_CONFIG.windowMs,
  };
}
