import { z } from "zod";
import {
  ChangelogComponentSchema,
  DocsComponentSchema,
  DropPreviewComponentSchema,
  FAQComponentSchema,
  HeroComponentSchema,
  MenuComponentSchema,
  PrivacyInfoCardComponentSchema,
  TermsOfServiceComponentSchema,
  UnlockDropDialogBoxComponentSchema,
} from "@/lib/schema";

/**
 * Global schema registry for all components
 */
export const COMPONENT_SCHEMAS: Record<string, z.ZodSchema> = {
  UnlockDropDialogBoxComponent: UnlockDropDialogBoxComponentSchema,
  PrivacyInfoCardComponent: PrivacyInfoCardComponentSchema,
  MenuComponent: MenuComponentSchema,
  FAQComponent: FAQComponentSchema,
  DocsComponent: DocsComponentSchema,
  ChangelogComponent: ChangelogComponentSchema,
  HeroComponent: HeroComponentSchema,
  DropPreviewComponent: DropPreviewComponentSchema,
  TermsOfServiceComponent: TermsOfServiceComponentSchema,
};
