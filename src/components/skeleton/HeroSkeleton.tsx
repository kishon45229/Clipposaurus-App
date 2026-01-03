"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
    return (
        <div className="flex
            flex-col
            justify-between
            gap-2
            h-full
            w-full
            overflow-hidden">
            {/* HeroHeader Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-32 w-3/4 max-w-2xl" />
                <Skeleton className="h-32 w-1/2 max-w-2xl" />
                <Skeleton className="h-18 w-full max-w-2xl" />
            </div>

            {/* HeroCTAs Skeleton */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
                    <Skeleton className="h-12 w-full sm:w-auto min-w-[220px]" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-12 w-full sm:w-auto min-w-[220px]" />
                </div>
            </div>

            {/* HeroFooter Skeleton */}
            <div>
                <Skeleton className="h-4 w-full max-w-md" />
            </div>
        </div>
    );
};