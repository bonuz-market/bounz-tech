import ContentPage from "@/components/ContentPage";

/**
 * Thin wrapper around ContentPage that pins the legal cross-links, so the three
 * legal pages always point at each other without repeating the nav array.
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
		<ContentPage
			locale={locale}
			title={title}
			updated={updated}
			nav={[
				{ href: `/${locale}/legal/privacy`, label: "Privacy" },
				{ href: `/${locale}/legal/terms`, label: "Terms" },
				{ href: `/${locale}/legal/imprint`, label: "Legal notice" },
			]}
		>
			{children}
		</ContentPage>
	);
}
