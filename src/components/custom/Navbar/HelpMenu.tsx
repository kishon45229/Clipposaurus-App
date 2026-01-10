"use client";

import React from "react";
import { HelpCircle, Mail, Bug } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useRedirects } from "@/hooks/useRedirect";
import { NavItem } from "./NavItem";

export const HelpMenu = () => {
    const { handleRedirectToGitHub, handleRedirectToFAQ, handleContactUs } = useRedirects();

    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 bg-transparent cursor-target">
                        Help
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 left-auto right-0 bg-white/95 backdrop-blur-xl shadow-xl border-2 border-zinc-200 dark:bg-zinc-900/95 dark:border-zinc-800 rounded-2xl">
                        <ul className="w-64 p-2 space-y-1">
                            <NavItem
                                onClick={handleRedirectToFAQ}
                                icon={HelpCircle}
                                title="FAQ"
                                description="Common questions and answers"
                            />
                            <NavItem
                                onClick={handleRedirectToGitHub}
                                icon={Bug}
                                title="Report an Issue"
                                description="Found a bug? Let us know"
                                external
                            />
                            <NavItem
                                onClick={handleContactUs}
                                icon={Mail}
                                title="Contact Support"
                                description="Get in touch with our team"
                                external
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
