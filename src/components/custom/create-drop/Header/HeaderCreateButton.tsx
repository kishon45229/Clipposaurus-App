"use client";

import { useHeader } from "@/contexts/HeaderContext";
import { Button } from "@/components/ui/button";

export const HeaderCreateButton = () => {
    const { data, handleCreateDrop, createDropRequestStatus } = useHeader();
    const { ctaButton } = data;
    const { label, loadingLabel } = ctaButton;

    const isCreating = createDropRequestStatus === "creating";

    return (
        <Button
            onClick={handleCreateDrop}
            disabled={isCreating}
            size="sm"
            className="h-9 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm
                rounded-md transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isCreating ? loadingLabel : label}
        </Button>
    );
};