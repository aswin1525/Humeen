"use client";

import { useState, ReactNode, useEffect, useRef } from "react";
import { BookOpen, Shield, Terminal, HelpCircle, AlertTriangle } from "lucide-react";

interface MissionLayoutProps {
    title: string;
    description: ReactNode;
    realWorldCases: ReactNode;
    protection?: ReactNode;
    protectionLabel?: string;
    tryYourself: ReactNode;
    quiz: ReactNode;
    onComplete: () => void;
}

type Tab = "description" | "cases" | "protection" | "try" | "quiz";

export default function MissionLayout({
    title,
    description,
    realWorldCases,
    protection,
    protectionLabel = "Protection",
    tryYourself,
    quiz,
    onComplete
}: MissionLayoutProps) {
    const [activeTab, setActiveTab] = useState<Tab>("description");

    const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
        { id: "description", label: "Description", icon: <BookOpen className="w-4 h-4" /> },
        { id: "cases", label: "Real-World Cases", icon: <AlertTriangle className="w-4 h-4" /> },
        { id: "try", label: "Try Yourself", icon: <Terminal className="w-4 h-4" /> },
        { id: "quiz", label: "Quiz", icon: <HelpCircle className="w-4 h-4" /> },
    ];

    if (protection) {
        // Insert protection tab after cases
        tabs.splice(2, 0, {
            id: "protection",
            label: protectionLabel,
            icon: <Shield className="w-4 h-4" />
        });
    }

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeTab !== "quiz" || !contentRef.current) return;

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "childList") {
                    const addedNodes = Array.from(mutation.addedNodes);
                    for (const node of addedNodes) {
                        if (node instanceof HTMLElement) {
                            // Check if the added node is the button or contains the button
                            if (node.textContent?.includes("Complete Mission")) {
                                const button = node.tagName === "BUTTON" ? node : node.querySelector("button");
                                if (button && button.textContent?.includes("Complete Mission")) {
                                    setTimeout(() => {
                                        button.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }, 100); // Small delay to ensure layout is stable
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        });

        observer.observe(contentRef.current, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [activeTab]);

    return (
        <div className="flex flex-col h-full text-white">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    {title}
                </h2>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.id
                            ? "border-blue-500 text-blue-400 bg-blue-500/5"
                            : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div ref={contentRef} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {activeTab === "description" && (
                        <div className="prose prose-invert max-w-none">
                            {description}
                        </div>
                    )}

                    {activeTab === "cases" && (
                        <div className="prose prose-invert max-w-none">
                            {realWorldCases}
                        </div>
                    )}

                    {activeTab === "protection" && protection && (
                        <div className="prose prose-invert max-w-none">
                            {protection}
                        </div>
                    )}

                    {activeTab === "try" && (
                        <div className="w-full">
                            {tryYourself}
                        </div>
                    )}

                    {activeTab === "quiz" && (
                        <div className="w-full">
                            {quiz}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
