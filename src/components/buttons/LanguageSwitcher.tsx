"use client";
import { useStore } from "@nanostores/react";
import { $lang, type Lang } from "@/store/langStore";

export function LanguageSwitcher() {
  const lang = useStore($lang);

  const changeLanguage = (newLang: Lang) => {
    if (newLang === lang) return;
    
    // 1. Persistencia en Cookie (1 año)
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 2. Actualizamos la Store
    $lang.set(newLang);
    
    // 3. Hard reload necesario en Astro para que el servidor re-renderice el contenido i18n
    window.location.reload();
  };

  const languages = [
    { value: "es", label: "ES" },
    { value: "en", label: "EN" }
  ] as const;

  return (
    <div className="flex gap-1 p-1 rounded-lg bg-[var(--btn-secondary)]">
      {languages.map(({ value, label }) => {
        const isActive = lang === value;
        return (
          <button
            key={value}
            onClick={() => changeLanguage(value)}
            className={`
              inline-flex items-center justify-center 
              px-3 py-2 rounded-md text-xs font-bold tracking-widest transition-all
              ${isActive 
                ? "bg-[var(--btn-primary)] text-[var(--btn-text-primary)] shadow-soft" 
                : "text-[var(--btn-text-secondary)] hover:bg-[var(--border-dim)]"
              }
            `}
            aria-label={`Cambiar a ${label}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}