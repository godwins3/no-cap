"use client";

import { useGameStore } from "@/lib/game-store";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function AchievementToast() {
  const { pendingToast, clearToast } = useGameStore();

  useEffect(() => {
    if (pendingToast) {
      const timer = setTimeout(clearToast, 3500);
      return () => clearTimeout(timer);
    }
  }, [pendingToast, clearToast]);

  return (
    <div className="fixed top-20 right-4 z-[100] pointer-events-none">
      <AnimatePresence>
        {pendingToast && (
          <motion.div
            initial={{ x: 300, opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ x: 300, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative pointer-events-auto"
          >
            {/* Sticker-style achievement card */}
            <div className="relative bg-[#1a1a2e] border-2 border-[#00FF88] rounded-2xl p-4 pr-6 shadow-[0_0_30px_rgba(0,255,136,0.2)] min-w-[260px]">
              {/* Sticker corner fold */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00FF88] rounded-bl-xl rounded-tr-xl" />

              <div className="flex items-center gap-3">
                {/* Icon */}
                <motion.div
                  className="text-3xl"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {pendingToast.icon}
                </motion.div>

                <div className="flex-1">
                  {/* Title */}
                  <p className="text-white font-bold text-sm leading-tight">
                    {pendingToast.title}
                  </p>
                  {/* Description */}
                  <p className="text-white/50 text-xs mt-0.5">
                    {pendingToast.description}
                  </p>
                  {/* XP reward */}
                  <motion.p
                    className="text-[#00FF88] text-xs font-bold font-mono mt-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    +{pendingToast.xp} XP
                  </motion.p>
                </div>
              </div>

              {/* Progress bar animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#00FF88] rounded-b-2xl"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
