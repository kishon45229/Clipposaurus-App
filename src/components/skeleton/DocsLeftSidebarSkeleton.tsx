import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";

export const DocsLeftSidebarSkeleton = () => {
    return (
        <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="*:data-[slot=sidebar-inner]:bg-black *:data-[slot=sidebar-inner]:text-white">
            <SidebarContent className="bg-black">
                <div className="space-y-6 p-4">
                    {/* Navigation sections skeleton */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                            {/* Section title */}
                            <Skeleton className="h-4 w-24 bg-gray-700" />

                            {/* Navigation items */}
                            <div className="space-y-2 pl-2">
                                {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, j) => (
                                    <div key={j} className="flex items-center gap-2">
                                        {/* Text skeleton */}
                                        <Skeleton className="h-4 w-20 bg-gray-700" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SidebarContent>
        </Sidebar>
    );
};