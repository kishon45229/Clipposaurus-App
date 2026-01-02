import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiting/index";

export async function GET(request: NextRequest) {
  try {
    const result = await checkRateLimit(request);

    return NextResponse.json({
      allowed: result.allowed,
      remaining: result.remaining,
      resetTime: result.resetTime,
      blockReason: result.blockReason,
      retryAfter: result.retryAfter,
    });
  } catch {
    return NextResponse.json(
      {
        allowed: false,
        remaining: 0,
        resetTime: Date.now(),
        error: "Rate limit check failed",
      },
      { status: 500 }
    );
  }
}
