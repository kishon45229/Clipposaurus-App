"use client";

import { useUnlockDrop } from "@/contexts/UnlockDropContext";
import { UnlockDropContent } from "@/components/custom/unlock-drop/form/UnlockDropContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "UnlockDropComponent" as const;

export const UnlockDropContainer = () => {
    const { data, isLoading, error } = useUnlockDrop();

    if (isLoading || !data) return null;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <UnlockDropContent />;
};

