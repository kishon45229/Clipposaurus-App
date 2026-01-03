"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const DropSidebarSkeleton = () => {
    return (
        <div className="w-80 border-r border-zinc-200/60 dark:border-zinc-800/60 bg-linear-to-b from-zinc-50/60 to-white/30 dark:from-zinc-900/50 dark:to-zinc-950/30">
            {/* Sidebar Header */}
            <div className="border-b border-zinc-200/60 dark:border-zinc-800/60 p-4 bg-linear-to-r from-zinc-50/50 to-transparent dark:from-zinc-900/40">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>

            {/* Sidebar Content */}
            <div className="gap-0">
                {/* Countdown Section */}
                <div className="border-b border-zinc-200/60 dark:border-zinc-800/60 p-4">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <div className="p-2 rounded-lg bg-linear-to-b from-zinc-100/70 to-zinc-50/40 dark:from-zinc-900/60 dark:to-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50">
                        <div className="text-center">
                            <Skeleton className="h-8 w-20 mx-auto mb-1" />
                            <Skeleton className="h-3 w-32 mx-auto" />
                        </div>
                    </div>
                </div>

                {/* Content Menu Section */}
                <div className="p-4">
                    <Skeleton className="h-4 w-28 mb-3" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DropMainContentSkeleton = () => {
    return (
        <div className="flex-1 flex flex-col">
            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative p-4">
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    );
};

export const DropPreviewSkeleton = () => {
    return (
        <SidebarProvider
            defaultOpen={true}
            mobileBehavior="inline"
            mobileDefaultOpen={false}
        >
            <div className="flex w-full max-w-[1920px] mx-auto box-border rounded-lg shadow-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900" role="main">
                <DropSidebarSkeleton />
                <SidebarInset className="flex-1 w-full h-full">
                    <DropMainContentSkeleton />
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};