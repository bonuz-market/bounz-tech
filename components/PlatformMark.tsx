import type { ReactNode } from "react";

/**
 * Platform marks and official account links for the "Registered developer" strip.
 *
 * TRADEMARK NOTE — this was a deliberate, informed decision by the owner (2026-08-28).
 * Apple's App Store marketing guidelines say the Apple logo must not be used to promote an app, and
 * Apple publishes no "registered developer" badge:
 *   https://developer.apple.com/app-store/marketing/guidelines/
 * Meta requires an approved Brand Review request for any use of the Meta logo and reserves it for
 * formal partnerships:
 *   https://www.meta.com/brand/resources/meta/company-brand/
 * The marks ship anyway, alongside an explicit no-endorsement disclaimer rendered under the strip.
 * If either company objects, flip SHOW_BRAND_MARKS to false: the layout is unchanged and the strip
 * degrades to a clean text-only credential row.
 */
export const SHOW_BRAND_MARKS = true;

/**
 * Public, verifiable bonuz presence on each platform. Kept in code rather than in the locale
 * dictionaries because these URLs are the same in every language.
 * Meta Wearables and MentraOS have no public developer directory or store listing to link to
 * (the Mentra MiniApp Store is still "Coming Soon"), so those two cards render unlinked.
 */
export const platformLinks: Record<string, string> = {
	Apple: "https://apps.apple.com/ae/developer/bonuz/id1637687441",
	"Google Play": "https://play.google.com/store/apps/dev?id=8658583252213251696",
	Microsoft: "https://apps.microsoft.com/detail/9nnfjbph98c6",
};

/**
 * `height` is the rendered box height in px, tuned per brand so every mark carries
 * roughly the same optical mass rather than the same bounding box. Measured ink
 * (w x h inside the viewBox): Apple 19.6x24, Google Play 21.5x24, Microsoft 24x24,
 * Meta 24x15.9, Mentra 56.7x29.3. Sized on equal sqrt(ink area), so Microsoft's
 * solid square block does not dominate and Meta's wide loop does not look shrunken.
 */
type Mark = { viewBox: string; height: number; body: ReactNode };

const marks: Record<string, Mark> = {
	Apple: {
		height: 26,
		viewBox: "0 0 24 24",
		body: <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />,
	},
	Microsoft: {
		height: 23,
		viewBox: "0 0 24 24",
		body: <path d="M0 0v11.408h11.408V0zm12.594 0v11.408H24V0zM0 12.594V24h11.408V12.594zm12.594 0V24H24V12.594z" />,
	},
	"Google Play": {
		height: 25,
		viewBox: "0 0 24 24",
		body: <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />,
	},
	Meta: {
		height: 28,
		viewBox: "0 0 24 24",
		body: <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />,
	},
	// Mentra ship a wordmark, not a square glyph, so we use just its geometric mark.
	Mentra: {
		height: 18,
		viewBox: "0 9 57 30",
		body: (
			<>
			<rect y="25.626" width="13.4328" height="13.0062"/>
			<path d="M10.6211 9.36816L34.8313 25.6259V38.6321L10.6211 22.3743V9.36816Z"/>
			<path d="M32.4883 9.36816L56.6985 25.6259V38.6321L32.4883 22.3743V9.36816Z"/>
			</>
		),
	},
};

export default function PlatformMark({ name }: { name: string }) {
	const mark = marks[name];

	if (!mark) {
		return (
			<span className="platform-mark-slot" aria-hidden="true">
				<span className="platform-monogram">{name.charAt(0)}</span>
			</span>
		);
	}

	// Fixed-height slot so the differing mark heights still leave every card's
	// name and program text on exactly the same baseline.
	return (
		<span className="platform-mark-slot" aria-hidden="true">
			<svg
				viewBox={mark.viewBox}
				className="platform-mark"
				style={{ height: mark.height }}
				fill="currentColor"
				focusable="false"
			>
				{mark.body}
			</svg>
		</span>
	);
}
