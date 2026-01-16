"use client";

import React from "react";
import { useNavbarComponent } from "@/contexts/ComponentDataContext";
import { useRedirects } from "@/hooks/useRedirect";
import type { NavbarComponent } from "@/components/navbar/navbar.types";

export interface NavbarContextValue {
    data: NavbarComponent;
    isLoading: boolean;
    error: Error | null;

    handleRedirectToDocs: () => void;
    handleRedirectToChangelog: () => void;
    handleRedirectToTermsOfService: () => void;
    handleRedirectToGitHub: () => void;
    handleRedirectToFAQ: () => void;
    handleContactUs: () => void;
    handleRedirectToGitHubIssues: () => void;
    handleRedirectToGitHubDiscussions: () => void;
}

const NavbarContext = React.createContext<NavbarContextValue | undefined>(undefined);

interface NavbarProviderProps {
    children: React.ReactNode;
}

export function NavbarProvider({ children }: NavbarProviderProps): React.ReactElement {
    const { data, isLoading, error } = useNavbarComponent();
    const { handleRedirectToDocs, handleRedirectToChangelog, handleRedirectToTermsOfService, handleRedirectToGitHub, handleRedirectToFAQ, handleContactUs, handleRedirectToGitHubIssues, handleRedirectToGitHubDiscussions } = useRedirects();

    const contextValue: NavbarContextValue = React.useMemo(() => ({
        data,
        isLoading,
        error,
        handleRedirectToDocs,
        handleRedirectToChangelog,
        handleRedirectToTermsOfService,
        handleRedirectToGitHub,
        handleRedirectToFAQ,
        handleContactUs,
        handleRedirectToGitHubIssues,
        handleRedirectToGitHubDiscussions,
    }), [data, isLoading, error, handleContactUs, handleRedirectToChangelog, handleRedirectToDocs, handleRedirectToFAQ, handleRedirectToGitHub, handleRedirectToGitHubDiscussions, handleRedirectToGitHubIssues, handleRedirectToTermsOfService]);

    return (
        <NavbarContext.Provider value={contextValue}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar(): NavbarContextValue {
    const context = React.useContext(NavbarContext);
    if (context === undefined) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
}