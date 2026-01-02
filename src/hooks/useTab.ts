import React from "react";
import { FileItem } from "@/types";

export default function useTab() {
  const [textContent, setTextContent] = React.useState<string>("");
  const [codeContent, setCodeContent] = React.useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [autoDetectLanguage, setAutoDetectLanguage] =
    React.useState<boolean>(true);
  const [files, setFiles] = React.useState<FileItem[]>([]);

  return {
    textContent,
    setTextContent,
    codeContent,
    setCodeContent,
    selectedLanguage,
    setSelectedLanguage,
    autoDetectLanguage,
    setAutoDetectLanguage,
    files,
    setFiles,
  };
}
