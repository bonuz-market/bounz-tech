export const locales = ["en", "ar", "de", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const rtlLocales: Locale[] = ["ar"];

export const localeNames: Record<Locale, string> = {
	en: "English",
	ar: "العربية",
	de: "Deutsch",
	zh: "中文",
};

export type Dictionary = {
	meta: {
		title: string;
		description: string;
	};
	hero: {
		title: string;
		subtitle: string;
		rule: string;
		seeWork: string;
		projectIntake: string;
	};
	whatWeDo: {
		title: string;
		intro: string;
		features: string[];
	};
	ourWork: {
		title: string;
		intro: string;
		wallet: { title: string; description: string };
		id: { title: string; description: string };
		dashboard: { title: string; description: string };
		whiteLabel: { title: string; description: string };
		consulting: { title: string; description: string };
		nextLayer: { title: string; description: string };
		footer: string;
	};
	founder: {
		title: string;
		bio: string;
		mission1: string;
		mission2: string;
	};
	intake: {
		title: string;
		description: string;
		button: string;
	};
	footer: {
		quote: string;
		copyright: string;
	};
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () => import("./dictionaries/en").then((m) => m.default),
	ar: () => import("./dictionaries/ar").then((m) => m.default),
	de: () => import("./dictionaries/de").then((m) => m.default),
	zh: () => import("./dictionaries/zh").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
	return dictionaries[locale]();
}
