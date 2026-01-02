"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PrivacyInfoContentSkeleton(): React.ReactElement {
    return (
        <div className="relative h-full rounded-4xl border border-emerald-500/50 dark:border-emerald-500/30 bg-zinc-50 dark:bg-zinc-950 backdrop-blur-xl shadow-xl px-[clamp(1rem,3vw,2rem)] py-[clamp(1.25rem,3vw,2.5rem)]">
            <div className="flex h-full flex-col justify-between gap-[clamp(1rem,3vw,2rem)]">
                {/* Header skeleton */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[clamp(0.75rem,2vw,1.25rem)]">
                    <Skeleton className="size-[clamp(2.5rem,6vw,4.5rem)] rounded-[clamp(0.75rem,2vw,1.25rem)]" />
                    <div className="space-y-[clamp(0.25rem,1vw,0.5rem)]">
                        <Skeleton className="h-[clamp(0.65rem,1.2vw,0.85rem)] w-32" />
                        <Skeleton className="h-[clamp(1rem,2.5vw,2rem)] w-64" />
                    </div>
                </div>

                {/* Body skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2.5vw,1.5rem)]">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/60 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-emerald-950/10 dark:to-emerald-900/10 backdrop-blur-sm px-[clamp(0.75rem,3vw,1.25rem)] py-[clamp(0.75rem,2.5vw,1.25rem)]">
                            <Skeleton className="h-[clamp(0.7rem,1.2vw,0.95rem)] w-20" />
                            <div className="mt-[clamp(0.25rem,1vw,0.5rem)] space-y-1">
                                <Skeleton className="h-[clamp(0.8rem,1.5vw,1.1rem)] w-full" />
                                <Skeleton className="h-[clamp(0.8rem,1.5vw,1.1rem)] w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer skeleton */}
                <div className="flex w-full justify-between gap-[clamp(0.5rem,3vw,2rem)]">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex-1 text-center">
                            <Skeleton className="h-[clamp(1rem,3.5vw,1.75rem)] w-16 mx-auto" />
                            <Skeleton className="h-[clamp(0.7rem,1.5vw,1rem)] w-20 mt-[clamp(0.125rem,0.5vw,0.25rem)] mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}