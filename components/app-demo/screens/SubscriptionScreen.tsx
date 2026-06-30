"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, Calendar, ChevronRight } from "lucide-react";

const benefits = [
  "Unlimited Data",
  "No Expiry",
  "Zero Hidden Charges",
  "Priority Support",
];

export default function SubscriptionScreen() {
  return (
    <div className="h-full flex flex-col bg-[#09090B] overflow-y-auto pb-20 scrollbar-hide">
      <div className="h-12 flex-shrink-0" />

      <div className="px-5 flex-1">
        {/* Header */}
        <div className="mb-6">
          <p className="text-white/40 text-xs mb-1">Current Plan</p>
          <p className="text-white text-xl font-bold">Subscription</p>
        </div>

        {/* Plan Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl p-5 mb-5 border border-[#F97316]/30 bg-gradient-to-br from-[#F97316]/15 via-[#EA580C]/8 to-[#09090B]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[#F97316] text-[10px] font-semibold tracking-wider uppercase">REBEL Unlimited</p>
                <p className="text-white text-2xl font-bold mt-1">KES 3,000<span className="text-white/40 text-sm font-normal">/month</span></p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 flex items-center justify-center">
                <span className="text-lg">👑</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2.5 mt-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#F97316]" />
                  </div>
                  <span className="text-white/70 text-xs">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Manage Button */}
        <motion.button
          className="w-full py-3 rounded-xl bg-[#F97316] text-[#09090B] text-sm font-semibold mb-5"
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Manage Subscription
        </motion.button>

        {/* Billing Info */}
        <motion.div
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-white/40" />
              <span className="text-white/50 text-xs">Next Billing</span>
            </div>
            <span className="text-white text-xs font-medium">July 15, 2026</span>
          </div>
          <div className="h-px bg-white/[0.06]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-white/40" />
              <span className="text-white/50 text-xs">Payment</span>
            </div>
            <span className="text-white text-xs font-medium">M-PESA •••• 4821</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
