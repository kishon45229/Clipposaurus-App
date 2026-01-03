"use client";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";

export const UnlockDropDialogBoxFooter = React.memo(() => {
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
            gap-[clamp(0.25rem,2vw,0.75rem)]
        ">
            {/* Hint */}
            <div className="
            text-center
            text-[clamp(0.65rem, 2.5vw, 0.8rem)]
    text-zinc-400
    dark:text-zinc-500
        ">
                {hintText}{" "}
                < span className="
    font-mono
    text-zinc-500
    dark:text-zinc-400
        ">
                    {sampleKey}
                </span >
            </div >

            {/* reCAPTCHA (invisible) */}
            {
                shouldShowRecaptcha && (
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        size="invisible"
                        onChange={handleCaptchaChange}
                        aria-label="reCAPTCHA verification"
                    />
                )
            }
        </div >
    );
});

UnlockDropDialogBoxFooter.displayName = "UnlockDropDialogBoxFooter";
