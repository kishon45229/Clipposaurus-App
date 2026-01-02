"use client";

import React from "react";
import { useTestimonialsComponent } from "@/contexts/ComponentDataContext";
import { TestimonialsComponent } from "@/types";

interface TestimonialsContextType {
    data: TestimonialsComponent;
    isLoading: boolean;
    error: Error | null;
}

const TestimonialsContext = React.createContext<TestimonialsContextType | undefined>(undefined);

interface TestimonialsProviderProps {
    children: React.ReactNode;
}

export function TestimonialsProvider({ children }: TestimonialsProviderProps): React.ReactElement {
    const { data, isLoading, error } = useTestimonialsComponent();

    const contextValue: TestimonialsContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <TestimonialsContext.Provider value={contextValue}>
            {children}
        </TestimonialsContext.Provider>
    );
}

export function useTestimonials(): TestimonialsContextType {
    const context = React.useContext(TestimonialsContext);
    if (!context) {
        throw new Error("useTestimonials must be used within a TestimonialsProvider");
    }
    return context;
}
