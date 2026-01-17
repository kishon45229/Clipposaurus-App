// TEMPORARILY DISABLED

// import { NextRequest, NextResponse } from "next/server";
// import { decryptWithDropKey } from "@/lib/decryption";
// import type { EncryptedData } from "@/types/encryption";

// interface FetchFileResult {
//   success: boolean;
//   content?: string;
//   originalContentType?: string;
//   error?: string;
// }

// async function fetchAndDecryptFile(
//   url: string,
//   identifier: string,
//   systemSecret: string,
//   userSecret: string
// ): Promise<FetchFileResult> {
//   try {
//     const response = await fetch(url, {
//       signal: AbortSignal.timeout(15000), // 15 seconds timeout
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }

//     const encryptedFileJson = await response.text();

//     let encryptedFileData: { content?: EncryptedData; [key: string]: unknown };
//     try {
//       encryptedFileData = JSON.parse(encryptedFileJson);
//     } catch {
//       return {
//         success: false,
//         error: "Invalid encrypted file format",
//       };
//     }

//     const encryptedContent = encryptedFileData.content;

//     if (!encryptedContent || typeof encryptedContent !== "object") {
//       return {
//         success: false,
//         error: "Invalid encrypted content structure",
//       };
//     }

//     const decryptResult = await decryptWithDropKey(
//       encryptedContent,
//       identifier,
//       systemSecret,
//       userSecret
//     );

//     if (!decryptResult.success || !decryptResult.data) {
//       return {
//         success: false,
//         error: decryptResult.error || "Failed to decrypt file",
//       };
//     }

//     return {
//       success: true,
//       content: decryptResult.data,
//       originalContentType: "application/octet-stream",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     };
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { url, fileName, dropKey } = await request.json();

//     if (!url || !fileName) {
//       return NextResponse.json(
//         { error: "URL and fileName are required" },
//         { status: 400 }
//       );
//     }

//     if (!dropKey) {
//       return NextResponse.json(
//         { error: "dropKey is required for decryption" },
//         { status: 400 }
//       );
//     }

//     const keyParts = dropKey.split("-");
//     if (keyParts.length !== 3) {
//       return NextResponse.json(
//         {
//           error:
//             "Invalid dropKey format. Expected format: identifier-systemSecret-userSecret",
//         },
//         { status: 400 }
//       );
//     }

//     const [identifier, systemSecret, userSecret] = keyParts;

//     try {
//       const decryptResult = await fetchAndDecryptFile(
//         url,
//         identifier,
//         systemSecret,
//         userSecret
//       );

//       if (decryptResult.success && decryptResult.content) {
//         let fileBuffer: Buffer;

//         try {
//           let base64Data = decryptResult.content;
//           if (base64Data.includes(",")) {
//             const parts = base64Data.split(",");
//             if (parts.length === 2 && parts[0].includes("base64")) {
//               base64Data = parts[1];
//             }
//           }

//           base64Data = base64Data.replace(/\s/g, "");
//           fileBuffer = Buffer.from(base64Data, "base64");
//         } catch (bufferError) {
//           console.error("Error converting base64 to buffer:", bufferError);
//           fileBuffer = Buffer.from(decryptResult.content, "utf-8");
//         }

//         const contentType =
//           decryptResult.originalContentType ||
//           getContentTypeFromFileName(fileName) ||
//           "application/octet-stream";

//         return new NextResponse(new Uint8Array(fileBuffer), {
//           status: 200,
//           headers: {
//             "Content-Type": contentType,
//             "Content-Disposition": `attachment; filename="${fileName}"`,
//             "Content-Length": fileBuffer.length.toString(),
//             "Cache-Control": "no-cache",
//           },
//         });
//       }
//     } catch (error) {
//       throw error;
//     }

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "User-Agent": "Clipposaurus-Proxy/1.0",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch file: ${response.status}`);
//     }

//     const fileBuffer = await response.arrayBuffer();
//     const contentType =
//       response.headers.get("content-type") ||
//       getContentTypeFromFileName(fileName) ||
//       "application/octet-stream";

//     return new NextResponse(fileBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": contentType,
//         "Content-Disposition": `attachment; filename="${fileName}"`,
//         "Content-Length": fileBuffer.byteLength.toString(),
//         "Cache-Control": "no-cache",
//       },
//     });
//   } catch {
//     return NextResponse.json(
//       { error: "Failed to download file" },
//       { status: 500 }
//     );
//   }
// }

// function getContentTypeFromFileName(fileName: string): string | null {
//   const ext = fileName.toLowerCase().split(".").pop();

//   const contentTypes: Record<string, string> = {
//     // Images
//     jpg: "image/jpeg",
//     jpeg: "image/jpeg",
//     png: "image/png",
//     gif: "image/gif",
//     webp: "image/webp",
//     svg: "image/svg+xml",

//     // Documents
//     pdf: "application/pdf",
//     doc: "application/msword",
//     docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     xls: "application/vnd.ms-excel",
//     xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     ppt: "application/vnd.ms-powerpoint",
//     pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

//     // Text
//     txt: "text/plain",
//     html: "text/html",
//     css: "text/css",
//     js: "application/javascript",
//     json: "application/json",
//     xml: "application/xml",

//     // Archives
//     zip: "application/zip",
//     rar: "application/x-rar-compressed",
//     "7z": "application/x-7z-compressed",

//     // Audio/Video
//     mp3: "audio/mpeg",
//     wav: "audio/wav",
//     mp4: "video/mp4",
//     avi: "video/x-msvideo",
//   };

//   return ext ? contentTypes[ext] || null : null;
// }
