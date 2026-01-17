"use client";

import { useFooter } from "@/context/FooterContext"
import { ComponentError } from "@/components/common/ComponentError";
import { FooterContent } from "@/components/footer/FooterContent";
import { FooterSkeleton } from "@/components/skeleton/FooterSkeleton";

const COMPONENT_ID = "FooterComponent" as const;

export const FooterContainer = () => {
    const { data, isLoading, error } = useFooter();

    if (isLoading || !data) return <FooterSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <FooterContent />;
}