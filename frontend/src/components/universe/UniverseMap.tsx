"use client";

import NoSSR from "@/components/NoSSR";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Float, Sparkles } from "@react-three/drei";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Planet({ position, color, name, route, size = 1, texturePath }: { position: [number, number, number], color: string, name: string, route: string, size?: number, texturePath: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const router = useRouter();

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
                    onClick={() => router.push(route)}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
                    scale={hovered ? 1.2 : 1}
                >
                    <sphereGeometry args={[size, 64, 64]} />
                    <meshStandardMaterial
                        map={texture}
                        color="white"
                        emissive={color}
                        emissiveIntensity={hovered ? 2 : 0.5}
                        roughness={0.2}
                        metalness={0.4}
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
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshBasicMaterial color="#fbbf24" />
            <Sparkles count={100} scale={6} size={10} speed={0.2} opacity={0.5} color="#fbbf24" />
            <pointLight intensity={2} distance={100} decay={2} color="#fbbf24" />
        </mesh>
    );
}

export default function UniverseMap() {
    return (
        <div className="w-full h-screen bg-black relative">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
                    Humeen Digital Universe
                </h1>
                <p className="text-gray-400 text-sm mt-2">Select a planet to begin your internship</p>
            </div>

            <NoSSR>
                <Canvas camera={{ position: [0, 8, 16], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <Stars radius={300} depth={50} count={25000} factor={12} saturation={0} fade speed={0.5} />
                    <fog attach="fog" args={['#000', 15, 50]} />

                    {/* Central AI Sun (HumeenCore) */}
                    <Sun />

                    {/* Planets orbiting the sun */}
                    {/* Frontend Island - Blue/Cyan */}
                    <Planet position={[-6, 0, 4]} color="#06b6d4" name="Frontend Island" route="/planet/frontend" size={1.2} texturePath="/textures/frontend.png" />

                    {/* Backend Tower - Green/Emerald */}
                    <Planet position={[6, 0, -4]} color="#10b981" name="Backend Tower" route="/planet/backend" size={1.4} texturePath="/textures/backend.png" />

                    {/* Cyber Security - Red/Orange */}
                    <Planet position={[-6, 0, -4]} color="#ef4444" name="Cyber Planet" route="/planet/security" size={1.1} texturePath="/textures/security.png" />

                    {/* Data Galaxy - Purple/Pink */}
                    <Planet position={[6, 0, 4]} color="#d946ef" name="Data Galaxy" route="/planet/data" size={1.3} texturePath="/textures/data.png" />

                    <OrbitControls
                        enablePan={false}
                        minDistance={10}
                        maxDistance={30}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </NoSSR>
        </div>
    );
}
