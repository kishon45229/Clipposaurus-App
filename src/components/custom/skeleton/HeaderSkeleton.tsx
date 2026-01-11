"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const HeaderSkeleton = () => {
    return (
        <div className="w-full shrink-0 bg-linear-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900/50 border-b-2 border-emerald-500/20 dark:border-emerald-500/30 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50">
            <div className="max-w-[1920px] mx-auto px-3 sm:px-6 py-3">
                <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 xl:gap-4">
                    {/* Retention Section Skeleton */}
                    <div className="flex-shrink-0 xl:min-w-fit">
                        <div className="rounded-xl bg-white/80 dark:bg-zinc-900/80 border-2 border-zinc-200/80 dark:border-zinc-800/80 shadow-md px-3 py-2.5">
                            <div className="flex items-center gap-2.5">
                                <Skeleton className="w-4 h-4" />
                                <Skeleton className="hidden sm:inline w-16 h-4" />
                                <div className="hidden md:flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="w-8 h-4" />
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="w-8 h-4" />
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="w-8 h-4" />
                                </div>
                                <Skeleton className="md:hidden w-12 h-6 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* User Secret Section Skeleton */}
                    <div className="flex-1 min-w-0">
                        <div className="rounded-xl bg-white/80 dark:bg-zinc-900/80 border-2 border-zinc-200/80 dark:border-zinc-800/80 shadow-md px-3 py-2.5">
                            <div className="flex items-center gap-2.5">
                                <Skeleton className="w-4 h-4 shrink-0" />
                                <Skeleton className="flex-1 h-8 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Drop Key Preview Skeleton - Desktop */}
                    <div className="hidden xl:block flex-shrink-0 max-w-md">
                        <div className="rounded-xl bg-linear-to-r from-emerald-50/80 to-zinc-50/80 dark:from-emerald-950/30 dark:to-zinc-900/60 border-2 border-emerald-200/50 dark:border-emerald-800/30 px-3 py-2.5 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-12 h-4 shrink-0" />
                                <Skeleton className="flex-1 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Create Button Section Skeleton */}
                    <div className="flex-shrink-0">
                        <Skeleton className="w-full xl:w-24 h-[42px] rounded-xl" />
                    </div>

                    {/* Drop Key Preview Skeleton - Mobile */}
                    <div className="xl:hidden mt-2 rounded-lg bg-linear-to-r from-emerald-50/50 via-zinc-50 to-emerald-50/50 dark:from-emerald-950/20 dark:via-zinc-900/50 dark:to-emerald-950/20 border border-emerald-200/40 dark:border-emerald-800/20 px-3 py-2">
                        <div className="flex items-center justify-center gap-2">
                            <Skeleton className="w-12 h-4" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};