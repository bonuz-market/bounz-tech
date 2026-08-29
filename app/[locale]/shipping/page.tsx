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
			"The augmented reality layer went live inside the mobile app. Open the lens, look around, and quests and rewards appear anchored to real places.",
		href: "https://apps.apple.com/ae/app/bonuz-social-crypto-wallet/id1637687439",
		source: "App Store",
	},
	{
		date: "17 Aug 2026",
		what: "PQ Wallet for BTX 1.1.0",
		detail:
			"Latest release of the post-quantum desktop wallet, on macOS, Windows and Linux.",
		href: "https://pq-wallet.com/changelog",
		source: "changelog",
	},
	{
		date: "Jul–Aug 2026",
		what: "Eight PQ Wallet releases in six weeks",
		detail:
			"Public, dated releases between 7 July and 17 August 2026, roughly one a week.",
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
		detail:
			"The consumer wallet has been publicly available and continuously updated ever since.",
		href: "https://apps.apple.com/ae/app/bonuz-social-crypto-wallet/id1637687439",
		source: "App Store",
	},
];

const changelogs: { name: string; href: string; note: string }[] = [
	{
		name: "PQ Wallet for BTX",
		href: "https://pq-wallet.com/changelog",
		note: "Full per-release changelog, every version since 0.1.0.",
	},
	{
		name: "bonuz app",
		href: "https://apps.apple.com/ae/app/bonuz-social-crypto-wallet/id1637687439",
		note: "Version history and release notes on the App Store listing.",
	},
	{
		name: "bonuz.market",
		href: "https://bonuz.market",
		note: "Platform and protocol updates.",
	},
	{
		name: "bonuz.xyz",
		href: "https://bonuz.xyz",
		note: "Product updates for the consumer app and its surfaces.",
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
					Every product in the ecosystem keeps its own changelog, and those are
					the live source. This page does not duplicate them. It is a small
					selection of milestones, each one pointing at a record you can check
					without trusting us.
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
			<p>
				If you want the complete picture rather than highlights, go straight to
				the source. These are maintained per product and are always more current
				than this page.
			</p>
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
				We say on the homepage that something ships every week across our
				repositories. That is a measure of engineering activity, not of public
				releases, and most of our repositories are private. The public record
				above is the part you can independently verify, which is why it is the
				part we link to.
			</p>
		</ContentPage>
	);
}
