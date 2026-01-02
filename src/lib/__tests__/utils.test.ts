import {
  formatFileSize,
  formatSize,
  deriveKey,
  calculateTotalItems,
  createFileItem,
} from "../utils";
import { FileItem } from "@/types";

describe("utils", () => {
  describe("formatFileSize", () => {
    it("should format 0 bytes", () => {
      expect(formatFileSize(0)).toBe("0 Bytes");
    });

    it("should format bytes", () => {
      expect(formatFileSize(500)).toBe("500 Bytes");
    });

    it("should format kilobytes", () => {
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1536)).toBe("1.5 KB");
    });

    it("should format megabytes", () => {
      expect(formatFileSize(1048576)).toBe("1 MB");
      expect(formatFileSize(1572864)).toBe("1.5 MB");
    });

    it("should format gigabytes", () => {
      expect(formatFileSize(1073741824)).toBe("1 GB");
      expect(formatFileSize(1610612736)).toBe("1.5 GB");
    });

    it("should round to 2 decimal places", () => {
      expect(formatFileSize(1234567)).toBe("1.18 MB");
    });
  });

  describe("formatSize", () => {
    it("should format 0 bytes as 0 MB", () => {
      expect(formatSize(0)).toBe("0 MB");
    });

    it("should format bytes to MB with 1 decimal", () => {
      expect(formatSize(1048576)).toBe("1.0 MB");
    });

    it("should format large values", () => {
      expect(formatSize(5242880)).toBe("5.0 MB");
    });

    it("should format small values", () => {
      expect(formatSize(524288)).toBe("0.5 MB");
    });

    it("should round to 1 decimal place", () => {
      expect(formatSize(1234567)).toBe("1.2 MB");
    });
  });

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

  describe("calculateTotalItems", () => {
    it("should return 0 for empty inputs", () => {
      const total = calculateTotalItems("", "", []);
      expect(total).toBe(0);
    });

    it("should count text content", () => {
      const total = calculateTotalItems("test text", "", []);
      expect(total).toBe(1);
    });

    it("should count code content", () => {
      const total = calculateTotalItems("", "test code", []);
      expect(total).toBe(1);
    });

    it("should count both text and code", () => {
      const total = calculateTotalItems("test text", "test code", []);
      expect(total).toBe(2);
    });

    it("should count files", () => {
      const files: FileItem[] = [
        { id: "1", name: "file1.txt", size: 100, content: "", file: null },
        { id: "2", name: "file2.txt", size: 200, content: "", file: null },
      ];
      const total = calculateTotalItems("", "", files);
      expect(total).toBe(2);
    });

    it("should count all items together", () => {
      const files: FileItem[] = [
        { id: "1", name: "file1.txt", size: 100, content: "", file: null },
        { id: "2", name: "file2.txt", size: 200, content: "", file: null },
      ];
      const total = calculateTotalItems("test text", "test code", files);
      expect(total).toBe(4);
    });

    it("should handle single file with content", () => {
      const files: FileItem[] = [
        { id: "1", name: "file.txt", size: 100, content: "", file: null },
      ];
      const total = calculateTotalItems("text", "", files);
      expect(total).toBe(2);
    });
  });

  describe("createFileItem", () => {
    it("should create a file item from File object", () => {
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const fileItem = createFileItem(file);

      expect(fileItem.id).toBe("");
      expect(fileItem.name).toBe("test.txt");
      expect(fileItem.size).toBe(7); // 'content' is 7 bytes
      expect(fileItem.content).toBe("");
      expect(fileItem.file).toBe(file);
    });

    it("should handle different file types", () => {
      const file = new File(["data"], "image.png", { type: "image/png" });
      const fileItem = createFileItem(file);

      expect(fileItem.name).toBe("image.png");
      expect(fileItem.file).toBe(file);
    });

    it("should handle large files", () => {
      const largeContent = "x".repeat(1000000);
      const file = new File([largeContent], "large.txt", {
        type: "text/plain",
      });
      const fileItem = createFileItem(file);

      expect(fileItem.size).toBe(1000000);
      expect(fileItem.file).toBe(file);
    });

    it("should handle empty files", () => {
      const file = new File([], "empty.txt", { type: "text/plain" });
      const fileItem = createFileItem(file);

      expect(fileItem.size).toBe(0);
      expect(fileItem.file).toBe(file);
    });
  });
});
