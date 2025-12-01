"use client";

import Image from "next/image";
import Galaxy from "@/components/Galaxy";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";

export default function Home() {
	const currentYear = new Date().getFullYear();

	return (
		<>
			{/* Logo */}
			<Link href="/" className="logo" aria-label="Bonuz Technology - Home">
				<Image
					src="https://res.cloudinary.com/dsmd4srf6/image/upload/v1763314576/1846x512_gr44cm.png"
					alt="Bonuz Logo"
					width={180}
					height={50}
					priority
				/>
			</Link>

			{/* Hero Section */}
			<section className="hero">
				<div className="absolute inset-0 z-0">
					<Galaxy
						hueShift={220}
						density={0.6}
						glowIntensity={0.3}
						saturation={0.8}
						speed={0.8}
						starSpeed={0.4}
						twinkleIntensity={0.9}
						rotationSpeed={0.15}
						mouseRepulsion={true}
						repulsionStrength={0.3}
						mouseInteraction={true}
						autoCenterRepulsion={0}
						transparent={true}
					/>
				</div>

				<div className="hero-content">
					<h1>We forge invisible technology that makes humans sovereign.</h1>
					<p className="sub-headline">
						Dubai. Present day. We don&apos;t follow trends. We architect the
						next layer of reality.
					</p>
					<p className="rule-line">
						Our rule: if your grandmother can&apos;t use it in 30 seconds, then
						it&apos;s not ready.
					</p>
					<div className="hero-buttons">
						<a href="#our-work" className="btn btn-primary">
							See our work
						</a>
						<a href="#request-intro" className="btn btn-secondary">
							Request intro
						</a>
					</div>
				</div>
			</section>

			{/* What We Do Section */}
			<section id="what-we-do" className="section-black">
				<div className="container">
					<h2>What we do</h2>
					<p className="intro-text">
						We invent, design, and operate the hidden infrastructure of
						tomorrow. From self-custodial souls to living digital passes, from
						onchain identities to white-label empires. Blockchain · AI · AR ·
						Spatial computing · Whatever it takes. The tech is invisible. The
						sovereignty is permanent.
					</p>
					<ul className="features-list">
						<li>Research & development</li>
						<li>Full-stack product development</li>
						<li>Infrastructure & protocol integrations</li>
						<li>Product and infrastructure consulting (selective)</li>
						<li>Long-term operation and iteration</li>
						<li>
							Future systems (AR lenses, AI companions, smart-glass-native
							experiences – shipping when ready)
						</li>
					</ul>
				</div>
			</section>

			{/* Our Work Section */}
			<section id="our-work" className="section-black relative">
				<div className="absolute inset-0 z-0">
					<Galaxy
						hueShift={220}
						density={0.6}
						glowIntensity={0.3}
						saturation={0.8}
						speed={0.8}
						starSpeed={0.4}
						twinkleIntensity={0.9}
						rotationSpeed={0.15}
						mouseRepulsion={true}
						repulsionStrength={0.3}
						mouseInteraction={true}
						autoCenterRepulsion={0}
						transparent={true}
					/>
				</div>
				<div className="container relative">
					<h2>Our work</h2>
					<p className="intro-text">Examples of what we build:</p>

					<div className="work-grid">
						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a
								className="work-card"
								href="https://bonuz.xyz"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h3>bonuz Social Wallet</h3>
								<p>
									An award-winning consumer-grade self-custodial wallet with
									social features, quests, loyalty programs for the real-world.
									Built to feel like a normal app, even when everything under
									the hood is advanced. Self-sovereignty starts here. Available
									for iOS and Android.
								</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a
								className="work-card"
								href="https://bonuz.id"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h3>bonuz ID</h3>
								<p>
									A unified profile layer where people connect their favorite
									links, socials, and presence into one simple public page.
									It&apos;s like Linktree, but more advanced and free.
								</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a
								className="work-card"
								href="https://app.bonuz.market"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h3>bonuz Partner Dashboard</h3>
								<p>
									A comprehensive dashboard to empower our brand partners such
									as events, restaurants, communities, enterprises, creators and
									others to create their real-world quests, loyalty or
									membership programs and more with our easy-to-use tools.
								</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a className="work-card" href="#request-intro">
								<h3>White-label platforms</h3>
								<p>
									For selected enterprises we use our core modules and
									infrastructure such as the identity, wallet structure, quest,
									loyalty and membership systems in order to launch fully
									branded apps without the need build anything from scratch.
									Same engine, different skins, customized journeys.
								</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a className="work-card" href="#request-intro">
								<h3>Consulting</h3>
								<p>
									We occasionally consult on product architecture, user
									experience, and infrastructure choices for teams building in
									or around the bonuz ecosystem.
								</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a className="work-card" href="#request-intro">
								<h3>Next Layer</h3>
								<p>
									Coming soon. The same magic, but in your glasses. Onchain
									presence meets spatial reality.
								</p>
							</a>
						</SpotlightCard>
					</div>

					<p className="work-footer">
						Most of what we build is never loud. It just works.
					</p>
				</div>
			</section>

			{/* Founder Section */}
			<section id="founder" className="section-black">
				<div className="container">
					<h2>Founder</h2>
					<div className="founder-content">
						<p className="intro-text">
							Bonuz Technology DMCC is owned and led by Matthias Mende, an
							entrepreneur and builder based in Dubai, active in blockchain and
							consumer technology since early days. He also co-founded the Dubai
							Blockchain Center in 2018.
							<br /> We are not here to build another app.
							<br /> We are here to make technology disappear.
						</p>
						<div className="founder-links">
							<a
								href="https://x.com/matthiasmende"
								target="_blank"
								rel="noopener noreferrer"
							>
								X
							</a>
							<a
								href="https://linkedin.com/in/matthiasmende"
								target="_blank"
								rel="noopener noreferrer"
							>
								LinkedIn
							</a>
							<a
								href="https://bonuz.id/mende"
								target="_blank"
								rel="noopener noreferrer"
							>
								bonuz ID
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Request Intro Section */}
			<section id="request-intro" className="section-black pb-50!">
				<div className="container">
					<h2>Request intro</h2>
					<div className="request-content">
						<p className="intro-text">
							If you don&apos;t already have a direct line to us, you can
							request an intro via the form below.
						</p>
						<a href="https://tally.so/r/7RR9r0" className="btn-form">
							Open request form
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer>
				<div className="container">
					<p className="text-lg!">
						&quot;The future is self-custodial. The future is spatial. The
						future is bonuz.&quot;
					</p>
					<p className="text-sm! text-gray-500!">
						&copy; {currentYear} Bonuz Technology DMCC · Dubai, United Arab
						Emirates
					</p>
				</div>
			</footer>
		</>
	);
}
