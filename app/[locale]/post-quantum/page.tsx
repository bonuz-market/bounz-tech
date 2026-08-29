import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
	title: "Post-quantum work | Bonuz Technology DMCC",
	description:
		"What we build around post-quantum cryptography: PQ Wallet for BTX, the BTXScan explorer, and postquantum.wiki. ML-DSA and SLH-DSA, the signature schemes standardised by NIST.",
	keywords: [
		"post-quantum cryptography",
		"post-quantum wallet",
		"quantum-resistant blockchain",
		"ML-DSA",
		"SLH-DSA",
		"BTX blockchain",
		"harvest now decrypt later",
	],
	alternates: { canonical: "https://bonuz.tech/en/post-quantum" },
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
			title="Post-quantum"
			lede={
				<p>
					Almost every wallet in existence is secured by elliptic-curve
					signatures. A sufficiently capable quantum computer breaks those. We
					build for the version of that problem that is real today, and we are
					careful about what we claim.
				</p>
			}
			nav={[
				{ href: `/${locale}/white-label`, label: "White label" },
				{ href: `/${locale}/shipping`, label: "What we ship" },
				{ href: `/${locale}/press`, label: "Press" },
			]}
		>
			<h2>The honest version of the threat</h2>
			<p>
				Nobody credible can tell you the year a quantum computer breaks
				secp256k1. Anyone who gives you a confident date is selling something.
				What is not speculative is the shape of the problem:
			</p>
			<ul>
				<li>
					<strong>Signatures are the exposure.</strong> Public keys on a
					blockchain are public by design. Once the maths is broken, everything
					previously signed becomes forgeable.
				</li>
				<li>
					<strong>Migration is slow.</strong> Chains, wallets, exchanges and
					custodians all have to move. That is a multi-year coordination
					problem, which means the work has to start long before the threat
					arrives.
				</li>
				<li>
					<strong>The standards already exist.</strong> NIST finalised ML-DSA
					(FIPS 204) and SLH-DSA (FIPS 205) in 2024. This is no longer research.
				</li>
			</ul>

			<h2>What we actually built</h2>
			<p>
				<strong>
					<a
						href="https://pq-wallet.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						PQ Wallet for BTX
					</a>
				</strong>{" "}
				is a self-custodial desktop wallet whose keys are generated and held on
				your own machine using ML-DSA and SLH-DSA rather than elliptic curves. It
				ships on macOS, Windows and Linux, and it is published on the Microsoft
				Store under Bonuz Technology DMCC. It has shipped continuously: eight
				public releases between 7 July and 17 August 2026 alone.
			</p>
			<p>
				<strong>
					<a
						href="https://btxscan.io"
						target="_blank"
						rel="noopener noreferrer"
					>
						BTXScan
					</a>
				</strong>{" "}
				is a public block explorer for BTX, with an open REST API anyone can
				build on. Neutral infrastructure, not a bonuz-only tool.
			</p>
			<p>
				<strong>
					<a
						href="https://postquantum.wiki"
						target="_blank"
						rel="noopener noreferrer"
					>
						postquantum.wiki
					</a>
				</strong>{" "}
				started as a side project and turned into a serious reference: a cited,
				plain-language encyclopedia of quantum computing and the cryptography
				built to survive it. Over 150 entries, primary sources only, and a
				standing rule against price or investment commentary. If you want depth
				rather than marketing, start there.
			</p>
			<p>
				The <strong>bonuz mobile wallet</strong> carries BTX alongside the major
				chains, so the post-quantum chain is reachable from the same app people
				already use.
			</p>

			<h2>What BTX is, and what it is not</h2>
			<p>
				BTX is a post-quantum, Bitcoin-derived blockchain with a
				matrix-multiplication proof of work and a 21 million cap. It is{" "}
				<strong>not our chain.</strong> It is third-party infrastructure with its
				own node implementation and its own community. We build tools for it
				because we think the design is interesting and the problem is real. We do
				not speak for it, and describing our tools is not an endorsement or a
				warranty of the network.
			</p>

			<h2>What we do not claim</h2>
			<p>
				We are not going to tell you bonuz is &quot;quantum-proof&quot;. The
				accurate statement is narrower and more useful: PQ Wallet for BTX uses
				post-quantum signature schemes today, BTX is a post-quantum chain today,
				and the rest of the ecosystem is on the same path rather than already at
				the end of it. When that changes we will say so here, with something you
				can verify.
			</p>

			<h2>Working on this too?</h2>
			<p>
				If you are migrating a system to post-quantum cryptography, or you want
				to build on BTX, get in touch through the{" "}
				<a
					href="https://tally.so/r/7RR9r0"
					target="_blank"
					rel="noopener noreferrer"
				>
					project intake form
				</a>
				.
			</p>
		</ContentPage>
	);
}
