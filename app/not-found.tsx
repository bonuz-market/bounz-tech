import Link from "next/link";
import { headers } from "next/headers";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const notFoundText: Record<Locale, { title: string; description: string; home: string; contact: string }> = {
	en: {
		title: "Page Not Found",
		description: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
		home: "Go Home",
		contact: "Contact Us",
	},
	ar: {
		title: "\u0627\u0644\u0635\u0641\u062D\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629",
		description: "\u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u064A \u062A\u0628\u062D\u062B \u0639\u0646\u0647\u0627 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0623\u0648 \u062A\u0645 \u0646\u0642\u0644\u0647\u0627. \u062F\u0639\u0646\u0627 \u0646\u0639\u064A\u062F\u0643 \u0625\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0635\u062D\u064A\u062D.",
		home: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
		contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
	},
	de: {
		title: "Seite nicht gefunden",
		description: "Die gesuchte Seite existiert nicht oder wurde verschoben. Lassen Sie uns Sie zur\u00FCckbringen.",
		home: "Startseite",
		contact: "Kontakt",
	},
	zh: {
		title: "\u9875\u9762\u672A\u627E\u5230",
		description: "\u60A8\u8981\u67E5\u627E\u7684\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u79FB\u52A8\u3002\u8BA9\u6211\u4EEC\u5E2E\u60A8\u56DE\u5230\u6B63\u8F68\u3002",
		home: "\u8FD4\u56DE\u9996\u9875",
		contact: "\u8054\u7CFB\u6211\u4EEC",
	},
};

export default async function NotFound() {
	const headersList = await headers();
	const pathname = headersList.get("x-next-pathname") || "";
	const detectedLocale = locales.find((l) => pathname.startsWith(`/${l}`)) || defaultLocale;
	const t = notFoundText[detectedLocale];
	const dir = detectedLocale === "ar" ? "rtl" : "ltr";
	const lang = detectedLocale === "zh" ? "zh-Hans" : detectedLocale;

	return (
		<html lang={lang} dir={dir}>
			<body>
				<div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
					<div className="max-w-md mx-auto">
						<h1 className="text-8xl font-bold text-white mb-4">404</h1>
						<h2 className="text-2xl font-semibold text-white mb-4">
							{t.title}
						</h2>
						<p className="text-gray-400 mb-8">
							{t.description}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href={`/${detectedLocale}`}
								className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
							>
								{t.home}
							</Link>
							<Link
								href={`/${detectedLocale}#request-intro`}
								className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
							>
								{t.contact}
							</Link>
						</div>
					</div>
					<p className="absolute bottom-8 text-gray-600 text-sm">
						&copy; {new Date().getFullYear()} Bonuz Technology DMCC
					</p>
				</div>
			</body>
		</html>
	);
}
