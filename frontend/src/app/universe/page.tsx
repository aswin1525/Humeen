import UniverseMap from "@/components/universe/UniverseMap";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UniversePage() {
    return (
        <main className="relative w-full h-screen">
            <div className="absolute top-4 left-4 z-10">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
                    <ArrowLeft className="w-6 h-6" /> Back to Home
                </Link>
            </div>
            <UniverseMap />
        </main>
    );
}
