import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-8xl font-bold gradient-text">404</span>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5" />
            Contact Us
          </Link>
        </div>

        <div className="mt-12">
          <Link
            href="javascript:history.back()"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}