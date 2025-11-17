"use client";

import Image from "next/image";
import FloatingLines from "@/components/FloatingLines";

export default function Home() {
	const currentYear = new Date().getFullYear();

	return (
		<>
			{/* Logo */}
			<a href="#" className="logo">
				<Image
					src="https://res.cloudinary.com/dsmd4srf6/image/upload/v1763314576/1846x512_gr44cm.png"
					alt="Bonuz Logo"
					width={180}
					height={50}
					priority
				/>
			</a>

			{/* Hero Section */}
			<section className="hero">
				<div className="absolute inset-0 z-0">
					<FloatingLines
						linesGradient={[
							"#db2777", // Vibrant pink/magenta
							"#a855f7", // Purple
							"#6366f1", // Blue-purple
							"#3b82f6", // Bright blue
						]}
						enabledWaves={["top", "middle", "bottom"]}
						lineCount={[12, 12, 12]}
						lineDistance={[43.5, 43.5, 43.5]}
						topWavePosition={{ x: 10.0, y: 0.5, rotate: -0.4 }}
						middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
						bottomWavePosition={{ x: 2.0, y: -0.7, rotate: 0.4 }}
						animationSpeed={0.8}
						interactive={true}
						bendRadius={4.5}
						bendStrength={-0.5}
						mouseDamping={0.05}
						parallax={false}
						mixBlendMode="screen"
					/>
				</div>

				<div className="hero-content">
					<h1>
						We build simple consumer products that make humans more sovereign.
					</h1>
					<p className="sub-headline">
						Bonuz Technology DMCC is a Dubai-based software development house.
						<br />A small team of legendary full-stack builders shipping
						products for the Bonuz ecosystem and a few selected partners.
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
						We design, build, and operate digital products end-to-end.
						<br />
						From architecture to deployment, we turn complex infrastructure and
						protocols into interfaces anyone can use in seconds.
					</p>
					<ul className="features-list">
						<li>Full-stack product development</li>
						<li>Infrastructure & protocol integrations</li>
						<li>Product and infrastructure consulting (selective)</li>
						<li>Long-term operation and iteration</li>
					</ul>
				</div>
			</section>

			{/* Our Work Section */}
			<section id="our-work" className="section-black">
				<div className="container">
					<h2>Our work</h2>
					<p className="intro-text">A few examples of what we build and run:</p>

					<div className="work-grid">
						<div className="work-card">
							<h3>Bonuz Social Wallet</h3>
							<p>
								A consumer wallet with social features, quests, and real-world
								rewards. Built to feel like a normal app, even when everything
								under the hood is advanced.
							</p>
						</div>

						<div className="work-card">
							<h3>Bonuz ID</h3>
							<p>
								A unified profile layer where people connect their links,
								socials, and presence into one simple public page.
							</p>
						</div>

						<div className="work-card">
							<h3>Bonuz Partner Dashboard</h3>
							<p>
								A comprehensive backend for our partners that could be brands,
								enterprises, events, restaurants, communities, creators or
								others can create their real world quests, loyalty or membership
								programs and more with our super easy and intuitive tools.
							</p>
						</div>

						<div className="work-card">
							<h3>White-label platforms</h3>
							<p>
								We reuse our core modules – identity, wallets, quests, rewards,
								dashboards – to launch fully branded apps for selected partners.
								Same engine, different skins, customized journeys.
							</p>
						</div>

						<div className="work-card">
							<h3>Consulting</h3>
							<p>
								We occasionally consult on product architecture, user
								experience, and infrastructure choices for teams building in or
								around the Bonuz ecosystem.
							</p>
						</div>
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
							consumer technology since early days.
						</p>
						<div className="founder-links">
							<a
								href="https://x.com/matthiasmende"
								target="_blank"
								rel="noopener noreferrer"
							>
								X (Twitter)
							</a>
							<a
								href="https://linkedin.com/in/matthiasmende"
								target="_blank"
								rel="noopener noreferrer"
							>
								LinkedIn
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Request Intro Section */}
			<section id="request-intro" className="section-black">
				<div className="container">
					<h2>Request intro</h2>
					<div className="request-content">
						<p className="intro-text">
							If you don&apos;t already have a direct line to us, you can
							request an intro via the form below.
						</p>
						<a href="https://forms.gle/your-form-link" className="btn-form">
							Open request form
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer>
				<div className="container">
					<p>
						&copy; {currentYear} Bonuz Technology DMCC · Dubai, United Arab
						Emirates
					</p>
				</div>
			</footer>
		</>
	);
}
