import type { EncryptedData } from "@/types/encryption";

export type DragAndDropOptions = {
  processFile?: (
    file: File,
    onProgress?: (progress: number) => void
  ) => Promise<FileItem>;
  currentTotalSize?: number;
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  onError?: (error: string) => void;
};

export interface RetrivedDrop {
  textContent?: EncryptedData;
  codeContent?: EncryptedData;
  codeLanguage?: EncryptedData;
  files?: StoredFileItem[];
  retention: EncryptedData;
  createdAt: EncryptedData;
  expiresAt: EncryptedData;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  content: string;
  file: File;
}

export interface StoredFileItem {
  id: EncryptedData;
  name: EncryptedData;
  size: EncryptedData;
  url: string;
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
  | "encrypting-files"
  | "uploading-files"
  | "success"
  | "error"
  | "idle"
  | "rateLimited"
  | "empty"
  | "nullUserSecret"
  | "fileSizeExceeded";

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

export type DropContentType = "note" | "code" | "files";

export interface OpenDropRequestResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
