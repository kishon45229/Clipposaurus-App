import React from "react";
import { getSiteJsonLd } from "@/lib/jsonLd";

interface HeadTagsProps {
  nonce?: string;
}

export const HeadTags = ({ nonce }: HeadTagsProps): React.ReactNode => {
  const jsonLd = JSON.stringify(getSiteJsonLd()).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" nonce={nonce}>
        {jsonLd}
      </script>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="apple-mobile-web-app-title" content="Clipposaurus" />
    </>
  );
};