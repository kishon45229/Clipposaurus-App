"use client";

import React from "react";
import { ScrollText, FileText, HeartHandshake } from "lucide-react";
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

export const ResourcesMenu = () => {
    const { handleRedirectToDocs, handleRedirectToChangelog, handleRedirectToTermsOfService, handleRedirectToGitHub, handleRedirectToGitHubIssues, handleRedirectToGitHubSponsor } = useRedirects();

    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 bg-transparent cursor-target">
                        Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        className="z-50 left-auto right-0 bg-white/95 backdrop-blur-xl shadow-xl border-2 border-zinc-200 dark:bg-zinc-900/95 dark:border-zinc-800 rounded-2xl"
                    >
                        <ul className="w-64 p-2 space-y-1">
                            <NavItem
                                onClick={handleRedirectToChangelog}
                                icon={ScrollText}
                                title="Changelog"
                                description="See what's new and improved"
                            />
                            <NavItem
                                onClick={handleRedirectToTermsOfService}
                                icon={FileText}
                                title="Terms of Service"
                                description="Read our terms and conditions"
                            />
                            <li className="h-px my-2 bg-zinc-200 dark:bg-zinc-800" />
                            <NavItem
                                onClick={handleRedirectToGitHubSponsor}
                                icon={HeartHandshake}
                                title="Support the Project"
                                description="Help keep Clipposaurus free"
                                external
                                highlight
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
