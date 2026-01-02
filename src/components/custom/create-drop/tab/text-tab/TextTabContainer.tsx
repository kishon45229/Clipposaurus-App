"use client";

import React from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DeleteAlertDialog } from "@/components/custom/DeleteAlertDialog";
import { cn } from "@/lib/utils";
import { useTextTab } from "@/contexts/TextTabContext";

export const TextTabContainer = React.memo(() => {
  const {
    textContent,
    charCount,
    atCharLimit,
    handleTextChange,
    handleTextPaste,
    clearTextContent,
  } = useTextTab();

  return (
    <div
      className="
        flex h-full shrink-0 flex-col
        gap-[clamp(0.4rem,1.5vw,0.75rem)]
        rounded-2xl
        border border-zinc-200/60 dark:border-zinc-800/60
        bg-gradient-to-b from-zinc-50/80 to-white/60
        dark:from-zinc-900/70 dark:to-zinc-950/60
        px-[clamp(0.4rem,1.5vw,0.75rem)]
        py-[clamp(0.4rem,1.5vw,0.75rem)]
        shadow-xl backdrop-blur-2xl
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between">
        <Badge
          variant={atCharLimit ? "destructive" : "secondary"}
          className={cn(
            `
              select-none rounded-2xl
              px-[clamp(0.75rem,2vw,1rem)]
              text-[clamp(0.7rem,2.5vw,0.9rem)]
            `,
            atCharLimit ? "text-white" : "text-muted-foreground"
          )}
        >
          {charCount.toLocaleString()} characters
        </Badge>

        {textContent.length > 0 ? (
          <DeleteAlertDialog
            type="note"
            clearAllContent={clearTextContent}
          />
        ) : (
          <Button
            variant="destructive"
            size="icon"
            disabled
            className="rounded-2xl"
          >
            <Trash className="size-[clamp(0.9rem,2.5vw,1.1rem)]" />
          </Button>
        )}
      </div>

      {/* Editor */}
      <div className="flex min-h-0 flex-1">
        <Textarea
          placeholder="Paste or type your text here..."
          value={textContent}
          onChange={handleTextChange}
          onPaste={handleTextPaste}
          className={cn(
            `
              h-full w-full resize-none overflow-y-auto
              rounded-2xl
              text-[clamp(0.85rem,2.5vw,1rem)]
              leading-[1.6]
              p-[clamp(0.6rem,2vw,1rem)]
            `,
            atCharLimit && "border-red-500"
          )}
        />
      </div>
    </div>
  );
});

TextTabContainer.displayName = "TextTabContainer";
