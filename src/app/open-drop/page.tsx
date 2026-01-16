import React from "react";
import { DropPreview } from "@/components/open-drop/DropPreview";
import { DropRouteProtection } from "@/components/common/DropRouteProtection";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { OpenDropProvider } from "@/contexts/OpenDropContext";
import { OpenDropDialogBox } from "@/components/open-drop/dialog-box";

const PAGE_ID = "OpenDropPage" as const;

/**
 * Open drop page
 * @returns React component
 */
export default function OpenDropPage(): React.ReactElement {
  try {
    return (
      <DropRouteProtection>
        <OpenDropProvider>
          <React.Suspense fallback={<LoadingFallback />}>
            <section className="h-[90dvh] max-w-7xl mx-auto py-4 overflow-hidden">
              <DropPreview />
              <OpenDropDialogBox />
            </section>
          </React.Suspense>
        </OpenDropProvider>
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
