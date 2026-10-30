import type { Metadata } from "next";

const siteUrl = "https://bonuz.tech";
const siteName = "Bonuz Technology DMCC";

/**
 * Share data for a subpage. A page without its own openGraph inherits the
 * locale layout's, whose url is the home page, so Facebook and LinkedIn showed
 * every shared subpage as a share of the home page.
 */
export function shareMeta(title: string, description: string, url: string): Pick<Metadata, "openGraph" | "twitter"> {
	const fullTitle = `${title} | ${siteName}`;
	const image = `${siteUrl}/og-image.png`;
	return {
		openGraph: {
			type: "website",
			url,
			siteName,
			title: fullTitle,
			description,
			images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
		},
		twitter: {
			card: "summary_large_image",
			site: "@bonuzmarket",
			creator: "@bonuzmarket",
			title: fullTitle,
			description,
			images: [image],
		},
	};
}
