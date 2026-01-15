"use client";

import React from "react";
import { useCreateDrop } from "@/contexts/CreateDropContext";
import { useMenuComponent } from "@/contexts/ComponentDataContext";
import type { CreateDropAlertStatus } from "@/types";
import type { MenuComponentType } from "@/components/create-drop/MobileMenu/MobileMenu.types";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export interface MenuContextValue {
    // Component data
    data: MenuComponentType;
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

    copied: boolean;
    handleCopy: () => void;

    fullKeyVisible: boolean;
    setFullKeyVisible: (visible: boolean) => void;
}

const MenuContext = React.createContext<MenuContextValue | undefined>(undefined);

interface MenuProviderProps {
    children: React.ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps): React.ReactElement {
    const { createDropRequestStatus, handleCreateDrop, handleDialogClose, handleDialogBoxOpenChange, handleCopy, copied, identifier, systemSecret, userSecret, setUserSecret, isLoadingKeys, handleKeyGeneration, retention, setRetention, fullKeyVisible, setFullKeyVisible } = useCreateDrop();
    const { data, isLoading, error } = useMenuComponent();
    const { isMobileMenuOpen, setIsMobileMenuOpen, handleMobileMenuOpen, handleCloseMobileMenu } = useMobileMenu();

    const contextValue: MenuContextValue = React.useMemo(() => ({
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

        copied,
        handleCopy,

        fullKeyVisible,
        setFullKeyVisible,
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
    ]);

    return (
        <MenuContext.Provider value={contextValue}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu(): MenuContextValue {
    const context = React.useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}