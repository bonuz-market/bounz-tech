import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Urbanist, Manrope } from "next/font/google";
import { locales, rtlLocales, getDictionary, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AmbientSound from "@/components/AmbientSound";
import "../globals.css";

const urbanist = Urbanist({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-urbanist",
	display: "swap",
});

const manrope = Manrope({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

const siteUrl = "https://bonuz.tech";
const siteName = "Bonuz Technology DMCC";

function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

const ogLocaleMap: Record<Locale, string> = {
	en: "en_US",
	ar: "ar_AE",
	de: "de_DE",
	zh: "zh_CN",
};

// Matches the manifest's theme_color so mobile browser chrome is black instead
// of the browser default. Must live in the viewport export, not metadata.
export const viewport: Viewport = {
	themeColor: "#000000",
	colorScheme: "dark",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};


	const dict = await getDictionary(locale);

	const alternatesLanguages: Record<string, string> = {
		"x-default": `${siteUrl}/en`,
	};
	for (const l of locales) {
		alternatesLanguages[l] = `${siteUrl}/${l}`;
	}

	return {
		metadataBase: new URL(siteUrl),
		title: {
			default: dict.meta.title,
			template: `%s | ${siteName}`,
		},
		description: dict.meta.description,
		keywords: dict.meta.keywords,
		authors: [{ name: "Matthias Mende", url: "https://matthiasmende.com" }],
		creator: "Bonuz Technology DMCC",
		publisher: "Bonuz Technology DMCC",
		formatDetection: {
			telephone: false,
			email: false,
			address: false,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		verification: {
			yandex: "48d42867c455213b",
		},
		openGraph: {
			type: "website",
			locale: ogLocaleMap[locale],
			alternateLocale: locales
				.filter((l) => l !== locale)
				.map((l) => ogLocaleMap[l]),
			url: `${siteUrl}/${locale}`,
			siteName: siteName,
			title: dict.meta.title,
			description: dict.meta.description,
			images: [
				{
					url: `${siteUrl}/og-image.png`,
					width: 1200,
					height: 630,
					alt: dict.meta.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: dict.meta.title,
			description: dict.meta.description,
			creator: "@bonuzmarket",
			site: "@bonuzmarket",
			images: [`${siteUrl}/og-image.png`],
		},
		alternates: {
			canonical: `${siteUrl}/${locale}`,
			languages: alternatesLanguages,
		},
		icons: {
			icon: [
				{ url: "/favicon.ico", type: "image/x-icon" },
				{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
				{ url: "/favicon.svg", type: "image/svg+xml" },
			],
			apple: [
				{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
			],
			shortcut: [{ url: "/favicon.ico" }],
		},
		appleWebApp: {
			title: siteName,
		},
		manifest: "/site.webmanifest",
		category: "technology",
		classification: "Software Development",
		other: {
			"geo.region": "AE-DU",
			"geo.placename": "Dubai",
			"geo.position": "25.2048;55.2708",
			ICBM: "25.2048, 55.2708",
		},
	};
}


export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!isLocale(locale)) {
		notFound();
	}

	const isRTL = rtlLocales.includes(locale);
	const htmlLang = locale === "zh" ? "zh-Hans" : locale;

	// Urbanist + Manrope load via next/font. Non-latin scripts still need Google Fonts.
	const nonLatinFont =
		locale === "ar"
			? "Noto+Sans+Arabic:wght@400;500;600"
			: locale === "zh"
				? "Noto+Sans+SC:wght@400;600"
				: null;
	const fontsUrl = nonLatinFont
		? `https://fonts.googleapis.com/css2?family=${nonLatinFont}&display=swap`
		: null;

	return (
		<html
			lang={htmlLang}
			dir={isRTL ? "rtl" : "ltr"}
			className={`scroll-smooth ${urbanist.variable} ${manrope.variable}`}
		>
			<head>
				{fontsUrl && (
					<>
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link
							rel="preconnect"
							href="https://fonts.gstatic.com"
							crossOrigin="anonymous"
						/>
						<link rel="stylesheet" href={fontsUrl} />
					</>
				)}
			</head>
			<body className="antialiased">
				<AmbientSound locale={locale} />
				<LanguageSwitcher locale={locale} />
				{children}
			</body>
		</html>
	);
}
