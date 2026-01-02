"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData1, ContentData9, ContentData22, ContentData24, ContentData25, ContentData26 } from "@/types/docs.d";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { WhatIsZeroKnowledgeSection } from "@/components/custom/docs/zero-knowledge/WhatIsZeroKnowledgeSection";
import { WhatWeStoreSection } from "@/components/custom/docs/zero-knowledge/WhatWeStoreSection";
import { WhyZeroKnowledgeSection } from "@/components/custom/docs/zero-knowledge/WhyZeroKnowledgeSection";
import { VerificationSection } from "@/components/custom/docs/zero-knowledge/VerificationSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const ZeroKnowledgeContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData1 | ContentData22 | ContentData24 | ContentData25 | ContentData26 };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "what-zero-knowledge-means":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <WhatIsZeroKnowledgeSection section={section as DocsSection & { data: ContentData25 }} />
                            </div>);
                    case "why-zero-knowledge":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <WhyZeroKnowledgeSection section={section as DocsSection & { data: ContentData26 }} />
                            </div>);
                    case "what-we-store":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <WhatWeStoreSection section={section as DocsSection & { data: ContentData22 }} />
                            </div>);
                    case "verification":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <VerificationSection section={section as DocsSection & { data: ContentData24 }} />
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

ZeroKnowledgeContainer.displayName = "ZeroKnowledgeContainer";