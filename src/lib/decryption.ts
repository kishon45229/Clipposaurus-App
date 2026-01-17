import crypto from "crypto";
import { EncryptedData } from "@/types/encryption";
import { deriveKey } from "@/lib/utils";

interface DecryptTextResult {
  success: boolean;
  data?: string;
  error?: string;
}

interface DecryptContentResult {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * Decrypts content using three-word drop key + nonce (AES-256-GCM)
 * @param encryptedData - Encrypted payload
 * @param identifier - System-generated identifier
 * @param systemSecret - System-generated secret
 * @param userSecret - User-provided secret
 * @returns Plaintext string or error result
 */
export async function decryptWithDropKey(
  encryptedData: EncryptedData,
  identifier: string,
  systemSecret: string,
  userSecret: string
): Promise<DecryptTextResult> {
  try {
    if (!identifier || !systemSecret || !userSecret) {
      throw new Error(
        "All three key parts (identifier, systemSecret, userSecret) are required"
      );
    }

    if (
      !encryptedData ||
      typeof encryptedData !== "object" ||
      !encryptedData.encryptedContent ||
      !encryptedData.iv ||
      !encryptedData.salt ||
      !encryptedData.authTag ||
      !encryptedData.nonce
    ) {
      throw new Error("Invalid encrypted data format or missing fields");
    }

    const { encryptedContent, iv, salt, authTag, nonce } = encryptedData;

    const hexPattern = /^[0-9a-fA-F]+$/;
    if (
      !hexPattern.test(salt) ||
      !hexPattern.test(iv) ||
      !hexPattern.test(authTag)
    ) {
      throw new Error("Invalid hex encoding in encryption metadata");
    }

    const saltBuf = Buffer.from(salt, "hex");
    const ivBuf = Buffer.from(iv, "hex");
    const authTagBuf = Buffer.from(authTag, "hex");

    const isBase64 = /^[A-Za-z0-9+/=]+$/.test(encryptedContent);
    const ciphertextBuf = Buffer.from(
      encryptedContent,
      isBase64 ? "base64" : "hex"
    );

    const dropKey = `${identifier}-${systemSecret}-${userSecret}-${nonce}`;
    const key = await deriveKey(dropKey, saltBuf);

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, ivBuf);
    decipher.setAAD(Buffer.from(identifier, "utf8"));
    decipher.setAuthTag(authTagBuf);

    const decryptedBufs: Buffer[] = [];
    decryptedBufs.push(decipher.update(ciphertextBuf));
    decryptedBufs.push(decipher.final());

    const plaintext = Buffer.concat(decryptedBufs).toString("utf8");

    if (Buffer.isBuffer(key)) key.fill(0);

    return {
      success: true,
      data: plaintext,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        "Decryption failed: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
}
