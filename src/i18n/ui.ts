export const languages = {
  es: "Español",
  en: "English",
};

export const defaultLang = "es";

export const ui = {
  es: {
    "nav.menu1": "Inicio",
    "nav.menu2": "CV",
    "contact.button": "Contacto",
    "cv.workExperience": "Experiencia Laboral",
    "cv.education": "Educación",
    "project.Back": "Volver a proyectos",
    "project.Visit": "Visitar sitio del proyecto",
    "home.Projects": "Proyectos"
  },
  en: {
    "nav.menu1": "Home",
    "nav.menu2": "CV",
    "contact.button": "Contact",
    "cv.workExperience": "Work Experience",
    "cv.education": "Education",
    "project.Back": "Back to projects",
    "project.Visit": "Visit Project Website",
    "home.Projects": "Projects"
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}