"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData9, ContentData10, ContentData11, ContentData12, ContentData14 } from "@/types/docs";
import { LocalFirstSection } from "@/components/custom/docs/how-it-works/LocalFirstSection";
import { DropKeySection } from "@/components/custom/docs/how-it-works/DropKeySection";
import { EncryptionSection } from "@/components/custom/docs/how-it-works/EncryptionSection";
import { StorageSection } from "@/components/custom/docs/how-it-works/StorageSection";
import { AccessSection } from "@/components/custom/docs/how-it-works/AccessSection";
import { DeletionSection } from "@/components/custom/docs/how-it-works/DeletionSection";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { CTASection } from "@/components/custom/docs/CTASection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const HowItWorksContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) return null;

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData9 | ContentData10 | ContentData11 | ContentData12 | ContentData14 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "local-first":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <LocalFirstSection section={section as DocsSection & { data: ContentData10 }} />
                            </div>
                        );
                    case "drop-key":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <DropKeySection section={section as DocsSection & { data: ContentData11 }} />
                            </div>
                        );
                    case "encryption":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <EncryptionSection section={section as DocsSection & { data: ContentData12 }} />
                            </div>
                        );
                    case "storage":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <StorageSection section={section as DocsSection & { data: ContentData14 }} />
                            </div>
                        );
                    case "access":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <AccessSection section={section as DocsSection & { data: ContentData14 }} />
                            </div>
                        );
                    case "deletion":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <DeletionSection section={section as DocsSection & { data: { content?: string; highlights?: string[]; note?: string; } }} />
                            </div>
                        );
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData9 }} />
                                <CTASection section={section as DocsSection & { data: ContentData9 }} />
                                <PageHelpful />
                            </div>
                        )
                    default:
                        return null;
                }
            })}
        </div>
    );
});

HowItWorksContainer.displayName = 'HowItWorksContainer';
