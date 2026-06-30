"use client";

import { motion } from "framer-motion";
import { Copy, Share2, Users, Gift, TrendingUp } from "lucide-react";
import { UsageRing } from "../AnimatedCharts";

export default function ReferralScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-5">
          <p className="text-white/40 text-xs mb-1">Invite & Earn</p>
          <p className="text-white text-xl font-bold">Referrals</p>
        </div>

        {/* Referral Code Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl p-5 mb-5 border border-[#F97316]/20 bg-gradient-to-br from-[#F97316]/10 to-transparent"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">Your Referral Code</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-[#09090B]/60 border border-white/10 rounded-lg px-4 py-2.5">
              <p className="text-white text-lg font-mono font-bold tracking-wider">REBEL-9472</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center"
            >
              <Copy className="w-4 h-4 text-white/60" />
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F97316] text-[#09090B] text-sm font-semibold"
          >
            <Share2 className="w-4 h-4" />
            Share Invite Link
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <Users className="w-4 h-4 text-[#F97316] mx-auto mb-2" />
            <p className="text-white text-xl font-bold">14</p>
            <p className="text-white/30 text-[9px]">Friends Joined</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <Gift className="w-4 h-4 text-[#F97316] mx-auto mb-2" />
            <p className="text-white text-xl font-bold">KES 4,200</p>
            <p className="text-white/30 text-[9px]">Rewards Earned</p>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Progress to next reward</p>
            <TrendingUp className="w-3.5 h-3.5 text-[#F97316]" />
          </div>
          <div className="flex items-center justify-center mb-3">
            <UsageRing percentage={70} size={90} strokeWidth={6} value="14/20" label="REFERRALS" />
          </div>
          <p className="text-center text-white/40 text-[10px]">
            6 more friends to unlock <span className="text-[#F97316] font-medium">Free Month</span>
          </p>
        </motion.div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Recent</p>
          <div className="space-y-2">
            {["Marion K.", "James O.", "Faith W."].map((name, i) => (
              <div key={name} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F97316]/50 to-[#EA580C]/30 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">{name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-[10px] font-medium">{name}</p>
                  <p className="text-white/30 text-[9px]">{["2 days ago", "5 days ago", "1 week ago"][i]}</p>
                </div>
                <span className="text-emerald-400 text-[9px] font-medium">+KES 300</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
