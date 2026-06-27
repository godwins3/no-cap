"use client";

import dynamic from "next/dynamic";

const AchievementToast = dynamic(() => import("@/components/gamification/AchievementToast"), { ssr: false });
const ScrollTracker = dynamic(() => import("@/components/gamification/ScrollTracker"), { ssr: false });

export default function GameProviders() {
  return (
    <>
      <AchievementToast />
      <ScrollTracker />
    </>
  );
}
