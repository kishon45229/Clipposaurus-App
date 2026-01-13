"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const CodeTabSkeleton = () => {
    return (
        <div
            className="
        flex h-full shrink-0 flex-col
        gap-[clamp(0.4rem,1.5vw,0.75rem)]
        rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60
        bg-gradient-to-b from-zinc-50/80 to-white/60
        dark:from-zinc-900/70 dark:to-zinc-950/60
        px-[clamp(0.4rem,1.5vw,0.75rem)]
        py-[clamp(0.4rem,1.5vw,0.75rem)]
        shadow-xl backdrop-blur-2xl
        transition-all duration-300
        animate-pulse
      "
        >
            {/* Header */}
            <div className="flex items-center justify-end gap-[clamp(0.5rem,2vw,1rem)]">
                <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-2xl"></div>
                <Button
                    variant="destructive"
                    size="icon"
                    disabled
                    className="rounded-2xl bg-zinc-200 dark:bg-zinc-700"
                >
                    <Trash className="size-[clamp(0.9rem,2.5vw,1.1rem)] text-zinc-400 dark:text-zinc-500" />
                </Button>
            </div>

            {/* Editor */}
            <div className="flex flex-1 min-h-0">
                <div
                    className="
            flex flex-1 min-h-0 overflow-hidden
            rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50
            bg-background/70 dark:bg-background/40
          "
                >
                    <div className="h-full min-h-0 w-8 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700">
                        <div className="space-y-1 p-2">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded text-xs text-center"></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 bg-zinc-50 dark:bg-zinc-900 p-2">
                        <div className="space-y-2">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};