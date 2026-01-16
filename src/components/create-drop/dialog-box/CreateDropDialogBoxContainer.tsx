"use client";

import React from "react";
import { StandardDialog } from "@/components/dialogs";
import type { DialogButtonProps } from "@/components/dialogs/types";
import { useHeader } from "@/contexts/HeaderContext";
import { CreateDropDialogBoxContent } from "./CreateDropDialogBox.utils";
import { ClipboardCheck, Clipboard, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const CreateDropDialogBoxContainer = React.memo(() => {
  const {
    handleDialogClose,
    handleDialogBoxOpenChange,
    handleCopy,
    copied,
    createDropRequestStatus,
    identifier,
    systemSecret,
    userSecret,
    retention,
    fullKeyVisible,
    setFullKeyVisible,
    uploadProgress,
  } = useHeader();

  const maskKey = (key: string) =>
    key.length <= 2 ? key : key.slice(0, 2) + "*".repeat(key.length - 2);

  const { icon, title, description, btnText, retentionDescription } = React.useCallback(() => { return CreateDropDialogBoxContent(); }, [])();

  const buttons: DialogButtonProps[] | undefined =
    createDropRequestStatus === "success"
      ? [
        { text: "Copy Drop Key", onClick: handleCopy, variant: "outline" },
        { text: btnText(), onClick: handleDialogClose },
      ]
      : createDropRequestStatus !== "creating" &&
        createDropRequestStatus !== "encrypting-files" &&
        createDropRequestStatus !== "uploading-files"
        ? [{ text: btnText(), onClick: handleDialogClose }]
        : undefined;

  const customContent =
    createDropRequestStatus === "success" ? (
      <div className="mt-[clamp(0.5rem,2vw,1rem)] flex flex-col items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
        {/* Key display */}
        <div
          className="
            flex min-w-fit flex-wrap items-center
            gap-[clamp(0.25rem,1vw,0.5rem)]
            rounded-xl
            border-2 border-dashed border-zinc-700 dark:border-zinc-300
            p-[clamp(0.5rem,1.5vw,0.75rem)]
          "
        >
          <div className="flex flex-wrap items-center mx-auto gap-[clamp(0.25rem,1vw,0.5rem)]">
            <span className="font-mono font-semibold tracking-wide text-[clamp(0.7rem,2vw,1.5rem)]">
              {fullKeyVisible ? identifier : maskKey(identifier)}
            </span>
            <span className="font-mono font-semibold tracking-wide text-[clamp(0.7rem,2vw,1rem)]">-</span>
            <span className="font-mono font-semibold tracking-wide text-[clamp(0.7rem,2vw,1.5rem)]">
              {fullKeyVisible ? systemSecret : maskKey(systemSecret)}
            </span>
            <span className="font-mono font-semibold tracking-wide text-[clamp(0.7rem,2vw,1rem)]">-</span>
            <span className="font-mono font-semibold tracking-wide text-[clamp(0.7rem,2vw,1.5rem)]">
              {fullKeyVisible ? userSecret : maskKey(userSecret)}
            </span>
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
            <Button variant="ghost" size="icon" onClick={() => setFullKeyVisible(!fullKeyVisible)}>
              {fullKeyVisible ? (
                <EyeOff className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)]" />
              ) : (
                <Eye className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)]" />
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? (
                <ClipboardCheck className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)]" />
              ) : (
                <Clipboard className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)]" />
              )}
            </Button>
          </div>
        </div>

        {/* Retention info */}
        <div className="mt-[clamp(0.25rem,1vw,0.5rem)] text-center text-[clamp(0.65rem,1.5vw,0.9rem)] text-zinc-900 dark:text-zinc-100">
          {retentionDescription(retention)} — make sure to save your Drop Key!
        </div>
      </div>
    ) : createDropRequestStatus === "uploading-files" ? (
      <div className="mt-[clamp(0.5rem,2vw,1rem)] flex flex-col items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] w-full">
        <Progress value={uploadProgress} className="w-full h-3" />
        <div className="text-center text-[clamp(0.75rem,1.8vw,1rem)] font-semibold text-zinc-900 dark:text-zinc-100">
          {uploadProgress}%
        </div>
      </div>
    ) : undefined;

  return (
    <StandardDialog
      open={createDropRequestStatus !== "idle"}
      onOpenChange={handleDialogBoxOpenChange}
      icon={icon()}
      title={title()}
      description={description()}
      buttons={buttons}
      showCloseButton={
        createDropRequestStatus !== "creating" &&
        createDropRequestStatus !== "encrypting-files" &&
        createDropRequestStatus !== "uploading-files"
      }
      customContent={customContent}
    />
  );
});

CreateDropDialogBoxContainer.displayName = "CreateDropDialogBoxContainer";