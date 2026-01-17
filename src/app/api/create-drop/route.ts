import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiting/index";
import { upstashRedis } from "@/lib/redis";
import type { EncryptedData } from "@/types/encryption";
import env from "@/lib/env";

interface DropContent {
  textContent?: EncryptedData;
  codeContent?: EncryptedData;
  codeLanguage?: string;
  retention: EncryptedData;
  createdAt: string;
  expiresAt: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimitResult = await checkRateLimit(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            rateLimitResult.blockReason ||
            "Rate limit exceeded. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(
              rateLimitResult.resetTime
            ).toISOString(),
            "Retry-After": rateLimitResult.retryAfter?.toString() || "3600",
          },
        }
      );
    }

    const {
      identifier,
      textContent,
      codeContent,
      codeLanguage,
      retention,
      ttlSeconds,
      createdAt,
      expiresAt,
    } = await request.json();
    if (!identifier || !retention) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifier and retention are required",
        },
        { status: 400 }
      );
    }

    const dropContent: DropContent = {
      textContent: textContent || undefined,
      codeContent: codeContent || undefined,
      codeLanguage: codeLanguage || undefined,
      retention,
      createdAt,
      expiresAt,
    };

    try {
      await upstashRedis.setex(
        `${env.DROP}:${identifier}`,
        ttlSeconds,
        JSON.stringify(dropContent)
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to create Drop. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create Drop. Please try again.",
      },
      { status: 500 }
    );
  }
}
