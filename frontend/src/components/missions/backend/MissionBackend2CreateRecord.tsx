"use client";

import { useState } from "react";
import { Send, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionBackend2CreateRecord({ onComplete }: { onComplete: () => void }) {
    const [amount, setAmount] = useState("10");
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const sendRequest = async () => {
        setLoading(true);
        try {
            // Simulating a POST request since we don't have a real energy endpoint for this specific mission
            // In a real app, this would hit the backend. For MVP, we'll simulate the success response.
            await new Promise(resolve => setTimeout(resolve, 500));
            setResponse(JSON.stringify({ status: "success", energy_added: parseInt(amount) }, null, 2));
        } catch (error) {
            setResponse("Error: Failed to send data");
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
                While GET requests retrieve data, POST requests are used to send data to the server to create or update resources.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Form Submissions</h4>
                <p className="text-sm text-gray-400">
                    When you sign up for a website or submit a contact form, the browser sends a POST request with your data.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Social Media Posts</h4>
                <p className="text-sm text-gray-400">
                    Creating a new tweet or uploading a photo involves sending data to the server via POST.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">POST Request Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Security:</strong> Sensitive data (like passwords) should always be sent in the body of a POST request (over HTTPS), never in the URL.
                </li>
                <li>
                    <strong className="text-white">Idempotency:</strong> Unlike GET, POST requests are generally not idempotent (sending the same request twice might create two records).
                </li>
                <li>
                    <strong className="text-white">Content-Type:</strong> Always specify the `Content-Type` header (e.g., `application/json`) so the server knows how to parse the body.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <span className="text-yellow-400">POST</span>
                    <span>/api/energy/record</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-500 mb-2">Request Body (JSON)</label>
                    <div className="bg-gray-900 p-4 rounded border border-white/5 flex items-center gap-2">
                        <span className="text-purple-400">{"{"}</span>
                        <span className="text-blue-400">"amount"</span>:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent border-b border-gray-700 text-white w-16 text-center focus:outline-none focus:border-blue-500"
                        />
                        <span className="text-purple-400">{"}"}</span>
                    </div>
                </div>
                <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send POST Request</>}
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
                <p className="text-lg mb-4">Where should sensitive data like passwords be placed in an HTTP request?</p>
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
                        <span>In the URL query parameters</span>
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
                        <span>In the request body (POST/PUT)</span>
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
                        <span>In the headers only</span>
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
            title="Data Creation (POST)"
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
