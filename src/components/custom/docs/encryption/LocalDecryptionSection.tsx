import React from "react";
import type { DocsSection, ContentData20 } from "@/types/docs";
import { NumberedSteps } from "./NumberedSteps";

interface LocalEncryptionSectionProps {
    section: DocsSection & { data: ContentData20 };
}

export const LocalDecryptionSection = React.memo<LocalEncryptionSectionProps>(({ section }) => {
    const data = section.data as ContentData20;
    if (!data) return null;

    const { flow } = data;

    return (
        <section id={section.id} className="space-y-16">
            <NumberedSteps title={flow.title} items={flow.items} />
        </section>
    );
});

LocalDecryptionSection.displayName = "LocalDecryptionSection";