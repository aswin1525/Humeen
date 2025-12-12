"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, MapPin, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionData5Predict({ onComplete }: { onComplete: () => void }) {
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

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
                Predictive analytics looks to the future. Your final mission is to implement a basic suggestion engine.
            </p>
            <p className="text-gray-400 leading-relaxed">
                Using algorithms based on past behavior, you will predict where a user might go next. This introduces "Predictive Analytics"—using historical data to forecast future actions. It's a peek into the logic that powers recommendation engines like Netflix or Spotify.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Recommendation Engines</h4>
                <p className="text-sm text-gray-400">
                    Netflix and Spotify use predictive models to suggest movies and music you are likely to enjoy.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Fraud Detection</h4>
                <p className="text-sm text-gray-400">
                    Banks use predictive analytics to identify unusual spending patterns that may indicate fraud.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Model Ethics</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Bias:</strong> Ensure your training data is representative to avoid biased predictions.
                </li>
                <li>
                    <strong className="text-white">Transparency:</strong> Strive for explainable AI so users understand why a prediction was made.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center justify-center gap-2">
                    <ArrowRight className="w-6 h-6" /> Next Destination
                </h3>
                <p className="text-gray-400">Based on your activity, our AI suggests your next stop.</p>
            </div>

            <div className="w-full p-8 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl flex items-center justify-between shadow-xl shadow-cyan-900/20">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
                        <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-sm text-cyan-300 uppercase tracking-wider font-bold mb-1">Recommended</div>
                        <h2 className="text-3xl font-bold text-white">Cyber Planet</h2>
                        <p className="text-gray-400 text-sm mt-1">Match score: 98%</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors shadow-lg shadow-cyan-500/20">
                        Accept Suggestion
                    </button>
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-colors">
                        Skip
                    </button>
                </div>
            </div>

            <div className="animate-in fade-in zoom-in text-cyan-400 font-bold flex items-center gap-2 bg-cyan-500/10 px-6 py-3 rounded-full border border-cyan-500/20">
                <CheckCircle className="w-5 h-5" /> Prediction Accepted! Proceed to Quiz.
            </div>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What is the main goal of predictive analytics?</p>
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
                        <span>To forecast future events based on historical data</span>
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
                        <span>To delete old data to save space</span>
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
                        <span>To visualize current data in real-time</span>
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
            title="Predict Next Planet"
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
