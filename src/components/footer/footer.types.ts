import { FooterComponentSchema } from "@/lib/schema";
import { z } from "zod";

export type FooterComponent = z.infer<typeof FooterComponentSchema>;