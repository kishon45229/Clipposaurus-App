import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";

// Vercel: Allow up to 5 minutes execution time for cleanup
export const maxDuration = 300;

export async function POST() {
  try {
    const startTime = Date.now();
    const MAX_EXECUTION_TIME = 240000; // 4 minutes (leave 1 min buffer)
    const recycledPending: string[] = [];
    const recycledUsed: string[] = [];
    let processedCount = 0;

    const availableKeys = await upstashRedis.smembers("available_keys");
    const availableSet = new Set(availableKeys);

    const allKeys = env.KEYS.split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const BATCH_SIZE = 50;
    for (let i = 0; i < allKeys.length; i += BATCH_SIZE) {
      if (Date.now() - startTime > MAX_EXECUTION_TIME) {
        break;
      }

      const batch = allKeys.slice(i, i + BATCH_SIZE);

      const batchOperations = batch.map(async (key) => {
        const [isPending, isUsed] = await Promise.all([
          availableSet.has(key)
            ? Promise.resolve(1)
            : upstashRedis.exists(`pending:${key}`),
          availableSet.has(key)
            ? Promise.resolve(0)
            : upstashRedis.exists(`used:${key}`),
        ]);

        if (!availableSet.has(key) && !isPending && !isUsed) {
          await upstashRedis.sadd("available_keys", key);
          recycledPending.push(key);
        }

        processedCount++;
      });

      await Promise.all(batchOperations);
    }

    const duration = Date.now() - startTime;
    const totalRecycled = recycledPending.length + recycledUsed.length;

    return NextResponse.json({
      success: true,
      recycledCount: totalRecycled,
      recycledKeys: recycledPending,
      processedKeys: processedCount,
      totalKeys: allKeys.length,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Cleanup failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
