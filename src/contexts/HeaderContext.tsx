"use client";

import React from "react";
import { useCreateDrop } from "@/contexts/CreateDropContext";
import { useHeaderComponent } from "@/contexts/ComponentDataContext";
import type { CreateDropAlertStatus } from "@/types";
import type { HeaderComponent } from "@/types/contentData-types/header-types";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export interface HeaderContextValue {
    // Component data
    data: HeaderComponent;
    isLoading: boolean;
    error: Error | null;

    // Drop data and actions from CreateDropContext
    handleCreateDrop: () => void;
    handleDialogClose: () => void
    handleDialogBoxOpenChange: (open: boolean) => void;
    createDropRequestStatus: CreateDropAlertStatus;

    // Key management
    identifier: string;
    systemSecret: string;
    userSecret: string;
    setUserSecret: (key: string) => void;
    isLoadingKeys: boolean;
    handleKeyGeneration: () => void;

    // Retention settings
    retention: string;
    setRetention: (retention: string) => void;

    // Mobile-specific state
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    handleMobileMenuOpen: () => void;
    handleCloseMobileMenu: () => void;

    // Drawer state
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    handleDrawerToggle: () => void;

    copied: boolean;
    handleCopy: () => void;

    fullKeyVisible: boolean;
    setFullKeyVisible: (visible: boolean) => void;

    uploadProgress: number;
}

const HeaderContext = React.createContext<HeaderContextValue | undefined>(undefined);

interface HeaderProviderProps {
    children: React.ReactNode;
}

export function HeaderProvider({ children }: HeaderProviderProps): React.ReactElement {
    const { createDropRequestStatus, handleCreateDrop, handleDialogClose, handleDialogBoxOpenChange, handleCopy, copied, identifier, systemSecret, userSecret, setUserSecret, isLoadingKeys, handleKeyGeneration, retention, setRetention, fullKeyVisible, setFullKeyVisible, uploadProgress } = useCreateDrop();
    const { data, isLoading, error } = useHeaderComponent();
    const { isMobileMenuOpen, setIsMobileMenuOpen, handleMobileMenuOpen, handleCloseMobileMenu } = useMobileMenu();

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const handleDrawerToggle = React.useCallback(() => {
        setIsDrawerOpen(prev => !prev);
    }, []);

    const contextValue: HeaderContextValue = React.useMemo(() => ({
        // Component data
        data,
        isLoading,
        error,

        // Drop data and actions from CreateDropContext
        handleCreateDrop,
        handleDialogClose,
        handleDialogBoxOpenChange,
        createDropRequestStatus,

        // Key management
        identifier,
        systemSecret,
        userSecret,
        setUserSecret,
        isLoadingKeys,
        handleKeyGeneration,

        // Retention settings
        retention,
        setRetention,
        // Mobile-specific state
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        handleMobileMenuOpen,
        handleCloseMobileMenu,

        // Drawer state
        isDrawerOpen,
        setIsDrawerOpen,
        handleDrawerToggle,

        copied,
        handleCopy,

        fullKeyVisible,
        setFullKeyVisible,

        uploadProgress,
    }), [
        data,
        createDropRequestStatus,
        handleCreateDrop,
        handleDialogClose,
        handleDialogBoxOpenChange,
        handleKeyGeneration,
        identifier,
        systemSecret,
        userSecret,
        setUserSecret,
        isLoadingKeys,
        retention,
        setRetention,
        isLoading,
        error,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        handleMobileMenuOpen,
        handleCloseMobileMenu,
        copied,
        handleCopy,
        fullKeyVisible,
        setFullKeyVisible,
        isDrawerOpen,
        handleDrawerToggle,
        uploadProgress,
    ]);

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeader(): HeaderContextValue {
    const context = React.useContext(HeaderContext);
    if (context === undefined) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }
    return context;
}