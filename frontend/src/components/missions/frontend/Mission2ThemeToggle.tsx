"use client";

import { useState } from "react";
import { Moon, Sun, Zap } from "lucide-react";

export default function Mission2ThemeToggle({ onComplete }: { onComplete: () => void }) {
    const [theme, setTheme] = useState<"light" | "dark" | "neon">("dark");

    const getThemeStyles = () => {
        switch (theme) {
            case "light":
                return "bg-gray-100 text-gray-900";
            case "dark":
                return "bg-gray-900 text-white";
            case "neon":
                return "bg-black text-cyan-400 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]";
            default:
                return "";
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                <button
                    onClick={() => setTheme("light")}
                    className={`p-3 rounded-full transition-colors ${theme === "light" ? "bg-yellow-400 text-black" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    <Sun className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setTheme("dark")}
                    className={`p-3 rounded-full transition-colors ${theme === "dark" ? "bg-purple-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    <Moon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setTheme("neon")}
                    className={`p-3 rounded-full transition-colors ${theme === "neon" ? "bg-cyan-500 text-black" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    <Zap className="w-5 h-5" />
                </button>
            </div>

            <div className={`w-full max-w-md p-8 rounded-xl transition-all duration-500 ${getThemeStyles()}`}>
                <h3 className="text-2xl font-bold mb-4">Theme Preview</h3>
                <p className="opacity-80 mb-6">
                    This interface adapts to your selected theme. Notice how colors and shadows change instantly.
                </p>
                <div className="flex gap-2">
                    <div className="h-2 w-1/3 bg-current opacity-20 rounded"></div>
                    <div className="h-2 w-1/4 bg-current opacity-20 rounded"></div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Confirm Theme
            </button>
        </div>
    );
}
