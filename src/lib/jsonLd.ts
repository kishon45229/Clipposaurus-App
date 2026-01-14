import { APP_URL } from "@/lib/urls";

export function getSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${APP_URL}/#webapplication`,
        name: "Clipposaurus",
        url: APP_URL,
        description:
          "Secure file and code sharing platform with zero-knowledge encryption and no account required",
        applicationCategory: "SecurityApplication",
        applicationSubCategory: "File Sharing",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Zero-knowledge encryption",
          "No account required",
          "Auto-expiring drops",
          "File sharing up to 50MB",
          "Code snippet sharing",
          "Text or notes sharing",
          "End-to-end encryption",
        ],
        potentialAction: [
          {
            "@type": "CreateAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${APP_URL}/create-drop`,
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            name: "Create Drop",
          },
          {
            "@type": "ViewAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${APP_URL}/open-drop`,
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            name: "Open Drop",
          },
        ],
        publisher: {
          "@id": `${APP_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        name: "Clipposaurus",
        url: "https://clipposaurus.com",
        logo: {
          "@type": "ImageObject",
          url: `${APP_URL}/logo.png`,
          width: "512",
          height: "512",
        },
      },
    ],
  };
}
