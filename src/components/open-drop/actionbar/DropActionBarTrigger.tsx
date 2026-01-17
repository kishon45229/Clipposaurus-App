"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export const DropActionBarTrigger = () => {
    return (
        <div className="flex items-center gap-2">
            <SidebarTrigger className="size-3 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60" />
        </div>
    );
};
