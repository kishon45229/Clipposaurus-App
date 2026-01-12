"use client";

export type Theme = "light" | "dark" | "system";

const THEME_COOKIE_NAME = "clipposaurus-theme";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Gets the shared domain for cookie storage.
 * In production, this returns the root domain (e.g., .clipposaurus.com)
 * to share cookies across all subdomains.
 * In development, returns undefined to use the default localhost behavior.
 */
function getCookieDomain(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const hostname = window.location.hostname;

  // In development (localhost), don't set domain
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return undefined;
  }

  // In production, extract root domain
  // e.g., "app.clipposaurus.com" -> ".clipposaurus.com"
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    return `.${parts.slice(-2).join(".")}`;
  }

  return undefined;
}

/**
 * Sets a cookie with the theme value.
 * Uses a shared domain in production to work across subdomains.
 */
export function setThemeCookie(theme: Theme): void {
  const domain = getCookieDomain();
  const domainAttr = domain ? `; domain=${domain}` : "";

  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${domainAttr}`;
}

/**
 * Gets the theme value from the cookie.
 */
export function getThemeCookie(): Theme | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const themeCookie = cookies.find((cookie) =>
    cookie.startsWith(`${THEME_COOKIE_NAME}=`)
  );

  if (!themeCookie) return null;

  const value = themeCookie.split("=")[1] as Theme;

  // Validate the value
  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }

  return null;
}

/**
 * Syncs theme changes across tabs/windows using storage events.
 * This is a fallback for same-origin communication.
 */
export function syncThemeAcrossTabs(
  callback: (theme: Theme) => void
): () => void {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "theme-sync" && e.newValue) {
      const theme = e.newValue as Theme;
      if (theme === "light" || theme === "dark" || theme === "system") {
        callback(theme);
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}

/**
 * Broadcasts theme change to other tabs in the same origin.
 */
export function broadcastThemeChange(theme: Theme): void {
  if (typeof window === "undefined") return;

  // Use localStorage event for same-origin tab sync
  localStorage.setItem("theme-sync", theme);
  localStorage.removeItem("theme-sync");
}
