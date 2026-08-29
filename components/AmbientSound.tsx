"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Ambient "quantum energy" bed. Generative, not a file.
 *
 * Two reasons it is generated rather than looped from an mp3: nothing to
 * download, and there is no loop point, so it never audibly repeats. A drifting
 * drone, a slowly swept pad and three shimmer partials that breathe against each
 * other, plus a soft bloom every 20 to 45 seconds.
 *
 * OFF by default and remembered per visitor. Browsers block autoplay anyway, but
 * the stronger reason is that a company site should never ambush someone with
 * sound. WCAG 1.4.2 also requires a way to stop audio that runs past 3 seconds.
 */

const STORAGE_KEY = "bonuz.ambient";

/**
 * Kept here rather than in the dictionaries because this renders from the locale
 * layout, which deliberately does not load a dictionary (that would put a
 * dictionary import on every subpage render).
 */
const LABELS: Record<string, string> = {
	en: "Ambient sound",
	de: "Hintergrundklang",
	ar: "الصوت المحيط",
	zh: "环境音",
};
const TARGET_GAIN = 0.055;
const FADE_IN = 1.1;

export default function AmbientSound({ locale }: { locale: string }) {
	const label = LABELS[locale] ?? LABELS.en;
	const [on, setOn] = useState(false);
	const ctxRef = useRef<AudioContext | null>(null);
	const masterRef = useRef<GainNode | null>(null);
	const stopRef = useRef<(() => void) | null>(null);

	const build = useCallback(() => {
		if (ctxRef.current) return;
		const Ctor =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext })
				.webkitAudioContext;
		if (!Ctor) return;

		const ctx = new Ctor();
		ctxRef.current = ctx;

		const master = ctx.createGain();
		master.gain.value = 0;
		masterRef.current = master;

		// A short generated impulse gives the whole bed space without shipping a file.
		const len = Math.floor(ctx.sampleRate * 2.6);
		const ir = ctx.createBuffer(2, len, ctx.sampleRate);
		for (let c = 0; c < 2; c++) {
			const d = ir.getChannelData(c);
			for (let i = 0; i < len; i++) {
				d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
			}
		}
		const verb = ctx.createConvolver();
		verb.buffer = ir;
		const verbGain = ctx.createGain();
		verbGain.gain.value = 0.5;

		master.connect(ctx.destination);
		verb.connect(verbGain);
		verbGain.connect(master);

		const nodes: { stop: () => void }[] = [];

		// Slow LFO helper: returns a gain node whose value breathes.
		function breathe(node: AudioParam, base: number, depth: number, secs: number) {
			const lfo = ctx.createOscillator();
			lfo.type = "sine";
			lfo.frequency.value = 1 / secs;
			const amt = ctx.createGain();
			amt.gain.value = depth;
			node.value = base;
			lfo.connect(amt);
			amt.connect(node);
			lfo.start();
			nodes.push({ stop: () => lfo.stop() });
		}

		// Drone: root and a fifth, slightly detuned so they drift against each other.
		for (const [freq, detune] of [
			[55, -4],
			[55, 5],
			[82.4, 3],
		] as const) {
			const o = ctx.createOscillator();
			o.type = "triangle";
			o.frequency.value = freq;
			o.detune.value = detune;
			const g = ctx.createGain();
			g.gain.value = 0.16;
			o.connect(g);
			g.connect(master);
			g.connect(verb);
			o.start();
			nodes.push({ stop: () => o.stop() });
		}

		// Pad: a soft saw under a filter that sweeps very slowly.
		const pad = ctx.createOscillator();
		pad.type = "sawtooth";
		pad.frequency.value = 110;
		const padFilter = ctx.createBiquadFilter();
		padFilter.type = "lowpass";
		padFilter.Q.value = 6;
		breathe(padFilter.frequency, 320, 190, 41);
		const padGain = ctx.createGain();
		padGain.gain.value = 0.05;
		pad.connect(padFilter);
		padFilter.connect(padGain);
		padGain.connect(master);
		padGain.connect(verb);
		pad.start();
		nodes.push({ stop: () => pad.stop() });

		// Shimmer: three partials breathing on different periods, so the texture
		// never lands in the same place twice.
		[
			[440, 23],
			[660, 31],
			[880, 37],
		].forEach(([f, secs]) => {
			const o = ctx.createOscillator();
			o.type = "sine";
			o.frequency.value = f;
			const g = ctx.createGain();
			breathe(g.gain, 0.012, 0.012, secs);
			o.connect(g);
			g.connect(verb);
			o.start();
			nodes.push({ stop: () => o.stop() });
		});

		// A bloom every 20 to 45 seconds, from a pentatonic set so it never clashes.
		const BLOOM = [220, 261.6, 329.6, 392, 440, 523.25];
		let bloomTimer: number | null = null;
		function bloom() {
			const f = BLOOM[Math.floor(Math.random() * BLOOM.length)];
			const o = ctx.createOscillator();
			o.type = "sine";
			o.frequency.value = f;
			const g = ctx.createGain();
			g.gain.setValueAtTime(0.0001, ctx.currentTime);
			g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2.5);
			g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 9);
			o.connect(g);
			g.connect(verb);
			o.start();
			o.stop(ctx.currentTime + 9.5);
			bloomTimer = window.setTimeout(bloom, 20000 + Math.random() * 25000);
		}
		bloomTimer = window.setTimeout(bloom, 6000);

		stopRef.current = () => {
			if (bloomTimer !== null) clearTimeout(bloomTimer);
			for (const n of nodes) {
				try {
					n.stop();
				} catch {
					/* already stopped */
				}
			}
		};
	}, []);

	const fade = useCallback((to: number, secs: number) => {
		const ctx = ctxRef.current;
		const master = masterRef.current;
		if (!ctx || !master) return;
		master.gain.cancelScheduledValues(ctx.currentTime);
		master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
		master.gain.linearRampToValueAtTime(to, ctx.currentTime + secs);
	}, []);

	const enable = useCallback(async () => {
		build();
		const ctx = ctxRef.current;
		if (!ctx) return;
		if (ctx.state === "suspended") {
			try {
				await ctx.resume();
			} catch {
				return;
			}
		}
		fade(TARGET_GAIN, FADE_IN);
		setOn(true);
		try {
			localStorage.setItem(STORAGE_KEY, "on");
		} catch {
			/* private mode */
		}
	}, [build, fade]);

	const disable = useCallback(() => {
		fade(0, 1.2);
		setOn(false);
		try {
			localStorage.setItem(STORAGE_KEY, "off");
		} catch {
			/* private mode */
		}
	}, [fade]);

	// Restore a previous "on" choice. Autoplay policy still applies, so if the
	// context cannot resume without a gesture we wait for the first one.
	useEffect(() => {
		let pref: string | null = null;
		try {
			pref = localStorage.getItem(STORAGE_KEY);
		} catch {
			pref = null;
		}
		if (pref !== "on") return;

		let cleanup: (() => void) | null = null;
		const tryStart = () => {
			void enable();
			cleanup?.();
		};
		void (async () => {
			build();
			const ctx = ctxRef.current;
			if (ctx && ctx.state === "running") {
				void enable();
				return;
			}
			window.addEventListener("pointerdown", tryStart, { once: true });
			window.addEventListener("keydown", tryStart, { once: true });
			cleanup = () => {
				window.removeEventListener("pointerdown", tryStart);
				window.removeEventListener("keydown", tryStart);
			};
		})();
		return () => cleanup?.();
	}, [build, enable]);

	// Keep it running. The graph is about a dozen oscillator nodes, so a hidden
	// tab costs almost nothing, and stopping on blur made the bed cut out every
	// time the visitor looked at another window. Resume defensively instead:
	// some browsers auto-suspend a context in a backgrounded tab.
	useEffect(() => {
		if (!on) return;
		function keepRunning() {
			const ctx = ctxRef.current;
			if (ctx && ctx.state === "suspended") void ctx.resume();
		}
		document.addEventListener("visibilitychange", keepRunning);
		window.addEventListener("focus", keepRunning);
		const iv = window.setInterval(keepRunning, 5000);
		return () => {
			document.removeEventListener("visibilitychange", keepRunning);
			window.removeEventListener("focus", keepRunning);
			clearInterval(iv);
		};
	}, [on]);

	useEffect(
		() => () => {
			stopRef.current?.();
			const ctx = ctxRef.current;
			// Null the refs, otherwise build() short-circuits on a remount and
			// reuses a closed context, which is silent forever.
			ctxRef.current = null;
			masterRef.current = null;
			stopRef.current = null;
			void ctx?.close().catch(() => {});
		},
		[]
	);

	return (
		<button
			type="button"
			className={`ambient-toggle${on ? " ambient-on" : ""}`}
			onClick={() => (on ? disable() : void enable())}
			aria-pressed={on}
			aria-label={label}
			title={label}
		>
			<span className="ambient-bars" aria-hidden="true">
				<i />
				<i />
				<i />
			</span>
		</button>
	);
}
