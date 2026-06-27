"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Vortex() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const count = 1500;

  const { positions, randoms, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spiral distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 4 + 0.5;
      const height = (Math.random() - 0.5) * 6;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      randoms[i] = Math.random();
      speeds[i] = 0.5 + Math.random() * 2;
    }

    return { positions, randoms, speeds };
  }, []);

  const vertexShader = `
    uniform float uTime;
    attribute float aRandom;
    attribute float aSpeed;
    varying float vRandom;
    varying float vDist;

    void main() {
      vRandom = aRandom;
      vec3 pos = position;

      // Spiral inward over time
      float angle = atan(pos.z, pos.x);
      float radius = length(pos.xz);
      float newAngle = angle + uTime * aSpeed * 0.5;
      
      // Pull toward center
      float pullSpeed = 0.3 + aRandom * 0.3;
      float newRadius = mod(radius - uTime * pullSpeed, 4.5) + 0.2;
      
      pos.x = cos(newAngle) * newRadius;
      pos.z = sin(newAngle) * newRadius;
      pos.y = pos.y + sin(uTime * aSpeed + aRandom * 6.28) * 0.3;

      vDist = newRadius;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (2.5 + aRandom * 2.0) * (1.0 / -mvPosition.z) * 60.0;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying float vRandom;
    varying float vDist;

    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      if (dist > 0.5) discard;

      // Color based on distance from center
      vec3 green = vec3(0.0, 1.0, 0.53);
      vec3 cyan = vec3(0.024, 0.714, 0.831);
      vec3 purple = vec3(0.486, 0.228, 0.929);
      vec3 white = vec3(1.0);

      // Inner particles are brighter/whiter, outer are colored
      float colorT = smoothstep(0.0, 3.0, vDist);
      vec3 innerColor = mix(white, green, 0.5);
      vec3 outerColor = mix(green, mix(cyan, purple, vRandom), 0.6);
      vec3 color = mix(innerColor, outerColor, colorT);

      float alpha = smoothstep(0.5, 0.0, dist);
      alpha *= 0.5 + 0.5 * sin(uTime * 3.0 + vRandom * 10.0);
      alpha *= smoothstep(4.5, 1.0, vDist); // Fade outer particles

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Energy ring pulsing at the center
function EnergyRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.scale.setScalar(0.8 + Math.sin(t * 2) * 0.2);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.2 + Math.sin(t * 3) * 0.15;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.8, 0.02, 16, 64]} />
      <meshBasicMaterial
        color="#00FF88"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function ParticleVortex() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Vortex />
        <EnergyRing />
      </Canvas>
    </div>
  );
}
