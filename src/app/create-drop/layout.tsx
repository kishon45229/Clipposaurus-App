import { Metadata } from 'next';
import { Suspense } from 'react';
import LoadingFallback from '@/app/loading';

interface CreateDropLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Create Drop - Type or paste text, code snippets, or upload files",
    description: "Securely paste text, or code snippets and upload files up to 50MB. Get drop key to access your content from any device. No account required.",
    keywords: [
        "upload files",
        "share code",
        "paste text",
        "file upload",
        "code sharing",
        "secure upload",
        "temporary storage",
        "drop key",
        "cross device sharing",
        "clipboard sync",
        "file transfer",
        "secure sharing",
        "create drop"
    ],
    openGraph: {
        title: "Create Drop - Type or paste text, code snippets, or upload files",
        description: "Securely paste text, or code snippets and upload files up to 50MB. Get drop key to access your content from any device. No account required.",
        url: "/create-drop",
        type: "website",
        images: [
            {
                url: "/og-create-drop.png",
                width: 1200,
                height: 630,
                alt: "Share text, code snippets and files with Clipposaurus",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Create Drop - Type or paste text, code snippets, or upload files",
        description: "Securely paste text, or code snippets and upload files up to 50MB. Get drop key to access your content from any device. No account required.",
        images: ["/twitter-create-drop.png"],
    },
    alternates: {
        canonical: "/create-drop",
    },
};

/**
 * CreateDrop Layout Component
 * @param props - Layout props containing children components
 * @returns JSX.Element with optimized layout structure
 */
export default function CreateDropLayout({
    children,
}: CreateDropLayoutProps): React.ReactElement {
    return (
        <Suspense fallback={<LoadingFallback />}>
            {children}
        </Suspense>
    );
}
