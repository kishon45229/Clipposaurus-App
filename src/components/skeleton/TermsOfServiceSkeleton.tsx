"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const TermsOfServiceSkeleton = () => {
    return (
        <div className="mx-auto max-w-480px-4 py-2 grid grid-cols-1 lg:grid-cols-[240px_auto] gap-[clamp(2rem,5vw,2.5rem)]">
            {/* Sticky TOC — Desktop only */}
            <aside className="hidden lg:block print:hidden">
                <nav className="sticky top-24 text-[clamp(0.75rem,1.2vw,0.9rem)] leading-6">
                    <Skeleton className="h-5 w-20 mb-3" />

                    <ul className="border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                            <li key={index}>
                                <Skeleton className="h-4 w-24" />
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="max-w-7xl border-l border-zinc-200 dark:border-zinc-800 pl-6">
                {/* Header */}
                <header className="mb-12 space-y-3">
                    <Skeleton className="h-10 w-3/4" />

                    <Skeleton className="h-4 w-1/3" />

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                </header>

                {/* Sections */}
                <section className="space-y-12">
                    {[1, 2, 3, 4, 5, 6, 7].map((sectionIndex) => (
                        <div key={sectionIndex} className="scroll-mt-28">
                            <Skeleton className="h-6 w-1/2 mb-3" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};