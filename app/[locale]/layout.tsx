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

	const alternatesLanguages: Record<string, string> = {};
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
		keywords: [
			"self-custodial wallet",
			"blockchain development Dubai",
			"Web3 development UAE",
			"digital identity solutions",
			"white-label crypto wallet",
			"blockchain software development",
			"self-sovereignty technology",
			"Dubai blockchain company",
			"consumer blockchain applications",
			"loyalty program blockchain",
			"smart contract development",
			"AR spatial computing",
			"bonuz wallet",
			"bonuz ID",
			"crypto wallet development",
			"decentralized identity",
			"DID solutions",
			"blockchain consulting Dubai",
			"Web3 infrastructure",
			"onchain identity",
			"loyalty rewards blockchain",
			"enterprise blockchain solutions",
			"white-label wallet platform",
			"self-sovereign identity",
			"blockchain app development UAE",
			"Dubai tech company",
			"Matthias Mende",
			"Dubai Blockchain Center",
			"bonuz technology",
		],
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
					alt: "Bonuz Technology - We forge invisible technology that makes humans sovereign",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: dict.meta.title,
			description: dict.meta.description,
			creator: "@matthiasmende",
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

// JSON-LD Structured Data (kept in English for schema.org)
const siteDescription =
	"Dubai-based software development house building self-custodial wallets, digital identity solutions, and blockchain infrastructure. We forge invisible technology that makes humans sovereign.";

const structuredData = {
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
			description: siteDescription,
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
			description:
				"Dubai-based software development house specializing in blockchain, Web3, and self-custodial wallet technology.",
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
			description: siteDescription,
			publisher: {
				"@id": `${siteUrl}/#organization`,
			},
		},
		{
			"@type": "WebPage",
			"@id": `${siteUrl}/#webpage`,
			url: siteUrl,
			name: siteName,
			isPartOf: {
				"@id": `${siteUrl}/#website`,
			},
			about: {
				"@id": `${siteUrl}/#organization`,
			},
			description: siteDescription,
		},
		{
			"@type": "Product",
			name: "bonuz Lifestyle Wallet",
			description:
				"Award-winning consumer-grade self-custodial wallet with social features, quests, and loyalty programs. Available for iOS and Android.",
			url: "https://bonuz.xyz",
			brand: {
				"@type": "Brand",
				name: "bonuz",
			},
			manufacturer: {
				"@id": `${siteUrl}/#organization`,
			},
		},
		{
			"@type": "Product",
			name: "bonuz ID",
			description:
				"A unified profile layer where people connect their favorite links, socials, and presence into one simple public page.",
			url: "https://bonuz.id",
			brand: {
				"@type": "Brand",
				name: "bonuz",
			},
			manufacturer: {
				"@id": `${siteUrl}/#organization`,
			},
		},
		{
			"@type": "Product",
			name: "bonuz Partner Dashboard",
			description:
				"Comprehensive dashboard for brand partners to create real-world quests, loyalty or membership programs.",
			url: "https://app.bonuz.market",
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
			name: "White-label Blockchain Platforms",
			description:
				"Custom branded apps using Bonuz core modules including identity, wallet structure, quest, loyalty and membership systems.",
			provider: {
				"@id": `${siteUrl}/#organization`,
			},
			areaServed: "Worldwide",
		},
		{
			"@type": "Service",
			name: "Blockchain Consulting",
			description:
				"Product architecture, user experience, and infrastructure consulting for teams building in the blockchain ecosystem.",
			provider: {
				"@id": `${siteUrl}/#organization`,
			},
			areaServed: "Worldwide",
		},
		{
			"@type": "BreadcrumbList",
			"@id": `${siteUrl}/#breadcrumb`,
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: siteUrl,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "What We Do",
					item: `${siteUrl}/#what-we-do`,
				},
				{
					"@type": "ListItem",
					position: 3,
					name: "Our Work",
					item: `${siteUrl}/#our-work`,
				},
				{
					"@type": "ListItem",
					position: 4,
					name: "Founder",
					item: `${siteUrl}/#founder`,
				},
				{
					"@type": "ListItem",
					position: 5,
					name: "Project Intake Request",
					item: `${siteUrl}/#request-intro`,
				},
			],
		},
		{
			"@type": "FAQPage",
			"@id": `${siteUrl}/#faq`,
			mainEntity: [
				{
					"@type": "Question",
					name: "What does Bonuz Technology build?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Bonuz Technology builds self-custodial wallets, digital identity solutions, and blockchain infrastructure. Our flagship products include the bonuz Lifestyle Wallet, bonuz ID, and the bonuz Partner Dashboard.",
					},
				},
				{
					"@type": "Question",
					name: "Where is Bonuz Technology based?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Bonuz Technology DMCC is based in Dubai, United Arab Emirates. The company was founded by Matthias Mende, who also co-founded the Dubai Blockchain Center in 2018.",
					},
				},
				{
					"@type": "Question",
					name: "Does Bonuz offer white-label blockchain solutions?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Yes, Bonuz offers white-label blockchain platforms for enterprises. We use our core modules including identity, wallet structure, quest, loyalty and membership systems to launch fully branded apps without building from scratch.",
					},
				},
				{
					"@type": "Question",
					name: "What is a self-custodial wallet?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "A self-custodial wallet gives users full ownership and control of their digital assets and private keys, without relying on a third party. The bonuz Lifestyle Wallet is designed to be consumer-grade and easy to use while maintaining full self-custody.",
					},
				},
			],
		},
	],
};

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

	const isRTL = rtlLocales.includes(locale as Locale);

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
