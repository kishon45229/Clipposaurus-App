import { Redis } from "@upstash/redis";
import env from "@/lib/env";
import { RATE_LIMIT_CONFIG } from "@/lib/rate-limiting/config";

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
  capacity: number,
  refillRate: number,
  refillIntervalMs: number
): Promise<{ allowed: boolean; tokensRemaining: number; resetTime: number }> {
  try {
    const key = `tb:${identifier}`;
    const now = Date.now();

    const script = `
      local key = KEYS[1]
      local capacity = tonumber(ARGV[1])
      local refill_rate = tonumber(ARGV[2])
      local refill_interval_ms = tonumber(ARGV[3])
      local now = tonumber(ARGV[4])
      local cost = tonumber(ARGV[5])
      
      -- Get bucket data
      local bucket = redis.call('HMGET', key, 'tokens', 'last_refill')
      local tokens = tonumber(bucket[1]) or capacity
      local last_refill = tonumber(bucket[2]) or now
      
      -- Calculate tokens to add based on time elapsed
      local time_elapsed = now - last_refill
      local refills = math.floor(time_elapsed / refill_interval_ms)
      local tokens_to_add = refills * refill_rate
      
      -- Refill tokens (capped at capacity)
      tokens = math.min(capacity, tokens + tokens_to_add)
      
      -- Update last_refill time if we added tokens
      if refills > 0 then
        last_refill = last_refill + (refills * refill_interval_ms)
      end
      
      -- Try to consume token(s)
      if tokens >= cost then
        tokens = tokens - cost
        
        -- Save updated bucket state
        redis.call('HSET', key, 'tokens', tokens, 'last_refill', last_refill)
        redis.call('PEXPIRE', key, refill_interval_ms * capacity)
        
        -- Calculate when next token will be available
        local next_refill = last_refill + refill_interval_ms
        
        return {1, tokens, next_refill}
      else
        -- Not enough tokens - calculate when next token will be available
        local next_refill = last_refill + refill_interval_ms
        
        -- Save current state
        redis.call('HSET', key, 'tokens', tokens, 'last_refill', last_refill)
        redis.call('PEXPIRE', key, refill_interval_ms * capacity)
        
        return {0, tokens, next_refill}
      end
    `;

    const result = (await redis.eval(
      script,
      [key],
      [
        capacity.toString(),
        refillRate.toString(),
        refillIntervalMs.toString(),
        now.toString(),
        "1", // Cost per request (1 token)
      ]
    )) as [number, number, number];

    return {
      allowed: result[0] === 1,
      tokensRemaining: result[1],
      resetTime: result[2],
    };
  } catch (error) {
    console.error("Error tracking request:", error);
    return {
      allowed: true,
      tokensRemaining: capacity,
      resetTime: Date.now() + refillIntervalMs,
    };
  }
}
