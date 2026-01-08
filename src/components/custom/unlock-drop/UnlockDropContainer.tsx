"use client";

import React from "react";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";
import { UnlockDropContent } from "./UnlockDropContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "UnlockDropComponent" as const;

/**
 * UnlockDropContainer component
 * Main container for the unlock drop page
 */
export const UnlockDropContainer = React.memo(() => {
    const { data, isLoading, error } = useUnlockDropDialogBox();

    if (isLoading || !data) return null;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <UnlockDropContent />;
});

UnlockDropContainer.displayName = "UnlockDropContainer";
