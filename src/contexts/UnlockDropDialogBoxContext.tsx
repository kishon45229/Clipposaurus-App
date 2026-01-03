"use client";

import React from "react";
import { useUnlockDropDialogBoxComponent } from "@/contexts/ComponentDataContext";
import { UnlockDropDialogBoxComponent } from "@/types/contentData-types/unlockDropDialogBox-types";

interface UnlockDropDialogBoxContextType {
    data: UnlockDropDialogBoxComponent;
    isLoading: boolean;
    error: Error | null;
}

const UnlockDropDialogBoxContext = React.createContext<UnlockDropDialogBoxContextType | undefined>(undefined);

interface UnlockDropDialogBoxProviderProps {
    children: React.ReactNode;
}

export function UnlockDropDialogBoxProvider({ children }: UnlockDropDialogBoxProviderProps): React.ReactElement {
    const { data, isLoading, error } = useUnlockDropDialogBoxComponent();

    const contextValue: UnlockDropDialogBoxContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <UnlockDropDialogBoxContext.Provider value={contextValue}>
            {children}
        </UnlockDropDialogBoxContext.Provider>
    );
}

export function useUnlockDropDialogBox(): UnlockDropDialogBoxContextType {
    const context = React.useContext(UnlockDropDialogBoxContext);
    if (!context) {
        throw new Error("useUnlockDropDialogBox must be used within a UnlockDropDialogBoxProvider");
    }
    return context;
}