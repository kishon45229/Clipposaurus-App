import {
  encryptWithDropKey,
  encryptFileContentWithDropKey,
} from "../encryption";

describe("Encryption Functions", () => {
  const mockIdentifier = "test-identifier";
  const mockSystemSecret = "test-system";
  const mockUserSecret = "test-user";
  const mockPlaintext = "This is a test message";

  describe("encryptWithDropKey", () => {
    it("should encrypt plaintext successfully", async () => {
      const result = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result).toHaveProperty("encryptedContent");
      expect(result).toHaveProperty("iv");
      expect(result).toHaveProperty("salt");
      expect(result).toHaveProperty("authTag");
      expect(result).toHaveProperty("nonce");
      expect(result.encryptedContent).toBeTruthy();
      expect(result.iv).toBeTruthy();
      expect(result.salt).toBeTruthy();
      expect(result.authTag).toBeTruthy();
      expect(result.nonce).toBeTruthy();
    });

    it("should throw error for invalid plaintext", async () => {
      await expect(
        encryptWithDropKey("", mockIdentifier, mockSystemSecret, mockUserSecret)
      ).rejects.toThrow("Invalid input");
    });

    it("should throw error for missing identifier", async () => {
      await expect(
        encryptWithDropKey(mockPlaintext, "", mockSystemSecret, mockUserSecret)
      ).rejects.toThrow("Invalid input");
    });

    it("should throw error for missing systemSecret", async () => {
      await expect(
        encryptWithDropKey(mockPlaintext, mockIdentifier, "", mockUserSecret)
      ).rejects.toThrow("Invalid input");
    });

    it("should throw error for missing userSecret", async () => {
      await expect(
        encryptWithDropKey(mockPlaintext, mockIdentifier, mockSystemSecret, "")
      ).rejects.toThrow("Invalid input");
    });

    it("should generate different nonces for same content", async () => {
      const result1 = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      const result2 = await encryptWithDropKey(
        mockPlaintext,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result1.nonce).not.toBe(result2.nonce);
      expect(result1.encryptedContent).not.toBe(result2.encryptedContent);
    });

    it("should handle unicode characters", async () => {
      const unicodeText = "测试 🎉 тест";
      const result = await encryptWithDropKey(
        unicodeText,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.encryptedContent).toBeTruthy();
    });

    it("should handle large text content", async () => {
      const largeText = "a".repeat(100000);
      const result = await encryptWithDropKey(
        largeText,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.encryptedContent).toBeTruthy();
    });
  });

  describe("encryptFileContentWithDropKey", () => {
    it("should encrypt file content successfully", async () => {
      const fileContent = "base64encodedcontent";
      const result = await encryptFileContentWithDropKey(
        fileContent,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result).toHaveProperty("encryptedContent");
      expect(result).toHaveProperty("iv");
      expect(result).toHaveProperty("salt");
      expect(result).toHaveProperty("authTag");
      expect(result).toHaveProperty("nonce");
    });

    it("should throw error for empty file content", async () => {
      await expect(
        encryptFileContentWithDropKey(
          "",
          mockIdentifier,
          mockSystemSecret,
          mockUserSecret
        )
      ).rejects.toThrow("Invalid input");
    });

    it("should handle large file content", async () => {
      const largeContent = btoa("x".repeat(1000000)); // Large base64 content
      const result = await encryptFileContentWithDropKey(
        largeContent,
        mockIdentifier,
        mockSystemSecret,
        mockUserSecret
      );

      expect(result.encryptedContent).toBeTruthy();
    });
  });
});
