"use client";

import { useState } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

export default function Mission4ModalInteraction({ onComplete }: { onComplete: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [animation, setAnimation] = useState<"fade" | "slide" | "zoom">("fade");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);

    const getModalStyles = () => {
        const base = "fixed inset-0 z-50 flex items-center justify-center p-4 ";
        const backdrop = "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ";
        const content = "relative bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-white/10 transition-all duration-300 ";

        let animStyles = "";
        if (isOpen) {
            if (animation === "fade") animStyles = "opacity-100 scale-100";
            if (animation === "slide") animStyles = "opacity-100 translate-y-0";
            if (animation === "zoom") animStyles = "opacity-100 scale-100";
        } else {
            if (animation === "fade") animStyles = "opacity-0 pointer-events-none";
            if (animation === "slide") animStyles = "opacity-0 translate-y-10 pointer-events-none";
            if (animation === "zoom") animStyles = "opacity-0 scale-90 pointer-events-none";
        }

        return { base, backdrop: backdrop + (isOpen ? "opacity-100" : "opacity-0"), content: content + animStyles };
    };

    const styles = getModalStyles();

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
                Modals (or dialogs) are UI elements that sit on top of the main application content, demanding user attention. They are used for critical actions, confirmations, or displaying detailed information without navigating away.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Login/Signup</h4>
                <p className="text-sm text-gray-400">
                    Many sites use modals for authentication to allow users to log in without losing their current context (e.g., reading an article or checking out).
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Confirmation Dialogs</h4>
                <p className="text-sm text-gray-400">
                    "Are you sure you want to delete this?" dialogs prevent accidental destructive actions.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Modal Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                    <strong className="text-white">Focus Trapping:</strong> When a modal is open, keyboard focus should be trapped within it so users can't interact with the background content.
                </li>
                <li>
                    <strong className="text-white">Escape to Close:</strong> Users should be able to close the modal by pressing the Escape key.
                </li>
                <li>
                    <strong className="text-white">Click Outside:</strong> Clicking the backdrop (overlay) should typically close the modal.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                {["fade", "slide", "zoom"].map((a) => (
                    <button
                        key={a}
                        onClick={() => setAnimation(a as any)}
                        className={`px-4 py-2 rounded transition-colors ${animation === a ? "bg-purple-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                    >
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
                Open Modal
            </button>

            {/* Modal Overlay */}
            <div className={`${styles.base} ${isOpen ? "" : "pointer-events-none"}`}>
                <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>
                <div className={styles.content}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Modal Title</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-300 mb-6">
                        This is a demonstration of the {animation} animation style.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-300 hover:bg-white/10 rounded">
                            Cancel
                        </button>
                        <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Master Interactions
            </button>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which of the following is a critical accessibility feature for modals?</p>
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
                        <span>Bright colors</span>
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
                        <span>Large fonts</span>
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
                        <span>Focus trapping (keeping keyboard focus inside)</span>
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
            title="Modal Interaction Master"
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
