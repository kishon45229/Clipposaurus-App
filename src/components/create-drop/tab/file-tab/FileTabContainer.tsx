"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Trash } from "lucide-react";
import { DeleteAlertDialog } from "@/components/common/DeleteAlertDialog";
import { FileTilesGrid } from "@/components/create-drop/tab/file-tab/FileTilesGrid";
import { DragAndDrop } from "@/components/create-drop/tab/file-tab/DragAndDrop";
import { useFileTab } from "@/contexts/FileTabContext";
import { formatSize } from "@/lib/utils";
import { FILE_SIZE_CONFIG } from "@/constants/fileProcessingConfig";
import { cn } from "@/lib/utils";
import { NoFileInfo } from "./NoFileInfo";

const { MAX_TOTAL_SIZE } = FILE_SIZE_CONFIG;

export const FileTabContainer = () => {
  const {
    files,
    setFiles,
    currentTotalSize,
    isOverLimit,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handlePaste,
    handleFileSelect,
    isDragOver,
  } = useFileTab();

  return (
    <div className="flex h-full shrink-0 flex-col gap-[clamp(0.4rem,1.5vw,0.75rem)] rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50/80 to-white/60 dark:from-zinc-900/70 dark:to-zinc-950/60 px-[clamp(0.4rem,1.5vw,0.75rem)] py-[clamp(0.4rem,1.5vw,0.75rem)] shadow-xl backdrop-blur-2xl transition-all duration-300">
      {/* HEADER */}
      <div className="flex w-full flex-shrink-0 items-center justify-between">
        <div className="flex w-1/2 justify-start">
          <Badge
            variant={isOverLimit ? "destructive" : "secondary"}
            className="rounded-2xl px-[clamp(0.5rem,2vw,1rem)] text-[clamp(0.75rem,2.5vw,0.9rem)] h-[clamp(1.5rem,3vw,2.25rem)]"
          >
            {formatSize(currentTotalSize)} / {formatSize(MAX_TOTAL_SIZE)}
          </Badge>
        </div>

        <div className="flex w-1/2 justify-end gap-[clamp(0.25rem,1vw,0.75rem)]">
          <Button
            size="default"
            variant="outline"
            className="cursor-target rounded-2xl"
            disabled={isOverLimit}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="size-[clamp(0.9rem,2.5vw,1.1rem)]" />
            <span className="hidden sm:flex text-[clamp(0.75rem,2.5vw,1rem)]">
              Choose file
            </span>
          </Button>

          {files.length > 0 ? (
            <DeleteAlertDialog type="file" clearAllContent={() => setFiles([])} />
          ) : (
            <Button variant="destructive" size="icon" disabled className="rounded-2xl">
              <Trash className="size-[clamp(0.9rem,2.5vw,1.1rem)]" />
            </Button>
          )}
        </div>
      </div>

      {/* FILE AREA */}
      <div className="flex flex-1 min-h-0">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e, fileInputRef)}
          accept="*/*"
        />
        <div className={cn("flex-1 min-h-0 rounded-2xl border lg:border-2 lg:border-dashed p-[clamp(0.5rem,2vw,0.6rem)] transition-all duration-200 overflow-y-auto", isDragOver ? "border-primary bg-primary/10" : "border-border lg:hover:border-primary/50", files.length === 0 ? "flex items-center justify-center" : "overflow-y-auto", isOverLimit ? "opacity-50 pointer-events-none" : "")} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onPaste={handlePaste}>
          {files.length > 0 ? (
            <div className="w-full">
              <FileTilesGrid />
            </div>
          ) : (
            <>
              <div className="hidden lg:block">
                <DragAndDrop />
              </div>
              <div className="lg:hidden">
                <NoFileInfo />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};