"use client";

import { useMenu } from "@/contexts/MenuContext";
import { MenuSkeleton } from "@/components/skeleton/MenuSkeleton";
import { MobileMenuContent } from "@/components/create-drop/MobileMenu/MobileMenuContent";
import { ComponentError } from "@/components/common/ComponentError";

const COMPONENT_ID = "MenuComponent" as const;

export const MobileMenuContainer = () => {
    const { data, isLoading, error } = useMenu();

    if (isLoading || !data) return <MenuSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MobileMenuContent />;
};