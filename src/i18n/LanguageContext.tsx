import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultLang, ui } from "./ui";

type Language = keyof typeof ui;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem("pref-lang") as Language;
    if (saved && Object.keys(ui).includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("pref-lang", lang);
    // Nota: Para que Astro actualice el HTML estático de la página,
    // comúnmente se requiere recargar la página tras el cambio.
    // window.location.reload(); 
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
}