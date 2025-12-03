"use client";

import { useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";

export default function MissionData3Constellation({ onComplete }: { onComplete: () => void }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6" /> Skill Constellation
                </h3>
                <p className="text-gray-400">Reveal your connected skills across the universe.</p>
            </div>

            <div className="w-full h-80 bg-gray-950 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                {!revealed ? (
                    <button
                        onClick={() => setRevealed(true)}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-colors border border-white/20"
                    >
                        Reveal Skills
                    </button>
                ) : (
                    <div className="relative w-full h-full animate-in fade-in duration-1000">
                        {/* Stars/Nodes */}
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"></div>
                        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] z-10"></div>

                        {/* Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" className="animate-in fade-in duration-1000 delay-300" />
                            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" className="animate-in fade-in duration-1000 delay-500" />
                        </svg>

                        {/* Labels */}
                        <div className="absolute top-[20%] left-[20%] text-blue-300 text-xs">UI Design</div>
                        <div className="absolute top-[45%] left-[45%] text-purple-300 text-xs">Full Stack</div>
                        <div className="absolute bottom-[20%] right-[20%] text-green-300 text-xs">API Logic</div>
                    </div>
                )}
            </div>

            {revealed && (
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 delay-700"
                >
                    <CheckCircle className="w-5 h-5" /> Map Complete
                </button>
            )}
        </div>
    );
}
