import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { promisify } from "util";

const pbkdf2Async = promisify(crypto.pbkdf2);


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
