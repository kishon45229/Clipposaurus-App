"use client";

import React from "react";
import { sendDeleteDropRequest } from "@/services/dropService";
import { useOpenDropManager } from "./useOpenDropManager";

interface DeleteDropManagerReturn {
  deleteOnAccess: boolean;
  setDeleteOnAccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useDeleteDropManager(): DeleteDropManagerReturn {
  const [deleteOnAccess, setDeleteOnAccess] = React.useState<boolean>(false);

  const { decryptedDrop, setAlertType } = useOpenDropManager();

  const autoDeleteTriggeredRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (decryptedDrop.decryptedRetentionPeriod === "delete-on-access") {
      setDeleteOnAccess(true);
    }
  }, [decryptedDrop.decryptedRetentionPeriod]);

  React.useEffect(() => {
    if (!deleteOnAccess) return;
    if (autoDeleteTriggeredRef.current) return;
    if (!decryptedDrop.identifier) return;

    autoDeleteTriggeredRef.current = true;

    (async () => {
      try {
        const dropDeleteResult = await sendDeleteDropRequest(
          decryptedDrop.identifier,
          { preserveFiles: true }
        );
        if (!dropDeleteResult.success) {
          setAlertType("common-error");
          return;
        }
        setAlertType("drop-deleted-on-access");
      } catch {
        setAlertType("common-error");
      }
    })();
  }, [deleteOnAccess, decryptedDrop.identifier, setAlertType]);

  return {
    deleteOnAccess,
    setDeleteOnAccess,
  };
}
