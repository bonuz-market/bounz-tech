"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

const Galaxy = dynamic(() => import("@/components/Galaxy"), { ssr: false });

const currentYear = new Date().getFullYear();

const galaxyProps = {
	hueShift: 220,
	density: 0.6,
	glowIntensity: 0.3,
	saturation: 0.8,
	speed: 0.8,
	starSpeed: 0.4,
	twinkleIntensity: 0.9,
	rotationSpeed: 0.15,
	mouseRepulsion: true as const,
	repulsionStrength: 0.3,
	mouseInteraction: true,
	autoCenterRepulsion: 0,
	transparent: true,
};

type WorkItemKey = keyof Omit<Dictionary["ourWork"], "title" | "intro" | "footer">;

const workItems: {
	key: WorkItemKey;
	href: string;
	external: boolean;
}[] = [
	{ key: "wallet", href: "https://bonuz.xyz", external: true },
	{ key: "id", href: "https://bonuz.id", external: true },
	{ key: "dashboard", href: "https://app.bonuz.market", external: true },
	{ key: "events", href: "https://app.bonuz.xyz", external: true },
	{ key: "chess", href: "https://onchainchess.com", external: true },
	{ key: "habibiPass", href: "https://habibipass.bonuz.xyz", external: true },
	{ key: "uae971", href: "https://uae971.social", external: true },
	{ key: "skyShield", href: "https://skyshield.bonuz.tech", external: true },
	{ key: "kilocorn", href: "https://kilocorn.com", external: true },
	{ key: "whiteLabel", href: "#request-intro", external: false },
	{ key: "consulting", href: "#request-intro", external: false },
	{ key: "nextLayer", href: "#request-intro", external: false },
];

export default function HomePage({
	dict,
	locale,
}: {
	dict: Dictionary;
	locale: string;
}) {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Close mobile menu on Escape key
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape" && menuOpen) {
				setMenuOpen(false);
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [menuOpen]);

	const navLinks = [
		{ href: "#what-we-do", label: dict.whatWeDo.title },
		{ href: "#our-work", label: dict.ourWork.title },
		{ href: "#founder", label: dict.founder.title },
		{ href: "#request-intro", label: dict.hero.projectIntake },
	];

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
						alt="Bonuz Technology DMCC"
						width={180}
						height={50}
						priority
					/>
				</Link>

				{/* Desktop nav */}
				<nav className="header-nav" aria-label="Main navigation">
					{navLinks.slice(0, 3).map((link) => (
						<a key={link.href} href={link.href} className="nav-link">
							{link.label}
						</a>
					))}
					<a href="#request-intro" className="nav-link nav-link-cta">
						{dict.hero.projectIntake}
					</a>
				</nav>

				{/* Mobile menu */}
				<div className="mobile-menu" ref={menuRef}>
					<button
						className="mobile-menu-btn"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							{menuOpen ? (
								<>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</>
							) : (
								<>
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</>
							)}
						</svg>
					</button>
					<div
						className={`mobile-menu-dropdown ${menuOpen ? "mobile-menu-dropdown-open" : ""}`}
						role="menu"
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="mobile-menu-link"
								role="menuitem"
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section id="hero" className="hero">
				<div className="absolute inset-0 z-0" aria-hidden="true">
					<Galaxy {...galaxyProps} />
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
				<div className="absolute inset-0 z-0" aria-hidden="true">
					<Galaxy {...galaxyProps} />
				</div>
				<div className="container relative">
					<h2>{dict.ourWork.title}</h2>
					<p className="intro-text">{dict.ourWork.intro}</p>

					<div className="work-grid">
						{workItems.map((item) => {
							const work = dict.ourWork[item.key];
							return (
								<SpotlightCard
									key={item.key}
									className="work-card-wrapper"
									spotlightColor="rgba(255, 0, 204, 0.25)"
								>
									<a
										className="work-card"
										href={item.href}
										{...(item.external
											? { target: "_blank", rel: "noopener noreferrer" }
											: {})}
									>
										<h3>{work.title}</h3>
										<p>{work.description}</p>
									</a>
								</SpotlightCard>
							);
						})}
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
								aria-label="Matthias Mende on X"
							>
								X
							</a>
							<a
								href="https://linkedin.com/in/matthiasmende"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Matthias Mende on LinkedIn"
							>
								LinkedIn
							</a>
							<a
								href="https://bonuz.id/mende"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Matthias Mende on bonuz ID"
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
						<a
							href="https://tally.so/r/7RR9r0"
							className="btn-form"
							target="_blank"
							rel="noopener noreferrer"
						>
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
							className="text-gray-400 hover:text-white transition-colors text-sm"
							aria-label="Bonuz on X"
						>
							&#x1D54F;
						</a>
						<span className="text-gray-700">·</span>
						<a
							href="https://linkedin.com/company/bonuzmarket"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors text-sm"
							aria-label="Bonuz on LinkedIn"
						>
							LinkedIn
						</a>
						<span className="text-gray-700">·</span>
						<a
							href="https://github.com/bonuz-market"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors text-sm"
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
