"use client";

import React, { createContext, useContext } from "react";
import { useText } from "@/hooks/useText";
import { useCreateDrop } from "@/contexts/CreateDropContext";

interface TextTabContextValue {
    // Core state
    textContent: string;
    setTextContent: React.Dispatch<React.SetStateAction<string>>;

    // Derived state
    charCount: number;
    atCharLimit: boolean;
    MAX_CHARS: number;

    // Handlers
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleTextPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    clearTextContent: () => void;
}

const TextTabContext = createContext<TextTabContextValue | null>(null);

interface TextTabProviderProps {
    children: React.ReactNode;
}

export function TextTabProvider({ children }: TextTabProviderProps): React.ReactElement {
    const { dropData, setTextContent } = useCreateDrop();
    const textContent = dropData.textContent;

    const {
        charCount,
        atCharLimit,
        MAX_CHARS,
        handleTextChange,
        handleTextPaste,
        clearTextContent
    } = useText({
        textContent,
        setTextContent,
    });

    const contextValue: TextTabContextValue = React.useMemo(() => ({
        // Core state
        textContent,
        setTextContent,

        // Derived state
        charCount,
        atCharLimit,
        MAX_CHARS,

        // Handlers
        handleTextChange,
        handleTextPaste,
        clearTextContent,
    }), [
        textContent,
        setTextContent,
        charCount,
        atCharLimit,
        MAX_CHARS,
        handleTextChange,
        handleTextPaste,
        clearTextContent,
    ]);

    return (
        <TextTabContext.Provider value={contextValue}>
            {children}
        </TextTabContext.Provider>
    );
};
/**
 * Custom hook to use TextTab context
 * @returns TextTabContextValue
 * @throws Error if used outside TextTabProvider
 */
export const useTextTab = (): TextTabContextValue => {
    const context = useContext(TextTabContext);
    if (!context) {
        throw new Error("useTextTab must be used within a TextTabProvider");
    }
    return context;
};