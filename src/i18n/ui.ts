export const languages = {
  es: "Español",
  en: "English",
};

export const defaultLang = "es";

export const ui = {
  es: {
    "nav.menu1": "Menú Español",
    "nav.menu2": "Menú 2",
    "nav.menu3": "Menú 3",
    "nav.logIn": "Ingresar",
    "footer.sendMail": "Escríbenos a",
    "footer.copyright": "Todos los derechos reservados.",
    "auth.signIn": "Iniciar Sesión",
  },
  en: {
    "nav.menu1": "English Menu",
    "nav.menu2": "Menu 2",
    "nav.menu3": "Menu 3",
    "nav.logIn": "Log In",
    "footer.sendMail": "Send us an email at",
    "footer.copyright": "All rights reserved.",
    "auth.signIn": "Sign in",
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}