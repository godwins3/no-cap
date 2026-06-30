"use client";

import { motion } from "framer-motion";
import { Wifi, AlertTriangle, Activity, Globe } from "lucide-react";

const stats = [
  { label: "Coverage", value: "97.2%", icon: Globe, color: "text-emerald-400" },
  { label: "Avg Speed", value: "185 Mbps", icon: Activity, color: "text-[#F97316]" },
  { label: "Latency", value: "12ms", icon: Wifi, color: "text-emerald-400" },
  { label: "Outages", value: "0", icon: AlertTriangle, color: "text-emerald-400" },
];

// Simplified Kenya map points (major cities)
const mapPoints = [
  { x: 55, y: 25, label: "Nairobi", strength: 1 },
  { x: 48, y: 15, label: "Nakuru", strength: 0.9 },
  { x: 60, y: 10, label: "Meru", strength: 0.8 },
  { x: 40, y: 5, label: "Kisumu", strength: 0.85 },
  { x: 62, y: 45, label: "Mombasa", strength: 0.95 },
  { x: 45, y: 30, label: "Naivasha", strength: 0.7 },
  { x: 55, y: 55, label: "Malindi", strength: 0.6 },
  { x: 35, y: 20, label: "Eldoret", strength: 0.75 },
  { x: 50, y: 40, label: "Machakos", strength: 0.8 },
  { x: 70, y: 20, label: "Garissa", strength: 0.5 },
];

export default function NetworkScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-5">
          <p className="text-white/40 text-xs mb-1">Live Status</p>
          <p className="text-white text-xl font-bold">Network Health</p>
        </div>

        {/* Status Badge */}
        <motion.div
          className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">All Systems Operational</span>
        </motion.div>

        {/* Map */}
        <motion.div
          className="relative w-full aspect-[4/5] mb-5 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Kenya outline (simplified) */}
          <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full p-4">
            <motion.path
              d="M40 2 L60 2 L72 10 L75 25 L70 35 L65 50 L60 65 L55 68 L50 60 L45 55 L40 45 L35 35 L30 20 L35 10 Z"
              fill="none"
              stroke="rgba(249,115,22,0.2)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
          </svg>

          {/* Coverage points */}
          {mapPoints.map((point, i) => (
            <motion.div
              key={point.label}
              className="absolute"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-[#F97316]/20"
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
              {/* Point */}
              <div
                className="w-2.5 h-2.5 rounded-full border border-[#F97316]/50"
                style={{
                  backgroundColor: `rgba(249, 115, 22, ${point.strength})`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.08 }}
            >
              <stat.icon className={`w-3.5 h-3.5 ${stat.color} mb-2`} />
              <p className="text-white text-sm font-bold">{stat.value}</p>
              <p className="text-white/30 text-[9px]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
