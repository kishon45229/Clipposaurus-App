import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ChangelogSkeleton = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-2/3" />
                    <Skeleton className="h-6 w-full" />
                </div>
                <div className="mt-12 space-y-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-10 w-1/2" />
                            <Skeleton className="h-6 w-1/3" />
                            <div className="space-y-2">
                                <Skeleton className="h-32 w-full" />
                                <Skeleton className="h-32 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};