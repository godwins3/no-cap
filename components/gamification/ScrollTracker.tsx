"use client";

import { useGameStore } from "@/lib/game-store";
import { useEffect, useRef } from "react";

/**
 * Invisible component that listens to scroll position
 * and unlocks achievements as users explore the page.
 */
export default function ScrollTracker() {
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const triggered = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sections: { selector: string; achievement: string; threshold: number }[] = [
      { selector: "[data-section='problem']", achievement: "problem_found", threshold: 0.3 },
      { selector: "[data-section='plans']", achievement: "plan_viewer", threshold: 0.3 },
      { selector: "[data-section='coverage']", achievement: "globe_spinner", threshold: 0.3 },
      { selector: "[data-section='stats']", achievement: "stats_seen", threshold: 0.3 },
      { selector: "[data-section='cta']", achievement: "cta_reached", threshold: 0.3 },
    ];

    // First scroll achievement
    let hasScrolled = false;
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        hasScrolled = true;
        unlockAchievement("first_scroll");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection observers for section-based achievements
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ selector, achievement, threshold }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !triggered.current.has(achievement)) {
              triggered.current.add(achievement);
              unlockAchievement(achievement);
            }
          });
        },
        { threshold }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [unlockAchievement]);

  return null;
}
