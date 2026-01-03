"use client";

import React from "react";
import { StandardDialog } from "@/components/custom/dialogs";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import {
    getActiveIcon,
    getTitle,
    getDescription,
    getButtonText,
} from "./DialogBox.utils";

export const DialogBoxContainer = React.memo(() => {
    const { dropKeyVerificationRequestStatus, createDropRequestStatus, handleDialogClose, handleDropKeyVerificationSuccess } = useDropOptions();

    const handleOpenChange = React.useCallback((open: boolean) => {
        if (!open && dropKeyVerificationRequestStatus !== "verifying") {
            handleDialogClose();
        }
    }, [dropKeyVerificationRequestStatus, handleDialogClose]);

    const icon = React.useMemo(() =>
        getActiveIcon(dropKeyVerificationRequestStatus, createDropRequestStatus),
        [dropKeyVerificationRequestStatus, createDropRequestStatus]
    );

    const title = React.useMemo(() =>
        getTitle(dropKeyVerificationRequestStatus, createDropRequestStatus),
        [dropKeyVerificationRequestStatus, createDropRequestStatus]
    );

    const description = React.useMemo(() =>
        getDescription(dropKeyVerificationRequestStatus, createDropRequestStatus),
        [dropKeyVerificationRequestStatus, createDropRequestStatus]
    );

    const buttonText = React.useMemo(() =>
        getButtonText(dropKeyVerificationRequestStatus, createDropRequestStatus),
        [dropKeyVerificationRequestStatus, createDropRequestStatus]
    );

    const showButton = dropKeyVerificationRequestStatus !== "verifying" && createDropRequestStatus !== "redirecting";
    const showCloseButton = showButton;

    const onClick = dropKeyVerificationRequestStatus === "success" ? handleDropKeyVerificationSuccess : handleDialogClose;

    const buttons = showButton ? [{
        text: buttonText,
        onClick: onClick,
        autoFocus: true,
        className: "rounded-lg"
    }] : undefined;

    return (
        <StandardDialog
            open={dropKeyVerificationRequestStatus !== "idle" || createDropRequestStatus === "rateLimited"}
            onOpenChange={handleOpenChange}
            icon={icon}
            title={title}
            description={description}
            buttons={buttons}
            showCloseButton={showCloseButton}
        />
    );
});

DialogBoxContainer.displayName = "DialogBoxContainer";