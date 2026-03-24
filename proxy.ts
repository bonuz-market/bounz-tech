import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function getPreferredLocale(request: NextRequest): string {
	const acceptLanguage = request.headers.get("accept-language");
	if (!acceptLanguage) return defaultLocale;

	const preferred = acceptLanguage
		.split(",")
		.map((lang) => {
			const [code, q] = lang.trim().split(";q=");
			return { code: code.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
		})
		.sort((a, b) => b.q - a.q);

	for (const { code } of preferred) {
		const match = locales.find((l) => l === code);
		if (match) return match;
	}

	return defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Redirect www to non-www (canonical domain)
	const host = request.headers.get("host") || "";
	if (host.startsWith("www.")) {
		const url = request.nextUrl.clone();
		url.host = host.replace(/^www\./, "");
		url.port = "";
		return NextResponse.redirect(url, 301);
	}

	// Check if the pathname already has a locale prefix
	const pathnameHasLocale = locales.some(
		(locale) =>
			pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) {
		const response = NextResponse.next();
		response.headers.set("x-next-pathname", pathname);
		return response;
	}

	// Detect preferred locale from Accept-Language header
	const locale = getPreferredLocale(request);

	const url = request.nextUrl.clone();
	url.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(url);
}

export const config = {
	matcher: [
		// Match all paths except static files and Next.js internals
		"/((?!_next|favicon\\.ico|favicon|apple-touch-icon|site\\.webmanifest|robots\\.txt|sitemap\\.xml|og-image|llms\\.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|xml|txt|html|webmanifest)).*)",
	],
};
