"use client";

import React from 'react';
import { OpenDropProvider, useOpenDrop } from "@/contexts/OpenDropContext";
import { ComponentDataProvider, useDropPreview } from "@/contexts/ComponentDataContext";
import { DropSidebarProvider } from "@/contexts/DropSidebarContext";
import { DropSidebar } from "@/components/custom/open-drop/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DropContent } from "@/components/custom/open-drop/content";
import { ComponentError } from "@/components/custom/ComponentError"
import { DropPreviewSkeleton } from "@/components/skeleton/DropPreviewSkeleton";

const COMPONENT_ID = "DropPreviewComponent" as const;

export const DropPreview = React.memo(() => {
    const { decryptedDrop } = useOpenDrop();
    const { data, isLoading, error } = useDropPreview();

    if (isLoading || !data) return <DropPreviewSkeleton />;
    if (!decryptedDrop || error) return <ComponentError componentId={COMPONENT_ID} />;

    return (
        <OpenDropProvider>
            <SidebarProvider
                defaultOpen={true}
                mobileBehavior="inline"
                mobileDefaultOpen={false}
            >
                <div className="flex h-full w-full max-w-[1920px] mx-auto box-border rounded-2xl shadow-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900" role="main">
                    <DropSidebarProvider>
                        <DropSidebar />
                    </DropSidebarProvider>
                    <SidebarInset className="flex-1 w-full h-full">
                        <DropContent />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </OpenDropProvider>
    );
});

DropPreview.displayName = "DropPreview";
