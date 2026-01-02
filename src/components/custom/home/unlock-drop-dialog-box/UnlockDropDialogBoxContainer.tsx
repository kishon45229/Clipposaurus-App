"use client";

import React from "react";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";
import { UnlockDropDialogBoxContent } from "@/components/custom/home/unlock-drop-dialog-box/UnlockDropDialogBoxContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "UnlockDropDialogBoxComponent" as const;

/**
 * UnlockDropDialogBoxContainer component
 * Container for the Unlock Drop modal with drop key input
 */
export const UnlockDropDialogBoxContainer = React.memo(() => {
    const { data, isLoading, error } = useUnlockDropDialogBox();

    if (isLoading || !data) return null;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <UnlockDropDialogBoxContent />;
});

UnlockDropDialogBoxContainer.displayName = "UnlockDropDialogBoxContainer";
