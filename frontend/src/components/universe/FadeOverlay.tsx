"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function FadeOverlay({ active }: { active: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshBasicMaterial;
            if (active) {
                // Fade in to black (opacity -> 1)
                material.opacity = THREE.MathUtils.lerp(material.opacity, 1, delta * 2);
            } else {
                // Fade out (opacity -> 0)
                material.opacity = THREE.MathUtils.lerp(material.opacity, 0, delta * 2);
            }

            // Lock to camera view
            if (active || material.opacity > 0.01) {
                state.camera.updateMatrixWorld();
                // Position 5 units in front of camera
                const vector = new THREE.Vector3(0, 0, -5);
                vector.applyMatrix4(state.camera.matrixWorld);
                meshRef.current.position.copy(vector);
                meshRef.current.quaternion.copy(state.camera.quaternion);
            }
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 12]} renderOrder={10}> {/* Initial position, updated by frame */}
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="black" transparent opacity={0} depthTest={false} />
        </mesh>
    );
}
