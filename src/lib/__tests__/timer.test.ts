import getTimeout, { calculateExpiration } from "../timer";

describe("timer", () => {
  describe("getTimeout", () => {
    it("should reject after specified interval", async () => {
      const interval = 100;
      const errMsg = "Timeout error";

      const promise = getTimeout({ interval, errMsg });

      await expect(promise).rejects.toThrow(errMsg);
    });

    it("should reject with correct error message", async () => {
      const customMessage = "Custom timeout message";
      const promise = getTimeout({ interval: 50, errMsg: customMessage });

      await expect(promise).rejects.toThrow(customMessage);
    });

    it("should reject after correct interval", async () => {
      const start = Date.now();
      const interval = 100;

      try {
        await getTimeout({ interval, errMsg: "Test timeout" });
      } catch {
        const elapsed = Date.now() - start;
        expect(elapsed).toBeGreaterThanOrEqual(interval - 10); // Allow small margin
        expect(elapsed).toBeLessThan(interval + 50); // Allow reasonable margin
      }
    });
  });

  describe("calculateExpiration", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should calculate 30 minutes expiration", () => {
      const result = calculateExpiration("keep-30-minutes");

      expect(result.ttlSeconds).toBe(1800); // 30 * 60
      expect(result.expiresAt).toBe("2024-01-01T00:30:00.000Z");
    });

    it("should calculate 1 hour expiration for keep-1-hour", () => {
      const result = calculateExpiration("keep-1-hour");

      expect(result.ttlSeconds).toBe(3600); // 60 * 60
      expect(result.expiresAt).toBe("2024-01-01T01:00:00.000Z");
    });

    it("should calculate 1 hour expiration for delete-on-access", () => {
      const result = calculateExpiration("delete-on-access");

      expect(result.ttlSeconds).toBe(3600);
      expect(result.expiresAt).toBe("2024-01-01T01:00:00.000Z");
    });

    it("should default to 1 hour for unknown retention", () => {
      const result = calculateExpiration("unknown-option");

      expect(result.ttlSeconds).toBe(3600);
      expect(result.expiresAt).toBe("2024-01-01T01:00:00.000Z");
    });

    it("should return ISO string format", () => {
      const result = calculateExpiration("keep-30-minutes");

      expect(result.expiresAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
    });

    it("should handle different system times correctly", () => {
      jest.setSystemTime(new Date("2024-06-15T12:30:00.000Z"));

      const result = calculateExpiration("keep-30-minutes");

      expect(result.expiresAt).toBe("2024-06-15T13:00:00.000Z");
      expect(result.ttlSeconds).toBe(1800);
    });
  });
});
