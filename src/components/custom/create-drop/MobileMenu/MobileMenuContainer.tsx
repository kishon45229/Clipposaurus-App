"use client";

import { useMenu } from "@/contexts/MenuContext";
// import { MenuSkeleton } from "@/components/skeleton/MenuSkeleton";
import { MobileMenuContent } from "@/components/custom/create-drop/MobileMenu/MobileMenuContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "MenuContainer" as const;

export const MobileMenuContainer = () => {
    const { data, isLoading, error } = useMenu();

    if (isLoading || !data) return <>Loading...</>;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MobileMenuContent />;
};