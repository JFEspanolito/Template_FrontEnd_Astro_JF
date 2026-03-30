"use client";
import { useStore } from "@nanostores/react";
import {
  $theme,
  THEMES,
  THEME_PREVIEW_COLORS,
  type Theme,
} from "@/store/themeStore";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const theme = useStore($theme);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    // Persist to cookie + localStorage
    const oneYear = 365 * 24 * 60 * 60;
    document.cookie = `theme=${theme}; path=/; max-age=${oneYear}; SameSite=Lax`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const selectTheme = (selectedTheme: Theme) => {
    $theme.set(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div ref={panelRef} className="relative inline-flex">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Theme selector"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="Theme selector"
        className="
          inline-flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-black
          bg-white
          text-black
          shadow-[0_8px_20px_-14px_rgba(0,0,0,0.45)]
          transition-[transform,box-shadow,border-color]
          duration-300
          ease-[cubic-bezier(0.16,1,0.3,1)]
          hover:-translate-y-0.5
          hover:border-[var(--border-highlight-one)]
          hover:shadow-[0_12px_24px_-16px_rgba(0,0,0,0.55)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--border-highlight-one)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--color-background)]
          active:scale-95
          cursor-pointer
        "
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a9 9 0 1 0 9 9c0-1.6-1.2-2.8-2.8-2.8h-2.1a2.1 2.1 0 0 0-2.1 2.1c0 1.2.9 2.1 2.1 2.1h.5a1.8 1.8 0 0 1 0 3.6A8.9 8.9 0 0 1 12 21" />
          <circle cx="7.5" cy="10" r="1" />
          <circle cx="10" cy="7.3" r="1" />
          <circle cx="14" cy="7.3" r="1" />
        </svg>
        <span className="sr-only">Open theme selector</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Theme selector panel"
          className="
            absolute
            right-0
            top-[calc(100%+10px)]
            z-[120]
            w-52
            rounded-2xl
            border
            border-black/10
            bg-white
            p-2
            text-black
            shadow-[0_16px_40px_-22px_rgba(0,0,0,0.45)]
          "
        >
          <p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black/55">Theme selector</p>

          <div className="space-y-1">
            {THEMES.map((themeOption) => {
              const isActive = theme === themeOption;

              return (
                <button
                  key={themeOption}
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => selectTheme(themeOption)}
                  className="
                    inline-flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-2.5
                    py-2
                    text-left
                    text-sm
                    font-semibold
                    transition-colors
                    hover:bg-black/5
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-black/25
                  "
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full border border-black/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]"
                    style={{ backgroundColor: THEME_PREVIEW_COLORS[themeOption] }}
                  />

                  <span className="capitalize">{themeOption}</span>

                  {isActive && <span className="ml-auto text-xs font-bold text-black/60">Active</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
