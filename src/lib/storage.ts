import env from "@/lib/env";

export async function checkRedisStorageQuota(): Promise<number> {
  try {
    const response = await fetch(`${env.UPSTASH_REDIS_REST_URL}/info`, {
      headers: {
        Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Redis info: ${response.status}`);
    }

    const info = await response.text();
    const redisInfoString = JSON.parse(info).result;

    const lines = redisInfoString
      .split("\n")
      .map((line: string) => line.trim());

    const usedDataLine = lines.find((line: string) =>
      line.startsWith("total_data_size:")
    );
    const maxDataLine = lines.find((line: string) =>
      line.startsWith("max_data_size:")
    );

    const toNumber = (line?: string): number => {
      if (!line) return 0;
      const [, raw] = line.split(":");
      const parsed = Number(raw?.trim());
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const usedBytes = toNumber(usedDataLine);
    const maxBytes = toNumber(maxDataLine);

    if (maxBytes === 0) {
      return 0;
    }

    return (usedBytes / maxBytes) * 100;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.toLowerCase().includes("fetch failed")) {
      return 0; // allow app to continue (OfflineAlert handles UI)
    }

    throw error;
  }
}
