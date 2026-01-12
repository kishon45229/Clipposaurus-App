"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { setThemeCookie, getThemeCookie, syncThemeAcrossTabs, broadcastThemeChange, type Theme } from "@/lib/theme-cookie"

/**
 * Internal component that syncs theme changes to cookies
 */
function ThemeSyncHandler() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    // Load theme from cookie on mount
    const savedTheme = getThemeCookie();
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, []);

  React.useEffect(() => {
    // Save theme to cookie whenever it changes
    if (theme && (theme === "light" || theme === "dark" || theme === "system")) {
      setThemeCookie(theme as Theme);
      broadcastThemeChange(theme as Theme);
    }
  }, [theme]);

  React.useEffect(() => {
    // Listen for theme changes from other tabs/windows
    const cleanup = syncThemeAcrossTabs((newTheme) => {
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    });

    return cleanup;
  }, [theme, setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSyncHandler />
      {children}
    </NextThemesProvider>
  )
}