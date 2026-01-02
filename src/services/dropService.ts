import type {
  FileItem,
  OpenDropRequestResponse,
  StoredFileItem,
} from "@/types";
import {
  encryptWithDropKey,
  encryptFileContentWithDropKey,
} from "@/lib/encryption";
import { calculateExpiration } from "@/lib/timer";

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
    const openDropRequestResponse = await fetch("/api/open-drop", {
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
  files: FileItem[],
  retention: string,
  identifier: string,
  systemSecret: string,
  userSecret: string
): Promise<{
  success: boolean;
  status: number;
  error?: string | null;
  ttlSeconds?: number;
}> {
  try {
    let storedFiles: StoredFileItem[] = [];
    let itemsCompleted = 0;

    if (files && files.length > 0) {
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
          itemsCompleted++;
          return result;
        })
      );

      const fileUploadResponse = await fetch("/api/file-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: filesForUpload }),
      });

      if (!fileUploadResponse.ok) {
        const errorData = await fileUploadResponse.json().catch(() => ({}));
        return {
          success: false,
          status: fileUploadResponse.status,
          error: errorData.error || "File upload failed",
        };
      }

      const fileUploadData = await fileUploadResponse.json();
      const fileUrls = fileUploadData.fileUrls || [];

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
    }

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
        files: storedFiles,
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

export async function sendDeleteDropRequest(
  identifier: string,
  options?: { preserveFiles?: boolean }
): Promise<{
  success: boolean;
  status: number;
  error?: string | null;
}> {
  try {
    const response = await fetch("/api/delete-drop", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        preserveFiles: options?.preserveFiles ?? false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        status: response.status,
        error: errorData.error || "Failed to delete Drop",
      };
    }

    return {
      success: true,
      status: 200,
    };
  } catch (error) {
    throw error;
  }
}
