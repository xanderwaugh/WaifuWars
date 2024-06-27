import { z } from "zod";

// * English and Japanese
export const locales = ["en", "ja"] as const;

// * Check if the locale is valid
export const localeSchema = z.enum(locales);
export type ILocale = z.infer<typeof localeSchema>;
