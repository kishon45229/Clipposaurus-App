"use client";

import React from "react";
import { InputKeyContent } from "@/components/custom/home/input-key/InputKeyContent";

/**
 * InputKeyContainer component
 * @returns InputKeyContainer component
 */
export const InputKeyContainer: React.FC = React.memo(() => {
    return <InputKeyContent />;
});

InputKeyContainer.displayName = "InputKeyContainer";
