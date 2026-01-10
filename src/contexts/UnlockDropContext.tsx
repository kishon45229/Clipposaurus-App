"use client";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDropKeyManager } from "@/hooks/useDropKeyManager";
import { useUnlockDropManager } from "@/hooks/useUnlockDropManager";
import { useUnlockDropComponent } from "@/contexts/ComponentDataContext";
import type { DropKeyVerificationRequestStatus, CreateDropRequestStatus } from "@/types";
import type { UnlockDropComponent } from "@/types/contentData-types/unlockDrop-types";

interface UnlockDropContextType {
    // useDropKey values
    identifier: string;
    systemSecret: string;
    userSecret: string;
    handleIdentifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSystemSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUserSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValidDropKey: boolean;

    // useUnlockDrop values
    dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus;
    createDropRequestStatus: CreateDropRequestStatus;
    handleCaptchaChange: (token: string | null) => void;
    handleCreateDrop: () => void;
    handleOpenDrop: () => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    handleTryAgain: () => void;
    handleRateLimit: () => void;
    recaptchaRef: React.RefObject<ReCAPTCHA | null>;
    shouldShowRecaptcha: boolean;
    redirectUrl: string | null;
    isEnterKeyStep: boolean;
    isVerifyStep: boolean;
    isAccessStep: boolean;
    emptyFields: string[];

    data: UnlockDropComponent;
    isLoading: boolean;
    error: Error | null;
}

const UnlockDropContext = React.createContext<UnlockDropContextType | undefined>(undefined);

interface UnlockDropProviderProps {
    children: React.ReactNode;
}

export function UnlockDropProvider({ children }: UnlockDropProviderProps): React.ReactElement {
    const dropKeyHook = useDropKeyManager();
    const unlockDropHook = useUnlockDropManager({
        identifier: dropKeyHook.identifier,
        systemSecret: dropKeyHook.systemSecret,
        userSecret: dropKeyHook.userSecret,
        isValidDropKey: dropKeyHook.isValidDropKey,
        handleClearDropKey: dropKeyHook.handleClearDropKey,
    });
    const { data, isLoading, error } = useUnlockDropComponent();

    const contextValue: UnlockDropContextType = React.useMemo(() => ({
        ...dropKeyHook,
        ...unlockDropHook,
        data,
        isLoading,
        error,
    }), [dropKeyHook, unlockDropHook, data, isLoading, error]);

    return (
        <UnlockDropContext.Provider value={contextValue}>
            {children}
        </UnlockDropContext.Provider>
    );
}

export function useUnlockDrop(): UnlockDropContextType {
    const context = React.useContext(UnlockDropContext);
    if (!context) {
        throw new Error("useUnlockDrop must be used within a UnlockDropProvider");
    }

    return context;
}