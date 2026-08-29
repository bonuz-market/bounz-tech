import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
	title: "Press kit | Bonuz Technology DMCC",
	description:
		"Logos, boilerplate, company facts and a naming guide for anyone writing about Bonuz Technology DMCC.",
	alternates: { canonical: "https://bonuz.tech/en/press" },
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
			title="Press kit"
			updated="29 August 2026"
			lede={
				<p>
					Copy the boilerplate as is. Take the logos. Use the naming guide so the
					product names come out right.
				</p>
			}
			nav={[
				{ href: `/${locale}/white-label`, label: "White label" },
				{ href: `/${locale}/post-quantum`, label: "Post-quantum" },
				{ href: `/${locale}/shipping`, label: "What we ship" },
			]}
		>
			<h2>Boilerplate</h2>
			<p>
				<strong>One line.</strong> Bonuz Technology DMCC is a Dubai software
				house building self-custodial wallets, onchain identity, augmented
				reality and post-quantum infrastructure.
			</p>
			<p>
				<strong>Short.</strong> Bonuz Technology DMCC is a software house in
				Dubai, United Arab Emirates. It builds and operates consumer and
				infrastructure products across blockchain, augmented reality and
				post-quantum cryptography: the bonuz self-custodial wallet, the bonuz ID
				identity layer, and bonuz LIFE, an augmented reality layer over real
				places. Founder and Managing Director Matthias Mende also co-founded the
				Dubai Blockchain Center in 2018.
			</p>
			<p>
				<strong>Longer.</strong> Bonuz Technology DMCC is a Dubai-based software
				house that builds and operates the infrastructure behind consumer
				blockchain products. Its work spans self-custodial wallets, onchain
				digital identity, real-world loyalty and quests, augmented reality, and
				post-quantum cryptography. The bonuz app is a consumer-grade
				self-custodial wallet on iOS and Android. bonuz ID is a unified onchain
				profile layer. bonuz LIFE brings quests and rewards into an augmented
				view of the real world. PQ Wallet for BTX is a desktop wallet built on
				the post-quantum signature schemes standardised by NIST. White-label
				platforms let brands launch on the same engine. The company is a
				registered developer with Apple, Google Play, Microsoft, Meta Wearables
				and MentraOS.
			</p>

			<h2>Logos</h2>
			<p>
				Use the wordmark, do not retype &quot;bonuz&quot;. Do not redraw or
				recolour it. Both files are SVG.
			</p>
			<ul>
				<li>
					<a href="/brand/bonuz-wordmark-official-white.svg" download>
						Wordmark, white
					</a>{" "}
					for dark backgrounds
				</li>
				<li>
					<a href="/brand/bonuz-logo-official-for-light-bg.svg" download>
						Wordmark, dark
					</a>{" "}
					for light backgrounds
				</li>
			</ul>

			<h2>Naming guide</h2>
			<p>Commonly written wrong:</p>
			<ul>
				<li>
					<strong>bonuz</strong> is always lowercase, including at the start of
					a sentence. The entity <strong>Bonuz Technology DMCC</strong> takes a
					capital B.
				</li>
				<li>
					<strong>LIFE</strong> is always full capitals. The product is{" "}
					<strong>bonuz LIFE</strong>. The domain bonuz.life stays lowercase.
				</li>
				<li>
					<strong>Next Layer</strong> is the umbrella for our spatial computing
					work. LIFE is the first product inside it. Not synonyms.
				</li>
				<li>
					<strong>PQ Wallet for BTX</strong>, not &quot;BTX PQ Wallet&quot;.
				</li>
				<li>
					<strong>bonuz ID</strong>, <strong>bonuz Swapz</strong>,{" "}
					<strong>BTXScan</strong>, <strong>postquantum.wiki</strong>.
				</li>
			</ul>

			<h2>Things that are not true</h2>
			<p>
				We do not own or operate the <strong>BTX blockchain</strong>. It is
				third-party infrastructure. We build tools for it. We have{" "}
				<strong>no shipped product on any smart glasses platform</strong>. Our
				Meta Wearables and MentraOS presence is a developer registration, and
				LIFE runs on phones today. Developer registrations are{" "}
				<strong>not partnerships or endorsements</strong>.
			</p>

			<h2>Company facts</h2>
			<ul>
				<li>Legal entity: Bonuz Technology DMCC</li>
				<li>Founded: 2021</li>
				<li>
					Headquarters: Almas Tower, Jumeirah Lakes Towers, Dubai, United Arab
					Emirates
				</li>
				<li>Free zone: Dubai Multi Commodities Centre (DMCC)</li>
				<li>Founder and Managing Director: Matthias Mende</li>
				<li>
					Full details on the{" "}
					<a href={`/${locale}/legal/imprint`}>legal notice</a> page
				</li>
			</ul>

			<h2>Founder</h2>
			<p>
				Matthias Mende is a Dubai entrepreneur, working in blockchain and
				consumer technology since the early days. He co-founded the Dubai Blockchain
				Center in 2018 and was named a Binance Industry Advocate in 2025. More
				at{" "}
				<a
					href="https://matthiasmende.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					matthiasmende.com
				</a>
				.
			</p>

			<h2>Contact</h2>
			<p>
				Press and speaking enquiries go through the{" "}
				<a
					href="https://tally.so/r/7RR9r0"
					target="_blank"
					rel="noopener noreferrer"
				>
					intake form
				</a>
				. Security issues go to{" "}
				<a href="mailto:security@bonuz.market">security@bonuz.market</a>.
			</p>
		</ContentPage>
	);
}
