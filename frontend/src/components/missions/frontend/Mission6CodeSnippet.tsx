"use client";

import { useState } from "react";
import { Copy, Check, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function Mission6CodeSnippet({ onComplete }: { onComplete: () => void }) {
    const [selectedVariant, setSelectedVariant] = useState<"primary" | "secondary" | "danger">("primary");
    const [copied, setCopied] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const snippets = {
        primary: `<button className="bg-blue-500 text-white px-4 py-2 rounded">\n  Primary Action\n</button>`,
        secondary: `<button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">\n  Secondary Action\n</button>`,
        danger: `<button className="bg-red-500 text-white px-4 py-2 rounded">\n  Delete Item\n</button>`,
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[selectedVariant]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                Displaying code snippets with syntax highlighting and copy functionality is essential for developer documentation and educational platforms.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">GitHub / Stack Overflow</h4>
                <p className="text-sm text-gray-400">
                    These platforms are built around sharing code. They provide features like one-click copy, line numbers, and syntax highlighting to make code readable and usable.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Code Display Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">One-Click Copy:</strong> Always provide a button to copy the code to the clipboard. It's a huge quality-of-life improvement.
                </li>
                <li>
                    <strong className="text-white">Feedback:</strong> Show a visual confirmation (like a checkmark) when the code is copied.
                </li>
                <li>
                    <strong className="text-white">Overflow Handling:</strong> Ensure long lines of code scroll horizontally instead of breaking the layout.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                {(["primary", "secondary", "danger"] as const).map((v) => {
                    const activeColors = {
                        primary: "bg-blue-500 text-white hover:bg-blue-600",
                        secondary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300",
                        danger: "bg-red-500 text-white hover:bg-red-600"
                    };

                    return (
                        <button
                            key={v}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-4 py-2 rounded capitalize transition-all font-medium ${selectedVariant === v ? activeColors[v] : "bg-white/10 text-gray-400 hover:bg-white/20"
                                }`}
                        >
                            {v}
                        </button>
                    )
                })}
            </div>

            <div className="w-full relative group">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                    >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                    </button>
                </div>
                <pre className="bg-gray-950 p-6 rounded-xl border border-white/10 overflow-x-auto text-sm font-mono text-gray-300">
                    {snippets[selectedVariant]}
                </pre>
            </div>

            <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 mt-4">
                <CheckCircle className="w-5 h-5" /> Code Unlocked! Proceed to Quiz.
            </div>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which browser API is used to copy text to the clipboard programmatically?</p>
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
                        <span>document.copy()</span>
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
                        <span>navigator.clipboard.writeText()</span>
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
                        <span>window.clipboard()</span>
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
            title="Code Snippet Viewer"
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
