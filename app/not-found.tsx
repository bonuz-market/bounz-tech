import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/en"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/en#request-intro"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <p className="absolute bottom-8 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Bonuz Technology DMCC
      </p>
    </div>
  );
}
