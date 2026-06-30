"use client";

import { motion } from "framer-motion";
import { Star, Flame, Zap, Users, Gift, Tag, ShoppingBag } from "lucide-react";
import { UsageRing } from "../AnimatedCharts";

const achievements = [
  { icon: "🔥", title: "Streamed 1TB", desc: "Heavy streamer badge" },
  { icon: "⚡", title: "30 Days Active", desc: "Consistency is key" },
  { icon: "👥", title: "Invited 10 Friends", desc: "Community builder" },
];

const rewards = [
  { icon: Gift, label: "Free Month", points: "2,000 XP" },
  { icon: ShoppingBag, label: "Merchandise", points: "3,500 XP" },
  { icon: Tag, label: "Discount Coupons", points: "800 XP" },
];

export default function RewardsScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-5">
          <p className="text-white/40 text-xs mb-1">Your Rewards</p>
          <p className="text-white text-xl font-bold">Freedom Points</p>
        </div>

        {/* XP Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl p-5 mb-5 border border-[#F97316]/20 bg-gradient-to-br from-[#F97316]/10 to-transparent"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#F97316] text-[10px] font-semibold tracking-wider uppercase">Total Points</p>
              <p className="text-white text-3xl font-bold mt-1">5,200 <span className="text-sm text-[#F97316]">XP</span></p>
            </div>
            <UsageRing percentage={65} size={60} strokeWidth={5} label="LVL 4" />
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/40 text-[9px]">Level 4</span>
              <span className="text-white/40 text-[9px]">Level 5</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#EA580C] to-[#F97316] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Achievements</p>
          <div className="space-y-2">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
              >
                <span className="text-xl">{ach.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-xs font-medium">{ach.title}</p>
                  <p className="text-white/30 text-[10px]">{ach.desc}</p>
                </div>
                <Star className="w-3.5 h-3.5 text-[#F97316]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Redeem</p>
          <div className="space-y-2">
            {rewards.map((reward, i) => (
              <motion.button
                key={reward.label}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F97316]/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
                  <reward.icon className="w-4 h-4 text-[#F97316]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-xs font-medium">{reward.label}</p>
                  <p className="text-white/30 text-[10px]">{reward.points}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
