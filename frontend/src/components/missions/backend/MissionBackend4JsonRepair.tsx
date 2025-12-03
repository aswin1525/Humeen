"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function MissionBackend4JsonRepair({ onComplete }: { onComplete: () => void }) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const brokenJson = `{
  "user": "Alice",
  "age": 25
  "role": "admin"
}`;

    const options = [
        { id: 1, text: 'Add a comma after "age": 25', correct: true },
        { id: 2, text: 'Remove quotes from "user"', correct: false },
        { id: 3, text: 'Change curly braces to brackets', correct: false },
    ];

    const handleSubmit = () => {
        if (selectedOption === null) return;
        const correct = options.find(o => o.id === selectedOption)?.correct || false;
        setIsCorrect(correct);
        if (correct) {
            // Wait a bit then show complete button
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-red-900/20 border border-red-500/30 rounded-xl font-mono text-sm relative">
                <div className="absolute top-4 right-4 text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Syntax Error
                </div>
                <pre className="text-gray-300">{brokenJson}</pre>
            </div>

            <div className="w-full space-y-3">
                <p className="text-gray-400 mb-2">How do you fix this JSON?</p>
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => {
                            setSelectedOption(option.id);
                            setIsCorrect(null);
                        }}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${selectedOption === option.id
                                ? "bg-blue-600/20 border-blue-500 text-white"
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        {option.text}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors disabled:opacity-50"
            >
                Check Fix
            </button>

            {isCorrect === true && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                        <CheckCircle className="w-6 h-6" /> Correct! Missing comma added.
                    </div>
                    <button
                        onClick={onComplete}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
                    >
                        Complete Mission
                    </button>
                </div>
            )}

            {isCorrect === false && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex items-center gap-2 text-red-400 font-bold">
                    <XCircle className="w-6 h-6" /> Incorrect. Try again.
                </div>
            )}
        </div>
    );
}

import { AlertCircle } from "lucide-react";
