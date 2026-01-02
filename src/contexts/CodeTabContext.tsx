"use client";

import React, { createContext, useContext } from "react";
import { useCreateDrop } from "@/contexts/CreateDropContext";
import useCode from "@/hooks/useCode";
import { MAX_LINES } from "@/components/custom/create-drop/tab/code-tab/config";

interface CodeTabContextValue {
    // Core state
    codeContent: string;
    setCodeContent: React.Dispatch<React.SetStateAction<string>>;
    selectedLanguage: string;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
    autoDetectLanguage: boolean;
    setAutoDetectLanguage: React.Dispatch<React.SetStateAction<boolean>>;

    // Derived state
    lineCount: number;
    atCodeLineLimit: boolean;

    // UI refs and handlers
    leftLineNumbersRef: React.RefObject<HTMLDivElement | null>;
    handleScroll: (scrollTop: number) => void;

    // Handlers
    handleCodeChange: (value: string) => void;
    handleLanguageChange: (language: string) => void;
    handleCodePaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    clearCodeContent: () => void;
}

const CodeTabContext = createContext<CodeTabContextValue | null>(null);

interface CodeTabProviderProps {
    children: React.ReactNode;
}

export function CodeTabProvider({ children }: CodeTabProviderProps): React.ReactElement {
    const { dropData, setCodeContent, autoDetectLanguage, setSelectedLanguage, setAutoDetectLanguage } = useCreateDrop();
    const codeContent = dropData.codeContent;
    const selectedLanguage = dropData.selectedLanguage;

    const {
        leftLineNumbersRef,
        lineCount,
        atCodeLineLimit,
        handleCodeChange,
        handleLanguageChange,
        handleCodePaste,
        handleScroll,
        clearCodeContent
    } = useCode({
        codeContent,
        setCodeContent,
        selectedLanguage,
        setSelectedLanguage,
        autoDetectLanguage,
        setAutoDetectLanguage,
    }, MAX_LINES);

    const contextValue: CodeTabContextValue = React.useMemo(() => ({
        // Core state
        codeContent,
        setCodeContent,
        selectedLanguage,
        setSelectedLanguage,
        autoDetectLanguage,
        setAutoDetectLanguage,

        // Derived state
        lineCount,
        atCodeLineLimit,

        // UI refs and handlers
        leftLineNumbersRef,
        handleScroll,

        // Handlers
        handleCodeChange,
        handleLanguageChange,
        handleCodePaste,
        clearCodeContent,
    }), [
        atCodeLineLimit,
        autoDetectLanguage,
        clearCodeContent,
        codeContent,
        handleCodeChange,
        handleCodePaste,
        handleLanguageChange,
        handleScroll,
        leftLineNumbersRef,
        lineCount,
        selectedLanguage,
        setAutoDetectLanguage,
        setCodeContent,
        setSelectedLanguage,
    ]);

    return (
        <CodeTabContext.Provider value={contextValue}>
            {children}
        </CodeTabContext.Provider>
    );
};

/**
 * Custom hook to use CodeTab context
 * @returns CodeTabContextValue
 * @throws Error if used outside CodeTabProvider
 */
export const useCodeTab = (): CodeTabContextValue => {
    const context = useContext(CodeTabContext);
    if (!context) {
        throw new Error("useCodeTab must be used within a CodeTabProvider");
    }
    return context;
};