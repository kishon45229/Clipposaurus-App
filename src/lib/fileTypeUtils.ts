// TEMPORARILY DISABLED

// export interface FileTypeInfo {
//   category:
//     | "image"
//     | "video"
//     | "audio"
//     | "document"
//     | "text"
//     | "code"
//     | "archive"
//     | "other";
//   mimeType: string;
//   canPreview: boolean;
//   icon: string;
// }

// export const FILE_TYPE_MAP: Record<string, FileTypeInfo> = {
//   // Images
//   jpg: {
//     category: "image",
//     mimeType: "image/jpeg",
//     canPreview: true,
//     icon: "Image",
//   },
//   jpeg: {
//     category: "image",
//     mimeType: "image/jpeg",
//     canPreview: true,
//     icon: "Image",
//   },
//   png: {
//     category: "image",
//     mimeType: "image/png",
//     canPreview: true,
//     icon: "Image",
//   },
//   gif: {
//     category: "image",
//     mimeType: "image/gif",
//     canPreview: true,
//     icon: "Image",
//   },
//   webp: {
//     category: "image",
//     mimeType: "image/webp",
//     canPreview: true,
//     icon: "Image",
//   },
//   svg: {
//     category: "image",
//     mimeType: "image/svg+xml",
//     canPreview: true,
//     icon: "Image",
//   },
//   bmp: {
//     category: "image",
//     mimeType: "image/bmp",
//     canPreview: true,
//     icon: "Image",
//   },
//   ico: {
//     category: "image",
//     mimeType: "image/x-icon",
//     canPreview: true,
//     icon: "Image",
//   },

//   // Videos
//   mp4: {
//     category: "video",
//     mimeType: "video/mp4",
//     canPreview: false,
//     icon: "Video",
//   },
//   avi: {
//     category: "video",
//     mimeType: "video/x-msvideo",
//     canPreview: false,
//     icon: "Video",
//   },
//   mov: {
//     category: "video",
//     mimeType: "video/quicktime",
//     canPreview: false,
//     icon: "Video",
//   },
//   mkv: {
//     category: "video",
//     mimeType: "video/x-matroska",
//     canPreview: false,
//     icon: "Video",
//   },
//   webm: {
//     category: "video",
//     mimeType: "video/webm",
//     canPreview: false,
//     icon: "Video",
//   },

//   // Audio
//   mp3: {
//     category: "audio",
//     mimeType: "audio/mpeg",
//     canPreview: false,
//     icon: "Music",
//   },
//   wav: {
//     category: "audio",
//     mimeType: "audio/wav",
//     canPreview: false,
//     icon: "Music",
//   },
//   flac: {
//     category: "audio",
//     mimeType: "audio/flac",
//     canPreview: false,
//     icon: "Music",
//   },
//   ogg: {
//     category: "audio",
//     mimeType: "audio/ogg",
//     canPreview: false,
//     icon: "Music",
//   },

//   // Documents
//   pdf: {
//     category: "document",
//     mimeType: "application/pdf",
//     canPreview: false,
//     icon: "FileText",
//   },
//   doc: {
//     category: "document",
//     mimeType: "application/msword",
//     canPreview: false,
//     icon: "FileText",
//   },
//   docx: {
//     category: "document",
//     mimeType:
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     canPreview: false,
//     icon: "FileText",
//   },
//   xls: {
//     category: "document",
//     mimeType: "application/vnd.ms-excel",
//     canPreview: false,
//     icon: "Sheet",
//   },
//   xlsx: {
//     category: "document",
//     mimeType:
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     canPreview: false,
//     icon: "Sheet",
//   },
//   ppt: {
//     category: "document",
//     mimeType: "application/vnd.ms-powerpoint",
//     canPreview: false,
//     icon: "Presentation",
//   },
//   pptx: {
//     category: "document",
//     mimeType:
//       "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//     canPreview: false,
//     icon: "Presentation",
//   },

//   // Text files
//   txt: {
//     category: "text",
//     mimeType: "text/plain",
//     canPreview: true,
//     icon: "FileText",
//   },
//   md: {
//     category: "text",
//     mimeType: "text/markdown",
//     canPreview: true,
//     icon: "FileText",
//   },
//   rtf: {
//     category: "text",
//     mimeType: "application/rtf",
//     canPreview: true,
//     icon: "FileText",
//   },

