"use client";

import React from "react";
import { CodeLanguageSelection } from "@/components/create-drop/tab/code-tab/CodeLanguageSelection";
import { DeleteAlertDialog } from "@/components/common/DeleteAlertDialog";
import { CodeEditor } from "@/components/create-drop/tab/code-tab/CodeEditor";
import { LineNumbers } from "@/components/create-drop/tab/code-tab/LineNumbers";
import { useCodeTab } from "@/contexts/CodeTabContext";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const CodeTabContainer = React.memo(() => {
  const { codeContent, clearCodeContent, handleScroll } = useCodeTab();

  return (
    <div
      className="
        flex h-full shrink-0 flex-col
        gap-[clamp(0.4rem,1.5vw,0.75rem)]
        rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60
        bg-gradient-to-b from-zinc-50/80 to-white/60
        dark:from-zinc-900/70 dark:to-zinc-950/60
        px-[clamp(0.4rem,1.5vw,0.75rem)]
        py-[clamp(0.4rem,1.5vw,0.75rem)]
        shadow-xl backdrop-blur-2xl
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-end gap-[clamp(0.5rem,2vw,1rem)]">
        <CodeLanguageSelection />
        {codeContent.length > 0 ? (
          <DeleteAlertDialog type="code" clearAllContent={clearCodeContent} />
        ) : (
          <Button variant="destructive" size="icon" disabled className="rounded-2xl">
            <Trash className="size-[clamp(0.9rem,2.5vw,1.1rem)]" />
          </Button>
        )}
      </div>

      {/* Editor */}
      <div className="flex flex-1 min-h-0">
        <div
          className="
            flex flex-1 min-h-0 overflow-hidden
            rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50
            bg-background/70 dark:bg-background/40
          "
        >
          <div className="h-full min-h-0">
            <LineNumbers />
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor onScroll={handleScroll} />
          </div>
        </div>
      </div>
    </div>
  );
});

CodeTabContainer.displayName = "CodeTabContainer";
