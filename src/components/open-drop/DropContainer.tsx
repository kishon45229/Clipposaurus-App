"use client";

import { useOpenDrop } from "@/contexts/OpenDropContext";
import { useDropPreview } from "@/contexts/ComponentDataContext";
import { DropContent } from "@/components/open-drop/DropContent";
import { ComponentError } from "@/components/common/ComponentError"
import { DropPreviewSkeleton } from "@/components/skeleton/DropPreviewSkeleton";

const COMPONENT_ID = "DropPreviewComponent" as const;

export const DropContainer = () => {
    const { data, isLoading, error } = useDropPreview();
    const { decryptedDrop } = useOpenDrop();

    if (isLoading || !data) return <div><DropPreviewSkeleton /></div>;
    if (!decryptedDrop || error) return <ComponentError componentId={COMPONENT_ID} />;

    return <DropContent />;
};
