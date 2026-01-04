"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { ExpirationDeletionOptionsSection } from "@/components/custom/docs/expiration-deletion/ExpirationDeletionOptionsSection";
import { TTLEnforcementSection } from "@/components/custom/docs/expiration-deletion/TTLEnforcementSection";
import { NoBackupsSection } from "@/components/custom/docs/expiration-deletion/NoBackupsSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const ExpirationDeletionContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "retention-options":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <ExpirationDeletionOptionsSection section={section as DocsPageSection} />
                            </div>);
                    case "ttl-enforcement":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <TTLEnforcementSection section={section as DocsPageSection} />
                            </div>);
                    case "no-backups":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <NoBackupsSection section={section as DocsPageSection} />
                            </div>);
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <CTASection section={section as DocsPageSection} />
                                <PageHelpful />
                            </div>);
                    default:
                        return null;
                }
            })}
        </div>
    );
});

ExpirationDeletionContainer.displayName = "ExpirationDeletionContainer";