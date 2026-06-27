"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  speed,
  color,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "tetrahedron";
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.5;
    ref.current.rotation.y = t * speed * 0.3;
    ref.current.rotation.z = t * speed * 0.2;
    ref.current.position.y = initialY + Math.sin(t * speed) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.4, 0]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[0.35, 0]} />}
      {geometry === "tetrahedron" && <tetrahedronGeometry args={[0.35, 0]} />}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function GridParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posArray = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(t + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7C3AED"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const shapes: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "tetrahedron";
  speed: number;
  color: string;
}[] = [
  { position: [-4, 1.5, -2], geometry: "icosahedron", speed: 0.4, color: "#00FF88" },
  { position: [4.5, -1, -1], geometry: "octahedron", speed: 0.3, color: "#7C3AED" },
  { position: [-3, -1.5, -3], geometry: "tetrahedron", speed: 0.5, color: "#06B6D4" },
  { position: [3.5, 2, -2], geometry: "tetrahedron", speed: 0.35, color: "#00FF88" },
  { position: [-5, 0, -1.5], geometry: "octahedron", speed: 0.45, color: "#7C3AED" },
  { position: [5, 0.5, -2.5], geometry: "icosahedron", speed: 0.25, color: "#06B6D4" },
];

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        {shapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
        <GridParticles />
      </Canvas>
    </div>
  );
}
