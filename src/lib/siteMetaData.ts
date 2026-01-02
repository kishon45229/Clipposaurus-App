import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default:
      "Clipposaurus - End to End Encrypted Text, Code Snippet and File Sharing",
    template: "%s | Clipposaurus",
  },
  description:
    "Clipposaurus is the fastest way to share text, code snippets, and files securely between devices. No account required, fully encrypted, and free to use.",
  keywords: [
    "file sharing",
    "code sharing",
    "text sharing",
    "secure sharing",
    "cross-device sync",
    "clipboard sync",
    "no account required",
    "encrypted sharing",
    "temporary file storage",
    "drop key",
    "instant sharing",
    "clipposaurus",
  ],
  authors: [{ name: "Clipposaurus Team" }],
  creator: "Clipposaurus",
  publisher: "Clipposaurus",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://clipposaurus.com"
  ),
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Clipposaurus - End to End Encrypted Text, Code Snippet and File Sharing",
    description:
      "Clipposaurus is the fastest way to share text, code snippets, and files securely between devices. No account required, fully encrypted, and free to use.",
    url: "/",
    siteName: "Clipposaurus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clipposaurus - Secure File & Code Sharing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipposaurus - Secure File & Code Sharing",
    description:
      "Share text, code snippets, and files securely between devices. No account required, fully encrypted, and free to use.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
};
