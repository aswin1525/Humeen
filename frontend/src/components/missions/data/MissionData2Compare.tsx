"use client";

import { useState } from "react";
import { CheckCircle, BarChart2 } from "lucide-react";

export default function MissionData2Compare({ onComplete }: { onComplete: () => void }) {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

    const data = [
        { name: "Frontend", value: 80, color: "bg-blue-500" },
        { name: "Backend", value: 45, color: "bg-green-500" },
        { name: "Security", value: 30, color: "bg-red-500" },
        { name: "Data", value: 15, color: "bg-purple-500" },
    ];

    const handleSelect = (name: string) => {
        setSelectedPlanet(name);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
                    <BarChart2 className="w-6 h-6" /> Activity Analysis
                </h3>
                <p className="text-gray-400">Select the planet with the highest activity level.</p>
            </div>

            <div className="w-full h-64 flex items-end justify-center gap-8 p-8 bg-black/40 rounded-xl border border-white/10">
                {data.map((item) => (
                    <div key={item.name} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => handleSelect(item.name)}>
                        <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{item.value}%</div>
                        <div
                            className={`w-16 rounded-t-lg transition-all duration-500 ${item.color} ${selectedPlanet === item.name ? "opacity-100 ring-2 ring-white" : "opacity-70 hover:opacity-90"}`}
                            style={{ height: `${item.value * 2}px` }}
                        ></div>
                        <div className={`text-sm font-bold ${selectedPlanet === item.name ? "text-white" : "text-gray-500"}`}>{item.name}</div>
                    </div>
                ))}
            </div>

            {selectedPlanet === "Frontend" && (
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-in fade-in zoom-in"
                >
                    <CheckCircle className="w-5 h-5" /> Confirm Analysis
                </button>
            )}
        </div>
    );
}
