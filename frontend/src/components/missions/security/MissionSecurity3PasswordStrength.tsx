"use client";

import { useState } from "react";
import { CheckCircle, Lock } from "lucide-react";

export default function MissionSecurity3PasswordStrength({ onComplete }: { onComplete: () => void }) {
    const [password, setPassword] = useState("");

    const getStrength = (pwd: string) => {
        if (pwd.length === 0) return 0;
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };

    const strength = getStrength(password);
    const isStrong = strength === 4;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
                    <Lock className="w-6 h-6" /> Create Strong Password
                </h3>
                <p className="text-gray-400 text-sm">
                    Must be 8+ chars, include uppercase, number, and special char.
                </p>
            </div>

            <div className="w-full space-y-4">
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full p-4 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
                />

                <div className="flex gap-2 h-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`flex-1 rounded-full transition-colors duration-300 ${strength >= step
                                    ? strength === 4
                                        ? "bg-green-500"
                                        : strength >= 2
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    : "bg-white/10"
                                }`}
                        ></div>
                    ))}
                </div>

                <div className="text-right text-sm font-bold transition-colors duration-300">
                    {strength === 0 && <span className="text-gray-500">Empty</span>}
                    {strength === 1 && <span className="text-red-500">Weak</span>}
                    {strength === 2 && <span className="text-yellow-500">Fair</span>}
                    {strength === 3 && <span className="text-yellow-400">Good</span>}
                    {strength === 4 && <span className="text-green-500">Strong!</span>}
                </div>
            </div>

            {isStrong && (
                <button
                    onClick={onComplete}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-in fade-in zoom-in"
                >
                    <CheckCircle className="w-5 h-5" /> Save Password
                </button>
            )}
        </div>
    );
}
