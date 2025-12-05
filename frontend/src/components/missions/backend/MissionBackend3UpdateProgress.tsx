"use client";

import { useState } from "react";
import { Send, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionBackend3UpdateProgress({ onComplete }: { onComplete: () => void }) {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/missions/user/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ missionId: "MISSION_BACKEND_3", status: "in_progress" })
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse("Error: Failed to update progress");
        } finally {
            setLoading(false);
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
                Updating existing resources often involves PUT or PATCH requests, but POST is also commonly used for complex updates or state transitions.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Save Game Progress</h4>
                <p className="text-sm text-gray-400">
                    Games constantly sync your progress to the cloud so you can pick up where you left off on another device.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Editing Profiles</h4>
                <p className="text-sm text-gray-400">
                    Changing your avatar or bio sends an update request to the backend.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Update Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Validation:</strong> The backend must validate all incoming data to ensure it meets requirements (e.g., valid email format).
                </li>
                <li>
                    <strong className="text-white">Optimistic UI:</strong> The frontend can update the UI immediately while the request processes in the background to make the app feel faster.
                </li>
                <li>
                    <strong className="text-white">Error Handling:</strong> Always handle potential errors (network issues, server errors) and inform the user.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-yellow-400">POST</span>
                    <span>/api/missions/user/progress</span>
                </div>
                <div className="mb-4 p-4 bg-gray-900 rounded border border-white/5 text-gray-400">
                    {`{ "missionId": "MISSION_BACKEND_3", "status": "in_progress" }`}
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Updating..." : <><Send className="w-4 h-4" /> Update Progress</>}
                </button>
            </div>

            {response && (
                <div className="w-full p-6 bg-gray-900 rounded-xl border border-white/10 font-mono text-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="text-gray-500 mb-2">Response Body:</div>
                    <pre className="text-green-400">{response}</pre>
                </div>
            )}

            {response && (
                <button
                    onClick={onComplete}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" /> Complete Mission
                </button>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What is "Optimistic UI"?</p>
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
                        <span>Hoping the server doesn't crash</span>
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
                        <span>Updating the UI immediately before the server responds</span>
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
                        <span>Using bright colors in the design</span>
                    </label>
                </div>

                <div className="mt-6 flex items-center gap-4">
                    <button
                        onClick={handleQuizSubmit}
                        disabled={!quizAnswer}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold disabled:opacity-50 transition-colors"
                    >
                        Submit Answer
                    </button>

                    {quizResult === true && (
                        <span className="text-green-400 font-bold flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Correct!
                        </span>
                    )}

                    {quizResult === false && (
                        <span className="text-red-400 font-bold flex items-center gap-2">
                            <XCircle className="w-5 h-5" /> Incorrect.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <MissionLayout
            title="Update Progress"
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
