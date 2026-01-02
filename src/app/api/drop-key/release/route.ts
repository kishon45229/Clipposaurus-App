import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();
    if (!identifier) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifier key is required.",
        },
        { status: 400 }
      );
    }

    if (identifier) {
      await upstashRedis.del(`pending:${identifier}`);
      await upstashRedis.sadd("available_keys", identifier);
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to release identifier key. Please try again.",
      },
      { status: 500 }
    );
  }
}
