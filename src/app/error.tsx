"use client";

import React from "react";
import { useRollbar } from "@rollbar/react";
import { ErrorUI } from "@/components/common/ErrorUI";

export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [supportId, setSupportId] = React.useState<string | null>(null);
  const rollbar = useRollbar();
  const isDev = process.env.NODE_ENV === "development";

  React.useEffect(() => {
    if (!error) return;

    // Development → console log
    if (isDev) {
      console.error("Error caught by error boundary:", error);
      return;
    }

    // Production → send to Rollbar
    if (!rollbar || typeof rollbar.error !== "function") {
      console.warn("Rollbar is not properly initialized.");
      return;
    }

    const payload = {
      name: error.name || "Error",
      message: error.message || "Unknown error",
      cause: error.cause || null,
      stack: error.stack || null,
      userAgent: navigator.userAgent.substring(0, 100),
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    try {
      const result = rollbar.error(payload.message, payload);
      if (result && typeof result === "object" && "uuid" in result) {
        setSupportId((result as { uuid: string }).uuid);
      }
    } catch (error) {
      if (isDev) console.error("Failed to log error to Rollbar.", error);
    }
  }, [error, rollbar, isDev]);

  return <ErrorUI isDev={isDev} error={error} supportId={supportId || ""} reset={reset} />;
}
