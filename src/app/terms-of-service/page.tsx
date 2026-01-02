import React from 'react';
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { TermsOfServiceProvider } from "@/contexts/TermsOfServiceContext";
import { TermsAndConditions } from "@/components/custom/terms-of-service";

const PAGE_ID = "TermsOfServicePage" as const;

/**
 * TERMS OF SERVICE PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default async function TermsOfServicePage(): Promise<React.ReactElement> {
    try {
        return (
            <ComponentDataProvider>
                <React.Suspense fallback={<LoadingFallback />}>
                    <TermsOfServiceProvider>
                        <section className="xl:min-h-screen max-w-7xl mx-auto py-2 sm:py-4">
                            <TermsAndConditions />
                        </section>
                    </TermsOfServiceProvider>
                </React.Suspense>
            </ComponentDataProvider>
        );
    } catch (error) {
        return (
            <ErrorFallback
                error={error instanceof Error ? error : new Error(`An unexpected error occurred while loading the ${PAGE_ID}`)}
                reset={() => window?.location.reload()}
            />
        );
    }
}