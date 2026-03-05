"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage === "undefined") return "system";
    return localStorage.getItem("theme") || "system";
  });
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    let systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setResolvedTheme(theme === "system" ? systemTheme : theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      systemTheme = e.matches ? "dark" : "light";
      if (theme === "system") {
        setResolvedTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedTheme]);


  const handleThemeChange = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const themes = [
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Oscuro" },
    { value: "system", icon: Monitor, label: "Sistema" },
  ];

  return (
    <div className="flex gap-2 items-center p-1 rounded-lg" style={{ backgroundColor: "var(--btn-secondary)" }}>
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            onClick={() => handleThemeChange(value)}
            aria-label={label}
            title={label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              transition: "background-color 0.15s ease, color 0.15s ease",
              border: "1px solid transparent",
              backgroundColor: isActive ? "var(--btn-primary)" : "transparent",
              color: isActive ? "var(--btn-text-primary)" : "var(--btn-text-secondary)",
              boxShadow: isActive ? "var(--shadow-soft)" : "none",
            }}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
