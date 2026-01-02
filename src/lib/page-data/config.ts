export const COMPONENT_ORIGINS = [
  "HeroComponent",
  "PrivacyInfoCardComponent",
  "UnlockDropDialogBoxComponent",
  "ComparisonComponent",
  "DesignComponent",
  "ContentTypesComponent",
  "PlatformComponent",
  "TestimonialsComponent",
  "PrivacyComponent",
  "OptionsComponent",
  "MenuComponent",
  "DocsComponent",
  "DropPreviewComponent",
  "TermsOfServiceComponent",
  "FAQPage",
  "ChangelogPage"
];

export function isValidOrigin(origin: string): boolean {
  return COMPONENT_ORIGINS.includes(origin);
}
