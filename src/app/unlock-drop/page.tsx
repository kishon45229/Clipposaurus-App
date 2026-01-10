"use client";

import React from "react";
import { UnlockDrop } from "@/components/custom/unlock-drop/form";
import { UnlockDropProvider } from "@/contexts/UnlockDropContext";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";

export default function UnlockDropPage(): React.ReactElement {
    return (
        <ComponentDataProvider>
            <UnlockDropProvider>
                <UnlockDrop />
            </UnlockDropProvider>
        </ComponentDataProvider>
    );
}
