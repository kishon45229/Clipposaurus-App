import React from "react";
import { ChangelogContainer } from "@/components/custom/changelog/ChangelogContainer";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";

const PAGE_ID = "ChangelogPage" as const;

/**
 * CHANGELOG PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function ChangelogPage(): React.ReactElement {
    try {
        return (
            <React.Suspense fallback={<LoadingFallback />}>
                <ComponentDataProvider>
                    <ChangelogContainer />
                </ComponentDataProvider>
            </React.Suspense>
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
