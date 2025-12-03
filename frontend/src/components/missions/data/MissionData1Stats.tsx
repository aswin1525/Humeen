"use client";

import { CheckCircle, Activity, Clock, Zap } from "lucide-react";

export default function MissionData1Stats({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <div className="text-sm text-gray-400">Missions Completed</div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">2.5h</div>
                    <div className="text-sm text-gray-400">Time Spent</div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 text-yellow-400">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">450</div>
                    <div className="text-sm text-gray-400">Energy Earned</div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
                <CheckCircle className="w-5 h-5" /> Acknowledge Stats
            </button>
        </div>
    );
}
