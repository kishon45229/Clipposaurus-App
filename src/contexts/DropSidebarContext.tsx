"use client";

import React from "react";
import { FileText, Code } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useOpenDrop } from "@/contexts/OpenDropContext";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDeleteDropManager } from "@/hooks/useDeleteDropManager";
import { useDropPreview } from "./ComponentDataContext";
import { DropContentType } from "@/types";

interface SidebarContextType {
    // sidebar content
    title: string;
    subtitle: string;
    timeRemainingLabel: string;
    expiredMessage: string;
    autoDeleteMessage: string;
    deleteAfterAccessMessage: string;
    contentsLabel: string;

    contentTypeIcons: Record<
        DropContentType,
        React.ComponentType<{ className?: string }>
    >;

    // Sidebar state
    isCollapsed: boolean;

    // Drop data
    decryptedDrop: ReturnType<typeof useOpenDrop>['decryptedDrop'];
    selectedContentType: ReturnType<typeof useOpenDrop>['selectedContentType'];
    setSelectedContentType: ReturnType<typeof useOpenDrop>['setSelectedContentType'];
    availableContentTypes: ReturnType<typeof useOpenDrop>['availableContentTypes'];

    // Countdown data
    timeLeft: string;
    isExpired: boolean;
    deleteOnAccess: boolean;
    setDeleteOnAccess: ReturnType<typeof useDeleteDropManager>['setDeleteOnAccess'];
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

interface DropSidebarProviderProps {
    children: React.ReactNode;
}

export function DropSidebarProvider({ children }: DropSidebarProviderProps): React.ReactElement {
    const { state, isMobile, openMobile, mobileBehavior } = useSidebar();
    const isSheetMobile = isMobile && mobileBehavior === "sheet";
    const isCollapsed = isSheetMobile ? !openMobile : state === "collapsed";

    const {
        decryptedDrop,
        selectedContentType,
        setSelectedContentType,
        availableContentTypes,
    } = useOpenDrop();

    const { data } = useDropPreview();
    const { title, subtitle, timeRemainingLabel, expiredMessage, autoDeleteMessage, deleteAfterAccessMessage, contentsLabel } = data;

    const contentTypeIcons = React.useMemo(() => ({
        note: FileText,
        code: Code,
    }), []);

    const { timeLeft, isExpired } = useCountdownTimer();
    const { deleteOnAccess, setDeleteOnAccess } = useDeleteDropManager();

    const contextValue: SidebarContextType = React.useMemo(() => ({
        title,
        subtitle,
        timeRemainingLabel,
        expiredMessage,
        autoDeleteMessage,
        deleteAfterAccessMessage,
        contentsLabel,
        contentTypeIcons,
        isCollapsed,
        decryptedDrop,
        selectedContentType,
        setSelectedContentType,
        availableContentTypes,
        timeLeft,
        isExpired,
        deleteOnAccess,
        setDeleteOnAccess,
    }), [
        title,
        subtitle,
        timeRemainingLabel,
        expiredMessage,
        autoDeleteMessage,
        deleteAfterAccessMessage,
        contentsLabel,
        contentTypeIcons,
        isCollapsed,
        decryptedDrop,
        selectedContentType,
        setSelectedContentType,
        availableContentTypes,
        timeLeft,
        isExpired,
        deleteOnAccess,
        setDeleteOnAccess
    ]);

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useDropSidebar(): SidebarContextType {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useDropSidebar must be used within a SidebarProvider");
    }
    return context;
}