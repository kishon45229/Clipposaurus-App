"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/components/navbar/NavItem";
import { HelpCircle, Mail, Bug } from "lucide-react";

export const HelpMenu = () => {
    const { data, handleRedirectToGitHubIssues, handleRedirectToFAQ, handleContactUs } = useNavbar();
    const { links, menus } = data;
    const { help } = links;
    const { helpDropDown } = menus;
    const { faq, issue, contact } = helpDropDown;

    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 bg-transparent cursor-target">
                        {help}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 left-auto right-0 bg-white/95 backdrop-blur-xl shadow-xl border-2 border-zinc-200 dark:bg-zinc-900/95 dark:border-zinc-800 rounded-2xl">
                        <ul className="w-64 p-2 space-y-1">
                            <NavItem
                                onClick={handleRedirectToFAQ}
                                icon={HelpCircle}
                                title={faq.title}
                                description={faq.description}
                            />
                            <NavItem
                                onClick={handleRedirectToGitHubIssues}
                                icon={Bug}
                                title={issue.title}
                                description={issue.description}
                            />
                            <NavItem
                                onClick={handleContactUs}
                                icon={Mail}
                                title={contact.title}
                                description={contact.description}
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
