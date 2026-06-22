"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Signal, Wifi, Activity } from "lucide-react";

const cities = [
  { name: "Nairobi", x: 52, y: 55, coverage: 98, speed: "95 Mbps", status: "Excellent" },
  { name: "Mombasa", x: 60, y: 72, coverage: 95, speed: "85 Mbps", status: "Excellent" },
  { name: "Kisumu", x: 35, y: 48, coverage: 92, speed: "75 Mbps", status: "Strong" },
  { name: "Nakuru", x: 45, y: 48, coverage: 94, speed: "80 Mbps", status: "Excellent" },
  { name: "Eldoret", x: 40, y: 38, coverage: 90, speed: "70 Mbps", status: "Strong" },
];

function CityPin({
  city,
  index,
  isSelected,
  onSelect,
}: {
  city: (typeof cities)[0];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      className="absolute group"
      style={{ left: `${city.x}%`, top: `${city.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
      onClick={onSelect}
      aria-label={`Select ${city.name}`}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 -m-3 rounded-full bg-[#00FF88]/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />

      {/* Pin */}
      <div
        className={`relative w-4 h-4 rounded-full transition-all cursor-pointer ${
          isSelected
            ? "bg-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.5)]"
            : "bg-[#00FF88]/60 group-hover:bg-[#00FF88] group-hover:shadow-[0_0_10px_rgba(0,255,136,0.3)]"
        }`}
      >
        <div className="absolute inset-1 rounded-full bg-[#09090B]" />
        <div className="absolute inset-[5px] rounded-full bg-[#00FF88]" />
      </div>

      {/* Label */}
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap font-medium group-hover:text-white transition-colors">
        {city.name}
      </span>
    </motion.button>
  );
}

export default function CoverageMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCity, setSelectedCity] = useState(0);

  const city = cities[selectedCity];

  return (
    <section id="coverage" className="relative py-24 sm:py-32 bg-[#09090B]">
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
          {/* Map */}
          <motion.div
            className="relative aspect-square max-w-md mx-auto w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Kenya outline (simplified) */}
            <div className="absolute inset-0 rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,255,136,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Country shape hint */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10">
                <path
                  d="M30 20 L55 15 L70 25 L75 35 L65 50 L70 65 L60 80 L45 85 L35 75 L25 60 L30 45 L28 30 Z"
                  fill="none"
                  stroke="#00FF88"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Coverage gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00FF88]/5 via-transparent to-[#06B6D4]/5 rounded-3xl" />

              {/* City pins */}
              {cities.map((c, i) => (
                <CityPin
                  key={c.name}
                  city={c}
                  index={i}
                  isSelected={i === selectedCity}
                  onSelect={() => setSelectedCity(i)}
                />
              ))}
            </div>
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
