import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
	title: "White-label wallet platform | Bonuz Technology DMCC",
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
					bonuz is the mother platform and carries every feature. A white label
					breaks off from it rather than starting from zero, which is why so
					many apps in the ecosystem already sign in with bonuz ID.
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
				These are not features we would build for you. They are running in
				production today across our own apps, and your app is another skin on the
				same engine.
			</p>
			<ul>
				<li>
					<strong>Identity.</strong> bonuz ID, an onchain profile layer with
					social verification. Users sign in with an identity that works across
					every app in the ecosystem, including yours.
				</li>
				<li>
					<strong>Self-custodial wallet.</strong> Keys stay with the user. Built
					to feel like a normal app, so your customers do not need to understand
					any of it.
				</li>
				<li>
					<strong>Quests and activations.</strong> Real-world tasks, check-ins
					and rewards, created and managed through a dashboard rather than by
					your engineers.
				</li>
				<li>
					<strong>Loyalty and membership.</strong> Passes, vouchers, tiers and
					redemption, tied to the same identity.
				</li>
				<li>
					<strong>Partner dashboard.</strong> Your team creates and runs
					campaigns without shipping code.
				</li>
			</ul>

			<h2>What it looks like when it is done</h2>
			<p>
				Two of the products on our own site are the pattern, so you can go and
				use them rather than take our word for it:
			</p>
			<ul>
				<li>
					<a
						href="https://habibipass.bonuz.xyz"
						target="_blank"
						rel="noopener noreferrer"
					>
						Habibi Pass
					</a>{" "}
					is a tourism engagement platform for the UAE. Visitors collect
					vouchers and rewards from local restaurants and businesses. Underneath
					it is the same identity, wallet and loyalty stack described above,
					wearing a different brand.
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
					engine, an entirely different product surface.
				</li>
			</ul>
			<p>
				Same engine, different skin, customised journey. That is the whole idea.
			</p>

			<h2>Who this is for</h2>
			<p>
				Brands and operators who already have an audience and want to own the
				relationship with it: hospitality groups, event organisers, retail and
				F&amp;B chains, tourism boards, communities, creator platforms, and
				enterprises that need a wallet or a loyalty layer without becoming a
				blockchain company to get one.
			</p>
			<p>
				If you are pre-audience, a white label is probably the wrong tool. Tell
				us anyway and we will say so.
			</p>

			<h2>How we work</h2>
			<p>
				We take selected engagements rather than every enquiry, because we
				operate what we launch rather than handing over a repository and
				disappearing. A conversation usually starts with three questions: who
				your audience is, what you want them to do, and what you already have
				running. From there we scope it honestly, including telling you when the
				answer is that you do not need us.
			</p>
			<p>
				We do not publish a price list, because the work genuinely varies. We
				will give you a straight number once we understand the scope.
			</p>

			<h2>Start a conversation</h2>
			<p>
				Send the details through the{" "}
				<a
					href="https://tally.so/r/7RR9r0"
					target="_blank"
					rel="noopener noreferrer"
				>
					project intake form
				</a>
				. Real description, real timeline, real constraints. It reaches us
				directly.
			</p>
		</ContentPage>
	);
}
