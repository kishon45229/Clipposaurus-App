"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Menu,
    BookOpen,
    Star,
    HelpCircle,
    ScrollText,
    Bug,
    HeartHandshake,
    FileText,
    Mail,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { useRedirects } from "@/hooks/useRedirect";


export const HamburgerMenu = React.memo(() => {
    const stars = useGitHubStars();
    const { handleRedirectToDocs, handleRedirectToChangelog, handleRedirectToGitHub, handleRedirectToGitHubIssues, handleRedirectToGitHubSponsor } = useRedirects();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                >
                    <Menu className="navbar-icon" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="hamburger-menu-content"
            >
                {/* Docs */}
                <DropdownMenuItem
                    onClick={handleRedirectToDocs}
                    className="hamburger-menu-item"
                >
                    <BookOpen className="hamburger-menu-icon-item" />
                    Documentation
                </DropdownMenuItem>

                {/* FAQ */}
                <DropdownMenuItem
                    onClick={() => window.open("/faq")}
                    className="hamburger-menu-item"
                >
                    <HelpCircle className="hamburger-menu-icon-item" />
                    FAQ
                </DropdownMenuItem>

                <DropdownMenuSeparator className="
                    my-2
                    bg-zinc-200
                    dark:bg-zinc-800
                " />

                {/* GitHub */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHub}
                    className="hamburger-menu-item"
                >
                    <FontAwesomeIcon icon={faGithub} className="hamburger-menu-icon-item" />
                    GitHub
                    <span className="
                        flex items-center justify-center
                        gap-2 ml-auto
                        text-sm sm:text-base md:text-lg
                        text-zinc-500
                        dark:text-zinc-400
                    ">
                        <Star className="hamburger-menu-icon-item" />
                        {stars}
                    </span>
                </DropdownMenuItem>

                {/* Changelog */}
                <DropdownMenuItem
                    onClick={() => window.open("/changelog")}
                    className="hamburger-menu-item"
                >
                    <ScrollText className="hamburger-menu-icon-item" />
                    Changelog
                </DropdownMenuItem>

                {/* Report Issue */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHubIssues}
                    className="hamburger-menu-item"
                >
                    <Bug className="hamburger-menu-icon-item" />
                    Report an Issue
                </DropdownMenuItem>

                {/* Terms of Service */}
                <DropdownMenuItem
                    onClick={() => window.open("/terms-of-service")}
                    className="hamburger-menu-item"
                >
                    <FileText className="hamburger-menu-icon-item" />
                    Terms of Service
                </DropdownMenuItem>

                {/* Contact Us */}
                <DropdownMenuItem
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = "mailto:support@clipposaurus.com";
                        link.click();
                    }}
                    className="hamburger-menu-item"
                >
                    <Mail className="hamburger-menu-icon-item" />
                    Contact Us
                </DropdownMenuItem>

                <DropdownMenuSeparator className="
                    my-2
                    bg-zinc-200
                    dark:bg-zinc-800
                " />

                {/* Donate */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHubSponsor}
                    className="
                hamburger-menu-item
                bg-emerald-50text-emerald-700
                dark:bg-emerald-950/40dark:text-emerald-300
        "
                >
                    <HeartHandshake className="hamburger-menu-icon-item" />
                    Support the Project
                </DropdownMenuItem>
            </DropdownMenuContent >
        </DropdownMenu >
    );
});

HamburgerMenu.displayName = "HamburgerMenu";