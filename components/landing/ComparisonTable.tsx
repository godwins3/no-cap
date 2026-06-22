"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Bundle Expiry",
    traditional: "24-48hr expiry",
    ours: "Never expires",
  },
  {
    feature: "Hidden Fees",
    traditional: "Mystery deductions",
    ours: "Zero hidden fees",
  },
  {
    feature: "Unlimited Data",
    traditional: "Fair usage caps",
    ours: "Truly unlimited",
  },
  {
    feature: "eSIM Activation",
    traditional: "Visit store, queue",
    ours: "Instant digital",
  },
  {
    feature: "Customer Support",
    traditional: "Wait 2+ hours",
    ours: "AI + Human, instant",
  },
  {
    feature: "Transparency",
    traditional: "Complex T&Cs",
    ours: "Clear, simple pricing",
  },
];

export default function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090B]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF88]/[0.01] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-full text-[#00FF88] text-sm font-medium mb-6">
              The Difference
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Traditional Telcos vs{" "}
            <span className="text-[#00FF88]">Us</span>
          </motion.h2>
          <motion.p
            className="text-white/50 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how we stack up against the networks that have been profiting from your frustration.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 border-b border-white/5">
            <div className="text-white/40 text-sm font-medium">Feature</div>
            <div className="text-center">
              <span className="text-red-400/80 text-sm font-medium">Traditional Telcos</span>
            </div>
            <div className="text-center">
              <span className="text-[#00FF88] text-sm font-medium">nocap</span>
            </div>
          </div>

          {/* Comparison rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="grid grid-cols-3 gap-4 p-4 sm:p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-white font-medium text-sm sm:text-base">
                {row.feature}
              </div>
              <div className="flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-white/40 text-xs sm:text-sm text-center">
                  {row.traditional}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#00FF88] flex-shrink-0" />
                <span className="text-white/70 text-xs sm:text-sm text-center">
                  {row.ours}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
