import env from "@/lib/env";
import { isValidOrigin } from "@/lib/page-data/config";

const CONTENTFUL_COMPONENT_ID_MAP: Record<string, string> = {
  HeroComponent: env.CONTENTFUL_HERO_COMPONENT_ID,
  OptionsComponent: env.CONTENTFUL_OPTIONS_COMPONENT_ID,
  InputCodeComponent: env.CONTENTFUL_INPUT_CODE_COMPONENT_ID,
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ componentId: string }> }
) {
  const { componentId } = await params;

  if (!isValidOrigin(componentId)) {
    return Response.json(
      { error: `Invalid page origin: ${componentId}` },
      { status: 400 }
    );
  }

  const entryId = CONTENTFUL_COMPONENT_ID_MAP[componentId];
  if (!entryId) {
    return Response.json(
      { error: `Unknown component "${componentId}"` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${env.CONTENTFUL_SPACE_ID}/entries/${entryId}?access_token=${env.CONTENTFUL_ACCESS_TOKEN}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Contentful: ${response.status} ${response.statusText}`
      );
    }

    const entry: Record<string, unknown> = await response.json();
    const fields = entry.fields as Record<string, unknown>;

    return Response.json(fields);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
