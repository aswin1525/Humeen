"use client";

import { useState } from "react";
import { CheckCircle, AlertOctagon, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionSecurity4FakeLogin({ onComplete }: { onComplete: () => void }) {
    const [foundClues, setFoundClues] = useState<string[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

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
                Social engineering bypasses technical defenses by hacking the human. Your task is to investigate a suspicious login page.
            </p>
            <p className="text-gray-400 leading-relaxed">
                Phishers are masters of disguise. In this mission, you'll dissect a fake login page pixel-by-pixel. You'll learn to spot the "tells" of a scam—like a misspelled URL (g00gle.com) or urgent threats ("Your account is suspended!"). This trains your eye to catch social engineering attacks before you click.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Email Phishing</h4>
                <p className="text-sm text-gray-400">
                    Emails that appear to be from your bank or employer asking you to "verify your account" by clicking a link.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Spear Phishing</h4>
                <p className="text-sm text-gray-400">
                    Targeted attacks against specific individuals or organizations, often using personalized information to increase credibility.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">How to Spot Phishing</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Check the URL:</strong> Look for misspellings (e.g., `g00gle.com` instead of `google.com`) or suspicious domains.
                </li>
                <li>
                    <strong className="text-white">Urgency:</strong> Be wary of messages demanding immediate action ("Your account will be deleted in 24 hours!").
                </li>
                <li>
                    <strong className="text-white">Verify Sources:</strong> If you receive a suspicious email, contact the sender directly through a known verified channel.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
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
                <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20">
                    <CheckCircle className="w-5 h-5" /> Phishing Detected! Proceed to Quiz.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What is a common sign of a phishing attempt?</p>
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
                        <span>The email addresses you by your full name</span>
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
                        <span>Creating a false sense of urgency</span>
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
                        <span>The website uses HTTPS</span>
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
            title="Phishing Detection"
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
