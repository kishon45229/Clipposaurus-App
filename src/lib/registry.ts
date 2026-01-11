import { z } from "zod";
import {
  DropPreviewComponentSchema,
  FAQComponentSchema,
  HeroComponentSchema,
  HeaderComponentSchema,
  PrivacyInfoCardComponentSchema,
  TermsOfServiceComponentSchema,
  UnlockDropComponentSchema,
} from "@/lib/schema";

/**
 * Global schema registry for all components
 */
export const COMPONENT_SCHEMAS: Record<string, z.ZodSchema> = {
  UnlockDropComponent: UnlockDropComponentSchema,
  PrivacyInfoCardComponent: PrivacyInfoCardComponentSchema,
  HeaderComponent: HeaderComponentSchema,
  FAQComponent: FAQComponentSchema,
  HeroComponent: HeroComponentSchema,
  DropPreviewComponent: DropPreviewComponentSchema,
  TermsOfServiceComponent: TermsOfServiceComponentSchema,
};
