"use client";

import React from "react";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import type { BaseDialogProps } from "./types";

export const BaseDialogContainer: React.FC<BaseDialogProps> = React.memo(({
    open,
    onOpenChange,
    children,
}) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
            {children}
        </ResponsiveDialog>
    );
});

BaseDialogContainer.displayName = "BaseDialogContainer";