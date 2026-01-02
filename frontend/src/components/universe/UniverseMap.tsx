"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Float, Sparkles, Loader } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Zap, LogOut } from "lucide-react";
import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { TextureLoader } from "three";
import NoSSR from "@/components/NoSSR";

import WarpEffect from "./WarpEffect";
import FadeOverlay from "./FadeOverlay";

import Link from "next/link";
import ShootingStars from "./ShootingStars";

function Planet({ position, color, name, onNavigate, onHover, size = 1, texturePath }: { position: [number, number, number], color: string, name: string, onNavigate: () => void, onHover?: () => void, size?: number, texturePath: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Load texture
    const texture = useLoader(TextureLoader, texturePath);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <mesh
                    ref={meshRef}
                    onClick={onNavigate}
                    onPointerOver={() => {
                        document.body.style.cursor = 'pointer';
                        setHover(true);
                        onHover?.();
                    }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
                    scale={hovered ? 1.2 : 1}
                >
                    <sphereGeometry args={[size, 64, 64]} />
                    <meshStandardMaterial
                        map={texture}
                        color="white"
                        emissive="white"
                        emissiveMap={texture}
                        emissiveIntensity={hovered ? 3.0 : 2.0}
                        roughness={0.5}
                        metalness={0.2}
                        toneMapped={false}
                    />
                    {hovered && (
                        <Sparkles count={20} scale={size * 2.5} size={4} speed={0.4} opacity={1} color={color} />
                    )}
                </mesh>

                {/* Orbit Ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[size * 1.4, size * 1.45, 64]} />
                    <meshBasicMaterial color={color} opacity={0.3} transparent side={THREE.DoubleSide} />
                </mesh>

                <Text
                    position={[0, size + 0.8, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor={color}
                >
                    {name}
                </Text>
            </group>
        </Float>
    );
}

function Sun() {
    const sunTexture = useLoader(TextureLoader, '/textures/sun_texture.png');

    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 128, 128]} />
            <meshStandardMaterial
                map={sunTexture}
                emissiveMap={sunTexture}
                emissiveIntensity={1.2}
                emissive="white"
                color="white"
                displacementMap={sunTexture}
                displacementScale={0.05}
            />
            <Sparkles count={100} scale={6} size={10} speed={0.2} opacity={0.5} color="#fbbf24" />
            <pointLight intensity={1.0} distance={100} decay={2} color="#cb9e2dff" />
        </mesh>
    );
}

export default function UniverseMap() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isWarping, setIsWarping] = useState(false);
    const [warpColor, setWarpColor] = useState("#00ffff");

    const handleNavigate = (route: string, color: string) => {
        setWarpColor(color);
        setIsWarping(true);
        // Optional: Play a sound effect here
        setTimeout(() => {
            router.push(route);
        }, 1500); // 1.5s warp duration
    };

    return (
        <div className="w-full h-screen bg-black relative" suppressHydrationWarning>
            {/* HTML Overlay Removed - using 3D FadeOverlay instead */}

            {/* Dashboard Header */}
            <div className={`absolute top-0 left-0 w-full z-10 p-4 md:p-6 flex justify-between items-start pointer-events-none transition-opacity duration-500 ${isWarping ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-black/40 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 pointer-events-auto shadow-lg shadow-purple-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center font-bold text-white text-lg">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="text-white font-bold">{user?.username}</div>
                            <div className="text-xs text-purple-400">Level {Math.floor((user?.stats?.missionsCompleted || 0) / 5) + 1} Explorer</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                    <div className="flex gap-4 md:gap-6 text-sm w-full md:w-auto justify-between md:justify-start">
                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xs uppercase tracking-wider">Missions</span>
                            <span className="text-white font-bold">{user?.stats?.missionsCompleted || 0}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xs uppercase tracking-wider">Energy</span>
                            <span className="text-yellow-400 font-bold flex items-center gap-1">
                                <Zap className="w-3 h-3" /> {user?.stats?.energyEarned || 0}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors pointer-events-auto"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            <div className={`absolute top-32 md:top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none transition-opacity duration-500 w-full px-4 ${isWarping ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
                    Humeen Digital Universe
                </h1>
                <p className="text-gray-400 text-sm mt-2">Select a planet to begin your internship</p>
            </div>

            <NoSSR>
                <Canvas camera={{ position: [0, 8, 16], fov: 45 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.8} />
                        <Stars radius={300} depth={50} count={25000} factor={12} saturation={0} fade speed={0.5} />
                        <ShootingStars />
                        <fog attach="fog" args={['#000', 15, 50]} />

                        {/* Central AI Sun (HumeenCore) */}
                        <Sun />

                        {/* Warp Effect Component */}
                        <WarpEffect active={isWarping} color={warpColor} />

                        {/* 3D Fade Overlay - Hides planets but keeps warp effect (if positioned right) */}
                        {/* We need FadeOverlay to be BEHIND WarpEffect particles but IN FRONT of planets? */}
                        {/* Actually, WarpEffect particles move past camera. FadeOverlay is at z=12. Camera is at z=16. Planets at z~0. */}
                        {/* So FadeOverlay covers planets. WarpEffect particles move from z=-100 to +50. */}
                        {/* Particles > z=12 will be visible. Particles < z=12 will be obscured if FadeOverlay is opaque. */}
                        {/* To fix "dont fade the particle", we can make FadeOverlay render order earlier or use transparency tricks, OR */}
                        {/* Put WarpEffect to always render ON TOP? */}
                        {/* Let's try placing FadeOverlay and seeing. */}
                        <FadeOverlay active={isWarping} />

                        {/* Planets orbiting the sun */}
                        {/* Frontend Island - Blue/Cyan */}
                        <Planet position={[-6, 0, 4]} color="#06b6d4" name="Frontend Island" onNavigate={() => handleNavigate("/planet/frontend", "#06b6d4")} onHover={() => router.prefetch("/planet/frontend")} size={1.2} texturePath="/textures/frontend.png" />

                        {/* Backend Tower - Green/Emerald */}
                        <Planet position={[6, 0, -4]} color="#10b981" name="Backend Tower" onNavigate={() => handleNavigate("/planet/backend", "#10b981")} onHover={() => router.prefetch("/planet/backend")} size={1.4} texturePath="/textures/backend.png" />

                        {/* Cyber Security - Red/Orange */}
                        <Planet position={[-6, 0, -4]} color="#ef4444" name="Cyber Planet" onNavigate={() => handleNavigate("/planet/security", "#ef4444")} onHover={() => router.prefetch("/planet/security")} size={1.1} texturePath="/textures/security.png" />

                        {/* Data Galaxy - Purple/Pink */}
                        <Planet position={[6, 0, 4]} color="#d946ef" name="Data Galaxy" onNavigate={() => handleNavigate("/planet/data", "#d946ef")} onHover={() => router.prefetch("/planet/data")} size={1.3} texturePath="/textures/data.png" />

                        <OrbitControls
                            enablePan={false}
                            minDistance={10}
                            maxDistance={30}
                            autoRotate={!isWarping}
                            autoRotateSpeed={0.5}
                        />
                    </Suspense>
                </Canvas>                <Loader />
            </NoSSR>
        </div>
    );
}
