"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, Header } from "@/types/docs";

export const DocsPageHeader = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.header) {
        return null;
    }

    const { header } = currentPage as DocsPage;
    const { title, description } = header as Header;

    return (
        <div className="space-y-4">
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-500">
                {title}
            </div>

            <div className="text-sm md:text-base text-zinc-800 dark:text-zinc-400 leading-relaxed">
                {description}
            </div>
        </div>
    );
});

DocsPageHeader.displayName = "DocsPageHeader";