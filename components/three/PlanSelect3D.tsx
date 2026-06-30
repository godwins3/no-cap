"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/lib/game-store";

function PlanIcon({
  type,
  isActive,
  color,
  position,
  onClick,
}: {
  type: "bolt" | "flame" | "crown";
  isActive: boolean;
  color: string;
  position: [number, number, number];
  onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    // Float animation
    ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;

    // Rotation
    if (isActive) {
      ref.current.rotation.y = t * 0.8;
    } else {
      ref.current.rotation.y += 0.005;
    }

    // Scale pulse when active
    const targetScale = isActive ? 1.3 : hovered ? 1.1 : 0.9;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main shape */}
      {type === "bolt" && (
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe={!isActive}
            transparent
            opacity={isActive ? 0.9 : 0.5}
          />
        </mesh>
      )}
      {type === "flame" && (
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe={!isActive}
            transparent
            opacity={isActive ? 0.9 : 0.5}
          />
        </mesh>
      )}
      {type === "crown" && (
        <mesh>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe={!isActive}
            transparent
            opacity={isActive ? 0.9 : 0.5}
          />
        </mesh>
      )}

      {/* Glow ring when active */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.02, 16, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Orbiting particles when active */}
      {isActive && <OrbitParticles color={color} />}
    </group>
  );
}

function OrbitParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 30;

  const positions = useRef(
    (() => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const r = 0.8 + Math.random() * 0.2;
        pos[i * 3] = Math.cos(angle) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        pos[i * 3 + 2] = Math.sin(angle) * r;
      }
      return pos;
    })()
  ).current;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Stats bars rendered in 3D
function StatsDisplay({
  stats,
  color,
  position,
}: {
  stats: { label: string; value: number }[];
  color: string;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={ref} position={position}>
      {stats.map((stat, i) => (
        <group key={stat.label} position={[0, -i * 0.25, 0]}>
          {/* Bar background */}
          <mesh position={[0.3, 0, -0.01]}>
            <planeGeometry args={[1, 0.12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
          {/* Bar fill */}
          <mesh position={[-0.5 + (stat.value / 100) * 0.5 + 0.3, 0, 0]}>
            <planeGeometry args={[(stat.value / 100) * 1, 0.12]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

type PlanType = "bolt" | "flame" | "crown";

export default function PlanSelect3D({
  activePlan,
  onSelectPlan,
}: {
  activePlan: number;
  onSelectPlan: (index: number) => void;
}) {
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  const plans: { type: PlanType; color: string; position: [number, number, number]; stats: { label: string; value: number }[] }[] = [
    {
      type: "bolt",
      color: "#EA580C",
      position: [-2.5, 0, 0],
      stats: [
        { label: "Speed", value: 30 },
        { label: "Flex", value: 40 },
        { label: "Clout", value: 20 },
      ],
    },
    {
      type: "flame",
      color: "#F97316",
      position: [0, 0, 0],
      stats: [
        { label: "Speed", value: 70 },
        { label: "Flex", value: 75 },
        { label: "Clout", value: 60 },
      ],
    },
    {
      type: "crown",
      color: "#000000",
      position: [2.5, 0, 0],
      stats: [
        { label: "Speed", value: 100 },
        { label: "Flex", value: 100 },
        { label: "Clout", value: 100 },
      ],
    },
  ];

  const handleSelect = (index: number) => {
    onSelectPlan(index);
    if (index === 2) unlockAchievement("rebel_curious");
  };

  return (
    <div className="w-full h-[300px] md:h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        {plans.map((plan, i) => (
          <group key={plan.type}>
            <PlanIcon
              type={plan.type}
              isActive={activePlan === i}
              color={plan.color}
              position={plan.position}
              onClick={() => handleSelect(i)}
            />
            {activePlan === i && (
              <StatsDisplay
                stats={plan.stats}
                color={plan.color}
                position={[plan.position[0], -1.2, 0]}
              />
            )}
          </group>
        ))}
      </Canvas>
    </div>
  );
}
