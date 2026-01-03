import { NextRequest, NextResponse } from "next/server";
import { upstashRedis } from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const { pageId, type } = await request.json();

    if (!pageId || !["like", "dislike"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid request. pageId and type (like/dislike) required." },
        { status: 400 }
      );
    }

    const key = `docs-feedback:${pageId}`;
    const counts = await upstashRedis.hgetall(key);

    return NextResponse.json({
      success: true,
      counts: {
        likes: counts?.likes || 0,
        dislikes: counts?.dislikes || 0,
      },
    });
  } catch (error) {
    console.error("Error updating docs feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");

    if (!pageId) {
      return NextResponse.json(
        { error: "pageId query parameter required" },
        { status: 400 }
      );
    }

    const key = `docs-feedback:${pageId}`;
    const counts = await upstashRedis.hgetall(key);

    return NextResponse.json({
      success: true,
      counts: {
        likes: counts?.likes || 0,
        dislikes: counts?.dislikes || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching docs feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
