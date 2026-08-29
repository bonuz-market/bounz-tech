"use client";

import { useEffect, useRef } from "react";

/**
 * Hidden arcade easter egg. Konami code on the homepage summons it.
 *
 * Deliberately NOT part of the initial bundle: HomePage imports this with a
 * dynamic() call that only resolves once the code is entered, so a normal
 * visitor never downloads or executes any of it.
 *
 * Everything is procedural. No sprites, no audio files, no dependencies.
 */

const NEON_ORANGE = "#FFA34E";
const NEON_PINK = "#CE09FF";

type Bullet = { x: number; y: number; py: number; vy: number; friendly: boolean };
type Enemy = {
	x: number;
	y: number;
	hx: number;
	hy: number;
	alive: boolean;
	diving: boolean;
	dt: number;
	sx: number;
	sy: number;
	kind: number;
};
type Particle = { x: number; y: number; vx: number; vy: number; life: number; c: string };

export default function ArcadeEgg({ onExit }: { onExit: () => void }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const exitRef = useRef(onExit);
	exitRef.current = onExit;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const W = 480;
		const H = 640;
		const dpr = Math.min(window.devicePixelRatio, 2);
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);

		// ---------------------------------------------------------------- audio
		// Chiptune, generated live. A 16th-note bassline under a minor arpeggio,
		// with noise-burst percussion. No files, so nothing to load.
		let audio: AudioContext | null = null;
		let master: GainNode | null = null;
		let musicTimer: number | null = null;
		let muted = false;
		let disposed = false;
		const timers: number[] = [];

		try {
			const Ctor =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext })
					.webkitAudioContext;
			audio = new Ctor();
			master = audio.createGain();
			master.gain.value = 0.18;
			master.connect(audio.destination);
		} catch {
			audio = null;
		}

		function blip(
			freq: number,
			dur: number,
			type: OscillatorType,
			vol: number,
			slideTo?: number
		) {
			if (disposed || !audio || !master || muted) return;
			const o = audio.createOscillator();
			const g = audio.createGain();
			o.type = type;
			o.frequency.setValueAtTime(freq, audio.currentTime);
			if (slideTo !== undefined) {
				o.frequency.exponentialRampToValueAtTime(
					Math.max(20, slideTo),
					audio.currentTime + dur
				);
			}
			g.gain.setValueAtTime(vol, audio.currentTime);
			g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
			o.connect(g);
			g.connect(master);
			o.start();
			o.stop(audio.currentTime + dur);
		}

		function noise(dur: number, vol: number) {
			if (disposed || !audio || !master || muted) return;
			const n = Math.floor(audio.sampleRate * dur);
			const buf = audio.createBuffer(1, n, audio.sampleRate);
			const d = buf.getChannelData(0);
			for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
			const src = audio.createBufferSource();
			src.buffer = buf;
			const g = audio.createGain();
			g.gain.value = vol;
			src.connect(g);
			g.connect(master);
			src.start();
		}

		// A minor, the dramatic one. 16 steps per bar at 150 BPM.
		const BASS = [
			55, 0, 55, 0, 82.4, 0, 55, 0, 65.4, 0, 65.4, 0, 49, 0, 49, 0,
		];
		const ARP = [
			440, 523.25, 659.25, 523.25, 440, 523.25, 659.25, 880, 392, 493.88,
			587.33, 493.88, 392, 493.88, 587.33, 783.99,
		];
		let step = 0;

		function tick() {
			const b = BASS[step % 16];
			if (b) blip(b, 0.13, "square", 0.5);
			const a = ARP[step % 16];
			if (a && step % 2 === 0) blip(a, 0.09, "square", 0.14);
			if (step % 4 === 0) noise(0.06, 0.5);
			else if (step % 2 === 1) noise(0.02, 0.12);
			step++;
		}

		function startMusic() {
			if (!audio) return;
			const stepMs = 60000 / 150 / 4;
			musicTimer = window.setInterval(tick, stepMs);
		}

		// ----------------------------------------------------------------- game
		let player = { x: W / 2, y: H - 60, cool: 0, dual: false, inv: 0 };
		let bullets: Bullet[] = [];
		let enemies: Enemy[] = [];
		let parts: Particle[] = [];
		const stars = Array.from({ length: 70 }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			s: 0.3 + Math.random() * 1.2,
		}));
		let score = 0;
		let lives = 3;
		let wave = 1;
		let over = false;
		let swayT = 0;
		let raf = 0;
		let last = 0;
		const keys: Record<string, boolean> = {};

		function buildWave(n: number) {
			enemies = [];
			const cols = Math.min(8, 5 + Math.floor(n / 2));
			const rows = Math.min(5, 2 + Math.floor(n / 2));
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					const hx = 70 + c * ((W - 140) / Math.max(1, cols - 1));
					const hy = 80 + r * 42;
					enemies.push({
						x: hx,
						y: hy,
						hx,
						hy,
						alive: true,
						diving: false,
						dt: 0,
						sx: 0,
						sy: 0,
						kind: r === 0 ? 2 : r === 1 ? 1 : 0,
					});
				}
			}
		}
		buildWave(1);

		function boom(x: number, y: number, c: string, n: number) {
			for (let i = 0; i < n; i++) {
				const a = Math.random() * Math.PI * 2;
				const s = 40 + Math.random() * 160;
				parts.push({
					x,
					y,
					vx: Math.cos(a) * s,
					vy: Math.sin(a) * s,
					life: 0.4 + Math.random() * 0.4,
					c,
				});
			}
		}

		function onKey(e: KeyboardEvent) {
			if (audio && audio.state === "suspended") audio.resume();
			if (e.key === "Escape") {
				exitRef.current();
				return;
			}
			if (e.key === "m" || e.key === "M") {
				muted = !muted;
				if (master) master.gain.value = muted ? 0 : 0.18;
				return;
			}
			if (over && (e.key === "Enter" || e.key === " ")) {
				score = 0;
				lives = 3;
				wave = 1;
				over = false;
				player = { x: W / 2, y: H - 60, cool: 0, dual: false, inv: 0 };
				bullets = [];
				parts = [];
				buildWave(1);
			}
			keys[e.key] = true;
			if (
				[" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
			) {
				e.preventDefault();
			}
		}
		function offKey(e: KeyboardEvent) {
			keys[e.key] = false;
		}
		function onBlur() {
			for (const k in keys) keys[k] = false;
		}

		window.addEventListener("keydown", onKey, { passive: false });
		window.addEventListener("keyup", offKey);
		window.addEventListener("blur", onBlur);

		function update(dt: number) {
			if (over) return;

			// player
			const speed = 300;
			if (keys.ArrowLeft || keys.a || keys.A) player.x -= speed * dt;
			if (keys.ArrowRight || keys.d || keys.D) player.x += speed * dt;
			player.x = Math.max(20, Math.min(W - 20, player.x));
			player.cool -= dt;
			player.inv -= dt;
			if (keys[" "] && player.cool <= 0) {
				player.cool = 0.16;
				if (player.dual) {
					bullets.push({ x: player.x - 7, y: player.y - 12, py: player.y - 12, vy: -560, friendly: true });
					bullets.push({ x: player.x + 7, y: player.y - 12, py: player.y - 12, vy: -560, friendly: true });
				} else {
					bullets.push({ x: player.x, y: player.y - 14, py: player.y - 14, vy: -560, friendly: true });
				}
				blip(880, 0.07, "square", 0.16, 220);
			}

			// formation sway, plus the occasional dive
			swayT += dt;
			const sway = Math.sin(swayT * 0.9) * 26;
			for (const e of enemies) {
				if (!e.alive) continue;
				if (!e.diving) {
					e.x = e.hx + sway;
					e.y = e.hy + Math.sin(swayT * 1.6 + e.hx * 0.02) * 5;
					if (Math.random() < 0.00035 * wave) {
						e.diving = true;
						e.dt = 0;
						e.sx = e.x;
						e.sy = e.y;
					}
				} else {
					e.dt += dt;
					const t = e.dt;
					e.x = e.sx + Math.sin(t * 3) * 110;
					e.y = e.sy + t * 190;
					if (Math.random() < 0.02) {
						bullets.push({ x: e.x, y: e.y + 10, py: e.y + 10, vy: 260, friendly: false });
					}
					if (e.y > H + 30) {
						e.diving = false;
						e.y = e.hy;
						e.x = e.hx;
					}
				}
				if (Math.random() < 0.0006 * wave) {
					bullets.push({ x: e.x, y: e.y + 10, py: e.y + 10, vy: 240, friendly: false });
				}
			}

			// bullets
			for (const b of bullets) {
				b.py = b.y;
				b.y += b.vy * dt;
			}
			bullets = bullets.filter((b) => b.y > -20 && b.y < H + 20);

			// collisions
			for (const b of bullets) {
				if (!b.friendly) continue;
				for (const e of enemies) {
					if (!e.alive) continue;
					const lo = Math.min(b.py, b.y) - 8;
					const hi = Math.max(b.py, b.y) + 8;
					if (Math.abs(b.x - e.x) < 16 && e.y >= lo && e.y <= hi) {
						e.alive = false;
						b.y = -999;
						score += e.diving ? 150 : 50 + e.kind * 25;
						boom(e.x, e.y, e.kind === 2 ? NEON_PINK : NEON_ORANGE, 14);
						blip(180, 0.22, "sawtooth", 0.3, 40);
						noise(0.14, 0.35);
					}
				}
			}
			for (const b of bullets) {
				if (b.friendly || player.inv > 0) continue;
				const plo = Math.min(b.py, b.y) - 8;
				const phi = Math.max(b.py, b.y) + 8;
				if (Math.abs(b.x - player.x) < 13 && player.y >= plo && player.y <= phi) {
					b.y = 9999;
					lives--;
					player.inv = 2;
					player.dual = false;
					boom(player.x, player.y, NEON_ORANGE, 26);
					blip(120, 0.5, "sawtooth", 0.35, 30);
					noise(0.3, 0.5);
					if (lives <= 0) over = true;
				}
			}
			for (const e of enemies) {
				if (!e.alive || player.inv > 0) continue;
				if (Math.abs(e.x - player.x) < 18 && Math.abs(e.y - player.y) < 18) {
					e.alive = false;
					lives--;
					player.inv = 2;
					player.dual = false;
					boom(player.x, player.y, NEON_ORANGE, 26);
					noise(0.3, 0.5);
					if (lives <= 0) over = true;
				}
			}

			// particles
			for (const p of parts) {
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				p.life -= dt;
			}
			parts = parts.filter((p) => p.life > 0);

			// stars
			for (const s of stars) {
				s.y += (12 + s.s * 26) * dt;
				if (s.y > H) {
					s.y = -2;
					s.x = Math.random() * W;
				}
			}

			// next wave
			if (enemies.every((e) => !e.alive)) {
				wave++;
				player.dual = wave >= 3;
				buildWave(wave);
				for (let i = 0; i < 5; i++) {
					timers.push(
						window.setTimeout(() => blip(440 + i * 110, 0.1, "square", 0.2), i * 70)
					);
				}
			}
		}

		function drawShip(x: number, y: number) {
			ctx!.fillStyle = NEON_ORANGE;
			ctx!.beginPath();
			ctx!.moveTo(x, y - 14);
			ctx!.lineTo(x + 12, y + 10);
			ctx!.lineTo(x + 4, y + 6);
			ctx!.lineTo(x, y + 11);
			ctx!.lineTo(x - 4, y + 6);
			ctx!.lineTo(x - 12, y + 10);
			ctx!.closePath();
			ctx!.fill();
		}

		function drawEnemy(e: Enemy) {
			const c = e.kind === 2 ? NEON_PINK : e.kind === 1 ? "#c56cff" : NEON_ORANGE;
			ctx!.fillStyle = c;
			const s = 7;
			ctx!.fillRect(e.x - s, e.y - s + 2, s * 2, s);
			ctx!.fillRect(e.x - s - 4, e.y - 1, 4, 5);
			ctx!.fillRect(e.x + s, e.y - 1, 4, 5);
			ctx!.fillRect(e.x - 4, e.y + 2, 8, 5);
			ctx!.fillStyle = "#000";
			ctx!.fillRect(e.x - 4, e.y - 3, 3, 3);
			ctx!.fillRect(e.x + 1, e.y - 3, 3, 3);
		}

		function render() {
			ctx!.fillStyle = "#000";
			ctx!.fillRect(0, 0, W, H);

			for (const s of stars) {
				ctx!.fillStyle = `rgba(255,255,255,${0.25 + s.s * 0.4})`;
				ctx!.fillRect(s.x, s.y, s.s, s.s);
			}

			for (const e of enemies) if (e.alive) drawEnemy(e);

			for (const b of bullets) {
				ctx!.fillStyle = b.friendly ? "#fff" : NEON_PINK;
				ctx!.fillRect(b.x - 1.5, b.y - 6, 3, 10);
			}

			for (const p of parts) {
				ctx!.globalAlpha = Math.max(0, p.life * 2);
				ctx!.fillStyle = p.c;
				ctx!.fillRect(p.x, p.y, 2.5, 2.5);
			}
			ctx!.globalAlpha = 1;

			if (!over && (player.inv <= 0 || Math.floor(player.inv * 12) % 2 === 0)) {
				drawShip(player.x, player.y);
			}

			ctx!.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
			ctx!.fillStyle = "#fff";
			ctx!.textAlign = "left";
			ctx!.fillText(`SCORE ${String(score).padStart(6, "0")}`, 14, 24);
			ctx!.textAlign = "center";
			ctx!.fillText(`WAVE ${wave}`, W / 2, 24);
			ctx!.textAlign = "right";
			ctx!.fillStyle = NEON_ORANGE;
			ctx!.fillText("<>".repeat(Math.max(0, lives)), W - 14, 24);

			ctx!.textAlign = "center";
			ctx!.fillStyle = "rgba(255,255,255,0.35)";
			ctx!.fillText("ARROWS  SPACE  M MUTE  ESC EXIT", W / 2, H - 14);

			if (over) {
				ctx!.fillStyle = "rgba(0,0,0,0.78)";
				ctx!.fillRect(0, 0, W, H);
				ctx!.fillStyle = NEON_PINK;
				ctx!.font = "28px ui-monospace, SFMono-Regular, Menlo, monospace";
				ctx!.fillText("GAME OVER", W / 2, H / 2 - 16);
				ctx!.fillStyle = "#fff";
				ctx!.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
				ctx!.fillText(`SCORE ${score}   WAVE ${wave}`, W / 2, H / 2 + 14);
				ctx!.fillStyle = "rgba(255,255,255,0.55)";
				ctx!.fillText("ENTER TO RESTART", W / 2, H / 2 + 44);
			}
		}

		// Fixed timestep. Physics advances in constant slices regardless of frame
		// rate, so the game plays identically on a fast machine and a loaded one,
		// and fast objects can never skip past a hitbox between frames.
		const STEP = 1 / 120;
		let acc = 0;

		function loop(t: number) {
			raf = requestAnimationFrame(loop);
			if (!last) last = t;
			acc += Math.min(0.25, (t - last) / 1000);
			last = t;
			let guard = 0;
			while (acc >= STEP && guard < 40) {
				update(STEP);
				acc -= STEP;
				guard++;
			}
			if (guard >= 40) acc = 0;
			render();
		}

		startMusic();
		raf = requestAnimationFrame(loop);

		// Focus management, so Tab does not walk out of the game into the page behind.
		const prevFocus = document.activeElement as HTMLElement | null;
		(canvas.parentElement as HTMLElement | null)?.focus();

		return () => {
			disposed = true;
			for (const id of timers) clearTimeout(id);
			prevFocus?.focus?.();
			cancelAnimationFrame(raf);
			if (musicTimer !== null) clearInterval(musicTimer);
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", offKey);
			window.removeEventListener("blur", onBlur);
			if (audio) audio.close().catch(() => {});
		};
	}, []);

	return (
		<div
			className="arcade-overlay"
			role="dialog"
			aria-label="Hidden arcade game"
			aria-modal="true"
			tabIndex={-1}
		>
			<canvas
				ref={canvasRef}
				className="arcade-canvas"
				style={{ width: 480, height: 640 }}
			/>
			<button
				className="arcade-close"
				onClick={() => exitRef.current()}
				onKeyDown={(e) => {
					// Space is the fire key; never let it activate this button.
					if (e.key === " ") e.preventDefault();
				}}
				aria-label="Close game"
			>
				esc
			</button>
		</div>
	);
}
