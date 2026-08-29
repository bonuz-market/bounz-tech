import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://bonuz.tech";

	const alternateLanguages: Record<string, string> = {
		"x-default": `${baseUrl}/en`,
	};
	for (const locale of locales) {
		alternateLanguages[locale] = `${baseUrl}/${locale}`;
	}

	const localeHomes = locales.map((locale) => ({
		url: `${baseUrl}/${locale}`,
		lastModified: "2026-08-29",
		changeFrequency: "weekly" as const,
		priority: locale === "en" ? 1 : 0.9,
		alternates: {
			languages: alternateLanguages,
		},
	}));

	// The legal pages are English-only and canonicalise to /en, so only the
	// English URL belongs in the sitemap.
	const legalPages = ["privacy", "terms", "imprint"].map((slug) => ({
		url: `${baseUrl}/en/legal/${slug}`,
		lastModified: "2026-08-29",
		changeFrequency: "yearly" as const,
		priority: 0.3,
	}));

	return [...localeHomes, ...legalPages];
}
