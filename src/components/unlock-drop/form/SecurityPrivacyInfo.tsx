"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useUnlockDrop } from "@/contexts/UnlockDropContext";
import { Shield, Lock, Code } from "lucide-react";

export const SecurityPrivacyInfo = () => {
    const { shouldShowRecaptcha, recaptchaRef, handleCaptchaChange } = useUnlockDrop();

    return (
        <div className="w-full max-w-4xl">
            {/* Security & Privacy Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/30 dark:border-emerald-800/30">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                        <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">End-to-End Encrypted</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Your content is secured with military-grade encryption</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/30 dark:border-emerald-800/30">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                        <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Zero-Knowledge</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Only you have access to your drop key</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/30 dark:border-emerald-800/30">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                        <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Open Source</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Our code is publicly available for transparency and trust</p>
                    </div>
                </div>
            </div>

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
};