"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scramble-then-resolve reveal.
 *
 * The real string is rendered on the server and is the only thing in the DOM at
 * rest, so crawlers, screen readers and no-JS visitors always get plain text.
 * The scramble is a client-side visual pass that starts from the real text and
 * ends on it, and it is skipped entirely under prefers-reduced-motion.
 */

const CHARS = "ABCDEF0123456789<>/\\{}[]#$%&*+=";

export default function DecryptText({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const [shown, setShown] = useState(text);
	const ref = useRef<HTMLSpanElement>(null);
	const doneRef = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el || doneRef.current) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let raf = 0;
		let start = 0;
		const DURATION = 620;

		function run(t: number) {
			if (!start) start = t;
			const p = Math.min(1, (t - start) / DURATION);
			// Characters lock in left to right.
			const locked = Math.floor(p * text.length);
			let out = text.slice(0, locked);
			for (let i = locked; i < text.length; i++) {
				out +=
					text[i] === " "
						? " "
						: CHARS[(Math.random() * CHARS.length) | 0];
			}
			setShown(out);
			if (p < 1) {
				raf = requestAnimationFrame(run);
			} else {
				setShown(text);
				doneRef.current = true;
			}
		}

		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !doneRef.current) {
					raf = requestAnimationFrame(run);
					io.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(el);

		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	}, [text]);

	return (
		<span ref={ref} className={className} data-text={text}>
			{shown}
		</span>
	);
}
