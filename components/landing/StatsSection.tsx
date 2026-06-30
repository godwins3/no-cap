"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Database, Users, Activity, Ban } from "lucide-react";
import dynamic from "next/dynamic";

const FloatingShapes = dynamic(() => import("@/components/three/FloatingShapes"), { ssr: false });

const stats = [
  { icon: Database, value: 12000000, suffix: "+", label: "GB Delivered", prefix: "" },
  { icon: Users, value: 250000, suffix: "+", label: "Users Connected", prefix: "" },
  { icon: Activity, value: 99.8, suffix: "%", label: "Uptime", prefix: "" },
  { icon: Ban, value: 0, suffix: "", label: "Hidden Charges", prefix: "" },
];

function AnimatedCounter({
  value,
  suffix,
  prefix,
  isInView,
}: {
  value: number;
  suffix: string;
  prefix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(value, stepValue * step);
      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isInView, value]);

  const formatValue = (val: number) => {
    if (value >= 1000000) {
      return `${(val / 1000000).toFixed(val === value ? 0 : 1)}M`;
    }
    if (value >= 1000) {
      return `${(val / 1000).toFixed(val === value ? 0 : 1)}K`;
    }
    if (value < 100 && value > 0) {
      return val.toFixed(1);
    }
    return Math.floor(val).toString();
  };

  return (
    <span className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section data-section="stats" className="relative py-24 sm:py-32 bg-[#09090B] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#F97316]/5 blur-[120px] rounded-full" />
      </div>
      <FloatingShapes />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 bg-[#F97316]/10 border border-[#F97316]/20 rounded-full text-[#F97316] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Live Stats
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Numbers Don&apos;t Lie.
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="relative group text-center"
            >
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316]/10 to-[#EA580C]/10 mb-4">
                  <stat.icon className="w-6 h-6 text-[#F97316]" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isInView={isInView}
                  />
                </div>

                {/* Label */}
                <p className="text-white/40 text-sm">{stat.label}</p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#F97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
