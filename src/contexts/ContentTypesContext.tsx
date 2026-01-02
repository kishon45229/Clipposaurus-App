"use client";

import React from "react";
import { useContentTypesComponent } from "@/contexts/ComponentDataContext";
import { ContentTypesComponent } from "@/types";

interface ContentTypesContextType {
    data: ContentTypesComponent;
    isLoading: boolean;
    error: Error | null;
}

const ContentTypesContext = React.createContext<ContentTypesContextType | undefined>(undefined);

interface ContentTypesProviderProps {
    children: React.ReactNode;
}

export function ContentTypesProvider({ children }: ContentTypesProviderProps): React.ReactElement {
    const { data, isLoading, error } = useContentTypesComponent();

    const contextValue: ContentTypesContextType = React.useMemo(() => ({
        data,
        isLoading,
        error,
    }), [data, isLoading, error]);

    return (
        <ContentTypesContext.Provider value={contextValue}>
            {children}
        </ContentTypesContext.Provider>
    );
}

export function useContentTypes(): ContentTypesContextType {
    const context = React.useContext(ContentTypesContext);
    if (!context) {
        throw new Error("useContentTypes must be used within a ContentTypesProvider");
    }
    return context;
}
