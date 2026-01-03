import {
  processFileWithSizeCheck,
  getCurrentTotalSize,
  isOverLimit,
} from "../fileSizeCheck";
import { FileItem } from "@/types";
import { FILE_SIZE_CONFIG } from "@/constants/fileProcessingConfig";

// Mock the utils module
jest.mock("../utils", () => ({
  formatSize: jest.fn((bytes: number) => {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }),
  readFileAsDataUrl: jest.fn((_file: File) =>
    Promise.resolve("data:text/plain;base64,dGVzdA==")
  ),
  createFileItem: jest.fn((file: File) => ({
    id: "",
    name: file.name,
    size: file.size,
    content: "",
    file: file,
  })),
}));

describe("fileSizeCheck", () => {
  const { MAX_TOTAL_SIZE, MAX_INDIVIDUAL_FILE_SIZE } = FILE_SIZE_CONFIG;

  describe("processFileWithSizeCheck", () => {
    it("should process a valid file successfully", async () => {
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const result = await processFileWithSizeCheck(0, file);

      expect(result.name).toBe("test.txt");
      expect(result.size).toBe(7);
      expect(result.id).toBeTruthy();
      expect(result.content).toBe("data:text/plain;base64,dGVzdA==");
    });

    it("should generate UUID for file", async () => {
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const result = await processFileWithSizeCheck(0, file);

      expect(result.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });

    it("should throw error for file exceeding individual size limit", async () => {
      const largeSize = MAX_INDIVIDUAL_FILE_SIZE + 1;
      const largeFile = new File(["x".repeat(largeSize)], "large.txt", {
        type: "text/plain",
      });

      await expect(processFileWithSizeCheck(0, largeFile)).rejects.toThrow(
        "too large"
      );
    });

    it("should throw error for file exceeding total size limit", async () => {
      const currentSize = MAX_TOTAL_SIZE - 1000; // Just under limit
      const file = new File(["x".repeat(2000)], "test.txt", {
        type: "text/plain",
      });

      await expect(processFileWithSizeCheck(currentSize, file)).rejects.toThrow(
        "exceed the"
      );
    });

    it("should process file at exact individual size limit", async () => {
      // Create a mock file with exact size
      Object.defineProperty(File.prototype, "size", {
        get: function () {
          return MAX_INDIVIDUAL_FILE_SIZE;
        },
        configurable: true,
      });

      const file = new File([""], "exact.txt", { type: "text/plain" });
      const result = await processFileWithSizeCheck(0, file);

      expect(result).toBeDefined();
      expect(result.name).toBe("exact.txt");
    });

    it("should calculate remaining space correctly in error message", async () => {
      const currentSize = MAX_TOTAL_SIZE - 1000;
      const file = new File(["x".repeat(2000)], "test.txt", {
        type: "text/plain",
      });

      try {
        await processFileWithSizeCheck(currentSize, file);
      } catch (error) {
        expect((error as Error).message).toContain("Available space");
        expect((error as Error).message).toContain("0.0 MB"); // 1000 bytes ≈ 0.0 MB
      }
    });

    it("should handle file read errors gracefully", async () => {
      const { readFileAsDataUrl } = await import("../utils");
      (readFileAsDataUrl as jest.Mock).mockRejectedValueOnce(
        new Error("Read failed")
      );

      const file = new File(["content"], "test.txt", { type: "text/plain" });

      await expect(processFileWithSizeCheck(0, file)).rejects.toThrow(
        "Read failed"
      );
    });
  });

  describe("getCurrentTotalSize", () => {
    it("should calculate total size of empty array", () => {
      const files: FileItem[] = [];
      const total = getCurrentTotalSize(files);
      expect(total).toBe(0);
    });

    it("should calculate total size of single file", () => {
      const files: FileItem[] = [
        { id: "1", name: "file1.txt", size: 100, content: "", file: null },
      ];
      const total = getCurrentTotalSize(files);
      expect(total).toBe(100);
    });

    it("should calculate total size of multiple files", () => {
      const files: FileItem[] = [
        { id: "1", name: "file1.txt", size: 100, content: "", file: null },
        { id: "2", name: "file2.txt", size: 200, content: "", file: null },
        { id: "3", name: "file3.txt", size: 300, content: "", file: null },
      ];
      const total = getCurrentTotalSize(files);
      expect(total).toBe(600);
    });

    it("should handle files with undefined size", () => {
      const files = [
        { id: "1", name: "file1.txt", size: 100, content: "", file: null },
        {
          id: "2",
          name: "file2.txt",
          size: undefined,
          content: "",
          file: null,
        },
      ] as unknown as FileItem[];
      const total = getCurrentTotalSize(files);
      expect(total).toBe(100);
    });

    it("should handle files with null size", () => {
      const files = [
        { id: "1", name: "file1.txt", size: 100, content: "", file: null },
        {
          id: "2",
          name: "file2.txt",
          size: null,
          content: "",
          file: null,
        },
      ] as unknown as FileItem[];
      const total = getCurrentTotalSize(files);
      expect(total).toBe(100);
    });

    it("should calculate large total sizes correctly", () => {
      const files: FileItem[] = [
        {
          id: "1",
          name: "file1.txt",
          size: 10 * 1024 * 1024,
          content: "",
          file: null,
        },
        {
          id: "2",
          name: "file2.txt",
          size: 20 * 1024 * 1024,
          content: "",
          file: null,
        },
      ];
      const total = getCurrentTotalSize(files);
      expect(total).toBe(30 * 1024 * 1024);
    });
  });

  describe("isOverLimit", () => {
    it("should return false for size under limit", () => {
      const result = isOverLimit(MAX_TOTAL_SIZE - 1);
      expect(result).toBe(false);
    });

    it("should return false for size at limit", () => {
      const result = isOverLimit(MAX_TOTAL_SIZE);
      expect(result).toBe(false);
    });

    it("should return true for size over limit", () => {
      const result = isOverLimit(MAX_TOTAL_SIZE + 1);
      expect(result).toBe(true);
    });

    it("should return false for zero size", () => {
      const result = isOverLimit(0);
      expect(result).toBe(false);
    });

    it("should return false for very small size", () => {
      const result = isOverLimit(100);
      expect(result).toBe(false);
    });

    it("should return true for significantly over limit", () => {
      const result = isOverLimit(MAX_TOTAL_SIZE * 2);
      expect(result).toBe(true);
    });
  });
});
