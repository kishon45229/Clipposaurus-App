import { z } from "zod";
import {
  HeadlinePropsSchema,
  OptionComponentSchema,
  OptionCardComponentSchema,
  SaveContentBtnComponentSchema,
  HomePageSchema,
  CreateDropPageSchema,
  StepsComponentSchema,
  StepCardComponentSchema,
  OpenDropPageSchema,
  DropPreviewComponentSchema,
  PrivacyPolicySchema,
  TermsOfServiceSchema,
  DocsPageSchema,
  HeroComponentSchema,
  TermsAndConditionsPageSchema,
  TermsAndConditionsComponentSchema
} from "@/lib/schema";

/**
 * Global schema registry for all components
 */
export const COMPONENT_SCHEMAS: Record<string, z.ZodSchema> = {
  HeadlineComponent: HeadlinePropsSchema,
  SaveContentBtnComponent: SaveContentBtnComponentSchema,
  OptionsComponent: OptionComponentSchema,
  OptionCardComponent: OptionCardComponentSchema,
  StepsComponent: StepsComponentSchema,
  StepCardComponent: StepCardComponentSchema,
  HeroComponent: HeroComponentSchema,
  DropPreviewComponent: DropPreviewComponentSchema,
  TermsAndConditionsComponent: TermsAndConditionsComponentSchema,
  // InputCodeComponent: InputCodeSchema
};

/**
 * Page data schemas registry
 */
export const PAGE_SCHEMAS: Record<string, z.ZodSchema> = {
  HomePage: HomePageSchema,
  CreateDropPage: CreateDropPageSchema,
  OpenDropPage: OpenDropPageSchema,
  PrivacyPolicyPage: PrivacyPolicySchema,
  TermsOfServicePage: TermsOfServiceSchema,
  DocsPage: DocsPageSchema,
  TermsAndConditionsPage: TermsAndConditionsPageSchema,
};
