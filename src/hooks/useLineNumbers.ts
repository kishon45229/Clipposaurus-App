import React from "react";
import { computeLineNumbers, LineNumbersResult } from "@/lib/lineNumbers";
import { MAX_LINES } from "@/components/create-drop/tab/code-tab/config";

interface Props {
  codeContent: string;
}

export default function useLineNumbers({
  codeContent,
}: Props): LineNumbersResult {
  const result = React.useMemo(
    () => computeLineNumbers(codeContent, MAX_LINES),
    [codeContent]
  );
  return result;
}
