"use client";

import React from "react";
import { useMenu } from "@/contexts/MenuContext";
import { MenuSkeleton } from "@/components/skeleton/MenuSkeleton";
import { MobileMenuContent } from "@/components/custom/create-drop/MobileMenu/MobileMenuContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "MenuContainer" as const;

export const MobileMenuContainer: React.FC = React.memo(() => {
    const { data, isLoading, error } = useMenu();

    if (isLoading || !data) return <MenuSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MobileMenuContent />;
});

MobileMenuContainer.displayName = "MobileMenuContainer";