"use client";

import { useState } from "react";
import MissionLayout from "../MissionLayout";
import { CheckCircle, XCircle } from "lucide-react";

export default function Mission3ButtonCustomizer({ onComplete }: { onComplete: () => void }) {
    const [shape, setShape] = useState<"rounded" | "pill" | "square">("rounded");
    const [variant, setVariant] = useState<"filled" | "outline" | "ghost">("filled");
    const [color, setColor] = useState<"blue" | "green" | "purple">("blue");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const getButtonClasses = () => {
        let classes = "px-6 py-3 font-semibold transition-all duration-300 ";

        // Shape
        if (shape === "rounded") classes += "rounded-lg ";
        if (shape === "pill") classes += "rounded-full ";
        if (shape === "square") classes += "rounded-none ";

        // Color & Variant
        const colors = {
            blue: { filled: "bg-blue-500 text-white hover:bg-blue-600", outline: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10", ghost: "text-blue-400 hover:bg-blue-500/10" },
            green: { filled: "bg-green-500 text-white hover:bg-green-600", outline: "border-2 border-green-500 text-green-400 hover:bg-green-500/10", ghost: "text-green-400 hover:bg-green-500/10" },
            purple: { filled: "bg-purple-500 text-white hover:bg-purple-600", outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10", ghost: "text-purple-400 hover:bg-purple-500/10" },
        };

        classes += colors[color][variant];
        return classes;
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
                Buttons are the primary interactive elements in most UIs. Creating a flexible button component that supports multiple variants (filled, outline, ghost) and shapes ensures consistency across your application.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Design Systems</h4>
                <p className="text-sm text-gray-400">
                    Major design systems like Material UI, Ant Design, and Tailwind UI provide extensive button customization options to fit various brand needs while maintaining usability.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Button Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Hierarchy:</strong> Use "Filled" for primary actions, "Outline" for secondary, and "Ghost" for tertiary to guide user attention.
                </li>
                <li>
                    <strong className="text-white">States:</strong> Always define hover, active, and disabled states to provide visual feedback.
                </li>
                <li>
                    <strong className="text-white">Accessibility:</strong> Ensure sufficient color contrast and include focus rings for keyboard navigation.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8 w-full">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Shape</label>
                    <div className="flex flex-col gap-2">
                        {["rounded", "pill", "square"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setShape(s as any)}
                                className={`px-3 py-2 text-left rounded ${shape === s ? "bg-white/20 text-white" : "text-gray-400 hover:bg-white/5"}`}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Variant</label>
                    <div className="flex flex-col gap-2">
                        {["filled", "outline", "ghost"].map((v) => (
                            <button
                                key={v}
                                onClick={() => setVariant(v as any)}
                                className={`px-3 py-2 text-left rounded ${variant === v ? "bg-white/20 text-white" : "text-gray-400 hover:bg-white/5"}`}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Color</label>
                    <div className="flex flex-col gap-2">
                        {["blue", "green", "purple"].map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c as any)}
                                className={`px-3 py-2 text-left rounded ${color === c ? "bg-white/20 text-white" : "text-gray-400 hover:bg-white/5"}`}
                            >
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-12 bg-black/40 rounded-xl w-full flex items-center justify-center border border-white/5 min-h-[200px]">
                <button className={getButtonClasses()}>
                    Custom Button
                </button>
            </div>

            <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 mt-4">
                <CheckCircle className="w-5 h-5" /> Component Created! Proceed to Quiz.
            </div>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which button variant is typically used for the primary action on a page?</p>
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
                        <span>Outline (Border only)</span>
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
                        <span>Filled (Solid color)</span>
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
                        <span>Ghost (Text only)</span>
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
            title="Button Component Builder"
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
