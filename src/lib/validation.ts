import { COMPONENT_SCHEMAS } from "@/lib/registry";

export function validateComponentData(data: unknown, componentId: string): boolean {
  try {
    const schema = COMPONENT_SCHEMAS[componentId];
    if (!schema) return false;

    return schema.parse(data) ? true : false;
  } catch (error) {
    throw error;
  }
}
