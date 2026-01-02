import React from "react";
import { CircleCheck, LoaderCircle, XCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import type { DropKeyVerificationRequestStatus, CreateDropRequestStatus } from "@/types";

export const getIconForStatus = (status: DropKeyVerificationRequestStatus | CreateDropRequestStatus): React.ReactElement => {
    switch (status) {
        case "success":
            return <CircleCheck className="w-12 h-12 drop-shadow-sm" />;
        case "error":
            return <XCircle className="w-12 h-12 drop-shadow-sm" />;
        case "decryptionError":
            return <XCircle className="w-12 h-12 drop-shadow-sm" />;
        case "notfound":
            return <AlertTriangle className="w-12 h-12 drop-shadow-sm" />;
        case "rateLimited":
            return <ShieldAlert className="w-12 h-12 drop-shadow-sm" />;
        case "incomplete":
            return <AlertTriangle className="w-12 h-12 drop-shadow-sm" />;
        default:
            return <LoaderCircle className="animate-spin w-12 h-12 drop-shadow-sm" />;
    }
};

export const getActiveIcon = (
    dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus,
    createDropRequestStatus: CreateDropRequestStatus
): React.ReactElement => {
    const statusPriority: (DropKeyVerificationRequestStatus | CreateDropRequestStatus)[] = [
        "error",
        "decryptionError",
        "rateLimited",
        "notfound",
        "incomplete",
        "success",
        "verifying",
        "redirecting",
        "idle"
    ];

    const activeStatuses = [dropKeyVerificationRequestStatus, createDropRequestStatus];

    for (const priorityStatus of statusPriority) {
        const activeStatus = activeStatuses.find(status => status === priorityStatus);
        if (activeStatus) {
            return getIconForStatus(activeStatus);
        }
    }

    return <LoaderCircle className="animate-spin w-12 h-12 drop-shadow-sm" />;
};

export const getTitle = (
    dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus,
    createDropRequestStatus: CreateDropRequestStatus
): string => {
    if (dropKeyVerificationRequestStatus === "success") return "Your Drop is Ready!";
    if (dropKeyVerificationRequestStatus === "error" || createDropRequestStatus === "error") return "Something Went Wrong";
    if (dropKeyVerificationRequestStatus === "decryptionError") return "Decryption Failed";
    if (dropKeyVerificationRequestStatus === "notfound") return "Drop Key Not Found";
    if (dropKeyVerificationRequestStatus === "rateLimited" || createDropRequestStatus === "rateLimited") return "Too Many Attempts";
    if (dropKeyVerificationRequestStatus === "incomplete") return "Incomplete Drop Key";
    if (dropKeyVerificationRequestStatus === "verifying") return "Verifying Your Drop Key...";
    if (dropKeyVerificationRequestStatus === "idle") return "Just a moment...";
    return "Processing...";
};

export const getDescription = (
    dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus,
    createDropRequestStatus: CreateDropRequestStatus
): string => {
    if (dropKeyVerificationRequestStatus === "success") return "Everything looks good — your Drop Key is verified and your content is ready to view.";
    if (dropKeyVerificationRequestStatus === "error") return "We couldn't verify your Drop Key due to a technical issue. Please try again or check your connection.";
    if (dropKeyVerificationRequestStatus === "decryptionError") return "Your Drop Key was found, but we couldn't decrypt the content. Please verify that you have the correct Drop Key.";
    if (dropKeyVerificationRequestStatus === "notfound") return "We couldn't locate a Drop with this key. It might be expired or entered incorrectly — please double-check and try again.";
    if (dropKeyVerificationRequestStatus === "rateLimited") return "You've reached the limit for Drop Key verifications. Please wait a bit before trying again.";
    if (dropKeyVerificationRequestStatus === "incomplete") return "Please enter both parts of your Drop Key before verifying. If you don't have one, you can create a new Drop.";
    if (dropKeyVerificationRequestStatus === "verifying") return "Please wait while we securely validate your Drop Key.";
    if (createDropRequestStatus === "rateLimited") return "You've reached the limit for creating Drops. Please wait a bit before trying again.";
    if (createDropRequestStatus === "error") return "We couldn't create your Drop due to a technical issue. Please try again or check your connection.";
    if (dropKeyVerificationRequestStatus === "idle") return "Please wait while we securely validate your Drop Key and prepare your content.";
    return "Processing your request...";
};

export const getButtonText = (
    dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus,
    createDropRequestStatus: CreateDropRequestStatus
): string => {
    if (dropKeyVerificationRequestStatus === "error" || createDropRequestStatus === "error") return "Let's try again";
    if (dropKeyVerificationRequestStatus === "decryptionError") return "Check my Drop Key";
    if (dropKeyVerificationRequestStatus === "notfound" || dropKeyVerificationRequestStatus === "incomplete") return "Let me fix my Drop Key";
    if (dropKeyVerificationRequestStatus === "rateLimited" || createDropRequestStatus === "rateLimited") return "Alright, I'll wait";
    if (dropKeyVerificationRequestStatus === "success") return "Open my Drop";
    return "Close";
};