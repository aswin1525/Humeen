"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function MissionBackend5ListMissions({ onComplete }: { onComplete: () => void }) {
    const [response, setResponse] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/missions");
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto h-full">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm shrink-0">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-green-400">GET</span>
                    <span>/api/missions</span>
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Fetching..." : <><Send className="w-4 h-4" /> Fetch All Missions</>}
                </button>
            </div>

            {response && (
                <div className="w-full flex-1 min-h-0 bg-gray-900 rounded-xl border border-white/10 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-4 border-b border-white/10 bg-gray-800/50 text-gray-400 text-xs font-mono">
                        {response.length} items found
                    </div>
                    <div className="overflow-y-auto p-4 space-y-2">
                        {response.map((mission) => (
                            <div key={mission.id} className="p-3 bg-black/20 rounded border border-white/5 font-mono text-xs text-gray-300 hover:bg-white/5 transition-colors">
                                <div className="text-green-400 font-bold mb-1">{mission.title}</div>
                                <div className="opacity-70">{mission.description}</div>
                                <div className="mt-2 flex gap-2">
                                    <span className="bg-blue-500/20 text-blue-300 px-1 rounded">{mission.planet}</span>
                                    <span className="bg-purple-500/20 text-purple-300 px-1 rounded">+{mission.energyPoints} XP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {response && (
                <button
                    onClick={onComplete}
                    className="shrink-0 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" /> Complete Mission
                </button>
            )}
        </div>
    );
}
