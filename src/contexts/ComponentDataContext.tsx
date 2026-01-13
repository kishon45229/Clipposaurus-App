"use client";

import React from "react";
import { getComponentData } from "@/services/componentDataService";
import type { UnlockDropComponent } from "@/types/contentData-types/unlockDrop-types";
import type { HeaderComponent } from "@/types/contentData-types/header-types";
import type { DropPreviewComponent } from "@/types/contentData-types/dropPreview-types";
import type { FooterComponent } from "@/components/footer/footer.types";
import type { NavbarComponent } from "@/components/navbar/navbar.types";

export type ComponentDataType = UnlockDropComponent | HeaderComponent | DropPreviewComponent | FooterComponent | NavbarComponent;

export type ComponentTypeMap = {
    UnlockDropComponent: UnlockDropComponent;
    HeaderComponent: HeaderComponent;
    DropPreviewComponent: DropPreviewComponent;
    FooterComponent: FooterComponent;
    NavbarComponent: NavbarComponent;
};

interface ComponentDataContextType {
    getComponentData: <T extends keyof ComponentTypeMap>(componentId: T) => Promise<ComponentTypeMap[T]>;
    cachedData: Partial<ComponentTypeMap>;
    loadingStates: Record<string, boolean>;
    errorStates: Record<string, Error | null>;
    clearComponentCache: (componentId: keyof ComponentTypeMap) => void;
    clearAllCache: () => void;
    preloadComponent: <T extends keyof ComponentTypeMap>(componentId: T) => Promise<void>;
}

const ComponentDataContext = React.createContext<ComponentDataContextType | undefined>(undefined);

interface ComponentDataProviderProps {
    children: React.ReactNode;
}

export function ComponentDataProvider({ children }: ComponentDataProviderProps): React.ReactElement {
    const [cachedData, setCachedData] = React.useState<Partial<ComponentTypeMap>>({});
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({});
    const [errorStates, setErrorStates] = React.useState<Record<string, Error | null>>({});

    const updateLoadingState = React.useCallback((componentId: string, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [componentId]: isLoading }));
    }, []);

    const updateErrorState = React.useCallback((componentId: string, error: Error | null) => {
        setErrorStates(prev => ({ ...prev, [componentId]: error }));
    }, []);

    const fetchComponentData = React.useCallback(async <T extends keyof ComponentTypeMap>(
        componentId: T
    ): Promise<ComponentTypeMap[T]> => {
        if (cachedData[componentId]) {
            return cachedData[componentId] as ComponentTypeMap[T];
        }

        updateLoadingState(componentId, true);
        updateErrorState(componentId, null);

        try {
            const data = await getComponentData<ComponentTypeMap[T]>(componentId);
            setCachedData(prev => ({
                ...prev,
                [componentId]: data
            }));

            updateLoadingState(componentId, false);
            return data;
        } catch (error) {
            updateErrorState(componentId, error as Error);
            updateLoadingState(componentId, false);
            throw error;
        }
    }, [cachedData, updateLoadingState, updateErrorState]);

    const clearComponentCache = React.useCallback((componentId: keyof ComponentTypeMap) => {
        setCachedData(prev => {
            const newData = { ...prev };
            delete newData[componentId];
            return newData;
        });
        updateErrorState(componentId, null);
    }, [updateErrorState]);

    const clearAllCache = React.useCallback(() => {
        setCachedData({});
        setErrorStates({});
    }, []);

    const preloadComponent = React.useCallback(async <T extends keyof ComponentTypeMap>(componentId: T): Promise<void> => {
        try {
            await fetchComponentData(componentId);
        } catch {
            // ignored
        }
    }, [fetchComponentData]);

    const contextValue: ComponentDataContextType = React.useMemo(() => ({
        getComponentData: fetchComponentData,
        cachedData,
        loadingStates,
        errorStates,
        clearComponentCache,
        clearAllCache,
        preloadComponent,
    }), [cachedData, loadingStates, errorStates, fetchComponentData, clearComponentCache, clearAllCache, preloadComponent]);

    return (
        <ComponentDataContext.Provider value={contextValue}>
            {children}
        </ComponentDataContext.Provider>
    );
}

export function useComponentData(): ComponentDataContextType {
    const context = React.useContext(ComponentDataContext);
    if (!context) {
        throw new Error("useComponentData must be used within a ComponentDataProvider");
    }
    return context;
}

export function useUnlockDropComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.UnlockDropComponent && !loadingStates.UnlockDropComponent && !errorStates.UnlockDropComponent) {
            getComponentData("UnlockDropComponent").catch(console.error);
        }
    }, [cachedData.UnlockDropComponent, loadingStates.UnlockDropComponent, errorStates.UnlockDropComponent, getComponentData]);

    return {
        data: cachedData.UnlockDropComponent as UnlockDropComponent,
        isLoading: loadingStates.UnlockDropComponent || false,
        error: errorStates.UnlockDropComponent,
    };
}

export function useHeaderComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.HeaderComponent && !loadingStates.HeaderComponent && !errorStates.HeaderComponent) {
            getComponentData("HeaderComponent").catch(console.error);
        }
    }, [cachedData.HeaderComponent, loadingStates.HeaderComponent, errorStates.HeaderComponent, getComponentData]);

    return {
        data: cachedData.HeaderComponent as HeaderComponent,
        isLoading: loadingStates.HeaderComponent || false,
        error: errorStates.HeaderComponent,
    };
}

export function useDropPreview() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.DropPreviewComponent && !loadingStates.DropPreviewComponent && !errorStates.DropPreviewComponent) {
            getComponentData("DropPreviewComponent").catch(console.error);
        }
    }, [cachedData.DropPreviewComponent, loadingStates.DropPreviewComponent, errorStates.DropPreviewComponent, getComponentData]);

    return {
        data: cachedData.DropPreviewComponent as DropPreviewComponent,
        isLoading: loadingStates.DropPreviewComponent || false,
        error: errorStates.DropPreviewComponent,
    };
}

export function useNavbarComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.NavbarComponent && !loadingStates.NavbarComponent && !errorStates.NavbarComponent) {
            getComponentData("NavbarComponent").catch(console.error);
        }
    }, [cachedData.NavbarComponent, loadingStates.NavbarComponent, errorStates.NavbarComponent, getComponentData]);

    return {
        data: cachedData.NavbarComponent as NavbarComponent,
        isLoading: loadingStates.NavbarComponent || false,
        error: errorStates.NavbarComponent,
    };
}

export function useFooterComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.FooterComponent && !loadingStates.FooterComponent && !errorStates.FooterComponent) {
            getComponentData("FooterComponent").catch(console.error);
        }
    }, [cachedData.FooterComponent, loadingStates.FooterComponent, errorStates.FooterComponent, getComponentData]);

    return {
        data: cachedData.FooterComponent as FooterComponent,
        isLoading: loadingStates.FooterComponent || false,
        error: errorStates.FooterComponent,
    };
}