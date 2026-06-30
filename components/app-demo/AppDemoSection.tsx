"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useAppDemoStore } from "@/lib/pwa-store";
import PhoneFrame from "./PhoneFrame";
import PhoneCarousel from "./PhoneCarousel";
import DemoBackground from "./DemoBackground";
import {
  Smartphone,
  Infinity,
  BarChart3,
  Users,
  Shield,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: Infinity,
    title: "Unlimited Plans",
    description: "No caps, no throttling, no expiry. Real unlimited.",
    screenIndex: 1,
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Beautiful charts showing exactly where your data goes.",
    screenIndex: 2,
  },
  {
    icon: Users,
    title: "Community",
    description: "Join 24k+ Kenyans building the future of connectivity.",
    screenIndex: 5,
  },
  {
    icon: Shield,
    title: "eSIM Security",
    description: "Digital SIM. No physical card. Activated in seconds.",
    screenIndex: 3,
  },
  {
    icon: Zap,
    title: "AI Support",
    description: "Get answers instantly. No hold music. No frustration.",
    screenIndex: 7,
  },
];

export default function AppDemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { setActiveScreen, setDirection, activeScreen } = useAppDemoStore();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Scroll-sync: map scroll progress to screen
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Map 0-1 progress to screen indices for the visible section
      const screenMap = [0, 1, 2, 5, 3, 7];
      const index = Math.min(
        Math.floor(v * screenMap.length),
        screenMap.length - 1
      );
      const targetScreen = screenMap[Math.max(0, index)];
      if (targetScreen !== activeScreen) {
        setDirection(targetScreen > activeScreen ? 1 : -1);
        setActiveScreen(targetScreen);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, activeScreen, setActiveScreen, setDirection]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-[#09090B] overflow-hidden"
    >
      <DemoBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F97316]/10 border border-[#F97316]/20 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-[#F97316] text-sm font-medium">Live App Demo</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Experience The{" "}
            <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
              Future
            </span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Swipe through our app — a premium mobile experience that makes
            traditional carriers look ancient.
          </motion.p>
        </div>

        {/* Main content: Phone + highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          {/* Left highlights */}
          <div className="hidden lg:flex flex-col gap-5">
            {highlights.slice(0, 3).map((item, i) => (
              <motion.button
                key={item.title}
                onClick={() => {
                  setDirection(item.screenIndex > activeScreen ? 1 : -1);
                  setActiveScreen(item.screenIndex);
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeScreen === item.screenIndex
                    ? "bg-[#F97316]/5 border-[#F97316]/20"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeScreen === item.screenIndex
                        ? "bg-[#F97316]/20"
                        : "bg-white/[0.05]"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 transition-colors ${
                        activeScreen === item.screenIndex
                          ? "text-[#F97316]"
                          : "text-white/50"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium transition-colors ${
                        activeScreen === item.screenIndex
                          ? "text-white"
                          : "text-white/70"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">{item.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Phone */}
          <motion.div
            className="flex justify-center"
            style={{ y: phoneY }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <PhoneFrame>
              <PhoneCarousel />
            </PhoneFrame>
          </motion.div>

          {/* Right highlights */}
          <div className="hidden lg:flex flex-col gap-5">
            {highlights.slice(3).map((item, i) => (
              <motion.button
                key={item.title}
                onClick={() => {
                  setDirection(item.screenIndex > activeScreen ? 1 : -1);
                  setActiveScreen(item.screenIndex);
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeScreen === item.screenIndex
                    ? "bg-[#F97316]/5 border-[#F97316]/20"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeScreen === item.screenIndex
                        ? "bg-[#F97316]/20"
                        : "bg-white/[0.05]"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 transition-colors ${
                        activeScreen === item.screenIndex
                          ? "text-[#F97316]"
                          : "text-white/50"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium transition-colors ${
                        activeScreen === item.screenIndex
                          ? "text-white"
                          : "text-white/70"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">{item.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile highlights (below phone) */}
        <div className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {highlights.map((item, i) => (
            <motion.button
              key={item.title}
              onClick={() => {
                setDirection(item.screenIndex > activeScreen ? 1 : -1);
                setActiveScreen(item.screenIndex);
              }}
              className={`text-left p-3 rounded-xl border transition-all ${
                activeScreen === item.screenIndex
                  ? "bg-[#F97316]/5 border-[#F97316]/20"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.06 }}
            >
              <item.icon
                className={`w-4 h-4 mb-2 ${
                  activeScreen === item.screenIndex ? "text-[#F97316]" : "text-white/40"
                }`}
              />
              <p className="text-white/70 text-[11px] font-medium">{item.title}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
