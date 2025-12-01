import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://bonuz.tech";
const siteName = "Bonuz Technology DMCC";
const siteDescription =
	"Dubai-based software development house building self-custodial wallets, digital identity solutions, and blockchain infrastructure. We forge invisible technology that makes humans sovereign.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: siteName,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
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
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: siteName,
		title: "Bonuz Technology DMCC | Invisible Technology for Human Sovereignty",
		description: siteDescription,
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
		title: "Bonuz Technology DMCC | Invisible Technology for Human Sovereignty",
		description: siteDescription,
		creator: "@matthiasmende",
		images: [`${siteUrl}/og-image.png`],
	},
	alternates: {
		canonical: siteUrl,
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
};

// JSON-LD Structured Data - Static content, safe for inline script
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
			name: "bonuz Social Wallet",
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
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<Script
					id="structured-data"
					type="application/ld+json"
					strategy="beforeInteractive"
				>
					{JSON.stringify(structuredData)}
				</Script>
			</head>
			<body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
		</html>
	);
}
