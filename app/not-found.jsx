import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 mb-4">Page not found</h1>
        <p className="text-neutral-600 mb-6">We couldn't find the page you're looking for. It may have been moved or removed.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700">Go to Home</Link>
          <Link href="/search" className="inline-block border border-neutral-300 px-6 py-3 rounded-md text-neutral-700 hover:bg-neutral-50">Search products</Link>
        </div>
      </div>
    </div>
  );
}
