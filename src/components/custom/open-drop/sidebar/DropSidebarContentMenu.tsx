"use client";

import React from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useDropSidebar } from "@/contexts/DropSidebarContext";
import { DropSidebarContentItems } from "./DropSidebarContentItems";

export const DropSidebarContentMenu = React.memo(() => {
    const {
        isCollapsed,
        contentsLabel
    } = useDropSidebar();

    return (
        <SidebarGroup>
            {!isCollapsed ? (
                <>
                    <SidebarGroupLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                        {contentsLabel}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <DropSidebarContentItems />
                    </SidebarGroupContent>
                </>
            ) : (
                <DropSidebarContentItems />
            )}
        </SidebarGroup>
    );
});

DropSidebarContentMenu.displayName = "DropSidebarContentMenu";