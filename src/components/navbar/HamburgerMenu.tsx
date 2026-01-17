"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import { useGitHubStars } from "@/hooks/useGitHubStars";
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

export const HamburgerMenu = () => {
    const stars = useGitHubStars();
    const { data, handleRedirectToDocs, handleRedirectToFAQ, handleRedirectToTermsOfService, handleContactUs, handleRedirectToChangelog, handleRedirectToGitHub, handleRedirectToGitHubIssues, handleRedirectToGitHubSponsor } = useNavbar();

    const { menus } = data;
    const { hamburger } = menus;
    const { openMenu, documentation, faq, termsOfService, changelog, github, reportIssue, contactUs, supportProject } = hamburger;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={openMenu}
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
                    {documentation}
                </DropdownMenuItem>

                {/* FAQ */}
                <DropdownMenuItem
                    onClick={handleRedirectToFAQ}
                    className="hamburger-menu-item"
                >
                    <HelpCircle className="hamburger-menu-icon-item" />
                    {faq}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 bg-zinc-200 dark:bg-zinc-800" />

                {/* GitHub */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHub}
                    className="hamburger-menu-item"
                >
                    <FontAwesomeIcon icon={faGithub} className="hamburger-menu-icon-item" />
                    {github}
                    <span className="flex items-center justify-center gap-2 ml-auto text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400">
                        <Star className="hamburger-menu-icon-item" />
                        {stars}
                    </span>
                </DropdownMenuItem>

                {/* Changelog */}
                <DropdownMenuItem
                    onClick={handleRedirectToChangelog}
                    className="hamburger-menu-item"
                >
                    <ScrollText className="hamburger-menu-icon-item" />
                    {changelog}
                </DropdownMenuItem>

                {/* Report Issue */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHubIssues}
                    className="hamburger-menu-item"
                >
                    <Bug className="hamburger-menu-icon-item" />
                    {reportIssue}
                </DropdownMenuItem>

                {/* Terms of Service */}
                <DropdownMenuItem
                    onClick={handleRedirectToTermsOfService}
                    className="hamburger-menu-item"
                >
                    <FileText className="hamburger-menu-icon-item" />
                    {termsOfService}
                </DropdownMenuItem>

                {/* Contact Us */}
                <DropdownMenuItem
                    onClick={handleContactUs}
                    className="hamburger-menu-item"
                >
                    <Mail className="hamburger-menu-icon-item" />
                    {contactUs}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 bg-zinc-200 dark:bg-zinc-800" />

                {/* Donate */}
                <DropdownMenuItem
                    onClick={handleRedirectToGitHubSponsor}
                    className="hamburger-menu-item bg-emerald-50text-emerald-700 dark:bg-emerald-950/40dark:text-emerald-300"
                >
                    <HeartHandshake className="hamburger-menu-icon-item" />
                    {supportProject}
                </DropdownMenuItem>
            </DropdownMenuContent >
        </DropdownMenu >
    );
};