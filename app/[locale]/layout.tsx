import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, rtlLocales, getDictionary, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../globals.css";

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
		authors: [{ name: "Matthias Mende", url: "https://bonuz.id/mende" }],
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

function getStructuredData(locale: string, dict: Awaited<ReturnType<typeof getDictionary>>) {
	const localeUrl = `${siteUrl}/${locale}`;
	const inLanguage = locale === "zh" ? "zh-Hans" : locale;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${siteUrl}/#organization`,
				name: "Bonuz Technology DMCC",
				legalName: "Bonuz Technology DMCC",
				url: siteUrl,
				logo: {
					"@type": "ImageObject",
					url: "https://res.cloudinary.com/dsmd4srf6/image/upload/v1763314576/1846x512_gr44cm.png",
					width: 1846,
					height: 512,
				},
				image: `${siteUrl}/og-image.png`,
				description: dict.meta.description,
				slogan: dict.hero.title,
				foundingDate: "2018",
				foundingLocation: {
					"@type": "Place",
					name: "Dubai, United Arab Emirates",
				},
				founder: {
					"@type": "Person",
					name: "Matthias Mende",
					jobTitle: "Founder & CEO",
					url: "https://bonuz.id/mende",
					sameAs: [
						"https://x.com/mendematthias",
						"https://linkedin.com/in/matthiasmende",
					],
				},
				address: {
					"@type": "PostalAddress",
					addressLocality: "Dubai",
					addressRegion: "Dubai",
					addressCountry: "AE",
				},
				areaServed: "Worldwide",
				knowsLanguage: ["en", "de", "ar", "zh"],
				sameAs: [
					"https://x.com/bonuzmarket",
					"https://linkedin.com/company/bonuzmarket",
					"https://github.com/bonuz-market",
					"https://bonuz.xyz",
					"https://bonuz.id",
				],
				contactPoint: {
					"@type": "ContactPoint",
					contactType: "business inquiries",
					url: "https://tally.so/r/7RR9r0",
					availableLanguage: ["English", "German", "Arabic", "Chinese"],
				},
			},
			{
				"@type": "ProfessionalService",
				"@id": `${siteUrl}/#localbusiness`,
				name: "Bonuz Technology DMCC",
				description: dict.meta.description,
				url: siteUrl,
				image: `${siteUrl}/og-image.png`,
				address: {
					"@type": "PostalAddress",
					addressLocality: "Dubai",
					addressRegion: "Dubai",
					addressCountry: "AE",
				},
				geo: {
					"@type": "GeoCoordinates",
					latitude: 25.2048,
					longitude: 55.2708,
				},
				priceRange: "$$$",
				areaServed: "Worldwide",
				parentOrganization: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "WebSite",
				"@id": `${siteUrl}/#website`,
				name: siteName,
				url: siteUrl,
				description: dict.meta.description,
				inLanguage,
				publisher: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "WebPage",
				"@id": `${localeUrl}/#webpage`,
				url: localeUrl,
				name: dict.meta.title,
				inLanguage,
				isPartOf: {
					"@id": `${siteUrl}/#website`,
				},
				about: {
					"@id": `${siteUrl}/#organization`,
				},
				description: dict.meta.description,
				potentialAction: {
					"@type": "ReadAction",
					target: localeUrl,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "bonuz Lifestyle Wallet",
				description: dict.ourWork.wallet.description,
				url: "https://bonuz.xyz",
				applicationCategory: "FinanceApplication",
				operatingSystem: "iOS, Android",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "bonuz ID",
				description: dict.ourWork.id.description,
				url: "https://bonuz.id",
				applicationCategory: "SocialNetworkingApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "bonuz Partner Dashboard",
				description: dict.ourWork.dashboard.description,
				url: "https://app.bonuz.market",
				applicationCategory: "BusinessApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "bonuz Swapz",
				description: dict.ourWork.swapz.description,
				url: "https://swapz.bonuz.market",
				applicationCategory: "FinanceApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "bonuz Events",
				description: dict.ourWork.events.description,
				url: "https://app.bonuz.xyz",
				applicationCategory: "SocialNetworkingApplication",
				operatingSystem: "Web, iOS, Android",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "Onchain Chess",
				description: dict.ourWork.chess.description,
				url: "https://onchainchess.com",
				applicationCategory: "GameApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "Habibi Pass",
				description: dict.ourWork.habibiPass.description,
				url: "https://habibipass.bonuz.xyz",
				applicationCategory: "TravelApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "UAE971",
				description: dict.ourWork.uae971.description,
				url: "https://uae971.social",
				applicationCategory: "SocialNetworkingApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "SkyShield",
				description: dict.ourWork.skyShield.description,
				url: "https://skyshield.bonuz.tech",
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "Kilocorn",
				description: dict.ourWork.kilocorn.description,
				url: "https://kilocorn.com",
				applicationCategory: "ReferenceApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "SoftwareApplication",
				name: "bonuz Next Layer",
				description: dict.ourWork.nextLayer.description,
				url: `${siteUrl}/#our-work`,
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				brand: {
					"@type": "Brand",
					name: "bonuz",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "Service",
				name: dict.ourWork.whiteLabel.title,
				description: dict.ourWork.whiteLabel.description,
				provider: {
					"@id": `${siteUrl}/#organization`,
				},
				areaServed: "Worldwide",
			},
			{
				"@type": "Service",
				name: dict.ourWork.consulting.title,
				description: dict.ourWork.consulting.description,
				provider: {
					"@id": `${siteUrl}/#organization`,
				},
				areaServed: "Worldwide",
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${localeUrl}/#breadcrumb`,
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: dict.breadcrumbs.home,
						item: localeUrl,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: dict.breadcrumbs.whatWeDo,
						item: `${localeUrl}#what-we-do`,
					},
					{
						"@type": "ListItem",
						position: 3,
						name: dict.breadcrumbs.ourWork,
						item: `${localeUrl}#our-work`,
					},
					{
						"@type": "ListItem",
						position: 4,
						name: dict.breadcrumbs.founder,
						item: `${localeUrl}#founder`,
					},
					{
						"@type": "ListItem",
						position: 5,
						name: dict.breadcrumbs.projectIntake,
						item: `${localeUrl}#request-intro`,
					},
				],
			},
			{
				"@type": "FAQPage",
				"@id": `${localeUrl}/#faq`,
				inLanguage,
				mainEntity: [
					{
						"@type": "Question",
						name: dict.faq.q1,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a1,
						},
					},
					{
						"@type": "Question",
						name: dict.faq.q2,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a2,
						},
					},
					{
						"@type": "Question",
						name: dict.faq.q3,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a3,
						},
					},
					{
						"@type": "Question",
						name: dict.faq.q4,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a4,
						},
					},
					{
						"@type": "Question",
						name: dict.faq.q5,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a5,
						},
					},
				],
			},
		],
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

	const dict = await getDictionary(locale);
	const isRTL = rtlLocales.includes(locale);
	const structuredData = getStructuredData(locale, dict);
	const htmlLang = locale === "zh" ? "zh-Hans" : locale;

	// Build Google Fonts URL based on locale — only load weights actually used
	const fontFamilies = ["Space+Grotesk:wght@400;500;600"];
	if (locale === "ar") {
		fontFamilies.push("Noto+Sans+Arabic:wght@400;500;600");
	} else if (locale === "zh") {
		fontFamilies.push("Noto+Sans+SC:wght@400;600");
	}
	const fontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies.map((f) => `family=${f}`).join("&")}&display=swap`;

	return (
		<html
			lang={htmlLang}
			dir={isRTL ? "rtl" : "ltr"}
			className="scroll-smooth"
		>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link rel="stylesheet" href={fontsUrl} />
			</head>
			<body className="antialiased">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
				<LanguageSwitcher locale={locale} />
				{children}
			</body>
		</html>
	);
}
