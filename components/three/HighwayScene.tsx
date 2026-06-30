"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function KenyanHighway() {
  const groupRef = useRef<THREE.Group>(null);

  // Create a winding road path
  const { roadGeometry, stripeGeometries } = (() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0.8, -2, -0.5),
      new THREE.Vector3(-0.5, -1, -1),
      new THREE.Vector3(0.3, 0, -1.5),
      new THREE.Vector3(-0.8, 1, -2),
      new THREE.Vector3(0.2, 2, -2.5),
      new THREE.Vector3(-0.3, 3, -3),
      new THREE.Vector3(0.5, 4, -3.5),
    ]);

    const points = curve.getPoints(100);
    const roadWidth = 0.6;

    // Build road surface as a ribbon
    const roadVertices: number[] = [];
    const roadUVs: number[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const next = points[i + 1];
      const dir = new THREE.Vector3().subVectors(next, p).normalize();
      const up = new THREE.Vector3(0, 0, 1);
      const right = new THREE.Vector3().crossVectors(dir, up).normalize().multiplyScalar(roadWidth / 2);

      const p2 = points[i + 1];
      const next2 = i + 2 < points.length ? points[i + 2] : next;
      const dir2 = new THREE.Vector3().subVectors(next2, p2).normalize();
      const right2 = new THREE.Vector3().crossVectors(dir2, up).normalize().multiplyScalar(roadWidth / 2);

      const v = i / (points.length - 1);
      const v2 = (i + 1) / (points.length - 1);

      // Triangle 1
      roadVertices.push(p.x - right.x, p.y - right.y, p.z - right.z);
      roadVertices.push(p.x + right.x, p.y + right.y, p.z + right.z);
      roadVertices.push(p2.x - right2.x, p2.y - right2.y, p2.z - right2.z);
      roadUVs.push(0, v, 1, v, 0, v2);

      // Triangle 2
      roadVertices.push(p.x + right.x, p.y + right.y, p.z + right.z);
      roadVertices.push(p2.x + right2.x, p2.y + right2.y, p2.z + right2.z);
      roadVertices.push(p2.x - right2.x, p2.y - right2.y, p2.z - right2.z);
      roadUVs.push(1, v, 1, v2, 0, v2);
    }

    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute("position", new THREE.Float32BufferAttribute(roadVertices, 3));
    roadGeo.setAttribute("uv", new THREE.Float32BufferAttribute(roadUVs, 2));
    roadGeo.computeVertexNormals();

    // Kenyan flag stripes (black, red, green) as thin ribbons along the road
    const stripeWidth = 0.08;
    const stripeOffsets = [-0.22, 0, 0.22]; // left, center, right

    const stripeGeos: THREE.BufferGeometry[] = [];

    for (const offset of stripeOffsets) {
      const verts: number[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        const p = points[i];
        const next = points[i + 1];
        const dir = new THREE.Vector3().subVectors(next, p).normalize();
        const up = new THREE.Vector3(0, 0, 1);
        const right = new THREE.Vector3().crossVectors(dir, up).normalize();

        const center = new THREE.Vector3(
          p.x + right.x * offset,
          p.y + right.y * offset,
          p.z + right.z * offset + 0.01
        );
        const halfW = stripeWidth / 2;

        const p2 = points[i + 1];
        const next2 = i + 2 < points.length ? points[i + 2] : next;
        const dir2 = new THREE.Vector3().subVectors(next2, p2).normalize();
        const right2 = new THREE.Vector3().crossVectors(dir2, up).normalize();
        const center2 = new THREE.Vector3(
          p2.x + right2.x * offset,
          p2.y + right2.y * offset,
          p2.z + right2.z * offset + 0.01
        );

        verts.push(
          center.x - right.x * halfW, center.y - right.y * halfW, center.z,
          center.x + right.x * halfW, center.y + right.y * halfW, center.z,
          center2.x - right2.x * halfW, center2.y - right2.y * halfW, center2.z,

          center.x + right.x * halfW, center.y + right.y * halfW, center.z,
          center2.x + right2.x * halfW, center2.y + right2.y * halfW, center2.z,
          center2.x - right2.x * halfW, center2.y - right2.y * halfW, center2.z,
        );
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
      stripeGeos.push(geo);
    }

    return { roadGeometry: roadGeo, stripeGeometries: stripeGeos };
  })();

  // Animated "data packets" traveling along the road
  const packetRefs = useRef<THREE.Mesh[]>([]);
  const packetCount = 6;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0.8, -2, -0.5),
    new THREE.Vector3(-0.5, -1, -1),
    new THREE.Vector3(0.3, 0, -1.5),
    new THREE.Vector3(-0.8, 1, -2),
    new THREE.Vector3(0.2, 2, -2.5),
    new THREE.Vector3(-0.3, 3, -3),
    new THREE.Vector3(0.5, 4, -3.5),
  ]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;

    // Move packets along curve
    packetRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = ((clock.getElapsedTime() * 0.15 + i / packetCount) % 1);
      const pos = curve.getPoint(t);
      mesh.position.copy(pos);
      mesh.position.z += 0.05;

      // Pulse scale
      const pulse = 0.8 + Math.sin(clock.getElapsedTime() * 3 + i) * 0.2;
      mesh.scale.setScalar(pulse);
    });
  });

  // Kenyan flag colors
  const stripeColors = ["#000000", "#BB0000", "#006600"];

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.3, -0.2, 0.1]}>
      {/* Road surface - dark asphalt */}
      <mesh geometry={roadGeometry}>
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Road edges - white dashed */}
      {/* Kenyan flag stripes */}
      {stripeGeometries.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial
            color={stripeColors[i]}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Edge glow */}
      <mesh geometry={roadGeometry}>
        <meshBasicMaterial
          color="#F97316"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Data packets traveling the road */}
      {Array.from({ length: packetCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) packetRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#F97316" : "#EA580C"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Ambient road glow */}
      <pointLight position={[0, 0, 1]} color="#F97316" intensity={0.3} distance={5} />
    </group>
  );
}

export default function HighwayScene() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <KenyanHighway />
      </Canvas>
    </div>
  );
}
