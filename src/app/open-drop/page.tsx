import React from "react";
import { Drop } from "@/components/open-drop";
import { DropRouteProtection } from "@/components/common/DropRouteProtection";
import LoadingFallback from "@/app/loading";
import { OpenDropProvider } from "@/contexts/OpenDropContext";
import { OpenDropDialogBox } from "@/components/open-drop/dialog-box";

/**
 * Open drop page
 * @returns React component
 */
export default function OpenDropPage(): React.ReactElement {
  return (
    <DropRouteProtection>
      <OpenDropProvider>
        <React.Suspense fallback={<LoadingFallback />}>
          <section className="h-[90dvh] max-w-7xl mx-auto py-4 overflow-hidden">
            <Drop />
            <OpenDropDialogBox />
          </section>
        </React.Suspense>
      </OpenDropProvider>
    </DropRouteProtection>
  );
}
