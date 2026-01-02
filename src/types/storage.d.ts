export interface StorageProvider {
  name: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
  quotaLimit: number;
}

export interface StorageQuota {
  used: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  provider?: string;
}

export interface StorageService {
  uploadFile(file: FileToUpload): Promise<UploadResult>;
  checkQuota(provider: StorageProvider): Promise<StorageQuota>;
  deleteFile(url: string): Promise<boolean>;
}

export interface FileToUpload {
  id: string;
  name: string;
  content: string; // base64 or string content
  size: number;
  lastModified: number;
}

export interface StoredFileReference {
  id: string;
  name: string;
  url: string;
  size: number;
  lastModified: number;
  provider: string;
}
