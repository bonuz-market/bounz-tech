"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SpotlightCard from "@/components/SpotlightCard";
import AiSwitch from "@/components/AiSwitch";
import PlatformMark, {
	SHOW_BRAND_MARKS,
	platformLinks,
} from "@/components/PlatformMark";
import Link from "next/link";
import type { Dictionary, ProofKey } from "@/lib/i18n";

const Galaxy = dynamic(() => import("@/components/Galaxy"), { ssr: false });

// Hidden arcade game. next/dynamic only fetches this chunk when the component is
// actually rendered, so a normal visitor never downloads a byte of it.
const ArcadeEgg = dynamic(() => import("@/components/ArcadeEgg"), { ssr: false });

const KONAMI = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

// The hero galaxy is the signature: animated, mouse-reactive, full quality.
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

// The backdrop galaxies behind "Our work" and the request form. They are
// sticky and viewport-tall (see .backdrop-galaxy), so an animated one costs no
// more than the hero, and each pauses when it scrolls out of view. The stars
// keep flying all the way down (Mende, 30 Oct: "the stars are not flying
// anymore"); only mouse handling stays off, at dpr 1.
const backdropGalaxyProps = {
	...galaxyProps,
	mouseInteraction: false,
	mouseRepulsion: false as const,
	maxDpr: 1,
};

type WorkItemKey = keyof Omit<Dictionary["ourWork"], "title" | "intro" | "footer">;

// Third-party destinations for the "check it yourself" block. Kept in code
// because the URLs are the same in every language.
const proofLinks: Record<ProofKey, string> = {
	basescan:
		"https://basescan.org/address/0x9220070245b67130977FdF32acA4acdF6aD163cC",
	appstore: "https://apps.apple.com/ae/developer/bonuz/id1637687441",
	play: "https://play.google.com/store/apps/dev?id=8658583252213251696",
	github: "https://github.com/bonuz-market",
};

const workItems: {
	key: WorkItemKey;
	href: string;
	external: boolean;
	// Picture of the live site, taken by scripts/shoot-our-work.mjs into
	// public/work/<key>.webp. Items with no public website of their own get
	// a branded panel instead of a made-up screenshot.
	shot?: boolean;
}[] = [
	{ key: "wallet", href: "https://bonuz.xyz", external: true, shot: true },
	{ key: "id", href: "https://bonuz.id", external: true, shot: true },
	{ key: "life", href: "https://bonuz.life", external: true, shot: true },
	{ key: "dashboard", href: "https://app.bonuz.market", external: true, shot: true },
	{ key: "events", href: "https://app.bonuz.xyz", external: true, shot: true },
	{ key: "swapz", href: "https://swapz.bonuz.market", external: true, shot: true },
	{ key: "pqWallet", href: "https://pq-wallet.com", external: true, shot: true },
	{ key: "btxscan", href: "https://btxscan.io", external: true, shot: true },
	{ key: "pqWiki", href: "https://postquantum.wiki", external: true, shot: true },
	{ key: "habibiPass", href: "https://habibipass.bonuz.xyz", external: true, shot: true },
	{ key: "uae971", href: "https://uae971.social", external: true, shot: true },
	{ key: "chess", href: "https://onchainchess.com", external: true, shot: true },
	{ key: "kilocorn", href: "https://kilocorn.com", external: true, shot: true },
	{ key: "skyShield", href: "https://skyshield.bonuz.tech", external: true, shot: true },
	{ key: "whiteLabel", href: "/white-label", external: false },
	{ key: "consulting", href: "#request-intro", external: false },
];

// Icons for the items with no website to photograph. Pictures, not words,
// so the panel needs no translation and does not repeat the card's title.
const panelIconProps = {
	width: 56,
	height: 56,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.5,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};
const workPanelIcon: Partial<Record<WorkItemKey, React.ReactNode>> = {
	// Stacked layers: one engine, your skin on top.
	whiteLabel: (
		<svg {...panelIconProps}>
			<path d="M12 3 3 8l9 5 9-5-9-5Z" />
			<path d="m3 13 9 5 9-5" />
			<path d="m3 17.5 9 5 9-5" opacity="0.5" />
		</svg>
	),
	// Two speech bubbles: a conversation.
	consulting: (
		<svg {...panelIconProps}>
			<path d="M4 5h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
			<path d="M16 9h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v3l-4-3h-4a1 1 0 0 1-1-1v-2" opacity="0.5" />
		</svg>
	),
};

