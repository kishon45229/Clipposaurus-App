"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import { DocsContentSkeleton } from "@/components/skeleton/DocsContentSkeleton";
import { ComponentError } from "@/components/custom/ComponentError";
import { Introduction } from "@/components/custom/docs/introduction";
import { HowItWorks } from "@/components/custom/docs/how-it-works";
import { QuickStart } from "@/components/custom/docs/quick-start";
import { SharingText } from "@/components/custom/docs/sharing-text";
import { SharingCode } from "@/components/custom/docs/sharing-code";
import { SharingFiles } from "@/components/custom/docs/sharing-files";
import { AccessingContent } from "./accessing-content";
import { EncryptionContainer } from "./encryption/EncryptionContainer";
import { DocsHeader } from "@/components/custom/docs/DocsHeader";
import { DocsFooter } from "@/components/custom/docs/DocsFooter";
import { DropKeySystem } from "./drop-key-system";
import { ZeroKnowledge } from "./zero-knowledge";
import { ExpirationDeletion } from "./expiration-deletion";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const DocsContent = () => {
    const {
        data,
        currentPage,
        isLoading,
        error,
    } = useDocs();

    if (isLoading || !data) return <DocsContentSkeleton />;
    if (error || !data || !currentPage) return <ComponentError componentId="DocsContent" />;

    return (
        <div
            id="docs-content-scroll"
            className="flex flex-col gap-8 h-full overflow-y-auto mx-auto w-full px-3 py-4 lg:px-4 lg:py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
            {/* Mobile Menu Button */}
            <div className="fixed bottom-4 right-4 z-50 lg:hidden">
                <SidebarTrigger className="shadow-lg bg-primary text-primary-foreground hover:bg-primary/90" />
            </div>
            <div>
                <DocsHeader />
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none leading-relaxed text-lg">
                {currentPage.id === "introduction" ? (
                    <Introduction />
                ) : currentPage.id === "quick-start" ? (
                    <QuickStart />
                ) : currentPage.id === "how-it-works" ? (
                    <HowItWorks />
                ) : currentPage.id === "drop-key-system" ? (
                    <DropKeySystem />
                ) : currentPage.id === "encryption-and-decryption" ? (
                    <EncryptionContainer />
                ) : currentPage.id === "zero-knowledge-architecture" ? (
                    <ZeroKnowledge />
                ) : currentPage.id === "expiration-and-deletion" ? (
                    <ExpirationDeletion />
                ) : currentPage.id === "sharing-text" ? (
                    <SharingText />
                ) : currentPage.id === "sharing-code" ? (
                    <SharingCode />
                ) : currentPage.id === "sharing-files" ? (
                    <SharingFiles />
                ) : currentPage.id === "accessing-content" ? (
                    <AccessingContent />
                ) : null}
            </div>
            <div>
                <DocsFooter />
            </div>
        </div>
    );
};
