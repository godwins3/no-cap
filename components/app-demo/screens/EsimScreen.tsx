"use client";

import { motion } from "framer-motion";
import { Smartphone, QrCode, ArrowRightLeft, RefreshCw, Wifi } from "lucide-react";

export default function EsimScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-6">
          <p className="text-white/40 text-xs mb-1">Your eSIM</p>
          <p className="text-white text-xl font-bold">Digital SIM</p>
        </div>

        {/* eSIM Illustration */}
        <motion.div
          className="relative mx-auto w-full max-w-[200px] aspect-[3/4] mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F97316]/20 via-[#EA580C]/10 to-transparent border border-[#F97316]/30 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
              <Wifi className="w-6 h-6 text-[#09090B]" />
            </div>
            <div className="text-center">
              <p className="text-white text-sm font-semibold">nocap eSIM</p>
              <p className="text-white/40 text-[10px]">REBEL Unlimited</p>
            </div>
            {/* Chip pattern */}
            <div className="grid grid-cols-3 gap-0.5 w-10 h-8 mt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[2px] bg-[#F97316]/30" />
              ))}
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-[#F97316]/15 blur-xl rounded-full" />
        </motion.div>

        {/* Status */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">Status</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Connected</span>
              </span>
            </div>
            <div className="h-px bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">Phone Number</span>
              <span className="text-white text-xs font-medium">+254 712 345 678</span>
            </div>
            <div className="h-px bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">Activated</span>
              <span className="text-white text-xs font-medium">June 7, 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: QrCode, label: "Download eSIM", desc: "Get QR code" },
            { icon: ArrowRightLeft, label: "Transfer Device", desc: "Move to new phone" },
            { icon: RefreshCw, label: "Replace eSIM", desc: "Get a new profile" },
          ].map((action, i) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F97316]/20 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
                <action.icon className="w-4 h-4 text-[#F97316]" />
              </div>
              <div className="text-left">
                <p className="text-white text-xs font-medium">{action.label}</p>
                <p className="text-white/30 text-[10px]">{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* QR Preview */}
        <motion.div
          className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">QR Preview</p>
          <div className="w-20 h-20 bg-white rounded-lg p-1.5">
            <div className="w-full h-full grid grid-cols-5 gap-[2px]">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${Math.random() > 0.4 ? "bg-[#09090B]" : "bg-transparent"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
