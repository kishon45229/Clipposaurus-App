import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";

const KEYS: string[] = env.KEYS
  ? env.KEYS.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)
  : [];

export async function GET(request: Request) {
  try {
    if (KEYS.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Keys not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    const setSize = await upstashRedis.scard("available_keys");
    if (setSize === 0 && KEYS.length > 0) {
      await upstashRedis.sadd(
        "available_keys",
        ...(KEYS as [string, ...string[]])
      );
    }

    let systemSecretKey = await upstashRedis.srandmember("available_keys");
    
    // If no key found, trigger cleanup and retry once
    if (!systemSecretKey) {
      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;

      try {
        const cleanupResponse = await fetch(`${baseUrl}/api/drop-key/cleanup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (cleanupResponse.ok) {
          // Retry once after cleanup
          systemSecretKey = await upstashRedis.srandmember("available_keys");
        }
      } catch {
        // If cleanup fails, proceed to error response
      }
    }

    if (!systemSecretKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to retrieve a system secret. Please try again.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      systemSecret: systemSecretKey,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve a system secret. Please try again.",
      },
      { status: 500 }
    );
  }
}
