"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useAppDemoStore } from "@/lib/pwa-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import BottomNavigation from "./BottomNavigation";

const screens = [
  dynamic(() => import("./screens/HomeScreen")),
  dynamic(() => import("./screens/SubscriptionScreen")),
  dynamic(() => import("./screens/AnalyticsScreen")),
  dynamic(() => import("./screens/EsimScreen")),
  dynamic(() => import("./screens/RewardsScreen")),
  dynamic(() => import("./screens/CommunityScreen")),
  dynamic(() => import("./screens/ReferralScreen")),
  dynamic(() => import("./screens/SupportScreen")),
  dynamic(() => import("./screens/NetworkScreen")),
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function PhoneCarousel() {
  const { activeScreen, setActiveScreen, direction, setDirection } = useAppDemoStore();

  const ActiveScreen = screens[activeScreen];

  function paginate(dir: number) {
    setDirection(dir);
    const next = activeScreen + dir;
    if (next >= 0 && next < screens.length) {
      setActiveScreen(next);
    }
  }

  function handleDragEnd(_: any, info: PanInfo) {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeScreen < screens.length - 1) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold && activeScreen > 0) {
      paginate(-1);
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Screen content */}
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

      {/* Bottom nav */}
      <BottomNavigation />

      {/* Arrow buttons (visible on non-touch) */}
      <div className="hidden sm:block">
        {activeScreen > 0 && (
          <motion.button
            onClick={() => paginate(-1)}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 -left-14 -translate-y-1/2 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </motion.button>
        )}
        {activeScreen < screens.length - 1 && (
          <motion.button
            onClick={() => paginate(1)}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 -right-14 -translate-y-1/2 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white/60" />
          </motion.button>
        )}
      </div>

      {/* Dots indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > activeScreen ? 1 : -1);
              setActiveScreen(i);
            }}
            className="p-0.5"
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: activeScreen === i ? 16 : 4,
                height: 4,
                backgroundColor: activeScreen === i ? "#F97316" : "rgba(255,255,255,0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
