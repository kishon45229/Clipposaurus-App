"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
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
import { DocsSidebarItem } from "@/types/contentData-types/docs-types";
import { DocsLeftSidebarSkeleton } from "@/components/skeleton/DocsLeftSidebarSkeleton";
import { ComponentError } from "@/components/custom/ComponentError";

export const DocsLeftSidebar = React.memo(() => {
    const { data, currentPageId, navigateToPage, isLoading, error } = useDocs();

    if (isLoading || !data) return <DocsLeftSidebarSkeleton />;
    if (error || !data)
        return (
            <Sidebar
                side="left"
                variant="sidebar"
                collapsible="offcanvas"
                className="*:data-[slot=sidebar-inner]:bg-black"
            >
                <ComponentError componentId="DocsLeftSidebar" />
            </Sidebar>
        );

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
                    {data.sidebar.map((section) => (
                        <SidebarGroup key={section.id} className="mt-2">
                            <SidebarGroupLabel
                                className="text-xs font-semibold uppercase underline-offset-4 text-zinc-400 dark:text-zinc-500 pb-1">
                                {section.title}
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {section.children?.map((item: DocsSidebarItem) => {
                                        const isActive = currentPageId === item.id;

                                        return (
                                            <SidebarMenuItem key={item.id}>
                                                <SidebarMenuButton
                                                    onClick={() => navigateToPage(item.id)}
                                                    isActive={isActive}
                                                    className={`
                                                        transition-all duration-200
                                                        rounded-xl px-3 py-2 text-sm cursor-target
                                                        ${isActive
                                                            ? "bg-zinc-800  data-[active=true]:text-emerald-500 shadow-inner"
                                                            : "text-zinc-900 dark:text-zinc-300 hover:bg-zinc-800/40 hover:text-emerald-300"
                                                        }
                                                    `}
                                                >
                                                    {item.title}
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </div>
            </SidebarContent>
        </Sidebar>
    );
});

DocsLeftSidebar.displayName = "DocsLeftSidebar";