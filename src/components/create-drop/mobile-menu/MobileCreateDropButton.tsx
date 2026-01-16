"use client";

import { useMenu } from "@/contexts/MenuContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ComponentError } from "@/components/common/ComponentError";

const COMPONENT_ID = "MobileCreateDropButton" as const;

export const MobileCreateDropButton = () => {
    const { data, isLoading, error, handleMobileMenuOpen } = useMenu();

    if (isLoading || !data) return null;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    const { mobileMenuButton } = data;

    return (
        <Button
            onClick={handleMobileMenuOpen}
            className="relative sm:min-w-[220px] md:min-w-[280px] size-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base md:text-lg shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-70"
        >
            <Plus className="sm:mr-2 size-4" />
            <span className="hidden sm:inline text-sm md:text-base">{mobileMenuButton}</span>
        </Button>
    );
};