import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";

export const maxDuration = 300;

export async function POST() {
  try {
    const startTime = Date.now();
    const MAX_EXECUTION_TIME = 240000;
    const recycledPending: string[] = [];
    let processedCount = 0;

    const availableKeys = await upstashRedis.smembers("available_keys");
    const availableSet = new Set(availableKeys);

    // Early exit: Skip cleanup if we already have enough keys
    const MINIMUM_KEYS_THRESHOLD = 500;
    if (availableSet.size >= MINIMUM_KEYS_THRESHOLD) {
      return NextResponse.json({
        success: true,
        recycledCount: 0,
        recycledKeys: [],
        processedKeys: 0,
        totalKeys: availableSet.size,
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        message: "Cleanup skipped - sufficient keys available",
      });
    }

    const allKeys = env.KEYS.split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const keysToCheck = allKeys.filter((key) => !availableSet.has(key));

    const BATCH_SIZE = 50;
    for (let i = 0; i < keysToCheck.length; i += BATCH_SIZE) {
      if (Date.now() - startTime > MAX_EXECUTION_TIME) {
        break;
      }

      const batch = keysToCheck.slice(i, i + BATCH_SIZE);

      const pipeline = upstashRedis.pipeline();

      batch.forEach((key) => {
        pipeline.exists(`pending:${key}`);
        pipeline.exists(`used:${key}`);
      });

      const results = await pipeline.exec();

      const keysToRecycle: string[] = [];
      for (let j = 0; j < batch.length; j++) {
        const isPending = results[j * 2] as number;
        const isUsed = results[j * 2 + 1] as number;

        if (!isPending && !isUsed) {
          keysToRecycle.push(batch[j]);
        }
        processedCount++;
      }

      if (keysToRecycle.length > 0) {
        await upstashRedis.sadd(
          "available_keys",
          ...(keysToRecycle as [string, ...string[]]),
        );
        recycledPending.push(...keysToRecycle);
      }

      if (i + BATCH_SIZE < keysToCheck.length) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      recycledCount: recycledPending.length,
      recycledKeys: recycledPending,
      processedKeys: processedCount,
      totalKeys: allKeys.length,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      const errorMessage = String(error.message).toLowerCase();
      if (errorMessage.includes("rate limit") || errorMessage.includes("429")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Redis rate limit exceeded. Please try again in a few minutes.",
          },
          { status: 429 },
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Cleanup failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
