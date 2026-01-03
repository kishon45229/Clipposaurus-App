import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { NumberedSteps } from "@/components/custom/docs/encryption/NumberedSteps";

interface LocalDecryptionSectionData {
    flow: {
        title: string;
        items: string[];
    };
};

interface LocalDecryptionSectionProps {
    section: DocsPageSection;
};

export const LocalDecryptionSection = React.memo<LocalDecryptionSectionProps>(({ section }) => {
    if (!section.data || !(typeof section.data === "object")) return null;

    const { flow } = section.data as LocalDecryptionSectionData;

    return (
        <section id={section.id} className="space-y-16">
            <NumberedSteps title={flow.title} items={flow.items} />
        </section>
    );
});

LocalDecryptionSection.displayName = "LocalDecryptionSection";