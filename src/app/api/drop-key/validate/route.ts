import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();

    if (!identifier) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: "Identifier is required.",
        },
        { status: 400 }
      );
    }

    const isPending = await upstashRedis.exists(`pending:${identifier}`);
    if (!isPending) {
      // If the identifier expired in the pending phase, recycle it immediately
      const isUsed = await upstashRedis.exists(`used:${identifier}`);
      if (!isUsed) {
        await upstashRedis.sadd("available_keys", identifier);
      }

      return NextResponse.json({
        success: true,
        valid: false,
        expired: true,
      });
    }

    return NextResponse.json({
      success: true,
      valid: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        valid: false,
        error: "Failed to validate identifier. Please try again.",
      },
      { status: 500 }
    );
  }
}
