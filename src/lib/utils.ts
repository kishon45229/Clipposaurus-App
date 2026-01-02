import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { promisify } from "util";
import { FileItem } from "@/types";

const pbkdf2Async = promisify(crypto.pbkdf2);

interface FileSizeFormatter {
  (bytes: number): string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFileSize: FileSizeFormatter = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
};

export const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

export const readFileAsDataUrl = (fileItem: FileItem) =>
  new Promise<string>((resolve, reject) => {
    if (!fileItem.file) {
      reject(new Error("File object is missing from FileItem"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(fileItem.file);
  });

export function createFileItem(file: File): FileItem {
  return {
    id: "", // Will be set during processing
    name: file.name,
    size: file.size,
    content: "", // Will be set during processing
    file: file, // Include the native File object
  };
}

export async function deriveKey(
  masterKey: string,
  salt: Buffer,
  iterations: number = 100000,
  keyLen: number = 32,
  digest: string = "sha256"
): Promise<Buffer> {
  if (!masterKey || !salt) throw new Error("Missing args");
  const derived = (await pbkdf2Async(
    masterKey,
    salt,
    iterations,
    keyLen,
    digest
  )) as Buffer;
  return derived;
}

export function calculateTotalItems(
  textContent: string,
  codeContent: string,
  files: FileItem[]
) {
  let total = 0;
  if (textContent) total += 1;
  if (codeContent) total += 1;
  total += files.length;
  return total;
}
