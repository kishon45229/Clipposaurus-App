"use client";

import React from "react";
import { BaseDialogContainer } from "@/components/custom/dialogs/BaseDialogContainer";
import { BaseDialogContent } from "@/components/custom/dialogs/BaseDialogContent";
import { BaseDialogBody } from "@/components/custom/dialogs/BaseDialogBody";
import { BaseDialogActions } from "@/components/custom/dialogs/BaseDialogActions";
import type { StandardDialogProps } from "./types";

export const StandardDialog: React.FC<StandardDialogProps> = React.memo(({
    open,
    onOpenChange,
    icon,
    title,
    description,
    buttons,
    showCloseButton,
    customContent,
}) => {
    return (
        <BaseDialogContainer open={open} onOpenChange={onOpenChange}>
            <BaseDialogContent showCloseButton={showCloseButton}>
                <BaseDialogBody icon={icon} title={title} description={description}>
                    {customContent}
                    <BaseDialogActions buttons={buttons} />
                </BaseDialogBody>
            </BaseDialogContent>
        </BaseDialogContainer>
    );
});

StandardDialog.displayName = "StandardDialog";