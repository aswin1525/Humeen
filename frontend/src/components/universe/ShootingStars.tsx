"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ShootingStars({ count = 3 }: { count?: number }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const speed = 0.5 + Math.random() * 0.5; // Moderate speed
            // Start further out to the right
            const x = 50 + Math.random() * 100;
            const y = (Math.random() - 0.5) * 60; // Spread vertically
            // Deep background but visible through fog
            const z = -10 - Math.random() * 20; // -10 to -30
            const len = 15 + Math.random() * 15; // Long trails
            temp.push({ speed, x, y, z, len });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            // Move particle left
            particle.x -= particle.speed * 2;

            // Check bounds (moving left)
            if (particle.x < -100) {
                // Reset to right side
                particle.x = 100 + Math.random() * 50;
                particle.y = (Math.random() - 0.5) * 60;
                particle.z = -10 - Math.random() * 20;
                // Randomize speed slightly on respawn
                particle.speed = 0.5 + Math.random() * 0.5;
            }

            dummy.position.set(particle.x, particle.y, particle.z);

            // Rotate to be horizontal
            dummy.rotation.z = Math.PI / 1;
            dummy.rotation.y = 0;

            // Scale X for trail
            dummy.scale.set(particle.len, 0.2, 0.2);

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} renderOrder={-1}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
}
