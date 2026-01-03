"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
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

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (
        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "what-zero-knowledge-means":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <WhatIsZeroKnowledgeSection section={section as DocsPageSection} />
                            </div>);
                    case "why-zero-knowledge":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <WhyZeroKnowledgeSection section={section as DocsPageSection} />
                            </div>);
                    case "what-we-store":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <WhatWeStoreSection section={section as DocsPageSection} />
                            </div>);
                    case "verification":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <VerificationSection section={section as DocsPageSection} />
                            </div>);
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <CTASection section={section as DocsPageSection} />
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