"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function DataSphere() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particleCount = 2000;

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute on sphere surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + (Math.random() - 0.5) * 0.3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      randoms[i] = Math.random();
    }

    return { positions, randoms };
  }, []);

  const vertexShader = `
    uniform float uTime;
    uniform float uDistortion;
    uniform vec2 uMouse;
    attribute float aRandom;
    varying float vRandom;
    varying float vDistance;

    // Simplex noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vRandom = aRandom;
      vec3 pos = position;

      // Noise-based distortion
      float noise = snoise(pos * 0.5 + uTime * 0.3) * uDistortion;
      float noise2 = snoise(pos * 1.2 + uTime * 0.5) * uDistortion * 0.5;

      // Glitch displacement
      float glitch = step(0.97, sin(uTime * 15.0 + aRandom * 100.0)) * 0.8;
      
      // Mouse influence
      float mouseDist = length(pos.xy - uMouse * 3.0);
      float mouseInfluence = smoothstep(2.5, 0.0, mouseDist) * 0.5;

      pos += normalize(pos) * (noise + noise2 + glitch);
      pos += normalize(pos) * mouseInfluence;

      vDistance = length(pos);

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (3.0 + aRandom * 2.0) * (1.0 / -mvPosition.z) * 80.0;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying float vRandom;
    varying float vDistance;

    void main() {
      // Circular point shape
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      if (dist > 0.5) discard;

      // Neon orange to dark orange gradient based on distance
      vec3 green = vec3(0.976, 0.451, 0.086); // #F97316
      vec3 cyan = vec3(0.918, 0.345, 0.047); // #EA580C
      vec3 purple = vec3(0.0, 0.0, 0.0); // #000000

      float colorMix = sin(vRandom * 6.28 + uTime * 0.5) * 0.5 + 0.5;
      vec3 color = mix(green, mix(cyan, purple, step(0.7, vRandom)), colorMix);

      // Glow
      float alpha = smoothstep(0.5, 0.0, dist) * (0.6 + vRandom * 0.4);
      
      // Pulse
      alpha *= 0.7 + 0.3 * sin(uTime * 2.0 + vRandom * 10.0);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const handlePointerMove = useCallback(
    (e: THREE.Event & { point: THREE.Vector3 }) => {
      mousePos.current.x = (e as unknown as { point: THREE.Vector3 }).point.x / viewport.width;
      mousePos.current.y = (e as unknown as { point: THREE.Vector3 }).point.y / viewport.height;
    },
    [viewport]
  );

  useFrame(({ clock, pointer }) => {
    if (!materialRef.current || !meshRef.current) return;

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y);

    // Slow rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += 0.001;

    // Pulse distortion
    const t = clock.getElapsedTime();
    const distortion = 0.3 + Math.sin(t * 0.5) * 0.15;
    materialRef.current.uniforms.uDistortion.value = distortion;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uDistortion: { value: 0.3 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Wireframe ring orbiting the sphere
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    ref.current.rotation.z = clock.getElapsedTime() * 0.15;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.2, 0.01, 16, 100]} />
      <meshBasicMaterial color="#F97316" transparent opacity={0.3} />
    </mesh>
  );
}

function OrbitRing2() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 3 + Math.cos(clock.getElapsedTime() * 0.2) * 0.3;
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.5, 0.008, 16, 100]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.2} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <DataSphere />
        <OrbitRing />
        <OrbitRing2 />
      </Canvas>
    </div>
  );
}
