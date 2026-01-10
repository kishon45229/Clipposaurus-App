"use client";

import { UnlockDropForm } from "@/components/custom/unlock-drop/form/UnlockDropForm";
import { UnlockDropVerify } from "@/components/custom/unlock-drop/form/UnlockDropVerify";
import { UnlockDropAccess } from "@/components/custom/unlock-drop/form/UnlockDropAccess";
import { useUnlockDrop } from "@/contexts/UnlockDropContext";

export const MainFormArea = () => {
    const { isEnterKeyStep, isVerifyStep, isAccessStep } = useUnlockDrop();

    return (
        <div className="relative w-full max-w-2xl">
            <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl">
                    {isEnterKeyStep && <UnlockDropForm />}
                    {isVerifyStep && <UnlockDropVerify />}
                    {isAccessStep && <UnlockDropAccess />}
            </div>
        </div>
    );
};