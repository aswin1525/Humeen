"use client";

import { useState } from "react";
import { CheckCircle, Activity, Clock, Zap, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionData1Stats({ onComplete }: { onComplete: () => void }) {
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
                Data analytics involves inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Business Intelligence</h4>
                <p className="text-sm text-gray-400">
                    Companies use dashboards to track Key Performance Indicators (KPIs) like revenue, customer acquisition cost, and churn rate.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Health Monitoring</h4>
                <p className="text-sm text-gray-400">
                    Wearable devices track heart rate, steps, and sleep patterns to provide users with health insights.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Data Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Accuracy:</strong> Ensure data is collected from reliable sources and is free from errors.
                </li>
                <li>
                    <strong className="text-white">Privacy:</strong> Anonymize personal data to protect user identity (GDPR/CCPA compliance).
                </li>
                <li>
                    <strong className="text-white">Context:</strong> Always present data with context (e.g., comparing current stats to previous periods) to avoid misleading interpretations.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <div className="text-sm text-gray-400">Missions Completed</div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">2.5h</div>
                    <div className="text-sm text-gray-400">Time Spent</div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 text-yellow-400">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">450</div>
                    <div className="text-sm text-gray-400">Energy Earned</div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
                <CheckCircle className="w-5 h-5" /> Acknowledge Stats
            </button>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What is a KPI?</p>
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
                        <span>Key Programming Interface</span>
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
                        <span>Key Performance Indicator</span>
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
                        <span>Kernel Process Identifier</span>
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
            title="View Your Stats"
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
