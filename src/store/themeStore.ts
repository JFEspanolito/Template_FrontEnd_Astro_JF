import { atom } from "nanostores";

export const THEMES = [
  "default",
  "dark",
  "black",
  "pink",
  "blue",
  "yellow",
] as const;
export type Theme = (typeof THEMES)[number];

/** Color shown on the toggle button to preview the NEXT theme */
export const THEME_PREVIEW_COLORS: Record<Theme, string> = {
  default: "#ffffff",
  dark: "#252b30",
  black: "#000000",
  pink: "#ffabc8",
  blue: "#7ec6ff",
  yellow: "#ffd65a",
};

function getStoredTheme(): Theme {
  if (typeof localStorage === "undefined") return "default";
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored && THEMES.includes(stored) ? stored : "default";
}

export const $theme = atom<Theme>(getStoredTheme());

/** Returns the next theme in the cycle */
export function getNextTheme(current: Theme): Theme {
  const idx = THEMES.indexOf(current);
  return THEMES[(idx + 1) % THEMES.length];
}
