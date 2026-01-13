"use client";

import React from "react";
import Link from "next/link";
import { Bug, ScrollText, HelpCircle, Mail, FileText, HeartHandshake } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { GITHUB_REPO_URL, GITHUB_SPONSOR_URL } from "@/constants/githubConfig";

export const MoreMenu = React.memo(() => {
    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="navbar-button bg-transparent text-[clamp(1.125rem, 2vw, 1.375rem)]">
                        More
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        className="
              z-50 left-auto right-0
              bg-white/95
              backdrop-blur-xl shadow-xl
              border border-zinc-200
              dark:bg-zinc-900/95 dark:border-zinc-800
            "
                    >
                        <ul className="w-56 p-2 space-y-1">
                            <NavItem
                                href="/faq"
                                icon={HelpCircle}
                                title="FAQ"
                                description="Common questions and answers"
                            />
                            <NavItem
                                href="/changelog"
                                icon={ScrollText}
                                title="Changelog"
                                description="See what's new and improved"
                            />
                            <NavItem
                                href={GITHUB_REPO_URL + "/issues"}
                                icon={Bug}
                                title="Report an Issue"
                                description="Found a bug? Let us know"
                                external
                            />
                            <NavItem
                                href="/terms-of-service"
                                icon={FileText}
                                title="Terms of Service"
                                description="Read our terms and conditions"
                            />
                            <NavItem
                                href="mailto:support@clipposaurus.com"
                                icon={Mail}
                                title="Contact Us"
                                description="Get in touch with support"
                                external
                            />
                            <li className="
                h-px
                my-2
                bg-zinc-200
                dark:bg-zinc-800
              " />
                            <NavItem
                                href={GITHUB_SPONSOR_URL}
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
});

MoreMenu.displayName = "MoreMenu";

interface NavItemProps {
    href: string;
    title: string;
    description: string;
    icon: React.ElementType;
    external?: boolean;
    highlight?: boolean;
}

function NavItem({
    href,
    title,
    description,
    icon: Icon,
    external,
    highlight,
}: NavItemProps) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`
            flex z-50
            gap-3 px-3 py-2
            text-sm
            rounded-xl
            transition-colors
            ${highlight
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"}
          `}
                >
                    <div className="flex flex-row gap-2">
                        <Icon className="
            shrink-0
            h-4 w-4
            mt-0.5
            opacity-80
          " />
                        <div className="font-medium">{title}</div>
                    </div>
                    <div>
                        <div className="
              text-xs
              opacity-30
            ">{description}
                        </div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}