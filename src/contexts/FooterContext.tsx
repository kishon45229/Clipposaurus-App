"use client";

import React from "react";
import { useFooterComponent } from "@/contexts/ComponentDataContext";
import { useRedirects } from "@/hooks/useRedirect";
import type { FooterComponent } from "@/components/footer/footer.types";

export interface FooterContextValue {
    data: FooterComponent;
    isLoading: boolean;
    error: Error | null;

    handleRedirectToDocs: () => void;
    handleRedirectToChangelog: () => void;
    handleRedirectToTermsOfService: () => void;
    handleRedirectToPrivacyPolicy: () => void;
    handleRedirectToGitHub: () => void;
    handleRedirectToFAQ: () => void;
    handleContactUs: () => void;
    handleRedirectToCreateDrop: () => void;
    handleRedirectToUnlockDrop: () => void;
    handleRedirectToGitHubDiscussions: () => void;
    handleRedirectToAbousUs: () => void;
    handleRedirectToGitHubSponsor: () => void;
}

const FooterContext = React.createContext<FooterContextValue | undefined>(undefined);

interface FooterProviderProps {
    children: React.ReactNode;
}

export function FooterProvider({ children }: FooterProviderProps): React.ReactElement {
    const { data, isLoading, error } = useFooterComponent();
    const { handleRedirectToDocs, handleRedirectToChangelog, handleRedirectToTermsOfService, handleRedirectToPrivacyPolicy, handleRedirectToGitHub, handleRedirectToFAQ, handleContactUs, handleRedirectToGitHubDiscussions, handleRedirectToCreateDrop, handleRedirectToUnlockDrop, handleRedirectToAbousUs, handleRedirectToGitHubSponsor } = useRedirects();

    const contextValue: FooterContextValue = React.useMemo(() => ({
        data,
        isLoading,
        error,
        handleRedirectToDocs,
        handleRedirectToChangelog,
        handleRedirectToTermsOfService,
        handleRedirectToPrivacyPolicy,
        handleRedirectToGitHub,
        handleRedirectToFAQ,
        handleContactUs,
        handleRedirectToGitHubDiscussions,
        handleRedirectToCreateDrop,
        handleRedirectToUnlockDrop,
        handleRedirectToAbousUs,
        handleRedirectToGitHubSponsor
    }), [data, isLoading, error, handleContactUs, handleRedirectToChangelog, handleRedirectToDocs, handleRedirectToFAQ, handleRedirectToGitHub, handleRedirectToGitHubDiscussions, handleRedirectToTermsOfService, handleRedirectToPrivacyPolicy, handleRedirectToCreateDrop, handleRedirectToUnlockDrop, handleRedirectToAbousUs, handleRedirectToGitHubSponsor]);

    return (
        <FooterContext.Provider value={contextValue}>
            {children}
        </FooterContext.Provider>
    );
}

export function useFooter(): FooterContextValue {
    const context = React.useContext(FooterContext);
    if (context === undefined) {
        throw new Error('useFooter must be used within a FooterProvider');
    }
    return context;
}