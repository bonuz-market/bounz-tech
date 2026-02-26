import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bonuz.tech";
  const now = new Date();

  const alternateLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${baseUrl}/${locale}`])
  );

  return [
    // Main page for each locale
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 1 : 0.9,
      alternates: {
        languages: alternateLanguages,
      },
    })),
    // Section anchors (English canonical)
    {
      url: `${baseUrl}/en#what-we-do`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en#our-work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en#founder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en#request-intro`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
