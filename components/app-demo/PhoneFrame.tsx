"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative w-[300px] sm:w-[320px] h-[620px] sm:h-[660px]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer frame */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0a] border border-white/[0.08] shadow-[0_30px_100px_-20px_rgba(249,115,22,0.15),0_0_60px_-15px_rgba(249,115,22,0.1)]">
          {/* Glass reflection */}
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-white/[0.04] to-transparent rotate-12" />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20 border border-white/[0.05]">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#1c1c1e] border border-white/[0.08]" />
        </div>

        {/* Screen area */}
        <div className="absolute inset-[6px] rounded-[2.7rem] overflow-hidden bg-[#09090B]">
          {children}
        </div>

        {/* Screen glow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-[#F97316]/8 blur-2xl rounded-full" />
      </motion.div>
    </div>
  );
}
