"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone,
  QrCode,
  BarChart3,
  Users,
  Bot,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Instant eSIM Activation",
    description: "Scan, activate, connect. No stores, no queues, no paperwork.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Real-time insights into your data usage with beautiful charts.",
  },
  {
    icon: Smartphone,
    title: "Subscription Management",
    description: "Upgrade, downgrade, or pause — all with a single tap.",
  },
  {
    icon: Users,
    title: "Referral Rewards",
    description: "Share your code. Both of you get bonus data. Simple.",
  },
  {
    icon: Bot,
    title: "AI Customer Support",
    description: "24/7 instant help. No hold music. No frustration.",
  },
];

function PhoneScreen({ scrollProgress }: { scrollProgress: any }) {
  const y = useTransform(scrollProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      className="relative w-[260px] sm:w-[280px] h-[520px] sm:h-[560px] mx-auto"
      style={{ y }}
    >
      {/* Phone frame */}
      <div className="relative w-full h-full bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#09090B] rounded-b-xl z-10" />

        {/* Screen content */}
        <div className="absolute inset-2 rounded-[2rem] overflow-hidden bg-[#09090B]">
          {/* App header */}
          <div className="p-4 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/40 text-xs">Good evening</p>
                <p className="text-white text-sm font-semibold">Brian 👋</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF88] to-[#06B6D4] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#09090B]">B</span>
              </div>
            </div>

            {/* Plan card */}
            <motion.div
              className="bg-gradient-to-br from-[#00FF88]/10 to-[#06B6D4]/5 rounded-2xl p-4 border border-[#00FF88]/20 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#00FF88] text-[10px] font-medium">HUSTLER PLAN</p>
                  <p className="text-white text-lg font-bold">∞ Data</p>
                </div>
                <Sparkles className="w-5 h-5 text-[#00FF88]" />
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div>
                  <p className="text-white/30 text-[9px]">SPEED</p>
                  <p className="text-white text-xs font-semibold">50 Mbps</p>
                </div>
                <div>
                  <p className="text-white/30 text-[9px]">EXPIRY</p>
                  <p className="text-[#00FF88] text-xs font-semibold">Never</p>
                </div>
                <div>
                  <p className="text-white/30 text-[9px]">FEES</p>
                  <p className="text-white text-xs font-semibold">KES 0</p>
                </div>
              </div>
            </motion.div>

            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["Top Up", "Refer", "Support", "More"].map((action, i) => (
                <div
                  key={action}
                  className="bg-white/5 rounded-xl p-2 flex flex-col items-center gap-1"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10" />
                  <span className="text-[8px] text-white/40">{action}</span>
                </div>
              ))}
            </div>

            {/* Usage chart */}
            <div className="bg-white/[0.03] rounded-xl p-3">
              <p className="text-white/40 text-[10px] mb-2">THIS WEEK</p>
              <div className="flex items-end gap-[3px] h-12">
                {[30, 50, 40, 70, 55, 80, 65].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#7C3AED]/60 to-[#00FF88]/60"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-[#00FF88]/10 blur-2xl rounded-full" />
    </motion.div>
  );
}

export default function AppShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#06B6D4]/5 blur-[120px] rounded-full" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Features */}
          <div>
            <motion.span
              className="inline-block px-4 py-1.5 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full text-[#06B6D4] text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              The App
            </motion.span>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Everything In
              <br />
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#00FF88] bg-clip-text text-transparent">
                Your Pocket.
              </span>
            </motion.h2>
            <motion.p
              className="text-white/50 text-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              A premium app experience that makes traditional carrier apps look ancient.
            </motion.p>

            {/* Feature list */}
            <div className="space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#00FF88]/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-white/60 group-hover:text-[#00FF88] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                    <p className="text-white/40 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PhoneScreen scrollProgress={scrollYProgress} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
