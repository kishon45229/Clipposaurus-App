"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * HOOK THAT CLEARS THE "DROP" SESSION STORAGE WHEN NAVIGATING AWAY FROM /OPEN-DROP
 */
export function useDropSessionCleanup() {
  const pathname = usePathname();

  React.useEffect(() => {
    const clearDropSession = () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("Drop");
      }
    };

    if (pathname && !pathname.startsWith("/open-drop")) {
      clearDropSession();
    }

    const handlePopState = () => {
      setTimeout(() => {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith("/open-drop")) {
          clearDropSession();
        }
      }, 0);
    };

    const handleBeforeUnload = () => {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/open-drop")) {
        clearDropSession();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith("/open-drop")) {
          clearDropSession();
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);
}
