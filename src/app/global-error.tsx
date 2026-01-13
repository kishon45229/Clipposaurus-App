'use client'

import React, { useState } from "react";
import Rollbar from "rollbar";
import { clientConfig } from "@/lib/rollbar";
import { useEffect } from "react";
import { ErrorUI } from "@/components/common/ErrorUI";

/**
 * Global Error Component.
 * @param error - The error object.
 * @param reset - Function to reset the error state.
 * @returns A Error React component.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const [supportId, setSupportId] = useState<string | null>(null);

    useEffect(() => {
        if (!error) return;

        if (process.env.NODE_ENV === "development") {
            console.error("Global error caught:", error);
            return;
        }

        // Simple error payload
        const payload = {
            name: error.name || "GlobalError",
            message: error.message || "Unknown global error",
            cause: error.cause || null,
            stack: error.stack || null,
            digest: error.digest || null,

            // Basic context
            userAgent: navigator.userAgent.substring(0, 100),
            url: window.location.href,
            timestamp: new Date().toISOString(),
        };

        try {
            const rollbar = new Rollbar(clientConfig);
            const result = rollbar.error(payload.message, payload);
            if (result && result.uuid) {
                setSupportId(result.uuid);
            }
        } catch (err) {
            console.warn("Failed to report error to Rollbar:", err);
        }
    }, [error]);

    const isDev = process.env.NODE_ENV === "development";
    return <ErrorUI isDev={isDev} error={error} supportId={supportId || ""} reset={reset} />;
}