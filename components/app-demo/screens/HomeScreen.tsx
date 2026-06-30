"use client";

import { motion } from "framer-motion";
import { Wifi, Plus, Users, Headphones, ChevronRight, Zap } from "lucide-react";
import { UsageRing, CountUp } from "../AnimatedCharts";

const quickActions = [
  { icon: Plus, label: "Buy Add-ons" },
  { icon: Zap, label: "Upgrade Plan" },
  { icon: Users, label: "Invite Friends" },
  { icon: Headphones, label: "Support" },
];

export default function HomeScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      {/* Status bar spacing */}
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Greeting */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/40 text-xs">Good Afternoon</p>
            <p className="text-white text-lg font-semibold">Praise 👋</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
            <span className="text-xs font-bold text-[#09090B]">P</span>
          </div>
        </div>

        {/* Plan status card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl p-4 mb-5 border border-[#F97316]/20 bg-gradient-to-br from-[#F97316]/10 via-[#EA580C]/5 to-transparent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[#F97316] text-[10px] font-semibold tracking-wider uppercase">Unlimited Plan</p>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-medium">
              ACTIVE
            </span>
          </div>
          <p className="text-white text-sm font-medium mb-3">REBEL Unlimited</p>

          <div className="flex items-center justify-center my-3">
            <UsageRing percentage={75} size={100} value="487" label="GB USED" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-center">
              <p className="text-white/30 text-[9px] uppercase">Remaining</p>
              <p className="text-white text-sm font-semibold">
                <CountUp target={23} suffix=" days" />
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/30 text-[9px] uppercase">Speed</p>
              <p className="text-white text-sm font-semibold">
                <CountUp target={278} suffix=" Mbps" />
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/30 text-[9px] uppercase">Network</p>
              <p className="text-emerald-400 text-sm font-semibold">Excellent</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-4 gap-2 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F97316]/20 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                <action.icon className="w-4 h-4 text-white/60" />
              </div>
              <span className="text-[9px] text-white/40 text-center leading-tight">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Network Status */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/50 text-xs font-medium">Network Health</p>
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-end gap-[3px] h-10">
            {[40, 65, 50, 80, 70, 90, 75, 85, 60, 95, 88, 72].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-[#EA580C]/40 to-[#F97316]/80"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.4 + i * 0.03, duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
