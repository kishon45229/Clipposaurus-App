import { useState } from "react";

export const useInputKeyVisibility = () => {
  const [showIdentifier, setShowIdentifier] = useState(false);
  const [showSystemSecret, setShowSystemSecret] = useState(false);
  const [showUserSecret, setShowUserSecret] = useState(false);
  const [hoverIdentifier, setHoverIdentifier] = useState(false);
  const [hoverSystemSecret, setHoverSystemSecret] = useState(false);
  const [hoverUserSecret, setHoverUserSecret] = useState(false);

  // Toggle functions for click events
  const toggleIdentifierVisibility = () => setShowIdentifier(!showIdentifier);
  const toggleSystemSecretVisibility = () =>
    setShowSystemSecret(!showSystemSecret);
  const toggleUserSecretVisibility = () => setShowUserSecret(!showUserSecret);

  // Determine if text should be visible
  const isIdentifierVisible = showIdentifier || hoverIdentifier;
  const isSystemSecretVisible = showSystemSecret || hoverSystemSecret;
  const isUserSecretVisible = showUserSecret || hoverUserSecret;

  return {
    showIdentifier,
    showSystemSecret,
    showUserSecret,
    hoverIdentifier,
    hoverSystemSecret,
    hoverUserSecret,
    toggleIdentifierVisibility,
    toggleSystemSecretVisibility,
    toggleUserSecretVisibility,
    isIdentifierVisible,
    isSystemSecretVisible,
    isUserSecretVisible,
    setHoverIdentifier,
    setHoverSystemSecret,
    setHoverUserSecret,
  };
};
