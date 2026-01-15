"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const NavbarSkeleton = () => {
    return (
        <div className="max-w-7xl h-full mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between h-full lg:hidden gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-10" />
            </div>
            <div className="hidden items-center justify-between h-full lg:flex gap-4">
                <Skeleton className="h-8 w-32" />
                <div className="flex gap-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                </div>
            </div>
        </div>
    );
};