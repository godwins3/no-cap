"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

// Extend so R3F knows about line_ (avoids SVG <line> conflict)
class Line2 extends THREE.Line {}
extend({ Line2 });

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const arcsRef = useRef<THREE.Group>(null);

  // Generate globe dots
  const { dotPositions, dotColors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 2;

    const green = new THREE.Color("#F97316");
    const cyan = new THREE.Color("#EA580C");
    const dim = new THREE.Color("#1a1a2e");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random coverage highlights
      const isHighlighted = Math.random() > 0.7;
      const color = isHighlighted
        ? Math.random() > 0.5
          ? green
          : cyan
        : dim;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { dotPositions: positions, dotColors: colors };
  }, []);

  // Generate arc curves between random points
  const arcs = useMemo(() => {
    const arcData: { curve: THREE.CatmullRomCurve3; color: string }[] = [];
    const radius = 2;

    for (let i = 0; i < 12; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const start = new THREE.Vector3(
        radius * Math.sin(phi1) * Math.cos(theta1),
        radius * Math.sin(phi1) * Math.sin(theta1),
        radius * Math.cos(phi1)
      );

      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.acos(2 * Math.random() - 1);
      const end = new THREE.Vector3(
        radius * Math.sin(phi2) * Math.cos(theta2),
        radius * Math.sin(phi2) * Math.sin(theta2),
        radius * Math.cos(phi2)
      );

      // Mid point elevated above globe surface
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.5);

      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      arcData.push({
        curve,
        color: Math.random() > 0.5 ? "#F97316" : "#EA580C",
      });
    }

    return arcData;
  }, []);

  useFrame(({ clock }) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;

    // Pulse arcs
    if (arcsRef.current) {
      arcsRef.current.children.forEach((child: THREE.Object3D, i: number) => {
        const line = child as THREE.Line;
        if (line.material && "opacity" in line.material) {
          (line.material as THREE.LineBasicMaterial).opacity =
            0.3 + Math.sin(clock.getElapsedTime() * 2 + i) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe wireframe */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial
          color="#1a1a2e"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Globe surface dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[dotColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection arcs */}
      <group ref={arcsRef}>
        {arcs.map((arc, i) => {
          const points = arc.curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: arc.color,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
          });
          const line = new THREE.Line(geometry, material);
          return <primitive key={i} object={line} />;
        })}
      </group>

      {/* Glow ring at equator */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.005, 16, 100]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Floating data packets around globe
function DataPackets() {
  const ref = useRef<THREE.Points>(null);
  const count = 50;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2.5 + Math.random() * 1.5;
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = r * Math.sin(theta);

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posArray = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset if too far
      const dist = Math.sqrt(
        posArray[i * 3] ** 2 + posArray[i * 3 + 1] ** 2 + posArray[i * 3 + 2] ** 2
      );
      if (dist > 5) {
        const theta = Math.random() * Math.PI * 2;
        const r = 2.5;
        posArray[i * 3] = r * Math.cos(theta);
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 2;
        posArray[i * 3 + 2] = r * Math.sin(theta);
      }
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
        size={0.04}
        color="#F97316"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function GlobeScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Globe />
        <DataPackets />
      </Canvas>
    </div>
  );
}
