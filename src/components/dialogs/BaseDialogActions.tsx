"use client";

import React from "react";
import type { BaseDialogActionsProps } from "./types";
import { DialogButton } from "@/components/dialogs/DialogButton";

export const BaseDialogActions = React.memo<BaseDialogActionsProps>(
    ({ buttons, children }) => {
        if (children) {
            return (
                <div className="flex flex-col items-center mt-[clamp(0.5rem,3vw,1rem)] gap-[clamp(0.25rem,2vw,0.75rem)]">
                    {children}
                </div>
            );
        }

        if (!buttons?.length) return null;

        return (
            <div className="flex flex-col items-center w-3/4 mt-[clamp(0.5rem,3vw,1rem)] gap-[clamp(0.25rem,2vw,0.75rem)]">
                {buttons.map((button, index) => (
                    <DialogButton key={index} {...button} />
                ))}
            </div>
        );
    }
);

BaseDialogActions.displayName = "BaseDialogActions";
