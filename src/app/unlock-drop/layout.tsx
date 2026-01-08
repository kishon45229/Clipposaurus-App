import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unlock Drop - Clipposaurus",
    description: "Enter your drop key to unlock and access your encrypted drop.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function UnlockDropLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return <>{children}</>;
}
