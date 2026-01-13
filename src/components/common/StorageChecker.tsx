import React from "react";
import { Unavailable } from "@/components/common/Unavailable";
import { checkFileStorageQuota, checkRedisStorageQuota } from "@/lib/storage";
import getStorageProviders from "@/constants/getStorageProviders";

interface Props {
    children: React.ReactNode
}

async function StorageChecker({ children }: Props) {
    const redisQuotaPercentage = await checkRedisStorageQuota();
    if (redisQuotaPercentage >= 95) {
        return <Unavailable />;
    }

    const s3QuotaPercentages = await Promise.all(
        getStorageProviders().map((provider) => checkFileStorageQuota(provider))
    );

    for (const s3QuotaPercentagePerProvider of s3QuotaPercentages) {
        if (s3QuotaPercentagePerProvider < 95) {
            return children;
        }
    }

    return <Unavailable />;
}

const MemorizedStorageChecker = React.memo(StorageChecker);
MemorizedStorageChecker.displayName = "StorageChecker";

export { MemorizedStorageChecker as StorageChecker };