import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clipposaurus - Secure Text & Code Sharing",
    short_name: "Clipposaurus",
    description:
      "Securely share text and code snippets between devices instantly. No account required.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["productivity", "utilities"],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Clipposaurus desktop interface",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "375x812",
        type: "image/png",
        form_factor: "narrow",
        label: "Clipposaurus mobile interface",
      },
    ],
  };
}
