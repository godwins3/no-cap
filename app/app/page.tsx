"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import BottomNavigation from "@/components/app-demo/BottomNavigation";
import { useAppDemoStore } from "@/lib/pwa-store";

const screens = [
  dynamic(() => import("@/components/app-demo/screens/HomeScreen")),
  dynamic(() => import("@/components/app-demo/screens/SubscriptionScreen")),
  dynamic(() => import("@/components/app-demo/screens/AnalyticsScreen")),
  dynamic(() => import("@/components/app-demo/screens/EsimScreen")),
  dynamic(() => import("@/components/app-demo/screens/RewardsScreen")),
  dynamic(() => import("@/components/app-demo/screens/CommunityScreen")),
  dynamic(() => import("@/components/app-demo/screens/ReferralScreen")),
  dynamic(() => import("@/components/app-demo/screens/SupportScreen")),
  dynamic(() => import("@/components/app-demo/screens/NetworkScreen")),
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#09090B] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
          <span className="text-[#09090B] text-2xl font-black">n</span>
        </div>
        <p className="text-white/60 text-sm font-medium">nocap</p>
      </motion.div>
      <motion.p
        className="absolute bottom-12 text-white/30 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Data Shouldn&apos;t Expire
      </motion.p>
    </motion.div>
  );
}

export default function AppPage() {
  const [showSplash, setShowSplash] = useState(true);
  const { activeScreen, direction, setActiveScreen, setDirection } = useAppDemoStore();

  const ActiveScreen = screens[activeScreen];

  function handleDragEnd(_: any, info: { offset: { x: number } }) {
    const threshold = 50;
    if (info.offset.x < -threshold && activeScreen < screens.length - 1) {
      setDirection(1);
      setActiveScreen(activeScreen + 1);
    } else if (info.offset.x > threshold && activeScreen > 0) {
      setDirection(-1);
      setActiveScreen(activeScreen - 1);
    }
  }

  return (
    <div className="relative h-full w-full">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onComplete={() => setTimeout(() => setShowSplash(false), 1200)}
          />
        )}
      </AnimatePresence>

      {/* App screens */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeScreen}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <ActiveScreen />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
}
