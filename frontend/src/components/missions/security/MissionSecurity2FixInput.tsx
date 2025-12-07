"use client";

import { useState } from "react";
import { CheckCircle, ShieldCheck, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionSecurity2FixInput({ onComplete }: { onComplete: () => void }) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

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

    const handleQuizSubmit = () => {
        if (quizAnswer === "b") {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    };

    const description = (
        <div className="space-y-4">
            <p className="text-lg text-gray-300">
                SQL Injection (SQLi) is a vulnerability where an attacker interferes with the queries an application makes to its database. This can allow them to view data they are not normally able to retrieve.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Data Breaches</h4>
                <p className="text-sm text-gray-400">
                    Many high-profile data breaches involve attackers using SQL injection to dump entire databases containing passwords, emails, and credit card numbers.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Auth Bypass</h4>
                <p className="text-sm text-gray-400">
                    Attackers can sometimes log in as an administrator without a password by entering inputs like <code className="text-red-400">' OR '1'='1</code>.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Prevention Strategies</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Parameterized Queries:</strong> This is the most effective defense. It ensures the database treats user input as data, not executable code.
                </li>
                <li>
                    <strong className="text-white">Input Validation:</strong> Strictly validate all user inputs against a whitelist of allowed characters and formats.
                </li>
                <li>
                    <strong className="text-white">Least Privilege:</strong> Ensure the database user used by the application has only the minimum necessary permissions.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
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
                    <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20">
                        <CheckCircle className="w-5 h-5" /> Fix Applied! Proceed to Quiz.
                    </div>
                </div>
            )}

            {selectedOption !== null && selectedOption !== 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 text-yellow-400 font-bold">
                    Not quite. This method might still be risky or deprecated.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What is the primary defense against SQL Injection?</p>
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
                        <span>Hiding the database error messages</span>
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
                        <span>Using parameterized queries (Prepared Statements)</span>
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
                        <span>Encrypting the database</span>
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
            title="SQL Injection Defense"
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
