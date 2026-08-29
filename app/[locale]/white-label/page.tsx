import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
	title: "White-label wallet platform",
	description:
		"bonuz featuring your brand. Launch a branded app on the bonuz platform: onchain identity, self-custodial wallet, quests, loyalty and membership, without building any of it from scratch.",
	keywords: [
		"white-label wallet",
		"white-label crypto wallet",
		"branded wallet app",
		"white-label loyalty platform",
		"enterprise blockchain platform",
		"bonuz ID login",
	],
	alternates: { canonical: "https://bonuz.tech/en/white-label" },
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

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
			title="bonuz featuring your brand"
			lede={
				<p>
					Your brand, on a platform that already runs. A white label breaks off
					from bonuz rather than starting at zero. Apps across the ecosystem
					already sign in with bonuz ID.
				</p>
			}
			nav={[
				{ href: `/${locale}/post-quantum`, label: "Post-quantum" },
				{ href: `/${locale}/shipping`, label: "What we ship" },
				{ href: `/${locale}/press`, label: "Press" },
			]}
		>
			<h2>What you inherit on day one</h2>
			<p>
				Running in production today, across our own apps. Your app is another
				skin on the same engine.
			</p>
			<ul>
				<li>
					<strong>Identity.</strong> bonuz ID, an onchain profile layer with
					social verification. One sign-in that works across every app in the
					ecosystem, including yours.
				</li>
				<li>
					<strong>Self-custodial wallet.</strong> Keys stay with the user. It
					feels like a normal app, so your customers never think about it.
				</li>
				<li>
					<strong>Quests and activations.</strong> Real-world tasks, check-ins
					and rewards. Created in a dashboard, not by your engineers.
				</li>
				<li>
					<strong>Loyalty and membership.</strong> Passes, vouchers, tiers and
					redemption, tied to the same identity.
				</li>
				<li>
					<strong>Partner dashboard.</strong> Your team runs campaigns without
					shipping code.
				</li>
			</ul>

			<h2>What it looks like when it is done</h2>
			<p>Two products on our own site, live and usable today:</p>
			<ul>
				<li>
					<a
						href="https://habibipass.bonuz.xyz"
						target="_blank"
						rel="noopener noreferrer"
					>
						Habibi Pass
					</a>{" "}
					is a tourism engagement platform for the UAE. Visitors collect vouchers
					and rewards from local restaurants and businesses. Same identity,
					wallet and loyalty stack, different brand.
				</li>
				<li>
					<a
						href="https://uae971.social"
						target="_blank"
						rel="noopener noreferrer"
					>
						UAE971
					</a>{" "}
					is a national creator index with live scoring and rankings. Same
					engine, a different product surface.
				</li>
			</ul>
			<p>Same engine, different skin, customised journey.</p>

			<h2>Who this is for</h2>
			<p>
				Brands and operators with an audience they want to own the relationship
				with: hospitality groups, event organisers, retail and F&amp;B chains,
				tourism boards, communities, creator platforms, and enterprises that need
				a wallet or a loyalty layer without becoming a blockchain company.
			</p>
			<p>
				No audience yet? A white label is probably the wrong tool. Tell us anyway and we
				will say so.
			</p>

			<h2>How we work</h2>
			<p>
				We take selected engagements. We operate what we launch rather than hand
				over a repository and disappear. Three questions start it: who your
				audience is, what you want them to do, what you already run. We scope
				from there, including telling you when you do not need us.
			</p>
			<p>
				No price list. The work varies. You get a straight number once we
				understand the scope.
			</p>

			<h2>Start a conversation</h2>
			<p>
				Send it through the{" "}
				<a
					href="https://tally.so/r/7RR9r0"
					target="_blank"
					rel="noopener noreferrer"
				>
					project intake form
				</a>
				. Real description, real timeline, real constraints.
			</p>
		</ContentPage>
	);
}
