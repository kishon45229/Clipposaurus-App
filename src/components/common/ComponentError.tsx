"use client";

import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComponentErrorProps {
    componentId?: string;
}

export const ComponentError = ({ componentId }: ComponentErrorProps) => {
    const isDev = process.env.NODE_ENV === "development";

    return (
        <div
            className="flex items-center justify-center h-[84dvh] w-full"
            role="status"
            aria-label="Error"
        >
            <div
                className="
                    relative flex flex-col items-center text-center
                    space-y-[clamp(0.75rem,2vw,1.25rem)]
                    max-w-[clamp(18rem,80vw,28rem)]
                    rounded-2xl
                    border border-zinc-200/70 dark:border-zinc-800/70
                    bg-white/70 dark:bg-zinc-900/70
                    backdrop-blur-xl shadow-xl
                    px-[clamp(1rem,4vw,1.5rem)]
                    py-[clamp(1.25rem,4vw,1.75rem)]
                "
            >
                {/* Soft ambient glow */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-2xl" />
                </div>

                {/* Icon */}
                <div className="relative flex justify-center mb-[clamp(0.75rem,3vw,1.5rem)]">
                    <AlertTriangle
                        className="
                            size-[clamp(2rem,6vw,2.5rem)]
                            text-emerald-600 dark:text-emerald-400
                        "
                    />
                </div>

                {/* Text */}
                <div className="relative space-y-[clamp(0.5rem,2vw,0.75rem)]">
                    <div className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-[clamp(1rem,3vw,1.25rem)]">
                        Something didn&apos;t load correctly
                    </div>

                    {isDev ? (
                        <div className="font-mono text-zinc-600 dark:text-zinc-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                            Failed to load:{" "}
                            <span className="text-zinc-800 dark:text-zinc-200">
                                {componentId}
                            </span>
                        </div>
                    ) : (
                        <div className="leading-relaxed text-zinc-600 dark:text-zinc-400 text-[clamp(0.8rem,2vw,0.95rem)]">
                            This section failed to load properly. A quick refresh usually resolves it.
                        </div>
                    )}
                </div>

                {/* Action */}
                <div className="relative mt-[clamp(0.5rem,2vw,0.75rem)]">
                    <Button
                        onClick={() => window.location.reload()}
                        className="
                            flex items-center gap-[clamp(0.4rem,1.5vw,0.6rem)]
                            rounded-xl
                            bg-emerald-600 hover:bg-emerald-700 text-white font-medium
                            text-[clamp(0.85rem,2vw,1rem)]
                            px-[clamp(1rem,4vw,1.5rem)]
                            py-[clamp(0.5rem,2vw,0.65rem)]
                            shadow-md shadow-emerald-600/30
                            hover:shadow-emerald-600/50
                            transition-all hover:-translate-y-0.5
                        "
                    >
                        <RefreshCcw className="size-[clamp(0.9rem,2.5vw,1rem)]" />
                        Refresh Page
                    </Button>
                </div>

                {/* Subtle reassurance */}
                <div
                    className="
                        relative
                        mt-[clamp(0.75rem,3vw,1rem)]
                        max-w-[clamp(14rem,70vw,22rem)]
                        text-zinc-500 dark:text-zinc-500
                        text-[clamp(0.7rem,1.8vw,0.8rem)]
                    "
                >
                    Don&apos;t worry, it&apos;s not your fault! Sometimes things just go wrong.
                </div>
            </div>
        </div>
    );
};
