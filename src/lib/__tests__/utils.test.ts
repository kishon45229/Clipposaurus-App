import { deriveKey } from "../utils";

describe("utils", () => {
  describe("deriveKey", () => {
    it("should derive a key successfully", async () => {
      const masterKey = "test-master-key";
      const salt = Buffer.from("test-salt");

      const derived = await deriveKey(masterKey, salt);

      expect(derived).toBeInstanceOf(Buffer);
      expect(derived.length).toBe(32); // default keyLen
    });

    it("should produce consistent results for same inputs", async () => {
      const masterKey = "test-master-key";
      const salt = Buffer.from("test-salt");

      const derived1 = await deriveKey(masterKey, salt);
      const derived2 = await deriveKey(masterKey, salt);

      expect(derived1.equals(derived2)).toBe(true);
    });

    it("should produce different results for different master keys", async () => {
      const salt = Buffer.from("test-salt");

      const derived1 = await deriveKey("key1", salt);
      const derived2 = await deriveKey("key2", salt);

      expect(derived1.equals(derived2)).toBe(false);
    });

    it("should produce different results for different salts", async () => {
      const masterKey = "test-master-key";

      const derived1 = await deriveKey(masterKey, Buffer.from("salt1"));
      const derived2 = await deriveKey(masterKey, Buffer.from("salt2"));

      expect(derived1.equals(derived2)).toBe(false);
    });

    it("should throw error for empty master key", async () => {
      const salt = Buffer.from("test-salt");

      await expect(deriveKey("", salt)).rejects.toThrow("Missing args");
    });

    it("should handle empty salt buffer", async () => {
      // Empty salt is technically valid for PBKDF2, just not secure
      const result = await deriveKey("test-key", Buffer.alloc(0));
      expect(result).toBeInstanceOf(Buffer);
    });

    it("should respect custom keyLen parameter", async () => {
      const masterKey = "test-master-key";
      const salt = Buffer.from("test-salt");
      const customKeyLen = 16;

      const derived = await deriveKey(masterKey, salt, 100000, customKeyLen);

      expect(derived.length).toBe(customKeyLen);
    });

    it("should respect custom iterations parameter", async () => {
      const masterKey = "test-master-key";
      const salt = Buffer.from("test-salt");
      const customIterations = 50000;

      const derived = await deriveKey(masterKey, salt, customIterations);

      expect(derived).toBeInstanceOf(Buffer);
      expect(derived.length).toBe(32);
    });
  });
});
