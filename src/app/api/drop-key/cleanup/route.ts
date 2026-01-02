import { NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";
import { deleteFiles } from "@/services/fileService";

/**
 * Cleanup endpoint to recycle expired identifiers
 * This is called periodically via Vercel cron job (every 5 minutes)
 *
 * Strategy:
 * - pending:<key> keys have TTL for initial generation timeout
 * - used:<key> keys have TTL = drop retention period + 30min grace period
 * - When both markers expire, the key is safe to recycle
 * - Grace period prevents premature recycling of short-retention drops
 */
export async function POST() {
  try {
    const startTime = Date.now();
    const recycledPending: string[] = [];
    const recycledUsed: string[] = [];

    console.log("[CLEANUP] Starting cleanup process...");

    // Get all available keys
    const availableKeys = await upstashRedis.smembers("available_keys");
    const availableSet = new Set(availableKeys);

    // Get all configured keys from environment
    const allKeys = env.KEYS.split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    console.log(
      `[CLEANUP] Checking ${allKeys.length} keys, ${availableKeys.length} currently available`
    );

    // Check each key that's NOT in available_keys
    for (const key of allKeys) {
      const dropKey = `${env.DROP}:${key}`;
      const dropFilesKey = `drop-files:${key}`;

      // Clean up orphaned files: drop content is gone but file list remains.
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
              console.log(
                `[CLEANUP] Deleted orphaned files for key ${key}: ${fileUrls.length}`
              );
            }
          }
        } catch (error) {
          console.warn(
            `[CLEANUP] Failed to parse orphaned file list for key ${key}`,
            error
          );
        }
      }

      if (!availableSet.has(key)) {
        // Key is not available, check if it has pending or used marker
        const isPending = await upstashRedis.exists(`pending:${key}`);
        const isUsed = await upstashRedis.exists(`used:${key}`);

        if (!isPending && !isUsed) {
          // Neither marker exists - key's TTL (including grace period) expired
          // It's now safe to recycle
          await upstashRedis.sadd("available_keys", key);
          recycledPending.push(key);
          console.log(
            `[CLEANUP] Recycled expired key: ${key} (both pending and used markers expired)`
          );
        } else if (isPending) {
          console.log(`[CLEANUP] Key ${key} still pending, skipping`);
        } else if (isUsed) {
          console.log(
            `[CLEANUP] Key ${key} still in use (within grace period), skipping`
          );
        }
      }
    }

    const duration = Date.now() - startTime;
    const totalRecycled = recycledPending.length + recycledUsed.length;

    console.log(
      `[CLEANUP] Completed in ${duration}ms. Recycled ${totalRecycled} keys`
    );

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
