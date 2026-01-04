"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

export const DocsLeftSidebarSkeleton = () => {
    return (
        <Sidebar
            side="left"
            variant="sidebar"
            collapsible="offcanvas"
            className="
                h-full border-r border-zinc-200 dark:border-zinc-800/60
                backdrop-blur-xl
            "
        >
            <SidebarContent className="bg-transparent py-3 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-4 px-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SidebarGroup key={i} className="mt-2">
                            <SidebarGroupLabel className="text-xs font-semibold uppercase underline-offset-4 text-zinc-400 dark:text-zinc-500 pb-1">
                                <Skeleton className="h-4 w-24" />
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, j) => (
                                        <SidebarMenuItem key={j}>
                                            <SidebarMenuButton className="rounded-xl px-3 py-2 text-sm">
                                                <Skeleton className="h-4 w-20" />
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </div>
            </SidebarContent>
        </Sidebar>
    );
};