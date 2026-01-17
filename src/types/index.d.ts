import type { EncryptedData } from "@/types/encryption";

export interface RetrivedDrop {
  textContent?: EncryptedData;
  codeContent?: EncryptedData;
  codeLanguage?: EncryptedData;
  retention: EncryptedData;
  createdAt: EncryptedData;
  expiresAt: EncryptedData;
}

export type DropKeyVerificationRequestStatus =
  | "verifying"
  | "success"
  | "error"
  | "idle"
  | "notfound"
  | "rateLimited"
  | "incomplete"
  | "decryptionError";

export type CreateDropRequestStatus =
  | "redirecting"
  | "success"
  | "error"
  | "idle"
  | "rateLimited";

export type CreateDropAlertStatus =
  | "creating"
  | "success"
  | "error"
  | "idle"
  | "rateLimited"
  | "empty"
  | "nullUserSecret";

export type OpenDropAlertStatus =
  | "idle"
  | "opening"
  | "decrypting"
  | "common-error"
  | "copy-error"
  | "download-error"
  | "decryption-error"
  | "drop-deleted-on-access"
  | "invalidKey"
  | "networkError"
  | "serverError"
  | "not-found"
  | "expired"
  | "rateLimited"
  | "decryptionFailed"
  | "deleteOnAccess";

export type DropContentType = "note" | "code";

export interface OpenDropRequestResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
