import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { StorageProvider } from "@/types/storage";
import env from "@/lib/env";
import getStorageProviders from "@/constants/getStorageProviders";

export const s3Clients: Map<string, S3Client> = new Map();

function initializeS3Client(provider: StorageProvider) {
  s3Clients.set(
    provider.name,
    new S3Client({
      endpoint: provider.endpoint,
      region: "auto",
      credentials: {
        accessKeyId: provider.accessKeyId,
        secretAccessKey: provider.secretAccessKey,
      },
      forcePathStyle: true,
    })
  );
}

getStorageProviders().forEach((provider) => initializeS3Client(provider));

export function getProviderForUrl(url: string): StorageProvider | undefined {
  return getStorageProviders().find((provider) =>
    url.startsWith(provider.publicUrl)
  );
}

export function getObjectKeyFromUrl(
  url: string,
  provider: StorageProvider
): string | null {
  const normalizedPublicUrl = provider.publicUrl.replace(/\/+$/, "");
  if (!url.startsWith(normalizedPublicUrl)) {
    return null;
  }

  const key = url.slice(normalizedPublicUrl.length).replace(/^\/+/, "");
  return key.length > 0 ? key : null;
}

export async function deleteObjectByUrl(url: string): Promise<boolean> {
  try {
    const provider = getProviderForUrl(url);
    if (!provider) {
      console.warn(`No storage provider matched url ${url}`);
      return false;
    }

    const objectKey = getObjectKeyFromUrl(url, provider);
    if (!objectKey) {
      console.warn(`Failed to derive object key from url ${url}`);
      return false;
    }

    const s3Client = s3Clients.get(provider.name);
    if (!s3Client) {
      console.warn(`S3 client not found for provider ${provider.name}`);
      return false;
    }

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: provider.bucketName,
        Key: objectKey,
      })
    );

    return true;
  } catch (error) {
    console.error("Object deletion failed", error);
    return false;
  }
}

export async function checkFileStorageQuota(
  provider: StorageProvider
): Promise<number> {
  try {
    const s3Client = s3Clients.get(provider.name);
    if (!s3Client) {
      throw new Error(`S3 client not found for provider: ${provider.name}`);
    }

    let totalSize = 0;
    let continuationToken: string | undefined;

    do {
      const listCommand = new ListObjectsV2Command({
        Bucket: provider.bucketName,
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(listCommand);

      if (response.Contents) {
        for (const object of response.Contents) {
          totalSize += object.Size || 0;
        }
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    const quotaLimit = provider.quotaLimit;
    const percentage = quotaLimit > 0 ? (totalSize / quotaLimit) * 100 : 0;

    return percentage;
  } catch (error) {
    throw error;
  }
}

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
