"use client";

import React from "react";
import { NavbarBrand } from "@/components/custom/Navbar/NavbarBrand";
import { NavbarLinks } from "@/components/custom/Navbar/NavbarLinks";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { HamburgerMenu } from "./HamburgerMenu";

export const NavbarContainer: React.FC = React.memo(() => {
    return (
        <div className="
            max-w-[1920px]
            h-full
            mx-auto
            px-2
            sm:px-4
        ">
            <div className="
                flex
                items-center
                justify-between
                h-full
                lg:hidden
                gap-2
            ">
                <HamburgerMenu />
                <NavbarBrand />
                <AnimatedThemeToggler className="
                    bg-transparent
                    text-zinc-950
                    hover:bg-none
                    hover:text-emerald-700
                    dark:text-zinc-200
                    dark:hover:text-emerald-300
                " />
            </div>
            <div className="
                hidden
                items-center
                justify-between
                h-full
                lg:flex
                gap-4
            ">
                <NavbarBrand />
                <NavbarLinks />
            </div>
        </div>
    );
});

NavbarContainer.displayName = "NavbarContainer";
