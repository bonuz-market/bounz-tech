import Link from "next/link";
import { headers } from "next/headers";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const notFoundText: Record<Locale, { title: string; description: string; home: string; contact: string }> = {
  en: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    home: "Go Home",
    contact: "Contact Us",
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح.",
    home: "الرئيسية",
    contact: "اتصل بنا",
  },
  de: {
    title: "Seite nicht gefunden",
    description: "Die gesuchte Seite existiert nicht oder wurde verschoben. Lassen Sie uns Sie zurückbringen.",
    home: "Startseite",
    contact: "Kontakt",
  },
  zh: {
    title: "页面未找到",
    description: "您要查找的页面不存在或已被移动。让我们帮您回到正轨。",
    home: "返回首页",
    contact: "联系我们",
  },
};

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "";
  const detectedLocale = locales.find((l) => pathname.startsWith(`/${l}`)) || defaultLocale;
  const t = notFoundText[detectedLocale];
  const dir = detectedLocale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={detectedLocale} dir={dir}>
      <body>
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-8xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">
              {t.title}
            </h2>
            <p className="text-gray-400 mb-8">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${detectedLocale}`}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t.home}
              </Link>
              <Link
                href={`/${detectedLocale}#request-intro`}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                {t.contact}
              </Link>
            </div>
          </div>
          <p className="absolute bottom-8 text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Bonuz Technology DMCC
          </p>
        </div>
      </body>
    </html>
  );
}
