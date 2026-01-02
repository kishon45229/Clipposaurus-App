import React from "react";
import { DropPreview } from "@/components/custom/open-drop/DropPreview";
import { DropRouteProtection } from "@/components/custom/DropRouteProtection";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { OpenDropProvider } from "@/contexts/OpenDropContext";

const PAGE_ID = "OpenDropPage" as const;

/**
 * Open drop page
 * @returns React component
 */
export default function OpenDropPage(): React.ReactElement {
  try {
    return (
      <DropRouteProtection>
        <ComponentDataProvider>
          <OpenDropProvider>
            <React.Suspense fallback={<LoadingFallback />}>
              <section className="h-[84dvh] max-w-[1920px] mx-auto py-4 overflow-hidden">
                  <DropPreview />
              </section>
            </React.Suspense>
          </OpenDropProvider>
        </ComponentDataProvider>
      </DropRouteProtection>
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
