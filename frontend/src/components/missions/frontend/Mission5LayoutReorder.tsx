"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function Mission5LayoutReorder({ onComplete }: { onComplete: () => void }) {
    const [items, setItems] = useState(["Block A", "Block B", "Block C"]);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const moveItem = (index: number, direction: "up" | "down") => {
        const newItems = [...items];
        if (direction === "up" && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        } else if (direction === "down" && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        }
        setItems(newItems);
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
                Reorderable lists allow users to prioritize or organize content. This pattern is common in task management apps, playlists, and dashboard customization.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Trello / Jira</h4>
                <p className="text-sm text-gray-400">
                    Kanban boards rely heavily on drag-and-drop reordering to move tasks between columns or prioritize them within a list.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Spotify Playlists</h4>
                <p className="text-sm text-gray-400">
                    Users can drag songs to change their playback order.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Reordering Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Keyboard Accessibility:</strong> Drag-and-drop is hard for keyboard users. Always provide button-based alternatives (like Up/Down arrows).
                </li>
                <li>
                    <strong className="text-white">Visual Feedback:</strong> Indicate where the item will land while dragging (e.g., a placeholder or line).
                </li>
                <li>
                    <strong className="text-white">Animation:</strong> Smoothly animate items moving out of the way to help users understand the new order.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full space-y-4">
                {items.map((item, index) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <span className="font-bold text-lg">{item}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => moveItem(index, "up")}
                                disabled={index === 0}
                                className="p-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowUp className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => moveItem(index, "down")}
                                disabled={index === items.length - 1}
                                className="p-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowDown className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/5">
                <h3 className="text-sm text-gray-400 mb-4">Live Preview</h3>
                <div className="flex gap-4">
                    {items.map((item) => (
                        <div key={item} className="flex-1 h-32 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 rounded-lg">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Submit Layout
            </button>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Why is it important to provide Up/Down buttons in addition to drag-and-drop?</p>
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
                        <span>It looks better</span>
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
                        <span>For accessibility (keyboard users)</span>
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
                        <span>It's faster for everyone</span>
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
            title="Layout Reordering"
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
