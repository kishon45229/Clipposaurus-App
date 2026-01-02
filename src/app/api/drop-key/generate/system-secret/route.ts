import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";

const KEYS: string[] = env.KEYS
  ? env.KEYS.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)
  : [];

export async function GET() {
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

    const systemSecretKey = await upstashRedis.srandmember("available_keys");
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
