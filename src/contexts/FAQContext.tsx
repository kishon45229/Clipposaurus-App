"use client";

import React from "react";
import { useFAQComponent } from "@/contexts/ComponentDataContext";
import { FAQComponent } from "@/types";

interface FAQContextType {
    data: FAQComponent;
    isLoading: boolean;
    error: Error | null;
}

const FAQContext = React.createContext<FAQContextType | undefined>(undefined);

interface FAQProviderProps {
    children: React.ReactNode;
}

export function FAQProvider({ children }: FAQProviderProps): React.ReactElement {
    const { data, isLoading, error } = useFAQComponent();

    const contextValue: FAQContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <FAQContext.Provider value={contextValue}>
            {children}
        </FAQContext.Provider>
    );
}

export function useFAQ(): FAQContextType {
    const context = React.useContext(FAQContext);
    if (!context) {
        throw new Error("useFAQ must be used within a FAQProvider");
    }
    return context;
}