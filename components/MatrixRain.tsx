"use client";

import { useEffect, useRef } from "react";

/**
 * Decoding rain behind the machine-readable page.
 *
 * Purely decorative and aria-hidden. Every fact on that page is real DOM text
 * sitting above this, so a crawler, a screen reader or a text browser loses
 * nothing by never rendering it.
 *
 * Cheap on purpose: 2D canvas, dpr 1, capped at 20fps, paused when the tab is
 * hidden or the section scrolls away, and skipped entirely under
 * prefers-reduced-motion.
 */

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]/\\=+*#$%&";
const FPS = 20;

export default function MatrixRain() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		let w = 0;
		let h = 0;
		let cols = 0;
		let drops: number[] = [];
		let speeds: number[] = [];
		const SIZE = 14;

		function resize() {
			w = canvas!.clientWidth;
			h = canvas!.clientHeight;
			canvas!.width = w;
			canvas!.height = h;
			cols = Math.ceil(w / SIZE);
			drops = Array.from({ length: cols }, () => Math.random() * -60);
			speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.75);
			ctx!.font = `${SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`;
			ctx!.textBaseline = "top";
		}
		resize();
		window.addEventListener("resize", resize);

		let raf = 0;
		let last = 0;
		let visible = true;
		const minMs = 1000 / FPS;

		function frame(t: number) {
			raf = requestAnimationFrame(frame);
			if (!visible || t - last < minMs) return;
			last = t;

			// Fade rather than clear, so trails persist for a few frames.
			ctx!.fillStyle = "rgba(0, 0, 0, 0.09)";
			ctx!.fillRect(0, 0, w, h);

			for (let i = 0; i < cols; i++) {
				const y = drops[i] * SIZE;
				if (y > 0 && y < h) {
					const g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
					// Head is bright, tail is a dim orange.
					ctx!.fillStyle =
						Math.random() < 0.06 ? "rgba(255,163,78,0.85)" : "rgba(255,163,78,0.22)";
					ctx!.fillText(g, i * SIZE, y);
				}
				drops[i] += speeds[i];
				if (y > h && Math.random() > 0.985) drops[i] = Math.random() * -30;
			}
		}

		const io = new IntersectionObserver(
			(entries) => {
				visible = entries[0]?.isIntersecting ?? true;
			},
			{ threshold: 0 }
		);
		io.observe(canvas);

		function onVis() {
			visible = !document.hidden;
		}
		document.addEventListener("visibilitychange", onVis);

		raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			window.removeEventListener("resize", resize);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);

	return <canvas ref={ref} className="matrix-rain" aria-hidden="true" />;
}
