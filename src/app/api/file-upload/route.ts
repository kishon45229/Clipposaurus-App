import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/services/fileService";
import type { FileItem } from "@/types/index";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files }: { files: FileItem[] } = body;

    console.log("File upload request received with files:", files?.length || 0);

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    for (const file of files) {
      console.log("Processing file:", {
        id: file.id,
        name: file.name,
        size: file.size,
        contentType: typeof file.content,
        isEncrypted:
          typeof file.content === "object" &&
          file.content !== null &&
          "encryptedContent" in file.content,
      });

      if (!file.id || !file.name || !file.content || !file.size) {
        console.error("Invalid file structure:", file);
        return NextResponse.json(
          { error: "Invalid file structure" },
          { status: 400 }
        );
      }
    }

    const fileUrls = await uploadFile(files);

    const failedUploads = fileUrls.filter((url) => url === "");
    if (failedUploads.length > 0) {
      console.error(
        "Failed uploads:",
        failedUploads.length,
        "out of",
        fileUrls.length
      );
      return NextResponse.json(
        { error: "Some file uploads failed" },
        { status: 500 }
      );
    }

    console.log("All files uploaded successfully, URLs:", fileUrls);
    return NextResponse.json(
      {
        success: true,
        fileUrls,
        message: "Files uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Internal server error during file upload" },
      { status: 500 }
    );
  }
}
