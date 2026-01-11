"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const HeaderSkeleton = () => {
    return (
        <div className="w-full shrink-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto px-4 h-14">
                {/* Left: Retention Controls Skeleton */}
                <div className="flex items-center gap-3">
                    <Skeleton className="w-16 h-4" />
                    {/* Desktop Radio Buttons */}
                    <div className="hidden md:flex items-center gap-1">
                        <Skeleton className="w-12 h-6 rounded-md" />
                        <Skeleton className="w-12 h-6 rounded-md" />
                        <Skeleton className="w-12 h-6 rounded-md" />
                    </div>
                    {/* Mobile Compact Display */}
                    <Skeleton className="md:hidden w-16 h-6 rounded-md" />
                </div>

                {/* Center: User Secret Input Skeleton */}
                <div className="flex-1 max-w-md">
                    <div className="flex items-center gap-2 w-full">
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="flex-1 h-9 rounded" />
                    </div>
                </div>

                {/* Right: Create Button Skeleton */}
                <div className="flex items-center">
                    <Skeleton className="w-20 h-9 rounded-md" />
                </div>
            </div>
        </div>
    );
};