import React from "react";
import {
  DOCS_URL,
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
  handleRedirectToFeatures: () => void;
  handleRedirectToHowItWorks: () => void;
  handleRedirectToSecurity: () => void;
  handleRedirectToPrivacyPolicy: () => void;
  handleRedirectToCookiePolicy: () => void;
  handleRedirectToAcceptableUse: () => void;
  handleRedirectToApiReference: () => void;
  handleRedirectToGitHubDiscussions: () => void;
  handleRedirectToDiscord: () => void;
  handleRedirectToTwitter: () => void;
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

  // GITHUB ISSUES
  const handleRedirectToGitHubSponsor = React.useCallback(() => {
    window.open(GITHUB_SPONSOR_URL, "_blank", "noopener noreferrer");
  }, []);

  // FAQ
  const handleRedirectToFAQ = React.useCallback(() => {
    window.location.href = "/faq";
  }, []);

  // CHANGELOG
  const handleRedirectToChangelog = React.useCallback(() => {
    window.location.href = DOCS_URL + "/changelog";
  }, []);

  // TERMS OF SERVICE
  const handleRedirectToTermsOfService = React.useCallback(() => {
    window.location.href = "/terms-of-service";
  }, []);

  // CONTACT US
  const handleContactUs = React.useCallback(() => {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  }, []);

  // FEATURES
  const handleRedirectToFeatures = React.useCallback(() => {
    window.location.href = "/#features";
  }, []);

  // HOW IT WORKS
  const handleRedirectToHowItWorks = React.useCallback(() => {
    window.location.href = "/#how-it-works";
  }, []);

  // SECURITY
  const handleRedirectToSecurity = React.useCallback(() => {
    window.location.href = "/#security";
  }, []);

  // PRIVACY POLICY
  const handleRedirectToPrivacyPolicy = React.useCallback(() => {
    window.location.href = "/privacy-policy";
  }, []);

  // COOKIE POLICY
  const handleRedirectToCookiePolicy = React.useCallback(() => {
    window.location.href = "/cookie-policy";
  }, []);

  // ACCEPTABLE USE
  const handleRedirectToAcceptableUse = React.useCallback(() => {
    window.location.href = "/acceptable-use";
  }, []);

  // API REFERENCE
  const handleRedirectToApiReference = React.useCallback(() => {
    window.location.href = DOCS_URL + "/api";
  }, []);

  // GITHUB DISCUSSIONS
  const handleRedirectToGitHubDiscussions = React.useCallback(() => {
    window.open(
      GITHUB_REPO_URL + "/discussions",
      "_blank",
      "noopener noreferrer"
    );
  }, []);

  // DISCORD (placeholder)
  const handleRedirectToDiscord = React.useCallback(() => {
    // Placeholder for Discord link
  }, []);

  // TWITTER (placeholder)
  const handleRedirectToTwitter = React.useCallback(() => {
    // Placeholder for Twitter link
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
    handleRedirectToFeatures,
    handleRedirectToHowItWorks,
    handleRedirectToSecurity,
    handleRedirectToPrivacyPolicy,
    handleRedirectToCookiePolicy,
    handleRedirectToAcceptableUse,
    handleRedirectToApiReference,
    handleRedirectToGitHubDiscussions,
    handleRedirectToDiscord,
    handleRedirectToTwitter,
    handleRedirectToCreateDrop,
    handleRedirectToUnlockDrop,
  };
}
