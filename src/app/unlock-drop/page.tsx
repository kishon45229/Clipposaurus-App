"use client";

import React from "react";
import { UnlockDrop } from "@/components/unlock-drop/form";
import { UnlockDropProvider } from "@/contexts/UnlockDropContext";

export default function UnlockDropPage(): React.ReactElement {
    return (
        <section className="min-h-screen overflow-hidden">
            <UnlockDropProvider>
                <UnlockDrop />
            </UnlockDropProvider>
        </section>
    );
}
