import { RATE_LIMIT_CONFIG } from "./config";

/**
 * Get path-specific rate limit configuration
 */
export function getPathConfig(path: string): {
  capacity: number;
  refillRate: number;
  refillIntervalMs: number;
} {
  for (const [pathPattern, config] of Object.entries(
    RATE_LIMIT_CONFIG.pathLimits
  )) {
    if (path.startsWith(pathPattern)) {
      return config;
    }
  }
  return {
    capacity: RATE_LIMIT_CONFIG.capacity,
    refillRate: RATE_LIMIT_CONFIG.refillRate,
    refillIntervalMs: RATE_LIMIT_CONFIG.refillIntervalMs,
  };
}
