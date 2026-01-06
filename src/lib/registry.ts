import { z } from "zod";
import {
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
  HeroComponent: HeroComponentSchema,
  DropPreviewComponent: DropPreviewComponentSchema,
  TermsOfServiceComponent: TermsOfServiceComponentSchema,
};
