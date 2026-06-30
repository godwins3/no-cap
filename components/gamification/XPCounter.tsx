"use client";

import { useGameStore } from "@/lib/game-store";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function XPCounter() {
  const { xp, level, comboCount } = useGameStore();
  const [prevXP, setPrevXP] = useState(xp);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (xp > prevXP) {
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
      setPrevXP(xp);
    }
  }, [xp, prevXP]);

  const levelNames = ["", "Rookie", "Hustler", "Bazu", "Mwitu", "Legend"];
  const levelColors = ["", "#EA580C", "#F97316", "#FFB800", "#FF4444", "#000000"];

  // XP needed for next level
  const thresholds = [0, 50, 150, 250, 400, 999];
  const currentThreshold = thresholds[level - 1] || 0;
  const nextThreshold = thresholds[level] || thresholds[thresholds.length - 1];
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full"
      animate={flash ? { scale: [1, 1.15, 1], borderColor: ["rgba(255,255,255,0.1)", "rgba(249,115,22,0.5)", "rgba(255,255,255,0.1)"] } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Level badge */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
        style={{ background: levelColors[level] }}
      >
        {level}
      </div>

      {/* XP bar */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
            {levelNames[level]}
          </span>
          <AnimatePresence>
            {comboCount > 1 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-[10px] font-bold text-[#FFB800]"
              >
                x{comboCount} 🔥
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: levelColors[level] }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>
      </div>

      {/* XP number */}
      <motion.span
        className="text-xs font-mono font-bold"
        style={{ color: flash ? "#F97316" : "rgba(255,255,255,0.6)" }}
      >
        {xp}xp
      </motion.span>
    </motion.div>
  );
}
