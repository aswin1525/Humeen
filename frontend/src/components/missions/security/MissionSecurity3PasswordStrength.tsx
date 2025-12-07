"use client";

import { useState } from "react";
import { CheckCircle, Lock, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionSecurity3PasswordStrength({ onComplete }: { onComplete: () => void }) {
    const [password, setPassword] = useState("");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

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

    const handleQuizSubmit = () => {
        if (quizAnswer === "c") {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    };

    const description = (
        <div className="space-y-4">
            <p className="text-lg text-gray-300">
                Passwords are the first line of defense for user accounts. Weak passwords are easily guessed or cracked by attackers using automated tools.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Credential Stuffing</h4>
                <p className="text-sm text-gray-400">
                    Attackers take usernames and passwords leaked from one site and try them on other sites, hoping users reused their passwords.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Brute Force Attacks</h4>
                <p className="text-sm text-gray-400">
                    Automated scripts can try millions of common passwords (like "123456" or "password") in seconds.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Password Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Length & Complexity:</strong> Enforce minimum length (e.g., 12+ chars) and a mix of character types.
                </li>
                <li>
                    <strong className="text-white">Hashing:</strong> Never store passwords in plain text. Use strong hashing algorithms like bcrypt or Argon2.
                </li>
                <li>
                    <strong className="text-white">MFA:</strong> Implement Multi-Factor Authentication (MFA) to add an extra layer of security beyond just the password.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
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
                <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 mt-4">
                    <CheckCircle className="w-5 h-5" /> Strong Password! Proceed to Quiz.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">How should passwords be stored in a database?</p>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-black/20 hover:bg-white/5 cursor-pointer transition-colors">
                        <input
                            type="radio"
                            name="quiz"
                            value="a"
                            checked={quizAnswer === "a"}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            className="w-5 h-5 text-blue-500"
                        />
                        <span>In plain text so admins can recover them</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-black/20 hover:bg-white/5 cursor-pointer transition-colors">
                        <input
                            type="radio"
                            name="quiz"
                            value="b"
                            checked={quizAnswer === "b"}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            className="w-5 h-5 text-blue-500"
                        />
                        <span>Encrypted with a reversible key</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-black/20 hover:bg-white/5 cursor-pointer transition-colors">
                        <input
                            type="radio"
                            name="quiz"
                            value="c"
                            checked={quizAnswer === "c"}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            className="w-5 h-5 text-blue-500"
                        />
                        <span>Hashed using a strong algorithm like bcrypt</span>
                    </label>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleQuizSubmit}
                            disabled={!quizAnswer || quizResult === true}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Submit Answer
                        </button>

                        {quizResult === true && (
                            <span className="text-green-400 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                <CheckCircle className="w-5 h-5" /> Correct!
                            </span>
                        )}

                        {quizResult === false && (
                            <span className="text-red-400 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                <XCircle className="w-5 h-5" /> Incorrect.
                            </span>
                        )}
                    </div>

                    {quizResult === true && (
                        <button
                            onClick={onComplete}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2"
                        >
                            <CheckCircle className="w-6 h-6" /> Complete Mission
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <MissionLayout
            title="Password Strength"
            description={description}
            realWorldCases={realWorldCases}
            protection={protection}
            protectionLabel="Best Practices"
            tryYourself={tryYourself}
            quiz={quiz}
            onComplete={onComplete}
        />
    );
}
