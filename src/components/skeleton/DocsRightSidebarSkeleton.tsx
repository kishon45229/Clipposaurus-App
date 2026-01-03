import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DocsRightSidebarSkeleton = () => {
    return (
        <div className="w-64 h-screen bg-background/95 backdrop-blur border-l border-border shrink-0 hidden lg:flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border shrink-0">
                <Skeleton className="h-4 w-24" />
            </div>

            {/* Table of Contents */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-y-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ paddingLeft: `${(i % 3) * 12 + 8}px` }}>
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
};