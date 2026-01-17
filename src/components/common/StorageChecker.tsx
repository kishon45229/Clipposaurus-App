import React from "react";
import { Unavailable } from "@/components/common/Unavailable";
import { checkRedisStorageQuota } from "@/lib/storage";

interface Props {
    children: React.ReactNode
}

export const StorageChecker = async ({ children }: Props) => {
    const redisQuotaPercentage = await checkRedisStorageQuota();
    if (redisQuotaPercentage >= 95) {
        return <Unavailable />;
    }

    return children;
}
