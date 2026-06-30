"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface UsageRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  value?: string;
}

export function UsageRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  label,
  value,
}: UsageRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSpring(0, { stiffness: 60, damping: 20 });
  const strokeDashoffset = useTransform(
    progress,
    (v) => circumference - (v / 100) * circumference
  );

  useEffect(() => {
    progress.set(percentage);
  }, [percentage, progress]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {value && <span className="text-white text-lg font-bold">{value}</span>}
        {label && <span className="text-white/40 text-[9px]">{label}</span>}
      </div>
    </div>
  );
}

interface CountUpProps {
  target: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({ target, suffix = "", className = "", duration = 1.5 }: CountUpProps) {
  const motionValue = useSpring(0, { duration: duration * 1000 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    motionValue.set(target);
    const unsubscribe = motionValue.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString());
    });
    return unsubscribe;
  }, [target, motionValue]);

  return <span className={className}>{display}{suffix}</span>;
}

interface LineChartProps {
  data: number[];
  height?: number;
  className?: string;
}

export function LineChart({ data, height = 60, className = "" }: LineChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 10) - 5;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaD}
        fill="url(#area-grad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#line-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

interface DonutChartProps {
  segments: { value: number; color: string; label: string }[];
  size?: number;
}

export function DonutChart({ segments, size = 100 }: DonutChartProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <svg width={size} height={size} className="-rotate-90">
      {segments.map((seg, i) => {
        const segLen = (seg.value / total) * circumference;
        const offset = circumference - accumulated;
        accumulated += segLen;
        return (
          <motion.circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${segLen - 2} ${circumference - segLen + 2}`}
            strokeDashoffset={offset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          />
        );
      })}
    </svg>
  );
}
