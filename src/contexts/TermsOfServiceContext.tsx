"use client";

import React from "react";
import { useTermsOfServiceComponent } from "@/contexts/ComponentDataContext";
import { TermsOfServiceComponent } from "@/types";

interface TermsOfServiceContextType {
    data: TermsOfServiceComponent;
    isLoading: boolean;
    error: Error | null;
}

const TermsOfServiceContext = React.createContext<TermsOfServiceContextType | undefined>(undefined);

interface TermsOfServiceProviderProps {
    children: React.ReactNode;
}

export function TermsOfServiceProvider({ children }: TermsOfServiceProviderProps): React.ReactElement {
    const { data, isLoading, error } = useTermsOfServiceComponent();

    const contextValue: TermsOfServiceContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <TermsOfServiceContext.Provider value={contextValue}>
            {children}
        </TermsOfServiceContext.Provider>
    );
}

export function useTermsOfService(): TermsOfServiceContextType {
    const context = React.useContext(TermsOfServiceContext);
    if (!context) {
        throw new Error("useTermsOfService must be used within a TermsOfServiceProvider");
    }
    return context;
}