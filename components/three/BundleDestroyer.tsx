"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/lib/game-store";
import { motion, AnimatePresence } from "framer-motion";

// A single destroyable data bundle cube
function BundleCube({
  id,
  position,
  onDestroy,
}: {
  id: number;
  position: [number, number, number];
  onDestroy: (id: number, pos: THREE.Vector3) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const startTime = useRef(Math.random() * 100);
  const speed = useRef(0.5 + Math.random() * 0.5);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + startTime.current;
    ref.current.rotation.x = t * speed.current;
    ref.current.rotation.y = t * speed.current * 0.7;
    ref.current.position.y = position[1] + Math.sin(t * 1.5) * 0.2;

    // Pulse when hovered
    if (hovered) {
      const scale = 1 + Math.sin(t * 10) * 0.1;
      ref.current.scale.setScalar(scale);
    } else {
      ref.current.scale.setScalar(1);
    }
  });

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (ref.current) {
        onDestroy(id, ref.current.position.clone());
      }
    },
    [id, onDestroy]
  );

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial
        color={hovered ? "#FF4444" : "#FFB800"}
        wireframe={!hovered}
        transparent
        opacity={hovered ? 0.9 : 0.7}
      />
    </mesh>
  );
}

// Explosion particles when a bundle is destroyed
function Explosion({
  position,
  onComplete,
}: {
  position: THREE.Vector3;
  onComplete: () => void;
}) {
  const ref = useRef<THREE.Points>(null);
  const startTime = useRef<number | null>(null);
  const count = 20;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      // Random burst directions
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = 2 + Math.random() * 3;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed;
    }

    return { positions, velocities };
  }, [position]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    if (startTime.current === null) startTime.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startTime.current;

    if (elapsed > 1) {
      onComplete();
      return;
    }

    const posArray = ref.current.geometry.attributes.position.array as Float32Array;
    const dt = 0.016; // ~60fps

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] * dt;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] * dt - 0.05; // gravity
      posArray[i * 3 + 2] += velocities[i * 3 + 2] * dt;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity = 1 - elapsed;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#FF4444"
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Timer countdown display above each cube
function CountdownLabel({
  position,
  timeLeft,
}: {
  position: [number, number, number];
  timeLeft: number;
}) {
  const ref = useRef<THREE.Sprite>(null);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  // Create canvas texture for the label
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "transparent";
    ctx.clearRect(0, 0, 128, 64);
    ctx.font = "bold 28px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = timeLeft <= 2 ? "#FF4444" : "#FFB800";
    ctx.fillText(`${timeLeft}s`, 64, 40);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, [timeLeft]);

  return (
    <sprite
      ref={ref}
      position={[position[0], position[1] + 0.6, position[2]]}
      scale={[0.8, 0.4, 1]}
    >
      <spriteMaterial map={texture} transparent opacity={0.9} />
    </sprite>
  );
}

type BundleData = {
  id: number;
  position: [number, number, number];
  timeLeft: number;
};

type ExplosionData = {
  id: number;
  position: THREE.Vector3;
};

function GameScene({
  bundles,
  explosions,
  onDestroy,
  onExplosionComplete,
}: {
  bundles: BundleData[];
  explosions: ExplosionData[];
  onDestroy: (id: number, pos: THREE.Vector3) => void;
  onExplosionComplete: (id: number) => void;
}) {
  return (
    <>
      {bundles.map((bundle) => (
        <group key={bundle.id}>
          <BundleCube
            id={bundle.id}
            position={bundle.position}
            onDestroy={onDestroy}
          />
          <CountdownLabel position={bundle.position} timeLeft={bundle.timeLeft} />
        </group>
      ))}
      {explosions.map((exp) => (
        <Explosion
          key={exp.id}
          position={exp.position}
          onComplete={() => onExplosionComplete(exp.id)}
        />
      ))}
    </>
  );
}

export default function BundleDestroyer() {
  const { recordSmash, comboCount, totalSmashed, addXP } = useGameStore();
  const [bundles, setBundles] = useState<BundleData[]>([]);
  const [explosions, setExplosions] = useState<ExplosionData[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const nextId = useRef(0);
  const spawnInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnBundle = useCallback(() => {
    const id = nextId.current++;
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
    ];
    setBundles((prev) => [...prev, { id, position, timeLeft: 5 + Math.floor(Math.random() * 4) }]);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    setBundles([]);
    setExplosions([]);

    // Spawn initial bundles
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnBundle(), i * 300);
    }

    // Keep spawning
    spawnInterval.current = setInterval(spawnBundle, 2000);

    // Countdown tick
    tickInterval.current = setInterval(() => {
      setBundles((prev) =>
        prev
          .map((b) => ({ ...b, timeLeft: b.timeLeft - 1 }))
          .filter((b) => b.timeLeft > 0)
      );
    }, 1000);
  }, [spawnBundle]);

  const stopGame = useCallback(() => {
    setGameStarted(false);
    if (spawnInterval.current) clearInterval(spawnInterval.current);
    if (tickInterval.current) clearInterval(tickInterval.current);
  }, []);

  const handleDestroy = useCallback(
    (id: number, pos: THREE.Vector3) => {
      setBundles((prev) => prev.filter((b) => b.id !== id));
      setExplosions((prev) => [...prev, { id, position: pos }]);
      recordSmash();
      addXP(5);
      setScore((s) => s + 10);
    },
    [recordSmash, addXP]
  );

  const handleExplosionComplete = useCallback((id: number) => {
    setExplosions((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-black/30">
      {/* Game HUD */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
          <span className="text-[#FFB800] font-mono font-bold text-sm">
            SCORE: {score}
          </span>
        </div>
        <AnimatePresence>
          {comboCount > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="px-3 py-1.5 bg-[#FF4444]/20 backdrop-blur-sm rounded-lg border border-[#FF4444]/30"
            >
              <span className="text-[#FF4444] font-mono font-bold text-sm">
                COMBO x{comboCount} 🔥
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smashed counter */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
          <span className="text-white/60 font-mono text-xs">
            💀 {totalSmashed} destroyed
          </span>
        </div>
      </div>

      {/* Start/Instructions overlay */}
      {!gameStarted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <p className="text-4xl mb-2">💥</p>
            <h3 className="text-white font-bold text-xl mb-2">
              Bundle Destroyer
            </h3>
            <p className="text-white/50 text-sm mb-4 max-w-xs">
              Tap the expiring bundles before they expire! Build combos for more XP.
              <br />
              <span className="text-[#FFB800]">Piga zote — smash them all!</span>
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-[#F97316] text-black font-bold rounded-xl hover:scale-105 transition-transform cursor-pointer"
            >
              Anza Game 🎮
            </button>
          </motion.div>
        </div>
      )}

      {/* Stop button */}
      {gameStarted && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={stopGame}
            className="px-3 py-1.5 bg-white/10 text-white/60 text-xs rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          >
            Stop
          </button>
        </div>
      )}

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent", cursor: gameStarted ? "crosshair" : "default" }}
      >
        <ambientLight intensity={0.3} />
        <GameScene
          bundles={bundles}
          explosions={explosions}
          onDestroy={handleDestroy}
          onExplosionComplete={handleExplosionComplete}
        />
      </Canvas>
    </div>
  );
}
