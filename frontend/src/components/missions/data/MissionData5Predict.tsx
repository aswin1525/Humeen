"use client";

import { CheckCircle, ArrowRight, MapPin } from "lucide-react";

export default function MissionData5Predict({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center justify-center gap-2">
                    <ArrowRight className="w-6 h-6" /> Next Destination
                </h3>
                <p className="text-gray-400">Based on your activity, our AI suggests your next stop.</p>
            </div>

            <div className="w-full p-8 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                        <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-sm text-cyan-300 uppercase tracking-wider font-bold mb-1">Recommended</div>
                        <h2 className="text-3xl font-bold text-white">Cyber Planet</h2>
                        <p className="text-gray-400 text-sm mt-1">Match score: 98%</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onComplete}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
                    >
                        Accept Suggestion
                    </button>
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-colors">
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
}
