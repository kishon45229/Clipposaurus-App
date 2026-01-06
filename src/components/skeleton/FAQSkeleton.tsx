import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const FAQSkeleton = () => {
    return (
        <div className="mx-auto max-w-480px-4 py-2 grid grid-cols-1 lg:grid-cols-[240px_auto] gap-[clamp(2rem,5vw,2.5rem)]">
            {/* Sticky TOC — Desktop only */}
            <div className="hidden lg:block">
                <nav className="sticky top-24 text-[clamp(0.75rem,1.2vw,0.9rem)] leading-6">
                    <Skeleton className="h-5 w-20 mb-3" />
                    <ul className="border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-2">
                        {[1, 2, 3].map((i) => (
                            <li key={i}>
                                <Skeleton className="h-4 w-24" />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="max-w-7xl">
                <header className="mb-12 gap-[clamp(0.75rem,2vw,1rem)]">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-px w-full mt-4" />
                </header>
                <section className="space-y-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-8">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="space-y-3">
                                {[1, 2].map((j) => (
                                    <div key={j} className="space-y-2">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-16 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};