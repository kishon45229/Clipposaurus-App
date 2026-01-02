import React from "react";
import { DocsContainer } from "@/components/custom/docs/DocsContainer";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";

const PAGE_ID = "DocsPage" as const;

/**
 * DOCS PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function DocsPage(): React.ReactElement {
    try {
        return (
            <React.Suspense fallback={<LoadingFallback />}>
                <ComponentDataProvider>
                    <DocsContainer />
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
