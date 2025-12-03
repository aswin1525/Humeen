"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function MissionBackend3UpdateProgress({ onComplete }: { onComplete: () => void }) {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/missions/user/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ missionId: "MISSION_BACKEND_3", status: "in_progress" })
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse("Error: Failed to update progress");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-yellow-400">POST</span>
                    <span>/api/missions/user/progress</span>
                </div>
                <div className="mb-4 p-4 bg-gray-900 rounded border border-white/5 text-gray-400">
                    {`{ "missionId": "MISSION_BACKEND_3", "status": "in_progress" }`}
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Updating..." : <><Send className="w-4 h-4" /> Update Progress</>}
                </button>
            </div>

            {response && (
                <div className="w-full p-6 bg-gray-900 rounded-xl border border-white/10 font-mono text-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="text-gray-500 mb-2">Response Body:</div>
                    <pre className="text-green-400">{response}</pre>
                </div>
            )}

            {response && (
                <button
                    onClick={onComplete}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" /> Complete Mission
                </button>
            )}
        </div>
    );
}
