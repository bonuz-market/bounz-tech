import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bonuz.tech";
  const now = new Date();

  const alternateLanguages: Record<string, string> = {
    "x-default": `${baseUrl}/en`,
  };
  for (const locale of locales) {
    alternateLanguages[locale] = `${baseUrl}/${locale}`;
  }

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: alternateLanguages,
    },
  }));
}
