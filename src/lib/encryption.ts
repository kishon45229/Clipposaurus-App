import crypto from "crypto";
import { EncryptedData } from "@/types/encryption";
import { deriveKey } from "@/lib/utils";

export async function encryptWithDropKey(
  plaintext: string,
  identifier: string,
  systemSecret: string,
  userSecret: string
): Promise<EncryptedData> {
  if (
    !plaintext ||
    typeof plaintext !== "string" ||
    !identifier ||
    !systemSecret ||
    !userSecret
  ) {
    throw new Error("Invalid input");
  }
  const nonce = crypto.randomBytes(16).toString("hex");
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);

  const dropKey = `${identifier}-${systemSecret}-${userSecret}-${nonce}`;
  const key = await deriveKey(dropKey, salt);

  try {
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    cipher.setAAD(Buffer.from(identifier, "utf8"));

    const encryptedBuffers: Buffer[] = [];
    encryptedBuffers.push(cipher.update(Buffer.from(plaintext, "utf8")));
    encryptedBuffers.push(cipher.final());
    const ciphertext = Buffer.concat(encryptedBuffers);

    const authTag = cipher.getAuthTag();

    const result: EncryptedData = {
      encryptedContent: ciphertext.toString("base64"),
      iv: iv.toString("hex"),
      salt: salt.toString("hex"),
      authTag: authTag.toString("hex"),
      nonce,
    };

    return result;
  } catch {
    throw new Error("Encryption failed due to an unknown error");
  }
}

/**
 * Encrypts file content using a three-word drop key
 * @param content - The content to encrypt (string or Buffer)
 * @param identifier - The system-generated identifier
 * @param systemSecret - The system-generated secret
 * @param userSecret - The user-provided secret
 * @param onProgress - Optional progress callback (0-100)
 * @returns Encryption result with encrypted data or error
 */
export async function encryptFileContentWithDropKey(
  content: string | Buffer,
  identifier: string,
  systemSecret: string,
  userSecret: string
): Promise<EncryptedData> {
  try {
    let contentString: string;

    if (Buffer.isBuffer(content)) {
      contentString = content.toString("base64");
    } else if (typeof content === "string") {
      contentString = content;
    } else {
      throw new Error("Invalid content type: must be string or Buffer");
    }
    return await encryptWithDropKey(
      contentString,
      identifier,
      systemSecret,
      userSecret
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Content encryption with drop key failed: ${errorMessage}`);
  }
}
