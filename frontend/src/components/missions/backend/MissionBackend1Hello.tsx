"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionBackend1Hello({ onComplete }: { onComplete: () => void }) {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/missions/ping");
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse("Error: Failed to connect to backend");
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
                Every great backend journey begins with a single request. Your first mission is to initialize a server and create a simple "Hello World" API endpoint.
            </p>
            <p className="text-gray-400">
                You will verify server connectivity, understand the basic structure of an HTTP response, and ensure your development environment is correctly configured to handle incoming traffic.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Health Checks</h4>
                <p className="text-sm text-gray-400">
                    Services often expose a `/ping` or `/health` endpoint that load balancers use to check if the service is up and running.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Public APIs</h4>
                <p className="text-sm text-gray-400">
                    APIs like the Pokémon API or Weather APIs allow developers to fetch data using simple GET requests.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">API Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Statelessness:</strong> Each request should contain all the information needed to process it. The server shouldn't rely on stored context.
                </li>
                <li>
                    <strong className="text-white">HTTP Methods:</strong> Use the correct method (GET for retrieving, POST for creating, etc.).
                </li>
                <li>
                    <strong className="text-white">Status Codes:</strong> Return appropriate HTTP status codes (200 OK, 404 Not Found, 500 Server Error).
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-green-400">GET</span>
                    <span>/api/missions/ping</span>
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Request</>}
                </button>
            </div>

            {response && (
                <div className="w-full p-6 bg-gray-900 rounded-xl border border-white/10 font-mono text-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="text-gray-500 mb-2">Response Body:</div>
                    <pre className="text-green-400">{response}</pre>
                </div>
            )}

            {response && response.includes("pong") && (
                <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 mt-4">
                    <CheckCircle className="w-5 h-5" /> Response Received! Proceed to Quiz.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which HTTP method is typically used to retrieve data from a server?</p>
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
                        <span>GET</span>
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
                        <span>POST</span>
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
                        <span>DELETE</span>
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
            title="Hello World API"
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
