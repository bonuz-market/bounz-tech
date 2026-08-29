import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Terms of Use | Bonuz Technology DMCC",
	description:
		"Terms governing the use of bonuz.tech, the corporate website of Bonuz Technology DMCC, Dubai.",
	alternates: { canonical: "https://bonuz.tech/en/legal/terms" },
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
		<LegalPage locale={locale} title="Terms of Use" updated="29 August 2026">
			<p className="legal-lede">
				These terms cover this website only. Each bonuz product carries its own
				terms and conditions, which govern that product and take precedence over
				anything here.
			</p>

			<h2>Scope</h2>
			<p>
				bonuz.tech is the corporate website of Bonuz Technology DMCC, Dubai,
				United Arab Emirates. By using it you accept these terms. If you do not
				accept them, please do not use the site.
			</p>

			<h2>What this site is</h2>
			<p>
				An informational overview of what the company builds and operates.
				Nothing on this site is an offer, a solicitation, or a binding
				commitment. Product descriptions summarise what a product does at the
				time of writing; the product itself, and its own terms, are the
				authoritative source.
			</p>

			<h2>Not financial or investment advice</h2>
			<p>
				Several of the products described here involve blockchain technology,
				self-custodial wallets and digital assets. Nothing on this site is
				financial, investment, legal or tax advice, and nothing here is a
				recommendation to buy, sell or hold any asset. Self-custody means you
				control your own keys: if you lose them, no one can recover your assets
				for you. Digital assets carry risk, including total loss.
			</p>

			<h2>Third-party technology</h2>
			<p>
				Some products described here interoperate with technology we did not
				create and do not control, including third-party blockchains. Describing
				a product we build for such a network is not a claim of ownership over
				that network, nor an endorsement or warranty of it.
			</p>

			<h2>Intellectual property</h2>
			<p>
				The bonuz name, logo, wordmark, site design and copy are the property of
				Bonuz Technology DMCC. You may quote or link to this site with
				attribution. You may not copy the branding, or present the site or its
				products as your own.
			</p>
			<p>
				All other product names and logos appearing on this site are trademarks
				of their respective owners. Their appearance indicates a developer
				program registration or an available platform, and does not imply any
				endorsement, partnership or sponsorship.
			</p>

			<h2>Availability and accuracy</h2>
			<p>
				We aim to keep this site accurate and available, but we provide it &quot;as
				is&quot;. We do not warrant that it will be uninterrupted or error free, and
				we may change, suspend or withdraw any part of it at any time. To the
				fullest extent permitted by law, we are not liable for any loss arising
				from your use of, or reliance on, this website.
			</p>

			<h2>External links</h2>
			<p>
				This site links to third-party websites and app stores. We do not control
				them and are not responsible for their content, terms or privacy
				practices.
			</p>

			<h2>Governing law</h2>
			<p>
				These terms are governed by the laws of the Emirate of Dubai and the
				applicable federal laws of the United Arab Emirates, with the courts of
				the DMCC free zone and Dubai having jurisdiction.
			</p>

			<h2>Contact</h2>
			<p>
				Questions about these terms can be sent through the{" "}
				<a
					href="https://tally.so/r/7RR9r0"
					target="_blank"
					rel="noopener noreferrer"
				>
					project intake form
				</a>
				. Company details are on the{" "}
				<a href={`/${locale}/legal/imprint`}>legal notice</a> page.
			</p>
		</LegalPage>
	);
}
