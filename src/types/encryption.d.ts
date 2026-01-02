export interface EncryptedData {
  encryptedContent: string;
  iv: string;
  salt: string;
  authTag: string;
  nonce: string;
}

export interface EncryptionResult {
  success: boolean;
  data?: EncryptedData;
  error?: string;
}