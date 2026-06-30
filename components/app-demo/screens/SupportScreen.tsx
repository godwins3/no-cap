"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

const suggestions = [
  "Why is my speed slow?",
  "Upgrade my plan",
  "Show today's usage",
  "Activate roaming",
];

const messages = [
  { role: "bot", content: "Hey Praise! 👋 I'm your nocap assistant. How can I help you today?" },
  { role: "user", content: "Why is my speed slow?" },
  { role: "bot", content: "I checked your connection — you're currently on a congested tower in Westlands. Speed should normalize in ~15 minutes. Want me to switch you to a nearby tower?" },
];

export default function SupportScreen() {
  const [showTyping, setShowTyping] = useState(true);

  return (
    <div className="h-full flex flex-col bg-[#09090B] pb-20">
      <div className="h-12 flex-shrink-0" />

      {/* Header */}
      <div className="px-5 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#09090B]" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">nocap AI</p>
            <p className="text-emerald-400 text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Always online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[11px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#F97316] text-[#09090B] rounded-br-sm"
                  : "bg-white/[0.05] border border-white/[0.08] text-white/80 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-5 pb-3">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2">
          {suggestions.map((s, i) => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-[9px] hover:border-[#F97316]/30 hover:text-white/70 transition-colors"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              {s}
            </motion.button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5">
            <span className="text-white/20 text-[11px]">Ask anything...</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5 text-[#09090B]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