export default function HomePage({
	dict,
	locale,
}: {
	dict: Dictionary;
	locale: string;
}) {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const [arcadeOpen, setArcadeOpen] = useState(false);
	const konamiRef = useRef(0);

	// The only way in. No link, no button, nothing in the DOM to find.
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			const want = KONAMI[konamiRef.current];
			if (e.key === want || e.key.toLowerCase() === want) {
				konamiRef.current += 1;
				if (konamiRef.current === KONAMI.length) {
					konamiRef.current = 0;
					setArcadeOpen(true);
				}
			} else {
				konamiRef.current = e.key === KONAMI[0] ? 1 : 0;
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// A nudge for anyone who opens the console. Nothing on the page hints at it.
	useEffect(() => {
		console.log(
			"%cbonuz%c  the old code still works.",
			"color:#FFA34E;font-weight:700",
			"color:#8a8a8a"
		);
	}, []);

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
		{ href: "#request-intro", label: dict.hero.projectIntake, cta: true },
	];

	useEffect(() => {
		document.body.style.overflow = arcadeOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [arcadeOpen]);

	return (
		<>
			{arcadeOpen && <ArcadeEgg onExit={() => setArcadeOpen(false)} />}

			<a href="#main" className="skip-link">
				{dict.a11y.skipToContent}
			</a>

			<AiSwitch locale={locale} label={dict.a11y.aiView} />

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
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className={`nav-link${link.cta ? " nav-link-cta" : ""}`}
						>
							{link.label}
						</a>
					))}
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

			<main id="main">
			{/* Hero Section */}
			<section id="hero" className="hero">
				<div className="absolute inset-0 z-0" aria-hidden="true">
					{!arcadeOpen && <Galaxy {...galaxyProps} />}
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
				<div className="backdrop-galaxy" aria-hidden="true">
					{!arcadeOpen && <Galaxy {...backdropGalaxyProps} />}
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
										href={
											item.external || item.href.startsWith("#")
												? item.href
												: `/${locale}${item.href}`
										}
										{...(item.external
											? { target: "_blank", rel: "noopener noreferrer" }
											: {})}
									>
										<h3>{work.title}</h3>
										<div className="work-shot" aria-hidden="true">
											{item.shot ? (
												<Image
													src={`/work/${item.key}.webp`}
													alt=""
													width={960}
													height={540}
													sizes="(max-width: 680px) 100vw, (max-width: 1180px) 50vw, 25vw"
												/>
											) : (
												<div className="work-shot-panel">
													{workPanelIcon[item.key]}
												</div>
											)}
										</div>
										<p>{work.description}</p>
									</a>
								</SpotlightCard>
							);
						})}
					</div>

					<p className="work-footer">{dict.ourWork.footer}</p>
				</div>
			</section>

			{/* Registered Developer Section */}
			<section id="credentials" className="section-black">
				<div className="container">
					<h2>{dict.credentials.title}</h2>
					<p className="intro-text">{dict.credentials.intro}</p>
					<ul className="credentials-grid">
						{dict.credentials.items.map((item) => {
							const href = platformLinks[item.name];
							const body = (
								<>
									{SHOW_BRAND_MARKS && <PlatformMark name={item.name} />}
									<span className="credential-name">{item.name}</span>
									<span className="credential-program">{item.program}</span>
								</>
							);
							return (
								<li key={item.name} className="credential">
									{href ? (
										<a
											className="credential-inner credential-link"
											href={href}
											target="_blank"
											rel="noopener noreferrer"
										>
											{body}
										</a>
									) : (
										<div className="credential-inner">{body}</div>
									)}
								</li>
							);
						})}
					</ul>
					<p className="credentials-disclaimer">{dict.credentials.disclaimer}</p>
				</div>
			</section>

			{/* Check it yourself */}
			<section id="proof" className="section-black">
				<div className="container">
					<h2>{dict.proof.title}</h2>
					<p className="intro-text">{dict.proof.intro}</p>
					<ul className="proof-grid">
						{dict.proof.items.map((item) => (
							<li key={item.label} className="proof-item">
								<a
									href={proofLinks[item.key]}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="proof-label">{item.label}</span>
									<span className="proof-detail">{item.detail}</span>
								</a>
							</li>
						))}
					</ul>
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
								href="https://matthiasmende.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Matthias Mende personal website"
							>
								matthiasmende.com
							</a>
							<a
								href="https://x.com/mendematthias"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Matthias Mende on X"
							>
								X
							</a>
							<a
								href="https://www.linkedin.com/in/mendematthias"
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

			{/* FAQ. Rendered because the FAQPage schema declares it; Google requires
			    the content to exist on the page that declares it. Accordion keeps the
			    page short without hiding it from crawlers. */}
			<section id="faq" className="section-black">
				<div className="container">
					<h2>{dict.faq.title}</h2>
					<div className="faq-list">
						{([1, 2, 3, 4, 5, 6, 7] as const).map((n) => {
							const q = dict.faq[`q${n}` as const];
							const a = dict.faq[`a${n}` as const];
							return (
								<details key={n} className="faq-item">
									<summary>{q}</summary>
									<p>{a}</p>
								</details>
							);
						})}
					</div>
				</div>
			</section>

			{/* Project Intake Request Section */}
			<section id="request-intro" className="section-black relative pb-50!">
				<div className="backdrop-galaxy" aria-hidden="true">
					{!arcadeOpen && <Galaxy {...backdropGalaxyProps} />}
				</div>
				<div className="container relative">
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

			</main>

			{/* Footer */}
			<footer className="site-footer">
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
						<span suppressHydrationWarning>
							{dict.footer.copyright.replace(
								"{year}",
								String(new Date().getFullYear())
							)}
						</span>
					</p>
					<nav className="footer-legal" aria-label="More pages">
						<a href={`/${locale}/white-label`}>{dict.ourWork.whiteLabel.title}</a>
						<a href={`/${locale}/post-quantum`}>{dict.footer.postQuantum}</a>
						<a href={`/${locale}/shipping`}>{dict.footer.shipping}</a>
						<a href={`/${locale}/press`}>{dict.footer.press}</a>
						{/* Reopens the bonuz orientation page (loaded from bonuz.life in the layout). */}
						<a href="#" data-bonuz-orientation-open>
							bonuz orientation
						</a>
					</nav>
					<nav className="footer-legal" aria-label="Legal">
						<a href={`/${locale}/legal/privacy`}>{dict.footer.privacy}</a>
						<a href={`/${locale}/legal/terms`}>{dict.footer.terms}</a>
						<a href={`/${locale}/legal/imprint`}>{dict.footer.imprint}</a>
					</nav>
				</div>
			</footer>
		</>
	);
}
