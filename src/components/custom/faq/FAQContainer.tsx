"use client";

import React from "react";
import { useFAQ } from "@/contexts/FAQContext";
import { ComponentError } from "@/components/custom/ComponentError";
import { FAQContent } from "@/components/custom/faq/FAQContent";
import { FAQSkeleton } from "@/components/skeleton/FAQSkeleton";

const COMPONENT_ID = "FAQComponent" as const;

export const FAQContainer: React.FC = React.memo(() => {
    const { data, isLoading, error } = useFAQ();

    if (error) return <ComponentError componentId={COMPONENT_ID} />;
    if (isLoading || !data) return <FAQSkeleton />;

    return <FAQContent />;
});

FAQContainer.displayName = "FAQContainer";
