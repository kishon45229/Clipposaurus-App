"use client";

import React from "react";
import { useChangelogComponent } from "@/contexts/ComponentDataContext";
import { ChangelogComponent } from "@/types";

interface ChangelogContextType {
    data: ChangelogComponent;
    isLoading: boolean;
    error: Error | null;
}

const ChangelogContext = React.createContext<ChangelogContextType | undefined>(undefined);

interface ChangelogProviderProps {
    children: React.ReactNode;
}

export function ChangelogProvider({ children }: ChangelogProviderProps): React.ReactElement {
    const { data, isLoading, error } = useChangelogComponent();

    const contextValue: ChangelogContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <ChangelogContext.Provider value={contextValue}>
            {children}
        </ChangelogContext.Provider>
    );
}

export function useChangelog(): ChangelogContextType {
    const context = React.useContext(ChangelogContext);
    if (!context) {
        throw new Error("useChangelog must be used within a ChangelogProvider");
    }
    return context;
}