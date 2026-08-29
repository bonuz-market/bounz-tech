import { locales, type Locale, getDictionary } from "@/lib/i18n";

const siteUrl = "https://bonuz.tech";
const siteName = "Bonuz Technology DMCC";

export { siteUrl, siteName, locales };
export type { Locale };

/**
 * The homepage schema.org graph.
 *
 * Lives here rather than in the locale layout so it is emitted by the homepage
 * only. When it sat in the layout, every subpage inherited it and told search
 * engines it WAS the homepage: same @id, same url, a BreadcrumbList of homepage
 * anchors, and an FAQPage on pages with no visible FAQ.
 */
export function getStructuredData(locale: string, dict: Awaited<ReturnType<typeof getDictionary>>) {
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
				foundingDate: "2021",
				foundingLocation: {
					"@type": "Place",
					name: "Dubai, United Arab Emirates",
				},
				founder: {
					"@type": "Person",
					name: "Matthias Mende",
					jobTitle: "Founder & CEO",
					url: "https://matthiasmende.com",
					award: "Binance Industry Advocate (2025)",
					sameAs: [
						"https://matthiasmende.com",
						"https://bonuz.id/mende",
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
					"https://bonuz.life",
					"https://pq-wallet.com",
					"https://btxscan.io",
					"https://postquantum.wiki",
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
				"@type": "ResearchProject",
				name: "SkyShield",
				description: dict.ourWork.skyShield.description,
				url: "https://skyshield.bonuz.tech",
				parentOrganization: {
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
				name: "bonuz LIFE",
				description: dict.ourWork.life.description,
				url: "https://bonuz.life",
				applicationCategory: "LifestyleApplication",
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
				name: "PQ Wallet for BTX",
				description: dict.ourWork.pqWallet.description,
				url: "https://pq-wallet.com",
				applicationCategory: "FinanceApplication",
				operatingSystem: "macOS, Windows, Linux",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				manufacturer: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "WebApplication",
				name: "BTXScan",
				description: dict.ourWork.btxscan.description,
				url: "https://btxscan.io",
				applicationCategory: "UtilitiesApplication",
				browserRequirements: "Requires JavaScript",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				publisher: {
					"@id": `${siteUrl}/#organization`,
				},
			},
			{
				"@type": "CreativeWork",
				"@id": "https://postquantum.wiki/#reference",
				name: "postquantum.wiki",
				description: dict.ourWork.pqWiki.description,
				url: "https://postquantum.wiki",
				inLanguage: "en",
				publisher: {
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
						name: dict.breadcrumbs.credentials,
						item: `${localeUrl}#credentials`,
					},
					{
						"@type": "ListItem",
						position: 5,
						name: dict.breadcrumbs.founder,
						item: `${localeUrl}#founder`,
					},
					{
						"@type": "ListItem",
						position: 6,
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
					{
						"@type": "Question",
						name: dict.faq.q6,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a6,
						},
					},
					{
						"@type": "Question",
						name: dict.faq.q7,
						acceptedAnswer: {
							"@type": "Answer",
							text: dict.faq.a7,
						},
					},
				],
			},
		],
	};
}
