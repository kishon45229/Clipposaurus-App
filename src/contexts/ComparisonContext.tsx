"use client";

import React from "react";
import { useComparisonComponent } from "@/contexts/ComponentDataContext";
import { ComparisonComponent } from "@/types";

interface ComparisonContextType {
    data: ComparisonComponent;
    isLoading: boolean;
    error: Error | null;
}

const ComparisonContext = React.createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
    children: React.ReactNode;
}

export function ComparisonProvider({ children }: ComparisonProviderProps): React.ReactElement {
    const { data, isLoading, error } = useComparisonComponent();

    const contextValue: ComparisonContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <ComparisonContext.Provider value={contextValue}>
            {children}
        </ComparisonContext.Provider>
    );
}

export function useComparison(): ComparisonContextType {
    const context = React.useContext(ComparisonContext);
    if (!context) {
        throw new Error("useComparison must be used within a ComparisonProvider");
    }
    return context;
}
