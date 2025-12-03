"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function MissionBackend2CreateRecord({ onComplete }: { onComplete: () => void }) {
    const [amount, setAmount] = useState("10");
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        try {
            // Simulating a POST request since we don't have a real energy endpoint for this specific mission
            // In a real app, this would hit the backend. For MVP, we'll simulate the success response.
            await new Promise(resolve => setTimeout(resolve, 500));
            setResponse(JSON.stringify({ status: "success", energy_added: parseInt(amount) }, null, 2));
        } catch (error) {
            setResponse("Error: Failed to send data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-yellow-400">POST</span>
                    <span>/api/energy/record</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-500 mb-2">Request Body (JSON)</label>
                    <div className="bg-gray-900 p-4 rounded border border-white/5 flex items-center gap-2">
                        <span className="text-purple-400">{"{"}</span>
                        <span className="text-blue-400">"amount"</span>:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent border-b border-gray-700 text-white w-16 text-center focus:outline-none focus:border-blue-500"
                        />
                        <span className="text-purple-400">{"}"}</span>
                    </div>
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send POST Request</>}
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
