import Link from "next/link";

/**
 * Localised 404 for paths under a locale prefix.
 *
 * Deliberately does not call headers(): reading a request header in a not-found
 * boundary opts the whole app out of static generation. Next renders this inside
 * app/[locale]/layout.tsx, which already supplies <html lang> and dir.
 */
export default function LocaleNotFound() {
	return (
		<div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
			<div className="max-w-md mx-auto">
				<h1 className="text-8xl font-bold text-white mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-white mb-4">
					Page not found
				</h2>
				<p className="text-gray-400 mb-8">
					That page does not exist, or it moved. Let us get you back.
				</p>
				<Link
					href="/en"
					className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
				>
					Go home
				</Link>
			</div>
		</div>
	);
}
