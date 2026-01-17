import { decryptWithDropKey } from "../decryption";
import { encryptWithDropKey} from "../encryption";
import { EncryptedData } from "@/types/encryption";

describe("Decryption Functions", () => {
  const mockIdentifier = "test-identifier";
  const mockSystemSecret = "test-system";
  const mockUserSecret = "test-user";
  const mockPlaintext = "This is a test message";

  describe("decryptWithDropKey", () => {
    it("should decrypt encrypted content successfully", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(true);
      expect(result.data).toBe(mockPlaintext);
      expect(result.error).toBeUndefined();
    });

    it("should fail with wrong identifier", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        "wrong-identifier",
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
      expect(result.data).toBeUndefined();
    });

    it("should fail with wrong systemSecret", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        mockIdentifier,
        "wrong-secret",
        mockUserSecret
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should fail with wrong userSecret", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        mockIdentifier,
        mockSystemSecret,
        "wrong-user-secret"
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should fail with missing identifier", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        "",
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain("three key parts");
    });

    it("should fail with invalid encrypted data", async () => {
      const invalidEncrypted: EncryptedData = {
        encryptedContent: "",
        iv: "",
        salt: "",
        authTag: "",
        nonce: "",
      };

      const result = await decryptWithDropKey(
        invalidEncrypted,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should handle unicode characters", async () => {
      const unicodeText = "测试 🎉 тест";
      const encrypted = await encryptWithDropKey(
        unicodeText,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(true);
      expect(result.data).toBe(unicodeText);
    });

    it("should handle large content", async () => {
      const largeText = "a".repeat(100000);
      const encrypted = await encryptWithDropKey(
        largeText,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result = await decryptWithDropKey(
        encrypted,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(true);
      expect(result.data).toBe(largeText);
    });

    it("should fail with tampered ciphertext", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      // Tamper with the ciphertext
      const tampered = {
        ...encrypted,
        encryptedContent: encrypted.encryptedContent.slice(0, -5) + "xxxxx",
      };

      const result = await decryptWithDropKey(
        tampered,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("should fail with invalid hex encoding", async () => {
      const encrypted = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const invalidEncrypted = {
        ...encrypted,
        iv: "invalid-hex-string",
      };

      const result = await decryptWithDropKey(
        invalidEncrypted,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain("Invalid hex encoding");
    });
  });
});
