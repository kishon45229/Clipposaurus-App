"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData9 } from "@/types/docs";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { KeySectionTemplate } from "@/components/custom/docs/drop-key-system/KeySectionTemplate";
import { CompleteKeySection } from "@/components/custom/docs/drop-key-system/CompleteKeySection";
import { SharingGuidelinesSection } from "@/components/custom/docs/drop-key-system/SharingGuidelinesSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const DropKeySystemContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) return null;
    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData9 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "identifier":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <KeySectionTemplate section={section} activeSection="identifier" />
                            </div>
                        );
                    case "system-secret":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <KeySectionTemplate section={section} activeSection="system-secret" />
                            </div>
                        );
                    case "user-secret":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <KeySectionTemplate section={section} activeSection="user-secret" />
                            </div>
                        );
                    case "combined-key":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <CompleteKeySection section={section} />
                            </div>
                        );
                    case "sharing-guidelines":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section} />
                                <SharingGuidelinesSection section={section} />
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

DropKeySystemContainer.displayName = 'DropKeySystemContainer';