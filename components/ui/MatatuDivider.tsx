"use client";

import { motion } from "framer-motion";

/**
 * A visual separator between sections styled like matatu paint stripes.
 * Asymmetric, bold, colorful.
 */
export default function MatatuDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative w-full h-12 overflow-hidden ${flip ? "rotate-180" : ""}`}>
      {/* Main stripe */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2"
        style={{
          background: "linear-gradient(90deg, #F97316, #EA580C, #000000, #FF4444, #FFB800, #F97316)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal slash marks */}
      <div className="absolute top-2 left-0 w-full h-10 flex">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-8 h-full"
            style={{
              background: i % 3 === 0
                ? "linear-gradient(135deg, transparent 40%, rgba(249,115,22,0.1) 40%, rgba(249,115,22,0.1) 60%, transparent 60%)"
                : i % 3 === 1
                ? "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 60%, transparent 60%)"
                : "linear-gradient(135deg, transparent 40%, rgba(234,88,12,0.06) 40%, rgba(234,88,12,0.06) 60%, transparent 60%)",
            }}
          />
        ))}
      </div>

      {/* Graffiti dots */}
      <motion.div
        className="absolute top-3 left-[10%] w-2 h-2 rounded-full bg-[#F97316]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-5 left-[45%] w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-4 right-[20%] w-2 h-2 rounded-full bg-[#FFB800]/30"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
