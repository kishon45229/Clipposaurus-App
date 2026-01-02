"use client";

import React from "react";
import { useTermsOfService } from "@/contexts/TermsOfServiceContext";
import { ComponentError } from "@/components/custom/ComponentError";
import { TermsOfServiceContent } from "@/components/custom/terms-of-service/TermsOfServiceContent";
import { TermsOfServiceSkeleton } from "@/components/skeleton/TermsOfServiceSkeleton";

const COMPONENT_ID = "TermsOfServiceComponent" as const;

export const TermsOfServiceContainer = React.memo(() => {
    const { data, isLoading, error } = useTermsOfService();

    if (isLoading || !data) return <TermsOfServiceSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <TermsOfServiceContent />;
});

TermsOfServiceContainer.displayName = "TermsOfServiceContainer";