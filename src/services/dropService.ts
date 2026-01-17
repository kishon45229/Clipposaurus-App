import type { OpenDropRequestResponse } from "@/types";
import { encryptWithDropKey } from "@/lib/encryption";
import { calculateExpiration } from "@/lib/timer";

export async function sendOpenDropRequest(
  identifier: string,
  recaptchaToken: string | null
): Promise<{
  error?: string;
  data?: OpenDropRequestResponse;
  status: number;
  success: boolean;
}> {
  try {
    const openDropRequestResponse = await fetch("/api/unlock-drop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, recaptchaToken }),
    });

    if (!openDropRequestResponse.ok) {
      const errorData = await openDropRequestResponse.json().catch(() => ({}));
      return {
        success: false,
        status: openDropRequestResponse.status,
        error: errorData.error || "Failed to open Drop",
      };
    }

    const dropData = await openDropRequestResponse.json();

    return {
      success: true,
      status: 200,
      data: dropData,
    };
  } catch (error) {
    throw error;
  }
}

export async function sendCreateDropRequest(
  textContent: string,
  codeContent: string,
  codeLanguage: string,
  retention: string,
  identifier: string,
  systemSecret: string,
  userSecret: string
): Promise<{
  success: boolean;
  status: number;
  error?: string | null;
  ttlSeconds?: number;
}> {
  try {
    const encryptedTextContent = textContent
      ? await encryptWithDropKey(
          textContent,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const encryptedCodeContent = codeContent
      ? await encryptWithDropKey(
          codeContent,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const encryptedCodeLanguage = codeLanguage
      ? await encryptWithDropKey(
          codeLanguage,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const createdAt = new Date().toISOString();
    const { expiresAt, ttlSeconds } = calculateExpiration(retention);

    const encryptedRetentionPeriod = retention
      ? await encryptWithDropKey(
          retention,
          identifier,
          systemSecret,
          userSecret
        )
      : null;

    const encryptedCreatedDateTime = await encryptWithDropKey(
      createdAt,
      identifier,
      systemSecret,
      userSecret
    );

    const encryptedExpiryDateTime = await encryptWithDropKey(
      expiresAt,
      identifier,
      systemSecret,
      userSecret
    );

    const createDropResponse = await fetch("/api/create-drop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        textContent: encryptedTextContent,
        codeContent: encryptedCodeContent,
        codeLanguage: encryptedCodeLanguage,
        retention: encryptedRetentionPeriod,
        ttlSeconds,
        createdAt: encryptedCreatedDateTime,
        expiresAt: encryptedExpiryDateTime,
      }),
    });

    if (!createDropResponse.ok) {
      const errorData = await createDropResponse.json().catch(() => ({}));
      return {
        success: false,
        status: createDropResponse.status,
        error: errorData.error || "Failed to create Drop",
      };
    }

    return {
      success: true,
      status: 200,
      ttlSeconds,
    };
  } catch (error) {
    throw error;
  }
}