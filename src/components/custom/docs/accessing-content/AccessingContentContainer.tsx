"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { FeaturesSection } from "@/components/custom/docs/FeaturesSection";
import { StepsSection } from "@/components/custom/docs/StepsSection";
import { UseCaseSection } from "@/components/custom/docs/UseCaseSection";
import { BestPracticesSection } from "@/components/custom/docs/BestPracticesSection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";
import { CTASection } from "@/components/custom/docs/CTASection";


export const AccessingContentContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || currentPage.id !== "accessing-content") {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "access-features":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <FeaturesSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "access-process":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <StepsSection section={section as DocsPageSection} />
                            </div>
                        );
                    case "access-scenarios":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <UseCaseSection key={section.id} section={section as DocsPageSection} />
                            </div>
                        );
                    case "access-tips":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <BestPracticesSection key={section.id} section={section as DocsPageSection} />
                            </div>
                        );
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <CTASection section={section as DocsPageSection} />
                                <PageHelpful />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
});

AccessingContentContainer.displayName = "AccessingContentContainer";