"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Matatu (minibus) shape built from primitives
function Matatu({
  curve,
  offset,
  speed,
  color,
  direction,
}: {
  curve: THREE.CatmullRomCurve3;
  offset: number;
  speed: number;
  color: string;
  direction: 1 | -1;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = ((clock.getElapsedTime() * speed + offset) % 1);
    const actualT = direction === 1 ? t : 1 - t;
    const pos = curve.getPoint(actualT);
    const nextT = Math.min(actualT + 0.01, 1);
    const nextPos = curve.getPoint(nextT);

    groupRef.current.position.copy(pos);

    // Face direction of travel
    const dir = new THREE.Vector3().subVectors(nextPos, pos).normalize();
    const angle = Math.atan2(dir.x, dir.y);
    groupRef.current.rotation.z = -angle;
  });

  return (
    <group ref={groupRef}>
      {/* Body - elongated box */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.12, 0.28, 0.1]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.1, 0.24, 0.02]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.9} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.12, 0.08]}>
        <boxGeometry args={[0.09, 0.02, 0.06]} />
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.6} />
      </mesh>
      {/* Rear window */}
      <mesh position={[0, -0.12, 0.08]}>
        <boxGeometry args={[0.09, 0.02, 0.05]} />
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.5} />
      </mesh>
      {/* Wheels (4 small cylinders) */}
      {[
        [-0.07, 0.08, 0.01],
        [0.07, 0.08, 0.01],
        [-0.07, -0.08, 0.01],
        [0.07, -0.08, 0.01],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
          <meshBasicMaterial color="#333" />
        </mesh>
      ))}
      {/* Headlights glow */}
      <pointLight position={[0, 0.15, 0.05]} color={color} intensity={0.3} distance={0.5} />
      {/* Kenyan flag stripe on side */}
      <mesh position={[0.061, 0, 0.06]}>
        <planeGeometry args={[0.01, 0.22]} />
        <meshBasicMaterial color="#006600" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.061, 0, 0.04]}>
        <planeGeometry args={[0.01, 0.22]} />
        <meshBasicMaterial color="#BB0000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Road({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const roadGeometry = useMemo(() => {
    const points = curve.getPoints(200);
    const roadWidth = 0.35;
    const vertices: number[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const next = points[i + 1];
      const dir = new THREE.Vector3().subVectors(next, p).normalize();
      const right = new THREE.Vector3(-dir.y, dir.x, 0).normalize().multiplyScalar(roadWidth / 2);

      const p2 = points[i + 1];
      const next2 = i + 2 < points.length ? points[i + 2] : next;
      const dir2 = new THREE.Vector3().subVectors(next2, p2).normalize();
      const right2 = new THREE.Vector3(-dir2.y, dir2.x, 0).normalize().multiplyScalar(roadWidth / 2);

      vertices.push(
        p.x - right.x, p.y - right.y, 0,
        p.x + right.x, p.y + right.y, 0,
        p2.x - right2.x, p2.y - right2.y, 0,
        p.x + right.x, p.y + right.y, 0,
        p2.x + right2.x, p2.y + right2.y, 0,
        p2.x - right2.x, p2.y - right2.y, 0,
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, [curve]);

  // Kenyan flag center stripes
  const stripeGeometries = useMemo(() => {
    const points = curve.getPoints(200);
    const stripeColors = ["#000000", "#BB0000", "#006600"];
    const stripeOffsets = [-0.1, 0, 0.1];
    const stripeWidth = 0.035;

    return stripeOffsets.map((offset) => {
      const verts: number[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        const p = points[i];
        const next = points[i + 1];
        const dir = new THREE.Vector3().subVectors(next, p).normalize();
        const right = new THREE.Vector3(-dir.y, dir.x, 0).normalize();

        const center = new THREE.Vector3(
          p.x + right.x * offset,
          p.y + right.y * offset,
          0.001
        );
        const halfW = stripeWidth / 2;

        const p2 = points[i + 1];
        const next2 = i + 2 < points.length ? points[i + 2] : next;
        const dir2 = new THREE.Vector3().subVectors(next2, p2).normalize();
        const right2 = new THREE.Vector3(-dir2.y, dir2.x, 0).normalize();
        const center2 = new THREE.Vector3(
          p2.x + right2.x * offset,
          p2.y + right2.y * offset,
          0.001
        );

        verts.push(
          center.x - right.x * halfW, center.y - right.y * halfW, 0.001,
          center.x + right.x * halfW, center.y + right.y * halfW, 0.001,
          center2.x - right2.x * halfW, center2.y - right2.y * halfW, 0.001,
          center.x + right.x * halfW, center.y + right.y * halfW, 0.001,
          center2.x + right2.x * halfW, center2.y + right2.y * halfW, 0.001,
          center2.x - right2.x * halfW, center2.y - right2.y * halfW, 0.001,
        );
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
      return geo;
    });
  }, [curve]);

  const stripeColors = ["#000000", "#BB0000", "#006600"];

  return (
    <>
      {/* Road surface */}
      <mesh geometry={roadGeometry}>
        <meshBasicMaterial color="#1c1c1c" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* Road edge glow */}
      <mesh geometry={roadGeometry}>
        <meshBasicMaterial color="#00FF88" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      {/* Flag stripes */}
      {stripeGeometries.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial color={stripeColors[i]} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

// Camera follows scroll
function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Smooth interpolation
    scrollRef.current += (targetRef.current - scrollRef.current) * 0.05;

    // Move camera along Y based on scroll (road goes from top to bottom)
    const totalHeight = 30;
    const y = 6 - scrollRef.current * totalHeight;
    camera.position.y = y;
  });

  return null;
}

