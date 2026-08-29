import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Privacy Policy | Bonuz Technology DMCC",
	description:
		"How bonuz.tech handles personal data. This website sets no cookies, runs no analytics and tracks no visitors.",
	alternates: { canonical: "https://bonuz.tech/en/legal/privacy" },
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
		<LegalPage locale={locale} title="Privacy Policy" updated="29 August 2026">
			<p className="legal-lede">
				The short version: this website sets no cookies of its own, runs no
				analytics, and does not track you. We only receive personal data if you
				choose to send it to us through the project intake form.
			</p>

			<h2>Who we are</h2>
			<p>
				Bonuz Technology DMCC, Unit ALMAS-48-CV44, Almas Tower, Jumeirah Lakes
				Towers, Dubai, United Arab Emirates. We are the controller for the
				personal data described on this page. For any privacy question, contact
				us through the{" "}
				<a
					href="https://tally.so/r/7RR9r0"
					target="_blank"
					rel="noopener noreferrer"
				>
					project intake form
				</a>
				.
			</p>

			<h2>What this website collects</h2>
			<p>
				<strong>No cookies and no analytics.</strong> bonuz.tech does not set
				cookies, does not use Google Analytics or any comparable product, and
				runs no advertising, fingerprinting or session-recording scripts. There
				is no consent banner because there is nothing to consent to.
			</p>
			<p>
				<strong>Server logs.</strong> The site is hosted on Vercel. Like any web
				host, Vercel processes technical request data such as your IP address,
				browser user agent and the page requested, in order to serve the site
				and protect it from abuse. We do not combine this with anything else and
				we do not use it to build a profile of you.
			</p>
			<p>
				<strong>Fonts on the Arabic and Chinese pages.</strong> The English and
				German pages load all fonts from this domain. The Arabic and Chinese
				pages additionally load a script-specific font from Google Fonts
				(fonts.googleapis.com and fonts.gstatic.com), which means your IP address
				is transmitted to Google when you view those two versions. If you would
				rather avoid that, use the English or German version of the page.
			</p>

			<h2>If you contact us</h2>
			<p>
				The project intake form is hosted by Tally (tally.so) and opens on their
				domain. Whatever you enter there, typically your name, an email address
				and a description of your project, is processed by Tally on our behalf
				and passed to us. We use it only to reply to you and to evaluate the
				enquiry. We do not sell it, we do not add you to a marketing list, and we
				do not share it with anyone outside the company except the service
				providers named on this page.
			</p>
			<p>
				We keep enquiry correspondence for as long as it is commercially useful
				and then delete it. If you want your enquiry deleted sooner, ask us and
				we will do it.
			</p>

			<h2>Who else processes data</h2>
			<ul>
				<li>
					<strong>Vercel Inc.</strong> hosting and content delivery for this
					website.
				</li>
				<li>
					<strong>Tally</strong> the project intake form.
				</li>
				<li>
					<strong>Google LLC</strong> font delivery, on the Arabic and Chinese
					pages only.
				</li>
			</ul>
			<p>
				These providers operate internationally, so data may be processed outside
				the UAE and outside the EEA.
			</p>

			<h2>Links to other sites</h2>
			<p>
				This site links to our own products and to third-party stores such as the
				App Store, Google Play and the Microsoft Store. Once you follow a link
				you are on someone else&apos;s site, under their privacy policy, not this
				one. Our individual products have their own terms and privacy notices.
			</p>

			<h2>Your rights</h2>
			<p>
				Depending on where you live, you may have the right to ask what personal
				data we hold about you, to have it corrected or deleted, to object to or
				restrict how we use it, and to receive a copy. This includes people
				covered by the UAE Personal Data Protection Law and by the GDPR. Contact
				us and we will action it. You also have the right to complain to your
				local data protection authority.
			</p>

			<h2>Children</h2>
			<p>
				This is a business website and is not directed at children. We do not
				knowingly collect personal data from anyone under 18 through it.
			</p>

			<h2>Changes</h2>
			<p>
				If this policy changes materially we will update the date at the top of
				the page. This version was published on 29 August 2026.
			</p>
		</LegalPage>
	);
}
