"use client";

import React from "react";
import { useTermsOfService } from "@/contexts/TermsOfServiceContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { StickyTOC } from "@/components/custom/StickyTOC";
import { TermsOfServiceHeader } from "@/components/custom/terms-of-service/TermsOfServiceHeader";
import { TermsOfServiceSections } from "@/components/custom/terms-of-service/TermsOfServiceSections";

export const TermsOfServiceContent = () => {
    const { data } = useTermsOfService();
    const { sections } = data;

    const sectionIds = React.useMemo(() =>
        sections.map(section => `section-${section.id}`),
        [sections]
    );

    const items = React.useMemo(() =>
        sections.map(section => ({ id: `section-${section.id}`, label: section.title })),
        [sections]
    );

    const activeSection = useScrollSpy(sectionIds, 120);

    return (
        <div className="mx-auto max-w-480px-4 py-2 grid grid-cols-1 lg:grid-cols-[240px_auto] gap-[clamp(2rem,5vw,2.5rem)]">
            {/* Sticky TOC — Desktop only */}
            <StickyTOC title="On this page" items={items} activeSection={activeSection} />

            {/* Main content */}
            <div className="max-w-7xl border-l border-zinc-200 dark:border-zinc-800 pl-6">
                {/* Header */}
                <TermsOfServiceHeader />

                {/* Sections */}
                <TermsOfServiceSections />
            </div>
        </div>
    );
};
