export const COMPONENT_ORIGINS = [
  "HeroComponent",
  "PrivacyInfoCardComponent",
  "UnlockDropComponent",
  "HeaderComponent",
  "DropPreviewComponent",
  "TermsOfServiceComponent",
  "FAQComponent",
  "FooterComponent",
  "NavbarComponent",
];

export function isValidOrigin(origin: string): boolean {
  return COMPONENT_ORIGINS.includes(origin);
}
