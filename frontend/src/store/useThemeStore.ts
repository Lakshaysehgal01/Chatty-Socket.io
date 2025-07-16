import { create } from "zustand";

interface themeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<themeStore>((set) => ({
  theme: localStorage.getItem("theme") || "black",
  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme: theme });
  },
}));
