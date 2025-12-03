"use client";

import { useState } from "react";
import { CheckCircle, AlertOctagon } from "lucide-react";

export default function MissionSecurity4FakeLogin({ onComplete }: { onComplete: () => void }) {
    const [foundClues, setFoundClues] = useState<string[]>([]);

    const clues = [
        { id: "url", label: "Suspicious URL (g00gle.com)" },
        { id: "logo", label: "Mismatched/Low-res Logo" },
        { id: "urgent", label: "Urgent/Threatening Language" },
    ];

    const handleClueClick = (id: string) => {
        if (!foundClues.includes(id)) {
            setFoundClues([...foundClues, id]);
        }
    };

    const allFound = clues.every(c => foundClues.includes(c.id));

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-orange-400 mb-2 flex items-center justify-center gap-2">
                    <AlertOctagon className="w-6 h-6" /> Spot the Phishing
                </h3>
                <p className="text-gray-400">Click on the 3 suspicious elements in this fake login page.</p>
            </div>

            <div className="w-full bg-white rounded-lg overflow-hidden shadow-2xl relative">
                {/* Fake Browser Bar */}
                <div
                    onClick={() => handleClueClick("url")}
                    className={`bg-gray-100 p-2 border-b flex items-center gap-2 cursor-pointer transition-colors ${foundClues.includes("url") ? "bg-red-100" : "hover:bg-red-50"}`}
                >
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 bg-white border rounded px-2 text-sm text-gray-600 flex items-center">
                        <span className="text-red-500 mr-1">⚠</span>
                        http://accounts.g00gle.com/login
                    </div>
                </div>

                {/* Fake Content */}
                <div className="p-8 flex flex-col items-center gap-6 bg-white text-gray-800">
                    <div
                        onClick={() => handleClueClick("logo")}
                        className={`cursor-pointer p-2 rounded border-2 border-transparent ${foundClues.includes("logo") ? "border-red-500 bg-red-50" : "hover:border-red-200"}`}
                    >
                        <div className="text-4xl font-bold text-blue-600 tracking-tighter italic">Gooogle</div>
                    </div>

                    <div
                        onClick={() => handleClueClick("urgent")}
                        className={`text-center max-w-md cursor-pointer p-2 rounded border-2 border-transparent ${foundClues.includes("urgent") ? "border-red-500 bg-red-50" : "hover:border-red-200"}`}
                    >
                        <h2 className="text-2xl font-bold text-red-600 mb-2">ACCOUNT SUSPENDED!</h2>
                        <p>Login immediately or your account will be deleted in 24 hours!!!</p>
                    </div>

                    <div className="w-full max-w-sm space-y-4 opacity-50 pointer-events-none">
                        <input type="text" placeholder="Email" className="w-full p-3 border rounded" />
                        <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
                        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold">Login</button>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                {clues.map(clue => (
                    <div key={clue.id} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${foundClues.includes(clue.id) ? "bg-green-500 text-white" : "bg-white/10 text-gray-500"}`}>
                        {foundClues.includes(clue.id) ? "✓ " : ""}{clue.label}
                    </div>
                ))}
            </div>

            {allFound && (
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-in fade-in zoom-in"
                >
                    <CheckCircle className="w-5 h-5" /> Report Phishing
                </button>
            )}
        </div>
    );
}
