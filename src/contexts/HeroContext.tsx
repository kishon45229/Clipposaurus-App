"use client";

import React from "react";
import { useHeroComponent } from "@/contexts/ComponentDataContext";
import { HeroComponent } from "@/types/contentData-types/hero-types";

interface HeroContextType {
    data: HeroComponent;
    isLoading: boolean;
    error: Error | null;
}

const HeroContext = React.createContext<HeroContextType | undefined>(undefined);

interface HeroProviderProps {
    children: React.ReactNode;
}

export function HeroProvider({ children }: HeroProviderProps): React.ReactElement {
    const { data, isLoading, error } = useHeroComponent();

    const contextValue: HeroContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <HeroContext.Provider value={contextValue}>
            {children}
        </HeroContext.Provider>
    );
}

export function useHero(): HeroContextType {
    const context = React.useContext(HeroContext);
    if (!context) {
        throw new Error("useHero must be used within a HeroProvider");
    }
    return context;
}