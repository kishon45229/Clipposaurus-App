"use client";

import React from "react";
import { useHomeIntroductionComponent } from "@/contexts/ComponentDataContext";
import { HomeIntroductionComponent } from "@/types";

interface HomeIntroductionContextType {
    data: HomeIntroductionComponent;
    isLoading: boolean;
    error: Error | null;
}

const HomeIntroductionContext = React.createContext<HomeIntroductionContextType | undefined>(undefined);

interface HomeIntroductionProviderProps {
    children: React.ReactNode;
}

export function HomeIntroductionProvider({ children }: HomeIntroductionProviderProps): React.ReactElement {
    const { data, isLoading, error } = useHomeIntroductionComponent();

    const contextValue: HomeIntroductionContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <HomeIntroductionContext.Provider value={contextValue}>
            {children}
        </HomeIntroductionContext.Provider>
    );
}

export function useHomeIntroduction(): HomeIntroductionContextType {
    const context = React.useContext(HomeIntroductionContext);
    if (!context) {
        throw new Error("useHomeIntroduction must be used within a HomeIntroductionProvider");
    }
    return context;
}
