"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData1, ContentData6, ContentData7, ContentData9, ContentData12, ContentData24, ContentData29 } from "@/types/docs";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { FeaturesSection } from "@/components/custom/docs/FeaturesSection";
import { StepsSection } from "@/components/custom/docs/StepsSection";
import { UseCaseSection } from "@/components/custom/docs/UseCaseSection";
import { BestPracticesSection } from "@/components/custom/docs/BestPracticesSection";
import { MultiDeviceSection } from "@/components/custom/docs/MultiDeviceSection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";
import { CTASection } from "@/components/custom/docs/CTASection";

export const SharingTextContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || currentPage.id !== "sharing-text") {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData1 | ContentData6 | ContentData7 | ContentData9 | ContentData12 | ContentData24 | ContentData29 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "text-features":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <FeaturesSection section={section as DocsSection & { data: ContentData29 }} />
                            </div>
                        );
                    case "sharing-process":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <StepsSection section={section as DocsSection & { data: ContentData7 }} />
                            </div>
                        );
                    case "use-cases":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <UseCaseSection key={section.id} section={section as DocsSection & { data: ContentData6 }} />
                            </div>
                        );
                    case "best-practices":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <BestPracticesSection key={section.id} section={section as DocsSection & { data: ContentData12 }} />
                            </div>
                        );
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData9 }} />
                                <CTASection section={section as DocsSection & { data: ContentData9 }} />
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

SharingTextContainer.displayName = "SharingTextContainer";