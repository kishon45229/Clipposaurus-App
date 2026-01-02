"use client";

import React from "react";
import { SidebarHeader } from "@/components/ui/sidebar";
import { useDropSidebar } from "@/contexts/DropSidebarContext";

export const DropSidebarHeader: React.FC = React.memo(() => {
    const { title, subtitle, isCollapsed } = useDropSidebar();

    return (
        <SidebarHeader className="border-b border-zinc-200/60 dark:border-zinc-800/60 p-4 bg-linear-to-r from-zinc-50/50 to-transparent dark:from-zinc-900/40">
            {!isCollapsed && (
                <div className="flex flex-col gap-1">
                    <div className="font-bold tracking-tight text-emerald-600 dark:text-emerald-500 text-[clamp(0.875rem,3vw,1.125rem)]">
                        {title}
                    </div>
                    <div className="hidden xs-min:block text-zinc-600 dark:text-zinc-400 text-[clamp(0.75rem,2.5vw,0.875rem)]">
                        {subtitle}
                    </div>
                </div>
            )}
        </SidebarHeader>
    );
});

DropSidebarHeader.displayName = "DropSidebarHeader";
