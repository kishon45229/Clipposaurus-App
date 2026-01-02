import {
  generateIdentifier,
  validateIdentifier,
  generateSystemSecret,
  markKeyAsUsed,
  releaseKey,
} from "../dropKeyService";

// Mock the global fetch
global.fetch = jest.fn();

describe("dropKeyService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateIdentifier", () => {
    it("should generate identifier successfully", async () => {
      const mockResponse = {
        identifier: "test123",
        expiresIn: 600,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await generateIdentifier();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/drop-key/generate/identifier",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should use default expiresIn if not provided", async () => {
      const mockResponse = {
        identifier: "test123",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await generateIdentifier();

      expect(result.expiresIn).toBe(600);
    });

    it("should throw error on failed request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(generateIdentifier()).rejects.toThrow(
        "Failed to generate identifier"
      );
    });

    it("should throw error on network failure", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(generateIdentifier()).rejects.toThrow("Network error");
    });
  });

  describe("validateIdentifier", () => {
    it("should validate identifier successfully", async () => {
      const mockResponse = {
        valid: true,
        expired: false,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await validateIdentifier("test123");

      expect(global.fetch).toHaveBeenCalledWith("/api/drop-key/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: "test123" }),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should return expired status", async () => {
      const mockResponse = {
        valid: false,
        expired: true,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await validateIdentifier("expired123");

      expect(result.valid).toBe(false);
      expect(result.expired).toBe(true);
    });

    it("should throw error on failed request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(validateIdentifier("test123")).rejects.toThrow(
        "Failed to validate identifier"
      );
    });
  });

  describe("generateSystemSecret", () => {
    it("should generate system secret successfully", async () => {
      const mockResponse = {
        systemSecret: "secret123",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await generateSystemSecret();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/drop-key/generate/system-secret",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toBe("secret123");
    });

    it("should throw error on failed request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(generateSystemSecret()).rejects.toThrow(
        "Failed to get system secret"
      );
    });
  });

  describe("markKeyAsUsed", () => {
    it("should mark key as used successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await markKeyAsUsed("test123");

      expect(global.fetch).toHaveBeenCalledWith("/api/drop-key/mark-used", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: "test123", ttlSeconds: undefined }),
      });
      expect(result).toBe(true);
    });

    it("should mark key as used with custom TTL", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await markKeyAsUsed("test123", 300);

      expect(global.fetch).toHaveBeenCalledWith("/api/drop-key/mark-used", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: "test123", ttlSeconds: 300 }),
      });
      expect(result).toBe(true);
    });

    it("should throw error on failed request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(markKeyAsUsed("test123")).rejects.toThrow(
        "Failed to mark key as used"
      );
    });
  });

  describe("releaseKey", () => {
    it("should release key successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await releaseKey("test123");

      expect(global.fetch).toHaveBeenCalledWith("/api/drop-key/release", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: "test123" }),
      });
      expect(result).toBe(true);
    });

    it("should throw error on failed request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(releaseKey("test123")).rejects.toThrow(
        "Failed to release key"
      );
    });
  });
});
