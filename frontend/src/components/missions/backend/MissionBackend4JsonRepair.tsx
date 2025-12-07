"use client";

import { useState } from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function MissionBackend4JsonRepair({ onComplete }: { onComplete: () => void }) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const brokenJson = `{
  "user": "Alice",
  "age": 25
  "role": "admin"
}`;

    const options = [
        { id: 1, text: 'Add a comma after "age": 25', correct: true },
        { id: 2, text: 'Remove quotes from "user"', correct: false },
        { id: 3, text: 'Change curly braces to brackets', correct: false },
    ];

    const handleSubmit = () => {
        if (selectedOption === null) return;
        const correct = options.find(o => o.id === selectedOption)?.correct || false;
        setIsCorrect(correct);
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
                JSON (JavaScript Object Notation) is the standard format for data exchange on the web. It is lightweight, human-readable, and easy for machines to parse. However, it has strict syntax rules.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Configuration Files</h4>
                <p className="text-sm text-gray-400">
                    Many tools (like VS Code, ESLint, Prettier) use JSON files for configuration. A single missing comma can break the entire config.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">API Responses</h4>
                <p className="text-sm text-gray-400">
                    Almost all modern REST APIs return data in JSON format.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">JSON Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Double Quotes:</strong> Keys and string values must always be enclosed in double quotes. Single quotes are not valid in JSON.
                </li>
                <li>
                    <strong className="text-white">Trailing Commas:</strong> Standard JSON does not allow trailing commas after the last item in an object or array.
                </li>
                <li>
                    <strong className="text-white">Data Types:</strong> JSON supports strings, numbers, booleans, null, objects, and arrays. It does not support functions or undefined.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full p-6 bg-red-900/20 border border-red-500/30 rounded-xl font-mono text-sm relative">
                <div className="absolute top-4 right-4 text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Syntax Error
                </div>
                <pre className="text-gray-300">{brokenJson}</pre>
            </div>

            <div className="w-full space-y-3">
                <p className="text-gray-400 mb-2">How do you fix this JSON?</p>
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => {
                            setSelectedOption(option.id);
                            setIsCorrect(null);
                        }}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${selectedOption === option.id
                            ? "bg-blue-600/20 border-blue-500 text-white"
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        {option.text}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors disabled:opacity-50"
            >
                Check Fix
            </button>

            {isCorrect === true && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                        <CheckCircle className="w-6 h-6" /> Correct! Missing comma added.
                    </div>
                    <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20">
                        <CheckCircle className="w-5 h-5" /> JSON Fixed! Proceed to Quiz.
                    </div>
                </div>
            )}

            {isCorrect === false && (
                <div className="animate-in fade-in slide-in-from-bottom-4 flex items-center gap-2 text-red-400 font-bold">
                    <XCircle className="w-6 h-6" /> Incorrect. Try again.
                </div>
            )}
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which of the following is valid JSON?</p>
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
                        <span>{`{ 'name': 'John' }`}</span>
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
                        <span>{`{ "name": "John" }`}</span>
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
                        <span>{`{ name: "John" }`}</span>
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
            title="JSON Repair"
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
