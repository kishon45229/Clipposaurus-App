import React from "react";
import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import { DropSidebarHeader } from "@/components/custom/open-drop/sidebar/DropSidebarHeader";
import { DropSidebarCountdown } from "@/components/custom/open-drop/sidebar/DropSidebarCountdown";
import { DropSidebarContentMenu } from "@/components/custom/open-drop/sidebar/DropSidebarContentMenu";

export const DropSidebarContent = React.memo(() => {
    return (
        <Sidebar
            side="left"
            className="flex-1 h-full backdrop-blur-xl bg-gradient-to-b from-zinc-50/60 to-white/30 dark:from-zinc-900/50 dark:to-zinc-950/30 overflow-auto"
            collapsible="icon"
        >
            <DropSidebarHeader />
            <SidebarContent className="gap-0">
                <DropSidebarCountdown />
                <DropSidebarContentMenu />
            </SidebarContent>
        </Sidebar>
    );
});

DropSidebarContent.displayName = "DropSidebarContent";