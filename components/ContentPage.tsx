import Link from "next/link";
import AmbientSound from "@/components/AmbientSound";
import AiSwitch from "@/components/AiSwitch";
import Image from "next/image";

export type ContentNavLink = { href: string; label: string };

/**
 * Shared shell for the English-only subpages (/[locale]/legal/*, /white-label,
 * /post-quantum, /shipping, /press).
 *
 * The homepage stays fully localised. These pages are English by decision: the
 * translation surface was the thing most likely to make the site unmaintainable,
 * and machine-translated legal or technical wording adds risk rather than clarity.
 * Each page canonicalises to its /en URL.
 */
export default function ContentPage({
	locale,
	title,
	updated,
	lede,
	nav,
	children,
}: {
	locale: string;
	title: string;
	updated?: string;
	lede?: React.ReactNode;
	nav: ContentNavLink[];
	children: React.ReactNode;
}) {
	return (
		<>
			{/* Same control as the homepage, so the preference carries across the
			    site and the sound can be stopped from wherever the visitor is. */}
			<AmbientSound label="Ambient sound" />
			<AiSwitch locale={locale} label="Machine-readable view" />

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
					{updated && <p className="legal-updated">Last updated {updated}</p>}
					{lede && <div className="legal-lede">{lede}</div>}
					{children}

					<nav className="legal-footer-nav" aria-label="More pages">
						{nav.map((l) => (
							<a key={l.href} href={l.href}>
								{l.label}
							</a>
						))}
						<a href={`/${locale}`}>Back to bonuz.tech</a>
					</nav>
				</div>
			</main>
		</>
	);
}
