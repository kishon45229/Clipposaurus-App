import { z } from "zod";

export const HeadlineTextSchema = z
  .string()
  .min(1, "Headline text cannot be empty")
  .max(200, "Headline text too long")
  .refine(
    (text) => text.trim().length > 0,
    "Headline text cannot be only whitespace"
  );

export const RequestIdSchema = z
  .string()
  .uuid("Invalid request ID format")
  .or(z.string().min(1, "Request ID cannot be empty"));

export const ButtonTextSchema = z.object({
  default: z.string().min(1, "Default button text is required").max(50),
  loading: z.string().min(1, "Loading button text is required").max(50),
});

export const HeadlinePropsSchema = z.object({
  headlineText: HeadlineTextSchema,
  requestId: RequestIdSchema,
});

export const SaveContentBtnComponentSchema = z.object({
  buttonText: ButtonTextSchema,
  requestId: RequestIdSchema,
});

export const StepSchema = z.object({
  id: z.number().positive(),
  stepName: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
});

export const OptionSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(300),
  ctaButton: z.string().min(1).max(50),
});

export const OptionCardComponentSchema = z.object({
  option: OptionSchema,
  requestId: RequestIdSchema,
});

export const StepsComponentSchema = z.object({
  steps: z.array(StepSchema).min(1).max(20),
  requestId: RequestIdSchema,
});

export const StepCardComponentSchema = z.object({
  step: StepSchema,
  requestId: RequestIdSchema,
});

export const HomePageSchema = z.object({
  headline: z.string().min(1).max(200),
  steps: z.array(StepSchema),
  options: z.array(OptionSchema),
});

export const CreateDropPageSchema = z.object({
  headline: z.string().min(1).max(100),
  buttonText: ButtonTextSchema,
  tabList: z.array(z.string()).optional(),
});

export const OpenDropPageSchema = z.object({
  headline: z.string().min(1).max(100),
  noContent: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(300),
  }),
});

export const DropPreviewComponentSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().min(1).max(200),
  timeRemainingLabel: z.string().min(1).max(50),
  expiredMessage: z.string().min(1).max(50),
  autoDeleteMessage: z.string().min(1).max(200),
  deleteAfterAccessMessage: z.string().min(1).max(300),
  contentsLabel: z.string().min(1).max(50),
});

export const PrivacyPolicySchema = z.object({
  headline: z.string().min(1).max(256),
  lastUpdated: z.string().min(1).max(50),
  sections: z
    .array(
      z.object({
        id: z.string().min(1).max(50),
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(5000),
      })
    )
    .min(1),
});

export const TermsOfServiceSchema = z.object({
  headline: z.string().min(1).max(256),
  lastUpdated: z.string().min(1).max(50),
  sections: z
    .array(
      z.object({
        id: z.string().min(1).max(50),
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(5000),
      })
    )
    .min(1),
});

const DocsHeaderSchema = z.object({
  headline: z.string().min(1).max(256),
  description: z.string().min(1).max(5000),
  lastUpdated: z.string().min(1).max(50),
});

const DocsSectionHeaderSchema = z.object({
  title: z.string().min(1).max(100),
  icon: z.string().min(1).max(50),
});

const DocsSectionContentSchema = z.object({
  id: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
  note: z.string().min(1).max(5000).optional(),
});

const DocsSectionSchema = z.object({
  id: z.string().min(1).max(50),
  sectionHeader: DocsSectionHeaderSchema,
  sectionContents: z.array(DocsSectionContentSchema).min(1),
});

const DocsFooterSchema = z.object({
  id: z.string().min(1).max(50),
  button: z.string().min(1).max(100),
  label: z.string().min(1).max(100),
  url: z.string().min(1).max(500),
});

export const DocsPageSchema = z.object({
  header: DocsHeaderSchema,
  sections: z.array(DocsSectionSchema).min(1),
  footer: z.array(DocsFooterSchema),
});

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

export const HeroComponentSchema = z.object({
  title: z.string().min(1).max(256),
  subTitle: z.string().min(1).max(256),
  rotatingTexts: z.array(z.string().min(1).max(25)),
  descriptionHeadText: z.string().min(1).max(512),
  descriptionBoldTexts: z.array(z.string().min(1).max(25)),
  descriptionTailText: z.string().min(1).max(512),
  ctaButton1: z.string().min(1).max(25),
  ctaButton2: z.string().min(1).max(25),
  consentDescription: z.string().min(1).max(512),
  consentLink1: z.string().min(1).max(100),
  consentLinkSeparator: z.string().min(1).max(10),
  consentLink2: z.string().min(1).max(100),
});

export const OptionComponentSchema = z.object({
  options: z.array(OptionSchema).min(1).max(10),
});

export const CreateDropMenuComponentSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  retentionSettingsTitle: z.string().min(1).max(50),
  retentionOptions: z.object({
    deleteOnAccess: z.string().min(1).max(100),
    keep30Minutes: z.string().min(1).max(100),
    keep1Hour: z.string().min(1).max(100),
  }),
  noteLabel: z.string().min(1).max(10),
  noteText: z.string().min(1).max(500),
  ctaButton: z.string().min(1).max(25),
});

export const MenuComponentSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  keySection: z.object({
    title: z.string().min(1).max(50),
    identifierLabel: z.string().min(1).max(30),
    systemSecretLabel: z.string().min(1).max(30),
    userSecretLabel: z.string().min(1).max(30),
    dropKeyLabel: z.string().min(1).max(20),
    dropKeyPlaceholder: z.string().min(1).max(100),
  }),
  retentionSection: z.object({
    title: z.string().min(1).max(50),
    retentionOptions: z.object({
      deleteOnAccess: z.string().min(1).max(150),
      keep30Minutes: z.string().min(1).max(100),
      keep1Hour: z.string().min(1).max(100),
    }),
  }),
});

export const TermsAndConditionsPageSchema = z.object({
  headline: z.string().min(1).max(256),
  lastUpdated: z.string().min(1).max(50),
  sections: z
    .array(
      z.object({
        id: z.string().min(1).max(50),
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(5000),
      })
    )
    .min(1),
});

export const TermsAndConditionsComponentSchema = z.object({
  headline: z.string().min(1).max(256),
  lastUpdated: z.string().min(1).max(50),
  sections: z
    .array(
      z.object({
        id: z.string().min(1).max(50),
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(5000),
      })
    )
    .min(1),
});
