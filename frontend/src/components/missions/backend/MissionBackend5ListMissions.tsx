"use client";

import { useState } from "react";
import { Send, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionBackend5ListMissions({ onComplete }: { onComplete: () => void }) {
    const [response, setResponse] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/missions");
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                Fetching lists of data is a fundamental backend operation. This usually involves a GET request to a collection resource (e.g., `/users`, `/products`).
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">E-commerce Product Lists</h4>
                <p className="text-sm text-gray-400">
                    Browsing a category on Amazon involves fetching a list of products from the backend, often with pagination.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Social Feeds</h4>
                <p className="text-sm text-gray-400">
                    Instagram or Twitter feeds are essentially lists of posts fetched from the server.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">List Fetching Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Pagination:</strong> Never return *all* records if there could be thousands. Use pagination (page/limit) to return manageable chunks.
                </li>
                <li>
                    <strong className="text-white">Filtering & Sorting:</strong> Allow clients to filter and sort data on the server side to reduce data transfer and client-side processing.
                </li>
                <li>
                    <strong className="text-white">Caching:</strong> Cache frequently accessed lists (like product categories) to reduce database load.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto h-full">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm shrink-0">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-green-400">GET</span>
                    <span>/api/missions</span>
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Fetching..." : <><Send className="w-4 h-4" /> Fetch All Missions</>}
                </button>
            </div>

            {response && (
                <div className="w-full flex-1 min-h-0 bg-gray-900 rounded-xl border border-white/10 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-4 border-b border-white/10 bg-gray-800/50 text-gray-400 text-xs font-mono">
                        {response.length} items found
                    </div>
                    <div className="overflow-y-auto p-4 space-y-2 max-h-[300px] custom-scrollbar">
                        {response.map((mission) => (
                            <div key={mission.id} className="p-3 bg-black/20 rounded border border-white/5 font-mono text-xs text-gray-300 hover:bg-white/5 transition-colors">
                                <div className="text-green-400 font-bold mb-1">{mission.title}</div>
                                <div className="opacity-70">{mission.description}</div>
                                <div className="mt-2 flex gap-2">
                                    <span className="bg-blue-500/20 text-blue-300 px-1 rounded">{mission.planet}</span>
                                    <span className="bg-purple-500/20 text-purple-300 px-1 rounded">+{mission.energyPoints} XP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {response && (
                <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 shrink-0">
                    <CheckCircle className="w-5 h-5" /> Missions Fetched! Proceed to Quiz.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Why is pagination important when fetching lists?</p>
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
                        <span>To improve performance and reduce data transfer</span>
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
                        <span>It makes the design look better</span>
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
                        <span>It's required by law</span>
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
            title="List Missions"
            description={description}
            realWorldCases={realWorldCases}
            protection={bestPractices}
            protectionLabel="Best Practices"
            tryYourself={tryYourself}
            quiz={quiz}
            onComplete={onComplete}
        />
    );
}
