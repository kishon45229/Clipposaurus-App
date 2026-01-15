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
export const HeaderComponentSchema = z.object({
  title: z.string(),
  description: z.string(),
  keySection: z.object({
    title: z.string(),
    identifierLabel: z.string(),
    systemSecretLabel: z.string(),
    userSecretLabel: z.string(),
    dropKeyLabel: z.string(),
    dropKeyPlaceholder: z.string(),
    inputPlaceholder: z.string(),
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
  mobileMenuButton: z.object({
    label: z.string(),
    loadingLabel: z.string(),
  }),
  ctaButton: z.object({
    label: z.string(),
    loadingLabel: z.string(),
  }),
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
const CtaBtnSchema = z.object({
  label: z.string(),
  loadingLabel: z.string(),
});

const AdditionalInfoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const VerificationStatusSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

const VerificationStatusesSchema = z.object({
  verifying: VerificationStatusSchema,
  notfound: VerificationStatusSchema,
  error: VerificationStatusSchema,
  rateLimited: VerificationStatusSchema,
  decryptionError: VerificationStatusSchema,
});

const ErrorMessageSchema = z.object({
  allEmpty: z.string(),
  oneOrTwoEmpty: z.string(),
  general: z.string(),
});

const EnterKeySchema = z.object({
  title: z.string(),
  inputPlaceholders: z.array(z.string()),
  ctaBtn: CtaBtnSchema,
  hintText: z.string(),
  sampleKey: z.string(),
  additionalInfo: AdditionalInfoSchema,
  errorMessages: ErrorMessageSchema,
});

const VerifyKeySchema = z.object({
  verificationStatuses: VerificationStatusesSchema,
  ctaTryAgainBtn: CtaBtnSchema,
  ctaRateLimitedBtn: CtaBtnSchema,
});

const AccessDropSchema = z.object({
  title: z.string(),
  description: z.string(),
  ctaBtn: CtaBtnSchema,
  additionalInfo: z.string(),
});

const InfoItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

export const UnlockDropComponentSchema = z.object({
  title: z.string(),
  description: z.string(),
  stepIndicators: z.array(z.string()),
  enterKey: EnterKeySchema,
  verifyKey: VerifyKeySchema,
  accessDrop: AccessDropSchema,
  info: z.array(InfoItemSchema),
});

// Footer
export const FooterComponentSchema = z.object({
  brand: z.object({
    name: z.string(),
    description: z.string(),
  }),
  columns: z.array(
    z.object({
      category: z.string(),
      links: z.array(z.string()),
    })
  ),
  copyrightNote: z.string(),
});

// Navbar
export const NavbarComponentSchema = z.object({
  brand: z.object({
    name: z.string(),
    alt: z.string(),
    ariaLabel: z.string(),
    beta: z.object({
      text: z.string(),
      ariaLabel: z.string(),
    }),
  }),
  links: z.object({
    docs: z.string(),
    github: z.string(),
    resources: z.string(),
    help: z.string(),
  }),
  menus: z.object({
    resourcesDropDown: z.object({
      changelog: z.object({
        title: z.string(),
        description: z.string(),
      }),
      terms: z.object({
        title: z.string(),
        description: z.string(),
      }),
      support: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    helpDropDown: z.object({
      faq: z.object({
        title: z.string(),
        description: z.string(),
      }),
      issue: z.object({
        title: z.string(),
        description: z.string(),
      }),
      contact: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    hamburger: z.object({
      openMenu: z.string(),
      documentation: z.string(),
      faq: z.string(),
      github: z.string(),
      changelog: z.string(),
      reportIssue: z.string(),
      termsOfService: z.string(),
      contactUs: z.string(),
      supportProject: z.string(),
    }),
  }),
  themeToggle: z.object({
    ariaLabel: z.string(),
  }),
  ariaLabels: z.object({
    mainNavigation: z.string(),
  }),
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
    options: z.object({
      deleteOnAccess: z.string().min(1).max(150),
      keep30Minutes: z.string().min(1).max(100),
      keep1Hour: z.string().min(1).max(100),
    }),
  }),
  noteSection: z.object({
    label: z.string().min(1).max(50),
    text: z.string().min(1).max(300),
  }),
  mobileMenuButton: z.string(),
  ctaButton: z.string(),
});