import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Your Drop - View your Shared Text, Code Snippets & Files",
    description: "Access your shared content with drop key. View uploaded files, code snippets, and text content securely. Download files or copy code instantly.",
    keywords: [
        "view shared content",
        "access files",
        "code viewer",
        "file download",
        "drop key",
        "secure access",
        "shared content",
        "code show content"
    ],
    openGraph: {
        title: "Your Drop - View your Shared Text, Code Snippets & Files",
        description: "Access your shared content with drop key. View uploaded files, code snippets, and text content securely. Download files or copy code instantly.",
        url: "/open-drop",
        type: "website",
        images: [
            {
                url: "/og-showcase.png",
                width: 1200,
                height: 630,
                alt: "View and access shared content with Clipposaurus",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Your Drop - View your Shared Text, Code Snippets & Files",
        description: "Access your shared content with drop key. View uploaded files, code snippets, and text content securely. Download files or copy code instantly.",
        images: ["/twitter-showcase.png"],
    },
    alternates: {
        canonical: "/showcase",
    },
}

export default function ShowcaseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
