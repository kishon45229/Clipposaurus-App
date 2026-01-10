"use client";

import { UnlockDropHeader } from "@/components/custom/unlock-drop/form/UnlockDropHeader";
import { StepIndicator } from "@/components/custom/unlock-drop/form/StepIndicator";
import { MainFormArea } from "@/components/custom/unlock-drop/form/MainFormArea";
import { InfoSection } from "@/components/custom/unlock-drop/form/InfoSection";
import { SecurityPrivacyInfo } from "@/components/custom/unlock-drop/form/SecurityPrivacyInfo";
import { BackgroundDecoration } from "@/components/custom/unlock-drop/form/BackgroundDecoration";
import { useUnlockDrop } from "@/contexts/UnlockDropContext";

export const UnlockDropContent = () => {
    const { isEnterKeyStep } = useUnlockDrop();

    return (
        <div className="w-full flex items-center justify-center px-4 py-8">
            <BackgroundDecoration />

            <div className="max-w-4xl w-full flex flex-col items-center gap-12">
                <UnlockDropHeader />
                <StepIndicator />
                <MainFormArea />
                {isEnterKeyStep && <InfoSection />}
                <SecurityPrivacyInfo />
            </div>
        </div>
    );
};
