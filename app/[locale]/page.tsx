import { notFound } from "next/navigation";
import { locales, getDictionary, type Locale } from "@/lib/i18n";
import HomePage from "@/components/HomePage";

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const dict = await getDictionary(locale as Locale);

	return <HomePage dict={dict} locale={locale} />;
}
