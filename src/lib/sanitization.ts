import DOMPurify from "isomorphic-dompurify";
import { createTrustedHTML } from "@/lib/trustedTypes";

export function sanitizeHtml(html: string): string {
  if (typeof html !== "string") {
    throw new Error("Input must be a string");
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
}

export function sanitizeHtmlToTrusted(html: string): TrustedHTML | string {
  const sanitized = sanitizeHtml(html);
  return createTrustedHTML(sanitized);
}

export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, "") 
    .replace(/javascript:/gi, "") 
    .replace(/on\w+=/gi, "") 
    .trim();
}

export function sanitizeJson<T = unknown>(input: T): T {
  if (typeof input === "string") {
    return sanitizeText(input) as unknown as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeJson(item)) as unknown as T;
  }

  if (typeof input === "object" && input !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const key in input) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        continue;
      }
      sanitized[key] = sanitizeJson((input as Record<string, unknown>)[key]);
    }
    return sanitized as T;
  }

  return input;
}

export function sanitizeObject<T = unknown>(input: T): T {
  const sanitized: Record<string, unknown> = {};
  for (const key in input) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    sanitized[key] = sanitizeJson(input[key]);
  }
  return sanitized as T;
}
