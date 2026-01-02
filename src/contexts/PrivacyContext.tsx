"use client";

import React from "react";
import { usePrivacyComponent } from "@/contexts/ComponentDataContext";
import { PrivacyComponent } from "@/types";

interface PrivacyContextType {
    data: PrivacyComponent;
    isLoading: boolean;
    error: Error | null;
}

const PrivacyContext = React.createContext<PrivacyContextType | undefined>(undefined);

interface PrivacyProviderProps {
    children: React.ReactNode;
}

export function PrivacyProvider({ children }: PrivacyProviderProps): React.ReactElement {
    const { data, isLoading, error } = usePrivacyComponent();

    const contextValue: PrivacyContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <PrivacyContext.Provider value={contextValue}>
            {children}
        </PrivacyContext.Provider>
    );
}

export function usePrivacy(): PrivacyContextType {
    const context = React.useContext(PrivacyContext);
    if (!context) {
        throw new Error("usePrivacy must be used within a PrivacyProvider");
    }
    return context;
}
