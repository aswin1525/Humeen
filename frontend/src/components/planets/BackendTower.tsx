"use client";

import { useState, useEffect } from "react";
import { Server, Database, ArrowRightLeft, ShieldCheck } from "lucide-react";

export default function BackendTower() {
    const [logs, setLogs] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);

    const simulateRequest = () => {
        setProcessing(true);
        setLogs([]);
        const steps = [
            "Authenticating user token...",
            "Validating permissions [ADMIN]...",
            "Connecting to Database Shard #4...",
            "Querying User_Missions table...",
            "Processing logic (Energy Calculation)...",
            "Response sent: 200 OK"
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                setLogs(prev => [...prev, step]);
                if (index === steps.length - 1) setProcessing(false);
            }, index * 800);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            {/* Control Panel */}
            <div className="bg-zinc-900/90 backdrop-blur-md rounded-2xl p-8 border border-green-500/30 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
                        <Server className="w-5 h-5" /> API Control Center
                    </h3>
                    <p className="text-zinc-400 text-sm mb-8">Manage the core logic engine. Control APIs, databases, and authentication.</p>

                    <div className="space-y-4">
                        <div className="p-4 bg-black/40 rounded-lg border border-green-900/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-green-600" />
                                <span className="text-zinc-300">Database Status</span>
                            </div>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">ONLINE</span>
                        </div>
                        <div className="p-4 bg-black/40 rounded-lg border border-green-900/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                                <span className="text-zinc-300">Auth Gateway</span>
                            </div>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">SECURE</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={simulateRequest}
                    disabled={processing}
                    className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
                >
                    {processing ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <ArrowRightLeft className="w-5 h-5" /> Test API Endpoint
                        </>
                    )}
                </button>
            </div>

            {/* Terminal Visualizer */}
            <div className="bg-black rounded-2xl border border-zinc-800 p-6 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                <div className="space-y-2">
                    <div className="text-zinc-500">root@humeen-core:~$ ./monitor_traffic.sh</div>
                    {logs.map((log, i) => (
                        <div key={i} className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                            <span className="text-green-500">➜</span>
                            <span className={log.includes("200 OK") ? "text-green-400 font-bold" : "text-zinc-300"}>
                                {log}
                            </span>
                        </div>
                    ))}
                    {processing && (
                        <div className="animate-pulse text-green-500">_</div>
                    )}
                </div>
            </div>
        </div>
    );
}
