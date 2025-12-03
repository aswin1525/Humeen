"use client";

import { useState } from "react";
import { CheckCircle, Filter, Search } from "lucide-react";

export default function MissionData4FilterLogs({ onComplete }: { onComplete: () => void }) {
    const [filter, setFilter] = useState("all");

    const logs = [
        { id: 1, planet: "Frontend", action: "Mission Completed", time: "2m ago" },
        { id: 2, planet: "Backend", action: "API Call Failed", time: "5m ago" },
        { id: 3, planet: "Security", action: "Vulnerability Found", time: "12m ago" },
        { id: 4, planet: "Frontend", action: "Style Updated", time: "15m ago" },
        { id: 5, planet: "Data", action: "Stats Viewed", time: "1h ago" },
    ];

    const filteredLogs = filter === "all" ? logs : logs.filter(l => l.planet.toLowerCase() === filter);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
            <div className="w-full flex items-center justify-between gap-4 p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter className="w-5 h-5" />
                    <span className="font-bold">Filter Logs:</span>
                </div>
                <div className="flex gap-2">
                    {["all", "frontend", "backend", "security", "data"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${filter === f ? "bg-blue-500 text-white" : "bg-white/10 text-gray-400 hover:bg-white/20"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-4 font-medium">Planet</th>
                            <th className="p-4 font-medium">Action</th>
                            <th className="p-4 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.planet === "Frontend" ? "bg-blue-500/20 text-blue-400" :
                                            log.planet === "Backend" ? "bg-green-500/20 text-green-400" :
                                                log.planet === "Security" ? "bg-red-500/20 text-red-400" :
                                                    "bg-purple-500/20 text-purple-400"
                                        }`}>
                                        {log.planet}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-300">{log.action}</td>
                                <td className="p-4 text-right text-gray-500 font-mono">{log.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No logs found for this filter.</div>
                )}
            </div>

            {filter !== "all" && (
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-in fade-in zoom-in"
                >
                    <CheckCircle className="w-5 h-5" /> Submit Filter
                </button>
            )}
        </div>
    );
}
