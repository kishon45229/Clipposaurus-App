"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
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

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "local-first":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <LocalFirstSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "drop-key":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <DropKeySection section={section as DocsPageSection} />
                            </div>
                        );
                    case "encryption":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <EncryptionSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "storage":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <StorageSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "access":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <AccessSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "deletion":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <DeletionSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <CTASection section={section as DocsPageSection} />
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
