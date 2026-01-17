// TEMPORARILY DISABLED

// import {
//   checkFileStorageQuota,
//   s3Clients,
//   deleteObjectByUrl,
// } from "@/lib/storage";
// import { StorageProvider } from "@/types/storage";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import path from "path";
// import mimeTypes from "mime-types";
// import getStorageProviders from "@/constants/getStorageProviders";
// import type { FileItem } from "@/types/index";

// async function uploadToProvider(
//   file: FileItem,
//   provider: StorageProvider
// ): Promise<string> {
//   try {
//     const s3Client = s3Clients.get(provider.name);
//     if (!s3Client) {
//       throw new Error(`S3 client not found for provider: ${provider.name}`);
//     }

//     const timestamp = Date.now();
//     const randomSuffix = Math.random().toString(36).substring(2, 8);
//     const fileExtension = path.extname(file.name) || "";
//     const fileKey = `files/${timestamp}-${randomSuffix}-${file.id}${fileExtension}`;

//     let contentType = "application/octet-stream";

//     if (typeof file.content === "string" && file.content.startsWith("data:")) {
//       const match = file.content.match(/^data:([^;]+);base64,/);
//       if (match && match[1]) {
//         contentType = match[1];
//       }
//     }

//     if (contentType === "application/octet-stream") {
//       contentType = mimeTypes.lookup(file.name) || "application/octet-stream";
//     }

//     const fileToUpload = {
//       ...file,
//     };

//     const fileContentJson = JSON.stringify(fileToUpload);
//     const buffer = Buffer.from(fileContentJson, "utf-8");

//     const uploadCommand = new PutObjectCommand({
//       Bucket: provider.bucketName,
//       Key: fileKey,
//       Body: buffer,
//       ContentType: "application/json",
//       ContentLength: buffer.length,
//       Metadata: {
//         "original-name": file.name,
//         "original-content-type": contentType,
//         "file-id": file.id,
//         "upload-timestamp": timestamp.toString(),
//         encrypted: "true",
//       },
//     });

//     await s3Client.send(uploadCommand);

//     const publicUrl = `${provider.publicUrl}/${fileKey}`;

//     return publicUrl;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function uploadFile(
//   files: FileItem[],
//   onProgress?: (completed: number, total: number) => void
// ): Promise<string[]> {
//   const urls: string[] = [];
//   const totalFiles = files.length;

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     let uploaded = false;

//     for (const provider of getStorageProviders()) {
//       try {
//         const quota = await checkFileStorageQuota(provider);

//         if (quota >= 95) {
//           continue;
//         } else {
//           const url = await uploadToProvider(file, provider);
//           urls.push(url);
//           uploaded = true;
          
//           onProgress?.(i + 1, totalFiles);
//           break;
//         }
//       } catch {
//         // continue to next provider
//       }
//     }
    
//     if (!uploaded) {
//       // no provider available or all uploads failed
//       urls.push("");
//       onProgress?.(i + 1, totalFiles);
//     }
//   }

//   return urls;
// }

// export async function deleteFiles(fileUrls: string[]): Promise<{
//   deleted: string[];
//   failed: string[];
// }> {
//   const deleted: string[] = [];
//   const failed: string[] = [];

//   const deleteJobs = fileUrls.map(async (url) => {
//     try {
//       const success = await deleteObjectByUrl(url);
//       if (success) {
//         deleted.push(url);
//       } else {
//         failed.push(url);
//       }
//     } catch {
//       failed.push(url);
//     }
//   });

//   await Promise.all(deleteJobs);

//   return { deleted, failed };
// }
