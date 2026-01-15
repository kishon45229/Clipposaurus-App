import { MenuComponentSchema } from "@/lib/schema";
import { z } from "zod";

export type MenuComponentType = z.infer<typeof MenuComponentSchema>;