import { NextRequest } from "next/server";
import getClientIP from "@/lib/rate-limiting/client-IP";
import { generateIdentifier } from "./fingerprint";
import { isBlocked, blockIdentifier, trackRequest } from "./storage";
import { getPathConfig } from "./utils";
import { RATE_LIMIT_CONFIG } from "./config";
import type { RateLimitResult } from "./types";

export async function checkRateLimit(
  request: NextRequest
): Promise<RateLimitResult> {
  try {
    const ip = getClientIP(request);
    if (!ip) {
      return {
        allowed: true,
        remaining: RATE_LIMIT_CONFIG.maxRequests,
        resetTime: Date.now() + RATE_LIMIT_CONFIG.windowMs,
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
      config.maxRequests,
      config.windowMs
    );

    // If exceeded limit, block the identifier
    if (!result.allowed) {
      await blockIdentifier(
        identifier,
        `Exceeded ${config.maxRequests} requests in ${config.windowMs}ms`
      );

      return {
        allowed: false,
        remaining: 0,
        resetTime: Date.now() + RATE_LIMIT_CONFIG.blockDurationMs,
        retryAfter: Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000),
        blockReason: `Rate limit exceeded. Maximum ${
          config.maxRequests
        } requests per ${Math.ceil(config.windowMs / 60000)} minutes.`,
      };
    }

    return {
      allowed: true,
      remaining: config.maxRequests - result.count,
      resetTime: result.resetTime,
    };
  } catch (error) {
    console.error("Rate limiting error:", error);
    // Fail open - allow request on error but log it
    return {
      allowed: true,
      remaining: 1,
      resetTime: Date.now() + RATE_LIMIT_CONFIG.windowMs,
    };
  }
}
