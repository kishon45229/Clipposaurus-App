import { NextRequest, NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";
import env from "@/lib/env";
import { deleteFiles } from "@/services/fileService";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { identifier, preserveFiles = false } = await request.json();
    if (!identifier) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifier is required",
        },
        { status: 400 }
      );
    }

    const dropKey = `${env.DROP}:${identifier}`;
    const dropFilesKey = `drop-files:${identifier}`;

    const storedDrop = await upstashRedis.get(dropKey);
    const storedFileUrls = await upstashRedis.get(dropFilesKey);

    let fileUrls: string[] = [];

    if (storedDrop) {
      try {
        const parsedDrop =
          typeof storedDrop === "object" && storedDrop !== null
            ? storedDrop
            : JSON.parse(storedDrop as string);

        if (Array.isArray(parsedDrop?.files)) {
          fileUrls = parsedDrop.files
            .map((file: { url?: string }) => file?.url)
            .filter((url: string | undefined): url is string => Boolean(url));
        }
      } catch (error) {
        throw error;
      }
    }

    if (Array.isArray(storedFileUrls) && storedFileUrls.length > 0) {
      fileUrls = [...fileUrls, ...storedFileUrls];
    } else if (typeof storedFileUrls === "string") {
      try {
        const parsed = JSON.parse(storedFileUrls) as unknown;
        if (Array.isArray(parsed)) {
          fileUrls = [...fileUrls, ...parsed.filter(Boolean)];
        }
      } catch (error) {
        throw error;
      }
    }

    const uniqueFileUrls = Array.from(new Set(fileUrls)).filter(Boolean);

    if (!preserveFiles && uniqueFileUrls.length > 0) {
      await deleteFiles(uniqueFileUrls);
      await upstashRedis.del(dropFilesKey);
    }

    // If preserving files (delete-on-access), keep drop-files key so the cleanup job can remove objects shortly after.
    await upstashRedis.del(dropKey);
    await upstashRedis.del(`used:${identifier}`);
    await upstashRedis.sadd("available_keys", identifier);

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete drop. Please try again.",
      },
      { status: 500 }
    );
  }
}
