"use client";

import { motion } from "framer-motion";
import { MessageCircle, TrendingUp, Users, Trophy, Calendar, ThumbsUp } from "lucide-react";

const trendingPosts = [
  { user: "Kev_254", content: "Just hit 1TB streamed this month 🔥", likes: 234, time: "2h" },
  { user: "aisha.ke", content: "nocap > every other carrier. Period.", likes: 189, time: "4h" },
  { user: "dev_brian", content: "The eSIM setup was literally 30 seconds", likes: 156, time: "6h" },
];

const ambassadors = [
  { name: "Grace M.", campus: "UoN", points: "12.4k XP" },
  { name: "Alex K.", campus: "JKUAT", points: "11.2k XP" },
  { name: "Wanjiku N.", campus: "Strathmore", points: "10.8k XP" },
];

export default function CommunityScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-5">
          <p className="text-white/40 text-xs mb-1">Connect</p>
          <p className="text-white text-xl font-bold">Community</p>
        </div>

        {/* Quick Stats */}
        <motion.div
          className="flex gap-2 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-white text-sm font-bold">24.5k</p>
            <p className="text-white/30 text-[9px]">Members</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-white text-sm font-bold">1.2k</p>
            <p className="text-white/30 text-[9px]">Online</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 text-center">
            <p className="text-[#F97316] text-sm font-bold">89</p>
            <p className="text-[#F97316]/50 text-[9px]">Events</p>
          </div>
        </motion.div>

        {/* Trending */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-[#F97316]" />
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Trending</p>
          </div>
          <div className="space-y-2">
            {trendingPosts.map((post, i) => (
              <motion.div
                key={i}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C]" />
                    <span className="text-white text-[10px] font-medium">@{post.user}</span>
                  </div>
                  <span className="text-white/20 text-[9px]">{post.time}</span>
                </div>
                <p className="text-white/60 text-[11px] mb-2">{post.content}</p>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-white/30" />
                  <span className="text-white/30 text-[9px]">{post.likes}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Campus Ambassadors */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#F97316]" />
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Leaderboard</p>
          </div>
          <div className="space-y-2">
            {ambassadors.map((amb, i) => (
              <div key={amb.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                <span className="text-white/30 text-[10px] font-mono w-4">{i + 1}.</span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F97316]/60 to-[#EA580C]/40" />
                <div className="flex-1">
                  <p className="text-white text-[10px] font-medium">{amb.name}</p>
                  <p className="text-white/30 text-[9px]">{amb.campus}</p>
                </div>
                <span className="text-[#F97316] text-[10px] font-medium">{amb.points}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Poll */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <p className="text-white text-xs font-medium mb-3">🗳️ What feature next?</p>
          {["Family Plans", "Student Discount", "Gaming Mode"].map((option, i) => (
            <div key={option} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/60 text-[10px]">{option}</span>
                <span className="text-white/30 text-[9px]">{[42, 35, 23][i]}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#EA580C] to-[#F97316] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${[42, 35, 23][i]}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
