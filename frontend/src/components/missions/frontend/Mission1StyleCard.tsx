"use client";

import { useState } from "react";
import MissionLayout from "../MissionLayout";
import { CheckCircle, XCircle } from "lucide-react";

export default function Mission1StyleCard({ onComplete }: { onComplete: () => void }) {
    const [style, setStyle] = useState<"minimal" | "shadowed" | "glass">("minimal");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const getCardStyle = () => {
        switch (style) {
            case "minimal":
                return "bg-white border border-gray-200 text-gray-900";
            case "shadowed":
                return "bg-white shadow-xl text-gray-900 border-none";
            case "glass":
                return "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg";
            default:
                return "";
        }
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
                Modern UI design often relies on distinct visual styles to convey hierarchy and aesthetic appeal. Three popular styles are:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li><strong className="text-white">Minimal:</strong> Focuses on clean lines, ample whitespace, and subtle borders.</li>
                <li><strong className="text-white">Shadowed (Material):</strong> Uses depth and shadows to create a sense of elevation and hierarchy.</li>
                <li><strong className="text-white">Glassmorphism:</strong> Uses transparency and background blur to create a frosted glass effect.</li>
            </ul>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Apple (iOS/macOS)</h4>
                <p className="text-sm text-gray-400">
                    Apple heavily utilizes Glassmorphism in their operating systems to create a sense of depth and context, allowing background content to shine through.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Google (Material Design)</h4>
                <p className="text-sm text-gray-400">
                    Google's Material Design principles rely on shadows and elevation to mimic physical paper and ink, guiding user attention.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">UI Design Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Consistency:</strong> Stick to one primary style throughout your application to avoid visual clutter.
                </li>
                <li>
                    <strong className="text-white">Contrast:</strong> Ensure text is legible against the background, especially when using transparency (Glassmorphism).
                </li>
                <li>
                    <strong className="text-white">Performance:</strong> Heavy use of `backdrop-filter` (blur) can impact performance on lower-end devices. Use it sparingly.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                <button
                    onClick={() => setStyle("minimal")}
                    className={`px-4 py-2 rounded transition-colors ${style === "minimal" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    Minimal
                </button>
                <button
                    onClick={() => setStyle("shadowed")}
                    className={`px-4 py-2 rounded transition-colors ${style === "shadowed" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    Shadowed
                </button>
                <button
                    onClick={() => setStyle("glass")}
                    className={`px-4 py-2 rounded transition-colors ${style === "glass" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    Glassmorphic
                </button>
            </div>

            <div className={`w-64 h-40 rounded-xl flex items-center justify-center transition-all duration-500 ${getCardStyle()}`}>
                <div className="text-center">
                    <h3 className="font-bold text-lg">Card Title</h3>
                    <p className="opacity-80 text-sm">This is a preview card.</p>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Submit Design
            </button>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which CSS property is essential for creating the "Glassmorphism" effect?</p>
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
                        <span>box-shadow</span>
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
                        <span>border-radius</span>
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
                        <span>backdrop-filter</span>
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
                            <XCircle className="w-5 h-5" /> Incorrect. Hint: It blurs what's behind the element.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <MissionLayout
            title="Card Style Explorer"
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
