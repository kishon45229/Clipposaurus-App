import React from "react";
import { FAQContainer } from "@/components/custom/faq/FAQContainer";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { FAQProvider } from "@/contexts/FAQContext";

const PAGE_ID = "FAQPage" as const;

/**
 * FAQ PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default function FAQPage(): React.ReactElement {
    try {
        return (
            <ComponentDataProvider>
                <React.Suspense fallback={<LoadingFallback />}>
                    <FAQProvider>
                        <section className="xl:min-h-screen max-w-[1920px] mx-auto py-2 sm:py-4">
                            <FAQContainer />
                        </section>
                    </FAQProvider>
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
