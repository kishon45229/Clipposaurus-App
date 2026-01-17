"use client";

import { useMenu } from "@/contexts/MenuContext";
import { MobileMenuContent } from "@/components/create-drop/mobile-menu/MobileMenuContent";
import { ComponentError } from "@/components/common/ComponentError";

const COMPONENT_ID = "MenuComponent" as const;

export const MobileMenuContainer = () => {
    const { data, isLoading, error } = useMenu();

    if (isLoading || !data) return null;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MobileMenuContent />;
};