import { formatCountdown, FormatCountdownResult } from "../countdown";

describe("countdown", () => {
  describe("formatCountdown", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should return empty string for null", () => {
      const result = formatCountdown(null);
      expect(result.timeLeft).toBe("");
      expect(result.isExpired).toBe(false);
    });

    it("should return empty string for undefined", () => {
      const result = formatCountdown(undefined);
      expect(result.timeLeft).toBe("");
      expect(result.isExpired).toBe(false);
    });

    it("should show expired for past date", () => {
      const pastDate = new Date("2024-01-01T11:00:00.000Z");
      const result = formatCountdown(pastDate);
      expect(result.timeLeft).toBe("Expired");
      expect(result.isExpired).toBe(true);
    });

    it("should format days correctly", () => {
      const futureDate = new Date("2024-01-03T15:30:45.000Z"); // 2 days, 3 hours, 30 minutes
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("2d 3h 30m");
      expect(result.isExpired).toBe(false);
    });

    it("should format hours and minutes when no days", () => {
      const futureDate = new Date("2024-01-01T15:30:00.000Z"); // 3 hours, 30 minutes
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("3h 30m");
      expect(result.isExpired).toBe(false);
    });

    it("should format minutes when less than 1 hour", () => {
      const futureDate = new Date("2024-01-01T12:25:00.000Z"); // 25 minutes
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("25m");
      expect(result.isExpired).toBe(false);
    });

    it("should format 1 minute with seconds", () => {
      const futureDate = new Date("2024-01-01T12:01:30.000Z"); // 1 minute 30 seconds
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("1m 30s");
      expect(result.isExpired).toBe(false);
    });

    it("should format seconds when less than 1 minute", () => {
      const futureDate = new Date("2024-01-01T12:00:45.000Z"); // 45 seconds
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("45s");
      expect(result.isExpired).toBe(false);
    });

    it("should handle Date object input", () => {
      const date = new Date("2024-01-01T13:00:00.000Z"); // 1 hour
      const result = formatCountdown(date);
      expect(result.timeLeft).toBe("1h 0m");
      expect(result.isExpired).toBe(false);
    });

    it("should handle string input", () => {
      const dateString = "2024-01-01T13:00:00.000Z"; // 1 hour
      const result = formatCountdown(dateString);
      expect(result.timeLeft).toBe("1h 0m");
      expect(result.isExpired).toBe(false);
    });

    it("should handle number (timestamp) input", () => {
      const timestamp = new Date("2024-01-01T13:00:00.000Z").getTime(); // 1 hour
      const result = formatCountdown(timestamp);
      expect(result.timeLeft).toBe("1h 0m");
      expect(result.isExpired).toBe(false);
    });

    it("should handle exactly 1 day", () => {
      const futureDate = new Date("2024-01-02T12:00:00.000Z"); // exactly 1 day
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("1d 0h 0m");
      expect(result.isExpired).toBe(false);
    });

    it("should handle exactly 0 seconds remaining", () => {
      const futureDate = new Date("2024-01-01T12:00:00.000Z"); // exactly now
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("Expired");
      expect(result.isExpired).toBe(true);
    });

    it("should handle invalid date string", () => {
      const result = formatCountdown("invalid-date");
      expect(result.timeLeft).toBe("Expired");
      expect(result.isExpired).toBe(true);
    });

    it("should update over time", () => {
      const futureDate = new Date("2024-01-01T12:02:00.000Z"); // 2 minutes

      let result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("2m");

      // Advance time by 1 minute
      jest.advanceTimersByTime(60 * 1000);

      result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("1m 0s");

      // Advance time by another minute
      jest.advanceTimersByTime(60 * 1000);

      result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("Expired");
      expect(result.isExpired).toBe(true);
    });

    it("should round down partial seconds", () => {
      const futureDate = new Date("2024-01-01T12:00:05.500Z"); // 5.5 seconds
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toBe("5s");
    });

    it("should handle very long durations", () => {
      const futureDate = new Date("2024-02-01T12:00:00.000Z"); // 31 days
      const result = formatCountdown(futureDate);
      expect(result.timeLeft).toContain("31d");
      expect(result.isExpired).toBe(false);
    });
  });
});
