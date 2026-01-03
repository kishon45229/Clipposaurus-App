"use client";

import React from "react";
import { useMenu } from "@/contexts/MenuContext";
import { MenuSkeleton } from "@/components/skeleton/MenuSkeleton";
import { MenuContent } from "@/components/custom/create-drop/Menu/MenuContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "MenuContainer" as const;

export const MenuContainer = () => {
    const { data, isLoading, error } = useMenu();

    if (isLoading || !data) return <MenuSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MenuContent />;
};