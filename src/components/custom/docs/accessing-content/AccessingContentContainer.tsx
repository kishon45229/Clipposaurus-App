"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData1, ContentData6, ContentData7, ContentData9, ContentData12, ContentData24, ContentData29 } from "@/types/docs";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { FeaturesSection } from "@/components/custom/docs/FeaturesSection";
import { StepsSection } from "@/components/custom/docs/StepsSection";
import { UseCaseSection } from "@/components/custom/docs/UseCaseSection";
import { BestPracticesSection } from "@/components/custom/docs/BestPracticesSection";
import { SupportedFileTypesSection } from "@/components/custom/docs/sharing-files/SupportedFileTypesSection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";
import { CTASection } from "@/components/custom/docs/CTASection";


export const AccessingContentContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || currentPage.id !== "accessing-content") {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData1 | ContentData6 | ContentData7 | ContentData9 | ContentData12 | ContentData24 | ContentData29 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "access-features":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <FeaturesSection section={section as DocsSection & { data: ContentData29 }} />
                            </div>
                        );
                    case "access-process":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <StepsSection section={section as DocsSection & { data: ContentData7 }} />
                            </div>
                        );
                    case "access-scenarios":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <UseCaseSection key={section.id} section={section as DocsSection & { data: ContentData6 }} />
                            </div>
                        );
                    case "access-tips":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <BestPracticesSection key={section.id} section={section as DocsSection & { data: ContentData12 }} />
                            </div>
                        ); 
                    // case "comparison":
                    //     return <SupportedContentSection key={section.id} section={section} />;
                    // case "platform":
                    //     return <MultiDeviceAccessSection key={section.id} section={section} />;
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

AccessingContentContainer.displayName = "AccessingContentContainer";