import Link from "next/link";
import Image from "next/image";

/**
 * Shared shell for the English-only legal pages (/[locale]/legal/*).
 *
 * These pages are deliberately not translated: the homepage is fully localised,
 * but machine-translating legal wording into three more languages adds risk
 * rather than clarity. Each page canonicalises to its /en URL.
 */
export default function LegalPage({
	locale,
	title,
	updated,
	children,
}: {
	locale: string;
	title: string;
	updated: string;
	children: React.ReactNode;
}) {
	return (
		<>
			<header className="site-header">
				<Link
					href={`/${locale}`}
					className="header-logo"
					aria-label="Bonuz Technology - Home"
				>
					<Image
						src="/logo.svg"
						alt="Bonuz Technology DMCC"
						width={180}
						height={50}
						priority
					/>
				</Link>
				<nav className="header-nav" aria-label="Main navigation">
					<a href={`/${locale}`} className="nav-link">
						Home
					</a>
				</nav>
			</header>

			<main className="legal-page">
				<div className="legal-container">
					<h1>{title}</h1>
					<p className="legal-updated">Last updated {updated}</p>
					{children}

					<nav className="legal-footer-nav" aria-label="Legal pages">
						<a href={`/${locale}/legal/privacy`}>Privacy</a>
						<a href={`/${locale}/legal/terms`}>Terms</a>
						<a href={`/${locale}/legal/imprint`}>Legal notice</a>
						<a href={`/${locale}`}>Back to bonuz.tech</a>
					</nav>
				</div>
			</main>
		</>
	);
}
