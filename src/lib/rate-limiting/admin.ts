import { redis } from "./storage";
import { RATE_LIMIT_CONFIG } from "./config";

/**
 * Manually block an identifier (admin function)
 */
export async function manualBlock(
  identifier: string,
  durationMs: number = RATE_LIMIT_CONFIG.blockDurationMs,
  reason: string = "Manual admin block"
): Promise<void> {
  const blockKey = `block:${identifier}`;
  const blockedUntil = Date.now() + durationMs;

  await redis.set(
    blockKey,
    { blockedUntil, reason, timestamp: Date.now(), manual: true },
    { px: durationMs }
  );
}

/**
 * Manually unblock an identifier (admin function)
 */
export async function manualUnblock(identifier: string): Promise<void> {
  const blockKey = `block:${identifier}`;
  await redis.del(blockKey);
}

/**
 * Get statistics
 */
export async function getStatistics(): Promise<{
  totalBlocks: number;
  activeBlocks: string[];
}> {
  try {
    const blockKeys = await redis.keys("block:*");
    const now = Date.now();
    const activeBlocks: string[] = [];

    for (const key of blockKeys) {
      const data = await redis.get<{ blockedUntil: number }>(key);
      if (data && data.blockedUntil > now) {
        activeBlocks.push(key.replace("block:", ""));
      }
    }

    return {
      totalBlocks: blockKeys.length,
      activeBlocks,
    };
  } catch (error) {
    console.error("Error getting statistics:", error);
    return {
      totalBlocks: 0,
      activeBlocks: [],
    };
  }
}
