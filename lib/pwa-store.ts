import { create } from "zustand";

type AppDemoState = {
  activeScreen: number;
  setActiveScreen: (index: number) => void;
  direction: number;
  setDirection: (dir: number) => void;
};

export const useAppDemoStore = create<AppDemoState>((set) => ({
  activeScreen: 0,
  setActiveScreen: (index) => set({ activeScreen: index }),
  direction: 0,
  setDirection: (dir) => set({ direction: dir }),
}));
