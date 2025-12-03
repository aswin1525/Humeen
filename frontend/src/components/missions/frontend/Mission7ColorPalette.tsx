"use client";

import { useState } from "react";

export default function Mission7ColorPalette({ onComplete }: { onComplete: () => void }) {
    const [primary, setPrimary] = useState("#3b82f6");
    const [secondary, setSecondary] = useState("#10b981");
    const [accent, setAccent] = useState("#8b5cf6");

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8 w-full">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Primary</label>
                    <input
                        type="color"
                        value={primary}
                        onChange={(e) => setPrimary(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Secondary</label>
                    <input
                        type="color"
                        value={secondary}
                        onChange={(e) => setSecondary(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Accent</label>
                    <input
                        type="color"
                        value={accent}
                        onChange={(e) => setAccent(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer bg-transparent"
                    />
                </div>
            </div>

            <div className="w-full p-8 bg-white rounded-xl shadow-xl text-center space-y-4">
                <h1 style={{ color: primary }} className="text-4xl font-bold">
                    Frontend Planet
                </h1>
                <p style={{ color: secondary }} className="text-xl font-medium">
                    Mastering the Art of UI
                </p>
                <button
                    style={{ backgroundColor: accent }}
                    className="px-6 py-2 rounded-full text-white font-bold shadow-lg"
                >
                    Get Started
                </button>
            </div>

            <button
                onClick={onComplete}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Save Palette
            </button>
        </div>
    );
}
