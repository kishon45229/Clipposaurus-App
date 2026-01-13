"use client";

import React from "react";
import { StandardDialog } from "@/components/dialogs";
import {
    XCircle,
    AlertCircle,
    ShieldBan,
    LoaderCircle,
    WifiOff,
    Key,
    FileX,
    ServerCrash,
    Clock,
} from "lucide-react";
import { useOpenDrop } from "@/contexts/OpenDropContext";

function OpenDropAlert() {
    const { alertType, handleClose } = useOpenDrop();

    const handleOpenChange = React.useCallback((open: boolean) => {
        if (!open && alertType !== "opening" || alertType === "idle") {
            handleClose();
        }
    }, [alertType, handleClose]);

    // ICON SET
    const icon = React.useMemo(() => {
        switch (alertType) {
            case "common-error":
                return <XCircle className="w-12 h-12 drop-shadow-sm text-red-500" />;
            case "invalidKey":
                return <Key className="w-12 h-12 drop-shadow-sm text-amber-500" />;
            case "networkError":
                return <WifiOff className="w-12 h-12 drop-shadow-sm text-orange-500" />;
            case "serverError":
                return <ServerCrash className="w-12 h-12 drop-shadow-sm text-red-500" />;
            case "not-found":
                return <FileX className="w-12 h-12 drop-shadow-sm text-gray-500" />;
            case "expired":
                return <Clock className="w-12 h-12 drop-shadow-sm text-purple-500" />;
            case "rateLimited":
                return <ShieldBan className="w-12 h-12 drop-shadow-sm text-red-500" />;
            case "decryptionFailed":
            case "decryption-error":
                return <AlertCircle className="w-12 h-12 drop-shadow-sm text-amber-500" />;
            case "deleteOnAccess":
            case "drop-deleted-on-access":
                return <XCircle className="w-12 h-12 drop-shadow-sm text-red-500" />;
            case "opening":
            case "decrypting":
                return <LoaderCircle className="animate-spin w-12 h-12 drop-shadow-sm text-blue-500" />;
            case "copy-error":
            case "download-error":
                return <AlertCircle className="w-12 h-12 drop-shadow-sm text-red-500" />;
            default:
                return <AlertCircle className="w-12 h-12 drop-shadow-sm text-gray-500" />;
        }
    }, [alertType]);

    // TITLES
    const title = React.useMemo(() => {
        switch (alertType) {
            case "common-error":
                return "Something Went Wrong";
            case "invalidKey":
                return "Invalid Drop Key";
            case "networkError":
                return "Connection Problem";
            case "serverError":
                return "Server Error";
            case "not-found":
                return "Drop Not Found";
            case "expired":
                return "Drop Expired";
            case "rateLimited":
                return "Too Many Requests";
            case "decryptionFailed":
            case "decryption-error":
                return "Decryption Failed";
            case "deleteOnAccess":
            case "drop-deleted-on-access":
                return "Drop Deleted After Access";
            case "opening":
                return "Loading Drop...";
            case "decrypting":
                return "Decrypting Content...";
            case "copy-error":
                return "Copy Error";
            case "download-error":
                return "Download Error";
            default:
                return "Unexpected Error";
        }
    }, [alertType]);

    // DESCRIPTIONS
    const description = React.useMemo(() => {
        switch (alertType) {
            case "common-error":
                return "We encountered an unexpected error while trying to open your Drop. Please try again in a moment.";
            case "invalidKey":
                return "The Drop Key you entered appears to be invalid or incomplete. Please double-check and try again.";
            case "networkError":
                return "Unable to connect to our servers. Please check your internet connection and try again.";
            case "serverError":
                return "Our servers are experiencing issues. Please wait a moment and try again.";
            case "not-found":
                return "The Drop you're looking for doesn't exist or may have been deleted. Please verify your Drop Key.";
            case "expired":
                return "This Drop has expired and is no longer available. Drops are automatically deleted based on their retention settings.";
            case "rateLimited":
                return "You've made too many requests recently. Please wait a moment before trying again.";
            case "decryptionFailed":
            case "decryption-error":
                return "Unable to decrypt the Drop content. This usually means the Drop Key is incorrect or the data is corrupted.";
            case "deleteOnAccess":
            case "drop-deleted-on-access":
                return "You have accessed a Drop that deletes upon access. So, this drop already deleted itself from our servers. Please make sure to copy or download any important files before leaving this page.";
            case "opening":
                return "We're fetching and decrypting your Drop content. This should only take a moment...";
            case "decrypting":
                return "Decrypting your Drop content. Please wait...";
            case "copy-error":
                return "There was an error copying the content. Please try again.";
            case "download-error":
                return "There was an error downloading the file. Please try again.";
            default:
                return "An unexpected error occurred. Please try again or contact support if the problem persists.";
        }
    }, [alertType]);

    // BUTTON LABELS
    const buttonLabel = React.useMemo(() => {
        switch (alertType) {
            case "common-error":
                return "Try Again";
            case "invalidKey":
                return "Check Drop Key";
            case "networkError":
                return "Retry Connection";
            case "serverError":
                return "Try Again Later";
            case "not-found":
                return "Verify Drop Key";
            case "expired":
                return "Understood";
            case "rateLimited":
                return "Wait and Retry";
            case "decryptionFailed":
            case "decryption-error":
                return "Check Drop Key";
            case "deleteOnAccess":
            case "drop-deleted-on-access":
                return "Okay, Got It";
            case "copy-error":
                return "Try Again";
            case "download-error":
                return "Try Again";
            default:
                return "Okay";
        }
    }, [alertType]);

    const showButton = alertType !== "opening" && alertType !== "decrypting";
    const buttons = showButton ? [{
        text: buttonLabel,
        onClick: () => {
            handleClose();
        },
        className: "rounded-lg mt-6"
    }] : undefined;

    return (
        <StandardDialog
            open={alertType !== "idle"}
            onOpenChange={handleOpenChange}
            icon={icon}
            title={title}
            description={description}
            buttons={buttons}
            showCloseButton={false}
        />
    );
}

const MemoizedOpenDropAlert = React.memo(OpenDropAlert);
MemoizedOpenDropAlert.displayName = "OpenDropAlert";

export { MemoizedOpenDropAlert as OpenDropAlert };