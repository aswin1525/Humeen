import Link from "next/link";
import { ArrowLeft, Activity, Shield, Code, Database } from "lucide-react";

export default function DashboardPage() {
    return (
        <main className="min-h-screen p-8 bg-black text-white">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Mission Control Dashboard</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-xl bg-blue-900/20 border border-blue-500/30">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                                <Code className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Frontend Skills</h3>
                        </div>
                        <div className="text-3xl font-bold">45%</div>
                        <div className="text-sm text-gray-400">Level 3 unlocked</div>
                    </div>

                    <div className="p-6 rounded-xl bg-green-900/20 border border-green-500/30">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/20 rounded-lg">
                                <Database className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Backend Mastery</h3>
                        </div>
                        <div className="text-3xl font-bold">20%</div>
                        <div className="text-sm text-gray-400">Level 1 unlocked</div>
                    </div>

                    <div className="p-6 rounded-xl bg-red-900/20 border border-red-500/30">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-500/20 rounded-lg">
                                <Shield className="w-6 h-6 text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Security Shield</h3>
                        </div>
                        <div className="text-3xl font-bold">10%</div>
                        <div className="text-sm text-gray-400">Threats detected: 0</div>
                    </div>

                    <div className="p-6 rounded-xl bg-purple-900/20 border border-purple-500/30">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Activity className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Total Energy</h3>
                        </div>
                        <div className="text-3xl font-bold">750 XP</div>
                        <div className="text-sm text-gray-400">Rank: Cadet</div>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-semibold mb-4">Recent Missions</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div>
                                        <div className="font-medium">Completed "Intro to React"</div>
                                        <div className="text-sm text-gray-400">Frontend Island • 2 hours ago</div>
                                    </div>
                                </div>
                                <div className="text-green-400 font-mono">+50 XP</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
