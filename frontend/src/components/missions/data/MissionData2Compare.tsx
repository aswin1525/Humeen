"use client";

import { useState } from "react";
import { CheckCircle, BarChart2, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionData2Compare({ onComplete }: { onComplete: () => void }) {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const data = [
        { name: "Frontend", value: 80, color: "bg-blue-500" },
        { name: "Backend", value: 45, color: "bg-green-500" },
        { name: "Security", value: 30, color: "bg-red-500" },
        { name: "Data", value: 15, color: "bg-purple-500" },
    ];

    const handleSelect = (name: string) => {
        setSelectedPlanet(name);
    };

    const handleQuizSubmit = () => {
        if (quizAnswer === "c") {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    };

    const description = (
        <div className="space-y-4">
            <p className="text-lg text-gray-300">
                Comparative analysis involves comparing two or more data sets to identify patterns, trends, and anomalies. Bar charts are a common tool for this.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Market Analysis</h4>
                <p className="text-sm text-gray-400">
                    Comparing sales figures across different regions or time periods to identify high-performing areas.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">A/B Testing</h4>
                <p className="text-sm text-gray-400">
                    Comparing conversion rates between two versions of a website to determine which one performs better.
                </p>
            </div>
        </div>
    );

    const protection = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Visualization Tips</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Scale:</strong> Ensure the Y-axis starts at zero to avoid exaggerating differences.
                </li>
                <li>
                    <strong className="text-white">Labels:</strong> Clearly label axes and data points to make the chart self-explanatory.
                </li>
                <li>
                    <strong className="text-white">Color:</strong> Use color to highlight important data or group related categories, not just for decoration.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
                    <BarChart2 className="w-6 h-6" /> Activity Analysis
                </h3>
                <p className="text-gray-400">Select the planet with the highest activity level.</p>
            </div>

            <div className="w-full h-64 flex items-end justify-center gap-8 p-8 bg-black/40 rounded-xl border border-white/10">
                {data.map((item) => (
                    <div key={item.name} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => handleSelect(item.name)}>
                        <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{item.value}%</div>
                        <div
                            className={`w-16 rounded-t-lg transition-all duration-500 ${item.color} ${selectedPlanet === item.name ? "opacity-100 ring-2 ring-white" : "opacity-70 hover:opacity-90"}`}
                            style={{ height: `${item.value * 2}px` }}
                        ></div>
                        <div className={`text-sm font-bold ${selectedPlanet === item.name ? "text-white" : "text-gray-500"}`}>{item.name}</div>
                    </div>
                ))}
            </div>

            {selectedPlanet === "Frontend" && (
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2 animate-in fade-in zoom-in"
                >
                    <CheckCircle className="w-5 h-5" /> Confirm Analysis
                </button>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Why is it important to start bar charts at zero?</p>
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
                        <span>It saves space on the screen</span>
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
                        <span>Zero is a lucky number in data science</span>
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
                        <span>To accurately represent the relative size of values</span>
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
            title="Compare Planets"
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