export default function FullPageHighway() {
  // Road curve that winds across the full page height
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, 8, 0),       // Start top-right (hero area)
      new THREE.Vector3(1.5, 6, 0),
      new THREE.Vector3(-2, 4, 0),      // Winds left (problem section)
      new THREE.Vector3(-1.5, 2, 0),
      new THREE.Vector3(2.5, 0, 0),     // Winds right (stats)
      new THREE.Vector3(2, -2, 0),
      new THREE.Vector3(-2, -4, 0),     // Winds left (plans)
      new THREE.Vector3(-1, -6, 0),
      new THREE.Vector3(2, -8, 0),      // Winds right (coverage)
      new THREE.Vector3(1.5, -10, 0),
      new THREE.Vector3(-1.5, -12, 0),  // Winds left (community)
      new THREE.Vector3(-1, -14, 0),
      new THREE.Vector3(1, -16, 0),     // Winds to center
      new THREE.Vector3(0, -18, 0),     // Ends center (CTA)
      new THREE.Vector3(-0.5, -20, 0),
      new THREE.Vector3(0, -22, 0),     // Footer
    ]);
  }, []);

  // Matatu fleet config
  const matatus = useMemo(() => [
    { offset: 0.0, speed: 0.03, color: "#00FF88", direction: 1 as const },
    { offset: 0.15, speed: 0.025, color: "#FFB800", direction: 1 as const },
    { offset: 0.3, speed: 0.035, color: "#06B6D4", direction: -1 as const },
    { offset: 0.45, speed: 0.028, color: "#FF4444", direction: 1 as const },
    { offset: 0.6, speed: 0.032, color: "#7C3AED", direction: -1 as const },
    { offset: 0.75, speed: 0.027, color: "#00FF88", direction: 1 as const },
    { offset: 0.88, speed: 0.03, color: "#FFB800", direction: -1 as const },
    { offset: 0.12, speed: 0.022, color: "#06B6D4", direction: 1 as const },
  ], []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 6, 8], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ScrollCamera />
        <Road curve={curve} />
        {matatus.map((m, i) => (
          <Matatu key={i} curve={curve} {...m} />
        ))}
      </Canvas>
    </div>
  );
}
