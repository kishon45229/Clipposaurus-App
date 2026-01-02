"use client";

import React from "react";
import { usePlatformComponent } from "@/contexts/ComponentDataContext";
import { PlatformComponent } from "@/types";

interface PlatformContextType {
    data: PlatformComponent;
    isLoading: boolean;
    error: Error | null;
}

const PlatformContext = React.createContext<PlatformContextType | undefined>(undefined);

interface PlatformProviderProps {
    children: React.ReactNode;
}

export function PlatformProvider({ children }: PlatformProviderProps): React.ReactElement {
    const { data, isLoading, error } = usePlatformComponent();

    const contextValue: PlatformContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <PlatformContext.Provider value={contextValue}>
            {children}
        </PlatformContext.Provider>
    );
}

export function usePlatform(): PlatformContextType {
    const context = React.useContext(PlatformContext);
    if (!context) {
        throw new Error("usePlatform must be used within a PlatformProvider");
    }
    return context;
}
