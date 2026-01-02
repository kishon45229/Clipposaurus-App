import React from "react";
import { FAQContainer } from "@/components/custom/faq/FAQContainer";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";

const PAGE_ID = "FAQPage" as const;

/**
 * FAQ PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function FAQPage(): React.ReactElement {
    try {
        return (
            <React.Suspense fallback={<LoadingFallback />}>
                <ComponentDataProvider>
                    <FAQContainer />
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
