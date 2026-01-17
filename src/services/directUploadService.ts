// TEMPORARILY DISABLED

// import type { FileItem } from "@/types/index";
// import type { EncryptedData } from "@/types/encryption";

// interface PresignedUrlResponse {
//   presignedUrl: string;
//   publicUrl: string;
//   fileKey: string;
// }

// interface UploadProgress {
//   fileIndex: number;
//   fileName: string;
//   loaded: number;
//   total: number;
//   percentage: number;
// }

// type FileToUpload = Omit<FileItem, "content"> & {
//   content: string | EncryptedData;
// };

// export async function uploadFilesDirectly(
//   files: FileToUpload[],
//   onProgress?: (progress: UploadProgress) => void
// ): Promise<string[]> {
//   const uploadedUrls: string[] = [];

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];

//     try {
//       const presignedResponse = await fetch("/api/presigned-url", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fileName: file.name,
//           fileSize: file.size,
//           fileId: file.id,
//         }),
//       });

//       if (!presignedResponse.ok) {
//         uploadedUrls.push("");
//         continue;
//       }

//       const { presignedUrl, publicUrl }: PresignedUrlResponse =
//         await presignedResponse.json();

//       const uploadedUrl = await uploadToPresignedUrl(
//         presignedUrl,
//         publicUrl,
//         file,
//         (loaded, total) => {
//           const percentage = Math.round((loaded / total) * 100);
//           onProgress?.({
//             fileIndex: i,
//             fileName: file.name,
//             loaded,
//             total,
//             percentage,
//           });
//         }
//       );

//       uploadedUrls.push(uploadedUrl);
//     } catch {
//       uploadedUrls.push("");
//     }
//   }

//   return uploadedUrls;
// }

// function uploadToPresignedUrl(
//   presignedUrl: string,
//   publicUrl: string,
//   file: FileToUpload,
//   onProgress: (loaded: number, total: number) => void
// ): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     xhr.upload.addEventListener("progress", (event) => {
//       if (event.lengthComputable) {
//         onProgress(event.loaded, event.total);
//       }
//     });

//     xhr.addEventListener("load", () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         resolve(publicUrl);
//       } else {
//         reject(
//           new Error(
//             `Upload failed with status ${xhr.status}: ${xhr.statusText}`
//           )
//         );
//       }
//     });

//     xhr.addEventListener("error", () => {
//       reject(
//         new Error(
//           "Network error during upload. Check CORS configuration on R2/B2."
//         )
//       );
//     });

//     xhr.addEventListener("abort", () => {
//       reject(new Error("Upload aborted"));
//     });

//     try {
//       const fileData = JSON.stringify({
//         id: file.id,
//         name: file.name,
//         size: file.size,
//         content: file.content,
//       });

//       const blob = new Blob([fileData], { type: "application/json" });

//       xhr.open("PUT", presignedUrl);
//       xhr.setRequestHeader("Content-Type", "application/json");
//       xhr.send(blob);
//     } catch {
//       reject(new Error("Error preparing upload"));
//     }
//   });
// }
