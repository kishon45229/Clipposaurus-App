import type { DecryptedDrop } from "@/types/decryption";
import { DecryptedDropSchema } from "@/lib/schema";

export function setDropSession(value: DecryptedDrop): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    sessionStorage.setItem("Drop", JSON.stringify(value));
    return true;
  } catch {
    return null;
  }
}

export function removeDropSession(): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    sessionStorage.removeItem("Drop");
    return true;
  } catch {
    return null;
  }
}

export function getDropSession(): DecryptedDrop | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const dropDataString = sessionStorage.getItem("Drop");

    if (!dropDataString) {
      return null;
    }

    const parsed = JSON.parse(dropDataString);
    
    const result = DecryptedDropSchema.safeParse(parsed);    
    if (result.success) {
      return result.data;
    }

    sessionStorage.removeItem("Drop");
    return null;
  } catch {
    try {
      removeDropSession();
    } catch {
      return null;
    }
    return null;
  }
}
