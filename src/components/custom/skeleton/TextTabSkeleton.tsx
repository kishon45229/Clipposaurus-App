"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";

export const TextTabSkeleton = () => {
    return (
        <div
            className="
        flex h-full shrink-0 flex-col
        gap-[clamp(0.4rem,1.5vw,0.75rem)]
        rounded-2xl
        border border-zinc-200/60 dark:border-zinc-800/60
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
            <div className="flex shrink-0 items-center justify-between">
                <Badge
                    variant="secondary"
                    className="
            select-none rounded-2xl
            px-[clamp(0.75rem,2vw,1rem)]
            text-[clamp(0.7rem,2.5vw,0.9rem)]
            bg-zinc-200 dark:bg-zinc-700
          "
                >
                    <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
                </Badge>

                <Button
                    variant="destructive"
                    size="icon"
                    disabled
                    className="rounded-2xl bg-zinc-200 dark:bg-zinc-700"
                >
                    <Trash className="size-[clamp(0.9rem,2.5vw,1.1rem)] text-zinc-400 dark:text-zinc-500" />
                </Button>
            </div>

            {/* Editor Skeleton */}
            <div className="flex min-h-0 flex-1">
                <div
                    className="
            h-full w-full resize-none overflow-hidden
            rounded-2xl
            bg-zinc-100 dark:bg-zinc-800
            p-[clamp(0.6rem,2vw,1rem)]
          "
                >
                    <div className="space-y-2">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};