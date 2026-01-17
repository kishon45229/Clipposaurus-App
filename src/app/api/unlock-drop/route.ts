import { NextRequest, NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";
import verifyRecaptcha from "@/services/recaptcha";
import { checkRateLimit } from "@/lib/rate-limiting/index";
// import { deleteFiles } from "@/services/fileService";   --> TEMPORARILY DISABLED

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await checkRateLimit(request);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
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

    const { identifier, recaptchaToken } = await request.json();
    if (!identifier || identifier.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Identifier is required",
        },
        { status: 400 }
      );
    }

    const isIdentifierUsed = await upstashRedis.exists(`used:${identifier}`);
    if (!isIdentifierUsed) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Drop Key or Drop has expired",
        },
        { status: 404 }
      );
    }

    const shouldSkipRecaptcha = env.NODE_ENV === "development";
    if (!shouldSkipRecaptcha && env.RECAPTCHA_SECRET_KEY) {
      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          {
            success: false,
            error: "reCAPTCHA verification failed. Please try again.",
          },
          { status: 400 }
        );
      }
    }

    const dropKey = `${env.DROP}:${identifier}`;
    const dropFilesKey = `drop-files:${identifier}`;

    const storedDrop = await upstashRedis.get(dropKey);
    if (!storedDrop) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Drop Key or Drop has expired",
        },
        { status: 404 }
      );
    }

    let dropContent;
    try {
      if (typeof storedDrop === "object" && storedDrop !== null) {
        dropContent = storedDrop;
      } else {
        dropContent = JSON.parse(storedDrop as string);
      }
    } catch (error: unknown) {
      return NextResponse.json(
        {
          success: false,
          error: `${
            error instanceof Error
              ? error.message
              : "Invalid stored content format"
          }`,
        },
        { status: 500 }
      );
    }

    if (dropContent.expiresAt && new Date(dropContent.expiresAt) < new Date()) {
      const fileUrlsFromDrop = Array.isArray(dropContent.files)
        ? dropContent.files
            .map((file: { url?: string }) => file?.url)
            .filter((url: string | undefined): url is string => Boolean(url))
        : [];

      let fileUrls: string[] = [...fileUrlsFromDrop];
      const storedFileUrls = await upstashRedis.get(dropFilesKey);

      if (Array.isArray(storedFileUrls)) {
        fileUrls = [...fileUrls, ...storedFileUrls];
      } else if (typeof storedFileUrls === "string") {
        try {
          const parsed = JSON.parse(storedFileUrls) as unknown;
          if (Array.isArray(parsed)) {
            fileUrls = [...fileUrls, ...parsed.filter(Boolean)];
          }
        } catch (error) {
          console.warn("[OPEN-DROP] Failed to parse drop-files for cleanup", {
            identifier,
            error,
          });
        }
      }

      // TEMPORARILY DISABLED
      // const uniqueFileUrls = Array.from(new Set(fileUrls)).filter(Boolean);

      // if (uniqueFileUrls.length > 0) {
      //   await deleteFiles(uniqueFileUrls);
      // }

      await upstashRedis.del(dropKey);
      await upstashRedis.del(`used:${identifier}`);
      await upstashRedis.del(dropFilesKey);
      await upstashRedis.sadd("available_keys", identifier);

      return NextResponse.json(
        {
          success: false,
          error: "Drop has expired",
        },
        { status: 410 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: dropContent,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to open Drop. Please try again.",
      },
      { status: 500 }
    );
  }
}
