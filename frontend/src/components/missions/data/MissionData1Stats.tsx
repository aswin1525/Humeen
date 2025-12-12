"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
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

    const { user } = useAuth();
    const [stats, setStats] = useState({
        missions: user?.stats?.missionsCompleted || 0,
        time: user?.stats?.timeSpent || 0,
        energy: user?.stats?.energyEarned || 0
    });

    const handleRefresh = async () => {
        // In a real app, this would re-fetch from backend. 
        // For now, we'll just use the current user stats or simulate an update if needed.
        // But the requirement is "use real stats of the user".
        if (user?.stats) {
            setStats({
                missions: user.stats.missionsCompleted,
                time: user.stats.timeSpent,
                energy: user.stats.energyEarned
            });
        }
    };

    const description = (
        <div className="space-y-4">
            <p className="text-lg text-gray-300">
                Raw data is noise; visualized data is insight. Your mission is to transform a stream of raw user numbers into meaningful statistics.
            </p>
            <p className="text-gray-400">
                You will learn how to aggregate, format, and present personalized metrics that help users understand their own behavior and progress within the system.
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
                <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl flex flex-col items-center text-center shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.missions}</div>
                    <div className="text-sm text-gray-400">Missions Completed</div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex flex-col items-center text-center shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.time}h</div>
                    <div className="text-sm text-gray-400">Time Spent</div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl flex flex-col items-center text-center shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 text-yellow-400">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.energy}</div>
                    <div className="text-sm text-gray-400">Energy Earned</div>
                </div>
            </div>

            <button
                onClick={handleRefresh}
                className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold text-white transition-all flex items-center gap-2 border border-white/10"
            >
                <Activity className="w-5 h-5" /> Refresh Live Data
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
