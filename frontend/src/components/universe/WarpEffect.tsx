"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WarpEffect({ active, color = "#00ffff" }: { active: boolean; color?: string }) {
    const count = 1000;
    const mesh = useRef<THREE.InstancedMesh>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = Math.random() * 100 + 20;
            const speed = 0.01 + Math.random() / 200;
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            const z = Math.random() * 100 - 50;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            // Basic movement
            let { t, factor, speed, x, y, z } = particle;

            // Accelerate if active (Warp Speed)
            const currentSpeed = active ? speed * 50 : speed;

            // Move particles towards camera (assuming camera is at z>0 and looks at 0,0,0, wait, camera is at 0,0,0 usually for these effects?)
            // Actually UniverseMap camera is at [0, 8, 16].
            // Let's make stars fly PAST the camera (-Z direction).

            particle.z += currentSpeed; // Move towards +Z (camera) if starting from negative, or vice versa.
            // Let's just create a field that moves

            // Update t for "respawn" logic
            t -= currentSpeed;
            if (active) t -= 0.5; // Extra speed

            // Respawn logic
            if (particle.z > 50) particle.z = -100;

            dummy.position.set(x, y, particle.z);

            // Scale Z for warp streak effect
            if (active) {
                dummy.scale.set(1, 1, 10 + Math.random() * 20);
            } else {
                dummy.scale.set(1, 1, 1);
            }

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} renderOrder={active ? 20 : 0}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
                color={active ? color : "white"}
                transparent
                opacity={active ? 1 : 0.4}
                depthTest={!active}
            />
        </instancedMesh>
    );
}
