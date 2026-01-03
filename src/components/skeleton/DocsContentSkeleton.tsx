import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DocsContentSkeleton = () => {
    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {/* Header with Sidebar Trigger */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b shrink-0">
                <div className="flex items-center gap-2 p-4">
                    {/* Sidebar trigger skeleton */}
                    <Skeleton className="h-8 w-8" />
                    <div className="flex-1" />
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-6 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-y-auto">
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <header className="mb-8">
                        {/* Page title skeleton */}
                        <Skeleton className="h-9 w-2/3 mb-2" />
                    </header>

                    {/* Content skeleton */}
                    <div className="space-y-6">
                        {/* Paragraph skeletons */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        ))}

                        {/* Section heading skeleton */}
                        <Skeleton className="h-7 w-1/2 mt-8 mb-4" />

                        {/* More content skeleton */}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}

                        {/* Code block skeleton */}
                        <div className="my-6">
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>

                        {/* List items skeleton */}
                        <div className="space-y-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Skeleton className="h-2 w-2 rounded-full mt-2" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                {/* Navigation Footer */}
                <nav className="flex justify-between items-center mt-12 pt-8 border-t">
                    {/* Previous button skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-32" />
                    </div>

                    {/* Next button skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-32" />
                    </div>
                </nav>
            </main>
        </div>
    );
};