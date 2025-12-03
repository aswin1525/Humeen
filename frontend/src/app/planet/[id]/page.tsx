import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MissionCard from "@/components/missions/MissionCard";
import FrontendIsland from "@/components/planets/FrontendIsland";
import BackendTower from "@/components/planets/BackendTower";
import CyberPlanet from "@/components/planets/CyberPlanet";
import DataGalaxy from "@/components/planets/DataGalaxy";

// Mock Data (Replace with API call later)
const PLANET_DATA: Record<string, { name: string; description: string; color: string }> = {
    frontend: {
        name: "Frontend Island",
        description: "Master the art of user interfaces and interactive experiences.",
        color: "from-blue-500 to-cyan-500",
    },
    backend: {
        name: "Backend Tower",
        description: "Build the robust engines that power the digital universe.",
        color: "from-green-500 to-emerald-500",
    },
    security: {
        name: "Cyber Planet",
        description: "Defend the universe from digital threats and vulnerabilities.",
        color: "from-red-500 to-orange-500",
    },
    data: {
        name: "Data Galaxy",
        description: "Uncover hidden patterns and predict the future with data.",
        color: "from-purple-500 to-pink-500",
    },
};

async function getMissions(planetId: string) {
    try {
        const res = await fetch(`http://localhost:8080/api/missions/planet/${planetId}`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        console.error("Failed to fetch missions", e);
        return [];
    }
}

export default async function PlanetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const planet = PLANET_DATA[id];
    const missions = await getMissions(id);

    if (!planet) {
        return <div className="p-12 text-center text-white">Planet not found</div>;
    }

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            {/* Hero Section */}
            <div className={`relative h-[40vh] bg-gradient-to-b ${planet.color} flex items-center justify-center`}>
                <div className="absolute top-4 left-4 z-20">
                    <Link href="/universe" className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Universe
                    </Link>
                </div>
                <div className="text-center z-10">
                    <h1 className="text-6xl font-bold mb-4">{planet.name}</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">{planet.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* Interactive Module */}
            {/* <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-20 mb-16">
                {id === "frontend" && <FrontendIsland />}
                {id === "backend" && <BackendTower />}
                {id === "security" && <CyberPlanet />}
                {id === "data" && <DataGalaxy />}
            </div> */}

            {/* Missions */}
            <div className="max-w-4xl mx-auto px-8">
                <h2 className="text-2xl font-bold mb-6">Active Missions</h2>
                <div className="space-y-4">
                    {missions.length > 0 ? (
                        missions.map((mission: any) => (
                            <MissionCard key={mission.id} mission={mission} />
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-8 bg-white/5 rounded-lg">
                            No missions available for this planet yet.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
