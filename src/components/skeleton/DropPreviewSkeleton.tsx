"use client";

import React from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export const DropPreviewSkeleton = () => {
    return (
        <div className="flex h-full w-full max-w-7xl mx-auto box-border rounded-2xl shadow-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 animate-pulse" role="main">
            {/* Sidebar Skeleton */}
            <Sidebar
                side="left"
                className="flex-1 h-full backdrop-blur-xl bg-gradient-to-b from-zinc-50/60 to-white/30 dark:from-zinc-900/50 dark:to-zinc-950/30 overflow-auto"
                collapsible="icon"
            >
                {/* Sidebar Header Skeleton */}
                <div className="border-b border-zinc-200/60 dark:border-zinc-800/60 p-4 bg-linear-to-r from-zinc-50/50 to-transparent dark:from-zinc-900/40">
                    <div className="flex flex-col gap-1">
                        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                    </div>
                </div>

                <SidebarContent className="gap-0">
                    {/* Countdown Skeleton */}
                    <div className="p-4 bg-gradient-to-br from-emerald-50/10 to-emerald-100/10 dark:from-emerald-950/10 dark:to-emerald-900/10 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                        <div className="text-center">
                            <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full mx-auto mb-2"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>

                    {/* Content Menu Skeleton */}
                    <div className="p-4">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4 mb-2"></div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
                            </div>
                        </div>
                    </div>
                </SidebarContent>
            </Sidebar>

            {/* Content Area Skeleton */}
            <SidebarInset className="flex-1 w-full h-full">
                <div className="flex flex-col h-full">
                    {/* Action Bar Skeleton */}
                    <div className="flex items-center justify-between p-4 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                            <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                        </div>
                    </div>

                    {/* Content Area Skeleton */}
                    <div className="flex-1 min-h-0 relative bg-gradient-to-br from-zinc-50/60 to-white/30 dark:from-zinc-900/50 dark:to-zinc-950/30">
                        {/* Text Content Skeleton */}
                        <div className="p-4">
                            <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4 mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                            </div>
                        </div>

                        {/* Code Content Skeleton */}
                        <div className="p-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
                            <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 mb-4"></div>
                            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4">
                                <div className="flex">
                                    <div className="w-8 space-y-1 pr-2">
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <div key={i} className="h-4 w-4 bg-zinc-200 dark:bg-zinc-700 rounded text-xs"></div>
                                        ))}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </div>
    );
};