import {
  checkFileStorageQuota,
  s3Clients,
  deleteObjectByUrl,
} from "@/lib/storage";
import { StorageProvider } from "@/types/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import mimeTypes from "mime-types";
import getStorageProviders from "@/constants/getStorageProviders";
import type { FileItem } from "@/types/index";

async function uploadToProvider(
  file: FileItem,
  provider: StorageProvider
): Promise<string> {
  try {
    console.log(`Uploading file ${file.id} to provider ${provider.name}`);

    const s3Client = s3Clients.get(provider.name);
    if (!s3Client) {
      throw new Error(`S3 client not found for provider: ${provider.name}`);
    }

    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileExtension = path.extname(file.name) || "";
    const fileKey = `files/${timestamp}-${randomSuffix}-${file.id}${fileExtension}`;

    let contentType = "application/octet-stream";

    // Check if content is a data URI for content type detection
    if (typeof file.content === "string" && file.content.startsWith("data:")) {
      const match = file.content.match(/^data:([^;]+);base64,/);
      if (match && match[1]) {
        contentType = match[1];
      }
    }

    if (contentType === "application/octet-stream") {
      contentType = mimeTypes.lookup(file.name) || "application/octet-stream";
    }

    console.log(`File ${file.id} upload info:`, {
      contentType: typeof file.content,
      originalName: file.name,
      size: file.size,
    });

    // Use file content as-is (expected to be already encrypted from dropService)
    const fileToUpload = {
      ...file,
    };

    const fileContentJson = JSON.stringify(fileToUpload);
    const buffer = Buffer.from(fileContentJson, "utf-8");

    const uploadCommand = new PutObjectCommand({
      Bucket: provider.bucketName,
      Key: fileKey,
      Body: buffer,
      ContentType: "application/json",
      ContentLength: buffer.length,
      Metadata: {
        "original-name": file.name,
        "original-content-type": contentType,
        "file-id": file.id,
        "upload-timestamp": timestamp.toString(),
        encrypted: "true",
      },
    });

    await s3Client.send(uploadCommand);

    const publicUrl = `${provider.publicUrl}/${fileKey}`;

    return publicUrl;
  } catch (error) {
    throw error;
  }
}

/**
 * Processes and uploads files to storage
 */
export async function uploadFile(files: FileItem[]): Promise<string[]> {
  console.log(`Starting upload process for ${files.length} files`);

  const uploadPromises = files.map(async (file) => {
    console.log(`Processing upload for file: ${file.id}`);

    for (const provider of getStorageProviders()) {
      try {
        console.log(`Checking quota for provider: ${provider.name}`);
        const quota = await checkFileStorageQuota(provider);
        console.log(`Provider ${provider.name} quota: ${quota}%`);

        if (quota >= 95) {
          console.log(`Provider ${provider.name} quota too high, skipping`);
          continue;
        } else {
          console.log(`Attempting upload to provider: ${provider.name}`);
          const url = await uploadToProvider(file, provider);
          console.log(
            `Successfully uploaded file ${file.id} to ${provider.name}: ${url}`
          );
          return url;
        }
      } catch (error) {
        console.error(
          `Upload failed for file ${file.id} on provider ${provider.name}:`,
          error
        );
        // continue to next provider
      }
    }
    // no provider available or all uploads failed
    console.error(`All upload attempts failed for file: ${file.id}`);
    return "";
  });

  const urls = await Promise.all(uploadPromises);
  console.log(`Upload process complete. Results:`, urls);
  return urls;
}

export async function deleteFiles(fileUrls: string[]): Promise<{
  deleted: string[];
  failed: string[];
}> {
  const deleted: string[] = [];
  const failed: string[] = [];

  const deleteJobs = fileUrls.map(async (url) => {
    try {
      const success = await deleteObjectByUrl(url);
      if (success) {
        deleted.push(url);
      } else {
        failed.push(url);
      }
    } catch (error) {
      console.error("File delete failed", { url, error });
      failed.push(url);
    }
  });

  await Promise.all(deleteJobs);

  return { deleted, failed };
}
