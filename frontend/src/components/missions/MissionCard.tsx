"use client";

import { CheckCircle, Circle, Play } from "lucide-react";
import { useState } from "react";
import MissionWorkspace from "./MissionWorkspace";

interface Mission {
    id: string;
    title: string;
    description: string;
    energyPoints: number;
    completed: boolean;
    type: string;
}

export default function MissionCard({ mission }: { mission: Mission }) {
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(mission.completed);

    const handleComplete = () => {
        setIsCompleted(true);
        setIsWorkspaceOpen(false);
        // Ideally trigger a refresh or global state update here
    };

    return (
        <>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                            {mission.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">{mission.description}</p>
                        <div className="mt-3 inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-purple-500/20 text-purple-300">
                            +{mission.energyPoints} XP
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        {isCompleted ? (
                            <div className="flex items-center gap-2 text-green-400">
                                <span className="text-sm font-bold">Done</span>
                                <CheckCircle className="w-6 h-6" />
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsWorkspaceOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors"
                            >
                                <Play className="w-4 h-4" /> Start
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isWorkspaceOpen && (
                <MissionWorkspace
                    mission={mission}
                    onClose={() => setIsWorkspaceOpen(false)}
                    onComplete={handleComplete}
                />
            )}
        </>
    );
}
