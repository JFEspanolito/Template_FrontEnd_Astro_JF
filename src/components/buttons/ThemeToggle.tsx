"use client";
import { useStore } from "@nanostores/react";
import { $theme, type Theme } from "@/store/themeStore";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const theme = useStore($theme);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (currentTheme: Theme) => {
      const resolved = currentTheme === "system" 
        ? (mediaQuery.matches ? "dark" : "light") 
        : currentTheme;

      if (resolved === "dark") root.classList.add("dark");
      else root.classList.remove("dark");

      // Sincronizar Cookie para el próximo SSR
      const oneYear = 365 * 24 * 60 * 60;
      document.cookie = `theme=${currentTheme}; path=/; max-age=${oneYear}; SameSite=Lax`;
      localStorage.setItem("theme", currentTheme);
    };

    applyTheme(theme);

    const handleSystemChange = () => { if (theme === "system") applyTheme("system"); };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const themes = [
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Oscuro" },
    { value: "system", icon: Monitor, label: "Sistema" },
  ] as const;

  return (
    <div className="flex gap-2 p-1 rounded-lg bg-[var(--btn-secondary)]">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => $theme.set(value)}
          className={`p-2 rounded-md transition-all ${
            theme === value ? "bg-[var(--btn-primary)] shadow-soft text-[var(--btn-text-primary)]" : "text-[var(--btn-text-secondary)]"
          }`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}