import { DocsHeader } from "./docs";
import { EncryptedData } from "./encryption";

// Content types
export type Header = string;
export type Description = string;
export type Paragraph = string;

// Log types
export type LogLevel = "info" | "warn" | "error";
export interface CreateLogger {
  info: (msg?: unknown) => void;
  warn: (msg?: unknown) => void;
  error: (msg?: unknown) => void;
}

export interface Logger {
  info: (message: string, meta: Record<string, unknown>) => void;
  warn: (message: string, meta: Record<string, unknown>) => void;
  error: (message: string, meta: Record<string, unknown>) => void;
}

export interface AppError extends Error {
  cause?: unknown;
  digest?: string;
  origin?: string;
}

// Constants
export type ErrorMsg = {
  notDefined: string;
  failedToCreateClient: string;
  failedToRetrieveContent: string;
  failedToReadJsonFile: string;
  attemptFailed: string;
  failedToRetrieveDbInstance: string;
  fileMissing: string;
  invalidJsonFile: string;
  invalidOrigin: string;
  failedToAssignSchema: string;
  jsonValidationFailed: string;
  contentFetchFailed: string;
  internalError: string;
  failedToFetch: string;
  missingProps: string;

  INVALID_PAGE_DATA: string;
  INCOMPLETE_PAGE_DATA: string;
  unknownError: string;

  rollbarNotAvailable: string;
  failedToReportToRollbar: string;
};

export interface UITexts {
  devErrorTitle: string;
  userErrorTitle: string;
  userDescription: string;
  devDescription: string;
  userPageLoadFailed: string;
  devPageLoadFailed: string;
  supportId: string;
  tryAgain: string;
}

export interface ButtonText {
  default: string;
  loading: string;
}

export type Step = {
  id: number;
  stepName: string;
  description: string;
};

export interface Option {
  id: number;
  title: string;
  description: string;
  ctaButton: string;
}

export interface OptionsComponent {
  options: Option[];
}

export interface HomePage {
  headline: string;
  steps: Step[];
  options: Option[];
}

export interface HeroFeature {
  icon: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PrivacyPillar {
  title: string;
  detail: string;
  icon: string;
}

export interface HeroComponent {
  badge: string;
  title: string;
  titleHighlight: string;
  subTitle: string;
  rotatingTexts: string[];
  description: string;
  ctaButton1: string;
  ctaButton2: string;
  features: HeroFeature[];

  consentDescription: string;
  consentLink1: string;
  consentLinkSeparator: string;
  consentLink2: string;
}

export interface PrivacyInfoCardComponent {
  title: string;
  subtitle: string;
  privacyPillars: PrivacyPillar[];
  stats: Stat[];
}

export interface UnlockDropDialogBoxComponent {
  title: string;
  description: string;
  ctaBtn: {
    label: string;
    loadingLabel: string;
  };
  hintText: string;
  sampleKey: string;
}

export interface ComparisonComponent {
  title: string;
  description: string;
  headers: string[];
  rows: string[][];
}

export interface DesignStage {
  title: string;
  icon: string;
  description: string;
}

export interface DesignComponent {
  title: string;
  description: string;
  stages: DesignStage[];
}

export interface ContentTypeItem {
  title: string;
  items: string[];
}

export interface ContentTypesComponent {
  title: string;
  description: string;
  contentTypes: ContentTypeItem[];
}

export interface PlatformData {
  Desktop: string;
  Mobile: string;
  Browser: string;
}

export interface PlatformComponent {
  title: string;
  description: string;
  platforms: PlatformData;
}

export interface PrivacyPanel {
  icon: "x" | "check";
  title: string;
  items: string[];
}

export interface PrivacyComponent {
  title: string;
  description: string;
  panels: PrivacyPanel[];
}

export interface Testimonial {
  title: string;
  quote: string;
}

export interface TestimonialsComponent {
  title: string;
  description: string;
  testimonials: Testimonial[];
}

export interface CreateDropPage {
  headline: string;
  buttonText: ButtonText;
  tabList: string[];
}

export type CollectContentPage = {
  title: string;
  description: string;
};

export type FooterSection = {
  text: string;
};

export interface ContentOption {
  id: number;
  buttonText: ButtonText;
}

export interface NoContent {
  title: string;
  description: string;
}

export interface OpenDropPage {
  headline: string;
  contentOptions: ContentOption[];
  noContent: NoContent;
}

export interface DropPreviewComponent {
  title: string;
  subtitle: string;
  timeRemainingLabel: string;
  expiredMessage: string;
  autoDeleteMessage: string;
  deleteAfterAccessMessage: string;
  contentsLabel: string;
}

export type Connection = {
  ok: boolean;
  data?: import("mongodb").Db;
  error?: string;
};

export type DragAndDropOptions = {
  processFile?: (
    file: File,
    onProgress?: (progress: number) => void
  ) => Promise<FileItem>;
  currentTotalSize?: number;
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  onError?: (error: string) => void;
};

export type CodeCardProps = {
  codeContent: string;
  setCodeContent: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  autoDetectLanguage: boolean;
  setAutoDetectLanguage: React.Dispatch<React.SetStateAction<boolean>>;
};

// Enhanced types for code editor functionality
export interface CodeEditorLanguage {
  id: string;
  name: string;
  extensions: string[];
  mimeTypes?: string[];
}

export interface CodeEditorConfig {
  theme: "light" | "dark" | "auto";
  fontSize: number;
  lineHeight: number;
  tabSize: number;
  showLineNumbers: boolean;
  wordWrap: boolean;
  MAX_LINES?: number;
}

export interface UseCodeOptions {
  codeContent: string;
  setCodeContent: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  autoDetectLanguage: boolean;
  setAutoDetectLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  MAX_LINES?: number;
}

/**
 * Validation result interface
 */
export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UploadedFileItem {
  id: string;
  name: string;
  url: string;
  size: number;
}

export interface RetrivedDrop {
  textContent?: EncryptedData;
  codeContent?: EncryptedData;
  codeLanguage?: EncryptedData;
  files?: StoredFileItem[];
  retention: EncryptedData;
  createdAt: EncryptedData;
  expiresAt: EncryptedData;
}

export interface DecryptedDrop {
  identifier: string;
  /** Full drop key string used for decrypting files (identifier-systemSecret-userSecret) */
  dropKey?: string;
  decryptedText?: string;
  decryptedCode?: string;
  decryptedLanguage?: string;
  decryptedFiles?: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
  }>;
  decryptedRetentionPeriod: string;
  decryptedCreatedDateTime: Date;
  decryptedExpirationDateTime: Date;
}

