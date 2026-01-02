import type { RetrivedDrop, DecryptedDrop } from "@/types";
import { decryptWithDropKey } from "@/lib/decryption";

interface DecryptionResult {
  success: boolean;
  data?: DecryptedDrop;
  error?: string;
}

/**
 * DECRYPT DROP
 * @param dropData - The retrieved drop data to decrypt.
 * @param identifier - The system-generated identifier.
 * @param systemSecret - The system-generated secret.
 * @param userSecret - The user-provided secret.
 * @returns A promise that resolves to a DecryptionResult object containing the decrypted drop data or an error message.
 */
export async function decryptFullDrop(
  dropData: RetrivedDrop,
  identifier: string,
  systemSecret: string,
  userSecret: string
): Promise<DecryptionResult> {
  try {
    const decryptedDrop: DecryptedDrop = {
      identifier,
      dropKey: `${identifier}-${systemSecret}-${userSecret}`,
      decryptedText: undefined,
      decryptedCode: undefined,
      decryptedLanguage: undefined,
      decryptedFiles: undefined,
      decryptedRetentionPeriod: "",
      decryptedCreatedDateTime: new Date(0),
      decryptedExpirationDateTime: new Date(0),
    };

    // DECRYPT TEXT CONTENT
    if (dropData.textContent?.encryptedContent) {
      const textResult = await decryptWithDropKey(
        dropData.textContent,
        identifier,
        systemSecret,
        userSecret
      );
      if (!textResult.success) {
        return {
          success: false,
          error: `Text decryption failed: ${textResult.error}`,
        };
      }
      decryptedDrop.decryptedText = textResult.data;
    }

    // DECRYPT CODE CONTENT
    if (dropData.codeContent?.encryptedContent) {
      const codeResult = await decryptWithDropKey(
        dropData.codeContent,
        identifier,
        systemSecret,
        userSecret
      );
      if (!codeResult.success) {
        return {
          success: false,
          error: `Code decryption failed: ${codeResult.error}`,
        };
      }
      decryptedDrop.decryptedCode = codeResult.data;
    }

    // DECRYPT CODE LANGUAGE
    if (dropData.codeLanguage?.encryptedContent) {
      const languageResult = await decryptWithDropKey(
        dropData.codeLanguage,
        identifier,
        systemSecret,
        userSecret
      );
      if (!languageResult.success) {
        return {
          success: false,
          error: `Language decryption failed: ${languageResult.error}`,
        };
      }
      decryptedDrop.decryptedLanguage = languageResult.data;
    }

    // DECRYPT FILES
    if (dropData.files && dropData.files.length > 0) {
      const decryptedFilesList = [];
      for (const storedFile of dropData.files) {
        const idResult = await decryptWithDropKey(
          storedFile.id,
          identifier,
          systemSecret,
          userSecret
        );
        const nameResult = await decryptWithDropKey(
          storedFile.name,
          identifier,
          systemSecret,
          userSecret
        );
        const sizeResult = await decryptWithDropKey(
          storedFile.size,
          identifier,
          systemSecret,
          userSecret
        );

        if (!idResult.success || !nameResult.success || !sizeResult.success) {
          return { success: false, error: "File metadata decryption failed" };
        }

        decryptedFilesList.push({
          id: idResult.data!,
          name: nameResult.data!,
          url: storedFile.url,
          size: parseInt(sizeResult.data!, 10),
        });
      }
      decryptedDrop.decryptedFiles = decryptedFilesList;
    }

    // DECRYPT RETENTION PERIOD
    if (dropData.retention?.encryptedContent) {
      const retentionResult = await decryptWithDropKey(
        dropData.retention,
        identifier,
        systemSecret,
        userSecret
      );
      if (!retentionResult.success) {
        return {
          success: false,
          error: `Retention decryption failed: ${retentionResult.error}`,
        };
      }
      decryptedDrop.decryptedRetentionPeriod = retentionResult.data || "";
    }

    // DECRYPT CREATED DATE
    if (dropData.createdAt?.encryptedContent) {
      const createdAtResult = await decryptWithDropKey(
        dropData.createdAt,
        identifier,
        systemSecret,
        userSecret
      );
      if (!createdAtResult.success) {
        return {
          success: false,
          error: `CreatedAt decryption failed: ${createdAtResult.error}`,
        };
      }
      decryptedDrop.decryptedCreatedDateTime = new Date(
        createdAtResult.data || 0
      );
    }

    // DECRYPT EXPIRATION DATE
    if (dropData.expiresAt?.encryptedContent) {
      const expiresAtResult = await decryptWithDropKey(
        dropData.expiresAt,
        identifier,
        systemSecret,
        userSecret
      );
      if (!expiresAtResult.success) {
        return {
          success: false,
          error: `ExpiresAt decryption failed: ${expiresAtResult.error}`,
        };
      }
      decryptedDrop.decryptedExpirationDateTime = new Date(
        expiresAtResult.data || 0
      );
    }

    return { success: true, data: decryptedDrop };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown decryption error",
    };
  }
}
