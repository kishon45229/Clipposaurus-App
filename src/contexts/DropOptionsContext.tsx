"use client";

import React from "react";
import { useDropKey } from "@/hooks/useDropKey";
import { useOpenDropModal } from "@/hooks/useOpenDropModal";
import ReCAPTCHA from "react-google-recaptcha";
import { DropKeyVerificationRequestStatus, CreateDropRequestStatus } from "@/types";

// Define the context type that combines both hooks
interface HomeOptionsContextType {
    // useDropKey values
    identifier: string;
    systemSecret: string;
    userSecret: string;
    handleIdentifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSystemSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUserSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValidDropKey: boolean;

    // useOpenDropModal values
    dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus;
    createDropRequestStatus: CreateDropRequestStatus;
    isModalOpen: boolean;
    shouldShowModal: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    handleOpenChange: (open: boolean) => void;
    handleCaptchaChange: (token: string | null) => void;
    handleCreateDrop: () => void;
    handleOpenDrop: () => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    handleClose: () => void;
    handleDialogClose: () => void;
    handleDropKeyVerificationSuccess: () => void;
    recaptchaRef: React.RefObject<ReCAPTCHA | null>;
    shouldShowRecaptcha: boolean;
    redirectUrl: string | null;
}

const DropOptionsContext = React.createContext<HomeOptionsContextType | undefined>(undefined);

interface HomeOptionsProviderProps {
    children: React.ReactNode;
}

export function DropOptionsProvider({ children }: HomeOptionsProviderProps): React.ReactElement {
    const dropKeyHook = useDropKey();
    const openDropModalHook = useOpenDropModal({
        identifier: dropKeyHook.identifier,
        systemSecret: dropKeyHook.systemSecret,
        userSecret: dropKeyHook.userSecret,
        isValidDropKey: dropKeyHook.isValidDropKey
    });

    const contextValue: HomeOptionsContextType = React.useMemo(() => ({
        ...dropKeyHook,
        ...openDropModalHook,
    }), [dropKeyHook, openDropModalHook]);

    return (
        <DropOptionsContext.Provider value={contextValue}>
            {children}
        </DropOptionsContext.Provider>
    );
}

export function useDropOptions(): HomeOptionsContextType {
    const context = React.useContext(DropOptionsContext);
    if (!context) {
        throw new Error("useDropOptions must be used within a DropOptionsProvider");
    }

    return context;
}