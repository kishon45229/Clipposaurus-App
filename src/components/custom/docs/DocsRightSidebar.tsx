"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import { cn } from "@/lib/utils";
import { DocsRightSidebarSkeleton } from "@/components/skeleton/DocsRightSidebarSkeleton";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export const DocsRightSidebar: React.FC = () => {
    const { currentPage, isLoading, error, headings, scrollToHeading } = useDocs();

    // Create heading IDs for scroll spy
    const headingIds = React.useMemo(() =>
        headings?.map(heading => heading.id) || [],
        [headings]
    );

    const activeSection = useScrollSpy(headingIds, 150, "docs-content-scroll");

    if (isLoading || error || !currentPage) {
        return <DocsRightSidebarSkeleton />;
    }

    if (!headings || headings.length === 0) {
        return null;
    }

    return (
        <>
            {/* Right Sidebar for Desktop */}
            <div className="hidden w-64 shrink-0 h-full border-l border-border bg-background/95 backdrop-blur lg:flex lg:flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                    <h3 className="font-semibold text-sm text-foreground">
                        On This Page
                    </h3>
                </div>

                {/* Table of Contents */}
                <nav className="flex-1 overflow-y-auto p-4 overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="space-y-1">
                        {headings.map((heading) => {
                            const isActive = activeSection === heading.id;
                            const paddingLeft = (heading.level - 1) * 12;

                            return (
                                <button
                                    key={heading.id}
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={cn(
                                        "block w-full text-left text-sm py-1 px-2 rounded transition-colors hover:bg-muted/50",
                                        "border-l-2 transition-colors",
                                        isActive
                                            ? "border-primary text-primary font-medium bg-primary/5"
                                            : "border-transparent text-muted-foreground hover:text-foreground"
                                    )}
                                    style={{ paddingLeft: `${paddingLeft + 8}px` }}
                                >
                                    {heading.title}
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </>
    );
};