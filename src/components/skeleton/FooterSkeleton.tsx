"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const FooterSkeleton = () => {
    return (
        <footer className="w-full border-t-2 border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black" role="contentinfo">
            <div className="w-full max-w-7xl mx-auto py-16">
                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
                    {/* BRAND COLUMN */}
                    <div className="lg:col-span-2">
                        {/* APP ICON + NAME */}
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Skeleton className="w-10 h-10 rounded-xl" />
                            <Skeleton className="w-32 h-8" />
                        </div>

                        {/* FOOTER DESCRIPTION */}
                        <div className="mb-6 max-w-sm space-y-2">
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-3/4 h-4" />
                        </div>

                        {/* LINKS */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-md" />
                            <Skeleton className="w-10 h-10 rounded-md" />
                        </div>
                    </div>

                    {/* PRODUCT COLUMN */}
                    <div>
                        <Skeleton className="w-20 h-4 mb-4" />
                        <div className="space-y-3">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-20 h-4" />
                            <Skeleton className="w-28 h-4" />
                            <Skeleton className="w-22 h-4" />
                        </div>
                    </div>

                    {/* RESOURCES COLUMN */}
                    <div>
                        <Skeleton className="w-24 h-4 mb-4" />
                        <div className="space-y-3">
                            <Skeleton className="w-20 h-4" />
                            <Skeleton className="w-26 h-4" />
                            <Skeleton className="w-18 h-4" />
                        </div>
                    </div>

                    {/* LEGAL COLUMN */}
                    <div>
                        <Skeleton className="w-16 h-4 mb-4" />
                        <div className="space-y-3">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-center gap-4">
                    <Skeleton className="w-64 h-4" />
                </div>
            </div>
        </footer>
    );
};