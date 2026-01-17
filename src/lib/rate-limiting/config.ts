export const RATE_LIMIT_CONFIG = {
  capacity: 20,
  refillRate: 1,
  refillIntervalMs: 60 * 1000, // 1 token per minute
  blockDurationMs: 60 * 60 * 1000, // 1 hour block for violations
  pathLimits: {
    "/api/create-drop": {
      capacity: 10, // Allow burst of 10 drops
      refillRate: 1, // Add 1 token per interval
      refillIntervalMs: 3 * 60 * 1000, // Refill every 3 minutes (~20 drops per hour)
    },
    "/api/unlock-drop": {
      capacity: 15, // Allow burst of 15 unlocks
      refillRate: 1, // Add 1 token per interval
      refillIntervalMs: 2 * 60 * 1000, // Refill every 2 minutes (~30 unlocks per hour)
    },
  },
};
