import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const { identifier, ttlSeconds } = await request.json();

    if (!identifier || !ttlSeconds) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing identifier or ttlSeconds",
        },
        { status: 400 }
      );
    }

    const isPending = await upstashRedis.exists(`pending:${identifier}`);
    if (!isPending) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifier not found or has expired. Please generate a new one.",
        },
        { status: 404 }
      );
    }

    await upstashRedis.del(`pending:${identifier}`);
    await upstashRedis.setex(`used:${identifier}`, ttlSeconds, "1");

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to mark identifier key as used. Please try again.",
      },
      { status: 500 }
    );
  }
}
