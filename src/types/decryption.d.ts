export interface DecryptedDrop {
  identifier: string;
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

export interface DecryptionResult {
  success: boolean;
  data?: DecryptedDrop;
  error?: string;
}
