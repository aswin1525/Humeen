"use client";

import { useState } from "react";
import { Moon, Sun, Zap, CheckCircle, XCircle } from "lucide-react";
import MissionLayout from "../MissionLayout";

import { useMissionTheme } from "@/context/MissionThemeContext";

export default function Mission2ThemeToggle({ onComplete }: { onComplete: () => void }) {
    const [theme, setTheme] = useState<"light" | "dark" | "neon">("dark");
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<boolean | null>(null);
    const themeColor = useMissionTheme();

    const getThemeStyles = () => {
        // ... same logic
        switch (theme) {
            case "light": return "bg-gray-100 text-gray-900";
            case "dark": return "bg-gray-900 text-white";
            case "neon": return "bg-black text-cyan-400 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]";
            default: return "";
        }
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
                Theme toggling allows users to customize their viewing experience. Dark mode has become a standard feature, reducing eye strain in low-light environments and saving battery on OLED screens.
            </p>
            <p className="text-gray-400 leading-relaxed">
                In web development, "state" is like a memory for your application—it remembers what the user has chosen. Here, you'll use a specific tool called <code>useState</code> to remember whether the user wants Light Mode or Dark Mode. You'll also learn about CSS variables, which are like nicknames for your colors. Instead of saying "white" and "black" everywhere, you say "background-color" and "text-color," and then you just swap the definitions of those nicknames when the button is clicked. This makes changing the entire look of your app instant and easy.
            </p>
        </div>
    );

    const realWorldCases = (
        <div className="space-y-4">
            {/* Same cases */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">System-Wide Dark Mode</h4>
                <p className="text-sm text-gray-400">
                    macOS, Windows, iOS, and Android all support system-wide dark mode settings that apps can detect and respect automatically.
                </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">IDE Themes</h4>
                <p className="text-sm text-gray-400">
                    Developers often prefer dark themes (like Dracula or Monokai) for coding to reduce glare during long sessions.
                </p>
            </div>
        </div>
    );

    const bestPractices = (
        <div className="space-y-4">
            <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${themeColor}`}>Theming Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {/* Same list */}
                <li>
                    <strong className="text-white">Respect System Preference:</strong> Use `prefers-color-scheme` media query to default to the user's system setting.
                </li>
                <li>
                    <strong className="text-white">Avoid Pure Black:</strong> In dark mode, dark grays (e.g., #121212) are often better than pure black (#000000) to reduce smearing on OLED screens and improve depth perception.
                </li>
                <li>
                    <strong className="text-white">Persist Choice:</strong> Save the user's preference in local storage or a cookie so it persists across sessions.
                </li>
            </ul>
        </div>
    );

    const tryYourself = (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                <button
                    onClick={() => setTheme("light")}
                    className={`p-3 rounded-full transition-colors ${theme === "light" ? "bg-yellow-400 text-black" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    <Sun className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setTheme("dark")}
                    className={`p-3 rounded-full transition-colors ${theme === "dark" ? "bg-purple-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    <Moon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setTheme("neon")}
                    className={`p-3 rounded-full transition-colors ${theme === "neon" ? "bg-cyan-500 text-black" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                >
                    <Zap className="w-5 h-5" />
                </button>
            </div>

            <div className={`w-full max-w-md p-8 rounded-xl transition-all duration-500 ${getThemeStyles()}`}>
                <h3 className="text-2xl font-bold mb-4">Theme Preview</h3>
                <p className="opacity-80 mb-6">
                    This interface adapts to your selected theme. Notice how colors and shadows change instantly.
                </p>
                <div className="flex gap-2">
                    <div className="h-2 w-1/3 bg-current opacity-20 rounded"></div>
                    <div className="h-2 w-1/4 bg-current opacity-20 rounded"></div>
                </div>
            </div>

            <div className="animate-in fade-in zoom-in text-green-400 font-bold flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 mt-8">
                <CheckCircle className="w-5 h-5" /> Theme Confirmed! Proceed to Quiz.
            </div>
        </div>
    );

    const quiz = (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6">Test Your Knowledge</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-lg mb-4">Which CSS media feature is used to detect if the user has requested a light or dark color theme?</p>
                <div className="space-y-3">
                    {/* Using generic styles for quiz options */}
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-black/20 hover:bg-white/5 cursor-pointer transition-colors">
                        <input
                            type="radio"
                            name="quiz"
                            value="a"
                            checked={quizAnswer === "a"}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            className="w-5 h-5"
                        />
                        <span>@media (theme: dark)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-black/20 hover:bg-white/5 cursor-pointer transition-colors">
                        <input
                            type="radio"
                            name="quiz"
                            value="b"
                            checked={quizAnswer === "b"}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            className="w-5 h-5"
                        />
                        <span>@media (prefers-color-scheme: dark)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-black/20 hover:bg-white/5 cursor-pointer transition-colors">
                        <input
                            type="radio"
                            name="quiz"
                            value="c"
                            checked={quizAnswer === "c"}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            className="w-5 h-5"
                        />
                        <span>@media (color-mode: dark)</span>
                    </label>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleQuizSubmit}
                            disabled={!quizAnswer || quizResult === true}
                            className={`px-6 py-2 bg-gradient-to-r ${themeColor} hover:opacity-90 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
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
                            className={`w-full py-4 bg-gradient-to-r ${themeColor} rounded-xl font-bold text-white shadow-lg  hover:scale-[1.02] transition-all flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2`}
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
            title="Theme Toggle Logic"
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