//   // Code files
//   js: {
//     category: "code",
//     mimeType: "application/javascript",
//     canPreview: true,
//     icon: "Code",
//   },
//   ts: {
//     category: "code",
//     mimeType: "application/typescript",
//     canPreview: true,
//     icon: "Code",
//   },
//   jsx: {
//     category: "code",
//     mimeType: "text/jsx",
//     canPreview: true,
//     icon: "Code",
//   },
//   tsx: {
//     category: "code",
//     mimeType: "text/tsx",
//     canPreview: true,
//     icon: "Code",
//   },
//   html: {
//     category: "code",
//     mimeType: "text/html",
//     canPreview: true,
//     icon: "Code",
//   },
//   css: {
//     category: "code",
//     mimeType: "text/css",
//     canPreview: true,
//     icon: "Code",
//   },
//   scss: {
//     category: "code",
//     mimeType: "text/scss",
//     canPreview: true,
//     icon: "Code",
//   },
//   sass: {
//     category: "code",
//     mimeType: "text/sass",
//     canPreview: true,
//     icon: "Code",
//   },
//   json: {
//     category: "code",
//     mimeType: "application/json",
//     canPreview: true,
//     icon: "Code",
//   },
//   xml: {
//     category: "code",
//     mimeType: "application/xml",
//     canPreview: true,
//     icon: "Code",
//   },
//   py: {
//     category: "code",
//     mimeType: "text/x-python",
//     canPreview: true,
//     icon: "Code",
//   },
//   java: {
//     category: "code",
//     mimeType: "text/x-java",
//     canPreview: true,
//     icon: "Code",
//   },
//   c: { category: "code", mimeType: "text/x-c", canPreview: true, icon: "Code" },
//   cpp: {
//     category: "code",
//     mimeType: "text/x-c++",
//     canPreview: true,
//     icon: "Code",
//   },
//   cs: {
//     category: "code",
//     mimeType: "text/x-csharp",
//     canPreview: true,
//     icon: "Code",
//   },
//   php: {
//     category: "code",
//     mimeType: "application/x-httpd-php",
//     canPreview: true,
//     icon: "Code",
//   },
//   rb: {
//     category: "code",
//     mimeType: "application/x-ruby",
//     canPreview: true,
//     icon: "Code",
//   },
//   go: {
//     category: "code",
//     mimeType: "text/x-go",
//     canPreview: true,
//     icon: "Code",
//   },
//   rs: {
//     category: "code",
//     mimeType: "text/x-rust",
//     canPreview: true,
//     icon: "Code",
//   },
//   sql: {
//     category: "code",
//     mimeType: "application/sql",
//     canPreview: true,
//     icon: "Database",
//   },
//   yml: {
//     category: "code",
//     mimeType: "application/x-yaml",
//     canPreview: true,
//     icon: "Code",
//   },
//   yaml: {
//     category: "code",
//     mimeType: "application/x-yaml",
//     canPreview: true,
//     icon: "Code",
//   },

//   // Archives
//   zip: {
//     category: "archive",
//     mimeType: "application/zip",
//     canPreview: false,
//     icon: "Archive",
//   },
//   rar: {
//     category: "archive",
//     mimeType: "application/vnd.rar",
//     canPreview: false,
//     icon: "Archive",
//   },
//   "7z": {
//     category: "archive",
//     mimeType: "application/x-7z-compressed",
//     canPreview: false,
//     icon: "Archive",
//   },
//   tar: {
//     category: "archive",
//     mimeType: "application/x-tar",
//     canPreview: false,
//     icon: "Archive",
//   },
//   gz: {
//     category: "archive",
//     mimeType: "application/gzip",
//     canPreview: false,
//     icon: "Archive",
//   },
// };

// export function getFileTypeInfo(fileName: string): FileTypeInfo {
//   const extension = fileName.toLowerCase().split(".").pop();

//   if (!extension || !FILE_TYPE_MAP[extension]) {
//     return {
//       category: "other",
//       mimeType: "application/octet-stream",
//       canPreview: false,
//       icon: "File",
//     };
//   }

//   return FILE_TYPE_MAP[extension];
// }

// export function canPreviewFile(fileName: string): boolean {
//   return getFileTypeInfo(fileName).canPreview;
// }

// export function getFileCategory(fileName: string): FileTypeInfo["category"] {
//   return getFileTypeInfo(fileName).category;
// }

// export function isImageFile(fileName: string): boolean {
//   return getFileCategory(fileName) === "image";
// }

// export function isTextBasedFile(fileName: string): boolean {
//   const category = getFileCategory(fileName);
//   return category === "text" || category === "code";
// }

// export function getFileIcon(fileName: string): string {
//   return getFileTypeInfo(fileName).icon;
// }

// export function extractTextFromDataUrl(dataUrl: string): string | null {
//   try {
//     if (!dataUrl.startsWith("data:")) {
//       return null;
//     }

//     const [header, base64Data] = dataUrl.split(",");

//     if (!base64Data) {
//       return null;
//     }

//     const mimeType = header.match(/data:([^;]+)/)?.[1];
//     if (
//       !mimeType ||
//       (!mimeType.startsWith("text/") &&
//         !mimeType.includes("json") &&
//         !mimeType.includes("xml"))
//     ) {
//       return null;
//     }

//     const decodedText = atob(base64Data);
//     return decodedText;
//   } catch (error) {
//     console.error("Error extracting text from data URL:", error);
//     return null;
//   }
// }

// export function truncateText(text: string, maxLength: number = 100): string {
//   if (text.length <= maxLength) {
//     return text;
//   }

//   return text.substring(0, maxLength).trim() + "...";
// }
