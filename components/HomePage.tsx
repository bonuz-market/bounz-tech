"use client";

import Image from "next/image";
import Galaxy from "@/components/Galaxy";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

export default function HomePage({
	dict,
	locale,
}: {
	dict: Dictionary;
	locale: string;
}) {
	const currentYear = new Date().getFullYear();

	return (
		<>
			{/* Header Navigation */}
			<header className="site-header">
				<Link
					href={`/${locale}`}
					className="header-logo"
					aria-label="Bonuz Technology - Home"
				>
					<Image
						src="/logo.svg"
						alt="Bonuz Logo"
						width={180}
						height={50}
						priority
					/>
				</Link>

				<nav className="header-nav" aria-label="Main navigation">
					<a href="#what-we-do" className="nav-link">
						{dict.whatWeDo.title}
					</a>
					<a href="#our-work" className="nav-link">
						{dict.ourWork.title}
					</a>
					<a href="#founder" className="nav-link">
						{dict.founder.title}
					</a>
					<a href="#request-intro" className="nav-link nav-link-cta">
						{dict.hero.projectIntake}
					</a>
				</nav>
			</header>

			{/* Hero Section */}
			<section id="hero" className="hero">
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
					<h1>{dict.hero.title}</h1>
					<p className="sub-headline">{dict.hero.subtitle}</p>
					<p className="rule-line">{dict.hero.rule}</p>
					<div className="hero-buttons">
						<a href="#our-work" className="btn btn-primary">
							{dict.hero.seeWork}
						</a>
						<a href="#request-intro" className="btn btn-secondary">
							{dict.hero.projectIntake}
						</a>
					</div>
				</div>
			</section>

			{/* What We Do Section */}
			<section id="what-we-do" className="section-black">
				<div className="container">
					<h2>{dict.whatWeDo.title}</h2>
					<p className="intro-text">{dict.whatWeDo.intro}</p>
					<ul className="features-list">
						{dict.whatWeDo.features.map((feature, i) => (
							<li key={i}>{feature}</li>
						))}
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
					<h2>{dict.ourWork.title}</h2>
					<p className="intro-text">{dict.ourWork.intro}</p>

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
								<h3>{dict.ourWork.wallet.title}</h3>
								<p>{dict.ourWork.wallet.description}</p>
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
								<h3>{dict.ourWork.id.title}</h3>
								<p>{dict.ourWork.id.description}</p>
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
								<h3>{dict.ourWork.dashboard.title}</h3>
								<p>{dict.ourWork.dashboard.description}</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a
								className="work-card"
								href="https://app.bonuz.xyz"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h3>{dict.ourWork.events.title}</h3>
								<p>{dict.ourWork.events.description}</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a
								className="work-card"
								href="https://onchainchess.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h3>{dict.ourWork.chess.title}</h3>
								<p>{dict.ourWork.chess.description}</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a
								className="work-card"
								href="https://habibipass.bonuz.xyz"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h3>{dict.ourWork.habibiPass.title}</h3>
								<p>{dict.ourWork.habibiPass.description}</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a className="work-card" href="#request-intro">
								<h3>{dict.ourWork.whiteLabel.title}</h3>
								<p>{dict.ourWork.whiteLabel.description}</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a className="work-card" href="#request-intro">
								<h3>{dict.ourWork.consulting.title}</h3>
								<p>{dict.ourWork.consulting.description}</p>
							</a>
						</SpotlightCard>

						<SpotlightCard
							className="work-card-wrapper"
							spotlightColor="rgba(255, 0, 204, 0.25)"
						>
							<a className="work-card" href="#request-intro">
								<h3>{dict.ourWork.nextLayer.title}</h3>
								<p>{dict.ourWork.nextLayer.description}</p>
							</a>
						</SpotlightCard>
					</div>

					<p className="work-footer">{dict.ourWork.footer}</p>
				</div>
			</section>

			{/* Founder Section */}
			<section id="founder" className="section-black">
				<div className="container">
					<h2>{dict.founder.title}</h2>
					<div className="founder-content">
						<p className="intro-text">
							{dict.founder.bio}
							<br /> {dict.founder.mission1}
							<br /> {dict.founder.mission2}
						</p>
						<div className="founder-links">
							<a
								href="https://x.com/mendematthias"
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

			{/* Project Intake Request Section */}
			<section id="request-intro" className="section-black pb-50!">
				<div className="container">
					<h2>{dict.intake.title}</h2>
					<div className="request-content">
						<p className="intro-text">{dict.intake.description}</p>
						<a href="https://tally.so/r/7RR9r0" className="btn-form" target="_blank" rel="noopener noreferrer">
							{dict.intake.button}
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer>
				<div className="container">
					<p className="text-lg!">{dict.footer.quote}</p>
					<div className="flex items-center justify-center gap-4 mt-4 mb-3">
						<a
							href="https://x.com/bonuzmarket"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-500 hover:text-white transition-colors text-sm"
							aria-label="Bonuz on X"
						>
							𝕏
						</a>
						<span className="text-gray-700">·</span>
						<a
							href="https://linkedin.com/company/bonuzmarket"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-500 hover:text-white transition-colors text-sm"
							aria-label="Bonuz on LinkedIn"
						>
							LinkedIn
						</a>
						<span className="text-gray-700">·</span>
						<a
							href="https://github.com/bonuz-market"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-500 hover:text-white transition-colors text-sm"
							aria-label="Bonuz on GitHub"
						>
							GitHub
						</a>
					</div>
					<p className="text-sm! text-gray-500!">
						{dict.footer.copyright.replace(
							"{year}",
							String(currentYear)
						)}
					</p>
				</div>
			</footer>
		</>
	);
}
