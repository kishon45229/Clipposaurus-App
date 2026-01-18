import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";

const KEYS: string[] = env.KEYS
  ? env.KEYS.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)
  : [];

const PENDING_TTL = 1800 as const; // 30 minutes

export async function GET(request: Request) {
  try {
    if (KEYS.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Keys not configured. Please contact support.",
        },
        { status: 500 },
      );
    }

    const setSize = await upstashRedis.scard("available_keys");

    if (setSize === 0 && KEYS.length > 0) {
      await upstashRedis.sadd(
        "available_keys",
        ...(KEYS as [string, ...string[]]),
      );
    }

    if (setSize > 0 && setSize < 500) {
      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;

      fetch(`${baseUrl}/api/drop-key/cleanup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).catch(() => {
        // Silently fail - cleanup is best-effort
      });
    }

    let identifierKey = await upstashRedis.srandmember("available_keys");
    
    // If no key found, trigger cleanup and retry once
    if (!identifierKey) {
      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;

      try {
        const cleanupResponse = await fetch(`${baseUrl}/api/drop-key/cleanup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (cleanupResponse.ok) {
          // Retry once after cleanup
          identifierKey = await upstashRedis.srandmember("available_keys");
        }
      } catch {
        // If cleanup fails, proceed to error response
      }
    }

    if (!identifierKey) {
      return NextResponse.json(
        {
          success: false,
          error: "No identifiers available. Please try again later.",
        },
        { status: 503 },
      );
    }

    await upstashRedis.srem("available_keys", identifierKey);
    await upstashRedis.setex(`pending:${identifierKey}`, PENDING_TTL, "1");

    return NextResponse.json({
      success: true,
      identifier: identifierKey,
      expiresIn: PENDING_TTL,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve an identifier. Please try again.",
      },
      { status: 500 },
    );
  }
}
