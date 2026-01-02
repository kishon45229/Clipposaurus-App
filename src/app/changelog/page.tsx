import React from "react";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { ChangelogContainer } from "@/components/custom/changelog/ChangelogContainer";
import { ChangelogProvider } from "@/contexts/ChangelogContext";
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
            <ComponentDataProvider>
                <React.Suspense fallback={<LoadingFallback />}>
                    <ChangelogProvider>
                        <section className="xl:min-h-screen max-w-[1920px] mx-auto py-2 sm:py-4">
                            <ChangelogContainer />
                        </section>
                    </ChangelogProvider>
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
