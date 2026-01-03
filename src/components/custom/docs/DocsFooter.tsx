"use client";

import React from "react";
import type { DocsPageFooter } from "@/types/contentData-types/docs-types";
import { useDocs } from "@/contexts/DocsContext";
import { Button } from "@/components/ui/button";

export const DocsFooter = React.memo(() => {
  const { data, currentPage, navigateToNext, navigateToPrevious } = useDocs();

  if (!data || !currentPage || !currentPage.footer) {
    return null;
  }

  const { nextPage, previousPage } = currentPage.footer as DocsPageFooter;

  const currentIndex = data.pages.findIndex(page => page.id === currentPage.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < data.pages.length - 1;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between p-6 sm:p-16 border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="flex-1">
        {hasPrevious && previousPage && (
          <Button
            variant="outline"
            onClick={navigateToPrevious}
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base font-medium rounded-lg hover:scale-[1.015] transition-transform"
          >
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div>{previousPage.title}</div>
            </div>
          </Button>
        )}
      </div>

      {/* Next */}
      <div className="flex-1 sm:text-right">
        {hasNext && nextPage && (
          <Button
            variant="outline"
            onClick={navigateToNext}
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base font-medium rounded-lg hover:scale-[1.015] transition-transform">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div>{nextPage.title}</div>
            </div>
          </Button>
        )}
      </div>
    </div>
  );




});

DocsFooter.displayName = "DocsFooter";