export interface FileItem {
  id: string; // Unique identifier (generate this when processing)
  name: string; // File name
  size: number; // File size in bytes
  content: string; // Processed content (e.g., base64 string)
  file: File; // Native File object for access to file properties
}

export interface StoredFileItem {
  id: EncryptedData; // Encrypted unique identifier
  name: EncryptedData; // Encrypted file name
  size: EncryptedData; // Encrypted file size
  url: string; // Storage URL (not encrypted)
}

export interface AccordionItem {
  id: number;
  title: string;
  description: string; // HTML string for the content
}

export interface PageData {
  headline: string;
  lastUpdated: string;
  sections: AccordionItem[];
}

export type PrivacyPolicy = PageData;

export type Terms = PageData;

export interface TermsOfServiceComponent {
  headline: string;
  lastUpdated: string;
  sections: AccordionItem[];
}


export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  description?: string;
  questions: FAQQuestion[];
}

export interface FAQComponent {
  headline: string;
  description: string;
  lastUpdated: string;
  categories: FAQCategory[];
}

export interface ChangelogItem {
  title: string;
  description: string;
}

export interface ChangelogCategory {
  category: string;
  items: ChangelogItem[];
}

export interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "patch";
  changes: ChangelogCategory[];
}

export interface ChangelogComponent {
  headline: string;
  description: string;
  releases: ChangelogRelease[];
}

// Documentation types

export type DropKeyVerificationRequestStatus =
  | "verifying"
  | "success"
  | "error"
  | "idle"
  | "notfound"
  | "rateLimited"
  | "incomplete"
  | "decryptionError";
export type CreateDropRequestStatus =
  | "redirecting"
  | "success"
  | "error"
  | "idle"
  | "rateLimited";
export type CreateDropAlertStatus =
  | "creating"
  | "success"
  | "error"
  | "idle"
  | "rateLimited"
  | "empty"
  | "nullUserSecret";

export type OpenDropAlertStatus =
  | "idle"
  | "opening"
  | "decrypting"
  | "common-error"
  | "copy-error"
  | "download-error"
  | "decryption-error"
  | "drop-deleted-on-access"
  | "invalidKey"
  | "networkError"
  | "serverError"
  | "not-found"
  | "expired"
  | "rateLimited"
  | "decryptionFailed"
  | "deleteOnAccess";

export type DropContentType = "note" | "code" | "files";

export interface OpenDropRequestResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface MenuComponent {
  title: string;
  description: string;
  keySection: {
    title: string;
    identifierLabel: string;
    systemSecretLabel: string;
    userSecretLabel: string;
    dropKeyLabel: string;
    dropKeyPlaceholder: string;
  };
  retentionSection: {
    title: string;
    options: {
      deleteOnAccess: string;
      keep30Minutes: string;
      keep1Hour: string;
    };
  };
  noteSection: {
    label: string;
    text: string;
  };
  mobileMenuButton: string;
  ctaButton: string;
}

// Home Introduction Component Types
export interface HomeIntroductionHero {
  title: string;
  description: string;
}

export interface HomeIntroductionComparisonData {
  headers: string[];
  rows: string[][];
}

export interface HomeIntroductionDesignStep {
  title: string;
  icon: string;
  description: string;
}

export type HomeIntroductionDesignData = HomeIntroductionDesignStep[];

export interface HomeIntroductionContentType {
  title: string;
  items: string[];
}

export type HomeIntroductionContentTypesData = HomeIntroductionContentType[];

export interface HomeIntroductionPrivacyPanel {
  title: string;
  icon: string;
  items: string[];
}

export interface HomeIntroductionPrivacyData {
  panels: HomeIntroductionPrivacyPanel[];
}

export interface HomeIntroductionPlatformData {
  platforms: {
    Desktop: string;
    Mobile: string;
    Browser: string;
  };
}

export interface HomeIntroductionTestimonial {
  title: string;
  quote: string;
}

export type HomeIntroductionTestimonialsData = HomeIntroductionTestimonial[];

export interface HomeIntroductionCtaLink {
  text: string;
  href: string;
  style: string;
}

export interface HomeIntroductionCtaData {
  links: HomeIntroductionCtaLink[];
}

export interface HomeIntroductionSection {
  id: string;
  title: string;
  type: string;
  description?: string;
  data:
    | HomeIntroductionComparisonData
    | HomeIntroductionDesignData
    | HomeIntroductionContentTypesData
    | HomeIntroductionPrivacyData
    | HomeIntroductionPlatformData
    | HomeIntroductionTestimonialsData
    | HomeIntroductionCtaData;
}

export interface HomeIntroductionComponent {
  hero: HomeIntroductionHero;
  sections: HomeIntroductionSection[];
}
