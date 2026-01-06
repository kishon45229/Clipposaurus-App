"use client";

import React from "react";
import { getComponentData } from "@/services/componentDataService";
import { HeroComponent } from "@/types/contentData-types/hero-types";
import { PrivacyInfoCardComponent } from "@/types/contentData-types/privacyInfoCard-types";
import { UnlockDropDialogBoxComponent } from "@/types/contentData-types/unlockDropDialogBox-types";
import { MenuComponent } from "@/types/contentData-types/menu-types";
import { DropPreviewComponent } from "@/types/contentData-types/dropPreview-types";
import { TermsOfServiceComponent } from "@/types/contentData-types/termsOfService-types";
import { FAQComponent } from "@/types/contentData-types/faq-types";
import { ChangelogComponent } from "@/types/contentData-types/changelog-types";

export type ComponentDataType =
    | HeroComponent
    | PrivacyInfoCardComponent
    | UnlockDropDialogBoxComponent
    | MenuComponent
    | DropPreviewComponent
    | TermsOfServiceComponent
    | FAQComponent
    | ChangelogComponent;

export type ComponentTypeMap = {
    HeroComponent: HeroComponent;
    PrivacyInfoCardComponent: PrivacyInfoCardComponent;
    UnlockDropDialogBoxComponent: UnlockDropDialogBoxComponent;
    MenuComponent: MenuComponent;
    DropPreviewComponent: DropPreviewComponent;
    TermsOfServiceComponent: TermsOfServiceComponent;
    FAQComponent: FAQComponent;
    ChangelogComponent: ChangelogComponent;
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

export function useHeroComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.HeroComponent && !loadingStates.HeroComponent && !errorStates.HeroComponent) {
            getComponentData('HeroComponent').catch(console.error);
        }
    }, [cachedData.HeroComponent, loadingStates.HeroComponent, errorStates.HeroComponent, getComponentData]);

    return {
        data: cachedData.HeroComponent as HeroComponent,
        isLoading: loadingStates.HeroComponent || false,
        error: errorStates.HeroComponent,
    };
}

export function usePrivacyInfoCardComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.PrivacyInfoCardComponent && !loadingStates.PrivacyInfoCardComponent && !errorStates.PrivacyInfoCardComponent) {
            getComponentData('PrivacyInfoCardComponent').catch(console.error);
        }
    }, [cachedData.PrivacyInfoCardComponent, loadingStates.PrivacyInfoCardComponent, errorStates.PrivacyInfoCardComponent, getComponentData]);

    return {
        data: cachedData.PrivacyInfoCardComponent as PrivacyInfoCardComponent,
        isLoading: loadingStates.PrivacyInfoCardComponent || false,
        error: errorStates.PrivacyInfoCardComponent,
    };
}

export function useUnlockDropDialogBoxComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.UnlockDropDialogBoxComponent && !loadingStates.UnlockDropDialogBoxComponent && !errorStates.UnlockDropDialogBoxComponent) {
            getComponentData('UnlockDropDialogBoxComponent').catch(console.error);
        }
    }, [cachedData.UnlockDropDialogBoxComponent, loadingStates.UnlockDropDialogBoxComponent, errorStates.UnlockDropDialogBoxComponent, getComponentData]);

    return {
        data: cachedData.UnlockDropDialogBoxComponent as UnlockDropDialogBoxComponent,
        isLoading: loadingStates.UnlockDropDialogBoxComponent || false,
        error: errorStates.UnlockDropDialogBoxComponent,
    };
}

export function useMenuComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.MenuComponent && !loadingStates.MenuComponent && !errorStates.MenuComponent) {
            getComponentData('MenuComponent').catch(console.error);
        }
    }, [cachedData.MenuComponent, loadingStates.MenuComponent, errorStates.MenuComponent, getComponentData]);

    return {
        data: cachedData.MenuComponent as MenuComponent,
        isLoading: loadingStates.MenuComponent || false,
        error: errorStates.MenuComponent,
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

export function useTermsOfServiceComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.TermsOfServiceComponent && !loadingStates.TermsOfServiceComponent && !errorStates.TermsOfServiceComponent) {
            getComponentData("TermsOfServiceComponent").catch(console.error);
        }
    }, [cachedData.TermsOfServiceComponent, loadingStates.TermsOfServiceComponent, errorStates.TermsOfServiceComponent, getComponentData]);

    return {
        data: cachedData.TermsOfServiceComponent as TermsOfServiceComponent,
        isLoading: loadingStates.TermsOfServiceComponent || false,
        error: errorStates.TermsOfServiceComponent,
    };
}

export function useFAQComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.FAQComponent && !loadingStates.FAQComponent && !errorStates.FAQComponent) {
            getComponentData("FAQComponent").catch(console.error);
        }
    }, [cachedData.FAQComponent, loadingStates.FAQComponent, errorStates.FAQComponent, getComponentData]);

    return {
        data: cachedData.FAQComponent as FAQComponent,
        isLoading: loadingStates.FAQComponent || false,
        error: errorStates.FAQComponent,
    };
}

export function useChangelogComponent() {
    const { getComponentData, cachedData, loadingStates, errorStates } = useComponentData();

    React.useEffect(() => {
        if (!cachedData.ChangelogComponent && !loadingStates.ChangelogComponent && !errorStates.ChangelogComponent) {
            getComponentData("ChangelogComponent").catch(console.error);
        }
    }, [cachedData.ChangelogComponent, loadingStates.ChangelogComponent, errorStates.ChangelogComponent, getComponentData]);

    return {
        data: cachedData.ChangelogComponent as ChangelogComponent,
        isLoading: loadingStates.ChangelogComponent || false,
        error: errorStates.ChangelogComponent,
    };
}