"use client";

import { useState } from "react";
import { CheckCircle, Sparkles, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionData3Constellation({ onComplete }: { onComplete: () => void }) {
    const [revealed, setRevealed] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

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
                Complex relationships require graph thinking. Your task is to visualize a network of skills as a "constellation".
            </p>
            <p className="text-gray-400">
                You will create a node-link diagram that represents connections between different concepts, learning how to structure graph data and present it intuitively to the user.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Social Networks</h4>
                <p className="text-sm text-gray-400">
                    Modeling users as nodes and friendships as edges to suggest new friends or analyze community structure.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Recommendation Systems</h4>
                <p className="text-sm text-gray-400">
                    Connecting users to products they might like based on their purchase history and the history of similar users.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Graph Analysis Tips</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Centrality:</strong> Identify the most important nodes (influencers, hubs) in the network.
                </li>
                <li>
                    <strong className="text-white">Clustering:</strong> Find groups of tightly connected nodes to identify communities.
                </li>
                <li>
                    <strong className="text-white">Pathfinding:</strong> Find the shortest path between two nodes (e.g., GPS navigation).
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6" /> Skill Constellation
                </h3>
                <p className="text-gray-400">Reveal your connected skills across the universe.</p>
            </div>

            <div className="w-full h-80 bg-gray-950 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-900/20">
                {!revealed ? (
                    <button
                        onClick={() => setRevealed(true)}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-colors border border-white/20 shadow-lg shadow-white/5"
                    >
                        Reveal Skills
                    </button>
                ) : (
                    <div className="relative w-full h-full animate-in fade-in duration-1000">
                        {/* Stars/Nodes */}
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"></div>
                        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] z-10"></div>

                        {/* Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" className="animate-in fade-in duration-1000 delay-300" />
                            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" className="animate-in fade-in duration-1000 delay-500" />
                        </svg>

                        {/* Labels */}
                        <div className="absolute top-[20%] left-[20%] text-blue-300 text-xs font-bold shadow-black drop-shadow-md">UI Design</div>
                        <div className="absolute top-[45%] left-[45%] text-purple-300 text-xs font-bold shadow-black drop-shadow-md">Full Stack</div>
                        <div className="absolute bottom-[20%] right-[20%] text-green-300 text-xs font-bold shadow-black drop-shadow-md">API Logic</div>
                    </div>
                )}
            </div>

            {revealed && (
                <div className="animate-in fade-in slide-in-from-bottom-4 delay-700 text-yellow-400 font-bold flex items-center gap-2 bg-yellow-500/10 px-6 py-3 rounded-full border border-yellow-500/20">
                    <Sparkles className="w-5 h-5" /> Constellation Revealed! Proceed to Quiz.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">In a graph database, what represents a relationship?</p>
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
                        <span>Node</span>
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
                        <span>Edge</span>
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
                        <span>Table</span>
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
                                <XCircle className="w-5 h-5" /> Incorrect. Try again.
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
            title="Unlock Skill Constellation"
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
