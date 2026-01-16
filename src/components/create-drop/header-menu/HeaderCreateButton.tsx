"use client";

import { useHeader } from "@/contexts/HeaderContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const HeaderCreateButton = () => {
    const { data, handleCreateDrop, createDropRequestStatus } = useHeader();
    const { ctaButton } = data;
    const { label, loadingLabel } = ctaButton;

    const isCreating = createDropRequestStatus === "creating";

    {/* CREATE DROP BUTTON */ }
    return (
        < Button
            onClick={handleCreateDrop}
            disabled={isCreating}
            size="sm"
            className="h-9 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span className="flex items-center gap-2">
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                {isCreating ? loadingLabel : label}
            </span>
        </Button >
    );
};