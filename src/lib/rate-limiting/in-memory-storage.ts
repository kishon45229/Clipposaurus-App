interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

interface BlockInfo {
  blockedUntil: number;
  reason: string;
}

const tokenBuckets = new Map<string, TokenBucket>();
const blockedUsers = new Map<string, BlockInfo>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries() {
  const now = Date.now();

  // Only cleanup every 5 minutes
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return;
  }

  lastCleanup = now;

  // Remove expired blocks
  for (const [identifier, blockInfo] of blockedUsers.entries()) {
    if (blockInfo.blockedUntil <= now) {
      blockedUsers.delete(identifier);
    }
  }

  // Keep only recent token buckets (last hour)
  const ONE_HOUR = 60 * 60 * 1000;
  for (const [identifier, bucket] of tokenBuckets.entries()) {
    if (now - bucket.lastRefill > ONE_HOUR) {
      tokenBuckets.delete(identifier);
    }
  }
}

/**
 * Check if identifier is blocked
 */
export function isBlocked(identifier: string): {
  blocked: boolean;
  resetTime?: number;
} {
  cleanupStaleEntries();

  const blockInfo = blockedUsers.get(identifier);

  if (blockInfo) {
    const now = Date.now();
    if (blockInfo.blockedUntil > now) {
      return { blocked: true, resetTime: blockInfo.blockedUntil };
    } else {
      // Block expired
      blockedUsers.delete(identifier);
    }
  }

  return { blocked: false };
}

/**
 * Block an identifier
 */
export function blockIdentifier(
  identifier: string,
  reason: string,
  durationMs: number,
): void {
  const blockedUntil = Date.now() + durationMs;

  blockedUsers.set(identifier, {
    blockedUntil,
    reason,
  });
}

/**
 * Track request and check rate limit using token bucket
 */
export function trackRequest(
  identifier: string,
  capacity: number,
  refillRate: number,
  refillIntervalMs: number,
): { allowed: boolean; tokensRemaining: number; resetTime: number } {
  cleanupStaleEntries();

  const now = Date.now();

  let bucket = tokenBuckets.get(identifier);
  if (!bucket) {
    bucket = {
      tokens: capacity,
      lastRefill: now,
    };
    tokenBuckets.set(identifier, bucket);
  }

  const timeElapsed = now - bucket.lastRefill;
  const refills = Math.floor(timeElapsed / refillIntervalMs);
  const tokensToAdd = refills * refillRate;

  bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd);

  if (refills > 0) {
    bucket.lastRefill = bucket.lastRefill + refills * refillIntervalMs;
  }

  const allowed = bucket.tokens >= 1;

  if (allowed) {
    bucket.tokens -= 1;
  }

  const nextRefill = bucket.lastRefill + refillIntervalMs;

  return {
    allowed,
    tokensRemaining: bucket.tokens,
    resetTime: nextRefill,
  };
}

/**
 * Get statistics (for debugging)
 */
export function getStats() {
  return {
    tokenBuckets: tokenBuckets.size,
    blockedUsers: blockedUsers.size,
    lastCleanup,
  };
}
