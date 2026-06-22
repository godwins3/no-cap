"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Megaphone, Gift, Heart, Star, Trophy } from "lucide-react";

const features = [
  {
    icon: Megaphone,
    title: "Campus Ambassadors",
    description: "Rep nocap on your campus. Get free data, merch, and exclusive access.",
    color: "#00FF88",
  },
  {
    icon: Star,
    title: "Creator Partnerships",
    description: "Content creators get special plans and earn from referrals.",
    color: "#7C3AED",
  },
  {
    icon: Gift,
    title: "Community Rewards",
    description: "Earn points for referrals, feedback, and engagement. Redeem for data.",
    color: "#06B6D4",
  },
];

const socialProof = [
  {
    name: "@techie_ken",
    text: "Finally a telco that gets us. No more 3am bundle expiry stress 😭🔥",
    avatar: "TK",
    role: "Tech Creator",
  },
  {
    name: "@campus_queen",
    text: "The ambassador program is unmatched. Free unlimited for repping what I already love.",
    avatar: "CQ",
    role: "UoN Student",
  },
  {
    name: "@dev_brian",
    text: "Switched 3 weeks ago. Haven't bought a bundle since. This is the future.",
    avatar: "DB",
    role: "Software Dev",
  },
];

export default function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="community" className="relative py-24 sm:py-32 bg-[#09090B]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 blur-[120px] rounded-full" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full text-[#7C3AED] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Community
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Built For Us.{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              By Us.
            </span>
          </motion.h2>
          <motion.p
            className="text-white/50 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            This isn&apos;t just a network. It&apos;s a movement. Join thousands of young Kenyans taking back control.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Social proof cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialProof.map((post, i) => (
            <motion.div
              key={post.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF88]/30 to-[#7C3AED]/30 flex items-center justify-center text-sm font-bold text-white">
                  {post.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{post.name}</p>
                  <p className="text-white/30 text-xs">{post.role}</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{post.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
