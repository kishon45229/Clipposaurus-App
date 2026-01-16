import { formatSize, readFileAsDataUrl, createFileItem } from "./utils";
import type { FileItem } from "@/types";
import { FILE_SIZE_CONFIG } from "@/constants/fileProcessingConfig";
import { FileProcessorError } from "@/hooks/useFileProcessor";

const { MAX_TOTAL_SIZE, MAX_INDIVIDUAL_FILE_SIZE } = FILE_SIZE_CONFIG;

const generateUUID = () => {
  const cryptoObj =
    typeof globalThis !== "undefined" && globalThis.crypto
      ? globalThis.crypto
      : undefined;

  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }

  const bytes = new Uint8Array(16);

  if (cryptoObj?.getRandomValues) {
    cryptoObj.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

  return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(
    12,
    16
  )}-${hex.substring(16, 20)}-${hex.substring(20)}`;
};

export async function processFileWithSizeCheck(
  currentTotalSize: number,
  file: File
): Promise<FileItem> {
  // Note: Size validation removed - will be checked at drop creation time
  // This allows users to select files and see the dialog with appropriate message

  const fileItem = createFileItem(file);
  fileItem.id = generateUUID();

  try {
    const content = await readFileAsDataUrl(fileItem);
    fileItem.content = content;
    return fileItem;
  } catch (error) {
    throw new FileProcessorError(
      error instanceof Error ? error.message : `Failed to process ${file.name}`
    );
  }
}

export const getCurrentTotalSize = (files: FileItem[]) => {
  return files.reduce((acc, f) => acc + (f?.size ?? 0), 0);
};

export const isOverLimit = (currentTotalSize: number) => {
  return currentTotalSize > MAX_TOTAL_SIZE;
};
