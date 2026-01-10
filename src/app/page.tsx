import { redirect } from "next/navigation";

/**
 * Root page redirect handler
 * Development: Redirects http://localhost:3000 -> http://localhost:3002
 * Production: Redirects https://app.clipposaurus.com/ -> https://clipposaurus.com/
 */
export default function RootPage() {
  const isDevelopment = process.env.NODE_ENV === "development";

  const redirectUrl = isDevelopment
    ? "http://localhost:3002"
    : "https://clipposaurus.com/";

  redirect(redirectUrl);
}
