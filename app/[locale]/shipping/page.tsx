import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
	title: "What we ship | Bonuz Technology DMCC",
	description:
		"Release activity across the bonuz ecosystem, with links to each product's own live changelog. Selected milestones, every one verifiable on a third-party record.",
	alternates: { canonical: "https://bonuz.tech/en/shipping" },
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

const milestones: {
	date: string;
	what: string;
	detail: string;
	href: string;
	source: string;
}[] = [
	{
		date: "18 Aug 2026",
		what: "bonuz app 4.0.0, LIFE Mode",
		detail:
			"Augmented reality inside the app. Quests and rewards anchored to real places.",
		href: "https://apps.apple.com/ae/app/bonuz-social-crypto-wallet/id1637687439",
		source: "App Store",
	},
	{
		date: "17 Aug 2026",
		what: "PQ Wallet for BTX 1.1.0",
		detail:
			"Latest release of the post-quantum desktop wallet. macOS, Windows, Linux.",
		href: "https://pq-wallet.com/changelog",
		source: "changelog",
	},
	{
		date: "Jul to Aug 2026",
		what: "Eight PQ Wallet releases in six weeks",
		detail:
			"Dated public releases, 7 July to 17 August 2026, roughly one a week.",
		href: "https://pq-wallet.com/changelog",
		source: "changelog",
	},
	{
		date: "27 Jul 2026",
		what: "PQ Wallet for BTX 1.0.0",
		detail: "First stable release, after roughly two months of public betas.",
		href: "https://pq-wallet.com/changelog",
		source: "changelog",
	},
	{
		date: "13 Oct 2023",
		what: "bonuz app, first App Store release",
		detail: "Publicly available and updated continuously ever since.",
		href: "https://apps.apple.com/ae/app/bonuz-social-crypto-wallet/id1637687439",
		source: "App Store",
	},
];

const changelogs: { name: string; href: string; note: string }[] = [
	{
		name: "PQ Wallet for BTX",
		href: "https://pq-wallet.com/changelog",
		note: "Every version since 0.1.0.",
	},
	{
		name: "bonuz app",
		href: "https://apps.apple.com/ae/app/bonuz-social-crypto-wallet/id1637687439",
		note: "Version history and release notes on the App Store.",
	},
	{
		name: "bonuz.market",
		href: "https://bonuz.market",
		note: "Platform and protocol updates.",
	},
	{
		name: "bonuz.xyz",
		href: "https://bonuz.xyz",
		note: "Product updates for the consumer app.",
	},
];

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!locales.includes(locale as Locale)) notFound();

	return (
		<ContentPage
			locale={locale}
			title="What we ship"
			lede={
				<p>
					Every product keeps its own changelog. Those are the live source.
					Below, a short selection of milestones, each pointing at a record you
					can check without trusting us.
				</p>
			}
			nav={[
				{ href: `/${locale}/white-label`, label: "White label" },
				{ href: `/${locale}/post-quantum`, label: "Post-quantum" },
				{ href: `/${locale}/press`, label: "Press" },
			]}
		>
			<h2>Selected milestones</h2>
			<ul className="ship-list">
				{milestones.map((m) => (
					<li key={m.what}>
						<span className="ship-date">{m.date}</span>
						<span className="ship-what">{m.what}</span>
						<span className="ship-detail">{m.detail}</span>
						<a href={m.href} target="_blank" rel="noopener noreferrer">
							Verify on {m.source}
						</a>
					</li>
				))}
			</ul>

			<h2>The live changelogs</h2>
			<p>Maintained per product, and always more current than this page.</p>
			<ul>
				{changelogs.map((c) => (
					<li key={c.name}>
						<a href={c.href} target="_blank" rel="noopener noreferrer">
							{c.name}
						</a>{" "}
						{c.note}
					</li>
				))}
			</ul>

			<h2>A note on cadence</h2>
			<p>
				The homepage says something ships every week across our repositories.
				That measures repository activity, not public releases, and most of our
				repositories are private. The public record above is what you can
				verify independently, so it is what we link to.
			</p>
		</ContentPage>
	);
}
