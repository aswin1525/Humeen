"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
// Mission 1 removed
import Mission2ThemeToggle from "./frontend/Mission2ThemeToggle";
import Mission3ButtonCustomizer from "./frontend/Mission3ButtonCustomizer";
import Mission4ModalInteraction from "./frontend/Mission4ModalInteraction";
// Mission 1 removed
// Mission 5 removed
import Mission6CodeSnippet from "./frontend/Mission6CodeSnippet";
import Mission7ColorPalette from "./frontend/Mission7ColorPalette";

import MissionBackend1Hello from "./backend/MissionBackend1Hello";
import MissionBackend2CreateRecord from "./backend/MissionBackend2CreateRecord";
import MissionBackend3UpdateProgress from "./backend/MissionBackend3UpdateProgress";
import MissionBackend4JsonRepair from "./backend/MissionBackend4JsonRepair";
import MissionBackend5ListMissions from "./backend/MissionBackend5ListMissions";
import MissionSecurity1Vulnerability from "./security/MissionSecurity1Vulnerability";
import MissionSecurity2FixInput from "./security/MissionSecurity2FixInput";
import MissionSecurity3PasswordStrength from "./security/MissionSecurity3PasswordStrength";
import MissionSecurity4FakeLogin from "./security/MissionSecurity4FakeLogin";
import MissionSecurity5AttackDemo from "./security/MissionSecurity5AttackDemo";
import MissionData1Stats from "./data/MissionData1Stats";
import MissionData2Compare from "./data/MissionData2Compare";
import MissionData3Constellation from "./data/MissionData3Constellation";
import MissionData4FilterLogs from "./data/MissionData4FilterLogs";
import MissionData5Predict from "./data/MissionData5Predict";

interface MissionWorkspaceProps {
    mission: any;
    onClose: () => void;
    onComplete: () => void;
}

export default function MissionWorkspace({ mission, onClose, onComplete }: MissionWorkspaceProps) {
    const [isCompleting, setIsCompleting] = useState(false);
    const { user, updateStats } = useAuth();

    const handleComplete = async () => {
        setIsCompleting(true);
        try {
            // Simulate backend call or use real endpoint if available
            // For now, we update stats directly via AuthContext
            if (user && user.stats) {
                const newStats: any = {
                    missionsCompleted: user.stats.missionsCompleted + 1,
                    energyEarned: user.stats.energyEarned + 100,
                };

                // Update specific planet activity
                if (mission.type.startsWith("MISSION_DATA")) {
                    newStats.activityData = Math.min((user.stats.activityData || 0) + 20, 100);
                } else if (mission.type.startsWith("MISSION_SECURITY")) {
                    newStats.activitySecurity = Math.min((user.stats.activitySecurity || 0) + 20, 100);
                } else if (mission.type.startsWith("MISSION_BACKEND")) {
                    newStats.activityBackend = Math.min((user.stats.activityBackend || 0) + 20, 100);
                } else {
                    newStats.activityFrontend = Math.min((user.stats.activityFrontend || 0) + 20, 100);
                }

                await updateStats(newStats);
            }

            onComplete();
        } catch (error) {
            console.error("Failed to complete mission", error);
        } finally {
            setIsCompleting(false);
        }
    };

    const renderMissionContent = () => {
        switch (mission.type) {
            // Frontend
            // Mission 1 removed
            case "MISSION_2": return <Mission2ThemeToggle onComplete={handleComplete} />;
            case "MISSION_3": return <Mission3ButtonCustomizer onComplete={handleComplete} />;
            case "MISSION_4": return <Mission4ModalInteraction onComplete={handleComplete} />;
            // Mission 5 removed
            case "MISSION_6": return <Mission6CodeSnippet onComplete={handleComplete} />;
            case "MISSION_7": return <Mission7ColorPalette onComplete={handleComplete} />;

            // Backend
            case "MISSION_BACKEND_1": return <MissionBackend1Hello onComplete={handleComplete} />;
            case "MISSION_BACKEND_2": return <MissionBackend2CreateRecord onComplete={handleComplete} />;
            case "MISSION_BACKEND_3": return <MissionBackend3UpdateProgress onComplete={handleComplete} />;
            case "MISSION_BACKEND_4": return <MissionBackend4JsonRepair onComplete={handleComplete} />;
            case "MISSION_BACKEND_5": return <MissionBackend5ListMissions onComplete={handleComplete} />;

            // Security
            case "MISSION_SECURITY_1": return <MissionSecurity1Vulnerability onComplete={handleComplete} />;
            case "MISSION_SECURITY_2": return <MissionSecurity2FixInput onComplete={handleComplete} />;
            case "MISSION_SECURITY_3": return <MissionSecurity3PasswordStrength onComplete={handleComplete} />;
            case "MISSION_SECURITY_4": return <MissionSecurity4FakeLogin onComplete={handleComplete} />;
            case "MISSION_SECURITY_5": return <MissionSecurity5AttackDemo onComplete={handleComplete} />;

            // Data
            case "MISSION_DATA_1": return <MissionData1Stats onComplete={handleComplete} />;
            case "MISSION_DATA_2": return <MissionData2Compare onComplete={handleComplete} />;
            case "MISSION_DATA_3": return <MissionData3Constellation onComplete={handleComplete} />;
            case "MISSION_DATA_4": return <MissionData4FilterLogs onComplete={handleComplete} />;
            case "MISSION_DATA_5": return <MissionData5Predict onComplete={handleComplete} />;

            default:
                return <div className="text-center p-8">Mission content not found for type: {mission.type}</div>;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/50">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{mission.title}</h2>
                        <p className="text-gray-400 text-sm">{mission.description}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Workspace Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-black/20">
                    {renderMissionContent()}
                </div>
            </div>
        </div>
    );
}
