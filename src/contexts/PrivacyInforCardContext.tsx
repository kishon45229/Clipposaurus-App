"use client";

import React from "react";
import { usePrivacyInfoCardComponent } from "@/contexts/ComponentDataContext";
import { PrivacyInfoCardComponent } from "@/types";

interface PrivacyInfoCardContextType {
    data: PrivacyInfoCardComponent;
    isLoading: boolean;
    error: Error | null;
}

const PrivacyInfoCardContext = React.createContext<PrivacyInfoCardContextType | undefined>(undefined);

interface PrivacyInfoCardProviderProps {
    children: React.ReactNode;
}

export function PrivacyInfoCardProvider({ children }: PrivacyInfoCardProviderProps): React.ReactElement {
    const { data, isLoading, error } = usePrivacyInfoCardComponent();

    const contextValue: PrivacyInfoCardContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <PrivacyInfoCardContext.Provider value={contextValue}>
            {children}
        </PrivacyInfoCardContext.Provider>
    );
}

export function usePrivacyInfoCard(): PrivacyInfoCardContextType {
    const context = React.useContext(PrivacyInfoCardContext);
    if (!context) {
        throw new Error("usePrivacyInfoCard must be used within a PrivacyInfoCardProvider");
    }
    return context;
}