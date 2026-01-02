"use client";

import React from "react";
import { useChangelog } from "@/contexts/ChangelogContext";
import { ComponentError } from "@/components/custom/ComponentError";
import { ChangelogSkeleton } from "@/components/skeleton/ChangelogSkeleton";
import { ChangelogContent } from "@/components/custom/changelog/ChangelogContent";

const COMPONENT_ID = "ChangelogComponent" as const;

export const ChangelogContainer: React.FC = () => {
    const { data, isLoading, error } = useChangelog();

    if (error) return <ComponentError componentId={COMPONENT_ID} />;
    if (isLoading || !data) return <ChangelogSkeleton />;

    return <ChangelogContent />;
};
