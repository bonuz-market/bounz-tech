import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://bonuz.tech";

	const lastModified = new Date().toISOString().split("T")[0];

	const alternateLanguages: Record<string, string> = {
		"x-default": `${baseUrl}/en`,
	};
	for (const locale of locales) {
		alternateLanguages[locale] = `${baseUrl}/${locale}`;
	}

	const localeHomes = locales.map((locale) => ({
		url: `${baseUrl}/${locale}`,
		lastModified,
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
		lastModified,
		changeFrequency: "yearly" as const,
		priority: 0.3,
	}));

	// English-only subpages, canonicalised to /en.
	const contentPages = [
		{ slug: "ai", priority: 0.7 },
		{ slug: "white-label", priority: 0.8 },
		{ slug: "post-quantum", priority: 0.8 },
		{ slug: "shipping", priority: 0.6 },
		{ slug: "press", priority: 0.5 },
	].map(({ slug, priority }) => ({
		url: `${baseUrl}/en/${slug}`,
		lastModified,
		changeFrequency: "monthly" as const,
		priority,
	}));

	return [...localeHomes, ...contentPages, ...legalPages];
}
