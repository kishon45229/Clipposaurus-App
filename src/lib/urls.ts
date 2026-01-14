export const APP_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_APP_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_APP_URL;
export const DOCS_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_DOCS_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_DOCS_URL;
export const MARKETING_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_MARKETING_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_MARKETING_URL;
export const GITHUB_REPO_URL = process.env.NEXT_PUBLIC_GITHUB_REPO_URL;
export const GITHUB_ISSUES_URL = process.env.NEXT_PUBLIC_GITHUB_ISSUES_URL;
export const GITHUB_SPONSOR_URL = process.env.NEXT_PUBLIC_GITHUB_SPONSOR_URL;
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CLIPPOSAURUS_CONTACT_EMAIL;
