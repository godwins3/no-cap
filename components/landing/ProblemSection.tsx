"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  EyeOff,
  Repeat,
  Shield,
  HelpCircle,
} from "lucide-react";
import dynamic from "next/dynamic";

const BundleDestroyer = dynamic(() => import("@/components/three/BundleDestroyer"), { ssr: false });

const problems = [
  {
    icon: Clock,
    title: "Expiring Bundles",
    description: "Buy data today, watch it vanish tomorrow. They profit from what you can't use.",
    color: "#FF4444",
    stat: "KES 8.2B",
    statLabel: "Lost to expiry yearly",
  },
  {
    icon: EyeOff,
    title: "Hidden Charges",
    description: "Mystery deductions, stealth subscriptions, and charges you never agreed to.",
    color: "#FF6B35",
    stat: "47%",
    statLabel: "Users overcharged monthly",
  },
  {
    icon: Repeat,
    title: "Okoa Debt Cycle",
    description: "Borrow data at insane interest. Stay trapped in the debt loop forever.",
    color: "#FFB800",
    stat: "3.2M",
    statLabel: "Trapped in Okoa debt",
  },
  {
    icon: Shield,
    title: "Fair Usage Caps",
    description: "'Unlimited' until you actually use it. Then they throttle you into oblivion.",
    color: "#000000",
    stat: "2Mbps",
    statLabel: "Throttled speed after cap",
  },
  {
    icon: HelpCircle,
    title: "Confusing Packages",
    description: "200+ bundle options designed to confuse. They win when you pick wrong.",
    color: "#EA580C",
    stat: "200+",
    statLabel: "Bundles to confuse you",
  },
];

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 cursor-default overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(400px circle at 50% 50%, ${problem.color}08, transparent)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${problem.color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${problem.color}15` }}
        >
          <problem.icon className="w-6 h-6" style={{ color: problem.color }} />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90">
          {problem.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          {problem.description}
        </p>

        {/* Stat */}
        <div className="pt-4 border-t border-white/5">
          <p className="text-2xl font-bold" style={{ color: problem.color }}>
            {problem.stat}
          </p>
          <p className="text-white/30 text-xs mt-1">{problem.statLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" data-section="problem" className="relative py-24 sm:py-32 bg-[#09090B]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-6">
              The Problem
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We&apos;re Done Playing
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              By Their Rules.
            </span>
          </motion.h2>
          <motion.p
            className="text-white/50 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kenyan telecoms have been running the same playbook for years.
            We&apos;re here to break it.
          </motion.p>
        </div>

        {/* Problem cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>

        {/* Bundle Destroyer Mini-Game */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <p className="text-white/40 text-sm uppercase tracking-wider font-mono">
              Tired of expiry? Take it out on these bundles 👇
            </p>
          </div>
          <BundleDestroyer />
        </motion.div>
      </div>
    </section>
  );
}
