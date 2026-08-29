import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Legal Notice",
	description:
		"Company details for Bonuz Technology DMCC: legal entity, registered address in Dubai, management and contact.",
	alternates: { canonical: "https://bonuz.tech/en/legal/imprint" },
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
		<LegalPage locale={locale} title="Legal Notice" updated="29 August 2026">
			<p className="legal-lede">
				Company information for bonuz.tech, published in line with the disclosure
				expectations of the jurisdictions we serve, including the German
				Impressum requirement.
			</p>

			<h2>Company</h2>
			<dl className="legal-facts">
				<dt>Legal entity</dt>
				<dd>Bonuz Technology DMCC</dd>

				<dt>Registered address</dt>
				<dd>
					Unit ALMAS-48-CV44, Almas Tower
					<br />
					Jumeirah Lakes Towers
					<br />
					Dubai, United Arab Emirates
				</dd>

				<dt>Free zone</dt>
				<dd>Dubai Multi Commodities Centre (DMCC)</dd>

				<dt>Founded</dt>
				<dd>2021</dd>

				<dt>Managing Director</dt>
				<dd>Matthias Mende</dd>

				<dt>Responsible for content</dt>
				<dd>Matthias Mende, at the address above</dd>

				<dt>Contact</dt>
				<dd>
					<a
						href="https://tally.so/r/7RR9r0"
						target="_blank"
						rel="noopener noreferrer"
					>
						Project intake form
					</a>
				</dd>

				<dt>Security contact</dt>
				<dd>
					<a href="mailto:security@bonuz.market">security@bonuz.market</a>
				</dd>
			</dl>

			<h2>Verify us</h2>
			<p>
				Our legal entity is the named publisher on every store we ship to, so you
				do not have to take our word for any of this:
			</p>
			<ul>
				<li>
					<a
						href="https://apps.apple.com/ae/developer/bonuz/id1637687441"
						target="_blank"
						rel="noopener noreferrer"
					>
						Apple App Store developer page
					</a>
				</li>
				<li>
					<a
						href="https://play.google.com/store/apps/dev?id=8658583252213251696"
						target="_blank"
						rel="noopener noreferrer"
					>
						Google Play developer page
					</a>
				</li>
				<li>
					<a
						href="https://apps.microsoft.com/detail/9nnfjbph98c6"
						target="_blank"
						rel="noopener noreferrer"
					>
						Microsoft Store listing
					</a>
				</li>
			</ul>

			<h2>Dispute resolution</h2>
			<p>
				We are not obliged to participate, and do not participate, in dispute
				resolution proceedings before a consumer arbitration board.
			</p>

			<h2>Liability for content and links</h2>
			<p>
				We prepare the content of this site with care but cannot guarantee it is
				complete or current. This site contains links to external websites over
				which we have no control; responsibility for their content rests with
				their respective operators. If we become aware of an infringement we will
				remove the link promptly.
			</p>

			<h2>Legal documents</h2>
			<p>
				See also our <a href={`/${locale}/legal/privacy`}>Privacy Policy</a> and{" "}
				<a href={`/${locale}/legal/terms`}>Terms of Use</a>. Individual bonuz
				products carry their own terms and conditions, which govern those
				products.
			</p>
		</LegalPage>
	);
}
