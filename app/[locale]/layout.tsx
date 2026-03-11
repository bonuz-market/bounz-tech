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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!locales.includes(locale as Locale)) return {};

	const dict = await getDictionary(locale as Locale);

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
			locale: locale === "zh" ? "zh_CN" : locale === "ar" ? "ar_AE" : locale === "de" ? "de_DE" : "en_US",
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
			title: "bonuz Tech",
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
				url: siteUrl,
				logo: {
					"@type": "ImageObject",
					url: "https://res.cloudinary.com/dsmd4srf6/image/upload/v1763314576/1846x512_gr44cm.png",
				},
				description: dict.meta.description,
				foundingDate: "2018",
				founder: {
					"@type": "Person",
					name: "Matthias Mende",
					url: "https://bonuz.id/mende",
					sameAs: [
						"https://x.com/matthiasmende",
						"https://linkedin.com/in/matthiasmende",
					],
				},
				address: {
					"@type": "PostalAddress",
					addressLocality: "Dubai",
					addressCountry: "AE",
				},
				sameAs: [
					"https://x.com/matthiasmende",
					"https://linkedin.com/in/matthiasmende",
					"https://bonuz.xyz",
					"https://bonuz.id",
				],
				contactPoint: {
					"@type": "ContactPoint",
					contactType: "business inquiries",
					url: "https://tally.so/r/7RR9r0",
				},
			},
			{
				"@type": "LocalBusiness",
				"@id": `${siteUrl}/#localbusiness`,
				name: "Bonuz Technology DMCC",
				description: dict.meta.description,
				url: siteUrl,
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

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const dict = await getDictionary(locale as Locale);
	const isRTL = rtlLocales.includes(locale as Locale);
	const structuredData = getStructuredData(locale, dict);

	// Build Google Fonts URL based on locale
	const fontFamilies = ["Space+Grotesk:wght@300;400;500;600;700"];
	if (locale === "ar") {
		fontFamilies.push("Noto+Sans+Arabic:wght@300;400;500;600;700");
	} else if (locale === "zh") {
		fontFamilies.push("Noto+Sans+SC:wght@300;400;500;600;700");
	}
	const fontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies.map((f) => `family=${f}`).join("&")}&display=swap`;

	return (
		<html
			lang={locale}
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
				<LanguageSwitcher locale={locale as Locale} />
				{children}
			</body>
		</html>
	);
}
