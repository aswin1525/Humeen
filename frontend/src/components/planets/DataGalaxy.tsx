"use client";

import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

export default function DataGalaxy() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            {/* Main Analytics Chart */}
            <div className="lg:col-span-2 bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" /> Engagement
                    </h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Daily</span>
                        <span className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">Weekly</span>
                    </div>
                </div>

                <div className="h-64 flex items-end justify-between gap-4 px-4">
                    {[40, 65, 30, 85, 50, 75, 60].map((height, i) => (
                        <div key={i} className="w-full bg-zinc-800 rounded-t-lg relative group overflow-hidden">
                            <div
                                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-600 to-pink-500 transition-all duration-1000 ease-out group-hover:opacity-80"
                                style={{ height: `${height}%` }}
                            ></div>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                {height}%
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-zinc-500 text-sm px-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-pink-500/30 flex items-center gap-6">
                <div className="p-4 bg-pink-500/20 rounded-full">
                    <Users className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-white">1,240</div>
                    <div className="text-pink-300/60 text-sm">Active Interns</div>
                </div>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 flex items-center gap-6">
                <div className="p-4 bg-blue-500/20 rounded-full">
                    <PieChart className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-white">85%</div>
                    <div className="text-blue-300/60 text-sm">Mission Completion Rate</div>
                </div>
            </div>
        </div>
    );
}
