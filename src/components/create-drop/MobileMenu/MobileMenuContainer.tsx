"use client";

import { useHeader } from "@/contexts/HeaderContext";
// import { MenuSkeleton } from "@/components/skeleton/MenuSkeleton";
import { MobileMenuContent } from "@/components/create-drop/MobileMenu/MobileMenuContent";
import { ComponentError } from "@/components/common/ComponentError";

const COMPONENT_ID = "MenuContainer" as const;

export const MobileMenuContainer = () => {
    const { data, isLoading, error } = useHeader();

    if (isLoading || !data) return <>Loading...</>;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MobileMenuContent />;
};