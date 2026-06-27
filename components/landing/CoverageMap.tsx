"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Signal, Wifi, Activity } from "lucide-react";
import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("@/components/three/GlobeScene"), { ssr: false });

const cities = [
  { name: "Nairobi", coverage: 98, speed: "95 Mbps", status: "Excellent" },
  { name: "Mombasa", coverage: 95, speed: "85 Mbps", status: "Excellent" },
  { name: "Kisumu", coverage: 92, speed: "75 Mbps", status: "Strong" },
  { name: "Nakuru", coverage: 94, speed: "80 Mbps", status: "Excellent" },
  { name: "Eldoret", coverage: 90, speed: "70 Mbps", status: "Strong" },
];

export default function CoverageMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCity, setSelectedCity] = useState(0);

  const city = cities[selectedCity];

  return (
    <section id="coverage" data-section="coverage" className="relative py-24 sm:py-32 bg-[#09090B]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#06B6D4]/5 blur-[120px] rounded-full" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full text-[#06B6D4] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Network Coverage
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Everywhere You Are.
          </motion.h2>
          <motion.p
            className="text-white/50 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            High-speed coverage across Kenya&apos;s major cities and growing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 3D Globe */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <GlobeScene />
          </motion.div>

          {/* City details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* City selector pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {cities.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCity(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    i === selectedCity
                      ? "bg-[#00FF88] text-[#09090B]"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                <Signal className="w-5 h-5 text-[#00FF88] mb-2" />
                <p className="text-2xl font-bold text-white">{city.coverage}%</p>
                <p className="text-white/40 text-sm">Coverage</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                <Wifi className="w-5 h-5 text-[#06B6D4] mb-2" />
                <p className="text-2xl font-bold text-white">{city.speed}</p>
                <p className="text-white/40 text-sm">Avg Speed</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                <Activity className="w-5 h-5 text-[#7C3AED] mb-2" />
                <p className="text-2xl font-bold text-white">{city.status}</p>
                <p className="text-white/40 text-sm">Network Health</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                <MapPin className="w-5 h-5 text-[#FFB800] mb-2" />
                <p className="text-2xl font-bold text-white">{city.name}</p>
                <p className="text-white/40 text-sm">Selected City</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
