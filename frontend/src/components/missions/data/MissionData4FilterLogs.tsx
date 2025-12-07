"use client";

import { useState } from "react";
import { CheckCircle, Filter, Search, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionData4FilterLogs({ onComplete }: { onComplete: () => void }) {
    const [filter, setFilter] = useState("all");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const logs = [
        { id: 1, planet: "Frontend", action: "Mission Completed", time: "2m ago" },
        { id: 2, planet: "Backend", action: "API Call Failed", time: "5m ago" },
        { id: 3, planet: "Security", action: "Vulnerability Found", time: "12m ago" },
        { id: 4, planet: "Frontend", action: "Style Updated", time: "15m ago" },
        { id: 5, planet: "Data", action: "Stats Viewed", time: "1h ago" },
    ];

    const filteredLogs = filter === "all" ? logs : logs.filter(l => l.planet.toLowerCase() === filter);

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
                Filtering is a fundamental data operation that allows you to narrow down a large dataset to find relevant information based on specific criteria.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">E-commerce</h4>
                <p className="text-sm text-gray-400">
                    Customers filter products by price, category, rating, and brand to find exactly what they want.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Log Analysis</h4>
                <p className="text-sm text-gray-400">
                    Developers filter server logs by error level (e.g., ERROR, WARN) to quickly identify and fix issues.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Efficient Filtering</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Indexing:</strong> In databases, indexes make filtering significantly faster by creating a sorted lookup table.
                </li>
                <li>
                    <strong className="text-white">Client vs. Server:</strong> For small datasets, client-side filtering is fast. For large datasets, server-side filtering is necessary to reduce data transfer.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
            <div className="w-full flex items-center justify-between gap-4 p-4 bg-white/5 rounded-lg border border-white/10 shadow-lg shadow-black/20">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter className="w-5 h-5" />
                    <span className="font-bold">Filter Logs:</span>
                </div>
                <div className="flex gap-2">
                    {["all", "frontend", "backend", "security", "data"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${filter === f ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-white/10 text-gray-400 hover:bg-white/20"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full bg-black/40 rounded-xl border border-white/10 overflow-hidden shadow-xl shadow-black/30">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-4 font-medium">Planet</th>
                            <th className="p-4 font-medium">Action</th>
                            <th className="p-4 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.planet === "Frontend" ? "bg-blue-500/20 text-blue-400" :
                                        log.planet === "Backend" ? "bg-green-500/20 text-green-400" :
                                            log.planet === "Security" ? "bg-red-500/20 text-red-400" :
                                                "bg-purple-500/20 text-purple-400"
                                        }`}>
                                        {log.planet}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-300">{log.action}</td>
                                <td className="p-4 text-right text-gray-500 font-mono">{log.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No logs found for this filter.</div>
                )}
            </div>

            {filter !== "all" && (
                <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20">
                    <CheckCircle className="w-5 h-5" /> Filter Applied! Proceed to Quiz.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">When should you use server-side filtering instead of client-side?</p>
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
                        <span>When the dataset is very large</span>
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
                        <span>When the user has a slow internet connection</span>
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
                        <span>When you want to use more JavaScript</span>
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
            title="Filter Activity Logs"
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
