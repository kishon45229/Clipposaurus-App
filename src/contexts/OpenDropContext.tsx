"use client";

import React from "react";
import { useOpenDropManager, type UseOpenDropReturn } from "@/hooks/useOpenDropManager";

const OpenDropContext = React.createContext<UseOpenDropReturn | undefined>(undefined);

interface OpenDropProviderProps {
    children: React.ReactNode;
}

export function OpenDropProvider({ children }: OpenDropProviderProps): React.ReactElement {
    const openDropManager = useOpenDropManager();

    return (
        <OpenDropContext.Provider value={openDropManager}>
            {children}
        </OpenDropContext.Provider>
    );
}

export function useOpenDrop(): UseOpenDropReturn {
    const context = React.useContext(OpenDropContext);
    if (!context) {
        throw new Error("useOpenDrop must be used within an OpenDropProvider");
    }
    return context;
}