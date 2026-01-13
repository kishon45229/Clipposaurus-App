"use client";

import React from "react";
import { BaseDialogContainer } from "@/components/dialogs/BaseDialogContainer";
import { BaseDialogContent } from "@/components/dialogs/BaseDialogContent";
import { BaseDialogBody } from "@/components/dialogs/BaseDialogBody";
import { BaseDialogActions } from "@/components/dialogs/BaseDialogActions";
import type { StandardDialogProps } from "./types";

export const StandardDialog = React.memo<StandardDialogProps>(({
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