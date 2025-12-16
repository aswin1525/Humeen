"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import LoginWarpEffect from "./universe/LoginWarpEffect";
import { useEffect, useState } from "react";

export default function LoginTransition({ show }: { show: boolean }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in duration-700">
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
                    <color attach="background" args={["#000000"]} />

                    {/* Environment matching UniverseMap */}
                    <Stars radius={300} depth={50} count={25000} factor={12} saturation={0} fade speed={0.5} />

                    <LoginWarpEffect active={true} />
                </Canvas>
            </div>
        </div>
    );
}
