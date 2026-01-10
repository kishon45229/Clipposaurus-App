export const COMPONENT_ORIGINS = [
  "HeroComponent",
  "PrivacyInfoCardComponent",
  "UnlockDropComponent",
  "MenuComponent",
  "DropPreviewComponent",
  "TermsOfServiceComponent",
  "FAQComponent",
];

export function isValidOrigin(origin: string): boolean {
  return COMPONENT_ORIGINS.includes(origin);
}
