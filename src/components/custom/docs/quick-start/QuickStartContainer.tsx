"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
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

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.type) {
                    case "sharing":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <StepsSection section={section as DocsPageSection} />
                            </div>
                        )
                    case "accessing":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <StepsSection section={section as DocsPageSection} />
                            </div>
                        )
                    case "tips":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <ProTipsSection section={section as DocsPageSection} />
                            </div>
                        )
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

QuickStartContainer.displayName = "QuickStartContainer";