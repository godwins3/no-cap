"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LineChart, DonutChart } from "../AnimatedCharts";

const tabs = ["Daily", "Weekly", "Monthly"];

const dailyData = [12, 18, 14, 22, 19, 25, 20, 28, 24, 30, 27, 35];
const weeklyData = [85, 110, 95, 130, 120, 145, 135];
const monthlyData = [320, 380, 420, 487];

const topApps = [
  { label: "TikTok", value: 38, color: "#F97316" },
  { label: "Instagram", value: 22, color: "#EA580C" },
  { label: "YouTube", value: 20, color: "#c2410c" },
  { label: "WhatsApp", value: 12, color: "#9a3412" },
  { label: "Gaming", value: 8, color: "#7c2d12" },
];

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const dataMap = [dailyData, weeklyData, monthlyData];

  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-5">
          <p className="text-white/40 text-xs mb-1">Your Data</p>
          <p className="text-white text-xl font-bold">Usage Analytics</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg mb-5">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
                activeTab === i
                  ? "bg-[#F97316] text-[#09090B]"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Line Chart */}
        <motion.div
          key={activeTab}
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/50 text-[10px] uppercase tracking-wider">
              {tabs[activeTab]} Usage
            </p>
            <p className="text-white text-xs font-semibold">487 GB</p>
          </div>
          <LineChart data={dataMap[activeTab]} height={50} />
        </motion.div>

        {/* Top Apps */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-4">Top Apps</p>

          <div className="flex items-center gap-4">
            <DonutChart segments={topApps} size={80} />
            <div className="flex-1 space-y-2">
              {topApps.map((app, i) => (
                <motion.div
                  key={app.label}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: app.color }} />
                    <span className="text-white/60 text-[10px]">{app.label}</span>
                  </div>
                  <span className="text-white/80 text-[10px] font-medium">{app.value}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 mt-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Usage Heatmap</p>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const intensity = Math.random();
              return (
                <motion.div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{
                    backgroundColor: `rgba(249, 115, 22, ${0.1 + intensity * 0.6})`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.015 }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/30 text-[8px]">Less</span>
            <span className="text-white/30 text-[8px]">More</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
