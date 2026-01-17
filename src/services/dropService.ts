import type {
  // FileItem, --> TEMPORARILY DISABLED
  OpenDropRequestResponse,
  StoredFileItem,
} from "@/types";
import {
  encryptWithDropKey,
  encryptFileContentWithDropKey,
} from "@/lib/encryption";
import { calculateExpiration } from "@/lib/timer";
// import { uploadFilesDirectly } from "@/services/directUploadService";    --> TEMPORARILY DISABLED

export async function sendOpenDropRequest(
  identifier: string,
  recaptchaToken: string | null
): Promise<{
  error?: string;
  data?: OpenDropRequestResponse;
  status: number;
  success: boolean;
}> {
  try {
    const openDropRequestResponse = await fetch("/api/unlock-drop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, recaptchaToken }),
    });

    if (!openDropRequestResponse.ok) {
      const errorData = await openDropRequestResponse.json().catch(() => ({}));
      return {
        success: false,
        status: openDropRequestResponse.status,
        error: errorData.error || "Failed to open Drop",
      };
    }

    const dropData = await openDropRequestResponse.json();

    return {
      success: true,
      status: 200,
      data: dropData,
    };
  } catch (error) {
    throw error;
  }
}

export async function sendCreateDropRequest(
  textContent: string,
  codeContent: string,
  codeLanguage: string,
  // files: FileItem[],  --> TEMPORARILY DISABLED
  retention: string,
  identifier: string,
  systemSecret: string,
  userSecret: string
  // onProgress?: (stage: "encrypting" | "uploading" | "finalizing", progress?: number) => void    --> TEMPORARILY DISABLED
): Promise<{
  success: boolean;
  status: number;
  error?: string | null;
  ttlSeconds?: number;
}> {
  try {
    // FILE UPLOAD TEMPORARILY DISABLED
    /*
    let storedFiles: StoredFileItem[] = [];

    if (files && files.length > 0) {
      const totalFiles = files.length;
      let encryptedCount = 0;

      onProgress?.("encrypting", 0);

      const filesForUpload = await Promise.all(
        files.map(async (file) => {
          const result = {
            ...file,
            content: await encryptFileContentWithDropKey(
              file.content,
              identifier,
              systemSecret,
              userSecret
            ),
          };
          encryptedCount++;
          const encryptionProgress = Math.round((encryptedCount / totalFiles) * 100);
          onProgress?.("encrypting", encryptionProgress);
          return result;
        })
      );

      onProgress?.("uploading", 0);

      const totalBytes = filesForUpload.reduce((sum, file) => {
        const fileData = JSON.stringify({
          id: file.id,
          name: file.name,
          size: file.size,
          content: file.content,
        });
        return sum + new Blob([fileData]).size;
      }, 0);

      let fileUrls: string[] = [];

      try {
        fileUrls = await uploadFilesDirectly(filesForUpload, (progress) => {
          const completedBytes = filesForUpload
            .slice(0, progress.fileIndex)
            .reduce((sum, f) => {
              const fileData = JSON.stringify({
                id: f.id,
                name: f.name,
                size: f.size,
                content: f.content,
              });
              return sum + new Blob([fileData]).size;
            }, 0);

          const uploadedBytes = completedBytes + progress.loaded;
          const overallProgress = Math.min(100, Math.round((uploadedBytes / totalBytes) * 100));
          onProgress?.("uploading", overallProgress);
        });
      } catch (error) {
        console.log("Direct upload failed, falling back to API route:", error);
        
        // Fallback to API route upload
        const fallbackResponse = await fetch("/api/file-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files: filesForUpload }),
        });

        if (!fallbackResponse.ok) {
          return {
            success: false,
            status: fallbackResponse.status,
            error: "File upload failed",
          };
        }

        const fallbackData = await fallbackResponse.json();
        fileUrls = fallbackData.fileUrls || [];
        onProgress?.("uploading", 100);
      }

      if (fileUrls.some(url => url === "")) {
        return {
          success: false,
          status: 500,
          error: "File upload failed",
        };
      }

      storedFiles = await Promise.all(
        files.map(async (originalFile, index) => ({
          id: await encryptWithDropKey(
            originalFile.id,
            identifier,
            systemSecret,
            userSecret
          ),
          name: await encryptWithDropKey(
            originalFile.name,
            identifier,
            systemSecret,
            userSecret
          ),
          size: await encryptWithDropKey(
            originalFile.size.toString(),
            identifier,
            systemSecret,
            userSecret
          ),
          url: fileUrls[index] || "",
        }))
      );
    }*/

    const encryptedTextContent = textContent
      ? await encryptWithDropKey(
          textContent,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const encryptedCodeContent = codeContent
      ? await encryptWithDropKey(
          codeContent,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const encryptedCodeLanguage = codeLanguage
      ? await encryptWithDropKey(
          codeLanguage,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const createdAt = new Date().toISOString();
    const { expiresAt, ttlSeconds } = calculateExpiration(retention);

    const encryptedRetentionPeriod = retention
      ? await encryptWithDropKey(
          retention,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const encryptedCreatedDateTime = await encryptWithDropKey(
      createdAt,
      identifier,
      systemSecret,
      userSecret
    );

    const encryptedExpiryDateTime = await encryptWithDropKey(
      expiresAt,
      identifier,
      systemSecret,
      userSecret
    );

    // onProgress?.("finalizing", 100); --> TEMPORARILY DISABLED

    const createDropResponse = await fetch("/api/create-drop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        textContent: encryptedTextContent,
        codeContent: encryptedCodeContent,
        codeLanguage: encryptedCodeLanguage,
        // files: storedFiles, --> TEMPORARILY DISABLED
        retention: encryptedRetentionPeriod,
        ttlSeconds,
        createdAt: encryptedCreatedDateTime,
        expiresAt: encryptedExpiryDateTime,
      }),
    });

    if (!createDropResponse.ok) {
      const errorData = await createDropResponse.json().catch(() => ({}));
      return {
        success: false,
        status: createDropResponse.status,
        error: errorData.error || "Failed to create Drop",
      };
    }

    return {
      success: true,
      status: 200,
      ttlSeconds,
    };
  } catch (error) {
    throw error;
  }
}

// DELETE DROP REQUEST FUNCTION TEMPORARILY DISABLED
// export async function sendDeleteDropRequest(
//   identifier: string,
//   options?: { preserveFiles?: boolean }
// ): Promise<{
//   success: boolean;
//   status: number;
//   error?: string | null;
// }> {
//   try {
//     const response = await fetch("/api/delete-drop", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         identifier,
//         preserveFiles: options?.preserveFiles ?? false,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return {
//         success: false,
//         status: response.status,
//         error: errorData.error || "Failed to delete Drop",
//       };
//     }

//     return {
//       success: true,
//       status: 200,
//     };
//   } catch (error) {
//     throw error;
//   }
// }
