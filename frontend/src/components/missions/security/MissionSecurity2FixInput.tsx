"use client";

import { useState } from "react";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function MissionSecurity2FixInput({ onComplete }: { onComplete: () => void }) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const options = [
        { id: 1, text: 'const query = `SELECT * FROM users WHERE id = ${userId}`;', correct: false },
        { id: 2, text: 'const query = "SELECT * FROM users WHERE id = ?"; db.execute(query, [userId]);', correct: true },
        { id: 3, text: 'const query = "SELECT * FROM users WHERE id = " + escape(userId);', correct: false },
    ];

    const handleComplete = () => {
        if (selectedOption === 2) {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-6 h-6" /> Secure the Query
                </h3>
                <p className="text-gray-400">Choose the safest way to handle the user ID in the database query.</p>
            </div>

            <div className="w-full space-y-3">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className={`w-full p-4 rounded-lg border text-left font-mono text-sm transition-all ${selectedOption === option.id
                                ? "bg-blue-600/20 border-blue-500 text-white"
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        {option.text}
                    </button>
                ))}
            </div>

            {selectedOption === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4">
                    <div className="text-green-400 font-bold">
                        Excellent! Parameterized queries prevent SQL Injection.
                    </div>
                    <button
                        onClick={onComplete}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" /> Apply Fix
                    </button>
                </div>
            )}

            {selectedOption !== null && selectedOption !== 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 text-yellow-400 font-bold">
                    Not quite. This method might still be risky or deprecated.
                </div>
            )}
        </div>
    );
}
