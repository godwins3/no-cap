"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/game-store";
import { AnimatePresence } from "framer-motion";

/**
 * Shows combo multiplier with matatu-style sticker aesthetic
 */
export default function ComboCounter() {
  const comboCount = useGameStore((s) => s.comboCount);

  const comboMessages = [
    "",
    "",
    "Poa! 🔥",
    "Safi sana! 💥",
    "Moto! 🔥🔥",
    "BAZU MODE! 🦁",
    "SHEREHE! 🎉",
    "MWITU! 💀",
    "UNGOVERNABLE! 👑",
    "LEGEND! ⚡",
    "ISSA VIBE! 🦁🔥💥",
  ];

  const getMessage = () => comboMessages[Math.min(comboCount, comboMessages.length - 1)] || "🔥🔥🔥";

  return (
    <AnimatePresence>
      {comboCount >= 2 && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 20 }}
          className="fixed bottom-8 left-8 z-50 pointer-events-none"
        >
          <div className="relative">
            {/* Sticker body */}
            <motion.div
              className="bg-[#1a1a2e] border-2 border-[#FFB800] rounded-2xl px-5 py-3 shadow-[0_0_30px_rgba(255,184,0,0.2)]"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-3xl font-black text-[#FFB800] font-mono"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  x{comboCount}
                </motion.span>
                <span className="text-white font-bold text-sm">
                  {getMessage()}
                </span>
              </div>
            </motion.div>

            {/* Sticker peel effect */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFB800]/20 rounded-tl-xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
