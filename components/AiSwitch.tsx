import Link from "next/link";

/**
 * Entry point to the machine-readable view.
 *
 * A real link to a real, crawlable, sitemapped page rather than a client-side
 * mode flip: an LLM or crawler never clicks a toggle, so a view that only exists
 * after interaction would be invisible to exactly the audience it is for.
 */
export default function AiSwitch({
	locale,
	label,
}: {
	locale: string;
	label: string;
}) {
	return (
		<Link href={`/${locale}/ai`} className="ai-switch" aria-label={label}>
			<span className="ai-switch-dot" aria-hidden="true" />
			AI
		</Link>
	);
}
