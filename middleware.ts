import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar", "de", "zh"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the pathname already has a locale prefix
	const pathnameHasLocale = locales.some(
		(locale) =>
			pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) return;

	// Redirect to default locale
	const url = request.nextUrl.clone();
	url.pathname = `/${defaultLocale}${pathname}`;
	return NextResponse.redirect(url);
}

export const config = {
	matcher: [
		// Match all paths except static files and Next.js internals
		"/((?!_next|favicon\\.ico|favicon|apple-touch-icon|site\\.webmanifest|robots\\.txt|sitemap\\.xml|og-image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|xml|txt|webmanifest)).*)",
	],
};
