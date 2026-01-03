import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";
import { deleteFiles } from "@/services/fileService";

/**
 * Cleanup endpoint to recycle expired identifiers
 * This is called periodically via cron job (every 5 minutes)
 */
export async function POST() {
  try {
    const startTime = Date.now();
    const recycledPending: string[] = [];
    const recycledUsed: string[] = [];

    const availableKeys = await upstashRedis.smembers("available_keys");
    const availableSet = new Set(availableKeys);

    const allKeys = env.KEYS.split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    for (const key of allKeys) {
      const dropKey = `${env.DROP}:${key}`;
      const dropFilesKey = `drop-files:${key}`;

      const dropExists = await upstashRedis.exists(dropKey);
      const dropFiles = await upstashRedis.get(dropFilesKey);

      if (!dropExists && dropFiles) {
        try {
          const parsedFiles = Array.isArray(dropFiles)
            ? dropFiles
            : (JSON.parse(dropFiles as string) as unknown);

          if (Array.isArray(parsedFiles) && parsedFiles.length > 0) {
            const fileUrls = parsedFiles.filter(Boolean);
            if (fileUrls.length > 0) {
              await deleteFiles(fileUrls);
              await upstashRedis.del(dropFilesKey);
            }
          }
        } catch (error) {
          throw error;
        }
      }

      if (!availableSet.has(key)) {
        const isPending = await upstashRedis.exists(`pending:${key}`);
        const isUsed = await upstashRedis.exists(`used:${key}`);

        if (!isPending && !isUsed) {
          await upstashRedis.sadd("available_keys", key);
          recycledPending.push(key);
        } else if (isPending) {
          console.log("Key still pending, skipping");
        } else if (isUsed) {
          console.log("Key still in use (within grace period), skipping");
        }
      }
    }

    const duration = Date.now() - startTime;
    const totalRecycled = recycledPending.length + recycledUsed.length;

    return NextResponse.json({
      success: true,
      recycledCount: totalRecycled,
      recycledKeys: recycledPending,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error during key cleanup:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Cleanup failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
