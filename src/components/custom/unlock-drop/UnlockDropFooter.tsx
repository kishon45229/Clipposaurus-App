"use client";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";

/**
 * UnlockDropFooter component
 * Displays hint text and reCAPTCHA
 */
export const UnlockDropFooter = React.memo(() => {
    const { data } = useUnlockDropDialogBox();
    const { hintText, sampleKey } = data;

    const {
        shouldShowRecaptcha,
        recaptchaRef,
        handleCaptchaChange,
    } = useDropOptions();

    return (
        <div className="
      flex
      flex-col
      items-center
      gap-2
      text-center
    ">
            <p className="
        text-sm
        text-zinc-400
        dark:text-zinc-500
      ">
                {hintText}{" "}
                <span className="
          font-mono
          text-zinc-500
          dark:text-zinc-400
        ">
                    {sampleKey}
                </span>
            </p>

            {/* reCAPTCHA (invisible) */}
            {shouldShowRecaptcha && (
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    size="invisible"
                    onChange={handleCaptchaChange}
                    aria-label="reCAPTCHA verification"
                />
            )}
        </div>
    );
});

UnlockDropFooter.displayName = "UnlockDropFooter";
