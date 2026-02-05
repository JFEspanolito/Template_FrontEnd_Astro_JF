// src/i18n/ui.ts

// 1. Definimos los idiomas disponibles
export const languages = {
  es: "Español",
  en: "English",
};

export const defaultLang = "es";

// 2. Tu diccionario de traducciones (Copiado de tu contexto anterior)
export const ui = {
  es: {
    // Header
    "nav.menu1": "Menú 1",
    "nav.menu2": "Menú 2",
    "nav.menu3": "Menú 3",
    "nav.logIn": "Ingresar",

    // Footer
    "footer.sendMail": "Escríbenos a",
    "footer.copyright": "Todos los derechos reservados.",

    // Auth
    "auth.signIn": "Iniciar Sesión",
  },
  en: {
    // Header
    "nav.menu1": "Menu 1",
    "nav.menu2": "Menu 2",
    "nav.menu3": "Menu 3",
    "nav.logIn": "Log In",

    // Footer
    "footer.sendMail": "Send us an email at",
    "footer.copyright": "All rights reserved.",

    // Auth
    "auth.signIn": "Sign in",
  },
} as const;

// 3. La función mágica para usar en componentes .astro
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
