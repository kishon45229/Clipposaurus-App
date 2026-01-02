"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData1, ContentData9, ContentData14, ContentData25, ContentData28 } from "@/types/docs.d";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { ExpirationDeletionOptionsSection } from "@/components/custom/docs/expiration-deletion/ExpirationDeletionOptionsSection";
import { TTLEnforcementSection } from "@/components/custom/docs/expiration-deletion/TTLEnforcementSection";
import { NoBackupsSection } from "@/components/custom/docs/expiration-deletion/NoBackupsSection";
import { IrreversibleSection } from "@/components/custom/docs/expiration-deletion/IrreversibleSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const ExpirationDeletionContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData1 | ContentData14 | ContentData25 | ContentData28 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "retention-options":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <ExpirationDeletionOptionsSection section={section as DocsSection & { data: ContentData28 }} />
                            </div>);
                    case "ttl-enforcement":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <TTLEnforcementSection section={section as DocsSection & { data: ContentData28 }} />
                            </div>);
                    case "no-backups":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <NoBackupsSection section={section as DocsSection & { data: ContentData25 }} />
                            </div>);
                    case "irreversible":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <IrreversibleSection section={section as DocsSection & { data: ContentData28 }} />
                            </div>);
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData9 }} />
                                <CTASection section={section as DocsSection & { data: ContentData9 }} />
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