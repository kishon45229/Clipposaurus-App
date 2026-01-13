"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Trash } from "lucide-react";

export const FileTabSkeleton = () => {
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
        shadow-xl backdrop-blur-2xl transition-all duration-300
        animate-pulse
      "
        >
            {/* Header */}
            <div className="flex w-full flex-shrink-0 items-center justify-between">
                <div className="flex w-1/2 justify-start">
                    <Badge
                        variant="secondary"
                        className="rounded-2xl px-[clamp(0.5rem,2vw,1rem)] text-[clamp(0.75rem,2.5vw,0.9rem)] h-[clamp(1.5rem,3vw,2.25rem)] bg-zinc-200 dark:bg-zinc-700"
                    >
                        <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-600 rounded"></div>
                    </Badge>
                </div>

                <div className="flex w-1/2 justify-end gap-[clamp(0.25rem,1vw,0.75rem)]">
                    <Button
                        size="default"
                        variant="outline"
                        disabled
                        className="cursor-not-allowed rounded-2xl bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600"
                    >
                        <Paperclip className="size-[clamp(0.9rem,2.5vw,1.1rem)] text-zinc-400 dark:text-zinc-500" />
                        <span className="hidden sm:flex text-[clamp(0.75rem,2.5vw,1rem)] text-zinc-400 dark:text-zinc-500">
                            Choose file
                        </span>
                    </Button>

                    <Button variant="destructive" size="icon" disabled className="rounded-2xl bg-zinc-200 dark:bg-zinc-700">
                        <Trash className="size-[clamp(0.9rem,2.5vw,1.1rem)] text-zinc-400 dark:text-zinc-500" />
                    </Button>
                </div>
            </div>

            {/* File Area */}
            <div className="flex flex-1 min-h-0">
                <div
                    className="
            flex-1 min-h-0 rounded-2xl border lg:border-2 lg:border-dashed p-[clamp(0.5rem,2vw,0.6rem)]
            border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900
            flex items-center justify-center
          "
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                <div className="flex-1 space-y-1">
                                    <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                                    <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};