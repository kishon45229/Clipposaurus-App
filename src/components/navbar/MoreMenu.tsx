"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import { Bug, HelpCircle, Mail } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/components/navbar/NavItem";

export const MoreMenu = () => {
    const { data, handleRedirectToFAQ, handleRedirectToGitHubIssues, handleContactUs } = useNavbar();
    const { links, menus } = data;
    const { help } = links;
    const { helpDropDown } = menus;
    const { faq, issue, contact } = helpDropDown;

    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="navbar-button bg-transparent text-[clamp(1.125rem, 2vw, 1.375rem)]">
                        {help}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 left-auto right-0 bg-white/95 backdrop-blur-xl shadow-xl border border-zinc-200 dark:bg-zinc-900/95 dark:border-zinc-800">
                        <ul className="w-56 p-2 space-y-1">
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