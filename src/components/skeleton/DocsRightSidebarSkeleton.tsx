"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DocsRightSidebarSkeleton = () => {
    return (
        <div className="hidden w-64 shrink-0 h-full border-l border-border bg-background/95 backdrop-blur lg:flex lg:flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                <Skeleton className="h-4 w-24" />
            </div>

            {/* Table of Contents */}
            <div className="flex-1 overflow-y-auto p-4 overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} style={{ paddingLeft: `${(i % 3) * 12 + 8}px` }}>
                            <Skeleton className="h-3 w-32" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};