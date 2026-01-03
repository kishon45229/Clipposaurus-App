import { Redis } from "@upstash/redis";
import env from "@/lib/env";
import { RATE_LIMIT_CONFIG } from "./config";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export { redis };

/**
 * Check if identifier is blocked
 */
export async function isBlocked(
  identifier: string
): Promise<{ blocked: boolean; resetTime?: number }> {
  try {
    const blockKey = `block:${identifier}`;
    const blockData = await redis.get<{ blockedUntil: number; reason: string }>(
      blockKey
    );

    if (blockData) {
      const now = Date.now();
      if (blockData.blockedUntil > now) {
        return { blocked: true, resetTime: blockData.blockedUntil };
      } else {
        // Block expired, clean up
        await redis.del(blockKey);
      }
    }

    return { blocked: false };
  } catch (error) {
    console.error("Error checking block status:", error);
    return { blocked: false };
  }
}

/**
 * Block an identifier
 */
export async function blockIdentifier(
  identifier: string,
  reason: string = "Rate limit exceeded"
): Promise<void> {
  try {
    const blockKey = `block:${identifier}`;
    const blockedUntil = Date.now() + RATE_LIMIT_CONFIG.blockDurationMs;

    await redis.set(
      blockKey,
      { blockedUntil, reason, timestamp: Date.now() },
      { px: RATE_LIMIT_CONFIG.blockDurationMs }
    );
  } catch (error) {
    throw error;
  }
}

/**
 * Track request and check rate limit using sliding window
 */
export async function trackRequest(
  identifier: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; count: number; resetTime: number }> {
  try {
    const key = `rl:${identifier}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    const script = `
      local key = KEYS[1]
      local now = tonumber(ARGV[1])
      local window_start = tonumber(ARGV[2])
      local max_requests = tonumber(ARGV[3])
      local window_ms = tonumber(ARGV[4])
      
      -- Remove old entries outside window
      redis.call('ZREMRANGEBYSCORE', key, 0, window_start)
      
      -- Count current requests
      local count = redis.call('ZCARD', key)
      
      -- Check if under limit
      if count < max_requests then
        -- Add new request
        redis.call('ZADD', key, now, now)
        redis.call('PEXPIRE', key, window_ms)
        return {1, count + 1, now + window_ms}
      else
        -- Over limit
        redis.call('PEXPIRE', key, window_ms)
        return {0, count, now + window_ms}
      end
    `;

    const result = (await redis.eval(
      script,
      [key],
      [
        now.toString(),
        windowStart.toString(),
        maxRequests.toString(),
        windowMs.toString(),
      ]
    )) as [number, number, number];

    return {
      allowed: result[0] === 1,
      count: result[1],
      resetTime: result[2],
    };
  } catch (error) {
    console.error("Error tracking request:", error);
    return {
      allowed: true,
      count: 0,
      resetTime: Date.now() + windowMs,
    };
  }
}
