"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData7, ContentData8, ContentData9 } from "@/types/docs";
import { StepsSection } from "@/components/custom/docs/StepsSection";
import { ProTipsSection } from "@/components/custom/docs/quick-start/ProTipsSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const QuickStartContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData7 | ContentData8 | ContentData9 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.type) {
                    case "sharing":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection} />
                                <StepsSection section={section as DocsSection & { data: ContentData7 }} />
                            </div>
                        )
                    case "accessing":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection} />
                                <StepsSection section={section as DocsSection & { data: ContentData7 }} />
                            </div>
                        )
                    case "tips":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection} />
                                <ProTipsSection section={section as DocsSection & { data: ContentData8 }} />
                            </div>
                        )
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

QuickStartContainer.displayName = "QuickStartContainer";