import { NavbarComponentSchema } from "@/lib/schema";
import { z } from "zod";

export type NavbarComponent = z.infer<typeof NavbarComponentSchema>;