"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const GetEsimButton = dynamic(() => import("@/components/landing/GetEsimButton"), { ssr: false });

// const ParticleVortex = dynamic(() => import("@/components/three/ParticleVortex"), { ssr: false });

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section data-section="cta" className="relative py-24 sm:py-32 bg-[#09090B] overflow-hidden">
      {/* 3D Particle Vortex */}
      {/* <ParticleVortex /> */}
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Animated particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-500/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Join 250K+ connected users</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Join The Data
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Revolution.
            </span>
          </h2>

          <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Stop paying for data that expires. Stop being exploited by traditional telecoms.
            The future of connectivity in Kenya starts with you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetEsimButton size="lg" className="group">
              Get eSIM
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GetEsimButton>
            <Button variant="secondary" size="lg">
              Join Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
