import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      {/* Background Stars (Placeholder) */}
      <div className="absolute inset-0 z-0 bg-[url('/stars.png')] opacity-50"></div>

      <div className="z-10 text-center space-y-8">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-float">
          Humeen Digital Universe
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Embark on a virtual internship journey across the galaxy. Explore tech domains, complete missions, and unlock your potential.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/universe"
            className="group px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all flex items-center gap-2"
          >
            Enter Universe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
