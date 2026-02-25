"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	function switchLocale(newLocale: Locale) {
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
		setOpen(false);
		router.push(newPath);
	}

	return (
		<div className="lang-switcher" ref={ref}>
			<button
				className="lang-btn"
				onClick={() => setOpen(!open)}
				aria-label="Switch language"
				aria-expanded={open}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M2 12h20" />
					<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
				</svg>
				<span>{locale.toUpperCase()}</span>
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`lang-chevron ${open ? "lang-chevron-open" : ""}`}
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>
			<div className={`lang-dropdown ${open ? "lang-dropdown-open" : ""}`}>
				{locales.map((l) => (
					<button
						key={l}
						className={`lang-option ${l === locale ? "lang-option-active" : ""}`}
						onClick={() => switchLocale(l)}
					>
						<span className="lang-option-code">{l.toUpperCase()}</span>
						<span className="lang-option-name">{localeNames[l]}</span>
					</button>
				))}
			</div>
		</div>
	);
}
