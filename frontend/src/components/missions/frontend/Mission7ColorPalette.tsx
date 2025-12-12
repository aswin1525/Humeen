"use client";

import { useState } from "react";
import MissionLayout from "../MissionLayout";
import { CheckCircle, XCircle } from "lucide-react";

export default function Mission7ColorPalette({ onComplete }: { onComplete: () => void }) {
    const [primary, setPrimary] = useState("#3b82f6");
    const [secondary, setSecondary] = useState("#10b981");
    const [accent, setAccent] = useState("#8b5cf6");
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
                Color theory is more than just aesthetics; it's about communication. This mission guides you to create a harmonious 3-color palette generator.
            </p>
            <p className="text-gray-400 leading-relaxed">
                Colors on the web are often defined by code, usually Hex codes (like #FF5733) or RGB values. In this mission, you'll build a tool that generates color palettes dynamically. You'll see how changing a single number in your code translates to a visual change on the screen. This helps you understand how data (numbers) and design (pixels) are connected in frontend engineering.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Brand Identity</h4>
                <p className="text-sm text-gray-400">
                    Think of Coca-Cola's red, Facebook's blue, or Spotify's green. These colors are instantly recognizable and evoke specific emotions.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Color Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">60-30-10 Rule:</strong> A classic decor rule often applied to UI: 60% primary/neutral color, 30% secondary color, and 10% accent color.
                </li>
                <li>
                    <strong className="text-white">Contrast:</strong> Ensure sufficient contrast between text and background colors for readability (WCAG standards).
                </li>
                <li>
                    <strong className="text-white">Meaning:</strong> Don't rely on color alone to convey meaning (e.g., use icons along with red text for errors) to support color-blind users.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8 w-full">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Primary</label>
                    <input
                        type="color"
                        value={primary}
                        onChange={(e) => setPrimary(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Secondary</label>
                    <input
                        type="color"
                        value={secondary}
                        onChange={(e) => setSecondary(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Accent</label>
                    <input
                        type="color"
                        value={accent}
                        onChange={(e) => setAccent(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer bg-transparent"
                    />
                </div>
            </div>

            <div className="w-full p-8 bg-white rounded-xl shadow-xl text-center space-y-4">
                <h1 style={{ color: primary }} className="text-4xl font-bold">
                    Frontend Planet
                </h1>
                <p style={{ color: secondary }} className="text-xl font-medium">
                    Mastering the Art of UI
                </p>
                <button
                    style={{ backgroundColor: accent }}
                    className="px-6 py-2 rounded-full text-white font-bold shadow-lg"
                >
                    Get Started
                </button>
            </div>

            <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 mt-8">
                <CheckCircle className="w-5 h-5" /> Palette Saved! Proceed to Quiz.
            </div>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">What is the "60-30-10" rule in color theory?</p>
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
                        <span>60% Red, 30% Green, 10% Blue</span>
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
                        <span>60% Primary, 30% Secondary, 10% Accent</span>
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
                        <span>60% Dark, 30% Light, 10% Transparent</span>
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
            title="Color Palette Generator"
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
