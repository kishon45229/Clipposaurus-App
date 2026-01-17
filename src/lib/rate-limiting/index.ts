import { NextRequest } from "next/server";
import getClientIP from "@/lib/rate-limiting/client-IP";
import { generateIdentifier } from "@/lib/rate-limiting/fingerprint";
import { isBlocked, blockIdentifier, trackRequest } from "@/lib/rate-limiting/storage";
import { getPathConfig } from "@/lib/rate-limiting/utils";
import { RATE_LIMIT_CONFIG } from "@/lib/rate-limiting/config";
import type { RateLimitResult } from "@/lib/rate-limiting/types";

export async function checkRateLimit(
  request: NextRequest
): Promise<RateLimitResult> {
  try {
    const ip = getClientIP(request);
    if (!ip) {
      return {
        allowed: true,
        remaining: RATE_LIMIT_CONFIG.capacity,
        resetTime: Date.now() + RATE_LIMIT_CONFIG.refillIntervalMs,
      };
    }

    const identifier = generateIdentifier(request, ip);
    const path = new URL(request.url).pathname;

    const blockStatus = await isBlocked(identifier);
    if (blockStatus.blocked) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: blockStatus.resetTime!,
        retryAfter: Math.ceil((blockStatus.resetTime! - Date.now()) / 1000),
        blockReason: "Temporarily blocked due to rate limit violation",
      };
    }

    const config = getPathConfig(path);

    const result = await trackRequest(
      identifier,
      config.capacity,
      config.refillRate,
      config.refillIntervalMs
    );

    if (!result.allowed && result.tokensRemaining === 0) {
      await blockIdentifier(
        identifier,
        `Token bucket depleted - rate limit exceeded`
      );

      return {
        allowed: false,
        remaining: 0,
        resetTime: Date.now() + RATE_LIMIT_CONFIG.blockDurationMs,
        retryAfter: Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000),
        blockReason: `Rate limit exceeded. Please wait before trying again.`,
      };
    }

    return {
      allowed: result.allowed,
      remaining: result.tokensRemaining,
      resetTime: result.resetTime,
      retryAfter: result.allowed
        ? undefined
        : Math.ceil((result.resetTime - Date.now()) / 1000),
    };
  } catch {
    // Fail open - allow request on error but log it
    return {
      allowed: true,
      remaining: 1,
      resetTime: Date.now() + RATE_LIMIT_CONFIG.refillIntervalMs,
    };
  }
}
