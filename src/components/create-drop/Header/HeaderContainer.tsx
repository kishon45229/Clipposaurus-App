"use client";

import { useHeader } from "@/contexts/HeaderContext";
import { ComponentError } from "@/components/common/ComponentError";
import { HeaderContent } from "@/components/create-drop/Header/HeaderContent";
import { HeaderSkeleton } from "@/components/skeleton/HeaderSkeleton";

const COMPONENT_ID = "HeaderComponent" as const;

export const HeaderContainer = () => {
    const { data, isLoading, error } = useHeader();

    if (isLoading || !data) return <HeaderSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <HeaderContent />
};