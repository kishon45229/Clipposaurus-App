"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getDropSession } from "@/lib/sessionStorage";
import { navigation } from "@/lib/navigation";

interface DropRouteProtectionProps {
    children: React.ReactNode;
}

/**
 * PROTECTS THE /OPEN-DROP ROUTE BY CHECKING SESSION STORAGE
 */
export function DropRouteProtection({ children }: DropRouteProtectionProps): React.ReactElement | null {
    const router = useRouter();
    const [isValidated, setIsValidated] = React.useState(false);

    React.useEffect(() => {
        if (!getDropSession()) {
            alert("No drop session found. Redirecting to home page.");
            router.replace(navigation.home);
            return;
        }

        setIsValidated(true);
    }, [router]);

    if (!isValidated) {
        return null;
    }

    return <>{children}</>;
}