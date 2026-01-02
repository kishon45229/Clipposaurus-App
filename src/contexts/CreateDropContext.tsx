"use client";

import React from "react";
import { useCreateDropManager } from "@/hooks/useCreateDropManager";
import type { UseCreateDropManagerReturn } from "@/hooks/useCreateDropManager";

const CreateDropContext = React.createContext<UseCreateDropManagerReturn | null>(null);

interface CreateDropProviderProps {
    children: React.ReactNode;
}

export function CreateDropProvider({ children }: CreateDropProviderProps) {
    const createDropManager = useCreateDropManager();

    return (
        <CreateDropContext.Provider value={createDropManager}>
            {children}
        </CreateDropContext.Provider>
    );
}

export function useCreateDrop() {
    const context = React.useContext(CreateDropContext);
    if (!context) {
        throw new Error('useCreateDrop must be used within a CreateDropProvider');
    }
    return context;
}