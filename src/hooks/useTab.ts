import React from "react";

export default function useTab() {
  const [textContent, setTextContent] = React.useState<string>("");
  const [codeContent, setCodeContent] = React.useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [autoDetectLanguage, setAutoDetectLanguage] =
    React.useState<boolean>(true);

  return {
    textContent,
    setTextContent,
    codeContent,
    setCodeContent,
    selectedLanguage,
    setSelectedLanguage,
    autoDetectLanguage,
    setAutoDetectLanguage,
  };
}
