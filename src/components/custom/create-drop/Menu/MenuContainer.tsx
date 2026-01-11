"use client";

import React from "react";
import { useHeader } from "@/contexts/HeaderContext";
// import { MenuSkeleton } from "@/components/custom/";
import { MenuContent } from "@/components/custom/create-drop/Menu/MenuContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "MenuContainer" as const;

export const MenuContainer = () => {
    const { data, isLoading, error } = useHeader();

    if (isLoading || !data) return <>Loading..</>;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <MenuContent />;
};