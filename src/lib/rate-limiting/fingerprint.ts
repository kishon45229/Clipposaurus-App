import { NextRequest } from "next/server";
import crypto from "crypto";

export function generateIdentifier(request: NextRequest, ip: string): string {
  const userAgent = request.headers.get("user-agent") || "";
  const acceptLanguage = request.headers.get("accept-language") || "";
  const acceptEncoding = request.headers.get("accept-encoding") || "";

  const fingerprintData = `${ip}:${userAgent}:${acceptLanguage}:${acceptEncoding}`;
  const fingerprint = crypto
    .createHash("sha256")
    .update(fingerprintData)
    .digest("hex")
    .substring(0, 16);

  return `${ip}:${fingerprint}`;
}
