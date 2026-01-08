"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputKey } from "@/components/custom/home/input-key";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";

/**
 * UnlockDropForm component
 * Contains the input key field and unlock button
 * Handles auto-redirect on successful verification
 */
export const UnlockDropForm = React.memo(() => {
    const router = useRouter();
    const { data } = useUnlockDropDialogBox();
    const { ctaBtn } = data;

    const {
        handleOpenDrop,
        dropKeyVerificationRequestStatus,
        redirectUrl,
    } = useDropOptions();

    const isVerifying = dropKeyVerificationRequestStatus === "verifying";

    // Auto-redirect on successful verification
    React.useEffect(() => {
        if (dropKeyVerificationRequestStatus === "success" && redirectUrl) {
            const timer = setTimeout(() => {
                router.push(redirectUrl);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [dropKeyVerificationRequestStatus, redirectUrl, router]);

    return (
        <div className="
      w-full
      flex
      flex-col
      items-center
      gap-6
    ">
            <div className="w-full max-w-md">
                <InputKey />
            </div>

            <Button
                size="lg"
                onClick={handleOpenDrop}
                disabled={isVerifying}
                aria-label="Open drop"
                className="
          relative
          min-w-56
          h-14
          rounded-2xl
          bg-emerald-600
          hover:bg-emerald-500
          text-white
          text-lg
          font-semibold
          shadow-lg
          shadow-emerald-600/30
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          disabled:opacity-70
        "
            >
                {isVerifying ? (
                    <span className="flex items-center gap-3">
                        <LoaderCircle
                            aria-hidden="true"
                            className="w-6 h-6 animate-spin"
                        />
                        <span>{ctaBtn.loadingLabel}</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-3">
                        <span>{ctaBtn.label}</span>
                        <ArrowRight className="w-6 h-6" />
                    </span>
                )}
            </Button>
        </div>
    );
});

UnlockDropForm.displayName = "UnlockDropForm";
