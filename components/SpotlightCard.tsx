"use client";

import React, { useRef, useCallback, useEffect } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
	className?: string;
	spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
	children,
	className = "",
	spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
	const divRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const rafRef = useRef<number | null>(null);
	const pendingRef = useRef<{ x: number; y: number } | null>(null);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!divRef.current || !overlayRef.current) return;
			const rect = divRef.current.getBoundingClientRect();
			pendingRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
			if (rafRef.current !== null) return;
			rafRef.current = requestAnimationFrame(() => {
				rafRef.current = null;
				const p = pendingRef.current;
				if (!p || !overlayRef.current) return;
				overlayRef.current.style.background = `radial-gradient(circle at ${p.x}px ${p.y}px, ${spotlightColor}, transparent 80%)`;
			});
		},
		[spotlightColor]
	);

	useEffect(
		() => () => {
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
		},
		[]
	);

	const handleMouseEnter = useCallback(() => {
		if (overlayRef.current) overlayRef.current.style.opacity = "0.6";
	}, []);

	const handleMouseLeave = useCallback(() => {
		if (overlayRef.current) overlayRef.current.style.opacity = "0";
	}, []);

	const handleFocus = useCallback(() => {
		if (overlayRef.current) overlayRef.current.style.opacity = "0.6";
	}, []);

	const handleBlur = useCallback(() => {
		if (overlayRef.current) overlayRef.current.style.opacity = "0";
	}, []);

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
		>
			<div
				ref={overlayRef}
				className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
				style={{ opacity: 0 }}
			/>
			{children}
		</div>
	);
};

export default SpotlightCard;
