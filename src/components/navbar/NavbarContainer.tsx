"use client";

import { useNavbar } from "@/contexts/NavbarContext"
import { ComponentError } from "@/components/common/ComponentError";
import { NavbarContent } from "@/components/navbar/NavbarContent";
import { NavbarSkeleton } from "@/components/skeleton/NavbarSkeleton";

const COMPONENT_ID = "NavbarComponent" as const;

export const NavbarContainer = () => {
    const { data, isLoading, error } = useNavbar();

    if (isLoading || !data) return <NavbarSkeleton />;
    if (error) return <ComponentError componentId={COMPONENT_ID} />;

    return <NavbarContent />
}