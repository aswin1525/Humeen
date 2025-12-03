"use client";

import { useState } from "react";

export default function Mission3ButtonCustomizer({ onComplete }: { onComplete: () => void }) {
    const [shape, setShape] = useState<"rounded" | "pill" | "square">("rounded");
    const [variant, setVariant] = useState<"filled" | "outline" | "ghost">("filled");
    const [color, setColor] = useState<"blue" | "green" | "purple">("blue");

    const getButtonClasses = () => {
        let classes = "px-6 py-3 font-semibold transition-all duration-300 ";

        // Shape
        if (shape === "rounded") classes += "rounded-lg ";
        if (shape === "pill") classes += "rounded-full ";
        if (shape === "square") classes += "rounded-none ";

        // Color & Variant
        const colors = {
            blue: { filled: "bg-blue-500 text-white hover:bg-blue-600", outline: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10", ghost: "text-blue-400 hover:bg-blue-500/10" },
            green: { filled: "bg-green-500 text-white hover:bg-green-600", outline: "border-2 border-green-500 text-green-400 hover:bg-green-500/10", ghost: "text-green-400 hover:bg-green-500/10" },
            purple: { filled: "bg-purple-500 text-white hover:bg-purple-600", outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10", ghost: "text-purple-400 hover:bg-purple-500/10" },
        };

        classes += colors[color][variant];
        return classes;
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8 w-full">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Shape</label>
                    <div className="flex flex-col gap-2">
                        {["rounded", "pill", "square"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setShape(s as any)}
                                className={`px-3 py-2 text-left rounded ${shape === s ? "bg-white/20 text-white" : "text-gray-400 hover:bg-white/5"}`}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Variant</label>
                    <div className="flex flex-col gap-2">
                        {["filled", "outline", "ghost"].map((v) => (
                            <button
                                key={v}
                                onClick={() => setVariant(v as any)}
                                className={`px-3 py-2 text-left rounded ${variant === v ? "bg-white/20 text-white" : "text-gray-400 hover:bg-white/5"}`}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Color</label>
                    <div className="flex flex-col gap-2">
                        {["blue", "green", "purple"].map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c as any)}
                                className={`px-3 py-2 text-left rounded ${color === c ? "bg-white/20 text-white" : "text-gray-400 hover:bg-white/5"}`}
                            >
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-12 bg-black/40 rounded-xl w-full flex items-center justify-center border border-white/5 min-h-[200px]">
                <button className={getButtonClasses()}>
                    Custom Button
                </button>
            </div>

            <button
                onClick={onComplete}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Create Component
            </button>
        </div>
    );
}
