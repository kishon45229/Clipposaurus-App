"use client";

import React from "react";
import { DocsProvider } from "@/contexts/DocsContext";
import { DocsLeftSidebar } from "@/components/custom/docs/DocsLeftSidebar";
import { DocsContent } from "@/components/custom/docs/DocsContent";
import { DocsRightSidebar } from "@/components/custom/docs/DocsRightSidebar";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import { useDocsComponent } from "@/contexts/ComponentDataContext";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "DocsComponent" as const;

export const DocsContainer = () => {
    const { error } = useDocsComponent();

    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return (
        <DocsProvider>
            <SidebarProvider defaultOpen={true} className="h-screen overflow-hidden">
                <div className="flex h-full w-full">
                    <DocsLeftSidebar />
                    <SidebarInset className="flex-1 min-w-0 h-full overflow-hidden">
                        <DocsContent />
                    </SidebarInset>
                    <DocsRightSidebar />
                </div>
            </SidebarProvider>
        </DocsProvider>
    );
};