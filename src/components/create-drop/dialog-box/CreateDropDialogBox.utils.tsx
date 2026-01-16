"use client";

import React from "react";
import { useHeader } from "@/contexts/HeaderContext";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    ShieldBan,
    LoaderCircle,
} from "lucide-react";

export function CreateDropDialogBoxContent() {
    const { createDropRequestStatus } = useHeader();

    const icon = (): React.ReactElement => {
        switch (createDropRequestStatus) {
            case "success":
                return <CheckCircle2 className="w-12 h-12 drop-shadow-sm" />;
            case "error":
                return <XCircle className="w-12 h-12 drop-shadow-sm" />;
            case "empty":
                return <AlertCircle className="w-12 h-12 drop-shadow-sm" />;
            case "rateLimited":
                return <ShieldBan className="w-12 h-12 drop-shadow-sm" />;
            case "nullUserSecret":
                return <AlertCircle className="w-12 h-12 drop-shadow-sm" />;
            case "fileSizeExceeded":
                return <AlertCircle className="w-12 h-12 drop-shadow-sm" />;
            case "encrypting-files":
            case "uploading-files":
            case "creating":
                return <LoaderCircle className="animate-spin w-12 h-12 drop-shadow-sm" />;
            default:
                return <LoaderCircle className="animate-spin w-12 h-12 drop-shadow-sm" />;
        }
    }

    const title = (): string => {
        switch (createDropRequestStatus) {
            case "success":
                return "Your Drop is Ready!";
            case "error":
                return "Something Went Wrong";
            case "empty":
                return "Nothing to Drop";
            case "rateLimited":
                return "Whoa, Slow Down!";
            case "encrypting-files":
                return "Encrypting Your Files...";
            case "uploading-files":
                return "Uploading Your Files...";
            case "creating":
                return "Preparing your Drop...";
            case "nullUserSecret":
                return "Drop Key Incomplete";
            case "fileSizeExceeded":
                return "File Size Limit Exceeded";
            case "idle":
                return "Just a Moment...";
            default:
                return "Processing...";
        }
    }

    const description = (): string => {
        switch (createDropRequestStatus) {
            case "success":
                return "Here's your secure ticket to open this Drop anywhere. Keep it safe!";
            case "error":
                return "We couldn't create your Drop due to a technical hiccup. Please try again in a moment.";
            case "empty":
                return "Looks like you haven't added any content yet. Add some text or code, or files before creating a Drop.";
            case "rateLimited":
                return "You've reached the limit for creating Drops. Please take a short break before trying again.";
            case "encrypting-files":
                return "Your files are being encrypted securely in your browser. Please wait...";
            case "uploading-files":
                return "Your encrypted files are now being uploaded. This may take a moment for larger files...";
            case "creating":
                return "We're preparing your content to create Drop. This may take some time...";
            case "nullUserSecret":
                return "Your Drop Key seems incomplete. Please ensure you've set the private key before creating a Drop.";
            case "fileSizeExceeded":
                return "The file you're trying to upload exceeds the 50MB limit, or adding it would exceed the total 50MB limit. Please remove some files or choose smaller files.";
            case "idle":
                return "Please wait while we processing your request...";
            default:
                return "Processing your Drop...";
        }
    }

    const btnText = (): string => {
        switch (createDropRequestStatus) {
            case "success":
                return "Done";
            case "error":
                return "Let's Try Again";
            case "empty":
                return "Got it, I'll Add Content";
            case "rateLimited":
                return "Understood, I'll Wait";
            case "nullUserSecret":
                return "I'll Complete My Drop Key";
            case "fileSizeExceeded":
                return "I Understand";
            default:
                return "Okay";
        }
    }

    const retentionDescription = (retention: string): string => {
        switch (retention) {
            case "keep-30-minutes":
                return "This Drop will be kept for 30 minutes from now. After that, it will be deleted.";
            case "keep-1-hour":
                return "This Drop will be kept for 1 hour from now. After that, it will be deleted.";
            case "delete-on-access":
                return "This Drop will be deleted immediately after being accessed.";
            default:
                return "";
        }
    }

    return { icon, title, description, btnText, retentionDescription };
}