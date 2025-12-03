"use client";

import { useState } from "react";

export default function Mission1StyleCard({ onComplete }: { onComplete: () => void }) {
    const [style, setStyle] = useState<"minimal" | "shadowed" | "glass">("minimal");

    const getCardStyle = () => {
        switch (style) {
            case "minimal":
                return "bg-white border border-gray-200 text-gray-900";
            case "shadowed":
                return "bg-white shadow-xl text-gray-900 border-none";
            case "glass":
                return "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg";
            default:
                return "";
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                <button
                    onClick={() => setStyle("minimal")}
                    className={`px-4 py-2 rounded transition-colors ${style === "minimal" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    Minimal
                </button>
                <button
                    onClick={() => setStyle("shadowed")}
                    className={`px-4 py-2 rounded transition-colors ${style === "shadowed" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    Shadowed
                </button>
                <button
                    onClick={() => setStyle("glass")}
                    className={`px-4 py-2 rounded transition-colors ${style === "glass" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    Glassmorphic
                </button>
            </div>

            <div className={`w-64 h-40 rounded-xl flex items-center justify-center transition-all duration-500 ${getCardStyle()}`}>
                <div className="text-center">
                    <h3 className="font-bold text-lg">Card Title</h3>
                    <p className="opacity-80 text-sm">This is a preview card.</p>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Submit Design
            </button>
        </div>
    );
}
