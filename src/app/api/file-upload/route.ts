import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/services/fileService";
import type { FileItem } from "@/types/index";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files, streaming }: { files: FileItem[]; streaming?: boolean } = body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    for (const file of files) {
      if (!file.id || !file.name || !file.content || !file.size) {
        return NextResponse.json(
          { error: "Invalid file structure" },
          { status: 400 }
        );
      }
    }

    if (streaming) {
      const encoder = new TextEncoder();
      
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const fileUrls = await uploadFile(files, (completed, total) => {
              const progress = Math.round((completed / total) * 100);
              const message = JSON.stringify({ progress, completed, total }) + "\n";
              controller.enqueue(encoder.encode(message));
            });

            const failedUploads = fileUrls.filter((url) => url === "");
            if (failedUploads.length > 0) {
              const errorMessage = JSON.stringify({ error: "Some file uploads failed" }) + "\n";
              controller.enqueue(encoder.encode(errorMessage));
            } else {
              const successMessage = JSON.stringify({ success: true, fileUrls }) + "\n";
              controller.enqueue(encoder.encode(successMessage));
            }
            
            controller.close();
          } catch (error) {
            const errorMessage = JSON.stringify({ error: "Upload failed" }) + "\n";
            controller.enqueue(encoder.encode(errorMessage));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // Non-streaming fallback
    const fileUrls = await uploadFile(files);

    const failedUploads = fileUrls.filter((url) => url === "");
    if (failedUploads.length > 0) {
      return NextResponse.json(
        { error: "Some file uploads failed" },
        { status: 500 }
      );
    }
    
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
