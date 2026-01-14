import React from "react";
import {
  DOCS_URL,
  MARKETING_URL,
  GITHUB_REPO_URL,
  GITHUB_ISSUES_URL,
  GITHUB_SPONSOR_URL,
  CONTACT_EMAIL,
  APP_URL,
} from "@/lib/urls";

interface RedirectsReturn {
  handleRedictToCurrentPageHome: () => void;
  handleRedirectToDocs: () => void;
  handleRedirectToGitHub: () => void;
  handleRedirectToFAQ: () => void;
  handleRedirectToChangelog: () => void;
  handleRedirectToGitHubIssues: () => void;
  handleRedirectToTermsOfService: () => void;
  handleContactUs: () => void;
  handleRedirectToGitHubSponsor: () => void;
  handleRedirectToGitHubDiscussions: () => void;
  handleRedirectToCreateDrop: () => void;
  handleRedirectToUnlockDrop: () => void;
}

export function useRedirects(): RedirectsReturn {
  // Home
  const handleRedictToCurrentPageHome = React.useCallback(() => {
    window.location.href = "/";
  }, []);

  // APP
  const handleRedirectToDocs = React.useCallback(() => {
    window.location.href = DOCS_URL!;
  }, []);

  // GITHUB
  const handleRedirectToGitHub = React.useCallback(() => {
    window.open(GITHUB_REPO_URL, "_blank", "noopener noreferrer");
  }, []);

  // GITHUB ISSUES
  const handleRedirectToGitHubIssues = React.useCallback(() => {
    window.open(GITHUB_ISSUES_URL, "_blank", "noopener noreferrer");
  }, []);

  // GITHUB SPONSOR
  const handleRedirectToGitHubSponsor = React.useCallback(() => {
    window.open(GITHUB_SPONSOR_URL, "_blank", "noopener noreferrer");
  }, []);

  // FAQ
  const handleRedirectToFAQ = React.useCallback(() => {
    window.location.href = MARKETING_URL + "/faq";
  }, []);

  // CHANGELOG
  const handleRedirectToChangelog = React.useCallback(() => {
    window.location.href = DOCS_URL + "/changelog";
  }, []);

  // TERMS OF SERVICE
  const handleRedirectToTermsOfService = React.useCallback(() => {
    window.location.href = MARKETING_URL + "/terms-of-service";
  }, []);

  // CONTACT US
  const handleContactUs = React.useCallback(() => {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  }, []);

  // GITHUB DISCUSSIONS
  const handleRedirectToGitHubDiscussions = React.useCallback(() => {
    window.open(
      GITHUB_REPO_URL + "/discussions",
      "_blank",
      "noopener noreferrer"
    );
  }, []);

  // CREATE DROP
  const handleRedirectToCreateDrop = React.useCallback(() => {
    window.location.href = APP_URL + "/create-drop";
  }, []);

  // UNLOCK DROP
  const handleRedirectToUnlockDrop = React.useCallback(() => {
    window.location.href = APP_URL + "/unlock-drop";
  }, []);

  return {
    handleRedictToCurrentPageHome,
    handleRedirectToDocs,
    handleRedirectToGitHub,
    handleRedirectToFAQ,
    handleRedirectToChangelog,
    handleRedirectToGitHubIssues,
    handleRedirectToTermsOfService,
    handleContactUs,
    handleRedirectToGitHubSponsor,
    handleRedirectToGitHubDiscussions,
    handleRedirectToCreateDrop,
    handleRedirectToUnlockDrop,
  };
}
