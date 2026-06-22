"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap, Flame, Crown } from "lucide-react";

const plans = [
  {
    name: "Rookie",
    icon: Zap,
    price: "KES 499",
    period: "/mo",
    description: "Essential access for getting started",
    features: [
      "No data expiry",
      "Basic speeds (10 Mbps)",
      "Digital support",
      "eSIM included",
      "Usage analytics",
    ],
    highlighted: false,
    color: "#06B6D4",
    cta: "Start Free Trial",
  },
  {
    name: "Hustler",
    icon: Flame,
    price: "KES 999",
    period: "/mo",
    description: "More speed, more flexibility for the grind",
    features: [
      "No data expiry",
      "Fast speeds (50 Mbps)",
      "Priority support",
      "eSIM included",
      "Usage analytics",
      "Hotspot sharing",
      "Referral bonuses",
    ],
    highlighted: true,
    color: "#00FF88",
    cta: "Get Hustler",
  },
  {
    name: "Rebel",
    icon: Crown,
    price: "KES 1,999",
    period: "/mo",
    description: "Truly unlimited. Maximum everything.",
    features: [
      "No data expiry",
      "Maximum speeds (100+ Mbps)",
      "Premium 24/7 support",
      "eSIM included",
      "Advanced analytics",
      "Unlimited hotspot",
      "Referral bonuses",
      "Early access features",
      "Creator perks",
    ],
    highlighted: false,
    color: "#7C3AED",
    cta: "Go Rebel",
  },
];

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-3xl p-[1px] ${
        plan.highlighted
          ? "bg-gradient-to-b from-[#00FF88] via-[#06B6D4] to-[#7C3AED]"
          : "bg-white/[0.06]"
      }`}
    >
      {/* Popular badge */}
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00FF88] text-[#09090B] text-xs font-bold rounded-full">
          MOST POPULAR
        </div>
      )}

      <div
        className={`relative h-full rounded-3xl p-6 sm:p-8 ${
          plan.highlighted
            ? "bg-[#0a0f1a]"
            : "bg-white/[0.02] backdrop-blur-sm"
        }`}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${plan.color}15` }}
        >
          <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
        </div>

        {/* Plan name */}
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-white/40 text-sm mb-6">{plan.description}</p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-white/40">{plan.period}</span>
        </div>

        {/* CTA */}
        <Button
          variant={plan.highlighted ? "primary" : "outline"}
          size="md"
          className="w-full mb-8"
        >
          {plan.cta}
        </Button>

        {/* Features */}
        <div className="space-y-3">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
              <span className="text-white/60 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PlansSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="plans" className="relative py-24 sm:py-32 bg-[#09090B]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#00FF88]/[0.02] blur-[150px] rounded-full" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-full text-[#00FF88] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Simple Pricing
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Pick Your Level.
          </motion.h2>
          <motion.p
            className="text-white/50 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            No contracts. No hidden fees. Cancel anytime.
            Every plan includes unlimited data that never expires.
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
