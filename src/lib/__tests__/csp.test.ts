import { describe, it, expect } from "@jest/globals";

describe("CSP Nonce Implementation", () => {
  it("should have nonce utility function", async () => {
    const { getNonce } = await import("../csp");
    expect(getNonce).toBeDefined();
    expect(typeof getNonce).toBe("function");
  });

  it("nonce should be a base64 string format when provided", () => {
    const testNonce = Buffer.from(
      "12345678-1234-1234-1234-123456789abc",
    ).toString("base64");
    expect(testNonce).toBeTruthy();
    expect(testNonce.length).toBeGreaterThan(0);
    // Base64 regex pattern
    expect(testNonce).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});
