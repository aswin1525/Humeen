"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LoginWarpEffect({ active }: { active: boolean }) {
    const count = 1000;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = Math.random() * 100 + 20;
            const speed = 0.01 + Math.random() / 200;

            // Create a tunnel effect by ensuring particles aren't in the dead center
            const radius = 5 + Math.random() * 50; // Minimum radius of 5
            const theta = Math.random() * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const y = Math.sin(theta) * radius;

            const z = Math.random() * 100 - 50;
            temp.push({ t, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            const { speed, x, y } = particle;

            // Accelerate if active (Warp Speed)
            const currentSpeed = active ? speed * 50 : speed;

            particle.z += currentSpeed;

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
                color="#ffffff"
                transparent
                opacity={active ? 1 : 0.4}
                depthTest={!active}
                toneMapped={false} // Ensure it's bright/glowing
            />
        </instancedMesh>
    );
}
