import { NextRequest, NextResponse } from "next/server";
import { s3Clients } from "@/lib/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getStorageProviders from "@/constants/getStorageProviders";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, fileSize, fileId } = body;

    if (!fileName || !fileSize || !fileId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const provider = getStorageProviders()[0];
    const s3Client = s3Clients.get(provider.name);

    if (!s3Client) {
      return NextResponse.json(
        { error: "Storage provider not available" },
        { status: 500 }
      );
    }

    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileExtension = path.extname(fileName) || "";
    const fileKey = `files/${timestamp}-${randomSuffix}-${fileId}${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: provider.bucketName,
      Key: fileKey,
      ContentType: "application/json",
      Metadata: {
        "original-name": fileName,
        "file-id": fileId,
        "upload-timestamp": timestamp.toString(),
        encrypted: "true",
      },
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 600,
    });

    const publicUrl = `${provider.publicUrl}/${fileKey}`;

    return NextResponse.json({
      success: true,
      presignedUrl,
      publicUrl,
      fileKey,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
