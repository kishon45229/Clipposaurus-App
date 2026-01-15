"use client";

import { NavbarBrand } from "@/components/navbar/NavbarBrand";
import { NavbarLinks } from "@/components/navbar/NavbarLinks";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { HamburgerMenu } from "@/components/navbar/HamburgerMenu";

export const NavbarContent = () => {
    return (
        <div className="max-w-7xl h-full mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between h-full lg:hidden gap-2">
                <HamburgerMenu />
                <NavbarBrand />
                <AnimatedThemeToggler className="h-10 w-10 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200" />
            </div>
            <div className="hidden items-center justify-between h-full lg:flex gap-4">
                <NavbarBrand />
                <NavbarLinks />
            </div>
        </div>
    );
};