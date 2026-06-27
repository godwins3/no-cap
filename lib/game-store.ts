import { create } from "zustand";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
};

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_scroll", title: "Mwanzo 🚀", description: "You started scrolling — no going back", icon: "🚀", xp: 10 },
  { id: "problem_found", title: "Macho Open 👁️", description: "You see the problem now", icon: "👁️", xp: 25 },
  { id: "bundle_smasher", title: "Bundle Smasher 💥", description: "Destroyed your first expiring bundle", icon: "💥", xp: 50 },
  { id: "combo_5", title: "Combo x5 🔥", description: "5 bundles smashed in a row!", icon: "🔥", xp: 75 },
  { id: "combo_10", title: "Mwitu Mode 🦁", description: "10 combo — you're unstoppable", icon: "🦁", xp: 150 },
  { id: "plan_viewer", title: "Window Shopper 🛒", description: "Checked out the plans", icon: "🛒", xp: 15 },
  { id: "globe_spinner", title: "Dunia Nzima 🌍", description: "Explored the coverage globe", icon: "🌍", xp: 20 },
  { id: "stats_seen", title: "Data Nerd 📊", description: "You checked the stats — respect", icon: "📊", xp: 15 },
  { id: "cta_reached", title: "Almost There 🏁", description: "You made it to the end", icon: "🏁", xp: 30 },
  { id: "rebel_curious", title: "Rebel Vibes 👑", description: "Hovered on the Rebel plan", icon: "👑", xp: 20 },
];

type GameState = {
  xp: number;
  level: number;
  unlockedAchievements: string[];
  pendingToast: Achievement | null;
  comboCount: number;
  lastSmashTime: number;
  totalSmashed: number;
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  clearToast: () => void;
  recordSmash: () => void;
  resetCombo: () => void;
};

function getLevel(xp: number): number {
  if (xp >= 400) return 5;
  if (xp >= 250) return 4;
  if (xp >= 150) return 3;
  if (xp >= 50) return 2;
  return 1;
}

export const useGameStore = create<GameState>((set, get) => ({
  xp: 0,
  level: 1,
  unlockedAchievements: [],
  pendingToast: null,
  comboCount: 0,
  lastSmashTime: 0,
  totalSmashed: 0,

  addXP: (amount: number) => {
    set((state) => {
      const newXP = state.xp + amount;
      return { xp: newXP, level: getLevel(newXP) };
    });
  },

  unlockAchievement: (id: string) => {
    const state = get();
    if (state.unlockedAchievements.includes(id)) return;

    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return;

    set((s) => ({
      unlockedAchievements: [...s.unlockedAchievements, id],
      pendingToast: achievement,
      xp: s.xp + achievement.xp,
      level: getLevel(s.xp + achievement.xp),
    }));
  },

  clearToast: () => set({ pendingToast: null }),

  recordSmash: () => {
    const now = Date.now();
    const state = get();
    const timeSinceLastSmash = now - state.lastSmashTime;
    const newCombo = timeSinceLastSmash < 2000 ? state.comboCount + 1 : 1;
    const newTotal = state.totalSmashed + 1;

    set({ comboCount: newCombo, lastSmashTime: now, totalSmashed: newTotal });

    // Combo achievements
    if (newCombo === 5) get().unlockAchievement("combo_5");
    if (newCombo === 10) get().unlockAchievement("combo_10");

    // First smash
    if (newTotal === 1) get().unlockAchievement("bundle_smasher");
  },

  resetCombo: () => set({ comboCount: 0 }),
}));

export { ACHIEVEMENTS };
