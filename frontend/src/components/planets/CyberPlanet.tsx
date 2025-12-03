"use client";

import { useState, useEffect } from "react";
import { Shield, ShieldAlert, Lock, Bug, Activity } from "lucide-react";

export default function CyberPlanet() {
    const [threats, setThreats] = useState<{ id: number, type: string, blocked: boolean }[]>([]);
    const [shieldIntegrity, setShieldIntegrity] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const types = ["SQL Injection", "XSS Attack", "Phishing Attempt", "DDoS Packet"];
                const type = types[Math.floor(Math.random() * types.length)];
                const blocked = Math.random() > 0.2; // 80% chance to block

                setThreats(prev => [{ id: Date.now(), type, blocked }, ...prev].slice(0, 5));

                if (!blocked) {
                    setShieldIntegrity(prev => Math.max(0, prev - 10));
                }
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            {/* Threat Map */}
            <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-red-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2 relative z-10">
                    <ShieldAlert className="w-5 h-5" /> Live Threat Monitor
                </h3>

                <div className="space-y-4 relative z-10">
                    {threats.map((threat) => (
                        <div key={threat.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-lg animate-in slide-in-from-right-2">
                            <div className="flex items-center gap-3">
                                <Bug className={`w-5 h-5 ${threat.blocked ? "text-gray-400" : "text-red-500"}`} />
                                <span className="text-gray-200">{threat.type}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded font-bold ${threat.blocked ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {threat.blocked ? "BLOCKED" : "BREACH"}
                            </span>
                        </div>
                    ))}
                    {threats.length === 0 && (
                        <div className="text-center text-zinc-500 py-12">Scanning for threats...</div>
                    )}
                </div>
            </div>

            {/* Cyber Shield Blueprint */}
            <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>

                <div className="relative w-64 h-64 mb-8">
                    {/* Shield Animation */}
                    <div className={`absolute inset-0 rounded-full border-4 ${shieldIntegrity > 50 ? "border-blue-500" : "border-red-500"} opacity-20 animate-ping`}></div>
                    <div className={`absolute inset-0 rounded-full border-2 ${shieldIntegrity > 50 ? "border-blue-400" : "border-red-400"} flex items-center justify-center`}>
                        <Shield className={`w-32 h-32 ${shieldIntegrity > 50 ? "text-blue-500" : "text-red-500"} transition-colors duration-500`} />
                    </div>
                </div>

                <div className="text-center space-y-2 z-10">
                    <h2 className="text-3xl font-bold text-white">{shieldIntegrity}%</h2>
                    <p className="text-blue-300 uppercase tracking-widest text-sm">Shield Integrity</p>
                </div>

                <div className="mt-8 w-full max-w-xs bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${shieldIntegrity > 50 ? "bg-blue-500" : "bg-red-500"}`}
                        style={{ width: `${shieldIntegrity}%` }}
                    ></div>
                </div>

                <button
                    onClick={() => setShieldIntegrity(100)}
                    className="mt-6 px-6 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-full text-sm transition-colors border border-blue-500/30"
                >
                    Recharge Shields
                </button>
            </div>
        </div>
    );
}
