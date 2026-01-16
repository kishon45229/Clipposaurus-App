"use client";

import React from "react";
import { StandardDialog } from "@/components/dialogs";
import type { DialogButtonProps } from "@/components/dialogs/types";
import { useOpenDrop } from "@/contexts/OpenDropContext";
import { OpenDropDialogBoxContent } from "./OpenDropDialogBox.utils";

export const OpenDropDialogBoxContainer = () => {
    const { alertType, handleClose } = useOpenDrop();

    const handleOpenChange = React.useCallback((open: boolean) => {
        if (!open && alertType !== "opening" && alertType !== "decrypting") {
            handleClose();
        }
    }, [alertType, handleClose]);

    const { icon, title, description, btnText } = React.useCallback(() => OpenDropDialogBoxContent(), [alertType])();

    const showButton = alertType !== "opening" && alertType !== "decrypting";
    const buttons: DialogButtonProps[] | undefined = showButton
        ? [{ text: btnText(), onClick: handleClose }]
        : undefined;

    return (
        <StandardDialog
            open={alertType !== "idle"}
            onOpenChange={handleOpenChange}
            icon={icon()}
            title={title()}
            description={description()}
            buttons={buttons}
            showCloseButton={false}
        />
    );
};