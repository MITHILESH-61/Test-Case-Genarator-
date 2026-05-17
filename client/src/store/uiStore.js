import { create } from 'zustand';

const initialDarkMode = localStorage.getItem('tcg_dark_mode') === 'true';

export const useUiStore = create((set, get) => ({
  darkMode: initialDarkMode,
  toggleDarkMode: () => {
    const darkMode = !get().darkMode;
    localStorage.setItem('tcg_dark_mode', String(darkMode));
    set({ darkMode });
  }
}));

