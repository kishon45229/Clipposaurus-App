"use client";

import React from "react";
import { Bug, Check, Copy, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientGlow } from "@/components/ui/ambient-glow";

interface ErrorUIProps {
    isDev: boolean;
    error: Error;
    supportId?: string;
    reset: () => void;
}

export const ErrorUI = React.memo<ErrorUIProps>(({ isDev, error, supportId, reset }): React.ReactNode => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopySupportId = async () => {
        if (!supportId) return;
        try {
            await navigator.clipboard.writeText(supportId);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.warn("Failed to copy support ID:", err);
        }
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-[84dvh] px-4"
            role="status"
            aria-label="Error occurred"
        >
            {/* Main container */}
            <div className="relative w-full max-w-md rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 backdrop-blur-xl shadow-xl p-8 text-center">
                {/* Ambient background glow */}
                <AmbientGlow />

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <TriangleAlert className="h-7 w-7" />
                </div>

                {/* Title */}
                <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Something didn&apos;t load
                </div>

                {/* Description */}
                <div className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    We hit a small hiccup while preparing this page. A quick retry usually fixes it.
                </div>

                {supportId && (
                    <div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Support ID
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span>{supportId}</span>
                            {isCopied ? (
                                <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <Copy className="w-4 h-4 cursor-target" onClick={handleCopySupportId} />
                            )}
                        </div>
                    </div>
                )}

                {/* Dev-only details */}
                {isDev && (
                    <details className="mt-6 text-left rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 p-4">
                        <summary className="cursor-pointer text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Technical details
                        </summary>
                        <div className="mt-3 space-y-1 text-xs font-mono text-zinc-600 dark:text-zinc-400 break-all">
                            <div><strong>Error:</strong> {error.name}</div>
                            <div><strong>Message:</strong> {error.message}</div>
                        </div>
                    </details>
                )}

                {/* Actions */}
                <div className="mt-6 space-y-3">
                    <Button
                        size="lg"
                        onClick={reset}
                        className="w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 font-semibold shadow-lg transition-all hover:-translate-y-0.5 cursor-target"
                        aria-label="Retry loading"
                    >
                        Try again
                    </Button>

                    <a href={process.env.NEXT_PUBLIC_GITHUB_ISSUES_URL} target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm transition-all hover:-translate-y-0.5 cursor-target"
                            aria-label="Report an issue"
                        >
                            <Bug className="h-4 w-4 mr-2" />
                            Report an issue
                        </Button>
                    </a>
                </div>

                {/* Support note */}
                <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                    If this keeps happening,{" "}
                    <a
                        href={`mailto:${process.env.NEXT_PUBLIC_CLIPPOSAURUS_CONTACT_EMAIL}${supportId ? `?subject=An error occurred - Support ID: ${supportId}` : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-zinc-700 dark:hover:text-zinc-300 cursor-target"
                    >
                        contact support
                    </a>
                </div>

                {/* Accessibility */}
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                    An unexpected error occurred while loading the page.
                </div>
            </div>
        </div>
    );
});

ErrorUI.displayName = "ErrorUI";
