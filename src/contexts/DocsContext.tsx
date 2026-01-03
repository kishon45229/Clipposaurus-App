"use client";

import React from 'react';
import { useDocsManager, UseDocsManagerReturn } from '@/hooks/useDocsManager';

interface DocsProviderProps {
    children: React.ReactNode;
}

const DocsContext = React.createContext<UseDocsManagerReturn | undefined>(undefined);

export const DocsProvider = ({
    children
}: DocsProviderProps) => {
    const docsData = useDocsManager();

    return (
        <DocsContext.Provider value={docsData}>
            {children}
        </DocsContext.Provider>
    );
};

export const useDocs = (): UseDocsManagerReturn => {
    const context = React.useContext(DocsContext);
    if (context === undefined) {
        throw new Error('useDocs must be used within a DocsProvider');
    }
    return context;
};