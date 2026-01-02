"use client";

import React from "react";
import { useDesignComponent } from "@/contexts/ComponentDataContext";
import { DesignComponent } from "@/types";

interface DesignContextType {
    data: DesignComponent;
    isLoading: boolean;
    error: Error | null;
}

const DesignContext = React.createContext<DesignContextType | undefined>(undefined);

interface DesignProviderProps {
    children: React.ReactNode;
}

export function DesignProvider({ children }: DesignProviderProps): React.ReactElement {
    const { data, isLoading, error } = useDesignComponent();

    const contextValue: DesignContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <DesignContext.Provider value={contextValue}>
            {children}
        </DesignContext.Provider>
    );
}

export function useDesign(): DesignContextType {
    const context = React.useContext(DesignContext);
    if (!context) {
        throw new Error("useDesign must be used within a DesignProvider");
    }
    return context;
}
