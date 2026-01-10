import { z } from "zod";

export const DecryptedDropSchema = z.object({
  identifier: z.string().min(1),
  dropKey: z.string().optional(),
  decryptedText: z.string().optional(),
  decryptedCode: z.string().optional(),
  decryptedLanguage: z.string().optional(),
  decryptedFiles: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  decryptedRetentionPeriod: z.string(),
  decryptedCreatedDateTime: z.union([z.date(), z.string()]).transform((val) => {
    return val instanceof Date ? val : new Date(val);
  }),
  decryptedExpirationDateTime: z
    .union([z.date(), z.string()])
    .transform((val) => {
      return val instanceof Date ? val : new Date(val);
    }),
});

// Drop Preview
export const DropPreviewComponentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  timeRemainingLabel: z.string(),
  expiredMessage: z.string(),
  autoDeleteMessage: z.string(),
  deleteAfterAccessMessage: z.string(),
  contentsLabel: z.string(),
});

// FAQ
const FAQQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const FAQCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(FAQQuestionSchema),
});

export const FAQComponentSchema = z.object({
  headline: z.string(),
  description: z.string(),
  lastUpdated: z.string(),
  categories: z.array(FAQCategorySchema),
});

// Hero
export const HeroComponentSchema = z.object({
  title: z.string(),
  titleHighlight: z.string(),
  description: z.string(),
  ctaButton1: z.string(),
  ctaButton2: z.string(),
  consentDescription: z.string(),
  consentLink: z.string(),
});

// Menu
export const MenuComponentSchema = z.object({
  title: z.string(),
  description: z.string(),
  keySection: z.object({
    title: z.string(),
    identifierLabel: z.string(),
    systemSecretLabel: z.string(),
    userSecretLabel: z.string(),
    dropKeyLabel: z.string(),
    dropKeyPlaceholder: z.string(),
  }),
  retentionSection: z.object({
    title: z.string(),
    options: z.object({
      deleteOnAccess: z.string(),
      keep30Minutes: z.string(),
      keep1Hour: z.string(),
    }),
  }),
  noteSection: z.object({
    label: z.string(),
    text: z.string(),
  }),
  mobileMenuButton: z.string(),
  ctaButton: z.string(),
});

// Privacy Info Card
const StatSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const PrivacyPillarSchema = z.object({
  title: z.string(),
  detail: z.string(),
  icon: z.string(),
});

export const PrivacyInfoCardComponentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  privacyPillars: z.array(PrivacyPillarSchema),
  stats: z.array(StatSchema),
});

// Terms of Service
const AccordionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const TermsOfServiceComponentSchema = z.object({
  headline: z.string(),
  lastUpdated: z.string(),
  sections: z.array(AccordionItemSchema),
});

// Unlock Drop Dialog Box
export const UnlockDropComponentSchema = z.object({
  title: z.string(),
  description: z.string(),
  ctaBtn: z.object({
    label: z.string(),
    loadingLabel: z.string(),
  }),
  hintText: z.string(),
  sampleKey: z.string(),
});
