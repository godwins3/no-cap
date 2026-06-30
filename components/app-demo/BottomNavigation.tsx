"use client";

import { motion } from "framer-motion";
import { Home, CreditCard, BarChart3, Gift, MoreHorizontal } from "lucide-react";
import { useAppDemoStore } from "@/lib/pwa-store";

const navItems = [
  { icon: Home, label: "Home", index: 0 },
  { icon: CreditCard, label: "Plans", index: 1 },
  { icon: BarChart3, label: "Analytics", index: 2 },
  { icon: Gift, label: "Rewards", index: 4 },
  { icon: MoreHorizontal, label: "More", index: 5 },
];

export default function BottomNavigation() {
  const { activeScreen, setActiveScreen, setDirection } = useAppDemoStore();

  function handleNav(index: number) {
    setDirection(index > activeScreen ? 1 : -1);
    setActiveScreen(index);
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <div className="bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.06] px-2 pb-4 pt-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeScreen === item.index;
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.index)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="relative"
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-[#F97316]" : "text-white/40"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F97316]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span
                  className={`text-[9px] transition-colors duration-200 ${
                    isActive ? "text-[#F97316]" : "text-white/30"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
