"use client";

import React from "react";
import { UnlockDrop } from "@/components/custom/unlock-drop";
import { DropOptionsProvider } from "@/contexts/DropOptionsContext";
import { UnlockDropDialogBoxProvider } from "@/contexts/UnlockDropDialogBoxContext";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";

export default function UnlockDropPage(): React.ReactElement {
    return (
        <ComponentDataProvider>
            <UnlockDropDialogBoxProvider>
                <DropOptionsProvider>
                    <UnlockDrop />
                </DropOptionsProvider>
            </UnlockDropDialogBoxProvider>
        </ComponentDataProvider>
    );
}
