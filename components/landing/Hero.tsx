"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wifi, Shield, Zap, Clock, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#00FF88]/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {/* Connection lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Aurora gradient */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-[120px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#06B6D4]/8 blur-[100px]"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00FF88]/5 blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ShatterTimer({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isShattering, setIsShattering] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 800);
      return () => clearTimeout(timer);
    } else {
      setIsGlitching(true);
      setTimeout(() => {
        setIsShattering(true);
        setTimeout(onComplete, 1200);
      }, 1500);
    }
  }, [timeLeft, onComplete]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `00:${mins}:${secs}`;
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6"
      animate={
        isShattering
          ? { scale: [1, 1.2, 0], opacity: [1, 1, 0], rotate: [0, 0, 15] }
          : isGlitching
          ? { x: [0, -3, 3, -2, 2, 0], opacity: [1, 0.7, 1, 0.5, 1] }
          : {}
      }
      transition={
        isShattering
          ? { duration: 1.2, ease: "easeIn" }
          : { duration: 0.15, repeat: Infinity }
      }
    >
      {/* Warning indicator */}
      <motion.div
        className="flex items-center gap-2 text-red-500/80"
        animate={timeLeft === 0 ? { opacity: [1, 0, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Clock className="w-4 h-4" />
        <span className="text-sm font-mono uppercase tracking-widest">
          {timeLeft === 0 ? "DATA EXPIRED" : "DATA EXPIRING"}
        </span>
      </motion.div>

      {/* Timer display */}
      <div className="relative">
        <span
          className={`text-6xl sm:text-8xl md:text-9xl font-mono font-bold tracking-tight ${
            timeLeft === 0 ? "text-red-500" : "text-white"
          }`}
          style={{
            textShadow: isGlitching
              ? "2px 0 #ff0000, -2px 0 #00ff88, 0 2px #06B6D4"
              : timeLeft <= 2
              ? "0 0 20px rgba(255,0,0,0.5)"
              : "none",
          }}
        >
          {formatTime(timeLeft)}
        </span>
        {/* Cracks overlay */}
        {isGlitching && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 100"
            fill="none"
          >
            <motion.path
              d="M200 0 L180 30 L210 50 L190 80 L200 100"
              stroke="rgba(255,0,0,0.6)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M150 20 L170 40 L140 60 L160 90"
              stroke="rgba(255,0,0,0.4)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.path
              d="M250 10 L230 35 L260 55 L240 85"
              stroke="rgba(255,0,0,0.4)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          </svg>
        )}
      </div>

      {/* Shatter particles */}
      {isShattering && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500/60"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                rotate: Math.random() * 720,
                scale: 0,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Subtitle */}
      <motion.p
        className="text-white/40 text-sm font-mono"
        animate={timeLeft === 0 ? { opacity: [0.4, 0, 0.4] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {timeLeft === 0
          ? "Your 1GB bundle has expired. Buy more?"
          : `${timeLeft}s until your bundle expires`}
      </motion.p>
    </motion.div>
  );
}

function PhoneMockup() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * -10;
      rotateX.set(y);
      rotateY.set(x);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className="relative perspective-1000"
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="relative w-[280px] h-[560px] bg-gradient-to-b from-[#1a1a2e] to-[#111827] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#09090B] rounded-b-2xl" />

        {/* Screen content */}
        <div className="p-6 pt-10 h-full flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center text-xs text-white/50 mb-6">
            <span>9:41</span>
            <div className="flex gap-1">
              <Wifi className="w-3 h-3" />
              <span>5G</span>
            </div>
          </div>

          {/* Plan info */}
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#06B6D4]/10 rounded-2xl p-4 border border-[#00FF88]/20 mb-4">
            <p className="text-[#00FF88] text-xs font-medium mb-1">ACTIVE PLAN</p>
            <p className="text-white text-lg font-bold">Unlimited Data</p>
            <p className="text-white/50 text-xs mt-1">No expiry · No limits</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-[10px]">HIDDEN FEES</p>
              <p className="text-[#00FF88] text-lg font-bold">KES 0</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-[10px]">NETWORK</p>
              <p className="text-[#06B6D4] text-lg font-bold">99.8%</p>
            </div>
          </div>

          {/* Usage graph mock */}
          <div className="bg-white/5 rounded-xl p-3 flex-1">
            <p className="text-white/40 text-[10px] mb-2">USAGE THIS WEEK</p>
            <div className="flex items-end gap-1 h-16">
              {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#00FF88]/60 to-[#06B6D4]/60 rounded-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-[#00FF88]/5 to-transparent pointer-events-none" />
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-[#00FF88]/10 blur-2xl rounded-full" />
    </motion.div>
  );
}

function LiveCounter({ label, value, prefix = "" }: { label: string; value: number; prefix?: string }) {
  const [count, setCount] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 50 + 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
      <p className="text-[#00FF88] text-lg sm:text-xl font-bold font-mono">
        {prefix}{count.toLocaleString()}
      </p>
      <p className="text-white/50 text-xs mt-1">{label}</p>
    </div>
  );
}

export default function Hero() {
  const [showContent, setShowContent] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090B]">
      <GridBackground />
      <FloatingParticles />
      <HeroScene />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <AnimatePresence mode="wait">
          {!showContent ? (
            <motion.div
              key="timer"
              className="flex items-center justify-center min-h-[80vh]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ShatterTimer onComplete={() => setShowContent(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[80vh] py-12"
            >
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                    <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                      Data Shouldn&apos;t
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#00FF88] via-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
                      Expire.
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  className="mt-6 text-lg sm:text-xl text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Welcome to a world without expiry.
                  <br />
                  <span className="text-white/80">Unlimited internet.</span> No hidden fees.
                  <br />
                  No bundle tricks. <span className="text-[#00FF88]">No nonsense.</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Button variant="primary" size="lg">
                    Get Connected
                  </Button>
                  <Button variant="secondary" size="lg">
                    See Plans
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {[
                    { icon: Zap, label: "Instant eSIM" },
                    { icon: Shield, label: "Zero Hidden Fees" },
                    { icon: Wifi, label: "Unlimited Data" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-white/50 text-sm"
                    >
                      <item.icon className="w-4 h-4 text-[#00FF88]" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Live counters */}
                <motion.div
                  className="mt-8 grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <LiveCounter label="Bundle Expiry Loss Today" value={12400000} prefix="KES " />
                  <LiveCounter label="Saved By The Movement" value={4500000} prefix="KES " />
                </motion.div>
              </div>

              {/* Right - Phone mockup */}
              <motion.div
                className="hidden lg:flex flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <PhoneMockup />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social proof strip */}
        {showContent && (
          <motion.div
            className="pb-12 border-t border-white/5 pt-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-white/40">
              {[
                "✓ Instant eSIM Activation",
                "✓ Unlimited Data",
                "✓ Zero Hidden Fees",
                "✓ 100% Digital Experience",
                "✓ Built For Kenya",
              ].map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="hover:text-[#00FF88] transition-colors cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
