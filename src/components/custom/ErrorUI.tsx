import React from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ErrorUIProps {
    isDev: boolean;
    error: Error;
    supportId?: string;
    reset: () => void;
}

function ErrorUI({ isDev, error, supportId, reset }: ErrorUIProps) {
    return (
        <div
            className="relative flex items-center justify-center min-h-[70vh] px-4"
            role="status"
            aria-label="Error occurred"
        >


            {/* Main container */}
            <div
                className="
                    relative w-full max-w-md
                    rounded-3xl
                    border border-zinc-200/70 dark:border-zinc-800/70
                    backdrop-blur-xl
                    shadow-xl
                    p-8
                    text-center
                "
            >
                {/* Ambient background glow */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-2xl" />
                </div>
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <TriangleAlert className="h-7 w-7" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Something didn’t load
                </h1>

                {/* Description */}
                <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    We hit a small hiccup while preparing this page. A quick retry usually fixes it.
                </p>

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
                        className="
                            w-full rounded-xl
                            bg-zinc-900 hover:bg-zinc-800
                            dark:bg-zinc-50 dark:hover:bg-zinc-200
                            text-zinc-50 dark:text-zinc-900
                            font-semibold
                            shadow-lg
                            transition-all
                            hover:-translate-y-0.5
                        "
                        aria-label="Retry loading"
                    >
                        Try again
                    </Button>

                    <Link href="/docs">
                        <Button
                            size="lg"
                            variant="outline"
                            className="
                                w-full rounded-xl
                                border-zinc-300 dark:border-zinc-700
                                bg-white/60 dark:bg-zinc-900/60
                                backdrop-blur-sm
                                transition-all
                                hover:-translate-y-0.5
                            "
                            aria-label="View documentation"
                        >
                            View documentation
                        </Button>
                    </Link>
                </div>

                {/* Support note */}
                <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                    If this keeps happening, contact support
                    {supportId && (
                        <>
                            {" "}with ID{" "}
                            <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                                {supportId}
                            </span>
                        </>
                    )}
                </p>

                {/* Accessibility */}
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                    An unexpected error occurred while loading the page.
                </div>
            </div>
        </div>
    );
}

const MemoizedErrorUI = React.memo(ErrorUI);
MemoizedErrorUI.displayName = "ErrorUI";

export { MemoizedErrorUI as ErrorUI };
