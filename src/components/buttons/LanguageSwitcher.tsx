import React, { useState } from "react";

export function LanguageSwitcher() {
  const [currentLang] = useState(() => {
    if (typeof window === "undefined") return "es";
    const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
    return (match?.[1] || "es") as "es" | "en";
  });

  const changeLanguage = (lang: "es" | "en") => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    window.location.reload();
  };

  const btnStyle = (lang: string): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 0.625rem",
    borderRadius: "0.375rem",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    transition: "background-color 0.15s ease, color 0.15s ease",
    border: "1px solid transparent",
    backgroundColor: currentLang === lang ? "var(--btn-primary)" : "transparent",
    color: currentLang === lang ? "var(--btn-text-primary)" : "var(--btn-text-secondary)",
    boxShadow: currentLang === lang ? "var(--shadow-soft)" : "none",
    cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", padding: "0.25rem", borderRadius: "0.5rem", backgroundColor: "var(--btn-secondary)" }}>
      <button onClick={() => changeLanguage("es")} style={btnStyle("es")} aria-label="Español">
        ES
      </button>
      <button onClick={() => changeLanguage("en")} style={btnStyle("en")} aria-label="English">
        EN
      </button>
    </div>
  );
}
