import type { StorageProvider } from "@/types/storage";
import env from "@/lib/env";

function getStorageProviders(): StorageProvider[] {
  return [
    {
      name: "Cloudflare R2",
      endpoint: `${env.CLOUDFLARE_R2_ENDPOINT}`,
      accessKeyId: `${env.CLOUDFLARE_R2_ACCESS_KEY_ID}`,
      secretAccessKey: `${env.CLOUDFLARE_R2_SECRET_ACCESS_KEY}`,
      bucketName: `${env.CLOUDFLARE_R2_BUCKET_NAME}`,
      publicUrl: `${env.CLOUDFLARE_R2_PUBLIC_URL}`,
      quotaLimit: 10 * 1024 * 1024 * 1024, // 10GB free tier
    },
    // {
    //   name: "Backblaze B2",
    //   endpoint: `${process.env.BACKBLAZE_B2_ENDPOINT}`,
    //   accessKeyId: `${process.env.BACKBLAZE_B2_ACCESS_KEY_ID}`,
    //   secretAccessKey: `${process.env.BACKBLAZE_B2_SECRET_ACCESS_KEY}`,
    //   bucketName: `${process.env.BACKBLAZE_B2_BUCKET_NAME}`,
    //   publicUrl: `${process.env.BACKBLAZE_B2_DOWNLOAD_URL}`,
    //   quotaLimit: 10 * 1024 * 1024 * 1024, // 10GB free tier
    // },
  ];
}

export default getStorageProviders;
